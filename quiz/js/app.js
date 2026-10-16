const COPY = {
  clear: "Clear progress",
  answered: "Answered",
  correct: "Correct",
  missed: "Missed",
  wrong: "Wrong",
  reviewMissed: "Review missed",
  start: "Start",
  startWith: "Start with",
  continue: "Continue",
  home: "Home",
  back: "Back to home",
  previous: "Previous",
  next: "Next",
  tryAgain: "Try again",
  check: "Check answer",
  checkMany: "Check answers",
  selectOne: "Select one",
  selected: "Selected",
  selectN: "Select",
  ofSelected: "selected",
  question: "Question",
  questions: "Questions",
  studyOrder: "Study order",
  all: "All questions",
  missedList: "Missed questions",
  corrected: "Corrected answer",
  repaired: "Repaired",
  notScored: "Not scored",
  reviewChanges: "Mock review",
  reviewChangesNote: "Understand changed answers and unresolved questions.",
  reviewCorrectedNote: "The original answer key was wrong. Practice the reviewed answer.",
  reviewRepairedNote: "Question content was repaired. The original answer is still accepted.",
  reviewNotScoredNote: "Unresolved questions for study. These do not affect your score.",
  noQuestions: "No questions in this quiz",
  otherChoices: "The other choices",
  fullExplanation: "Full explanation",
  correctTitle: "Correct",
  wrongTitle: "Not quite",
  readTitle: "How to read this",
  sourceSays: "The source says",
  gradedAs: "Graded here as",
  missingFigure: "The original figure is missing. Use the question text, then read the explanation.",
  emptyMissed: "No missed questions",
  emptyMissedNote: "Nothing left to review.",
  emptyList: "Nothing in this list",
  emptyNote: "Pick another list.",
  confirmClear: "Clear all saved answers in this browser?",
  notStarted: "Not started",
  ofAnswered: "answered",
  toSelect: "to select",
  toCheck: "to check",
  forPrevious: "for Previous",
  forNext: "for Next",
  skip: "Skip for now",
  results: "View results",
  finish: "Set complete",
  practiceSoFar: "Your practice so far",
  remaining: "Unanswered",
  accuracy: "Accuracy",
  continueUnanswered: "Continue unanswered",
  reviewAllMissed: "Review all missed",
  navigator: "Question navigator",
  goTo: "Go to question",
  go: "Go",
  selectionHint: "Select exactly",
  answerCorrect: "Correct answer",
  yourAnswer: "Your answer",
  readExplanation: "Read explanation",
  notScoredNote: "This question is for review only and does not affect your score.",
  storageNotice: "Progress could not be saved in this browser. Keep this tab open to retain this session.",
  savedLocally: "Progress is saved in this browser on this device.",
  progressOptions: "Manage progress",
};
const CHOICE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const REVIEW_SETS = [
  { id: "review:corrected", flag: "corrected", label: "corrected", detail: "reviewCorrectedNote" },
  { id: "review:repaired", flag: "repaired", label: "repaired", detail: "reviewRepairedNote" },
  { id: "review:ungraded", flag: "ungraded", label: "notScored", detail: "reviewNotScoredNote" },
];
let data;
let exam = {};
let STORAGE_KEY = "practice-v1";
let questions = [];
let byId = new Map();
let state;

function codeText(value) {
  return Array.isArray(value) ? value.join("\n") : value;
}

function asBlocks(value) {
  if (value == null) return [];
  const list = Array.isArray(value) ? value : [value];
  return list.flatMap((item) => {
    if (typeof item === "string") return [{ type: "text", text: item }];
    if (item.ask) return [{ type: "ask", text: item.ask }];
    if (item.code != null && item.text == null && !item.type) return [{ type: "code", text: codeText(item.code) }];
    if (item.type && item.text != null) return [item];
    return [{ type: "text", text: String(item.text ?? item) }];
  });
}

function parseLetters(value) {
  if (Array.isArray(value)) return value.slice();
  return String(value).split(/[,\s]+/).filter(Boolean);
}

function isAnswerCorrection(raw) {
  const printed = parseLetters(raw.printed || raw.source?.answer || []);
  const answer = parseLetters(raw.answer);
  if (raw.ungraded || !printed.length || !answer.length) return false;
  if (raw.acceptAny) return printed.length !== 1 || !answer.includes(printed[0]);
  return [...printed].sort().join(",") !== [...answer].sort().join(",");
}

function normalizeQuestion(raw) {
  if (raw.options && raw.explain && !raw.choices && raw.why == null && raw.wrong == null) return raw;
  const answer = parseLetters(raw.answer);
  const type = raw.type || (raw.acceptAny ? "single" : (answer.length > 1 ? "multi" : "single"));
  const options = (raw.choices || []).map((choice, index) => {
    if (typeof choice === "string") return { id: CHOICE_LETTERS[index], text: choice };
    if (choice.code != null && choice.text == null) {
      return { id: choice.id || CHOICE_LETTERS[index], text: codeText(choice.code), code: true };
    }
    return { id: choice.id || CHOICE_LETTERS[index], text: choice.text, code: !!choice.code };
  });
  const question = {
    id: raw.id,
    section: raw.section,
    focus: raw.focus,
    group: raw.group || raw.pattern,
    type,
    choose: raw.choose != null ? raw.choose : (type === "multi" ? answer.length : null),
    stem: asBlocks(raw.stem),
    options,
    answer,
    explain: {
      why: asBlocks(raw.why),
      others: Object.entries(raw.wrong || {}).map(([id, text]) => ({ id, text })),
      notes: raw.notes != null ? asBlocks(raw.notes) : [],
    },
  };
  if (raw.corrected && isAnswerCorrection(raw)) {
    question.corrected = true;
    question.printed = parseLetters(raw.printed || []);
  }
  if (raw.repaired && !raw.ungraded && !isAnswerCorrection(raw)) question.repaired = true;
  if (raw.ungraded) question.ungraded = true;
  if (raw.acceptAny) question.acceptAny = true;
  if (raw.exhibitMissing) question.exhibitMissing = true;
  return question;
}

function normalizeBank(raw) {
  if (!raw || typeof raw !== "object" || !raw.id || !raw.title || !raw.storageKey) {
    throw new Error("quiz.js needs id, title, and storageKey.");
  }
  if (!Array.isArray(raw.sections) || !raw.sections.length) {
    throw new Error("quiz.js needs a sections array.");
  }
  const sectionOrder = [];
  const sections = {};
  const weights = {};
  for (const section of raw.sections) {
    if (!section.id || !section.label) throw new Error("Each section needs an id and a label.");
    sectionOrder.push(section.id);
    sections[section.id] = section.label;
    if (section.weight) weights[section.id] = section.weight;
  }
  const focusIds = new Set((raw.focus || []).map((item) => item.id));
  const groupIds = new Set((raw.groups || []).map((item) => item.id));
  const seen = new Set();
  const normalized = (raw.questions || []).map((question) => {
    if (!question || typeof question.id !== "number") {
      throw new Error("Every question needs a numeric id.");
    }
    if (seen.has(question.id)) throw new Error(`Question ${question.id} is listed twice.`);
    seen.add(question.id);
    if (!sections[question.section]) {
      throw new Error(`Question ${question.id} uses an unknown section "${question.section}".`);
    }
    if (question.focus && !focusIds.has(question.focus)) {
      throw new Error(`Question ${question.id} uses an unknown focus "${question.focus}".`);
    }
    if (question.group && !groupIds.has(question.group)) {
      throw new Error(`Question ${question.id} uses an unknown group "${question.group}".`);
    }
    if (!Array.isArray(question.stem) || !question.stem.length) {
      throw new Error(`Question ${question.id} needs a stem.`);
    }
    if (!Array.isArray(question.choices) || question.choices.length < 2) {
      throw new Error(`Question ${question.id} needs at least two choices.`);
    }
    const ready = normalizeQuestion(question);
    const letters = new Set(ready.options.map((option) => option.id));
    if (ready.answer.some((letter) => !letters.has(letter))) {
      throw new Error(`Question ${question.id} has an answer that is not one of its choices.`);
    }
    return ready;
  });
  return {
    exam: {
      id: raw.id,
      title: raw.title,
      subtitle: raw.subtitle || "",
      storageKey: raw.storageKey,
      headline: raw.headline || "",
      lead: raw.lead || "",
      groupsTitle: raw.groupsTitle || "",
      groupsNote: raw.groupsNote || "",
      sectionsTitle: raw.sectionsTitle || "",
      allLabel: raw.allLabel || "",
      allDetail: raw.allDetail || "",
      copy: raw.copy || {},
      legend: raw.legend || [],
    },
    sectionOrder,
    sections,
    weights,
    focus: raw.focus || [],
    groups: raw.groups || [],
    questions: normalized,
  };
}

function t(key) {
  return exam.copy?.[key] || COPY[key];
}

function boot(bank) {
  data = bank;
  exam = bank.exam;
  STORAGE_KEY = exam.storageKey || "practice-v1";
  questions = data.questions.slice().sort((a, b) => a.id - b.id);
  byId = new Map(questions.map((question) => [question.id, question]));
  state = {
    view: "home",
    filter: "all",
    index: 0,
    ids: [],
    picked: [],
    motion: "",
    results: loadResults(),
    drafts: {},
    resume: null,
    storageIssue: false,
    mapOpen: null,
    jumpError: "",
    jumpValue: "",
    homeMode: "priority",
    homeQuery: "",
  };
  const session = loadSession();
  state.drafts = session.drafts;
  state.resume = session.resume;
  render();
}

function loadSession() {
  try {
    const session = JSON.parse(localStorage.getItem(`${STORAGE_KEY}:session`));
    const drafts = {};
    for (const q of questions) {
      const picked = session?.drafts?.[q.id];
      if (!Array.isArray(picked) || new Set(picked).size !== picked.length) continue;
      if (picked.some(id => !q.options.some(option => option.id === id))) continue;
      if (q.type === "single" && picked.length > 1) continue;
      if (!state.results[q.id]) drafts[q.id] = picked.slice();
    }
    const filters = ["all", "missed", "practice:unanswered", ...REVIEW_SETS.map(set => set.id), ...sectionIds(), ...(data.focus || []).map(f => f.id)];
    const resume = session && filters.includes(session.filter) && byId.has(session.id)
      ? { filter: session.filter, id: session.id }
      : null;
    return { drafts, resume };
  } catch {
    return { drafts: {}, resume: null };
  }
}

function saveSession() {
  if (state.view === "quiz" && current()) state.resume = { filter: state.filter, id: current().id };
  try {
    localStorage.setItem(`${STORAGE_KEY}:session`, JSON.stringify({ ...state.resume, drafts: state.drafts }));
  } catch {
    state.storageIssue = true;
  }
}

function loadResults() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) return {};
    const results = {};
    for (const q of questions) {
      const picked = saved[q.id]?.picked;
      if (!Array.isArray(picked) || (!picked.length && !q.ungraded) || new Set(picked).size !== picked.length) continue;
      if (picked.some((id) => !q.options.some((option) => option.id === id))) continue;
      // Regrade saved selections when a source answer is corrected.
      results[q.id] = { picked: picked.slice(), status: grade(q, picked) };
    }
    return results;
  } catch {
    return {};
  }
}

function saveResults() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.results));
  } catch {
    state.storageIssue = true;
  }
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function inlineHtml(text) {
  return String(text).split(/(`[^`\n]+`)/g).map((part) => {
    if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
      return `<code>${esc(part.slice(1, -1))}</code>`;
    }
    return part.split(/(https?:\/\/[^\s<>"`]+)/g).map(piece => {
      if (!/^https?:\/\//.test(piece)) return esc(piece);
      const url = piece.replace(/[.,;!?]+$/, "");
      const suffix = piece.slice(url.length);
      const domain = url.replace(/^https?:\/\//, "").split("/")[0];
      return `<a class="reference-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer" title="${esc(url)}">${esc(domain)} <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a>${esc(suffix)}`;
    }).join("");
  }).join("");
}

function blocksHtml(blocks, lead) {
  return (blocks || []).map((block, index) => {
    if (block.type === "code") return `<pre class="codeblock" tabindex="0" aria-label="Code sample"><code>${esc(block.text)}</code></pre>`;
    return `<p class="${lead && index === 0 ? "lead" : ""}">${inlineHtml(block.text)}</p>`;
  }).join("");
}

function askBlockHtml(block) {
  const text = block.text.trim();
  if (/^Choose \d+ answers?\.?$/i.test(text)) {
    return `<p class="choose">${esc(text.replace(/\.$/, ""))}</p>`;
  }
  return `<p class="ask">${esc(text)}</p>`;
}

function stemHtml(question) {
  const blocks = question.stem || [];
  const html = [];
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.type === "code") {
      html.push(`<pre class="codeblock" tabindex="0" aria-label="Question code sample"><code>${esc(block.text)}</code></pre>`);
      continue;
    }
    if (block.type !== "ask") {
      html.push(`<p class="scene">${esc(block.text)}</p>`);
      continue;
    }
    const asks = [];
    while (i < blocks.length && blocks[i].type === "ask") {
      asks.push(blocks[i]);
      i += 1;
    }
    i -= 1;
    html.push(`<div class="prompt">${asks.map(askBlockHtml).join("")}</div>`);
  }
  return html.join("");
}

function answerPreview(option) {
  const first = option.text.split("\n").map((line) => line.trim()).find(Boolean) || option.text;
  return first.length > 160 ? `${first.slice(0, 157)}…` : first;
}

function choiceListHtml(items) {
  if (!items.length) return "";
  const rows = items.map((item) => `
    <li>
      <span class="letter">${esc(item.id)}</span>
      <p>${inlineHtml(item.text)}</p>
    </li>`).join("");
  return `<div class="why-not"><h3>${esc(t("otherChoices"))}</h3><ul class="choice-points">${rows}</ul></div>`;
}

function explanationHtml(q, status) {
  const title = status === "correct" ? t("correctTitle") : status === "wrong" ? t("wrongTitle") : t("readTitle");
  const tone = status === "ungraded" ? "neutral" : status === "wrong" ? "bad" : "good";
  const explain = q.explain;
  const chosen = q.options.filter((option) => q.answer.includes(option.id));
  const answers = chosen.map((option) => `
    <div class="answer-line">
      <span class="letter">${option.id}</span>
      <span class="body">${esc(answerPreview(option))}</span>
    </div>`).join("");
  const why = explain.why?.length
    ? `<h3 class="why-title">Why</h3><div class="prose">${blocksHtml(explain.why, true)}</div>`
    : "";
  const notes = explain.notes?.length
    ? `<details class="more"><summary>${esc(t("fullExplanation"))}</summary><div class="prose">${blocksHtml(explain.notes)}</div></details>`
    : "";
  const printed = q.corrected
    ? `<p class="mock-note">${esc(t("sourceSays"))} ${esc(q.printed.join(", "))}. ${esc(t("gradedAs"))} ${esc(q.answer.join(", "))}.</p>`
    : "";
  const picked = state.results[q.id]?.picked || [];
  const recap = q.ungraded
    ? "Review only · excluded from your score"
    : `Your ${picked.length === 1 ? "answer" : "answers"}: ${picked.join(", ")} · ${q.acceptAny ? "Accepted answers (choose one)" : q.answer.length > 1 ? "Correct answers" : "Correct answer"}: ${q.answer.join(", ")}`;
  return `<section class="explain ${tone}" tabindex="-1" aria-label="${esc(title)}">
    <div class="feedback-heading"><span class="feedback-icon" aria-hidden="true">${status === "correct" ? "✓" : status === "wrong" ? "×" : "i"}</span><div><h2>${esc(title)}</h2><p>${esc(recap)}</p></div></div>
    ${answers ? `<h3 class="answer-heading">${q.ungraded ? "Reference answer" : q.acceptAny ? "Accepted alternatives" : "The answer"}</h3>` : ""}
    ${answers}
    ${why}
    ${choiceListHtml(explain.others || [])}
    ${notes}
    ${printed}
  </section>`;
}

function focusMeta(id) {
  return (data.focus || []).find((item) => item.id === id);
}

function groups() {
  return data.groups || data.patterns || [];
}

function patternMeta(id) {
  return groups().find((item) => item.id === id);
}

function sectionIds() {
  if (Array.isArray(data.sectionOrder) && data.sectionOrder.length) return data.sectionOrder;
  return Object.keys(data.sections || {});
}

function questionsFor(filter) {
  if (filter === "missed") {
    return questions.filter((q) => state.results[q.id]?.status === "wrong");
  }
  if (filter === "all") return questions;
  if (filter === "practice:unanswered") return questions.filter(q => !q.ungraded && !state.results[q.id]);
  const review = REVIEW_SETS.find(set => set.id === filter);
  if (review) return questions.filter(q => q[review.flag]);
  const focus = focusMeta(filter);
  if (focus) {
    const list = questions.filter((q) => q.focus === filter);
    if (!focus.ordered) return list;
    const rank = new Map(groups().map((group, index) => [group.id, index]));
    return list.slice().sort((a, b) => (rank.get(a.group) ?? 999) - (rank.get(b.group) ?? 999) || a.id - b.id);
  }
  return questions.filter((q) => q.section === filter);
}

function pool() {
  return state.ids.map((id) => byId.get(id)).filter(Boolean);
}

function current() {
  return pool()[state.index];
}

function grade(q, picked) {
  if (q.ungraded) return "ungraded";
  const chosen = [...picked].sort().join("");
  if (q.acceptAny) {
    return picked.length === 1 && q.answer.includes(picked[0]) ? "correct" : "wrong";
  }
  const expected = [...q.answer].sort().join("");
  return chosen === expected ? "correct" : "wrong";
}

function tally(list) {
  let correct = 0;
  let wrong = 0;
  let done = 0;
  for (const q of list) {
    const status = state.results[q.id]?.status;
    if (!status) continue;
    done += 1;
    if (status === "correct") correct += 1;
    if (status === "wrong") wrong += 1;
  }
  return { correct, wrong, done, total: list.length };
}

function sectionLabel(id) {
  return data.sections[id] || "All questions";
}

function rememberedPick() {
  const q = current();
  return q ? (state.results[q.id]?.picked || state.drafts[q.id] || []).slice() : [];
}

function rememberDraft() {
  const q = current();
  if (q && !state.results[q.id]) state.drafts[q.id] = state.picked.slice();
}

function start(filter, resumeId) {
  if (state.view === "quiz") rememberDraft();
  const list = questionsFor(filter);
  state.filter = filter;
  state.ids = list.map((q) => q.id);
  if (!list.length) {
    state.view = "empty";
    state.picked = [];
    render();
    return;
  }
  let resume = list.findIndex(q => q.id === resumeId);
  if (resume < 0) resume = list.findIndex((q) => !state.results[q.id]);
  state.index = resume === -1 ? 0 : resume;
  state.picked = rememberedPick();
  state.view = "quiz";
  state.motion = "arrive";
  state.jumpError = "";
  state.jumpValue = "";
  saveSession();
  render({ focus: ".qnum" });
}

function go(delta) {
  rememberDraft();
  if (delta > 0 && state.index === pool().length - 1) {
    showSummary();
    return;
  }
  jump(Math.min(pool().length - 1, Math.max(0, state.index + delta)));
}

function jump(index) {
  if (!Number.isInteger(index) || index < 0 || index >= state.ids.length) return;
  if (state.view === "quiz") rememberDraft();
  state.index = index;
  state.view = "quiz";
  state.picked = rememberedPick();
  state.motion = "arrive";
  state.jumpError = "";
  state.jumpValue = "";
  saveSession();
  render({ focus: ".qnum" });
}

function showSummary() {
  rememberDraft();
  saveSession();
  state.view = "summary";
  render({ focus: ".summary-title" });
}

function canCheck(q) {
  if (!q || state.results[q.id]) return false;
  if (q.ungraded) return true;
  return state.picked.length === (q.type === "multi" ? q.choose || q.answer.length : 1);
}

function toggle(letter) {
  const q = current();
  if (state.results[q.id]) return;
  if (q.type === "single") {
    state.picked = [letter];
  } else if (state.picked.includes(letter)) {
    state.picked = state.picked.filter((item) => item !== letter);
  } else {
    state.picked = state.picked.concat(letter);
  }
  rememberDraft();
  saveSession();
  render({ preserve: true, focus: `[data-pick="${letter}"]` });
}

function check() {
  const q = current();
  if (!canCheck(q)) return;
  const status = grade(q, state.picked);
  state.results[q.id] = { picked: state.picked.slice(), status };
  delete state.drafts[q.id];
  saveResults();
  saveSession();
  render({ focus: ".explain", feedback: true });
}

function retry() {
  const q = current();
  delete state.results[q.id];
  state.picked = [];
  delete state.drafts[q.id];
  state.motion = "arrive";
  saveResults();
  saveSession();
  render({ focus: ".qnum" });
}

function clearSelection() {
  const q = current();
  if (!q || state.results[q.id] || !state.picked.length) return;
  state.picked = [];
  rememberDraft();
  saveSession();
  render({ preserve: true, focus: `[data-pick="${q.options[0].id}"]` });
}

function nextUnansweredIndex() {
  for (let offset = 1; offset < state.ids.length; offset++) {
    const index = (state.index + offset) % state.ids.length;
    const q = byId.get(state.ids[index]);
    if (q && !q.ungraded && !state.results[q.id]) return index;
  }
  return -1;
}

function resetAll() {
  if (!confirm(t("confirmClear"))) return;
  state.results = {};
  state.drafts = {};
  state.resume = null;
  saveResults();
  state.view = "home";
  saveSession();
  render({ focus: ".hero h1" });
}

function optionClass(q, option, result) {
  const selected = state.picked.includes(option.id);
  if (!result || q.ungraded) return selected ? "option selected" : "option";
  const right = q.answer.includes(option.id);
  if (right && (selected || !q.acceptAny)) return selected ? "option correct" : "option missed";
  if (selected) return "option wrong";
  return "option";
}

function render(options = {}) {
  if (exam.title) document.title = exam.title;
  const app = document.getElementById("app");
  const oldScroll = options.preserve ? document.querySelector(".panel-body")?.scrollTop || 0 : 0;
  const navScroll = options.preserve ? document.querySelector(".jump")?.scrollTop || 0 : null;
  const pageScroll = options.preserve ? window.scrollY : null;
  if (state.view === "home") app.innerHTML = homeHtml();
  else if (state.view === "empty") app.innerHTML = emptyHtml();
  else if (state.view === "summary") app.innerHTML = summaryHtml();
  else app.innerHTML = quizHtml();
  state.motion = "";
  bind();
  const body = document.querySelector(".panel-body");
  if (body) body.scrollTop = oldScroll;
  if (navScroll != null) {
    const nav = document.querySelector(".jump");
    if (nav) nav.scrollTop = navScroll;
  }
  const focus = options.focus ? document.querySelector(options.focus) : null;
  focus?.focus({ preventScroll: options.preserve || options.feedback });
  if (options.feedback && focus) {
    if (body && window.matchMedia?.("(min-width: 861px)").matches) {
      // Reveal feedback within the desktop reader without scrolling its ancestors.
      const offset = focus.getBoundingClientRect().top - body.getBoundingClientRect().top;
      body.scrollTop = Math.max(0, body.scrollTop + offset - 20);
    } else {
      focus.scrollIntoView({ block: "start", inline: "nearest" });
    }
  }
  if (pageScroll != null) window.scrollTo?.(0, pageScroll);
}

function storageNoteHtml() {
  return state.storageIssue ? `<p class="note storage-note" role="status">${esc(t("storageNotice"))}</p>` : "";
}

function listButton(filter, label, detail, extraClass) {
  const list = questionsFor(filter);
  const progress = tally(list);
  const width = list.length ? Math.round((progress.done / list.length) * 100) : 0;
  const progressNote = !list.length ? t("noQuestions") : !progress.done ? t("notStarted")
    : `${progress.done}/${list.length} complete${progress.wrong ? ` · ${progress.wrong} missed` : ""}`;
  const note = [detail, progressNote].filter(Boolean).join(" · ");
  return `<button class="section-btn${extraClass ? ` ${extraClass}` : ""}" data-start="${esc(filter)}"${list.length ? "" : " disabled"}>
    <span class="section-name"><b>${esc(label)}</b><small>${esc(note)}</small></span>
    <em>${list.length}</em>
    <span class="section-meter" aria-hidden="true"><span style="width:${width}%"></span></span>
  </button>`;
}

function nextFocus() {
  const order = (data.focus || []).map((item) => item.id);
  if (!order.length) return "all";
  return order.find((id) => {
    return questionsFor(id).some(q => !q.ungraded && !state.results[q.id]);
  }) || order[0];
}

function reviewSectionHtml() {
  return `<section class="card review-panel" aria-labelledby="review-changes-title">
    <h2 id="review-changes-title">${esc(t("reviewChanges"))}</h2>
    <p>${esc(t("reviewChangesNote"))}</p>
    <div class="section-list review-list">${REVIEW_SETS.map(set => listButton(set.id, t(set.label), t(set.detail))).join("")}</div>
    <a class="home-notice-link" href="notice.html" target="_blank" rel="noopener noreferrer">Read the mock notices <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a>
  </section>`;
}

function resumeTarget() {
  if (!state.resume) return null;
  const list = questionsFor(state.resume.filter);
  const index = list.findIndex(q => q.id === state.resume.id);
  const remaining = [...list.slice(Math.max(0, index)), ...list.slice(0, Math.max(0, index))];
  const next = remaining.find(q => !state.results[q.id]);
  return next ? { filter: state.resume.filter, id: next.id } : null;
}

function matchingQuestions(query = state.homeQuery) {
  const text = query.trim().toLowerCase();
  if (!text) return [];
  if (/^(?:#|q\s*)?\d+$/.test(text)) return questions.filter(q => q.id === Number(text.replace(/^(?:#|q\s*)/, "")));
  const terms = text.split(/\s+/);
  return questions.filter(q => {
    const searchable = [q.id, sectionLabel(q.section), patternMeta(q.group)?.label || "", ...q.stem.map(block => block.text)].join(" ").toLowerCase();
    return terms.every(term => searchable.includes(term));
  });
}

function homeCatalogHtml() {
  if (state.homeQuery.trim()) {
    const matches = matchingQuestions();
    if (!matches.length) return `<div class="search-empty"><h3>No matching questions</h3><p>Try a shorter phrase or a question number. Search checks question text and topics.</p></div>`;
    return `<div class="home-search-results">${matches.map(q => {
      const text = q.stem.filter(block => block.type !== "code").map(block => block.text).join(" ");
      const preview = text.length > 170 ? `${text.slice(0, 167)}…` : text;
      const status = state.results[q.id]?.status;
      const label = status === "wrong" ? t("missed") : status === "correct" ? t("correct") : status === "ungraded" ? "Reviewed" : t("notStarted");
      return `<button type="button" class="search-result" data-question="${q.id}">
        <span class="search-result-number">Q${q.id}</span>
        <span><span class="search-result-text">${esc(preview)}</span><small>${esc(sectionLabel(q.section))} · ${esc(label)}${q.ungraded ? ` · ${esc(t("notScored"))}` : ""}</small></span>
        <span class="result-arrow" aria-hidden="true">→</span>
      </button>`;
    }).join("")}</div>`;
  }
  const priorities = data.focus || [];
  const usePriority = state.homeMode === "priority" && priorities.length;
  return `<div class="browse-grid">${usePriority
    ? priorities.map(item => listButton(item.id, item.label, item.detail, item.lead ? "lead" : "")).join("")
    : sectionIds().map(id => listButton(id, data.sections[id], data.weights?.[id] || "")).join("")}</div>`;
}

function updateHomeSearch() {
  const catalog = document.getElementById("home-catalog");
  if (!catalog) return;
  catalog.innerHTML = homeCatalogHtml();
  const status = document.getElementById("home-search-status");
  if (status) status.textContent = state.homeQuery.trim() ? `${matchingQuestions().length} matching questions` : "";
  const clear = document.querySelector("[data-clear-search]");
  if (clear) clear.hidden = !state.homeQuery;
}

function openQuestion(id) {
  if (Number.isInteger(id) && byId.has(id)) start("all", id);
}

function homeHtml() {
  const scored = tally(questions.filter(q => !q.ungraded));
  const unscored = tally(questions.filter(q => q.ungraded));
  const remaining = scored.total - scored.done;
  const percent = scored.total ? Math.round(scored.done / scored.total * 100) : 0;
  const accuracy = scored.done ? `${Math.round(scored.correct / scored.done * 100)}%` : "—";
  const resume = resumeTarget();
  const focus = nextFocus();
  const focusLabel = focusMeta(focus)?.label || t("all");
  const recommended = questionsFor(focus).find(q => !q.ungraded && !state.results[q.id]);
  const title = resume ? "Pick up where you left off." : remaining ? "One question closer." : "You’ve covered every scored question.";
  const description = resume
    ? `Question ${resume.id} · ${filterTitle(resume.filter)}. Your answers and unfinished selections are ready.`
    : remaining ? `${focusMeta(focus) ? `Work through ${focusLabel} next.` : "Choose your next question."} You’ll see the reasoning after each answer, and you can stop whenever you like.`
    : scored.wrong ? "Revisit your missed questions, check the reasoning, and try them again." : "Revisit a topic or work through the mock review notes at your own pace.";
  const action = resume ? 'data-action="resume"' : recommended
    ? `data-start="${esc(focus)}" data-start-at="${recommended.id}"` : `data-start="${scored.wrong ? "missed" : "all"}"`;
  const actionLabel = resume ? "Continue session" : recommended ? `${t("startWith")} ${focusLabel}` : scored.wrong ? t("reviewMissed") : "Review all questions";
  const priorityMode = state.homeMode === "priority" && (data.focus || []).length;
  const hasProgress = scored.done || unscored.done || Object.keys(state.drafts).length;
  const matches = state.homeQuery.trim() ? matchingQuestions().length : 0;
  return `
    <div class="wrap home-shell">
      <header class="top home-top">
        <div class="home-brand"><span class="home-mark" aria-hidden="true">Q<span>↗</span></span><div class="brand"><strong>${esc(exam.title || t("questions"))}</strong><span>${questions.length} questions · ${scored.total} scored · Self-paced practice</span></div></div>
        <details class="progress-tools"><summary>${esc(t("progressOptions"))}</summary>
          <p>${esc(t("savedLocally"))}</p>
          <button class="ghost" data-action="reset" ${hasProgress ? "" : "disabled"}>${esc(t("clear"))}</button>
        </details>
      </header>
      ${storageNoteHtml()}
      <main class="home-dashboard arrive">
        <div class="home-top-grid">
        <section class="hero next-session" aria-labelledby="home-title">
          <p class="home-eyebrow">${resume ? "Your saved session" : remaining ? "Your next step" : "Keep practising"}</p>
          <h1 id="home-title" tabindex="-1">${esc(title)}</h1>
          <p class="lede">${esc(description)}</p>
          <div class="actions">
            <button type="button" class="primary" ${action} ${questions.length ? "" : "disabled"}>${esc(actionLabel)} <span aria-hidden="true">→</span></button>
            ${resume && remaining ? `<button type="button" class="ghost" data-start="practice:unanswered">Practice unanswered</button>` : scored.wrong && remaining ? `<button type="button" class="ghost" data-start="missed">${esc(t("reviewMissed"))} (${scored.wrong})</button>` : ""}
          </div>
          <p class="home-save-note">${state.storageIssue ? "Your progress is kept for this open session." : "Your progress stays in this browser. Come back whenever you’re ready."}</p>
        </section>
        <section class="card home-progress" aria-labelledby="home-progress-title">
          <div class="home-section-heading"><h2 id="home-progress-title">Your progress</h2><span>${percent}% covered</span></div>
          <p class="coverage-count"><strong>${scored.done}</strong><span> / ${scored.total}</span></p>
          <p class="coverage-caption">scored questions answered</p>
          <div class="coverage-bar" role="progressbar" aria-label="Scored questions answered" aria-valuemin="0" aria-valuemax="${scored.total || 1}" aria-valuenow="${scored.done}" aria-valuetext="${scored.done} of ${scored.total} scored questions answered">
            <span class="coverage-correct" style="width:${scored.total ? scored.correct / scored.total * 100 : 0}%"></span><span class="coverage-missed" style="width:${scored.total ? scored.wrong / scored.total * 100 : 0}%"></span>
          </div>
          <div class="home-metrics">
            <div class="home-metric"><b>${accuracy}</b><span>Accuracy</span><small>${scored.done ? "Of scored answers" : "No answers yet"}</small></div>
            <button type="button" class="home-metric metric-missed" data-start="missed" ${scored.wrong ? "" : "disabled"}><b>${scored.wrong}</b><span>Missed <span aria-hidden="true">↗</span></span><small>${scored.wrong ? "Review these" : "Nothing to revisit"}</small></button>
            <button type="button" class="home-metric" data-start="practice:unanswered" ${remaining ? "" : "disabled"}><b>${remaining}</b><span>Unanswered <span aria-hidden="true">↗</span></span><small>${remaining ? "Pick up a new one" : "All answered"}</small></button>
          </div>
          ${unscored.total ? `<p class="unscored-progress">${unscored.done} of ${unscored.total} unscored questions reviewed separately.</p>` : ""}
        </section>
        </div>
        <div class="home-main-grid">
          <section class="card practice-browser" aria-labelledby="practice-browser-title">
            <div class="home-section-heading"><h2 id="practice-browser-title">Choose your practice</h2><button type="button" class="home-all-link" data-start="all">All ${questions.length} questions <span aria-hidden="true">→</span></button></div>
            <p class="home-section-intro">Build the basics, explore a topic, or find a specific question.</p>
            <div class="browse-controls">
              <div class="browse-modes" role="group" aria-label="Browse questions by">
                ${(data.focus || []).length ? `<button type="button" data-home-mode="priority" aria-pressed="${Boolean(priorityMode)}">By priority</button>` : ""}
                <button type="button" data-home-mode="topic" aria-pressed="${!priorityMode}">By topic</button>
              </div>
              <span class="priority-hint">${priorityMode ? "Must → High → Familiar → Low" : "Choose an area to work on"}</span>
            </div>
            <form class="home-search-form" role="search">
              <label for="home-search">Find a question</label>
              <div class="home-search-field"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg><input id="home-search" type="search" placeholder="Keyword, topic, or question number…" value="${esc(state.homeQuery)}" autocomplete="off" aria-controls="home-catalog" aria-describedby="home-search-status"><button type="button" data-clear-search ${state.homeQuery ? "" : "hidden"}>Clear</button></div>
            </form>
            <p id="home-search-status" class="search-status" role="status" aria-live="polite">${state.homeQuery.trim() ? `${matches} matching questions` : ""}</p>
            <div id="home-catalog">${homeCatalogHtml()}</div>
            <details class="study-guide"><summary>How to use this practice</summary><div><p>Use Must for the foundations, then High for important applications. Familiar and Low offer extra practice. These are study priorities, not exam predictions.</p><p>Missed means you answered incorrectly. Corrected and Repaired describe changes to the mock. Not scored questions are for reading and do not affect accuracy.</p>${exam.groupsNote ? `<p>${esc(exam.groupsNote)}</p>` : ""}</div></details>
          </section>
          ${reviewSectionHtml()}
        </div>
      </main>
    </div>`;
}

function summaryHtml() {
  const list = pool();
  const graded = list.filter(q => !q.ungraded);
  const stats = tally(graded);
  const remaining = list.filter(q => !state.results[q.id]).length;
  const accuracy = stats.done ? `${Math.round(stats.correct / stats.done * 100)}%` : "—";
  const missed = questions.filter(q => state.results[q.id]?.status === "wrong").length;
  return `<div class="wrap">
    <header class="top"><div class="brand"><strong>${esc(exam.title)}</strong><span>${esc(filterTitle())}</span></div>
      <button class="ghost" data-action="home">${esc(t("home"))}</button></header>
    ${storageNoteHtml()}
    <main class="card session-summary">
      <p class="eyebrow">${esc(filterTitle())}</p>
      <h1 class="summary-title" tabindex="-1">${esc(remaining ? t("practiceSoFar") : t("finish"))}</h1>
      <p>${stats.done} of ${graded.length} scored questions answered. Accuracy is based on answered, scored questions.</p>
      <div class="stat-row summary-stats">
        <div class="stat good"><b>${stats.correct}</b><span>${esc(t("correct"))}</span></div>
        <div class="stat bad"><b>${stats.wrong}</b><span>${esc(t("missed"))}</span></div>
        <div class="stat"><b>${remaining}</b><span>${esc(t("remaining"))}</span></div>
        <div class="stat"><b>${accuracy}</b><span>${esc(t("accuracy"))}</span></div>
      </div>
      ${list.length !== graded.length ? `<p>${list.length - graded.length} questions in this set are not scored.</p>` : ""}
      <div class="actions">
        ${remaining ? `<button class="primary" data-action="unanswered">${esc(t("continueUnanswered"))} (${remaining})</button>` : `<button class="primary" data-action="review-set">Review this set</button>`}
        ${missed ? `<button class="ghost" data-start="missed">${esc(t("reviewAllMissed"))} (${missed})</button>` : ""}
        <button class="quiet" data-action="home">${esc(t("back"))}</button>
      </div>
    </main></div>`;
}

function emptyHtml() {
  const missed = state.filter === "missed";
  return `
    <div class="wrap">
      <header class="top">
        <div class="brand">
          <strong>${esc(missed ? t("emptyMissed") : t("emptyList"))}</strong>
          <span>${esc(missed ? t("emptyMissedNote") : t("emptyNote"))}</span>
        </div>
      </header>
      <section class="card empty"><button class="primary" data-action="home">${esc(t("back"))}</button></section>
    </div>`;
}

function quizHtml() {
  const list = pool();
  const q = current();
  const result = state.results[q.id];
  const locked = Boolean(result);
  const stats = tally(list.filter((item) => !item.ungraded));
  const needed = q.choose || q.answer.length;
  const choose = locked ? (result.status === "correct" ? t("correct") : result.status === "wrong" ? t("missed") : "Reviewed") : q.ungraded ? "Review only" : q.type === "multi"
    ? (state.picked.length ? `${state.picked.length} of ${needed} ${t("ofSelected")}${state.picked.length > needed ? ` · Remove ${state.picked.length - needed}` : ""}` : `${t("selectN")} ${needed}`)
    : (state.picked.length ? t("selected") : t("selectOne"));
  const selectionHelp = q.ungraded ? "You can read the explanation without selecting an answer."
    : q.type === "multi" ? state.picked.length > needed ? `Remove ${state.picked.length - needed} ${state.picked.length - needed === 1 ? "selection" : "selections"} to check your answers.`
      : state.picked.length === needed ? "Ready to check your answers."
      : `Choose ${needed - state.picked.length} ${state.picked.length ? "more " : ""}${needed - state.picked.length === 1 ? "answer" : "answers"}.`
    : state.picked.length ? "Ready to check your answer." : "Choose the best answer, then check your reasoning.";
  const remaining = stats.total - stats.done;
  const coverage = stats.total ? stats.done / stats.total * 100 : 0;
  const accuracy = stats.done ? `${Math.round(stats.correct / stats.done * 100)}%` : "—";
  const nextUnanswered = nextUnansweredIndex();
  const focus = focusMeta(q.focus);
  const pattern = q.group ? patternMeta(q.group) : null;
  const heading = pattern?.label || sectionLabel(q.section);
  const flags = [
    q.corrected ? `<span class="flag">${esc(t("corrected"))}</span>` : "",
    q.repaired ? `<span class="flag repaired" aria-label="${esc(`${t("repaired")}: ${t("reviewRepairedNote")}`)}">${esc(t("repaired"))}</span>` : "",
    q.ungraded ? `<span class="flag">${esc(t("notScored"))}</span>` : "",
  ].filter(Boolean).join("");
  const notice = q.exhibitMissing
    ? `<div class="note">${esc(t("missingFigure"))}</div>`
    : q.ungraded ? `<div class="note">${esc(t("notScoredNote"))}</div>` : "";
  const options = q.options.map((option) => {
    const body = option.code
      ? `<span class="codeblock compact"><code>${esc(option.text)}</code></span>`
      : esc(option.text);
    const code = option.code;
    const right = locked && !q.ungraded && q.answer.includes(option.id);
    const picked = state.picked.includes(option.id);
    const status = locked && !q.ungraded
      ? [right ? t("answerCorrect") : "", picked ? t("yourAnswer") : ""].filter(Boolean).join(" · ")
      : "";
    const symbol = locked && !q.ungraded ? (right ? "✓" : picked ? "×" : "") : picked ? "✓" : "";
    return `<button type="button" class="${optionClass(q, option, result)}" data-pick="${option.id}" aria-pressed="${picked}" ${locked ? "disabled" : ""}>
      <span class="letter">${option.id}</span>
      <span class="body${code ? " code" : ""}">${body}${status ? `<span class="option-status">${esc(status)}</span>` : ""}</span>
      <span class="choice-indicator${q.type === "multi" ? " multi" : ""}" aria-hidden="true">${symbol}</span>
    </button>`;
  }).join("");
  const explain = result ? explanationHtml(q, result.status) : "";
  const pills = list.map((item, index) => {
    const status = state.results[item.id]?.status;
    const mark = index === state.index ? "on " : "";
    const tone = status === "correct" ? "ok" : status === "wrong" ? "no" : status === "ungraded" ? "skip" : "";
    const draft = !status && state.drafts[item.id]?.length;
    const currentAttr = index === state.index ? ' aria-current="true"' : "";
    const statusLabel = status === "correct" ? t("correct") : status === "wrong" ? t("missed") : status === "ungraded" ? "Reviewed (not scored)" : draft ? "Draft selection" : t("notStarted");
    const symbol = status === "correct" ? "✓" : status === "wrong" ? "×" : status === "ungraded" ? "–" : draft ? "•" : "";
    return `<button class="${mark}${tone}" data-jump="${index}"${currentAttr} aria-label="${esc(`${t("question")} ${item.id}: ${statusLabel}`)}" title="${esc(`${t("question")} ${item.id}: ${statusLabel}`)}">${item.id}${symbol ? `<span class="nav-mark" aria-hidden="true">${symbol}</span>` : ""}</button>`;
  }).join("");
  const atEnd = state.index === list.length - 1;
  const atStart = state.index === 0;
  const checkLabel = q.ungraded ? t("readExplanation") : q.type === "multi" ? t("checkMany") : t("check");
  const showSkip = list.some((item) => item.ungraded);
  const letters = q.options.map((option) => option.id);
  const letterSpan = letters.length > 1 ? `${letters[0]}–${letters[letters.length - 1]}` : letters[0];
  const hintParts = locked
    ? [
        atStart ? "" : `<kbd>←</kbd> ${esc(t("forPrevious"))}`,
        atEnd ? `<kbd>Enter</kbd> ${esc(t("results"))}` : `<kbd>Enter</kbd> ${esc(t("forNext"))}`,
      ]
    : [`<kbd>${esc(letterSpan)}</kbd> ${esc(t("toSelect"))}`, `<kbd>Enter</kbd> ${esc(t("toCheck"))}`];
  const hint = hintParts.filter(Boolean).join(" · ");

  return `
    <div class="wrap question-shell">
      <header class="top question-top">
        <div class="brand"><strong>${esc(exam.title)}</strong>
          <span>${esc(filterTitle())} · Self-paced practice</span>
        </div>
        <button class="ghost" data-action="home"><span aria-hidden="true">← </span>${esc(t("home"))}</button>
      </header>
      ${storageNoteHtml()}
      <section class="set-progress" aria-label="Practice set progress">
        <div class="set-progress-copy"><strong>${state.index + 1}<span> / ${list.length}</span></strong><span>In this set</span></div>
        <div class="set-coverage"><div><span>${stats.total ? `${stats.done} of ${stats.total} scored answered` : "Review only · no scored questions"}</span>${stats.total ? `<span>${accuracy} accuracy</span>` : ""}</div><div class="set-coverage-track" role="progressbar" aria-label="Scored questions answered in this set" aria-valuemin="0" aria-valuemax="${stats.total || 1}" aria-valuenow="${stats.done}" aria-valuetext="${stats.done} of ${stats.total} scored questions answered"><span style="width:${coverage}%"></span></div></div>
        <button type="button" class="quiet" data-action="results">${esc(t("results"))} <span aria-hidden="true">↗</span></button>
      </section>
      <div class="quiz" role="main">
        <article class="card panel${state.motion === "arrive" ? " arrive" : ""}">
          <div class="qhead">
            <div class="title-row">
              <p class="topic">${esc(heading)}</p>
              ${focus ? `<p class="rank ${esc(q.focus)}">${esc(focus.label)}</p>` : ""}
            </div>
            <div class="subline">
              <h1 class="qnum" tabindex="-1">${esc(t("question"))} ${q.id}</h1>
              ${flags ? `<div class="flags">${flags}</div>` : ""}
            </div>
          </div>
          <div class="panel-body">
            <div class="stem">${stemHtml(q)}</div>
            ${notice}
            <div class="answer-toolbar"><h2 id="answer-choices-title">${locked ? "Your selection" : "Choose your answer"}</h2><p class="status${!locked && state.picked.length > needed && !q.ungraded ? " over-limit" : ""}" role="status" aria-live="polite">${esc(choose)}</p></div>
            <div class="options" role="group" aria-labelledby="answer-choices-title" aria-describedby="selection-help">${options}</div>
            <div class="selection-guidance"><p id="selection-help" class="selection-help">${esc(locked ? q.ungraded ? "Read the study notes below. This question is not scored." : "Answer checked. Review the explanation below, or try again." : selectionHelp)}</p>${!locked ? `<button type="button" class="quiet clear-selection" data-action="clear-selection" ${state.picked.length ? "" : "disabled"}>Clear selection</button>` : ""}</div>
            ${explain}
          </div>
          <div class="foot">
            <button class="ghost previous-question" data-nav="-1" aria-label="${esc(t("previous"))}" ${state.index === 0 ? "disabled" : ""}><span aria-hidden="true">←</span><span class="nav-word"> ${esc(t("previous"))}</span></button>
            <div class="right">
              ${locked ? `<button class="ghost" data-action="retry">${esc(t("tryAgain"))}</button>` : ""}
              ${locked
                ? (atEnd
                  ? `<button class="primary" data-action="results">${esc(t("results"))}</button>`
                  : `<button class="primary" data-nav="1">${esc(t("next"))} <span aria-hidden="true">→</span></button>`)
                : `<button class="quiet" data-nav="1">${esc(t("skip"))}</button><button class="primary" data-action="check" ${canCheck(q) ? "" : "disabled"}>${esc(checkLabel)}</button>`}
            </div>
          </div>
        </article>
        <details class="card side" ${(state.mapOpen ?? (window.matchMedia ? window.matchMedia("(min-width: 861px)").matches : true)) ? "open" : ""}>
          <summary>${esc(t("navigator"))}<span>${state.index + 1} / ${list.length}</span></summary>
          <div class="navigator-overview"><p><strong>${remaining}</strong> scored unanswered in this set</p><button type="button" class="ghost" data-action="next-unanswered" ${nextUnanswered < 0 ? "disabled" : ""}>Next unanswered <span aria-hidden="true">→</span></button></div>
          <h2>${esc(focusMeta(state.filter)?.ordered ? t("studyOrder") : t("questions"))}</h2>
          <form class="jump-form"><label for="question-number">${esc(t("goTo"))}</label><div>
            <input id="question-number" name="question" type="number" min="1" step="1" inputmode="numeric" value="${esc(state.jumpValue)}" placeholder="${q.id}" ${state.jumpError ? 'aria-invalid="true" aria-describedby="jump-error"' : ""}>
            <button class="ghost" type="submit">${esc(t("go"))}</button></div>
            ${state.jumpError ? `<p id="jump-error" role="alert">${esc(state.jumpError)}</p>` : ""}
          </form>
          <div class="stats"><span class="swatch ok">${esc(t("correct"))}</span><span class="swatch no">${esc(t("missed"))}</span><span class="draft-legend">• Draft</span>${showSkip ? `<span class="swatch skip">${esc(t("notScored"))}</span>` : ""}</div>
          <div class="jump">${pills}</div>
          <p class="navigator-save">${esc(t(state.storageIssue ? "storageNotice" : "savedLocally"))}</p>
          ${hint ? `<details class="keyboard-guide"><summary>Keyboard shortcuts</summary><p class="keys">${hint}<br><kbd>←</kbd> / <kbd>→</kbd> move between questions. On a focused button, Enter activates that button.</p></details>` : ""}
          <a class="question-notice-link" href="notice.html" target="_blank" rel="noopener noreferrer">Mock review notes <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a>
        </details>
      </div>
    </div>`;
}

function filterTitle(filter = state.filter) {
  if (filter === "missed") return t("missedList");
  if (filter === "all") return exam.allLabel || t("all");
  if (filter === "practice:unanswered") return "Unanswered questions";
  const review = REVIEW_SETS.find(set => set.id === filter);
  if (review) return t(review.label);
  const focus = focusMeta(filter);
  if (focus) return focus.label;
  return sectionLabel(filter);
}

function bind() {
  document.querySelectorAll("[data-action]").forEach((node) => {
    node.addEventListener("click", () => {
      const action = node.dataset.action;
      if (action === "home") {
        rememberDraft();
        saveSession();
        state.view = "home";
        render({ focus: ".hero h1" });
      } else if (action === "reset") resetAll();
      else if (action === "check") check();
      else if (action === "retry") retry();
      else if (action === "clear-selection") clearSelection();
      else if (action === "next-unanswered") jump(nextUnansweredIndex());
      else if (action === "results") showSummary();
      else if (action === "resume") {
        const resume = resumeTarget();
        if (resume) start(resume.filter, resume.id);
      }
      else if (action === "unanswered") jump(state.ids.findIndex(id => !state.results[id]));
      else if (action === "review-set") jump(0);
    });
  });
  document.querySelectorAll("[data-pick]").forEach((node) => {
    node.addEventListener("click", () => toggle(node.dataset.pick));
  });
  document.querySelectorAll("[data-nav]").forEach((node) => {
    node.addEventListener("click", () => go(Number(node.dataset.nav)));
  });
  document.querySelectorAll("[data-jump]").forEach((node) => {
    node.addEventListener("click", () => jump(Number(node.dataset.jump)));
  });
  const box = document.querySelector(".jump");
  const currentButton = box?.querySelector("button.on");
  if (box && currentButton) {
    box.scrollTop = Math.max(0, currentButton.offsetTop - (box.clientHeight - currentButton.offsetHeight) / 2);
  }
  const map = document.querySelector("details.side");
  map?.addEventListener("toggle", () => { state.mapOpen = map.open; });
  const input = document.querySelector("#question-number");
  input?.addEventListener("input", () => { state.jumpValue = input.value; });
  document.querySelector(".jump-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const id = Number(input.value);
    const index = state.ids.indexOf(id);
    if (index >= 0) jump(index);
    else {
      state.jumpError = `Question ${input.value || "number"} is not in this set. Choose a number from the navigator.`;
      render({ preserve: true, focus: "#question-number" });
    }
  });
  const search = document.querySelector("#home-search");
  search?.addEventListener("input", () => {
    state.homeQuery = search.value;
    updateHomeSearch();
  });
  search?.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    state.homeQuery = "";
    search.value = "";
    updateHomeSearch();
  });
  document.querySelector(".home-search-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const matches = matchingQuestions();
    if (matches.length === 1) openQuestion(matches[0].id);
    else document.querySelector("[data-question]")?.focus();
  });
}

document.addEventListener("click", event => {
  if (event.defaultPrevented) return;
  const button = event.target.closest("button");
  if (!button || button.disabled) return;
  if (button.dataset.start) start(button.dataset.start, button.dataset.startAt ? Number(button.dataset.startAt) : undefined);
  else if (button.dataset.question) openQuestion(Number(button.dataset.question));
  else if (button.dataset.homeMode) {
    state.homeMode = button.dataset.homeMode;
    state.homeQuery = "";
    render({ preserve: true, focus: `[data-home-mode="${state.homeMode}"]` });
  } else if (button.hasAttribute("data-clear-search")) {
    state.homeQuery = "";
    const search = document.querySelector("#home-search");
    if (search) search.value = "";
    updateHomeSearch();
    search?.focus();
  }
});

document.addEventListener("keydown", (event) => {
  if (!state || state.view !== "quiz") return;
  if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || event.repeat) return;
  if (event.target.closest("input, textarea, select, pre, [contenteditable]:not([contenteditable='false'])")) return;
  const q = current();
  const letter = event.key.toUpperCase();
  if (letter.length === 1 && q.options.some((option) => option.id === letter)) {
    event.preventDefault();
    toggle(letter);
    return;
  }
  if (event.key === "Enter") {
    // Let a focused native control perform its own action exactly once.
    if (event.target.closest("button, a, summary")) return;
    event.preventDefault();
    if (state.results[q.id]) go(1);
    else check();
  }
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    event.preventDefault();
    go(event.key === "ArrowRight" ? 1 : -1);
  }
});

// Quiz pages load quiz.js and questions.js before this shared player.
window.Quiz = {
  start(config, questionList) {
    if (!config || typeof config !== "object" || Array.isArray(config)) {
      throw new Error("quiz.js must define window.QUIZ_CONFIG as an object.");
    }
    if (!Array.isArray(questionList)) throw new Error("questions.js must define window.QUIZ_QUESTIONS as an array.");
    boot(normalizeBank({ ...config, questions: questionList }));
  },
  showError(error) {
    const root = document.getElementById("app");
    root.innerHTML = `<div class="wrap"><section class="card empty"><h1>Could not load this quiz</h1><p>${esc(error.message)}</p></section></div>`;
  },
};

try {
  window.Quiz.start(window.QUIZ_CONFIG, window.QUIZ_QUESTIONS);
} catch (error) {
  window.Quiz.showError(error);
}
