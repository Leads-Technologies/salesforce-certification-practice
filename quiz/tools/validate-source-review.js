// Protect source fidelity and complete audit coverage after the full-bank review.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

module.exports = function validateSourceReview(player, folder) {
  const page = player(folder);
  const questions = JSON.parse(page.run('JSON.stringify(window.QUIZ_QUESTIONS)'));
  const byId = new Map(questions.map(q => [q.id, q]));
  const expectedSearches = folder.endsWith('platform-developer') ? 30 : folder.endsWith('platform-admin') ? 10 : 28;
  assert.equal(questions.filter(q => q.review?.recovery).length, expectedSearches, `${folder}: online search covers every previously Not scored question`);
  const expectedRechecks = folder.endsWith('platform-developer') ? 63 : folder.endsWith('platform-admin') ? 13 : 37;
  assert.equal(questions.filter(q => q.review?.reassessment).length, expectedRechecks, `${folder}: every previously Not scored or Repaired question has a reassessment`);
  const text = value => JSON.stringify(value);
  for (const q of questions) {
    const label = `${folder} Q${q.id}`;
    assert.ok(q.review && /^\d{4}-\d\d-\d\d$/.test(q.review.date), `${label}: dated review decision`);
    assert.ok(q.review.reason.trim().length > 20, `${label}: individual rationale`);
    assert.ok(q.review.references.every(url => /^https?:\/\//.test(url)), `${label}: explicit reference URLs`);
    assert.equal(Boolean(q.ungraded), q.review.treatment === 'unresolved', `${label}: unresolved classification matches scoring`);
    assert.equal(Boolean(q.corrected), q.review.treatment === 'key-correction', `${label}: key correction classification`);
    if (['restored', 'unresolved'].includes(q.review.treatment)) {
      assert.ok(q.source, `${label}: original source retained`);
      if (q.review.recovery?.status !== 'partial') assert.deepEqual([q.stem, q.choices], [q.source.stem, q.source.choices], `${label}: a withdrawn rewrite cannot survive in the main question`);
      assert.equal(q.answer, q.ungraded ? '' : q.source.answer, `${label}: no invented source grading key`);
    }
    if (q.review.treatment === 'accepted-alternatives') {
      assert.ok(q.acceptAny && q.repaired && q.answer.split(',').includes(q.printed), `${label}: original single-choice answer is still accepted`);
      assert.deepEqual(q.choices, q.source.choices, `${label}: alternatives preserve original choice meanings`);
      if (!q.review.recovery || q.review.recovery.status !== 'resolved') assert.deepEqual(q.stem, q.source.stem, `${label}: alternatives do not require a replacement scenario`);
    }
    if (q.review.treatment === 'formatting') assert.ok(!q.repaired, `${label}: formatting alone has no repair badge`);
    if (q.review.recovery) {
      const recovery = q.review.recovery;
      assert.ok(recovery.queries.length && recovery.assessment.length > 20, `${label}: online search has queries and an individual outcome`);
      assert.ok(recovery.candidates.every(url => /^https?:\/\//.test(url)), `${label}: candidate URLs`);
      assert.equal(recovery.status === 'resolved', !q.ungraded, `${label}: partial/failed recovery never restores scoring`);
      if (recovery.status !== 'unresolved') {
        assert.ok(q.source && (recovery.candidates.length || q.review.references.some(url => /salesforce\.com\//.test(url))), `${label}: resolved or partial review has provenance or primary verification and original snapshot`);
        const contentChanged = text([q.stem,q.choices]) !== text([q.source.stem,q.source.choices]);
        if (contentChanged) assert.ok(q.repair, `${label}: recovered content additions have visible differences`);
        assert.equal(q.choices.length, q.source.choices.length, `${label}: recovery preserves the original option count`);
      }
      if (recovery.status === 'resolved') {
        const picked=q.acceptAny ? [q.answer.split(',')[0]] : q.answer.split(',');
        const saved = player(folder, {[q.id]: {picked, status:'ungraded'}});
        assert.equal(saved.run(`state.results[${q.id}].status`), 'correct', `${label}: restored scoring regrades previously ungraded saved practice selections`);
      }
    }
    if (q.ungraded) {
      const saved = player(folder, {[q.id]: {picked:['A'], status:'correct'}});
      assert.equal(saved.run(`state.results[${q.id}].status`), 'ungraded', `${label}: earlier scored practice selections are retained and regraded`);
    }
  }
  const html = fs.readFileSync(path.join(__dirname, '..', '..', folder, 'notice.html'), 'utf8');
  for (const flag of ['corrected','repaired','ungraded']) {
    const ids = [...html.matchAll(new RegExp(`id="note-${flag}-(\\d+)" data-questions="(\\d+)"`, 'g'))].map(m => {
      assert.equal(m[1],m[2]); return Number(m[1]);
    });
    assert.deepEqual(ids.sort((a,b)=>a-b), questions.filter(q=>q[flag]).map(q=>q.id).sort((a,b)=>a-b), `${folder}: every ${flag} question has one concise notice entry`);
  }
  assert.ok(!/id="(?:all-question-decisions|online-recovery|grading-reassessment|unscored-option-review)"/.test(html), `${folder}: the notice omits repeated audit and search-history sections`);
  assert.ok(!/notice-\d{4}-\d\d-\d\d\.html/.test(html), `${folder}: review notes link only to the current notice`);
  assert.ok(!fs.readdirSync(path.join(__dirname, '..', '..', folder)).some(name => /^notice-\d{4}-\d\d-\d\d\.html$/.test(name)), `${folder}: update notice.html directly without dated copies`);
  for (const q of questions.filter(q => q.review.reassessment)) {
    const review=q.review.reassessment;
    assert.ok(review.reason.length>25, `${folder} Q${q.id}: individual reassessment rationale`);
    assert.equal(review.decision==='still-unresolved',Boolean(q.ungraded), `${folder} Q${q.id}: reassessment agrees with current grading`);
  }
  if (folder.endsWith('platform-developer')) {
    assert.ok(!text(byId.get(3).stem).includes('LWC'), 'Q3: caching question has no invented framework restriction');
    assert.equal(byId.get(20).answer, 'B', 'Q20: an unrelated snippet defect does not invalidate the asked-about bulkification practice');
    assert.deepEqual(byId.get(20).stem,byId.get(20).source.stem, 'Q20: preserve the source query and disclose its separate compile limitation');
    assert.equal(byId.get(100).answer, 'D', 'Q100: preserve the original >10,000-record requirement and correct the actual key');
    assert.ok(!/8,000|8000/.test(text(byId.get(100).stem)), 'Q100: no lowered result volume to fit another answer');
    assert.ok(text(byId.get(107).stem).includes('insertAccounts'), 'Q107: misleading source method name is not silently renamed');
    assert.ok(text(byId.get(168).choices).includes('apex:messages'), 'Q168: valid original Visualforce component retained');
    assert.ok(byId.get(102).exhibitMissing && byId.get(102).ungraded, 'Q102: unverifiable exhibit remains missing and unscored');
    assert.ok(byId.get(12).acceptAny && byId.get(12).answer === 'A,B' && !byId.get(12).ungraded, 'Q12: supported benefits are accepted as alternatives after subject recovery');
    assert.equal(byId.get(127).answer,'D', 'Q127: direct helper coverage is not trigger-entry coverage');
    for (const id of [130,154,184]) assert.ok(!byId.get(id).ungraded && !byId.get(id).exhibitMissing && byId.get(id).review.recovery.status === 'resolved', `Q${id}: verified online recovery restores scoring`);
    assert.ok(JSON.stringify(byId.get(154).stem).includes('Total_Rejected_Timesheet__c'), 'Q154: recovered field list retains its actual API name');
    assert.deepEqual(byId.get(184).stem, byId.get(184).source.stem, 'Q184: recovering D does not rewrite the original method');
    assert.equal(byId.get(199).answer,'C', 'Q199: the normal SOSL search question can be graded after the leading-wildcard repair');
    assert.deepEqual(byId.get(199).stem,byId.get(199).source.stem, 'Q199: do not rewrite the original search requirement');
    assert.equal(byId.get(199).choices[2],byId.get(199).source.choices[2].replace("'*ACME*'","'ACME*'"), 'Q199: repair exactly one unsupported wildcard character');
    assert.equal(byId.get(43).answer,'B', 'Q43: ignored SaveResult is not a thrown row-level DML exception');
    const junction = byId.get(58);
    assert.equal(junction.answer, 'A,B', 'Q58: map external keys by option text to the secondary and primary relationship choices');
    assert.ok(junction.corrected && !junction.ungraded, 'Q58: the verified relationship-sharing answer is scored as a key correction');
    assert.deepEqual([junction.stem,junction.choices], [junction.source.stem,junction.source.choices], 'Q58: correcting the key preserves the original question and option order');
    assert.equal(junction.source.answer, 'B,C', 'Q58: retain the original DOCX key separately from the mapped online answer');
    const junctionProgress = player(folder, {58: {picked:['B','C'], status:'ungraded'}});
    assert.equal(junctionProgress.run('state.results[58].status'), 'wrong', 'Q58: a saved original-key response is regraded after the correction');
    const repeatedInsert = byId.get(64);
    assert.deepEqual(repeatedInsert.choices, ['200 Accounts are inserted.','1 Account is inserted.','201 Accounts are inserted.','0 Accounts are inserted.'], 'Q64: retain the externally corroborated numeric option sequence');
    assert.ok(repeatedInsert.answer === 'D' && repeatedInsert.repaired && !repeatedInsert.ungraded && !repeatedInsert.corrected, 'Q64: recovered zero-record choice restores the original key D');
    assert.deepEqual(repeatedInsert.stem, repeatedInsert.source.stem, 'Q64: recovery does not rewrite the loop to insert different Accounts');
    const triggerExceptions = byId.get(92);
    assert.ok(triggerExceptions.ungraded && triggerExceptions.source.answer === 'B,C', 'Q92: conflicting mock keys remain unverified when Choose 2 lacks a second supported action');
    assert.deepEqual([triggerExceptions.stem,triggerExceptions.choices], [triggerExceptions.source.stem,triggerExceptions.source.choices], 'Q92: keep the original question and actions while disclosing the documented conflict');
    assert.ok(triggerExceptions.review.references.some(url => url.includes('apex_triggers_ignoring_operations.htm')), 'Q92: explain cascade-delete behavior using the primary Salesforce reference');
    assert.ok(byId.get(143).acceptAny && byId.get(143).answer==='A,C,D' && !byId.get(143).corrected, 'Q143: broad controller alternatives do not make the printed C wrong');
    assert.equal(byId.get(183).answer,'D', 'Q183: bulkification directly fixes the per-Account helper query pattern');
    assert.equal(byId.get(202).answer, 'B', 'Q202: the best listed server-side validation choice is scored');
    assert.ok(!byId.get(202).ungraded && !byId.get(202).repaired && !byId.get(202).corrected, 'Q202: confirming an original answer needs no repair/correction badge');
    assert.deepEqual([byId.get(202).stem,byId.get(202).choices], [byId.get(202).source.stem,byId.get(202).source.choices], 'Q202: no external-verification requirement or replacement options are invented');
  } else if (folder.endsWith('platform-admin')) {
    assert.ok(byId.get(104).ungraded && /text area/i.test(text(byId.get(104).stem)), 'Q104: unsupported field type is not replaced by Text');
    assert.ok(byId.get(121).ungraded, 'Q121: no new option supplied to preserve the key');
  } else {
    assert.equal(byId.get(17).answer, 'A', 'Q17: recovered A/B-send context supports enabling send logging');
    assert.equal(byId.get(72).answer, 'D', 'Q72: withdraw unsupported per-user DE folder ACL correction');
    for (const id of [81,98,151,156,157]) assert.ok(byId.get(id).ungraded, `Q${id}: changed scenario/answer meaning cannot validate the source key`);
    assert.equal(byId.get(101).answer,'A,B', 'Q101: contact identity and event registration support the requested Contact Builder model');
    assert.ok(!byId.get(129).repaired && byId.get(129).answer==='B', 'Q129: an unnecessary product-label rewrite is withdrawn');
    assert.ok(byId.get(3).acceptAny && byId.get(14).acceptAny, 'Report questions retain their supported original navigation alternatives');
  }
  console.log(`PASS source review ${folder}: ${questions.length} preserved review decisions, concise flagged-question notice, restored originals, accepted alternatives and saved-practice regrading`);
};
