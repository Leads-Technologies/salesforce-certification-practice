// Question/choice/explanation rendering, composed with the application.
(() => {
  const modules = window.QuizModules || (window.QuizModules = {});
  const { CHOICE_LETTERS } = modules.constants;
  class ContentRenderer {
    constructor(app) { this.app=app; this.document=app.document; this.window=app.window; }
    esc(value) {
      return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
    }

    inlineHtml(text) {
      return String(text).split(/(`[^`\n]+`)/g).map((part) => {
        if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
          return `<code>${this.esc(part.slice(1, -1))}</code>`;
        }
        return part.split(/(https?:\/\/[^\s<>"`]+)/g).map(piece => {
          if (!/^https?:\/\//.test(piece)) return this.esc(piece);
          const url = piece.replace(/[.,;!?]+$/, "");
          const suffix = piece.slice(url.length);
          const domain = url.replace(/^https?:\/\//, "").split("/")[0];
          return `<a class="reference-link" href="${this.esc(url)}" target="_blank" rel="noopener noreferrer" title="${this.esc(url)}">${this.esc(domain)} <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a>${this.esc(suffix)}`;
        }).join("");
      }).join("");
    }

    blocksHtml(blocks, lead) {
      return (blocks || []).map((block, index) => {
        if (block.type === "code") return `<pre class="codeblock" tabindex="0" aria-label="Code sample"><code>${this.esc(block.text)}</code></pre>`;
        return `<p class="${lead && index === 0 ? "lead" : ""}">${this.inlineHtml(block.text)}</p>`;
      }).join("");
    }

    askBlockHtml(block, question) {
      const text = this.choiceReferenceText(question, block.text).trim();
      if (/^Choose \d+ answers?\.?$/i.test(text)) {
        return `<p class="choose">${this.esc(text.replace(/\.$/, ""))}</p>`;
      }
      return `<p class="ask">${this.esc(text)}</p>`;
    }

    stemHtml(question) {
      const blocks = question.stem || [];
      const html = [];
      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        if (block.type === "code") {
          html.push(`<pre class="codeblock" tabindex="0" aria-label="Question code sample"><code>${this.esc(block.text)}</code></pre>`);
          continue;
        }
        if (block.type !== "ask") {
          html.push(`<p class="scene">${this.esc(this.choiceReferenceText(question, block.text))}</p>`);
          continue;
        }
        const asks = [];
        while (i < blocks.length && blocks[i].type === "ask") {
          asks.push(blocks[i]);
          i += 1;
        }
        i -= 1;
        html.push(`<div class="prompt">${asks.map(block => this.askBlockHtml(block, question)).join("")}</div>`);
      }
      return html.join("");
    }

    answerPreview(option) {
      const first = option.text.split("\n").map((line) => line.trim()).find(Boolean) || option.text;
      return first.length > 160 ? `${first.slice(0, 157)}…` : first;
    }

    displayOptions(q) {
      if (this.app.state.mode !== "exam") return q.options.map(option => ({ ...option, label:option.id }));
      if (!this.app.choiceOrder.validOptionOrder(q, this.app.state.optionOrders[q.id])) this.app.state.optionOrders[q.id] = this.app.choiceOrder.shuffleOptionOrder(q);
      return this.app.state.optionOrders[q.id].map((id, index) => ({ ...q.options.find(option => option.id === id), label: CHOICE_LETTERS[index] }));
    }

    displayLetters(q, ids) {
      return this.displayOptions(q).filter(option => ids.includes(option.id)).map(option => option.label);
    }

    choiceReferenceText(q, text) {
      if (this.app.state.mode !== "exam") return String(text);
      const labels = Object.fromEntries(this.displayOptions(q).map(option => [option.id, option.label]));
      const letter = `[${q.options.map(option => option.id).join("")}]`;
      const group = `${letter}(?:\\s*(?:,\\s*(?:(?:and|or)\\s+)?|(?:and|or)\\s+)${letter})+`;
      const references = new RegExp(`\\b(?:(?:[Oo]ptions?|[Cc]hoices?|[Aa]nswers?)\\s+(?:${group}|${letter})|${group}|${letter}(?=\\s+(?:is|are|uses|use|has|have|can|cannot|does|perform|performs|describe|describes|both|was|were)\\b))\\b`, "g");
      // Code and URLs can contain literal letters that are unrelated to the choices.
      return String(text).split(/(`[^`\n]+`|https?:\/\/[^\s<>"`]+)/g).map(part =>
        /^(?:`|https?:\/\/)/.test(part) ? part : part.replace(references, match => match.replace(/\b[A-Z]\b/g, id => labels[id] || id))
      ).join("");
    }

    explanationBlocks(q, blocks) {
      return (blocks || []).map(block => block.type === "code" ? block : { ...block, text: this.choiceReferenceText(q, block.text) });
    }

    choiceListHtml(items) {
      if (!items.length) return "";
      const rows = items.map((item) => `
        <li>
          <span class="letter">${this.esc(item.id)}</span>
          <p>${this.inlineHtml(item.text)}</p>
        </li>`).join("");
      return `<div class="why-not"><h3>${this.esc(this.app.t("otherChoices"))}</h3><ul class="choice-points">${rows}</ul></div>`;
    }

    explanationHtml(q, status) {
      const title = status === "correct" ? this.app.t("correctTitle") : status === "wrong" ? this.app.t("wrongTitle") : status === "unanswered" ? "Not answered" : this.app.t("readTitle");
      const tone = status === "ungraded" ? "neutral" : status === "wrong" || status === "unanswered" ? "bad" : "good";
      const explain = q.explain;
      const choices = this.displayOptions(q);
      const chosen = choices.filter((option) => q.answer.includes(option.id));
      const answers = chosen.map((option) => `
        <div class="answer-line">
          <span class="letter">${option.label}</span>
          <span class="body">${this.esc(this.answerPreview(option))}</span>
        </div>`).join("");
      const why = explain.why?.length
        ? `<h3 class="why-title">Why</h3><div class="prose">${this.blocksHtml(this.explanationBlocks(q, explain.why), true)}</div>`
        : "";
      const letterKey = this.app.state.mode === "exam" ? `<p class="source-letter-key">These notes use the original mock letters. Original → displayed: ${this.esc(choices.slice().sort((a,b) => a.id.localeCompare(b.id)).map(option => `${option.id} → ${option.label}`).join(" · "))}.</p>` : "";
      const notes = explain.notes?.length
        ? `<details class="more"><summary>${this.esc(this.app.t("fullExplanation"))}</summary>${letterKey}<div class="prose">${this.blocksHtml(explain.notes)}</div></details>`
        : "";
      const printed = q.corrected
        ? `<p class="mock-note">${this.esc(this.app.t("sourceSays"))} ${this.esc(q.printed.join(", "))}${this.app.state.mode === "exam" ? " in the original mock order" : ""}. ${this.esc(this.app.t("gradedAs"))} ${this.esc(this.displayLetters(q, q.answer).join(", "))}${this.app.state.mode === "exam" ? " in this session" : ""}.</p>`
        : "";
      const picked = this.app.state.results[q.id]?.picked || [];
      const recap = q.ungraded
        ? "Review only · excluded from your score"
        : `Your ${picked.length > 1 ? "answers" : "answer"}: ${this.displayLetters(q, picked).join(", ") || "Not answered"} · ${q.acceptAny ? "Accepted answers (choose one)" : q.answer.length > 1 ? "Correct answers" : "Correct answer"}: ${this.displayLetters(q, q.answer).join(", ")}`;
      const others = choices.flatMap(option => {
        const item = (explain.others || []).find(item => item.id === option.id);
        return item ? [{ id: option.label, text: this.choiceReferenceText(q, item.text) }] : [];
      });
      return `<section class="explain ${tone}" tabindex="-1" aria-label="${this.esc(title)}">
        <div class="feedback-heading"><span class="feedback-icon" aria-hidden="true">${status === "correct" ? "✓" : status === "wrong" ? "×" : "i"}</span><div><h2>${this.esc(title)}</h2><p>${this.esc(recap)}</p></div></div>
        ${answers ? `<h3 class="answer-heading">${q.ungraded ? "Reference answer" : q.acceptAny ? "Accepted alternatives" : "The answer"}</h3>` : ""}
        ${answers}
        ${why}
        ${this.choiceListHtml(others)}
        ${notes}
        ${printed}
      </section>`;
    }

    optionClass(q, option, result) {
      const selected = this.app.state.picked.includes(option.id);
      if (!result || q.ungraded) return selected ? "option selected" : "option";
      const right = q.answer.includes(option.id);
      if (right && (selected || !q.acceptAny)) return selected ? "option correct" : "option missed";
      if (selected) return "option wrong";
      return "option";
    }
  }
  modules.ContentRenderer=ContentRenderer;
})();
