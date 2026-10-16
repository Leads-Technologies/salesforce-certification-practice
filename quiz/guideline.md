# Guidelines for generating a quiz from a DOCX mock

Read this before creating or updating a quiz. Reuse the shared player and follow the user's conventions below.

## Files and launch behavior

```text
quiz/
  guideline.md
  css/
    styles.css
    notice.css
  js/
    app.js
    notice.js
  tools/
    validate.js
    validate-notices.js
  schema.json
<quiz-name>/
  index.html
  quiz.js
  questions.js
  notice.html
  original-mock.docx
```

- Put all shared implementation, styling, schemas, optional tools, and AI guidance under `/quiz`. Browser scripts belong in `/quiz/js`, styles in `/quiz/css`, and development checks in `/quiz/tools`. Keep `schema.json` and `guideline.md` at the top of `/quiz`.
- Each quiz folder holds its entry point, editable data, original mock, and user-facing `notice.html`. Put mock-specific findings in that notice, not in `/quiz`.
- Use vanilla HTML/CSS/JavaScript. Opening a quiz's `index.html` directly must start that quiz without a server, installation, build, upload dialog, or quiz picker.
- Load ordinary classic scripts in this order: `quiz.js`, `questions.js`, `../quiz/js/app.js`. Link `../quiz/css/styles.css`. Do not use ES modules, `fetch`, XHR, or a per-quiz loader for local data.
- Data files assign `window.QUIZ_CONFIG = {...};` and `window.QUIZ_QUESTIONS = [...];`. Edit these JS files directly; do not add parallel JSON copies, split question folders, or embedded HTML data.
- Use plain local asset paths without `?v=...`. Preserve functional query parameters such as Google Fonts specifications.
- Keep existing quiz/question Ids, choice order, and storage keys stable. Give each new quiz a unique `storageKey`.

## Extract the whole document

1. Inspect paragraphs, tables, code, drawings, embedded media, image relationships, question numbering, selection counts, and all answer-key locations. DOCX files are ZIP archives containing Word XML and optional media.
2. Read content in document order. Join split text runs without losing operators, punctuation, field names, indentation, or option labels. Associate each image with the correct question/option.
3. Identify the document's main answer key, such as a numbered appendix. Record conflicts with handwritten marks or inline keys and resolve them with evidence; the printed answer can still be technically wrong.
4. Preserve original numbering and repeated questions. Do not silently omit, renumber, or deduplicate questions.
5. Remove only verified extraction artifacts such as repeated headers or page numbers. A number may be a real option, code literal, or governor limit.
6. Compare the total count, stems, choices, code, and keys with the source before completing the import. Keep the original DOCX unchanged.

## Images and incomplete questions

- Inspect embedded images before concluding an exhibit is missing. For code screenshots, transcribe into code blocks and visually verify every operator, loop bound, annotation, bracket, and DML statement.
- Do not invent missing source content and present it as recovered. If a responsible repair supplies an assumption, code, or distractor, explain exactly what was supplied in `notice.html` and the relevant study notes.
- The current block format supports text, prompts, and code. If a real diagram is essential, extend the shared schema/renderer for images, store assets under `/quiz/media/<quiz-id>/`, and verify local-file display.
- If essential content cannot be recovered and the question cannot be repaired reliably, use `ungraded: true` and, for a missing exhibit, `exhibitMissing: true`. State the problem visibly and list it in `notice.html`.
- An ungraded question without a verified answer may use `answer: ""`. Preserve any known source key internally; never fabricate a grading key. Mark it scored only after the uncertainty is resolved.

## Config and study metadata

Use `schema.json` and the existing quizzes as structural examples. Do not copy another certification's percentages or content.

- Config supplies `id`, `title`, `storageKey`, `sections`, `focus`, and `groups`, plus suitable descriptions, legends, and copy.
- `section` is a broad topic. `group` is a narrower study concept. Every reference must match an entry in the config.
- Use the focus levels `must`, `high`, `familiar`, and `low`. Put foundational patterns first, then important applications, additional practice, and narrow/duplicate details. These are AI study priorities, not exam predictions.
- Set `lead: true` and `ordered: true` on Must; list conceptual groups in teaching order.
- Use official topic weights only after verifying the current official outline. For custom topic divisions, omit weights or label them clearly as percentages **of this mock**. Record the verification date/source when using official weights.

Every question needs `id`, `section`, `focus`, `group`, `stem`, `choices`, `answer`, `why`, `wrong`, and `notes`:

```javascript
window.QUIZ_QUESTIONS = [
  {
    "id": 1,
    "section": "automation",
    "focus": "must",
    "group": "limits",
    "stem": [
      "A complete scenario with the assumptions needed to answer.",
      { "ask": "What should the developer do?" }
    ],
    "choices": ["First option", "Second option", "Third option"],
    "answer": "B",
    "why": "Explain why B meets this specific requirement.",
    "wrong": {
      "A": "Explain the particular mismatch in A.",
      "C": "Explain the particular mismatch in C."
    },
    "notes": ["Add implementation details, caveats, examples, and useful references."]
  }
];
```

- Choices are labeled by position: A, B, C, etc. Do not repeat letters inside their text.
- Code in stems, explanations, or choices uses `{ "code": ["line 1", "line 2"] }`. Prompts use `{ "ask": "..." }`. Imported markup must display as escaped text, not execute.
- Multiple selection uses `type: "multi"` and a canonical key such as `answer: "A,C"`. Any `choose` value and Choose N prompt must agree. Grade the complete set independently of selection order.
- `acceptAny: true` is only for a single selection among equivalent correct alternatives. Explain the exception clearly; it is not a multi-select question.
- `why` must explain the mechanism behind every selected answer, not just repeat the letters.
- `wrong` must explain every non-answer option. Do not dismiss an otherwise valid approach as impossible merely because it is not the best fit for this scenario.
- Check for overlapping valid choices before imposing a single answer. Accept equivalent single-choice alternatives with `acceptAny`, or clarify a supported requirement. Do not reject one description just because another is more detailed.
- Distinguish required steps from alternative available actions. A Choose 2 question must say whether both actions are necessary, both are independently available, or they are two properties being identified.
- `notes` should add useful detail rather than repeat `why` and the distractors. Duplicate questions still need self-contained explanations.

### Question review states

The home page provides separate Corrected, Repaired, and Not scored review lists. These describe the source review, independently of the learner's Correct/Missed progress.

- **Corrected** (`corrected: true`): the source answer key is demonstrably wrong. A corrected question may also have content repairs, but show it in Corrected.
- **Repaired** (`repaired: true`): a scored question's wording, code, choices, or necessary assumptions were repaired while its source answer remains accepted. This includes an `acceptAny` repair that continues to accept the source key. Preserve `source` and `printed`, describe the repair in notes and the notice, and keep the flag explicit in the editable question data.
- **Not scored** (`ungraded: true`): the question remains unresolved and is excluded from accuracy, even if some wording has been repaired.
- Use only one of these states for a question. Do not add Repaired for explanation-only edits, formatting alone, or simply having a source snapshot. Review changes against the actual source before assigning it.

## Review and repair

Review all questions, including previously corrected ones. Treat earlier AI explanations and printed keys as evidence to check, not authority. Verify disputed, niche, and version-sensitive facts with current primary documentation. For Salesforce, use official Help, developer references/release notes, and Trailhead learning content.

### Recover problematic questions online

- For a truncated stem, missing choice, inconsistent selection count, disputed key, or missing source number, search for complete online variants before supplying replacement content. Match the scenario and option text; question numbers and answer letters often differ between banks.
- A bank or discussion can establish what wording was published, but its answer key and votes are not technical authority. Check the answer against primary documentation and explain each choice. If sources disagree, resolve the actual behavior rather than counting matching answer keys.
- When recovering a missing numbered question, compare neighboring questions as well as its number. Keep its stable ID and place it in source order only when that match is credible. Do not fill gaps with unrelated questions. State that the item was absent from the DOCX and added from an external source.
- Distinguish recovered content from a supplied study repair. If no reliable complete version exists, define necessary assumptions or rebuild the question using documented behavior, recording exactly what changed. Do not call an invented assumption recovered wording. Paraphrase externally recovered questions and respect source quotation limits.
- Preserve existing original snapshots and DOCX keys. Record the external recovery URL, its published key when relevant, and the primary references in question notes and the quiz's notice. For externally added items, identify that provenance clearly; a wrong external source key can be marked Corrected, but a still-accepted key cannot.
- Re-enable scoring only when the final stem, choices, selection count, and answer are supportable together. Leave a genuinely unresolved item unscored and report what evidence is still missing. Update counts, distractors, notices, and saved-answer regrading checks after recovery.

Trace code carefully: initialization, branch conditions, iteration count, actual DML, Id assignment, exceptions, rollback, limits, and automation re-entry. State API-version, permissions, caller, transaction, or configuration assumptions when they affect the result. Fix ambiguous prompts or malformed choices where evidence supports a clear repair; otherwise leave the item ungraded.

For each repair:

1. Preserve the original document. Retain an existing `source: { stem, choices, answer }` snapshot internally; do not overwrite it with a later repaired version.
2. Retain the original key in `printed`. Use `corrected: true` **only if the mock's answer key is wrong**. For repaired question content with an accepted source key, use `repaired: true` instead. Explanation-only edits receive neither badge. For `acceptAny`, an already accepted printed answer is not wrong.
   Recheck previous AI corrections too. If a correction depended on an unstated assumption about an alternative implementation or historical API behavior, do not call the original key demonstrably wrong. Withdraw the badge and leave the unresolved question unscored until the missing context is established.
3. Update the playable content, answer, selection count, and explanations consistently. Do not reorder options unnecessarily.
4. Describe the issue and repair in the quiz's `notice.html`, adding primary references where helpful. Keep material caveats in the question's study notes too.
5. Do not add an Earlier wording/source-history disclosure to the player. Learners see the reviewed question; the notice is where they review mock problems. Keep the short original-key versus graded-key message for genuinely incorrect keys.

Preserve storage keys when fixing answers. Saved selections are regraded against the current key. If option meaning changes, mention that in the notice so users can revisit affected selections.

Apply factual fixes consistently to repeated questions, even when their answer letters differ. Keep distinctions such as feature availability versus configuration, notification versus rejected-row export, and character encoding versus file structure explicit; similar-sounding controls are not necessarily interchangeable.

## Write `<quiz-name>/notice.html` for the user

Write a standalone HTML page with `lang="en"`, UTF-8, a viewport meta tag, and a descriptive title. Link `../quiz/css/styles.css` and `../quiz/css/notice.css`, provide a Back to quiz link to `index.html`, and use the existing notices as layout examples. Include a contents navigation with section anchors and put wide tables in keyboard-focusable `.notice-table` regions. Keep all notice content in the HTML file so it opens directly from disk without JavaScript, a server, or a Markdown renderer. Escape literal code and markup.

Use the shared notice layout: a short overview with Corrected, Repaired, and Not scored counts; a native Source document & review scope disclosure; section cards; and links back to the quiz. Keep counts aligned with `questions.js`, distinguishing Repaired badges from broader review-note totals. Preserve existing section IDs and all review findings when changing the presentation. Give table headers `scope="col"` and cells matching `data-label` values so rows remain understandable in the mobile card layout. Review rows have stable IDs and a `data-questions` list for exact question-number search; grouped rows list every relevant ID. Keep hidden accessibility text anchored so it cannot enlarge the page.

Load the optional classic script `../quiz/js/notice.js` with `defer` for local table search, current-section navigation, and printing. All findings and references must still be readable if JavaScript is disabled. Search matches complete question numbers or all words in a phrase, filters only table rows, keeps the input stable, supports Escape to clear and Enter to focus the first matching note, and announces the result count. Other review text remains visible. Printing includes every table row, even when a search is active. Keep all shared notice development under `/quiz`.

Keep notices specific to the mock and understandable without developer context. Include:

- Original DOCX filename, number of questions, and counts of incorrect keys, wording/option/code repairs, and unscored items.
- An answer-correction table covering **all** incorrect mock keys: question number, original key, reviewed key, and reason.
- A separate table for wording, syntax, assumptions, misleading explanations, or option changes. Make clear that unchanged answer keys have no Corrected badge.
- Counts of Repaired questions, distinguished from the broader table that can also contain explanation-only review notes.
- Missing/unreadable images, supplied replacement content, unresolved questions, accepted duplicate options, and version/legacy caveats.
- Relevant official references and practical limits of the review. Do not claim live application execution when only the document/documentation was reviewed.

Do not put mock-specific review logs in `/quiz` or mix a shared UI change history into a mock notice. Update the existing notice when reviewing that quiz again.

## Player behavior and verification

Preserve drafts, resume, skip, missed review, and end-of-set results. Require exactly the requested multi-selection count. Keep native keyboard behavior, focus/scroll position, readable mobile layouts, accessible status labels, and safe reference links. Exclude ungraded questions from accuracy. Clear progress resets results, drafts, and resume together after confirmation. Keep practice usable and explain save failures if browser storage is unavailable.

Keep the question page focused on reading and answering. Distinguish the original question number from position in the current set. Show scored coverage and accuracy separately; unscored-only sets should say they are for review. Give live selection guidance, a clear-selection action before checking, and explicit chosen-versus-correct answer feedback afterward. Equivalent single-choice alternatives must be labeled as alternatives. Never invent a reference answer for an unresolved item. Mark unfinished selections as drafts in the navigator. Next unanswered stays within the current set, skips scored results and unscored items, and wraps without returning to the current question. Preserve drafts and both page and reader scroll when changing selections. Keep results available during practice, mobile action buttons accessible, and keyboard help secondary to the question.

On desktop, size the question layout to the viewport and let the header and progress bar use their actual heights. Long questions and expanded explanations scroll inside the panel, with the answer controls visible. Constrain the navigator to the same available height. Do not estimate the remaining height with a fixed header subtraction or switch to whole-page scrolling just because a desktop window is short. Keep natural document scrolling on narrow mobile layouts.

Constrain the question stem and prompt grid columns with `minmax(0, 1fr)` so long code lines cannot expand the reader. Keep code scrolling within its code block and allow long prompt identifiers to wrap. When revealing feedback on desktop, scroll the reader itself rather than all scrollable ancestors.

The home-page review lists must use the question's current review state, show counts and progress, and support saved resume with the same question IDs and grading rules. Disable a list with no matching questions. Repaired is a source-review label, not a grading result, and does not change the accepted answers.

Keep the home page focused on the learner's next action. Offer priority/topic browsing and a search of question text, topic, or original question number. Search previews must not reveal answer keys or render imported markup. Keep the input and caret stable while updating results; support Enter to open a unique match and Escape to clear the query. Search is local and needs no network access.

Home coverage and accuracy count scored questions only; show unscored reading progress separately. The unanswered-practice shortcut must exclude previously answered and unscored questions. Resume should restore saved selections and advance past a completed question to the next unfinished one. When scored practice is complete, offer missed-question review or revisiting the quiz. Keep study-priority caveats accessible without making them the main action.

Run `node quiz/tools/validate.js` from the project root. Node is optional development tooling; learners still just open HTML. Check counts against the DOCX, complete metadata, schema, answer/distractor consistency, Corrected-label rules, direct-file startup, grading, saved regrading, navigation, and absence of the removed source-history disclosure. When changing UI, also check real browser/mobile/keyboard behavior where available and state any verification limits honestly.
