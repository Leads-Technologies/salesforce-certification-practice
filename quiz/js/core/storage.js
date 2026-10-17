// Repository pattern: explicit storage/model/grade dependencies; compatible record formats.
(() => {
  const modules = window.QuizModules || (window.QuizModules = {});
  const { MAX_EXAM_MINUTES, REVIEW_SETS } = modules.constants;
  class ProgressRepository {
    constructor({storage,bank,grader,choiceOrder,onError=()=>{}}) {
      this.storage=storage; this.bank=bank; this.grader=grader; this.choiceOrder=choiceOrder; this.onError=onError;
      this.key=bank.data.exam.storageKey||'practice-v1';
    }
    get data() { return this.bank.data; }
    get questions() { return this.bank.questions; }
    get byId() { return this.bank.byId; }
    sectionIds() { return this.data.sectionOrder||Object.keys(this.data.sections); }
    loadSession(results = {}) {
      try {
        const session = JSON.parse(this.storage.getItem(`${this.key}:session`));
        const drafts = {};
        const optionOrders = {};
        for (const q of this.questions) {
          const picked = session?.drafts?.[q.id];
          if (!Array.isArray(picked) || new Set(picked).size !== picked.length) continue;
          if (picked.some(id => !q.options.some(option => option.id === id))) continue;
          if (q.type === "single" && picked.length > 1) continue;
          if (!results[q.id]) drafts[q.id] = picked.slice();
        }
        const filters = ["all", "missed", "practice:unanswered", ...REVIEW_SETS.map(set => set.id), ...this.sectionIds(), ...(this.data.focus || []).map(f => f.id)];
        const resume = session && filters.includes(session.filter) && this.byId.has(session.id)
          ? { filter: session.filter, id: session.id }
          : null;
        return { drafts, resume, optionOrders };
      } catch {
        return { drafts: {}, resume: null, optionOrders: {} };
      }
    }

    loadResults() {
      try {
        const saved = JSON.parse(this.storage.getItem(this.key));
        if (!saved || typeof saved !== "object" || Array.isArray(saved)) return {};
        const results = {};
        for (const q of this.questions) {
          const picked = saved[q.id]?.picked;
          if (!Array.isArray(picked) || (!picked.length && !q.ungraded) || new Set(picked).size !== picked.length) continue;
          if (picked.some((id) => !q.options.some((option) => option.id === id))) continue;
          // Regrade saved selections when a source answer is corrected.
          results[q.id] = { picked: picked.slice(), status: this.grader.grade(q, picked) };
        }
        return results;
      } catch {
        return {};
      }
    }

    loadExamAttempt() {
      try {
        const saved = JSON.parse(this.storage.getItem(`${this.key}:exam`));
        if (!Array.isArray(saved?.ids) || !saved.ids.length || new Set(saved.ids).size !== saved.ids.length) return null;
        // A source review may retire a question from scoring. Preserve the
        // saved attempt and selections; its current score excludes that item.
        if (saved.ids.some(id => !this.byId.has(id))) return null;
        const drafts = {};
        const optionOrders = {};
        for (const id of saved.ids) {
          const q = this.byId.get(id);
          const picked = saved.drafts?.[id];
          if (Array.isArray(picked) && new Set(picked).size === picked.length
              && picked.every(letter => q.options.some(option => option.id === letter))
              && (q.type !== "single" || picked.length <= 1)) drafts[id] = picked.slice();
          const order = saved.optionOrders?.[id];
          if (this.choiceOrder.validOptionOrder(q, order)) optionOrders[id] = order.slice();
        }
        const validClock = Number.isInteger(saved.durationMinutes) && saved.durationMinutes >= 1 && saved.durationMinutes <= MAX_EXAM_MINUTES
          && Number.isFinite(saved.startedAt) && saved.startedAt > 0
          && saved.deadlineAt === saved.startedAt + saved.durationMinutes * 60000;
        return { ids:saved.ids.slice(), drafts, optionOrders,
          index:Number.isInteger(saved.index) ? Math.min(saved.ids.length - 1, Math.max(0, saved.index)) : 0,
          submitted:saved.submitted === true,
          durationMinutes:validClock ? saved.durationMinutes : null,
          startedAt:validClock ? saved.startedAt : null,
          deadlineAt:validClock ? saved.deadlineAt : null,
          submittedAt:validClock && Number.isFinite(saved.submittedAt) ? Math.min(saved.deadlineAt, Math.max(saved.startedAt, saved.submittedAt)) : null,
          timedOut:validClock && saved.submitted === true && saved.timedOut === true };
      } catch { return null; }
    }

    #write(key,value) {
      try { this.storage.setItem(key,JSON.stringify(value)); return true; }
      catch(error) { this.onError(error); return false; }
    }
    saveResults(results) { return this.#write(this.key,results); }
    saveSession(session) { return this.#write(this.key+':session',session); }
    saveExamAttempt(attempt) { return this.#write(this.key+':exam',attempt); }
    clearExam() {
      try { this.storage.removeItem(this.key+':exam'); return true; }
      catch(error) { this.onError(error); return false; }
    }
  }
  modules.ProgressRepository=ProgressRepository;
})();
