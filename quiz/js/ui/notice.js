// Progressive enhancement controller. Findings remain readable without JavaScript.
(() => {
  const modules = window.QuizModules || (window.QuizModules = {});
  class NoticeController {
    #listeners = [];
    #mounted = false;
    #frame = null;
    constructor({ document, window, navigation }) {
      this.document = document;
      this.window = window;
      this.navigation = navigation;
      this.scheduled = false;
      this.aboutWasOpen = false;
    }
    listen(target, name, handler, options) {
      target.addEventListener(name, handler, options);
      this.#listeners.push({ target, name, handler, options });
    }
    mount() {
      if (this.#mounted) return;
      const header = this.document.querySelector('[data-site-header]');
      const footer = this.document.querySelector('[data-site-footer]');
      if (header && footer && this.navigation) {
        const title = this.document.querySelector('.notice-hero .notice-kicker')?.textContent.trim();
        header.innerHTML = this.navigation.header('notes', title);
        footer.innerHTML = this.navigation.footer();
        this.navigation.bind();
      }
      this.input = this.document.querySelector('#notice-search');
      if (!this.input) return;
      this.clear = this.document.querySelector('[data-notice-clear]');
      this.status = this.document.querySelector('#notice-search-status');
      this.empty = this.document.querySelector('.notice-search-empty');
      this.tables = [...this.document.querySelectorAll('.notice-table')].map(region => ({
        region, rows: [...region.querySelectorAll('tbody tr')], empty: region.nextElementSibling,
      }));
      this.rows = this.tables.flatMap(table => table.rows);
      this.searchText = new Map(this.rows.map(row => [row, row.textContent.toLowerCase().replace(/\s+/g, ' ')]));
      this.about = this.document.querySelector('.notice-about');
      this.sections = [...this.document.querySelectorAll('#notice-overview, [data-notice-section]')];
      this.links = [...this.document.querySelectorAll('.notice-contents a')];
      this.listen(this.input, 'input', () => this.update());
      this.listen(this.input, 'keydown', event => {
        if (event.key !== 'Escape') return;
        event.preventDefault();
        this.input.value = '';
        this.update();
      });
      this.listen(this.clear, 'click', () => {
        this.input.value = '';
        this.update();
        this.input.focus();
      });
      this.listen(this.document.querySelector('.notice-search-form'), 'submit', event => {
        event.preventDefault();
        const first = this.rows.find(row => !row.hidden);
        if (!first) return;
        first.tabIndex = -1;
        first.focus({ preventScroll: true });
        first.scrollIntoView({ block: 'center', inline: 'nearest' });
      });
      const print = this.document.querySelector('[data-notice-print]');
      print.hidden = false;
      this.listen(print, 'click', () => this.window.print());
      this.listen(this.window, 'beforeprint', () => { this.aboutWasOpen = this.about.open; this.about.open = true; });
      this.listen(this.window, 'afterprint', () => { this.about.open = this.aboutWasOpen; });
      this.listen(this.window, 'scroll', () => {
        if (this.scheduled) return;
        this.scheduled = true;
        this.#frame = this.window.requestAnimationFrame(() => {
          this.#frame = null;
          if (this.#mounted) this.updateNavigation();
        });
      }, { passive: true });
      this.document.querySelector('[data-notice-tools]').hidden = false;
      this.#mounted = true;
      this.update();
      this.updateNavigation();
    }
    matches(row, query) {
      const number = query.match(/^(?:#|q\s*)?(\d+)$/i);
      if (number) return row.dataset.questions.split(',').includes(String(Number(number[1])));
      return query.toLowerCase().split(/\s+/).every(term => this.searchText.get(row).includes(term));
    }
    update() {
      const query = this.input.value.trim();
      let count = 0;
      for (const table of this.tables) {
        let found = 0;
        for (const row of table.rows) {
          row.hidden = Boolean(query) && !this.matches(row, query);
          if (!row.hidden) found++;
        }
        table.region.hidden = found === 0;
        table.empty.hidden = found > 0;
        count += found;
      }
      this.status.textContent = query
        ? `${count} of ${this.rows.length} table notes match. Other review text stays visible.${count ? ' Press Enter to jump to the first match.' : ''}`
        : `${this.rows.length} table notes. Try “Q20”, “127”, or a phrase such as “coverage”.`;
      this.empty.hidden = count > 0;
      this.clear.disabled = this.input.value.length === 0;
    }
    updateNavigation() {
      let current = this.sections[0].id;
      for (const section of this.sections) {
        if (section.getBoundingClientRect().top <= 120) current = section.id || section.querySelector('h2').id;
      }
      for (const link of this.links) {
        if (link.getAttribute('href') === `#${current}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
      this.scheduled = false;
    }
    dispose() {
      for (const { target, name, handler, options } of this.#listeners) target.removeEventListener?.(name, handler, options);
      this.#listeners = [];
      if (this.#frame != null) this.window.cancelAnimationFrame?.(this.#frame);
      this.#frame = null;
      this.scheduled = false;
      this.#mounted = false;
    }
  }
  modules.NoticeController = NoticeController;
  modules.notice = new NoticeController({ document, window, navigation: window.QuizNavigation });
  modules.notice.mount();
})();
