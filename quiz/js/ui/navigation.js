// Shared navigation view/controller, independent of quiz state.
(() => {
  const modules=window.QuizModules||(window.QuizModules={});
  const escape = value => String(value).replace(/[&<>"']/g, character => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[character]));
  class SiteNavigation {
    #menuOpen = false;
    #helpContext = {};
    constructor(document) { this.document = document; }
    header(active, title = "Certification practice") {
      return `<header class="site-header${this.#menuOpen ? " menu-open" : ""}">
        <a class="site-brand" href="index.html" aria-label="${escape(title)} · Practice home"><span aria-hidden="true">Q<span>↗</span></span><span class="site-brand-copy"><small>Salesforce practice</small><strong>${escape(title)}</strong></span></a>
        <button type="button" class="ghost site-menu-toggle" aria-expanded="${this.#menuOpen}" aria-controls="site-navigation">Menu <span aria-hidden="true">☰</span></button>
        <nav id="site-navigation" class="site-navigation" aria-label="Quiz sections">${[
          ["practice", "Practice", "index.html"], ["exam", "Mock Exam", "exam.html"], ["notes", "Review Notes", "notice.html"],
        ].map(([id, label, href]) => `<a href="${href}"${active === id ? ' aria-current="page"' : ""}>${label}</a>`).join("")}</nav>
      </header>`;
    }

    footer(storageIssue = false, helpContext = {}) {
      this.#helpContext = { ...helpContext };
      return `<footer class="site-footer"><div class="site-footer-links"><button type="button" data-site-help="guide">How to use</button><button type="button" data-site-help="keys">Keyboard shortcuts</button></div><p${storageIssue ? ' class="site-save-warning"' : ""}>${storageIssue ? "Saving unavailable · keep this tab open" : "Progress stays in this browser"}</p></footer>
        <dialog class="site-help-dialog" aria-labelledby="site-help-title"><div class="site-help-content"></div></dialog>`;
    }

    guideHtml() {
      return `<section class="site-help-section"><h3>${this.#helpContext.hasPriorities ? "Choose your study order" : "Choose your practice"}</h3><p>${this.#helpContext.hasPriorities
        ? 'Start with <strong>Must</strong> for the foundations, then <strong>High</strong> for important applications. <strong>Familiar</strong> and <strong>Low</strong> offer extra practice. These are study priorities, not exam predictions.'
        : 'Choose a topic or open All questions to work through the question bank.'} Use search to find a question by keyword or its original number.</p></section>
        <section class="site-help-section"><h3>Answer and review</h3><p>Practice is untimed. Choose your answer, check the reasoning, and revisit <strong>Missed</strong> questions you answered incorrectly. Unfinished selections save automatically.</p></section>
        <section class="site-help-section"><h3>Understand the labels</h3><p><strong>Corrected</strong> and <strong>Repaired</strong> describe changes to the source mock. <strong>Not scored</strong> questions are for study and do not affect accuracy.</p></section>
        <section class="site-help-section"><h3>Try a mock exam</h3><p><strong>Mock Exam</strong> shuffles questions and choices. Its timer continues when you leave; answers appear after submission. Exam progress is saved separately from practice.</p></section>
        <section class="site-help-section"><h3>Your saved progress</h3><p>Progress saves automatically in this browser on this device. Use the same browser and quiz address to return to it. <strong>Reset practice progress</strong> in the Your progress section clears practice answers, unfinished selections, and the resume point. Saved mock exams are kept.</p></section>
        ${this.#helpContext.groupsNote ? `<section class="site-help-section"><h3>About this question bank</h3><p>${escape(this.#helpContext.groupsNote)}</p></section>` : ""}`;
    }

    bind() {
      const menu = this.document.querySelector(".site-menu-toggle");
      const headerNode = this.document.querySelector(".site-header");
      menu?.addEventListener("click", () => {
        this.#menuOpen = !this.#menuOpen;
        headerNode.classList.toggle("menu-open", this.#menuOpen);
        menu.setAttribute("aria-expanded", String(this.#menuOpen));
      });
      headerNode?.addEventListener("keydown", event => {
        if (event.key !== "Escape" || !this.#menuOpen) return;
        this.#menuOpen = false;
        headerNode.classList.remove("menu-open");
        menu.setAttribute("aria-expanded", "false");
        menu.focus();
      });
      const dialog = this.document.querySelector(".site-help-dialog");
      this.document.querySelectorAll("[data-site-help]").forEach(button => button.addEventListener("click", () => {
        const keys = button.dataset.siteHelp === "keys";
        dialog.querySelector(".site-help-content").innerHTML = `<header><h2 id="site-help-title">${keys ? "Keyboard shortcuts" : "How to use this quiz"}</h2><button type="button" class="ghost" data-close-help aria-label="Close help">×</button></header><div class="site-help-body">${keys
          ? '<p>While answering a question:</p><dl><div><dt>A–Z</dt><dd>Select the matching answer.</dd></div><div><dt>Enter</dt><dd>Check your answer, or continue after checking. In an exam, save and continue.</dd></div><div><dt>← / →</dt><dd>Move between questions.</dd></div><div><dt>Tab / Shift + Tab</dt><dd>Move between controls. Enter or Space activates a focused button.</dd></div><div><dt>Escape</dt><dd>Close help or the navigation menu. In a search field, clear the search.</dd></div></dl><p>Text fields and menus keep their usual keyboard controls.</p>'
          : this.guideHtml()}</div>`;
        dialog.querySelector("[data-close-help]").addEventListener("click", () => dialog.close());
        dialog.showModal();
      }));
    }

  }
  modules.SiteNavigation=SiteNavigation;
  window.QuizNavigation=new SiteNavigation(document);
})();
