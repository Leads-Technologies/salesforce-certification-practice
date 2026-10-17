// Keep option-comparison evidence separate from original mock answer references.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

module.exports = function validateOptionReview(player, folder) {
  const page = player(folder);
  const questions = JSON.parse(page.run('JSON.stringify(window.QUIZ_QUESTIONS)'));
  const unresolved = questions.filter(q => q.ungraded);
  const notice = fs.readFileSync(path.join(__dirname, '..', '..', folder, 'notice.html'), 'utf8');
  const ids = [...notice.matchAll(/id="note-ungraded-(\d+)" data-questions="(\d+)"/g)].map(match => Number(match[1])).sort((a,b) => a-b);
  assert.deepEqual(ids, unresolved.map(q => q.id).sort((a,b) => a-b), `${folder}: unresolved questions remain listed once in the concise notice`);
  assert.ok(!/suggested answers?|suggested-answer-reference/i.test(notice), `${folder}: notices contain no added answer suggestions`);
  for (const q of questions) assert.ok(!Object.hasOwn(q,'suggestion'), `${folder} Q${q.id}: no provisional answer stored`);
  for (const q of unresolved) {
    const label = `${folder} Q${q.id}`;
    const audit = q.review.optionAudit;
    assert.ok(audit && audit.assessment.length > 35 && audit.references.length, `${label}: individual comparison and sources remain`);
    assert.equal(audit.comparedChoiceCount, q.choices.length, `${label}: every choice compared`);
    assert.equal(q.answer, '', `${label}: unresolved grading key stays empty`);
    for (const url of audit.references) assert.ok(/^https?:\/\//.test(url), `${label}: explicit comparison URL`);
    page.run(`start('all', ${q.id}); retry()`);
    assert.ok(!page.app.innerHTML.includes('Original mock answer (unverified)') && !page.app.innerHTML.includes('Online option review'), `${label}: references remain hidden until feedback`);
    assert.ok(page.run('canCheck(current())'), `${label}: reading does not require a selection`);
    const promptCount = JSON.stringify(q.stem).match(/\bChoose\s+(\d+)\s+answers?\b/i)?.[1];
    if (promptCount) {
      const needed = Number(promptCount);
      assert.equal(page.run(`byId.get(${q.id}).choose`), needed, `${label}: the requested count survives an empty grading key`);
      const inferred = JSON.parse(page.run(`JSON.stringify(normalizeQuestion({...window.QUIZ_QUESTIONS.find(q=>q.id===${q.id}),type:undefined,choose:undefined,printed:'B'}))`));
      assert.equal(inferred.type, 'multi', `${label}: infer multiple choice from the instruction without using an unverified mock key`);
      assert.equal(inferred.choose, needed, `${label}: infer the requested count independently of missing metadata`);
      const key = letter => page.events.get('keydown')({key:letter,target:{closest:()=>null},preventDefault(){}});
      for (let i=0;i<=needed;i++) key(String.fromCharCode(65+i));
      assert.equal(page.run('state.picked.length'), needed, `${label}: keyboard selection cannot exceed Choose N`);
      const buttons = [...page.app.innerHTML.matchAll(/<button\b[^>]*data-pick="([A-Z])"[^>]*>/g)];
      for (const [tag,id] of buttons) assert.equal(/\bdisabled\b/.test(tag), !page.run(`state.picked.includes('${id}')`), `${label}: selected options stay enabled and all others are disabled at the maximum`);
      assert.ok(page.app.innerHTML.includes(`${needed} of ${needed} selected`) && page.app.innerHTML.includes('Deselect one to choose another'), `${label}: selection count and replacement guidance are visible`);
      key('A');
      assert.ok([...page.app.innerHTML.matchAll(/<button\b[^>]*data-pick="[A-Z]"[^>]*>/g)].every(([tag])=>! /\bdisabled\b/.test(tag)), `${label}: deselecting re-enables all options`);
      key(String.fromCharCode(65+needed));
      assert.equal(page.run('state.picked.length'), needed, `${label}: deselecting permits a replacement answer`);
      const reopened = player(folder, {}, page.storage);
      reopened.run(`start('all', ${q.id}); toggle('A')`);
      assert.equal(reopened.run('state.picked.length'), needed, `${label}: resumed drafts enforce the same cap`);
      const legacyPick = Array.from({length:needed+1},(_,i)=>String.fromCharCode(65+i));
      reopened.run(`state.picked=${JSON.stringify(legacyPick)}; rememberDraft(); saveSession()`);
      const legacy = player(folder, {}, reopened.storage);
      legacy.run(`start('all', ${q.id})`);
      assert.equal(legacy.run('state.picked.length'), needed+1, `${label}: earlier saved selections are preserved rather than silently discarded`);
      assert.ok(legacy.app.innerHTML.includes(`Remove 1 selection to keep at most ${needed}`), `${label}: over-limit legacy selections have clear recovery guidance`);
      legacy.run(`toggle('${legacyPick.at(-1)}'); toggle('${legacyPick.at(-1)}')`);
      assert.equal(legacy.run('state.picked.length'), needed, `${label}: extra saved selections can be removed and cannot be re-added above the cap`);
    }
    page.run('check()');
    assert.ok(page.app.innerHTML.includes('Original mock answer (unverified)') && page.app.innerHTML.includes('Online option review'), `${label}: original mock answer and option comparison remain available`);
    assert.ok(!page.app.innerHTML.includes('Suggested answer') && !page.app.innerHTML.includes('suggested-answer-reference'), `${label}: no suggested answer appears`);
    page.run(`state.mode='exam'; state.optionOrders[${q.id}]=byId.get(${q.id}).options.map(option=>option.id).reverse()`);
    assert.ok(page.run(`window.Quiz.application.content.optionAuditHtml(byId.get(${q.id}))`).includes('Original → displayed:'), `${label}: comparison identifies original letters in saved exam review`);
    page.run("state.mode='practice'");
  }
  console.log(`PASS option review ${folder}: ${unresolved.length} comparisons, original mock references, no added answer suggestions`);
};
