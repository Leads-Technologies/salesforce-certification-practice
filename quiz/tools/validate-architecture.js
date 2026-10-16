// Verify collaborator contracts and independent instances using in-memory ports.
const assert = require('node:assert/strict');

module.exports = function validateArchitecture(player, folder, config) {
  const page = player(folder);
  const modules = page.context.window.QuizModules;
  const original = page.context.window.Quiz.application;
  const beforeState = JSON.stringify(original.state);
  const beforeStorage = JSON.stringify([...page.storage]);
  const sample = JSON.parse(page.run('JSON.stringify(window.QUIZ_QUESTIONS.slice(0, 3))'));
  const bank = new modules.QuestionBank({ ...config, questions: sample });

  let customGrades = 0;
  const customGrader = new modules.AnswerGrader([{ matches: () => true, grade: () => { customGrades++; return 'wrong'; } }]);
  assert.equal(customGrader.grade(bank.questions[0], []), 'wrong', 'A grading strategy is replaceable without changing the application');
  assert.equal(customGrades, 1, 'The injected grading strategy receives the request');
  const source = ['A', 'B', 'C'];
  assert.equal(new modules.ChoiceOrder(() => 0).shuffled(source).join(','), 'B,C,A', 'Choice ordering accepts an injected random source');
  assert.equal(new modules.ChoiceOrder(() => 0.999).shuffled(source).join(','), 'A,B,C', 'Random policies belong to their own instance');
  assert.equal(source.join(','), 'A,B,C', 'Ordering does not mutate the input');

  const writes = new Map();
  const storage = {
    getItem: key => writes.get(key) ?? null,
    setItem: (key, value) => writes.set(key, value),
    removeItem: key => writes.delete(key),
  };
  const repository = new modules.ProgressRepository({ storage, bank, grader: customGrader, choiceOrder: new modules.ChoiceOrder() });
  const question = bank.questions[0];
  repository.saveResults({ [question.id]: { picked: [question.options[0].id], status: 'old-result' } });
  assert.equal(repository.loadResults()[question.id].status, 'wrong', 'Repository regrading uses the injected grading contract');
  assert.equal(customGrades, 2, 'Repository calls the same grading port');
  assert.ok(writes.has(config.storageKey), 'Repository preserves the existing practice key format');
  let failures = 0;
  const failing = new modules.ProgressRepository({ storage: { setItem() { throw Error('Blocked'); } }, bank, grader: customGrader, onError: () => failures++ });
  assert.equal(failing.saveResults({}), false, 'Repository reports failed writes through its return contract');
  assert.equal(failures, 1, 'Repository notifies the injected failure callback');

  let now = 2000000000000;
  let nextTimer = 0;
  const timers = new Map();
  const scheduler = {
    setInterval(callback) { const id = ++nextTimer; timers.set(id, callback); return id; },
    clearInterval(id) { timers.delete(id); },
  };
  const app = new modules.QuizApplication({
    document: page.context.document, window: page.context.window, storage,
    clock: { now: () => now }, scheduler, random: () => 0, navigation: null,
  });
  const alternateConfig = { ...config, storageKey: `${config.storageKey}:independent-instance` };
  app.initialize(alternateConfig, sample);
  assert.throws(() => app.screens.render('toString'), /Unknown quiz view/, 'The view registry accepts only registered screens');
  const listeners = JSON.stringify([...page.listenerCounts]);
  app.initialize(alternateConfig, sample);
  assert.equal(JSON.stringify([...page.listenerCounts]), listeners, 'Repeated initialization registers no duplicate global handlers');
  app.examController.startRandomExam(1, 1);
  assert.equal(app.state.examAttempt.deadlineAt, now + 60000, 'Exam deadline uses the injected clock');
  assert.equal(timers.size, 1, 'Exam uses the injected scheduler');
  now += 60001;
  [...timers.values()][0]();
  assert.ok(app.state.examAttempt.submitted && app.state.examAttempt.timedOut, 'Injected time drives normal expiry and locking');
  assert.equal(timers.size, 0, 'Expiry releases its scheduled interval');
  assert.equal(JSON.stringify(original.state), beforeState, 'A second application in the same JavaScript realm cannot replace the first instance state');
  assert.equal(JSON.stringify([...page.storage]), beforeStorage, 'Injected storage cannot write to the original instance progress');
  app.dispose();
  for (const name of ['click', 'keydown', 'visibilitychange', 'focus']) assert.equal(page.listenerCounts.get(name), 1, `Disposal removes only the second instance ${name} listener`);
  original.dispose();
  for (const name of ['click', 'keydown', 'visibilitychange', 'focus']) assert.equal(page.listenerCounts.get(name), 0, `Disposal releases ${name} listeners`);
  console.log('PASS architecture: isolated application instances, injected storage/clock/scheduler/randomness, replaceable grading, compatible keys and listener/timer cleanup');
};
