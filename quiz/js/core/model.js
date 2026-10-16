// Domain model and interchangeable grading/order policies; no DOM or storage access.
(() => {
  const modules = window.QuizModules || (window.QuizModules = {});
  const CHOICE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const DEFAULT_EXAM_COUNT = 60;
  const DEFAULT_EXAM_MINUTES = 105;
  const MAX_EXAM_MINUTES = 1440;
  const REVIEW_SETS = [
    { id: "review:corrected", flag: "corrected", label: "corrected", detail: "reviewCorrectedNote" },
    { id: "review:repaired", flag: "repaired", label: "repaired", detail: "reviewRepairedNote" },
    { id: "review:ungraded", flag: "ungraded", label: "notScored", detail: "reviewNotScoredNote" },
  ];

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
        examMinutes: Number.isInteger(raw.examMinutes) && raw.examMinutes >= 1 && raw.examMinutes <= MAX_EXAM_MINUTES ? raw.examMinutes : DEFAULT_EXAM_MINUTES,
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

  function validOptionOrder(q, order) {
    return Array.isArray(order) && order.length === q.options.length && new Set(order).size === order.length
      && order.every(id => q.options.some(option => option.id === id));
  }

  class QuestionBank {
    #data; #questions; #byId;
    constructor(raw) {
      this.#data = normalizeBank(raw);
      this.#questions = this.#data.questions.slice().sort((a,b)=>a.id-b.id);
      this.#byId = new Map(this.#questions.map(question=>[question.id,question]));
    }
    get data() { return this.#data; }
    get questions() { return this.#questions; }
    get byId() { return this.#byId; }
    static normalizeQuestion(raw) { return normalizeQuestion(raw); }
  }
  class UnscoredGrading {
    matches(question) { return Boolean(question.ungraded); }
    grade() { return 'ungraded'; }
  }
  class EquivalentAnswerGrading {
    matches(question) { return Boolean(question.acceptAny); }
    grade(question, picked) { return picked.length===1&&question.answer.includes(picked[0])?'correct':'wrong'; }
  }
  class ExactAnswerGrading {
    matches() { return true; }
    grade(question, picked) { return [...picked].sort().join('')===[...question.answer].sort().join('')?'correct':'wrong'; }
  }
  class AnswerGrader {
    #strategies;
    constructor(strategies=[new UnscoredGrading(),new EquivalentAnswerGrading(),new ExactAnswerGrading()]) {
      this.#strategies = strategies.slice();
    }
    grade(question,picked) {
      const strategy=this.#strategies.find(rule=>rule.matches(question));
      if(!strategy) throw new Error('No grading strategy matches this question.');
      return strategy.grade(question,picked);
    }
  }
  class ChoiceOrder {
    constructor(random=()=>Math.random()) { this.random=random; }
    validOptionOrder(question,order) { return validOptionOrder(question,order); }
    shuffled(items) {
      const order=items.slice();
      for(let i=order.length-1;i>0;i--) {
        const j=Math.floor(this.random()*(i+1));
        [order[i],order[j]]=[order[j],order[i]];
      }
      return order;
    }
    shuffleOptionOrder(question) { return this.shuffled(question.options.map(option=>option.id)); }
  }
  REVIEW_SETS.forEach(Object.freeze);
  Object.freeze(REVIEW_SETS);
  modules.constants=Object.freeze({CHOICE_LETTERS,DEFAULT_EXAM_COUNT,DEFAULT_EXAM_MINUTES,MAX_EXAM_MINUTES,REVIEW_SETS});
  Object.assign(modules,{QuestionBank,AnswerGrader,ChoiceOrder,UnscoredGrading,EquivalentAnswerGrading,ExactAnswerGrading});
})();
