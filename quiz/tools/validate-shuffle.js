const assert = require("node:assert/strict");

module.exports = function validateShuffle(player, folder, cfg) {
  const practice = player(folder);
  const source = practice.run("JSON.stringify(window.QUIZ_QUESTIONS)");
  const normalized = practice.run("JSON.stringify(questions)");
  practice.run("globalThis.randomCalls = 0; Math.random = () => { randomCalls++; return 0; }; start('all')");
  const mappings = JSON.parse(practice.run(`JSON.stringify(questions.map(q => ({original:q.options,displayed:displayOptions(q)})))`));
  for (const q of mappings) {
    assert.deepEqual(q.displayed.map(option=>option.id), q.original.map(option=>option.id), `${folder}: practice uses original choice order`);
    for (const option of q.displayed) assert.equal(option.label, option.id, `${folder}: practice labels match the mock`);
  }
  practice.run("toggle(current().options[0].id); go(1); go(-1); retry(); render()");
  assert.equal(practice.run("randomCalls"), 0, `${folder}: practice start, selection, navigation, retry and rendering never call the randomizer`);
  assert.equal(practice.run("JSON.stringify(window.QUIZ_QUESTIONS)"), source, `${folder}: source data is unchanged`);
  assert.equal(practice.run("JSON.stringify(questions)"), normalized, `${folder}: grading data is unchanged`);

  const base = {section:cfg.sections[0].id,focus:cfg.focus[0].id,group:cfg.groups[0].id};
  const fixture = [
    {...base,id:700,stem:["A developer compares choices A and B.",{code:["String A = 'B';"]},{ask:"Which option A or option C is appropriate?"}],choices:[{code:["Integer result = 1;"]},"Second choice","Third choice"],answer:"A",why:"A is valid. Option B uses another design. A bind variable is safe. `A` and https://example.com/A stay literal.",wrong:{B:"C has a different role.",C:"A bind variable is a normal filter."},notes:["The original source key was A. See option B for the source distractor."]},
    {...base,id:701,stem:["Choose two.",{ask:"Choose 2 answers"}],choices:["First","Second","Third","Fourth"],answer:"A,C",type:"multi",choose:2,why:"A and C meet the requirements.",wrong:{B:"Second is inapplicable.",D:"Fourth is inapplicable."},notes:["A,C is the original source key."]},
    {...base,id:702,stem:["Choose either equivalent implementation."],choices:["First","Second","Third"],answer:"A,B",acceptAny:true,type:"single",why:"A and B are equivalent.",wrong:{C:"Third is different."},notes:["Select only one."]},
  ];
  const config = {...cfg,storageKey:`${cfg.storageKey}:shuffle-check`};
  const setup = `window.Quiz.start(${JSON.stringify(config)},${JSON.stringify(fixture)})`;
  const page = player(folder, {}, undefined, "exam.html");
  page.run(`${setup}; Math.random=()=>0; startRandomExam(3); jump(state.ids.indexOf(700))`);
  const order = page.run("JSON.stringify(state.optionOrders)");
  assert.equal(page.run("state.optionOrders[700].join(',')"), "B,C,A", `${folder}: exam applies a Fisher-Yates permutation`);
  assert.ok(page.app.innerHTML.indexOf('data-pick="B"') < page.app.innerHTML.indexOf('data-pick="A"'), `${folder}: displayed buttons follow the permutation`);
  assert.ok(page.app.innerHTML.includes("A developer compares choices C and A."), `${folder}: exam prose references are remapped`);
  assert.ok(page.app.innerHTML.includes("String A = 'B';"), `${folder}: literal question code remains unchanged`);
  assert.equal(page.run("choiceReferenceText(current(),'A/B testing and A bind variables; A is valid. B and C are alternatives.')"), "A/B testing and A bind variables; C is valid. A and B are alternatives.", `${folder}: letter references are distinguished from English articles and product terms`);
  const key = letter => ({key:letter,target:{closest:()=>null},preventDefault(){}});
  page.events.get("keydown")(key("A"));
  assert.equal(page.run("state.picked.join(',')"), "B", `${folder}: shortcut A selects the first displayed exam choice`);
  page.run("jump(state.ids.indexOf(701)); jump(state.ids.indexOf(700)); render()");
  assert.equal(page.run("JSON.stringify(state.optionOrders)"), order, `${folder}: selecting and navigating do not reshuffle an exam`);
  const reopened = player(folder, {}, page.storage, "exam.html");
  reopened.run(setup);
  reopened.context.document.querySelector('[data-action="resume-exam"]').events.get("click")();
  assert.equal(reopened.run("JSON.stringify(state.optionOrders)"), order, `${folder}: exam choice order survives reopening`);
  assert.equal(reopened.run("state.picked.join(',')"), "B", `${folder}: saved exam drafts retain the selected content`);
  page.events.get("keydown")(key("C"));
  page.run("check()");
  assert.equal(page.run("Object.keys(state.results).length"), 0, `${folder}: saved exam answers are not graded before submission`);
  page.run("jump(state.ids.indexOf(701))");
  page.events.get("keydown")(key("B"));
  assert.ok(!page.run("canCheck(current())"), `${folder}: incomplete shuffled multi-selection cannot continue`);
  page.events.get("keydown")(key("D"));
  page.run("jump(state.ids.indexOf(702))");
  page.events.get("keydown")(key("A"));
  page.run("showSummary(); submitExam(); jump(state.ids.indexOf(700))");
  assert.equal(page.run("state.results[700].status"), "correct", `${folder}: displayed C grades original A correctly`);
  assert.equal(page.run("state.results[701].status"), "correct", `${folder}: shuffled multi-answer set grades correctly`);
  assert.equal(page.run("state.results[702].status"), "correct", `${folder}: an equivalent shuffled answer is accepted`);
  assert.ok(page.app.innerHTML.includes("Your answer: C · Correct answer: C"), `${folder}: answer recap uses displayed letters`);
  assert.ok(page.app.innerHTML.includes("C is valid. Option A uses another design. A bind variable is safe."), `${folder}: reasoning follows session letters`);
  assert.ok(page.app.innerHTML.includes('href="https://example.com/A"'), `${folder}: reference URLs stay literal`);
  assert.ok(page.app.innerHTML.includes("original source key was A") && page.app.innerHTML.includes("A → C · B → A · C → B"), `${folder}: original notes retain their letters with a display key`);
  page.context.document.querySelector('[data-action="home"]').events.get("click")();
  page.run("Math.random=()=>0.999; startRandomExam(3)");
  assert.notEqual(page.run("JSON.stringify(state.optionOrders)"), order, `${folder}: a new exam creates new permutations`);

  const legacy = new Map([[config.storageKey,JSON.stringify({700:{picked:["A"],status:"wrong"}})],[`${config.storageKey}:session`,JSON.stringify({filter:"all",id:701,drafts:{701:["C"]},optionOrders:{700:["B","C","A"],701:["B","C","D","A"]}})]]);
  const restoredPractice = player(folder, {}, legacy);
  restoredPractice.run(`${setup}; start('all',701)`);
  assert.equal(restoredPractice.run("state.results[700].status"), "correct", `${folder}: saved practice answers are regraded by canonical IDs`);
  assert.equal(restoredPractice.run("state.picked.join(',')"), "C", `${folder}: old shuffled-practice draft still selects the same content`);
  assert.equal(restoredPractice.run("displayOptions(current()).map(o=>o.id).join(',')"), "A,B,C,D", `${folder}: old practice permutations are ignored`);
  restoredPractice.run("retry()");
  assert.equal(restoredPractice.run("displayOptions(current()).map(o=>o.id).join(',')"), "A,B,C,D", `${folder}: practice Try again retains original order`);
  assert.ok(!restoredPractice.app.innerHTML.includes("Choices shuffled"), `${folder}: practice does not claim to shuffle`);
  console.log(`PASS ordering ${folder}: fixed practice order, exam-only shuffling, keyboard and grading, stable resume, code/URL safety, remapped explanations and legacy progress`);
};
