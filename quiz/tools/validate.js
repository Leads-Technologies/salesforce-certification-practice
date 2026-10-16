// Optional development check. The browser player has no Node dependency.
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");

const rootDir = path.resolve(__dirname, "..", "..");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const schema = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "schema.json"), "utf8"));
require("./validate-assets.js");

function checkSchema(value, rule, label) {
  if (rule.$ref) return checkSchema(value, rule.$ref.split("/").slice(1).reduce((item, key) => item[key], schema), label);
  if (rule.oneOf) {
    const matches = rule.oneOf.filter(option => {
      try { checkSchema(value, option, label); return true; } catch { return false; }
    });
    assert.equal(matches.length, 1, `${label}: must match exactly one allowed shape`);
    return;
  }
  if (rule.enum) assert.ok(rule.enum.includes(value), `${label}: invalid enum value`);
  if (rule.type === "object") {
    assert.ok(value && typeof value === "object" && !Array.isArray(value), `${label}: expected object`);
    for (const key of rule.required || []) assert.ok(Object.hasOwn(value, key), `${label}: missing ${key}`);
    for (const [key, item] of Object.entries(value)) {
      if (rule.properties?.[key]) checkSchema(item, rule.properties[key], `${label}.${key}`);
      else if (rule.additionalProperties === false) assert.fail(`${label}: unknown property ${key}`);
      else if (typeof rule.additionalProperties === "object") checkSchema(item, rule.additionalProperties, `${label}.${key}`);
    }
  } else if (rule.type === "array") {
    assert.ok(Array.isArray(value), `${label}: expected array`);
    if (rule.minItems != null) assert.ok(value.length >= rule.minItems, `${label}: too few items`);
    value.forEach((item, i) => checkSchema(item, rule.items || {}, `${label}[${i}]`));
  } else if (rule.type) {
    assert.equal(typeof value, rule.type, `${label}: expected ${rule.type}`);
  }
}

function checkBlocks(value, label) {
  const blocks = Array.isArray(value) ? value : [value];
  assert.ok(blocks.length, `${label}: empty content`);
  for (const block of blocks) {
    const text = typeof block === "string" ? block : block.ask ?? block.code;
    assert.ok([].concat(text).some(line => typeof line === "string" && line.trim()), `${label}: blank block`);
  }
}

const player = require("./lib/player.js");

const folders = fs.readdirSync(rootDir, { withFileTypes: true })
  .filter(entry => entry.isDirectory() && entry.name !== "quiz")
  .map(entry => entry.name)
  .filter(folder => fs.existsSync(path.join(rootDir, folder, "quiz.js")));
assert.ok(folders.length, "No quiz folders found");
const storageKeys = new Set();
let total = 0;
for (const folder of folders) {
  const page = player(folder);
  const cfg = JSON.parse(page.run("JSON.stringify(window.QUIZ_CONFIG)"));
  if (total === 0) require('./validate-architecture.js')(player, folder, cfg);
  assert.ok(page.app.innerHTML.includes('aria-label="Quiz sections"') && page.app.innerHTML.includes('class="site-footer"'), `${folder}: shared navigation and footer load on the practice page`);
  assert.ok(page.app.innerHTML.includes('href="index.html" aria-current="page"'), `${folder}: Practice is the active section`);
  assert.ok(page.app.innerHTML.includes(`<strong>${cfg.title.replace(/\s+practice$/i, "")}</strong>`), `${folder}: header identifies its own quiz`);
  assert.ok(!page.app.innerHTML.includes("quiz-switcher") && !page.app.innerHTML.includes("../salesforce-"), `${folder}: navigation stays within this quiz`);
  assert.ok(page.run("window.QuizNavigation.guideHtml()").includes(cfg.groupsNote), `${folder}: shared help retains this quiz's study caveats`);
  const escapedHelp = page.run(`window.QuizNavigation.footer(false, {hasPriorities:true, groupsNote:'<img src=x onerror=alert(1)>'}); window.QuizNavigation.guideHtml()`);
  assert.ok(escapedHelp.includes('&lt;img') && !escapedHelp.includes('<img'), `${folder}: help escapes quiz-specific notes`);
  page.run("render()");
  const questions = JSON.parse(page.run("JSON.stringify(window.QUIZ_QUESTIONS)"));
  checkSchema(cfg, schema, folder);
  if (cfg.examMinutes != null) assert.ok(Number.isInteger(cfg.examMinutes) && cfg.examMinutes >= 1 && cfg.examMinutes <= 1440, `${folder}: valid default exam duration`);
  assert.ok(!storageKeys.has(cfg.storageKey), `${folder}: duplicate storage key`);
  storageKeys.add(cfg.storageKey);
  const sections = new Set(cfg.sections.map(s => s.id));
  const focus = new Set(cfg.focus.map(f => f.id));
  const groups = new Set(cfg.groups.map(g => g.id));
  assert.equal(sections.size, cfg.sections.length);
  assert.equal(focus.size, cfg.focus.length);
  assert.equal(groups.size, cfg.groups.length);
  assert.equal(new Set(questions.map(q => q.id)).size, questions.length, `${folder}: duplicate question Id`);
  for (const q of questions) {
    const label = `${folder} Q${q.id}`;
    checkSchema(q, schema.$defs.question, label);
    assert.ok(Number.isInteger(q.id) && q.id > 0, `${label}: invalid Id`);
    assert.ok(sections.has(q.section) && focus.has(q.focus) && groups.has(q.group), `${label}: invalid study reference`);
    for (const key of ["stem", "why", "notes"]) checkBlocks(q[key], `${label}.${key}`);
    assert.ok(q.choices.length <= letters.length, `${label}: too many choices for letter labels`);
    q.choices.forEach((choice, i) => checkBlocks(choice, `${label}.choices[${i}]`));
    const answer = q.answer ? q.answer.split(",") : [];
    assert.equal(new Set(answer).size, answer.length, `${label}: duplicate answer letter`);
    assert.deepEqual(answer, [...answer].sort(), `${label}: canonical answer order`);
    assert.ok(answer.every(letter => /^[A-Z]$/.test(letter) && letters.indexOf(letter) < q.choices.length), `${label}: invalid answer`);
    if (!q.ungraded) assert.ok(answer.length, `${label}: missing graded answer`);
    if (q.acceptAny) assert.ok(q.type !== "multi" && answer.length > 1, `${label}: acceptAny is single-choice`);
    if (q.choose != null && !q.acceptAny && !q.ungraded) assert.equal(q.choose, answer.length, `${label}: choose mismatch`);
    if (q.type === "single" && !q.acceptAny && !q.ungraded) assert.equal(answer.length, 1, `${label}: single answer mismatch`);
    if (!q.ungraded) {
      const wrong = q.choices.map((_, i) => letters[i]).filter(letter => !answer.includes(letter));
      assert.deepEqual(Object.keys(q.wrong).sort(), wrong, `${label}: every incorrect option needs an explanation`);
      assert.ok(Object.values(q.wrong).every(text => text.trim().length > 10), `${label}: empty distractor explanation`);
    }
    if (q.corrected) {
      assert.ok(q.source && q.printed, `${label}: missing source snapshot/key`);
    }
    if (q.repaired) {
      assert.ok(q.source && q.printed, `${label}: repaired content needs source history`);
      assert.ok(!q.corrected && !q.ungraded, `${label}: review states must be separate`);
      assert.notDeepEqual([q.stem, q.choices], [q.source.stem, q.source.choices], `${label}: explanation-only edits are not Repaired`);
    }
    if (q.source) assert.equal(q.printed, q.source.answer, `${label}: source key mismatch`);
    if (q.printed) {
      const originalStatus = page.run(`grade(byId.get(${q.id}), ${JSON.stringify(q.printed.split(","))})`);
      assert.equal(Boolean(q.corrected), originalStatus === "wrong", `${label}: Corrected is reserved for a wrong mock answer`);
    }
    if (q.exhibitMissing) assert.ok(q.ungraded, `${label}: a missing essential exhibit must not be scored`);
    const selected = q.acceptAny ? [answer[0]] : answer;
    assert.equal(page.run(`grade(byId.get(${q.id}), ${JSON.stringify(selected)})`), q.ungraded ? "ungraded" : "correct", `${label}: grading key`);
    if (q.acceptAny) for (const letter of answer) assert.equal(page.run(`grade(byId.get(${q.id}), [${JSON.stringify(letter)}])`), "correct");
    if (!q.ungraded && !q.acceptAny && answer.length > 1) assert.equal(page.run(`grade(byId.get(${q.id}), ${JSON.stringify(answer.slice(1))})`), "wrong", `${label}: incomplete multi selection`);
  }
  for (const s of cfg.sections) {
    page.run(`start(${JSON.stringify(s.id)})`);
    assert.ok(JSON.parse(page.run("JSON.stringify(pool().map(q => q.section))")).every(id => id === s.id));
  }
  for (const f of cfg.focus.filter(f => f.ordered)) {
    page.run(`start(${JSON.stringify(f.id)})`);
    const order = JSON.parse(page.run("JSON.stringify(pool().map(q => ({id:q.id, group:q.group})))"));
    const rank = new Map(cfg.groups.map((g,i) => [g.id,i]));
    for (let i = 1; i < order.length; i++) assert.ok(rank.get(order[i-1].group) <= rank.get(order[i].group));
  }
  const reviewSets = [
    { filter: "review:corrected", flag: "corrected", label: cfg.copy?.corrected || "Corrected answer" },
    { filter: "review:repaired", flag: "repaired", label: cfg.copy?.repaired || "Repaired" },
    { filter: "review:ungraded", flag: "ungraded", label: cfg.copy?.notScored || "Not scored" },
  ];
  assert.ok(page.run("homeHtml()").includes('aria-labelledby="review-changes-title"'), `${folder}: home review section`);
  for (const set of reviewSets) {
    const expected = questions.filter(q => q[set.flag]).map(q => q.id).sort((a,b) => a-b);
    const home = page.run("homeHtml()");
    const card = home.match(new RegExp(`<button[^>]+data-start="${set.filter}"[^>]*>[\\s\\S]*?<em>(\\d+)</em>`));
    assert.ok(card, `${folder}: home card for ${set.label}`);
    assert.equal(Number(card[1]), expected.length, `${folder}: ${set.label} count`);
    assert.equal(card[0].split(">")[0].includes("disabled"), expected.length === 0, `${folder}: disable an empty review list`);
    page.run(`state.results = {}; state.drafts = {}; saveResults(); start(${JSON.stringify(set.filter)})`);
    assert.deepEqual(JSON.parse(page.run("JSON.stringify(state.ids)")), expected, `${folder}: exact ${set.label} membership`);
    assert.equal(page.run("filterTitle()"), set.label, `${folder}: review title`);
    if (!expected.length) {
      assert.equal(page.run("state.view"), "empty", `${folder}: empty review fallback`);
      continue;
    }
    const first = questions.find(q => q.id === expected[0]);
    const picked = first.ungraded ? [] : first.acceptAny ? [first.answer.split(",")[0]] : first.answer.split(",");
    page.run(`state.picked = ${JSON.stringify(picked)}; check()`);
    assert.equal(page.run(`state.results[${first.id}].status`), first.ungraded ? "ungraded" : "correct", `${folder}: review uses normal grading`);
    assert.equal(page.run(`tally(questionsFor(${JSON.stringify(set.filter)})).done`), 1, `${folder}: review progress`);
    if (expected.length > 1) page.run("go(1)");
    const restored = player(folder, {}, page.storage);
    assert.equal(restored.run("state.resume.filter"), set.filter, `${folder}: review filter survives reopening`);
    assert.equal(restored.run("state.resume.id"), expected.length > 1 ? expected[1] : expected[0], `${folder}: review question survives reopening`);
    restored.run("start(state.resume.filter, state.resume.id)");
    assert.deepEqual(JSON.parse(restored.run("JSON.stringify(state.ids)")), expected, `${folder}: resumed review membership`);
    if (first.ungraded) {
      restored.run("showSummary()");
      assert.ok(restored.app.innerHTML.includes("questions reviewed. This set is for study and does not affect accuracy."), `${folder}: review-only results describe review progress`);
      assert.ok(restored.app.innerHTML.includes("Not reviewed") && !restored.app.innerHTML.includes("0 of 0 scored"), `${folder}: review-only summary omits misleading scoring metrics`);
    }
  }
  page.run("state.results = {}; saveResults()");
  // Home interactions use a small bank so scored coverage, review-only progress,
  // draft preservation, and completed-session states have exact expectations.
  const homeCfg = { ...cfg, storageKey: `${cfg.storageKey}:home-check` };
  const makeQuestion = (id, stem, focus = cfg.focus[0].id) => ({
    id, section: cfg.sections[0].id, focus, group: cfg.groups[0].id,
    stem: [stem], choices: ["First option", "Second option"], answer: "A", type: "single",
    why: "The first option satisfies the stated requirement.", wrong: { B: "The second option does not satisfy the requirement." }, notes: ["Home interaction fixture."],
  });
  const homeQuestions = [
    { ...makeQuestion(900, "Unresolved item"), ungraded: true, answer: "", wrong: {} },
    makeQuestion(901, "UniqueAlpha foundation"), makeQuestion(902, "UniqueGamma application"),
    makeQuestion(903, '<img src=x onerror="alert(1)"> UniqueBeta case study', cfg.focus[1].id),
  ];
  const setupHome = `window.Quiz.start(${JSON.stringify(homeCfg)}, ${JSON.stringify(homeQuestions)})`;
  const resetHome = player(folder);
  resetHome.run(setupHome);
  assert.ok(resetHome.app.innerHTML.includes('<small class="review-progress">0 of 1 reviewed</small>'), `${folder}: a fresh unscored set shows review progress`);
  assert.ok(resetHome.context.document.querySelector('[data-action="reset"]').disabled, `${folder}: reset is disabled without saved practice state`);
  resetHome.run("state.resume={filter:'all',id:901}; saveSession(); render()");
  assert.ok(!resetHome.context.document.querySelector('[data-action="reset"]').disabled, `${folder}: a resume point alone can be reset`);
  const beforeCanceledReset = JSON.stringify([...resetHome.storage]);
  resetHome.run("window.Quiz.application.confirm=()=>false; resetAll()");
  assert.equal(JSON.stringify([...resetHome.storage]), beforeCanceledReset, `${folder}: canceling reset leaves saved progress untouched`);
  assert.equal(resetHome.run("state.resume.id"), 901, `${folder}: canceling reset keeps the resume point`);
  const homePage = player(folder);
  homePage.run(`${setupHome}; state.results = {900:{picked:[],status:'ungraded'},901:{picked:['A'],status:'correct'},902:{picked:['B'],status:'wrong'}}; state.drafts = {903:['A']}; state.resume = {filter:'all',id:901}; saveResults(); saveSession(); render()`);
  assert.ok(homePage.app.innerHTML.includes('aria-valuetext="2 of 3 scored questions answered"'), `${folder}: unscored reading does not inflate home coverage`);
  assert.ok(homePage.app.innerHTML.includes('<b>50%</b>'), `${folder}: home accuracy uses scored answers`);
  const unscoredCard = homePage.app.innerHTML.match(/<button[^>]+data-start="review:ungraded"[\s\S]*?<\/button>/)[0];
  assert.ok(unscoredCard.includes('<small class="review-progress">1 of 1 reviewed</small>'), `${folder}: unscored review progress belongs to the Not scored card`);
  const progressCard = homePage.app.innerHTML.match(/<section class="card home-progress"[\s\S]*?<\/section>/)[0];
  assert.ok(!progressCard.includes('reviewed'), `${folder}: the progress card stays focused on scored results`);
  assert.equal(homePage.run("nextFocus()"), cfg.focus[1].id, `${folder}: recommendation skips a priority with only unresolved items left`);
  assert.equal(homePage.run("resumeTarget().id"), 903, `${folder}: resume advances past an answered question`);
  for (const query of ["903", "#903", "Q 903", "UNIQUEBETA", "uniquebeta study"]) {
    assert.deepEqual(JSON.parse(homePage.run(`JSON.stringify(matchingQuestions(${JSON.stringify(query)}).map(q => q.id))`)), [903], `${folder}: question lookup ${query}`);
  }
  const search = homePage.context.document.querySelector("#home-search");
  search.value = "UniqueBeta";
  search.events.get("input")();
  const catalog = homePage.context.document.getElementById("home-catalog");
  assert.ok(catalog.innerHTML.includes('data-question="903"'), `${folder}: input updates search results`);
  assert.ok(catalog.innerHTML.includes("Draft selection"), `${folder}: search identifies saved unfinished selections`);
  assert.ok(catalog.innerHTML.includes("&lt;img"), `${folder}: question preview escapes markup`);
  assert.ok(!catalog.innerHTML.includes("<img"), `${folder}: preview cannot create source markup`);
  assert.equal(homePage.context.document.querySelector("#home-search"), search, `${folder}: typing does not replace the search input or caret`);
  search.value = "NoSuchUniqueQuestion";
  search.events.get("input")();
  assert.ok(catalog.innerHTML.includes("No matching questions"), `${folder}: useful empty search`);
  search.events.get("keydown")({key:"Escape", preventDefault(){}});
  assert.equal(homePage.run("state.homeQuery"), "", `${folder}: Escape clears the search`);
  const homeClick = dataset => homePage.events.get("click")({defaultPrevented:false, target:{closest:()=>({disabled:false,dataset,hasAttribute:()=>false})}});
  const dashboard = homePage.context.document.querySelector(".home-dashboard");
  const resetButton = homePage.context.document.querySelector('[data-action="reset"]');
  homePage.context.window.scrollY = 330;
  homePage.context.window.scrollTo = (x, y) => { homePage.effects.pageScroll = y; };
  homeClick({homeMode:"topic"});
  assert.equal(homePage.run("state.homeMode"), "topic", `${folder}: topic browsing`);
  assert.ok(homePage.run("homeCatalogHtml()").includes(cfg.sections[0].label), `${folder}: topic cards displayed`);
  assert.equal(homePage.effects.focused, '[data-home-mode="topic"]', `${folder}: browse mode keeps keyboard focus`);
  assert.equal(homePage.context.document.querySelector(".home-dashboard"), dashboard, `${folder}: browse switch keeps the dashboard node so its animation cannot restart`);
  assert.equal(homePage.context.document.querySelector("#home-search"), search, `${folder}: browse switch preserves the search input`);
  assert.equal(homePage.context.document.querySelector("#home-catalog"), catalog, `${folder}: browse switch updates the existing catalog`);
  assert.ok(catalog.innerHTML.includes(cfg.sections[0].label), `${folder}: topic cards appear in the live catalog`);
  assert.equal(homePage.context.document.querySelector('[data-action="reset"]'), resetButton, `${folder}: browse switch preserves the reset control`);
  assert.equal(homePage.effects.pageScroll, 330, `${folder}: browse switch preserves page scroll`);
  assert.equal(homePage.context.document.querySelector('[data-home-mode="topic"]').getAttribute("aria-pressed"), "true", `${folder}: active browse mode is announced`);
  assert.equal(homePage.context.document.querySelector('[data-home-mode="priority"]').getAttribute("aria-pressed"), "false", `${folder}: previous browse mode is inactive`);
  assert.equal(homePage.context.document.querySelector(".priority-hint").textContent, "Choose an area to work on", `${folder}: topic hint updates`);
  search.value = "UniqueBeta";
  search.events.get("input")();
  homeClick({homeMode:"topic"});
  assert.equal(search.value, "UniqueBeta", `${folder}: clicking the active mode leaves the search unchanged`);
  homeClick({homeMode:"priority"});
  assert.equal(search.value, "", `${folder}: changing mode clears the search without replacing its input`);
  assert.equal(homePage.context.document.querySelector("#home-search-status").textContent, "", `${folder}: switching mode clears search announcements`);
  assert.equal(homePage.context.document.querySelector("[data-clear-search]").hidden, true, `${folder}: switching mode hides the empty-search clear action`);
  assert.ok(catalog.innerHTML.includes("data-start=\"" + cfg.focus[0].id + "\""), `${folder}: switching back displays priority cards`);
  homeClick({start:"practice:unanswered"});
  assert.deepEqual(JSON.parse(homePage.run("JSON.stringify(state.ids)")), [903], `${folder}: unanswered practice excludes answered and unscored questions`);
  assert.deepEqual(JSON.parse(homePage.run("JSON.stringify(state.picked)")), ["A"], `${folder}: home shortcut restores a draft`);
  const homeReopened = player(folder, {}, homePage.storage);
  homeReopened.run(setupHome);
  assert.equal(homeReopened.run("state.resume.filter"), "practice:unanswered", `${folder}: unanswered practice survives reopening`);
  assert.equal(homeReopened.run("resumeTarget().id"), 903, `${folder}: next unanswered question survives reopening`);
  homePage.run("state.view='home'; render()");
  const exactSearch = homePage.context.document.querySelector("#home-search");
  exactSearch.value = "#903";
  exactSearch.events.get("input")();
  homePage.context.document.querySelector(".home-search-form").events.get("submit")({preventDefault(){}});
  assert.equal(homePage.run("current().id"), 903, `${folder}: Enter opens the unique search result`);
  homePage.run("state.results[903] = {picked:['A'],status:'correct'}; state.resume=null; state.view='home'; render()");
  assert.ok(homePage.app.innerHTML.includes("You’ve covered every scored question"), `${folder}: completed bank has a useful next step`);
  assert.ok(!homePage.app.innerHTML.includes("NaN"), `${folder}: valid completed progress`);
  console.log("PASS home: score-aware progress, priority/topic browsing, safe live search, numeric lookup, keyboard search, draft shortcuts, unanswered resume, completion guidance");
  const nextSetPage = player(folder);
  nextSetPage.run(`${setupHome}; state.results={900:{picked:[],status:'ungraded'},901:{picked:['A'],status:'correct'},902:{picked:['A'],status:'correct'}}; start(${JSON.stringify(cfg.focus[0].id)}); showSummary()`);
  assert.ok(nextSetPage.app.innerHTML.includes(`Continue with ${cfg.focus[1].label}`), `${folder}: completing a priority set suggests the next unfinished priority`);
  assert.ok(nextSetPage.app.innerHTML.includes('data-action="review-set"'), `${folder}: completed sets can still be reviewed`);
  const cachedEntry = player(folder);
  cachedEntry.run(`window.QuizNavigation=undefined; ${setupHome}`);
  assert.ok(cachedEntry.app.innerHTML.includes('id="home-title"'), `${folder}: an older cached entry page remains usable without the optional navigation script`);
  const readerCfg = { ...cfg, storageKey: `${cfg.storageKey}:reader-check` };
  const readerQuestions = [
    { ...homeQuestions[1], id: 600 },
    { ...homeQuestions[1], id: 601, type: "multi", choose: 2, choices: ["One", "Two", "Three", "Four"], answer: "A,C", wrong: { B: "Two does not meet the requirement.", D: "Four does not meet the requirement." } },
    { ...homeQuestions[0], id: 602, answer: "", ungraded: true, wrong: {} },
    { ...homeQuestions[1], id: 603 },
    { ...homeQuestions[1], id: 604, answer: "A,B", type: "single", acceptAny: true, wrong: {} },
  ];
  const reader = player(folder);
  reader.run(`window.Quiz.start(${JSON.stringify(readerCfg)}, ${JSON.stringify(readerQuestions)}); start('all', 600)`);
  const action = name => reader.context.document.querySelector(`[data-action="${name}"]`);
  const click = name => { const node = action(name); assert.ok(node && !node.disabled, `${folder}: ${name} is enabled`); node.events.get("click")(); };
  assert.ok(action("clear-selection").disabled, `${folder}: empty selection cannot be cleared`);
  assert.ok(!reader.app.innerHTML.includes('class="feedback-heading"'), `${folder}: answer feedback is hidden before checking`);
  reader.context.window.scrollY = 330;
  reader.context.window.scrollTo = (x, y) => { reader.effects.pageScroll = y; };
  reader.run("toggle('B')");
  assert.equal(reader.effects.pageScroll, 330, `${folder}: selection preserves page scroll on mobile`);
  assert.ok(reader.app.innerHTML.includes("Question 600: Draft selection"), `${folder}: navigator marks an unfinished selection`);
  click("clear-selection");
  assert.equal(reader.run("state.picked.length"), 0, `${folder}: clear selection empties the draft`);
  assert.equal(reader.effects.focused, `[data-pick="${reader.run("displayOptions(current())[0].id")}"]`, `${folder}: clear selection returns focus to the first displayed answer`);
  const cleared = player(folder, {}, reader.storage);
  cleared.run(`window.Quiz.start(${JSON.stringify(readerCfg)}, ${JSON.stringify(readerQuestions)})`);
  assert.equal(cleared.run("state.drafts[600].length"), 0, `${folder}: cleared draft stays cleared after reopening`);
  reader.run("jump(1); toggle('A'); toggle('B'); toggle('C')");
  assert.ok(reader.app.innerHTML.includes("Remove 1 selection to check your answers."), `${folder}: too many choices explains how to proceed`);
  assert.ok(action("check").disabled, `${folder}: too many choices cannot be checked`);
  reader.run("toggle('B')");
  assert.ok(reader.app.innerHTML.includes("Ready to check your answers."), `${folder}: exact selection is ready to check`);
  click("check");
  const multiLabels = reader.run("displayLetters(current(), ['A','C']).join(', ')");
  assert.ok(reader.app.innerHTML.includes(`Your answers: ${multiLabels} · Correct answers: ${multiLabels}`), `${folder}: feedback separates chosen and correct answers`);
  assert.equal(action("clear-selection"), null, `${folder}: clear is hidden after checking`);
  reader.run("clearSelection()");
  assert.equal(reader.run("state.results[601].status"), "correct", `${folder}: completed answers cannot be cleared`);
  reader.run("state.results[603] = {picked:['B'],status:'wrong'}; state.results[604] = {picked:['A'],status:'correct'}; render()");
  assert.ok(reader.app.innerHTML.includes('aria-valuetext="3 of 4 scored questions answered"'), `${folder}: question coverage excludes unscored items`);
  assert.ok(reader.app.innerHTML.includes("67% accuracy"), `${folder}: question accuracy uses scored answers`);
  click("next-unanswered");
  assert.equal(reader.run("current().id"), 600, `${folder}: next unanswered wraps and skips answered and unscored items`);
  assert.ok(action("next-unanswered").disabled, `${folder}: next unanswered does not loop to the current question`);
  reader.run("toggle('B'); check()");
  assert.ok(reader.app.innerHTML.includes(reader.run("'Your answer: '+displayLetters(current(), ['B']).join(', ')+' · Correct answer: '+displayLetters(current(), ['A']).join(', ')")), `${folder}: missed feedback identifies the difference`);
  reader.run("jump(4)");
  assert.ok(reader.app.innerHTML.includes("Accepted answers (choose one): A, B"), `${folder}: equivalent single-choice answers are clearly labeled`);
  reader.run("start('review:ungraded'); check()");
  assert.ok(reader.app.innerHTML.includes("Review only · no scored questions"), `${folder}: unscored-only set has reading guidance`);
  assert.ok(reader.app.innerHTML.includes("Review only · excluded from your score"), `${folder}: unscored feedback does not imply grading`);
  assert.ok(!reader.app.innerHTML.includes('class="answer-heading"'), `${folder}: no answer is invented for an unresolved item`);
  click("results");
  assert.equal(reader.run("state.view"), "summary", `${folder}: results is reachable during practice`);
  reader.run("start('all', 600)");
  const beforeFiltering = reader.run("JSON.stringify({ids:state.ids,picked:state.picked,results:state.results,drafts:state.drafts,resume:state.resume})");
  const savedBeforeFiltering = JSON.stringify([...reader.storage]);
  const chooseNavigatorFilter = value => {
    const select = reader.context.document.querySelector("#navigator-filter");
    select.value = value;
    select.events.get("change")();
  };
  chooseNavigatorFilter("missed");
  assert.deepEqual(JSON.parse(reader.run("JSON.stringify(pool().filter(q=>navigatorMatches(q)).map(q=>q.id))")), [600,603], `${folder}: missed navigator filter includes only missed questions`);
  assert.ok(reader.app.innerHTML.includes('data-jump="1" hidden'), `${folder}: completed correct questions are hidden by the missed filter`);
  chooseNavigatorFilter("answered");
  assert.equal(reader.run("pool().filter(q=>navigatorMatches(q)).length"), 5, `${folder}: answered filter includes unscored questions that were reviewed`);
  chooseNavigatorFilter("unanswered");
  assert.ok(reader.app.innerHTML.includes("No questions match this filter"), `${folder}: an empty navigator filter explains how to recover`);
  chooseNavigatorFilter("all");
  assert.equal(reader.run("JSON.stringify({ids:state.ids,picked:state.picked,results:state.results,drafts:state.drafts,resume:state.resume})"), beforeFiltering, `${folder}: navigator filtering cannot change the set or practice selections`);
  assert.equal(JSON.stringify([...reader.storage]), savedBeforeFiltering, `${folder}: filtering does not write to saved progress`);
  console.log("PASS navigation: independent quiz identity, active section, shared footer, status filters and progress preservation");
  console.log("PASS question page: clear drafts, selection guidance, answer recaps, set progress, unanswered navigation, mobile scroll retention, unscored and equivalent-answer feedback");
  if (folder === "salesforce-certified-platform-developer") {
    const codePage = player(folder);
    codePage.context.window.matchMedia = () => ({ matches: true });
    for (const id of [20, 127]) {
      codePage.run(`start('all', ${id}); state.picked = current().answer.slice(); check()`);
      assert.ok(codePage.app.innerHTML.includes('aria-label="Question code sample"'), `Q${id}: code remains in the reader`);
      assert.equal(codePage.effects.focused, ".explain", `Q${id}: explanation gets keyboard focus`);
      assert.equal(codePage.context.document.querySelector(".panel-body").scrollTop, 780, `Q${id}: feedback scrolls the reader`);
      assert.equal(codePage.effects.scrolled, null, `Q${id}: feedback does not scroll the main window or code ancestors`);
    }
    console.log("PASS Q20 / Q127: desktop feedback scroll stays inside the question reader");
  }
  for (const q of questions.filter(q => q.source)) {
    const key = q.acceptAny ? [q.answer.split(",")[0]] : q.answer.split(",");
    page.run(`start("all"); jump(state.ids.indexOf(${q.id})); state.picked = ${JSON.stringify(key)}; check()`);
    assert.equal(page.app.innerHTML.includes("Graded here as"), Boolean(q.corrected), `${folder} Q${q.id}: answer-change message only for a wrong mock key`);
    const badge = `class="flag">${cfg.copy?.corrected || "Corrected answer"}</span>`;
    assert.equal(page.app.innerHTML.includes(badge), Boolean(q.corrected), `${folder} Q${q.id}: Corrected badge`);
    assert.equal(page.app.innerHTML.includes('class="flag repaired"'), Boolean(q.repaired), `${folder} Q${q.id}: Repaired badge`);
    assert.ok(!page.app.innerHTML.includes("Earlier wording"), `${folder} Q${q.id}: earlier wording is not displayed`);
    assert.ok(!page.app.innerHTML.includes('class="more source"'), `${folder} Q${q.id}: no source-history disclosure`);
  }
  assert.equal(page.run(`normalizeQuestion({...window.QUIZ_QUESTIONS[0], corrected:true, printed:window.QUIZ_QUESTIONS[0].answer}).corrected`), undefined, `${folder}: player suppresses an unchanged-key flag`);
  assert.equal(page.run(`normalizeQuestion({...window.QUIZ_QUESTIONS[0], corrected:true, printed:'B', answer:'A,B', acceptAny:true, type:'single'}).corrected`), undefined, `${folder}: an accepted printed answer is not wrong`);
  assert.equal(page.run(`normalizeQuestion({...window.QUIZ_QUESTIONS[0], repaired:true, ungraded:true}).repaired`), undefined, `${folder}: unresolved repair stays Not scored`);
  assert.equal(page.run(`normalizeQuestion({...window.QUIZ_QUESTIONS[0], repaired:true, corrected:true, printed:'B', answer:'A', ungraded:false}).repaired`), undefined, `${folder}: a wrong source key stays Corrected`);
  const q = questions.find(q => !q.ungraded && !q.acceptAny);
  const answer = q.answer.split(",");
  const saved = player(folder, {
    [q.id]: { picked: answer, status: "wrong" },
    999999: { picked: ["A"], status: "correct" },
  });
  assert.equal(saved.run(`state.results[${q.id}].status`), "correct", `${folder}: regrade saved selection`);
  assert.equal(saved.run("state.results[999999]"), undefined);
  const multi = questions.find(q => !q.ungraded && q.answer.split(",").length > 1 && !q.acceptAny);
  page.run(`state.results = {}; state.drafts = {}; saveResults(); start("all"); jump(state.ids.indexOf(${multi.id})); toggle(${JSON.stringify(multi.answer.split(",")[0])}); check()`);
  assert.equal(page.run(`state.results[${multi.id}]`), undefined, `${folder}: incomplete multi cannot be submitted`);
  page.context.document.querySelector(".panel-body").scrollTop = 240;
  page.context.document.querySelector(".jump").scrollTop = 60;
  const nextLetter = multi.answer.split(",")[1];
  page.run(`toggle(${JSON.stringify(nextLetter)})`);
  assert.equal(page.context.document.querySelector(".panel-body").scrollTop, 240, `${folder}: selection preserves body scroll`);
  assert.equal(page.context.document.querySelector(".jump").scrollTop, 60, `${folder}: selection preserves navigator scroll`);
  assert.equal(page.effects.focused, `[data-pick="${nextLetter}"]`, `${folder}: selection restores focus`);
  const draft = JSON.parse(page.run("JSON.stringify(state.picked)"));
  page.run("go(1); go(-1)");
  assert.deepEqual(JSON.parse(page.run("JSON.stringify(state.picked)")), draft, `${folder}: skipped draft is retained`);
  const reopened = player(folder, {}, page.storage);
  assert.equal(reopened.run("state.resume.id"), multi.id, `${folder}: last question is remembered`);
  assert.deepEqual(JSON.parse(reopened.run(`JSON.stringify(state.drafts[${multi.id}])`)), draft, `${folder}: draft survives reopen`);
  const keyEvent = (key, tag = "body") => ({ key, target: { closest: selector => selector.split(",").some(s => s.trim() === tag) ? {} : null }, preventDefault() { this.prevented = true; } });
  page.events.get("keydown")(keyEvent("Enter", "button"));
  assert.equal(page.run(`state.results[${multi.id}]`), undefined, `${folder}: native Enter does not also submit globally`);
  for (const letter of multi.answer.split(",").slice(2)) page.run(`toggle(${JSON.stringify(letter)})`);
  page.events.get("keydown")(keyEvent("Enter"));
  assert.equal(page.run(`state.results[${multi.id}].status`), "correct", `${folder}: keyboard check complete multi`);
  assert.equal(page.effects.focused, ".explain", `${folder}: feedback gets focus`);
  page.run("jump(state.ids.length - 1); go(1)");
  assert.equal(page.run("state.view"), "summary", `${folder}: final skip opens summary`);
  assert.ok(page.app.innerHTML.includes("Continue unanswered"));
  page.context.window.matchMedia = () => ({ matches: false });
  page.run("state.mapOpen = null; start('all')");
  assert.ok(!page.app.innerHTML.match(/<details class="card side"[^>]*>/)[0].includes("open"), `${folder}: mobile navigator starts collapsed`);
  assert.ok(page.run("inlineHtml('<script>alert(1)</script> https://example.com/?a=1&b=2')").includes("&lt;script&gt;"));
  assert.ok(page.run("inlineHtml('https://example.com/?a=1&b=2')").includes('rel="noopener noreferrer"'));
  const ungraded = { ...questions[0], answer: "", ungraded: true, corrected: false, wrong: {}, type: "single" };
  page.run(`window.Quiz.start(${JSON.stringify({...cfg,storageKey:cfg.storageKey+":ungraded-test"})}, [${JSON.stringify(ungraded)}]); start('all'); check()`);
  assert.equal(page.run(`state.results[${ungraded.id}].status`), "ungraded");
  page.run(`window.Quiz.start(${JSON.stringify({...cfg,storageKey:cfg.storageKey+":ungraded-test"})}, [${JSON.stringify(ungraded)}])`);
  assert.equal(page.run(`state.results[${ungraded.id}].status`), "ungraded", `${folder}: unscored reading persists without a selection`);
  page.context.localStorage.setItem = () => { throw Error("Storage disabled"); };
  page.run("start('all'); retry(); saveSession(); render()");
  assert.equal(page.run("state.storageIssue"), true, `${folder}: storage failure is reported`);
  assert.ok(page.app.innerHTML.includes("Progress could not be saved"));
  console.log(`PASS ${folder}: ${questions.length} questions, ${questions.filter(q=>q.corrected).length} corrected, ${questions.filter(q=>q.repaired).length} repaired, ${questions.filter(q=>q.ungraded).length} ungraded; schema, metadata, grading, file startup, review counts, filters, badges, saved review resume and regrading`);
  console.log("PASS UX: exact multi count, draft/resume persistence, scroll/focus retention, native keyboard actions, final summary, mobile navigator defaults, safe reference links, unscored reading");
  require("./validate-shuffle.js")(player, folder, cfg);
  require("./validate-exam.js")(player, folder, cfg);
  total += questions.length;
}
console.log(`PASS ${folders.length} quizzes / ${total} questions. No data fetch or build step required.`);
require("./validate-notices.js");
