// Verify that comparisons expose the actual source edits without altering content.
const assert = require("node:assert/strict");

module.exports = function validateChanges(player, folder) {
  const page = player(folder);
  const questions = JSON.parse(page.run("JSON.stringify(questions.filter(q => q.explain.repair?.length))"));
  const decode = html => html.replace(/<\/?(?:del|ins)>/g, "").replaceAll("&quot;", '"').replaceAll("&gt;", ">").replaceAll("&lt;", "<").replaceAll("&amp;", "&");
  const blocks = html => [...html.matchAll(/<p>([\s\S]*?)<\/p>|<pre\b[^>]*><code>([\s\S]*?)<\/code><\/pre>/g)].map(match => decode(match[1] ?? match[2]));
  const options = option => option ? [{ type: option.code ? "code" : "text", text: option.text }] : [];
  for (const q of questions) {
    const label = `${folder} Q${q.id}`;
    const expected = [];
    if (JSON.stringify(q.source.stem) !== JSON.stringify(q.stem)) expected.push({ title: "Question wording / code", before: q.source.stem, after: q.stem });
    const ids = [...new Set([...q.source.options, ...q.options].map(option => option.id))];
    for (const id of ids) {
      const before = options(q.source.options.find(option => option.id === id));
      const after = options(q.options.find(option => option.id === id));
      if (JSON.stringify(before) !== JSON.stringify(after)) expected.push({ title: `Choice ${id}`, before, after });
    }
    const html = page.run(`window.Quiz.application.content.questionComparisonHtml(byId.get(${q.id}))`);
    const items = [...html.matchAll(/<section class="change-item"[^>]*>([\s\S]*?)<\/section>/g)];
    assert.ok(items.length || q.acceptAny, `${label}: compares content changes or expands accepted answers`);
    assert.ok(!html.includes('<dd></dd>'), `${label}: grading-only changes do not show an empty Changed line`);
    assert.equal(items.length, expected.length, `${label}: every changed field and only changed fields are compared`);
    assert.ok(!html.includes('class="change-legend"') && !html.includes('Removed text') && !html.includes('Added text'), `${label}: comparisons omit the redundant legend`);
    for (let i = 0; i < items.length; i++) {
      const item = items[i][1], pair = expected[i];
      const versions = [...item.matchAll(/<div class="change-version"><h5>(Original|Current)<\/h5>([\s\S]*?)<\/div>/g)];
      assert.ok(item.includes(`<h4>${pair.title}</h4>`), `${label}: comparison identifies ${pair.title}`);
      assert.equal(versions.length, 2, `${label}: comparison labels both versions`);
      assert.deepEqual(blocks(versions[0][2]), pair.before.map(block => block.text), `${label}: exact original content and code line breaks survive highlights`);
      assert.deepEqual(blocks(versions[1][2]), pair.after.map(block => block.text), `${label}: exact current content and code line breaks survive highlights`);
      assert.ok(item.includes("<del>") || item.includes("<ins>"), `${label}: changed text is highlighted`);
    }
    const key = q.source.answer.slice().sort().join(", ");
    if (q.ungraded) {
      assert.ok(html.includes(`Not scored. Original key ${key} remains unverified.`), `${label}: partial recovery never presents an original key as accepted`);
    } else if (q.corrected) {
      assert.ok(html.includes(`Changed from ${key} to ${q.answer.slice().sort().join(', ')}.`), `${label}: a corrected key accompanying recovered content is explicit`);
    } else if (q.acceptAny && q.source.answer.length !== q.answer.length) {
      assert.ok(html.includes(`Originally ${key}; now ${q.answer.join(" or ")} (choose one). The original answer is still accepted.`), `${label}: expanded accepted alternatives are explicit`);
    } else assert.ok(html.includes(`Unchanged — ${key}.`), `${label}: unchanged key is explicit even when choice wording changed`);
    page.run(`state.mode = 'exam'; state.optionOrders[${q.id}] = byId.get(${q.id}).options.map(option => option.id).reverse()`);
    assert.equal(page.run(`window.Quiz.application.content.questionComparisonHtml(byId.get(${q.id}))`), html, `${label}: exam shuffling cannot change source letters or comparisons`);
    page.run("state.mode = 'practice'");
  }
  const typo = page.run(`window.Quiz.application.content.comparisonPairHtml('Choice A', [{type:'text',text:'A future is enabled.'}], [{type:'text',text:'A feature is enabled.'}])`);
  assert.ok(typo.includes('<del>future</del>') && typo.includes('<ins>feature</ins>'), 'Single-word changes highlight the changed words');
  const beforeCode = [{ type: "code", text: "if (a < b) {\n  update records;\n}" }];
  const afterCode = [{ type: "code", text: '<img src=x onerror=alert(1)> & "text"' }];
  const unsafe = page.run(`window.Quiz.application.content.comparisonPairHtml('Code', ${JSON.stringify(beforeCode)}, ${JSON.stringify(afterCode)})`);
  assert.ok(!unsafe.includes('<img') && unsafe.includes('&lt;') && unsafe.includes('&amp;') && unsafe.includes('&quot;'), 'Comparison highlights cannot execute imported markup');
  console.log(`PASS changes ${folder}: ${questions.length} exact before/after comparisons, changed and unchanged choices, original keys, accepted alternatives, code, escaping and exam-letter stability`);
};
