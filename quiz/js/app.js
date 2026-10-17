// Composition root and application controller. No ambient mutable player globals.
(() => {
  const modules = window.QuizModules || (window.QuizModules = {});
  const { DEFAULT_EXAM_COUNT, REVIEW_SETS } = modules.constants;
  const {QuestionBank,AnswerGrader,ChoiceOrder,ProgressRepository,ExamController,ContentRenderer,ScreenRenderer,QuizDomController}=modules;
  const COPY = {
    clear: "Reset practice progress",
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
    confirmClear: "Reset this quiz's practice answers, drafts, and resume point? Your saved mock exam will be kept.",
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
    goTo: "Go to",
    go: "Go",
    selectionHint: "Select exactly",
    answerCorrect: "Correct answer",
    yourAnswer: "Your answer",
    readExplanation: "Read explanation",
    notScoredNote: "This question is for review only and does not affect your score.",
    storageNotice: "Progress could not be saved in this browser. Keep this tab open to retain this session.",
    savedLocally: "Progress is saved in this browser on this device.",
  };
  class QuizApplication {
    #state=null;
    // Ports are replaceable: storage, clock, scheduler, randomness, grading, and navigation.
    constructor(options={}) {
      this.document=options.document||document;
      this.window=options.window||window;
      this.storage=options.storage||{
        getItem:key=>localStorage.getItem(key), setItem:(key,value)=>localStorage.setItem(key,value), removeItem:key=>localStorage.removeItem(key),
      };
      this.clock=options.clock||{now:()=>Date.now()};
      this.scheduler=options.scheduler||this.window;
      this.confirm=options.confirm||(message=>confirm(message));
      this.grader=options.grader||new AnswerGrader();
      this.choiceOrder=options.choiceOrder||new ChoiceOrder(options.random);
      this.navigation=options.navigation===undefined?this.window.QuizNavigation:options.navigation;
      this.repositoryFactory=options.repositoryFactory||((bank,onError)=>new ProgressRepository({storage:this.storage,bank,grader:this.grader,choiceOrder:this.choiceOrder,onError}));
      this.examController=new ExamController(this,{clock:this.clock,scheduler:this.scheduler});
      this.content=new ContentRenderer(this);
      this.screens=new ScreenRenderer(this);
      this.events=new QuizDomController(this);
    }
    get state() { return this.#state; }
    get data() { return this.bank.data; }
    get exam() { return this.bank.data.exam; }
    get questions() { return this.bank.questions; }
    get byId() { return this.bank.byId; }
    get storageKey() { return this.repository.key; }
    initialize(config,questionList) {
      if(!config||typeof config!=='object'||Array.isArray(config))throw new Error('quiz.js must define window.QUIZ_CONFIG as an object.');
      if(!Array.isArray(questionList))throw new Error('questions.js must define window.QUIZ_QUESTIONS as an array.');
      const bank=new QuestionBank({...config,questions:questionList});
      this.events.mount();
      this.boot(bank);
      return this;
    }
    dispose() { this.examController.stop(); this.events.dispose(); }
    boot(bank) {
      this.examController.stop();
      this.bank=bank;
      this.repository=this.repositoryFactory(bank,error=>{if(this.state)this.state.storageIssue=true;});
      this.#state = {
        view: this.isExamPage() ? "exam-setup" : "home",
        filter: "all",
        index: 0,
        ids: [],
        picked: [],
        motion: "",
        results: this.repository.loadResults(),
        drafts: {},
        optionOrders: {},
        resume: null,
        storageIssue: false,
        mapOpen: null,
        navFilter: "all",
        jumpError: "",
        jumpValue: "",
        homeMode: "priority",
        homeQuery: "",
        mode: "practice",
        practice: null,
        examAttempt: null,
        examCount: String(Math.min(DEFAULT_EXAM_COUNT, this.questions.filter(q => !q.ungraded).length)),
        examError: "",
        examMinutes: String(this.exam.examMinutes),
        examTimeError: "",
        timerWarning: 0,
      };
      const session = this.repository.loadSession(this.state.results);
      this.state.drafts = session.drafts;
      this.state.optionOrders = session.optionOrders;
      this.state.resume = session.resume;
      this.state.examAttempt = this.repository.loadExamAttempt();
      this.render();
    }
    saveSession() {
      if(this.state.mode==='exam') { this.examController.saveExamAttempt(); return; }
      if(this.state.view==='quiz'&&this.current())this.state.resume={filter:this.state.filter,id:this.current().id};
      this.repository.saveSession({...this.state.resume,drafts:this.state.drafts,optionOrders:this.state.optionOrders});
    }
    saveResults() {
      if(this.state.mode==='exam')this.examController.saveExamAttempt();
      else this.repository.saveResults(this.state.results);
    }
    clearExam() {
      if(!this.state.examAttempt||!this.confirm('Clear the saved mock exam? Regular practice progress will be kept.'))return;
      this.examController.leaveExam();
      this.state.examAttempt=null;
      this.repository.clearExam();
      this.state.view='exam-setup';
      this.render({focus:'#exam-page-title'});
    }
    returnHome() {
      this.rememberDraft(); this.saveSession(); this.examController.leaveExam();
      this.state.view=this.isExamPage()?'exam-setup':'home';
      this.render({focus:this.isExamPage()?'#exam-page-title':'.hero h1'});
    }
    resumePractice() {
      const resume=this.screens.resumeTarget();
      if(resume)this.start(resume.filter,resume.id);
    }
    returnToIncompleteExam() {
      const index=this.state.ids.findIndex(id=>!this.examController.examSelectionComplete(this.byId.get(id),this.state.drafts[id]));
      this.jump(index<0?0:index);
    }
    t(key) {
      return this.exam.copy?.[key] || COPY[key];
    }

    isExamPage() {
      return this.document.body?.dataset.quizPage === "exam";
    }

    focusMeta(id) {
      return (this.data.focus || []).find((item) => item.id === id);
    }

    groups() {
      return this.data.groups || this.data.patterns || [];
    }

    patternMeta(id) {
      return this.groups().find((item) => item.id === id);
    }

    sectionIds() {
      if (Array.isArray(this.data.sectionOrder) && this.data.sectionOrder.length) return this.data.sectionOrder;
      return Object.keys(this.data.sections || {});
    }

    questionsFor(filter) {
      if (filter === "missed") {
        return this.questions.filter((q) => this.state.results[q.id]?.status === "wrong");
      }
      if (filter === "all") return this.questions;
      if (filter === "practice:unanswered") return this.questions.filter(q => !q.ungraded && !this.state.results[q.id]);
      const review = REVIEW_SETS.find(set => set.id === filter);
      if (review) return this.questions.filter(q => q[review.flag]);
      const focus = this.focusMeta(filter);
      if (focus) {
        const list = this.questions.filter((q) => q.focus === filter);
        if (!focus.ordered) return list;
        const rank = new Map(this.groups().map((group, index) => [group.id, index]));
        return list.slice().sort((a, b) => (rank.get(a.group) ?? 999) - (rank.get(b.group) ?? 999) || a.id - b.id);
      }
      return this.questions.filter((q) => q.section === filter);
    }

    pool() {
      return this.state.ids.map((id) => this.byId.get(id)).filter(Boolean);
    }

    current() {
      return this.pool()[this.state.index];
    }

    tally(list) {
      let correct = 0;
      let wrong = 0;
      let done = 0;
      for (const q of list) {
        const status = this.state.results[q.id]?.status;
        if (!status) continue;
        done += 1;
        if (status === "correct") correct += 1;
        if (status === "wrong") wrong += 1;
      }
      return { correct, wrong, done, total: list.length };
    }

    sectionLabel(id) {
      return this.data.sections[id] || "All questions";
    }

    rememberedPick() {
      const q = this.current();
      return q ? (this.state.results[q.id]?.picked || this.state.drafts[q.id] || []).slice() : [];
    }

    rememberDraft() {
      const q = this.current();
      if (q && !this.state.results[q.id]) this.state.drafts[q.id] = this.state.picked.slice();
    }

    start(filter, resumeId) {
      this.examController.leaveExam();
      if (this.state.view === "quiz") this.rememberDraft();
      const list = this.questionsFor(filter);
      this.state.filter = filter;
      this.state.navFilter = "all";
      this.state.ids = list.map((q) => q.id);
      if (!list.length) {
        this.state.view = "empty";
        this.state.picked = [];
        this.render();
        return;
      }
      let resume = list.findIndex(q => q.id === resumeId);
      if (resume < 0) resume = list.findIndex((q) => !this.state.results[q.id]);
      this.state.index = resume === -1 ? 0 : resume;
      this.state.picked = this.rememberedPick();
      this.state.view = "quiz";
      this.state.motion = "arrive";
      this.state.jumpError = "";
      this.state.jumpValue = "";
      this.saveSession();
      this.render({ focus: ".qnum" });
    }

    go(delta) {
      if (this.examController.stopForExpiredExam()) return;
      this.rememberDraft();
      if (delta > 0 && this.state.index === this.pool().length - 1) {
        this.showSummary();
        return;
      }
      this.jump(Math.min(this.pool().length - 1, Math.max(0, this.state.index + delta)));
    }

    jump(index) {
      if (this.examController.stopForExpiredExam()) return;
      if (!Number.isInteger(index) || index < 0 || index >= this.state.ids.length) return;
      if (this.state.view === "quiz") this.rememberDraft();
      this.state.index = index;
      this.state.view = "quiz";
      this.state.picked = this.rememberedPick();
      this.state.motion = "arrive";
      this.state.jumpError = "";
      this.state.jumpValue = "";
      this.saveSession();
      this.render({ focus: ".qnum" });
    }

    showSummary() {
      if (this.examController.stopForExpiredExam()) return;
      this.rememberDraft();
      this.saveSession();
      this.state.view = "summary";
      this.render({ focus: ".summary-title" });
    }

    canCheck(q) {
      if (!q || this.state.results[q.id]) return false;
      if (q.ungraded) return true;
      return this.state.picked.length === (q.type === "multi" ? q.choose || q.answer.length : 1);
    }

    toggle(letter) {
      if (this.examController.stopForExpiredExam()) return;
      const q = this.current();
      if (this.state.results[q.id]) return;
      if (q.type === "single") {
        this.state.picked = [letter];
      } else if (this.state.picked.includes(letter)) {
        this.state.picked = this.state.picked.filter((item) => item !== letter);
      } else {
        const maximum = q.choose || q.answer.length;
        if (maximum > 0 && this.state.picked.length >= maximum) return;
        this.state.picked = this.state.picked.concat(letter);
      }
      this.rememberDraft();
      this.saveSession();
      this.render({ preserve: true, focus: `[data-pick="${letter}"]` });
    }

    check() {
      if (this.examController.stopForExpiredExam()) return;
      const q = this.current();
      if (!this.canCheck(q)) return;
      if (this.state.mode === "exam") {
        this.rememberDraft();
        this.go(1);
        return;
      }
      const status = this.grader.grade(q, this.state.picked);
      this.state.results[q.id] = { picked: this.state.picked.slice(), status };
      delete this.state.drafts[q.id];
      this.saveResults();
      this.saveSession();
      this.render({ focus: ".explain", feedback: true });
    }

    retry() {
      if (this.state.mode === "exam") return;
      const q = this.current();
      delete this.state.results[q.id];
      this.state.picked = [];
      delete this.state.drafts[q.id];
      this.state.motion = "arrive";
      this.saveResults();
      this.saveSession();
      this.render({ focus: ".qnum" });
    }

    clearSelection() {
      if (this.examController.stopForExpiredExam()) return;
      const q = this.current();
      if (!q || this.state.results[q.id] || !this.state.picked.length) return;
      this.state.picked = [];
      this.rememberDraft();
      this.saveSession();
      this.render({ preserve: true, focus: `[data-pick="${this.content.displayOptions(q)[0].id}"]` });
    }

    nextUnansweredIndex() {
      for (let offset = 1; offset < this.state.ids.length; offset++) {
        const index = (this.state.index + offset) % this.state.ids.length;
        const q = this.byId.get(this.state.ids[index]);
        if (q && !q.ungraded && !this.state.results[q.id] && (this.state.mode !== "exam" || !this.examController.examSelectionComplete(q, this.state.drafts[q.id]))) return index;
      }
      return -1;
    }

    resetAll() {
      if (!this.confirm(this.t("confirmClear"))) return;
      this.examController.leaveExam();
      this.state.results = {};
      this.state.drafts = {};
      this.state.resume = null;
      this.state.optionOrders = {};
      this.saveResults();
      this.state.view = "home";
      this.saveSession();
      this.render({ focus: ".hero h1" });
    }

    render(options = {}) {
      if (this.examController.expireExam() && this.state.mode === "exam") options = { focus:".summary-title" };
      if (this.exam.title) this.document.title = this.isExamPage() ? `Mock Exam — ${this.exam.title.replace(/\s+practice$/i, "")}` : this.exam.title;
      const app = this.document.getElementById("app");
      const oldScroll = options.preserve ? this.document.querySelector(".panel-body")?.scrollTop || 0 : 0;
      const navScroll = options.preserve && !options.resetNavigator ? this.document.querySelector(".jump")?.scrollTop || 0 : null;
      const pageScroll = options.preserve ? this.window.scrollY : null;
      app.innerHTML = this.screens.render(this.state.view);
      this.state.motion = "";
      this.events.bind();
      this.navigation?.bind();
      const body = this.document.querySelector(".panel-body");
      if (body) body.scrollTop = oldScroll;
      if (navScroll != null) {
        const nav = this.document.querySelector(".jump");
        if (nav) nav.scrollTop = navScroll;
      }
      const focus = options.focus ? this.document.querySelector(options.focus) : null;
      focus?.focus({ preventScroll: options.preserve || options.feedback });
      if (options.feedback && focus) {
        if (body && this.window.matchMedia?.("(min-width: 861px)").matches) {
          // Reveal feedback within the desktop reader without scrolling its ancestors.
          const offset = focus.getBoundingClientRect().top - body.getBoundingClientRect().top;
          body.scrollTop = Math.max(0, body.scrollTop + offset - 20);
        } else {
          focus.scrollIntoView({ block: "start", inline: "nearest" });
        }
      }
      if (pageScroll != null) this.window.scrollTo?.(0, pageScroll);
      this.examController.syncExamTimer();
    }

    updateHomeSearch() {
      const catalog = this.document.getElementById("home-catalog");
      if (!catalog) return;
      catalog.innerHTML = this.screens.homeCatalogHtml();
      const status = this.document.getElementById("home-search-status");
      if (status) status.textContent = this.state.homeQuery.trim() ? `${this.screens.matchingQuestions().length} matching questions` : "";
      const clear = this.document.querySelector("[data-clear-search]");
      if (clear) clear.hidden = !this.state.homeQuery;
    }

    setHomeMode(mode) {
      if (this.state.view !== "home" || !["priority", "topic"].includes(mode) || this.state.homeMode === mode) return;
      if (mode === "priority" && !this.data.focus?.length) return;
      const pageScroll = this.window.scrollY;
      this.state.homeMode = mode;
      this.state.homeQuery = "";
      const search = this.document.querySelector("#home-search");
      if (search) search.value = "";
      this.document.querySelectorAll("[data-home-mode]").forEach(button => {
        button.setAttribute("aria-pressed", String(button.dataset.homeMode === mode));
      });
      const hint = this.document.querySelector(".priority-hint");
      if (hint) hint.textContent = mode === "priority" ? "Must → High → Familiar → Low" : "Choose an area to work on";
      this.updateHomeSearch();
      this.document.querySelector(`[data-home-mode="${mode}"]`)?.focus({ preventScroll:true });
      if (pageScroll != null) this.window.scrollTo?.(0, pageScroll);
    }

    openQuestion(id) {
      if (Number.isInteger(id) && this.byId.has(id)) this.start("all", id);
    }
  }
  modules.QuizApplication=QuizApplication;
  let application;
  const facade={
    get application() { return application; },
    start(config,questions) {
      application ||= new QuizApplication();
      return application.initialize(config,questions);
    },
    showError(error) {
      const message=String(error.message).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
      document.getElementById('app').innerHTML='<div class="wrap"><section class="card empty"><h1>Could not load this quiz</h1><p>'+message+'</p></section></div>';
    },
  };
  window.Quiz=facade;
  try { facade.start(window.QUIZ_CONFIG,window.QUIZ_QUESTIONS); }
  catch(error) { facade.showError(error); }
})();
