// Optional enhancements. The complete review stays readable without JavaScript.
(() => {
  const input = document.querySelector("#notice-search");
  if (!input) return;
  const clear = document.querySelector("[data-notice-clear]");
  const status = document.querySelector("#notice-search-status");
  const empty = document.querySelector(".notice-search-empty");
  const tables = [...document.querySelectorAll(".notice-table")].map(region => ({
    region,
    rows: [...region.querySelectorAll("tbody tr")],
    empty: region.nextElementSibling,
  }));
  const rows = tables.flatMap(table => table.rows);
  const searchText = new Map(rows.map(row => [row, row.textContent.toLowerCase().replace(/\s+/g, " ")]));

  function matches(row, query) {
    const number = query.match(/^(?:#|q\s*)?(\d+)$/i);
    if (number) return row.dataset.questions.split(",").includes(String(Number(number[1])));
    return query.toLowerCase().split(/\s+/).every(term => searchText.get(row).includes(term));
  }

  function update() {
    const query = input.value.trim();
    let count = 0;
    for (const table of tables) {
      let found = 0;
      for (const row of table.rows) {
        row.hidden = Boolean(query) && !matches(row, query);
        if (!row.hidden) found++;
      }
      table.region.hidden = found === 0;
      table.empty.hidden = found > 0;
      count += found;
    }
    status.textContent = query
      ? `${count} of ${rows.length} table notes match. Other review text stays visible. Press Enter to jump to the first match.`
      : `${rows.length} table notes. Try “Q20”, “127”, or a phrase such as “coverage”.`;
    empty.hidden = count > 0;
    clear.disabled = input.value.length === 0;
  }

  input.addEventListener("input", update);
  input.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    input.value = "";
    update();
  });
  clear.addEventListener("click", () => {
    input.value = "";
    update();
    input.focus();
  });
  document.querySelector(".notice-search-form").addEventListener("submit", event => {
    event.preventDefault();
    const first = rows.find(row => !row.hidden);
    if (!first) return;
    first.tabIndex = -1;
    first.focus({ preventScroll: true });
    first.scrollIntoView({ block: "center", inline: "nearest" });
  });

  const print = document.querySelector("[data-notice-print]");
  print.hidden = false;
  print.addEventListener("click", () => window.print());
  // Printing includes the entire review, even while table search is active.
  const about = document.querySelector(".notice-about");
  let aboutWasOpen = false;
  window.addEventListener("beforeprint", () => { aboutWasOpen = about.open; about.open = true; });
  window.addEventListener("afterprint", () => { about.open = aboutWasOpen; });

  const sections = [...document.querySelectorAll("#notice-overview, [data-notice-section]")];
  const links = [...document.querySelectorAll(".notice-contents a")];
  let scheduled = false;
  function updateNavigation() {
    let current = sections[0].id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= 120) current = section.id || section.querySelector("h2").id;
    }
    for (const link of links) {
      if (link.getAttribute("href") === `#${current}`) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
    scheduled = false;
  }
  window.addEventListener("scroll", () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(updateNavigation);
  }, { passive: true });
  document.querySelector("[data-notice-tools]").hidden = false;
  update();
  updateNavigation();
})();
