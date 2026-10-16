// Screen presentation and view selection; no persistence writes.
(() => {
  const modules = window.QuizModules || (window.QuizModules = {});
  const { DEFAULT_EXAM_COUNT, MAX_EXAM_MINUTES, REVIEW_SETS } = modules.constants;
  class ScreenRenderer {
    #views;
    constructor(app) {
      this.app = app;
      this.document = app.document;
      this.window = app.window;
      this.#views = new Map([
        ['home', () => this.homeHtml()],
        ['exam-setup', () => this.examPageHtml()],
        ['empty', () => this.emptyHtml()],
        ['summary', () => this.summaryHtml()],
        ['quiz', () => this.quizHtml()],
      ]);
    }
    render(view) {
      const renderer = this.#views.get(view);
      if (!renderer) throw new Error('Unknown quiz view: ' + view);
      return renderer();
    }
    storageNoteHtml() {
      return this.app.state.storageIssue ? `<p class="note storage-note" role="status">${this.app.content.esc(this.app.t("storageNotice"))}</p>` : "";
    }

    siteHeader(active = this.app.state.mode === "exam" || this.app.isExamPage() ? "exam" : "practice") {
      return this.app.navigation?.header(active, this.app.exam.title.replace(/\s+practice$/i, "")) || "";
    }

    siteFooter() {
      return this.app.navigation?.footer(this.app.state.storageIssue, {
        hasPriorities: Boolean(this.app.data.focus?.length),
        groupsNote: this.app.exam.groupsNote || "",
      }) || "";
    }

    navigatorMatches(question, filter = this.app.state.navFilter) {
      const status = this.app.state.results[question.id]?.status;
      const answered = this.app.state.mode === "exam" && !this.app.state.examAttempt.submitted
        ? this.app.examController.examSelectionComplete(question, this.app.state.drafts[question.id])
        : Boolean(status && status !== "unanswered");
      return filter === "answered" ? answered : filter === "unanswered" ? !answered : filter === "missed" ? status === "wrong" : true;
    }

    listButton(filter, label, detail, extraClass) {
      const list = this.app.questionsFor(filter);
      const progress = this.app.tally(list);
      const width = list.length ? Math.round((progress.done / list.length) * 100) : 0;
      const separateReviewProgress = filter === "review:ungraded" && list.length > 0;
      const progressNote = !list.length ? this.app.t("noQuestions") : separateReviewProgress ? `${progress.done} of ${list.length} reviewed` : !progress.done ? this.app.t("notStarted")
        : `${progress.done}/${list.length} complete${progress.wrong ? ` · ${progress.wrong} missed` : ""}`;
      const note = [detail, separateReviewProgress ? "" : progressNote].filter(Boolean).join(" · ");
      return `<button class="section-btn${extraClass ? ` ${extraClass}` : ""}" data-start="${this.app.content.esc(filter)}"${list.length ? "" : " disabled"}>
        <span class="section-name"><b>${this.app.content.esc(label)}</b><small>${this.app.content.esc(note)}</small>${separateReviewProgress ? `<small class="review-progress">${this.app.content.esc(progressNote)}</small>` : ""}</span>
        <em>${list.length}</em>
        <span class="section-meter" aria-hidden="true"><span style="width:${width}%"></span></span>
      </button>`;
    }

    nextFocus() {
      const order = (this.app.data.focus || []).map((item) => item.id);
      if (!order.length) return "all";
      return order.find((id) => {
        return this.app.questionsFor(id).some(q => !q.ungraded && !this.app.state.results[q.id]);
      }) || order[0];
    }

    reviewSectionHtml() {
      return `<section class="card review-panel" aria-labelledby="review-changes-title">
        <h2 id="review-changes-title">${this.app.content.esc(this.app.t("reviewChanges"))}</h2>
        <p>${this.app.content.esc(this.app.t("reviewChangesNote"))}</p>
        <div class="section-list review-list">${REVIEW_SETS.map(set => this.listButton(set.id, this.app.t(set.label), this.app.t(set.detail))).join("")}</div>
        <a class="home-notice-link" href="notice.html" target="_blank" rel="noopener noreferrer">Read the mock notices <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a>
      </section>`;
    }

    resumeTarget() {
      if (!this.app.state.resume) return null;
      const list = this.app.questionsFor(this.app.state.resume.filter);
      const index = list.findIndex(q => q.id === this.app.state.resume.id);
      const remaining = [...list.slice(Math.max(0, index)), ...list.slice(0, Math.max(0, index))];
      const next = remaining.find(q => !this.app.state.results[q.id]);
      return next ? { filter: this.app.state.resume.filter, id: next.id } : null;
    }

    matchingQuestions(query = this.app.state.homeQuery) {
      const text = query.trim().toLowerCase();
      if (!text) return [];
      if (/^(?:#|q\s*)?\d+$/.test(text)) return this.app.questions.filter(q => q.id === Number(text.replace(/^(?:#|q\s*)/, "")));
      const terms = text.split(/\s+/);
      return this.app.questions.filter(q => {
        const searchable = [q.id, this.app.sectionLabel(q.section), this.app.patternMeta(q.group)?.label || "", ...q.stem.map(block => block.text)].join(" ").toLowerCase();
        return terms.every(term => searchable.includes(term));
      });
    }

    homeCatalogHtml() {
      if (this.app.state.homeQuery.trim()) {
        const matches = this.matchingQuestions();
        if (!matches.length) return `<div class="search-empty"><h3>No matching questions</h3><p>Try a shorter phrase or a question number. Search checks question text and topics.</p></div>`;
        return `<div class="home-search-results">${matches.map(q => {
          const text = q.stem.filter(block => block.type !== "code").map(block => block.text).join(" ");
          const preview = text.length > 170 ? `${text.slice(0, 167)}…` : text;
          const status = this.app.state.results[q.id]?.status;
          const label = status === "wrong" ? this.app.t("missed") : status === "correct" ? this.app.t("correct") : status === "ungraded" ? "Reviewed" : this.app.state.drafts[q.id]?.length ? "Draft selection" : this.app.t("notStarted");
          return `<button type="button" class="search-result" data-question="${q.id}">
            <span class="search-result-number">Q${q.id}</span>
            <span><span class="search-result-text">${this.app.content.esc(preview)}</span><small>${this.app.content.esc(this.app.sectionLabel(q.section))} · ${this.app.content.esc(label)}${q.ungraded ? ` · ${this.app.content.esc(this.app.t("notScored"))}` : ""}</small></span>
            <span class="result-arrow" aria-hidden="true">→</span>
          </button>`;
        }).join("")}</div>`;
      }
      const priorities = this.app.data.focus || [];
      const usePriority = this.app.state.homeMode === "priority" && priorities.length;
      return `<div class="browse-grid">${usePriority
        ? priorities.map(item => this.listButton(item.id, item.label, item.detail, item.lead ? "lead" : "")).join("")
        : this.app.sectionIds().map(id => this.listButton(id, this.app.data.sections[id], this.app.data.weights?.[id] || "")).join("")}</div>`;
    }

    examSetupHtml() {
      const available = this.app.questions.filter(q => !q.ungraded).length;
      const defaultCount = Math.min(DEFAULT_EXAM_COUNT, available);
      const attempt = this.app.state.examAttempt;
      return `<section class="card exam-setup" aria-labelledby="exam-setup-title">
        <div class="exam-setup-intro"><p class="eyebrow">A fresh challenge</p><h2 id="exam-setup-title">${available ? "Build your attempt" : "No scored questions available"}</h2><p>${available ? `Draw a fresh set from ${available} scored questions. Questions and choices are shuffled; answers stay hidden until you submit.` : "This quiz currently contains only review items. You can read them in practice; a mock exam needs scored questions."}</p><span class="exam-mode-note">Timed · Random sample · Separate from practice progress</span></div>
        <div class="exam-setup-controls">
          ${available ? `<form class="exam-setup-form" novalidate>
            <div class="exam-config-fields">
              <div><label for="exam-count">Number of questions</label><input id="exam-count" type="number" min="1" max="${available}" step="1" inputmode="numeric" value="${this.app.content.esc(this.app.state.examCount)}" aria-describedby="exam-count-help${this.app.state.examError ? " exam-count-error" : ""}" ${this.app.state.examError ? 'aria-invalid="true"' : ""}><p id="exam-count-help">${defaultCount} by default. ${available === 1 ? "1 scored question available." : `Choose 1–${available}.`}</p>${this.app.state.examError ? `<p class="exam-field-error" id="exam-count-error" role="alert">${this.app.content.esc(this.app.state.examError)}</p>` : ""}</div>
              <div><label for="exam-minutes">Time limit (minutes)</label><input id="exam-minutes" type="number" min="1" max="${MAX_EXAM_MINUTES}" step="1" inputmode="numeric" value="${this.app.content.esc(this.app.state.examMinutes)}" aria-describedby="exam-minutes-help${this.app.state.examTimeError ? " exam-minutes-error" : ""}" ${this.app.state.examTimeError ? 'aria-invalid="true"' : ""}><p id="exam-minutes-help">${this.app.exam.examMinutes} by default. Choose 1–${MAX_EXAM_MINUTES}.</p>${this.app.state.examTimeError ? `<p class="exam-field-error" id="exam-minutes-error" role="alert">${this.app.content.esc(this.app.state.examTimeError)}</p>` : ""}</div>
            </div>
            <p class="exam-timing-help">The timer starts immediately and keeps running if you leave. At zero, your saved answers are submitted automatically.</p>
            <button type="submit" class="primary">${attempt ? "Start new exam" : "Start mock exam"} <span aria-hidden="true">→</span></button>
          </form>` : '<a class="ghost nav-control" href="index.html">Review in practice <span aria-hidden="true">→</span></a>'}
          ${attempt ? `<section class="saved-exam" aria-labelledby="saved-exam-title"><div class="saved-exam-header"><h3 id="saved-exam-title">${attempt.submitted ? "Your latest exam" : "Exam in progress"}</h3><p>${attempt.submitted ? attempt.timedOut ? "Time expired · Auto-submitted" : "Submitted" : `${this.app.examController.examAnswered(attempt)} answered`} · ${attempt.ids.length} ${attempt.ids.length === 1 ? "question" : "questions"}</p></div>${!attempt.submitted ? attempt.deadlineAt ? this.app.examController.examTimerHtml() : `<p class="saved-exam-note">This older attempt gets a ${this.app.exam.examMinutes}-minute timer when you resume.</p>` : ""}<div class="saved-exam-actions"><button type="button" class="ghost nav-control" data-action="resume-exam">${attempt.submitted ? "View results" : "Resume exam"}</button><button type="button" class="ghost nav-control danger" data-action="clear-exam">Clear saved attempt</button></div><p class="saved-exam-note">Starting a new exam replaces this saved attempt.</p></section>` : ""}
        </div>
      </section>`;
    }

    examPageHtml() {
      const defaultCount = Math.min(DEFAULT_EXAM_COUNT, this.app.questions.filter(q => !q.ungraded).length);
      return `<div class="wrap exam-page-shell">${this.siteHeader("exam")}${this.storageNoteHtml()}
        <main><section class="exam-page-intro" aria-labelledby="exam-page-title"><p class="eyebrow">Test what you know</p><h1 id="exam-page-title" tabindex="-1">Mock Exam</h1><p>Choose your exam length and work through a random set, numbered from 1 to the end. Submit when you’re ready to see your score and explanations.</p></section>
        ${this.examSetupHtml()}${defaultCount ? `<section class="exam-how-it-works" aria-label="How the mock exam works"><p><strong>1. Set your challenge</strong><span>${defaultCount} ${defaultCount === 1 ? "question" : "questions"} by default, with a ${this.app.exam.examMinutes}-minute limit. You can adjust both.</span></p><p><strong>2. Watch your time</strong><span>Skip, revisit, or resume the same attempt. Leaving does not pause the countdown.</span></p><p><strong>3. Submit and review</strong><span>Submit early or let the timer finish. Then review your score and explanations.</span></p></section>` : ""}</main>${this.siteFooter()}</div>`;
    }

    homeHtml() {
      const scored = this.app.tally(this.app.questions.filter(q => !q.ungraded));
      const unscored = this.app.tally(this.app.questions.filter(q => q.ungraded));
      const remaining = scored.total - scored.done;
      const percent = scored.total ? Math.round(scored.done / scored.total * 100) : 0;
      const accuracy = scored.done ? `${Math.round(scored.correct / scored.done * 100)}%` : "—";
      const resume = this.resumeTarget();
      const focus = this.nextFocus();
      const focusLabel = this.app.focusMeta(focus)?.label || this.app.t("all");
      const recommended = this.app.questionsFor(focus).find(q => !q.ungraded && !this.app.state.results[q.id]);
      const title = resume ? "Pick up where you left off." : remaining ? "One question closer." : "You’ve covered every scored question.";
      const description = resume
        ? `Question ${resume.id} · ${this.filterTitle(resume.filter)}. Your answers and unfinished selections are ready.`
        : remaining ? `${this.app.focusMeta(focus) ? `Work through ${focusLabel} next.` : "Choose your next question."} You’ll see the reasoning after each answer, and you can stop whenever you like.`
        : scored.wrong ? "Revisit your missed questions, check the reasoning, and try them again." : "Revisit a topic or work through the mock review notes at your own pace.";
      const action = resume ? 'data-action="resume"' : recommended
        ? `data-start="${this.app.content.esc(focus)}" data-start-at="${recommended.id}"` : `data-start="${scored.wrong ? "missed" : "all"}"`;
      const actionLabel = resume ? `Continue Question ${resume.id}` : recommended ? `${this.app.t("startWith")} ${focusLabel}` : scored.wrong ? this.app.t("reviewMissed") : "Review all questions";
      const priorityMode = this.app.state.homeMode === "priority" && (this.app.data.focus || []).length;
      const hasProgress = scored.done || unscored.done || Object.keys(this.app.state.drafts).length || Boolean(this.app.state.resume);
      const matches = this.app.state.homeQuery.trim() ? this.matchingQuestions().length : 0;
      return `
        <div class="wrap home-shell">
    ${this.siteHeader("practice")}
          <p class="home-context">${this.app.questions.length} questions · ${scored.total} scored · Self-paced practice</p>
          ${this.storageNoteHtml()}
          <main class="home-dashboard arrive">
            <div class="home-top-grid">
            <section class="hero next-session" aria-labelledby="home-title">
              <p class="home-eyebrow">${resume ? "Your saved session" : remaining ? "Your next step" : "Keep practising"}</p>
              <h1 id="home-title" tabindex="-1">${this.app.content.esc(title)}</h1>
              <p class="lede">${this.app.content.esc(description)}</p>
              <div class="actions">
                <button type="button" class="primary" ${action} ${this.app.questions.length ? "" : "disabled"}>${this.app.content.esc(actionLabel)} <span aria-hidden="true">→</span></button>
                ${resume && remaining ? `<button type="button" class="ghost" data-start="practice:unanswered">Practice unanswered</button>` : scored.wrong && remaining ? `<button type="button" class="ghost" data-start="missed">${this.app.content.esc(this.app.t("reviewMissed"))} (${scored.wrong})</button>` : ""}
              </div>
              <p class="home-save-note">${this.app.state.storageIssue ? "Your progress is kept for this open session." : "Your progress stays in this browser. Come back whenever you’re ready."}</p>
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
              <div class="home-progress-actions"><button type="button" class="ghost nav-control danger" data-action="reset" ${hasProgress ? "" : "disabled"}>${this.app.content.esc(this.app.t("clear"))}</button></div>
            </section>
            </div>
            <div class="home-main-grid">
              <section class="card practice-browser" aria-labelledby="practice-browser-title">
                <div class="home-section-heading"><h2 id="practice-browser-title">Choose your practice</h2><button type="button" class="home-all-link" data-start="all">All ${this.app.questions.length} questions <span aria-hidden="true">→</span></button></div>
                <p class="home-section-intro">Build the basics, explore a topic, or find a specific question.</p>
                <div class="browse-controls">
                  <div class="browse-modes" role="group" aria-label="Browse questions by">
                    ${(this.app.data.focus || []).length ? `<button type="button" data-home-mode="priority" aria-pressed="${Boolean(priorityMode)}">By priority</button>` : ""}
                    <button type="button" data-home-mode="topic" aria-pressed="${!priorityMode}">By topic</button>
                  </div>
                  <span class="priority-hint">${priorityMode ? "Must → High → Familiar → Low" : "Choose an area to work on"}</span>
                </div>
                <form class="home-search-form" role="search">
                  <label for="home-search">Find a question</label>
                  <div class="home-search-field"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg><input id="home-search" type="search" placeholder="Keyword, topic, or question number…" value="${this.app.content.esc(this.app.state.homeQuery)}" autocomplete="off" aria-controls="home-catalog" aria-describedby="home-search-status"><button type="button" data-clear-search ${this.app.state.homeQuery ? "" : "hidden"}>Clear</button></div>
                </form>
                <p id="home-search-status" class="search-status" role="status" aria-live="polite">${this.app.state.homeQuery.trim() ? `${matches} matching questions` : ""}</p>
                <div id="home-catalog">${this.homeCatalogHtml()}</div>
              </section>
              ${this.reviewSectionHtml()}
            </div>
          </main>
          ${this.siteFooter()}
        </div>`;
    }

    summaryHtml() {
      if (this.app.state.mode === "exam") return this.examSummaryHtml();
      const list = this.app.pool();
      const graded = list.filter(q => !q.ungraded);
      const stats = this.app.tally(graded);
      const reviewOnly = !graded.length && list.length > 0;
      const remaining = list.filter(q => !this.app.state.results[q.id]).length;
      const accuracy = stats.done ? `${Math.round(stats.correct / stats.done * 100)}%` : "—";
      const missed = this.app.questions.filter(q => this.app.state.results[q.id]?.status === "wrong").length;
      const nextSet = !remaining && (this.app.data.focus || []).find(item => item.id !== this.app.state.filter && this.app.questionsFor(item.id).some(q => !q.ungraded && !this.app.state.results[q.id]));
      const title = reviewOnly
        ? (remaining ? "Your review progress" : "Review complete")
        : (remaining ? this.app.t("practiceSoFar") : this.app.t("finish"));
      const description = reviewOnly
        ? `${list.length - remaining} of ${list.length} questions reviewed. This set is for study and does not affect accuracy.`
        : `${stats.done} of ${graded.length} scored questions answered. Accuracy is based on answered, scored questions.`;
      const metrics = reviewOnly
        ? [[list.length - remaining, "Reviewed"], [remaining, "Not reviewed"]]
        : [[stats.correct, this.app.t("correct"), "good"], [stats.wrong, this.app.t("missed"), "bad"], [remaining, this.app.t("remaining")], [accuracy, this.app.t("accuracy")]];
      const continueLabel = reviewOnly ? "Continue review" : this.app.t("continueUnanswered");
      return `<div class="wrap">${this.siteHeader("practice")}
        <div class="top"><div class="brand"><strong>Practice</strong><span>${this.app.content.esc(this.filterTitle())}</span></div>
          <button class="ghost nav-control" data-action="home"><span aria-hidden="true">←</span> ${this.app.content.esc(this.app.t("home"))}</button></div>
        ${this.storageNoteHtml()}
        <main class="card session-summary">
          <p class="eyebrow">${this.app.content.esc(this.filterTitle())}</p>
          <h1 class="summary-title" tabindex="-1">${this.app.content.esc(title)}</h1>
          <p>${this.app.content.esc(description)}</p>
          <div class="stat-row summary-stats${reviewOnly ? " review-only" : ""}">
            ${metrics.map(([value, label, tone]) => `<div class="stat${tone ? ` ${tone}` : ""}"><b>${this.app.content.esc(value)}</b><span>${this.app.content.esc(label)}</span></div>`).join("")}
          </div>
          ${!reviewOnly && list.length !== graded.length ? `<p>${list.length - graded.length} questions in this set are not scored.</p>` : ""}
          <div class="actions">
            ${remaining ? `<button class="primary" data-action="unanswered">${this.app.content.esc(continueLabel)} (${remaining})</button>` : `${nextSet ? `<button class="primary" data-start="${this.app.content.esc(nextSet.id)}">Continue with ${this.app.content.esc(nextSet.label)}</button>` : ""}<button class="${nextSet ? "ghost" : "primary"}" data-action="review-set">Review this set</button>`}
            ${missed ? `<button class="ghost" data-start="missed">${this.app.content.esc(this.app.t("reviewAllMissed"))} (${missed})</button>` : ""}
            <button class="quiet" data-action="home">${this.app.content.esc(this.app.t("back"))}</button>
          </div>
        </main>${this.siteFooter()}</div>`;
    }

    examSummaryHtml() {
      const list = this.app.pool();
      const submitted = this.app.state.examAttempt.submitted;
      const answered = this.app.examController.examAnswered();
      const incomplete = list.length - answered;
      const correct = list.filter(q => this.app.state.results[q.id]?.status === "correct").length;
      const wrong = list.filter(q => this.app.state.results[q.id]?.status === "wrong").length;
      const unanswered = list.filter(q => this.app.state.results[q.id]?.status === "unanswered").length;
      const score = Math.round(correct / list.length * 100);
      const attempt = this.app.state.examAttempt;
      const timing = submitted && attempt.startedAt && attempt.submittedAt
        ? `<p class="exam-time-summary">Time used: <strong>${this.app.examController.clockText(Math.min(attempt.durationMinutes * 60, (attempt.submittedAt - attempt.startedAt) / 1000))}</strong> of ${this.app.examController.clockText(attempt.durationMinutes * 60)}.</p>` : "";
      const rows = list.map((q, index) => {
        const status = this.app.state.results[q.id]?.status;
        const complete = this.app.examController.examSelectionComplete(q, this.app.state.drafts[q.id]);
        const label = submitted ? status === "correct" ? "Correct" : status === "wrong" ? "Missed" : "Not answered"
          : complete ? "Answered" : this.app.state.drafts[q.id]?.length ? "Incomplete selection" : "Not answered";
        return `<button type="button" class="exam-review-row ${submitted ? this.app.content.esc(status) : ""}" data-jump="${index}"><strong>Question ${index + 1}</strong><span>${this.app.content.esc(label)} <span aria-hidden="true">→</span></span></button>`;
      }).join("");
      return `<div class="wrap">${this.siteHeader("exam")}<div class="top exam-summary-top"><div class="brand"><strong>Mock Exam</strong><span>${this.app.content.esc(this.filterTitle())}</span></div><div class="page-header-actions">${submitted ? "" : this.app.examController.examTimerHtml()}<button class="ghost nav-control" data-action="home"><span aria-hidden="true">←</span> Exam setup</button></div></div>${this.storageNoteHtml()}
        <main class="card session-summary exam-summary"><p class="eyebrow">${submitted ? "Your exam result" : "Review before submitting"}</p><h1 class="summary-title" tabindex="-1">${submitted ? `${correct} / ${list.length} correct` : "Ready to finish?"}</h1>
        <p>${submitted ? `Score: ${score}%. ${list.length === 1 ? "The question counts toward the result, even if skipped." : `All ${list.length} questions count toward the result, including skipped questions.`} This attempt has not changed your regular practice progress.` : `${answered} of ${list.length} ${list.length === 1 ? "question has" : "questions have"} a complete selection. ${incomplete ? `${incomplete} ${incomplete === 1 ? "is" : "are"} unanswered or incomplete.` : "Every question is answered."} You can change your selections until you submit.`}</p>
        ${attempt.timedOut ? '<p class="exam-time-expired" role="status">Time is up. Your saved answers were submitted automatically; unanswered questions earn no points.</p>' : ""}${timing}
        ${submitted ? `<div class="stat-row summary-stats"><div class="stat good"><b>${correct}</b><span>Correct</span></div><div class="stat bad"><b>${wrong}</b><span>Missed</span></div><div class="stat"><b>${unanswered}</b><span>Unanswered</span></div><div class="stat"><b>${score}%</b><span>Score</span></div></div>` : `<p class="exam-submit-note">The countdown continues on this screen. Submitting reveals the answers and locks this attempt. Skipped questions earn no points; incomplete selections are incorrect.</p>`}
        <div class="actions">${submitted ? `<button class="primary" data-action="review-set">Review answers</button>` : `<button class="primary" data-action="submit-exam">Submit exam</button><button class="ghost" data-action="exam-return">${incomplete ? "Continue answering" : "Review selections"}</button>`}<button class="quiet" data-action="home">${submitted ? "Back to exam setup" : "Save and exit"}</button></div>
        <h2 class="exam-review-title">${submitted ? "Review each question" : "Check your selections"}</h2><div class="exam-review-list">${rows}</div></main>${this.siteFooter()}</div>`;
    }

    emptyHtml() {
      const missed = this.app.state.filter === "missed";
      return `
        <div class="wrap">${this.siteHeader()}
          <div class="top">
            <div class="brand">
              <strong>${this.app.content.esc(missed ? this.app.t("emptyMissed") : this.app.t("emptyList"))}</strong>
              <span>${this.app.content.esc(missed ? this.app.t("emptyMissedNote") : this.app.t("emptyNote"))}</span>
            </div>
          </div>
          <section class="card empty"><button class="primary" data-action="home">${this.app.content.esc(this.app.t("back"))}</button></section>
          ${this.siteFooter()}
        </div>`;
    }

    quizHtml() {
      const list = this.app.pool();
      const q = this.app.current();
      const result = this.app.state.results[q.id];
      const locked = Boolean(result);
      const inExam = this.app.state.mode === "exam";
      const takingExam = inExam && !this.app.state.examAttempt.submitted;
      const stats = this.app.tally(list.filter((item) => !item.ungraded));
      const needed = q.type === "multi" ? q.choose || q.answer.length : 1;
      const choose = locked ? (result.status === "correct" ? this.app.t("correct") : result.status === "wrong" ? this.app.t("missed") : result.status === "unanswered" ? "Not answered" : "Reviewed") : q.ungraded ? "Review only" : q.type === "multi"
        ? (this.app.state.picked.length ? `${this.app.state.picked.length} of ${needed} ${this.app.t("ofSelected")}${this.app.state.picked.length > needed ? ` · Remove ${this.app.state.picked.length - needed}` : ""}` : `${this.app.t("selectN")} ${needed}`)
        : (this.app.state.picked.length ? this.app.t("selected") : this.app.t("selectOne"));
      const selectionHelp = q.ungraded ? "You can read the explanation without selecting an answer."
        : q.type === "multi" ? this.app.state.picked.length > needed ? `Remove ${this.app.state.picked.length - needed} ${this.app.state.picked.length - needed === 1 ? "selection" : "selections"} to check your answers.`
          : this.app.state.picked.length === needed ? "Ready to check your answers."
          : `Choose ${needed - this.app.state.picked.length} ${this.app.state.picked.length ? "more " : ""}${needed - this.app.state.picked.length === 1 ? "answer" : "answers"}.`
        : this.app.state.picked.length ? "Ready to check your answer." : "Choose the best answer, then check your reasoning.";
      const answered = inExam ? this.app.examController.examAnswered() : stats.done;
      const remaining = stats.total - answered;
      const coverage = stats.total ? answered / stats.total * 100 : 0;
      const accuracy = stats.done ? `${Math.round(stats.correct / stats.done * 100)}%` : "—";
      const nextUnanswered = this.app.nextUnansweredIndex();
      const helpText = this.app.state.storageIssue ? "Selection kept in this tab; saving is unavailable. Keep this tab open." : takingExam ? this.app.canCheck(q) ? "Selection saved. You can change it before submitting."
        : this.app.state.picked.length > needed ? `Remove ${this.app.state.picked.length - needed} ${this.app.state.picked.length - needed === 1 ? "selection" : "selections"} before continuing.`
        : `Choose ${needed - this.app.state.picked.length} ${this.app.state.picked.length ? "more " : ""}${needed - this.app.state.picked.length === 1 ? "answer" : "answers"}. Selections save automatically.` : selectionHelp;
      const focus = this.app.focusMeta(q.focus);
      const pattern = q.group ? this.app.patternMeta(q.group) : null;
      const heading = pattern?.label || this.app.sectionLabel(q.section);
      const flags = [
        q.corrected ? `<span class="flag">${this.app.content.esc(this.app.t("corrected"))}</span>` : "",
        q.repaired ? `<span class="flag repaired" aria-label="${this.app.content.esc(`${this.app.t("repaired")}: ${this.app.t("reviewRepairedNote")}`)}">${this.app.content.esc(this.app.t("repaired"))}</span>` : "",
        q.ungraded ? `<span class="flag">${this.app.content.esc(this.app.t("notScored"))}</span>` : "",
      ].filter(Boolean).join("");
      const notice = q.exhibitMissing
        ? `<div class="note">${this.app.content.esc(this.app.t("missingFigure"))}</div>`
        : q.ungraded ? `<div class="note">${this.app.content.esc(this.app.t("notScoredNote"))}</div>` : "";
      const options = this.app.content.displayOptions(q).map((option) => {
        const body = option.code
          ? `<span class="codeblock compact"><code>${this.app.content.esc(option.text)}</code></span>`
          : this.app.content.esc(option.text);
        const code = option.code;
        const right = locked && !q.ungraded && q.answer.includes(option.id);
        const picked = this.app.state.picked.includes(option.id);
        const status = locked && !q.ungraded
          ? [right ? this.app.t("answerCorrect") : "", picked ? this.app.t("yourAnswer") : ""].filter(Boolean).join(" · ")
          : "";
        const symbol = locked && !q.ungraded ? (right ? "✓" : picked ? "×" : "") : picked ? "✓" : "";
        return `<button type="button" class="${this.app.content.optionClass(q, option, result)}" data-pick="${option.id}" aria-pressed="${picked}" ${locked ? "disabled" : ""}>
          <span class="letter">${option.label}</span>
          <span class="body${code ? " code" : ""}">${body}${status ? `<span class="option-status">${this.app.content.esc(status)}</span>` : ""}</span>
          <span class="choice-indicator${q.type === "multi" ? " multi" : ""}" aria-hidden="true">${symbol}</span>
        </button>`;
      }).join("");
      const explain = result ? this.app.content.explanationHtml(q, result.status) : "";
      const pills = list.map((item, index) => {
        const status = this.app.state.results[item.id]?.status;
        const mark = index === this.app.state.index ? "on " : "";
        const complete = takingExam && this.app.examController.examSelectionComplete(item, this.app.state.drafts[item.id]);
        const tone = status === "correct" ? "ok" : status === "wrong" ? "no" : status === "ungraded" ? "skip" : complete ? "answered" : "";
        const draft = !status && this.app.state.drafts[item.id]?.length;
        const currentAttr = index === this.app.state.index ? ' aria-current="true"' : "";
        const statusLabel = status === "correct" ? this.app.t("correct") : status === "wrong" ? this.app.t("missed") : status === "ungraded" ? "Reviewed (not scored)" : status === "unanswered" ? "Not answered" : complete ? "Answered" : draft ? "Draft selection" : this.app.t("notStarted");
        const symbol = status === "correct" ? "✓" : status === "wrong" ? "×" : status === "ungraded" ? "–" : draft || complete ? "•" : "";
        const number = inExam ? index + 1 : item.id;
        return `<button class="${mark}${tone}" data-jump="${index}"${currentAttr}${this.navigatorMatches(item) ? "" : " hidden"} aria-label="${this.app.content.esc(`${this.app.t("question")} ${number}: ${statusLabel}`)}" title="${this.app.content.esc(`${this.app.t("question")} ${number}: ${statusLabel}`)}">${number}${symbol ? `<span class="nav-mark" aria-hidden="true">${symbol}</span>` : ""}</button>`;
      }).join("");
      const navigatorFilters = [["all", "All"], ["answered", "Answered"], ["unanswered", "Unanswered"], ...(takingExam ? [] : [["missed", "Missed"]])];
      const visibleQuestions = list.filter(item => this.navigatorMatches(item)).length;
      const atEnd = this.app.state.index === list.length - 1;
      const resultsLabel = takingExam ? "Review & finish" : this.app.t("results");
      const checkLabel = takingExam ? atEnd ? "Review & finish" : "Save and next" : q.ungraded ? this.app.t("readExplanation") : q.type === "multi" ? this.app.t("checkMany") : this.app.t("check");
      const showSkip = list.some((item) => item.ungraded);
    
      return `
        <div class="wrap question-shell">${this.siteHeader()}
          <div class="top question-top">
            <div class="brand"><strong>${inExam ? "Mock Exam" : "Practice"}</strong>
              <span>${this.app.content.esc(this.filterTitle())} <span aria-hidden="true">/</span> Question ${inExam ? this.app.state.index + 1 : q.id}${inExam ? " · Choices shuffled" : ""}</span>
            </div>
            <div class="page-header-actions">${takingExam ? this.app.examController.examTimerHtml() : ""}<button class="ghost nav-control" data-action="home"><span aria-hidden="true">←</span>${inExam ? takingExam ? "Save & exit" : "Exam setup" : this.app.content.esc(this.app.t("home"))}</button></div>
          </div>
          ${this.storageNoteHtml()}
          <section class="set-progress" aria-label="${inExam ? "Mock exam progress" : "Practice set progress"}">
            <div class="set-progress-copy"><strong>${this.app.state.index + 1}<span> / ${list.length}</span></strong><span>In this set</span></div>
            <div class="set-coverage"><div><span>${stats.total ? `${answered} of ${stats.total} scored answered` : "Review only · no scored questions"}</span>${stats.total ? `<span>${takingExam ? "Answers revealed after submission" : `${accuracy} ${inExam ? "score" : "accuracy"}`}</span>` : ""}</div><div class="set-coverage-track" role="progressbar" aria-label="Scored questions answered in this set" aria-valuemin="0" aria-valuemax="${stats.total || 1}" aria-valuenow="${answered}" aria-valuetext="${answered} of ${stats.total} scored questions answered"><span style="width:${coverage}%"></span></div></div>
            <button type="button" class="quiet" data-action="results">${this.app.content.esc(resultsLabel)} <span aria-hidden="true">↗</span></button>
          </section>
          <div class="quiz" role="main">
            <article class="card panel${this.app.state.motion === "arrive" ? " arrive" : ""}">
              <div class="qhead">
                <div class="title-row">
                  <p class="topic">${this.app.content.esc(heading)}</p>
                  ${focus ? `<p class="rank ${this.app.content.esc(q.focus)}">${this.app.content.esc(focus.label)}</p>` : ""}
                </div>
                <div class="subline">
                  <h1 class="qnum" tabindex="-1">${this.app.content.esc(this.app.t("question"))} ${inExam ? this.app.state.index + 1 : q.id}</h1>
                  ${flags ? `<div class="flags">${flags}</div>` : ""}
                </div>
              </div>
              <div class="panel-body">
                <div class="stem">${this.app.content.stemHtml(q)}</div>
                ${notice}
                <div class="answer-toolbar"><h2 id="answer-choices-title">${locked ? "Your selection" : "Choose your answer"}</h2><p class="status${!locked && this.app.state.picked.length > needed && !q.ungraded ? " over-limit" : ""}" role="status" aria-live="polite">${this.app.content.esc(choose)}</p></div>
                <div class="options" role="group" aria-labelledby="answer-choices-title" aria-describedby="selection-help">${options}</div>
                <div class="selection-guidance"><p id="selection-help" class="selection-help">${this.app.content.esc(locked ? inExam ? "This attempt is submitted. Review the explanation below." : q.ungraded ? "Read the study notes below. This question is not scored." : "Answer checked. Review the explanation below, or try again." : helpText)}</p><div class="selection-meta">${this.app.state.storageIssue ? '<span class="save-status unsaved">Not saved</span>' : this.app.state.picked.length || result ? '<span class="save-status"><span aria-hidden="true">✓</span> Saved</span>' : '<span class="save-status pending">Auto-save on</span>'}${!locked ? `<button type="button" class="quiet clear-selection" data-action="clear-selection" ${this.app.state.picked.length ? "" : "disabled"}>Clear selection</button>` : ""}</div></div>
                ${explain}
              </div>
              <div class="foot">
                <button class="ghost previous-question" data-nav="-1" aria-label="${this.app.content.esc(this.app.t("previous"))}" ${this.app.state.index === 0 ? "disabled" : ""}><span aria-hidden="true">←</span><span class="nav-word"> ${this.app.content.esc(this.app.t("previous"))}</span></button>
                <div class="right">
                  ${locked && !inExam ? `<button class="ghost" data-action="retry">${this.app.content.esc(this.app.t("tryAgain"))}</button>` : ""}
                  ${locked
                    ? (atEnd
                      ? `<button class="primary" data-action="results">${this.app.content.esc(this.app.t("results"))}</button>`
                      : `<button class="primary" data-nav="1">${this.app.content.esc(this.app.t("next"))} <span aria-hidden="true">→</span></button>`)
                    : `<button class="quiet" data-nav="1">${this.app.content.esc(this.app.t("skip"))}</button><button class="primary" data-action="check" ${this.app.canCheck(q) ? "" : "disabled"}>${this.app.content.esc(checkLabel)}</button>`}
                </div>
              </div>
            </article>
            <details class="card side" ${(this.app.state.mapOpen ?? (this.window.matchMedia ? this.window.matchMedia("(min-width: 861px)").matches : true)) ? "open" : ""}>
              <summary>${this.app.content.esc(this.app.t("navigator"))}<span>${this.app.state.index + 1} / ${list.length}</span></summary>
              <div class="navigator-content">
              <div class="navigator-overview"><p class="sr-only"><strong>${remaining}</strong> ${inExam ? "unanswered or incomplete" : "scored unanswered"} in this set</p><button type="button" class="ghost" data-action="next-unanswered" ${nextUnanswered < 0 ? "disabled" : ""}>Next unanswered <span aria-hidden="true">→</span></button></div>
              <h2 class="sr-only">${this.app.content.esc(this.app.focusMeta(this.app.state.filter)?.ordered ? this.app.t("studyOrder") : this.app.t("questions"))}</h2>
              <div class="navigator-controls">
              <form class="jump-form"><label for="question-number">${this.app.content.esc(this.app.t("goTo"))}<span class="sr-only"> question${inExam ? ` in this exam (1–${list.length})` : ""}</span></label><div>
                <input id="question-number" name="question" type="number" min="1" ${inExam ? `max="${list.length}"` : ""} step="1" inputmode="numeric" value="${this.app.content.esc(this.app.state.jumpValue)}" placeholder="${inExam ? this.app.state.index + 1 : q.id}" ${this.app.state.jumpError ? 'aria-invalid="true" aria-describedby="jump-error"' : ""}>
                <button class="ghost" type="submit">${this.app.content.esc(this.app.t("go"))}</button></div>
              </form>
              <div class="navigator-filter-row"><label for="navigator-filter">Show</label><select id="navigator-filter" aria-controls="question-map">${navigatorFilters.map(([value, label]) => `<option value="${value}"${this.app.state.navFilter === value ? " selected" : ""}>${label} (${list.filter(item => this.navigatorMatches(item, value)).length})</option>`).join("")}</select></div>
              ${this.app.state.jumpError ? `<p class="navigator-error" id="jump-error" role="alert">${this.app.content.esc(this.app.state.jumpError)}</p>` : ""}
              </div>
              <p class="navigator-filter-status" role="status"${this.app.state.navFilter === "all" && !this.app.focusMeta(this.app.state.filter)?.ordered ? " hidden" : ""}>${this.app.state.navFilter === "all" ? "Study order" : `${visibleQuestions} of ${list.length} shown${this.app.focusMeta(this.app.state.filter)?.ordered ? " · Study order" : ""}`}${this.navigatorMatches(q) ? "" : " · Current question is outside this filter"}</p>
              <div class="jump" id="question-map"${visibleQuestions ? "" : " hidden"}>${pills}</div>
              ${visibleQuestions ? "" : '<p class="navigator-empty">No questions match this filter. Choose All to see the full set.</p>'}
              <div class="stats" aria-label="Question status legend">${takingExam ? '<span class="swatch answered">Answered</span>' : `<span class="swatch ok">${this.app.content.esc(this.app.t("correct"))}</span><span class="swatch no">${this.app.content.esc(this.app.t("missed"))}</span>`}<span class="draft-legend">• Draft</span>${showSkip ? `<span class="swatch skip">${this.app.content.esc(this.app.t("notScored"))}</span>` : ""}</div>
              </div>
            </details>
          </div>
          ${this.siteFooter()}
        </div>`;
    }

    filterTitle(filter = this.app.state.filter) {
      if (filter === "exam") return `Mock Exam · ${this.app.state.ids.length} ${this.app.state.ids.length === 1 ? "question" : "questions"}`;
      if (filter === "missed") return this.app.t("missedList");
      if (filter === "all") return this.app.exam.allLabel || this.app.t("all");
      if (filter === "practice:unanswered") return "Unanswered questions";
      const review = REVIEW_SETS.find(set => set.id === filter);
      if (review) return this.app.t(review.label);
      const focus = this.app.focusMeta(filter);
      if (focus) return focus.label;
      return this.app.sectionLabel(filter);
    }
  }
  modules.ScreenRenderer=ScreenRenderer;
})();
