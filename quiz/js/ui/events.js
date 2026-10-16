// DOM controller and command dispatch. Owns listener registration and teardown.
(() => {
  const modules = window.QuizModules || (window.QuizModules = {});
  const { CHOICE_LETTERS } = modules.constants;
  class QuizDomController {
    #mounted=false;
    constructor(app) {
      this.app=app; this.document=app.document; this.window=app.window;
      this.onClick=event=>this.handleClick(event);
      this.onKeydown=event=>this.handleKeydown(event);
      this.onTimer=()=>app.examController.updateExamTimer();
      this.actions=new Map([
        ['home',()=>app.returnHome()], ['reset',()=>app.resetAll()], ['check',()=>app.check()],
        ['retry',()=>app.retry()], ['clear-selection',()=>app.clearSelection()],
        ['next-unanswered',()=>app.jump(app.nextUnansweredIndex())], ['results',()=>app.showSummary()],
        ['resume-exam',()=>{if(app.state.examAttempt)app.examController.activateExam(app.state.examAttempt);}],
        ['submit-exam',()=>app.examController.submitExam()], ['clear-exam',()=>app.clearExam()],
        ['exam-return',()=>app.returnToIncompleteExam()], ['resume',()=>app.resumePractice()],
        ['unanswered',()=>app.jump(app.state.ids.findIndex(id=>!app.state.results[id]))], ['review-set',()=>app.jump(0)],
      ]);
    }
    mount() {
      if(this.#mounted)return;
      this.document.addEventListener('click',this.onClick);
      this.document.addEventListener('keydown',this.onKeydown);
      this.document.addEventListener('visibilitychange',this.onTimer);
      this.window.addEventListener?.('focus',this.onTimer);
      this.#mounted=true;
    }
    dispose() {
      if(!this.#mounted)return;
      this.document.removeEventListener?.('click',this.onClick);
      this.document.removeEventListener?.('keydown',this.onKeydown);
      this.document.removeEventListener?.('visibilitychange',this.onTimer);
      this.window.removeEventListener?.('focus',this.onTimer);
      this.#mounted=false;
    }
    bind() {
      this.document.querySelectorAll('[data-action]').forEach(node=> {
        node.addEventListener('click',()=>this.actions.get(node.dataset.action)?.());
      });
      this.document.querySelectorAll("[data-pick]").forEach((node) => {
        node.addEventListener("click", () => this.app.toggle(node.dataset.pick));
      });
      this.document.querySelectorAll("[data-nav]").forEach((node) => {
        node.addEventListener("click", () => this.app.go(Number(node.dataset.nav)));
      });
      this.document.querySelectorAll("[data-jump]").forEach((node) => {
        node.addEventListener("click", () => this.app.jump(Number(node.dataset.jump)));
      });
      const box = this.document.querySelector(".jump");
      const currentButton = box?.querySelector("button.on:not([hidden])");
      if (box && currentButton) {
        box.scrollTop = Math.max(0, currentButton.offsetTop - (box.clientHeight - currentButton.offsetHeight) / 2);
      }
      const map = this.document.querySelector("details.side");
      map?.addEventListener("toggle", () => { this.app.state.mapOpen = map.open; });
      const navigatorFilter = this.document.querySelector("#navigator-filter");
      navigatorFilter?.addEventListener("change", () => {
        this.app.state.navFilter = navigatorFilter.value;
        this.app.render({ preserve: true, resetNavigator: true, focus: "#navigator-filter" });
      });
      const input = this.document.querySelector("#question-number");
      input?.addEventListener("input", () => { this.app.state.jumpValue = input.value; });
      this.document.querySelector(".jump-form")?.addEventListener("submit", event => {
        event.preventDefault();
        const id = Number(input.value);
        const index = this.app.state.mode === "exam" ? id - 1 : this.app.state.ids.indexOf(id);
        if (Number.isInteger(index) && index >= 0 && index < this.app.state.ids.length) this.app.jump(index);
        else {
          this.app.state.jumpError = this.app.state.mode === "exam" ? `Choose an exam question from 1 to ${this.app.state.ids.length}.` : `Question ${input.value || "number"} is not in this set. Choose a number from the navigator.`;
          this.app.render({ preserve: true, focus: "#question-number" });
        }
      });
      const search = this.document.querySelector("#home-search");
      search?.addEventListener("input", () => {
        this.app.state.homeQuery = search.value;
        this.app.updateHomeSearch();
      });
      search?.addEventListener("keydown", event => {
        if (event.key !== "Escape") return;
        event.preventDefault();
        this.app.state.homeQuery = "";
        search.value = "";
        this.app.updateHomeSearch();
      });
      this.document.querySelector(".home-search-form")?.addEventListener("submit", event => {
        event.preventDefault();
        const matches = this.app.screens.matchingQuestions();
        if (matches.length === 1) this.app.openQuestion(matches[0].id);
        else this.document.querySelector("[data-question]")?.focus();
      });
      const count = this.document.querySelector("#exam-count");
      count?.addEventListener("input", () => { this.app.state.examCount = count.value; });
      const minutes = this.document.querySelector("#exam-minutes");
      minutes?.addEventListener("input", () => { this.app.state.examMinutes = minutes.value; });
      this.document.querySelector(".exam-setup-form")?.addEventListener("submit", event => {
        event.preventDefault();
        this.app.examController.startRandomExam(count.value, minutes.value);
      });
    }
    handleClick(event) {
  if (event.defaultPrevented) return;
  const button = event.target.closest("button");
  if (!button || button.disabled) return;
  if (button.dataset.start) this.app.start(button.dataset.start, button.dataset.startAt ? Number(button.dataset.startAt) : undefined);
  else if (button.dataset.question) this.app.openQuestion(Number(button.dataset.question));
  else if (button.dataset.homeMode) {
    this.app.setHomeMode(button.dataset.homeMode);
  } else if (button.hasAttribute("data-clear-search")) {
    this.app.state.homeQuery = "";
    const search = this.document.querySelector("#home-search");
    if (search) search.value = "";
    this.app.updateHomeSearch();
    search?.focus();
  }

    }
    handleKeydown(event) {
  if (!this.app.state || this.app.state.view !== "quiz") return;
  if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || event.repeat) return;
  if (event.target.closest(".site-header, .site-footer, .site-help-dialog")) return;
  if (event.target.closest("input, textarea, select, pre, [contenteditable]:not([contenteditable='false'])")) return;
  const q = this.app.current();
  const letter = event.key.toUpperCase();
  const option = letter.length === 1 ? this.app.content.displayOptions(q)[CHOICE_LETTERS.indexOf(letter)] : null;
  if (option) {
    event.preventDefault();
    this.app.toggle(option.id);
    return;
  }
  if (event.key === "Enter") {
    // Let a focused native control perform its own action exactly once.
    if (event.target.closest("button, a, summary")) return;
    event.preventDefault();
    if (this.app.state.results[q.id]) this.app.go(1);
    else this.app.check();
  }
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    event.preventDefault();
    this.app.go(event.key === "ArrowRight" ? 1 : -1);
  }

    }
  }
  modules.QuizDomController=QuizDomController;
})();
