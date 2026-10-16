// Exam controller: lifecycle, deadline, and timer notifications.
(() => {
  const modules = window.QuizModules || (window.QuizModules = {});
  const { MAX_EXAM_MINUTES } = modules.constants;
  class ExamController {
    #interval=null;
    constructor(app,{clock,scheduler}) {
      this.app=app; this.document=app.document; this.clock=clock; this.scheduler=scheduler;
      this.updateExamTimer=this.updateExamTimer.bind(this);
    }
    stop() {
      if(this.#interval!=null) this.scheduler.clearInterval?.(this.#interval);
      this.#interval=null;
    }
    examSecondsLeft(attempt = this.app.state.examAttempt, now = this.clock.now()) {
      return attempt?.deadlineAt ? Math.max(0, Math.ceil((attempt.deadlineAt - now) / 1000)) : null;
    }

    clockText(seconds) {
      const value = Math.max(0, Math.floor(seconds));
      return [Math.floor(value / 3600), Math.floor(value % 3600 / 60), value % 60].map(n => String(n).padStart(2, "0")).join(":");
    }

    timerStage(seconds) {
      return seconds <= 60 ? 2 : seconds <= 300 ? 1 : 0;
    }

    examTimerHtml() {
      const seconds = this.examSecondsLeft();
      if (seconds == null || this.app.state.examAttempt.submitted) return "";
      const stage = this.timerStage(seconds);
      return `<div class="exam-timer${stage ? stage === 2 ? " critical" : " warning" : ""}" data-exam-timer><span data-exam-timer-label>${stage === 2 ? "Last minute" : stage === 1 ? "≤ 5 min" : "Time left"}</span><strong data-exam-time role="timer" aria-live="off">${this.clockText(seconds)}</strong><span class="sr-only" data-exam-timer-alert role="status" aria-live="polite"></span></div>`;
    }

    finishExam(timedOut) {
      if (this.app.state.mode === "exam") {
        this.app.rememberDraft();
        this.saveExamAttempt();
      }
      this.app.state.examAttempt = { ...this.app.state.examAttempt, submitted:true, timedOut,
        submittedAt:timedOut ? this.app.state.examAttempt.deadlineAt : this.clock.now() };
      if (this.app.state.mode === "exam") {
        this.app.state.results = this.examResults(this.app.state.examAttempt);
        this.app.state.view = "summary";
      }
      this.persistExamAttempt();
    }

    expireExam() {
      if (!this.app.state?.examAttempt || this.app.state.examAttempt.submitted || (!this.app.isExamPage() && this.app.state.mode !== "exam") || this.examSecondsLeft() !== 0) return false;
      this.finishExam(true);
      return true;
    }

    stopForExpiredExam() {
      if (this.app.state.mode !== "exam" || !this.expireExam()) return false;
      this.app.render({ focus:".summary-title" });
      return true;
    }

    updateExamTimer() {
      if (!this.app.state) return;
      if (this.expireExam()) {
        const input = this.document.activeElement?.id;
        this.app.render({ preserve:this.app.state.mode !== "exam", focus:this.app.state.mode === "exam" ? ".summary-title" : ["exam-count", "exam-minutes"].includes(input) ? `#${input}` : undefined });
        return;
      }
      const timer = this.document.querySelector("[data-exam-timer]");
      const seconds = this.examSecondsLeft();
      if (!timer || seconds == null || this.app.state.examAttempt.submitted) return;
      const stage = this.timerStage(seconds);
      timer.className = `exam-timer${stage ? stage === 2 ? " critical" : " warning" : ""}`;
      this.document.querySelector("[data-exam-time]").textContent = this.clockText(seconds);
      this.document.querySelector("[data-exam-timer-label]").textContent = stage === 2 ? "Last minute" : stage === 1 ? "≤ 5 min" : "Time left";
      if (stage > this.app.state.timerWarning) {
        this.document.querySelector("[data-exam-timer-alert]").textContent = stage === 2 ? "One minute or less remains. Your exam will submit automatically when time runs out." : "Five minutes or less remain in this exam.";
        this.app.state.timerWarning = stage;
      }
    }

    syncExamTimer() {
      const running = (this.app.isExamPage() || this.app.state.mode === "exam") && this.app.state.examAttempt?.deadlineAt && !this.app.state.examAttempt.submitted;
      if (running && this.#interval == null) this.#interval = this.scheduler.setInterval?.(this.updateExamTimer, 1000) ?? null;
      if (!running && this.#interval != null) {
        this.scheduler.clearInterval?.(this.#interval);
        this.#interval = null;
      }
    }

    examSelectionComplete(q, picked) {
      return Array.isArray(picked) && picked.length === (q.type === "multi" ? q.choose || q.answer.length : 1);
    }

    examAnswered(attempt = this.app.state.examAttempt) {
      return attempt.ids.filter(id => this.examSelectionComplete(this.app.byId.get(id), attempt.drafts[id])).length;
    }

    examResults(attempt) {
      return Object.fromEntries(attempt.ids.map(id => {
        const picked = (attempt.drafts[id] || []).slice();
        return [id, { picked, status:picked.length ? this.app.grader.grade(this.app.byId.get(id), picked) : "unanswered" }];
      }));
    }

    leaveExam() {
      if (this.app.state.mode !== "exam") return;
      this.app.rememberDraft();
      this.saveExamAttempt();
      Object.assign(this.app.state, this.app.state.practice);
      this.app.state.practice = null;
      this.app.state.mode = "practice";
    }

    activateExam(attempt) {
      this.leaveExam();
      if (!this.app.isExamPage()) {
        this.app.rememberDraft();
        this.app.saveSession();
      }
      this.app.state.practice = Object.fromEntries(["filter", "index", "ids", "picked", "results", "drafts", "optionOrders", "resume", "mapOpen", "navFilter"].map(key => [key, this.app.state[key]]));
      this.app.state.mode = "exam";
      this.app.state.navFilter = "all";
      if (!attempt.submitted && !attempt.deadlineAt) {
        attempt = { ...attempt, durationMinutes:this.app.exam.examMinutes, startedAt:this.clock.now() };
        attempt.deadlineAt = attempt.startedAt + attempt.durationMinutes * 60000;
      }
      this.app.state.examAttempt = attempt;
      this.app.state.timerWarning = 0;
      this.app.state.filter = "exam";
      this.app.state.ids = attempt.ids.slice();
      this.app.state.index = attempt.index;
      this.app.state.results = attempt.submitted ? this.examResults(attempt) : {};
      this.app.state.drafts = attempt.drafts;
      this.app.state.optionOrders = attempt.optionOrders;
      for (const q of this.app.pool()) this.app.content.displayOptions(q);
      this.app.state.picked = this.app.rememberedPick();
      this.app.state.view = attempt.submitted ? "summary" : "quiz";
      this.app.state.motion = "arrive";
      this.app.state.jumpError = "";
      this.app.state.jumpValue = "";
      this.app.saveSession();
      this.app.render({ focus:attempt.submitted ? ".summary-title" : ".qnum" });
    }

    startRandomExam(value = this.app.state.examCount, minutes = this.app.state.examMinutes) {
      const count = Number(value);
      const durationMinutes = Number(minutes);
      const eligible = this.app.questions.filter(q => !q.ungraded);
      this.app.state.examError = !Number.isInteger(count) || count < 1 || count > eligible.length
        ? eligible.length ? `Choose a whole number from 1 to ${eligible.length}.` : "No scored questions are available for an exam." : "";
      this.app.state.examTimeError = !Number.isInteger(durationMinutes) || durationMinutes < 1 || durationMinutes > MAX_EXAM_MINUTES
        ? `Choose a whole number of minutes from 1 to ${MAX_EXAM_MINUTES}.` : "";
      if (this.app.state.examError || this.app.state.examTimeError) {
        this.app.render({ preserve:true, focus:this.app.state.examError ? "#exam-count" : "#exam-minutes" });
        return;
      }
      this.app.state.examCount = String(count);
      this.app.state.examMinutes = String(durationMinutes);
      const startedAt = this.clock.now();
      this.activateExam({ ids:this.app.choiceOrder.shuffled(eligible.map(q => q.id)).slice(0, count), drafts:{}, optionOrders:{}, index:0, submitted:false,
        durationMinutes, startedAt, deadlineAt:startedAt + durationMinutes * 60000, submittedAt:null, timedOut:false });
    }

    submitExam() {
      if (this.app.state.mode !== "exam" || this.stopForExpiredExam() || this.app.state.examAttempt.submitted) return;
      this.finishExam(false);
      this.app.render({ focus:".summary-title" });
    }

    saveExamAttempt() {
      this.app.state.examAttempt = { ...this.app.state.examAttempt, ids:this.app.state.ids.slice(), drafts:this.app.state.drafts, optionOrders:this.app.state.optionOrders,
        index:this.app.state.index, submitted:this.app.state.examAttempt.submitted };
      this.persistExamAttempt();
    }

    persistExamAttempt() {
      return this.app.repository.saveExamAttempt(this.app.state.examAttempt);
    }
  }
  modules.ExamController=ExamController;
})();
