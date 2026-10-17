# Guidelines for generating a quiz from a DOCX mock

Read this before creating or updating a quiz. Reuse the shared player and follow the user's conventions below.

Read [requirements.md](requirements.md) for shared product requirements and UI/UX design intent, and [README.md](README.md) for code ownership and loading order. Keep these documents aligned when behavior or design intentionally changes.

Follow [architecture.md](architecture.md) for object-oriented JavaScript, composition, design patterns, dependency contracts, and lifecycle ownership. Keep mutable player state inside application instances, not ambient globals.

## Files and launch behavior

```text
quiz/
  README.md
  requirements.md
  architecture.md
  guideline.md
  schema.json
  css/
    styles.css
    base.css
    layout.css
    question.css
    pages.css
    navigation.css
    notice.css
  js/
    app.js
    core/
      model.js
      storage.js
      exam.js
    ui/
      content.js
      screens.js
      events.js
      navigation.js
      notice.js
  tools/
    validate.js
    validate-assets.js
    validate-architecture.js
    validate-notices.js
    validate-shuffle.js
    validate-exam.js
    validate-changes.js
    validate-source-review.js
    lib/player.js
    lib/player-access.js
<quiz-name>/
  index.html
  exam.html
  quiz.js
  questions.js
  notice.html
  original-mock.docx
```

- Put all shared implementation, styling, schemas, optional tools, and AI guidance under `/quiz`. Browser scripts belong in `/quiz/js`, styles in `/quiz/css`, and development checks in `/quiz/tools`. Keep `schema.json` and `guideline.md` at the top of `/quiz`.
- Each quiz folder holds its practice and Mock Exam entry points, editable data, original mock, and user-facing `notice.html`. Put mock-specific findings in that notice, not in `/quiz`.
- Use vanilla HTML/CSS/JavaScript. Opening a quiz's `index.html` directly must start that quiz without a server, installation, build, upload dialog, or quiz picker.
- Use the classic script order documented in [README.md](README.md#loading): quiz data first, shared core and UI scripts next, and `../quiz/js/app.js` last. Copy an existing entry point. Link `../quiz/css/styles.css`. Do not use ES modules, `fetch`, XHR, or a per-quiz loader for local data.
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
- Do not invent missing source content, assumptions, code or distractors in the main mock. A substantially rewritten example may be offered only as a separately identified study variant, excluded from the original mock's scoring and exam pool. Documenting an invented assumption does not make it an original-question repair.
- The current block format supports text, prompts, and code. If a real diagram is essential, extend the shared schema/renderer for images, store assets under `/quiz/media/<quiz-id>/`, and verify local-file display.
- If essential content cannot be recovered, retain the incomplete original, use `ungraded: true` and, for a missing exhibit, `exhibitMissing: true`. State the problem visibly and list it in `notice.html`. Do not supply a replacement exhibit to force a key.
- An ungraded question without a verified answer may use `answer: ""`. Preserve any known source key internally; never fabricate a grading key. Mark it scored only after the uncertainty is resolved.
- Compare unresolved options by text and count against online copies, recording reordered choices, malformed terms, differing variants and failed exhibit retrieval in `review.optionAudit`. A repeated online mistake is not proof that the DOCX omitted material.
- For Not scored questions, keep the original DOCX mock answer as the answer reference. Do not add provisional or suggested answer selections. Keep option-comparison evidence separate from the source answer and excluded from grading.

## Config and study metadata

Use `schema.json` and the existing quizzes as structural examples. Do not copy another certification's percentages or content.

- Config supplies `id`, `title`, `storageKey`, `sections`, `focus`, and `groups`, plus suitable descriptions, legends, and copy. Set `examMinutes` to the certification's verified time limit in whole minutes (1–1440), recording the official guide and verification date. The three existing quizzes use 105 minutes; verify new certifications individually.
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
      "The original source scenario, with only verified small transcription fixes.",
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
- Keep those data letters stable. Regular practice uses the original choice order on start, resume, and Try again. Only Mock Exam shuffles the displayed order, labels positions A/B/C/D, and grades/stores selections by their original choice IDs. Resuming an exam restores its saved permutation. Ignore old shuffled-practice permutations while preserving canonical draft and result IDs. Never rewrite data keys or source snapshots to implement shuffling.
- Prefer explanations and prompts that identify choices by their content instead of relying on letters or positions. The player remaps explicit choice-letter references in question prose, reasoning, and distractor explanations; code and URLs remain literal. Full explanation notes and notices retain original mock letters, with a session letter key shown above the full notes. Avoid order-dependent choices such as “both of the above” unless the wording has been made independent of presentation order.
- Code in stems, explanations, or choices uses `{ "code": ["line 1", "line 2"] }`. Prompts use `{ "ask": "..." }`. Imported markup must display as escaped text, not execute.
- Multiple selection uses `type: "multi"` and a canonical key such as `answer: "A,C"`. Any `choose` value and Choose N prompt must agree. Grade the complete set independently of selection order.
- `acceptAny: true` is only for a single selection among equivalent correct alternatives. Explain the exception clearly; it is not a multi-select question.
- `why` must explain the mechanism behind every selected answer, not just repeat the letters.
- `wrong` must explain every non-answer option. Do not dismiss an otherwise valid approach as impossible merely because it is not the best fit for this scenario.
- Check for overlapping valid choices before imposing a single answer. Accept supported single-choice alternatives with `acceptAny`. Do not add a requirement to disqualify an otherwise valid choice or reject one description just because another is more detailed. If a multi-select source does not establish one supported set, leave it unscored.
- Distinguish required steps from alternative available actions. A Choose 2 question must say whether both actions are necessary, both are independently available, or they are two properties being identified.
- `notes` should add useful detail rather than repeat `why` and the distractors. Duplicate questions still need self-contained explanations.

### Question review states

The home page provides separate Corrected, Repaired, and Not scored review lists. These describe the source review, independently of the learner's Correct/Missed progress.

- **Corrected** (`corrected: true`): the source answer key is demonstrably wrong. A corrected question may also have content repairs, but show it in Corrected.
- **Repaired** (`repaired: true`): a verified small wording/code fix, externally recovered missing content, or expanded accepted single-choice alternatives, while the source answer remains accepted. Preserve `source` and `printed`, describe the exact change in `repair` and the notice, and keep the flag explicit in the editable question data. Necessary new assumptions, replacement scenarios and changed option meanings are not minimal repairs.
- **Not scored** (`ungraded: true`): the question remains unresolved and is excluded from accuracy, even if some wording has been repaired.
- Apply Not scored when a material problem prevents fair grading of the supplied task: essential missing content, no defensible option set, incompatible selection count, or unresolved wording/version/setup ambiguity that changes the answer. Do not withhold scoring for minor wording issues, a correctable printed key, or an irrelevant hypothetical edge case. It is an unresolved review status, not proof that the mock's key is wrong.
- For a best-solution question, compare the supplied choices against the stated requirement. A question need not specify an entire production design to support its best listed answer. Do not introduce an unstated integration or mailbox-deliverability requirement to disqualify a valid server-side validation answer. Keep practical redundancy or implementation caveats in the explanation when they do not change that comparison.
- Reassess old Not scored and Repaired decisions when this standard was applied too literally. Distinguish a capability from a guarantee, a setup location from a complete procedure, general wording from a named platform object, and a related code defect from the specific best practice being tested. A directly applicable known limitation is still material; do not overlook a missing valid option or force a unique multi-answer set when the source actually offers too many valid answers. Record the previous state, individual decision and reason in `review.reassessment`. Summarize the current outcome in the notice only when the question is Corrected, Repaired or Not scored. Content additions still need exact comparisons; explanation-only refinements do not create new repair badges.
- In Not scored feedback, show Original mock answer (unverified), its printed letters and full original option text/code. Preserve this reference separately from the empty graded answer and avoid correct/incorrect styling. Retain original keys while mapping their letters for submitted saved exams. If the source provides no key, state that explicitly. Do not reveal reference answers before feedback.
- Use only one of these states for a question. Do not add Repaired for explanation-only edits, formatting alone, or simply having a source snapshot. Review changes against the actual source before assigning it.

## Review and repair

Review all questions, including previously corrected ones. Treat earlier AI explanations and printed keys as evidence to check, not authority. Verify disputed, niche, and version-sensitive facts with current primary documentation. For Salesforce, use official Help, developer references/release notes, and Trailhead learning content.

### Recover problematic questions online

- For a truncated stem, missing choice, inconsistent selection count, disputed key, or missing source number, search for complete online variants before supplying replacement content. Match the scenario and option text; question numbers and answer letters often differ between banks.
- A bank or discussion can establish what wording was published, but its answer key and votes are not technical authority. Check the answer against primary documentation and explain each choice. If sources disagree, resolve the actual behavior rather than counting matching answer keys.
- When recovering a missing numbered question, compare neighboring questions as well as its number. Keep its stable ID and place it in source order only when that match is credible. Do not fill gaps with unrelated questions. State that the item was absent from the DOCX and added from an external source.
- Distinguish verified recovery from a new study example. If no reliable complete version exists, preserve the original as Not scored. Never rebuild its scenario or replace an answer's meaning to retain a preferred letter. Paraphrase externally recovered questions and respect source quotation limits; identify any added external item explicitly.
- Preserve existing original snapshots and DOCX keys. Record the external recovery URL, its published key when relevant, and the primary references in question notes. Keep the notice to a concise description of the current issue. For externally added items, identify that provenance clearly; a wrong external source key can be marked Corrected, but a still-accepted key cannot.
- Re-enable scoring only when the final stem, choices, selection count, and answer are supportable together. Leave a genuinely unresolved item unscored and report what evidence is still missing. Update counts, distractors, notices, and saved-answer regrading checks after recovery.
- Record each search in `review.recovery`: date, queries, candidate URLs, resolved/partial/unresolved status and an individual assessment. Candidate URLs establish comparison provenance, not technical correctness. Partial recoveries can update the displayed missing text while retaining the DOCX snapshot; provide `repair` and `repairNotes` so Question changes shows the exact additions and explicitly labels the source key unverified. Keep these items Not scored without a Repaired badge. A verified resolved recovery uses treatment `online-recovery`.

Trace code carefully: initialization, branch conditions, iteration count, actual DML, Id assignment, exceptions, rollback, limits, and automation re-entry. Explain API-version, permissions, caller, transaction or configuration dependencies without silently adding them to the source. Fix only verified small transcription errors. Leave a materially ambiguous or incomplete item ungraded.

For each repair:

1. Preserve the original document. Retain `source: { stem, choices, answer }` as a source transcription, not a later rewrite. If an earlier snapshot itself contains reconstructed content or appended commentary, correct it against the actual DOCX and explicitly document that provenance correction in the review history.
2. Retain the original key in `printed`. Use `corrected: true` **only if the mock's answer key is wrong**. For repaired question content with an accepted source key, use `repaired: true` instead. Explanation-only edits receive neither badge. For `acceptAny`, an already accepted printed answer is not wrong.
   Recheck previous AI corrections too. If a correction depended on an unstated assumption about an alternative implementation or historical API behavior, do not call the original key demonstrably wrong. Withdraw the badge and leave the unresolved question unscored until the missing context is established.
3. Update the playable content, answer, selection count, and explanations consistently. Do not reorder options unnecessarily.
4. Describe the issue and repair in the quiz's `notice.html`, adding primary references where helpful. Keep technical caveats in the question's study notes; put source-edit history and recovery references in `repair` and optional `repairNotes` instead.
5. For Repaired questions, provide a `repair` summary explaining the actual changes and reasons, consistent with the notice. Use one Question changes disclosure, collapsed by default like Full explanation, without nested disclosures. Lead with Reason for the change, followed by a compact Changed / Unchanged / Answer key summary and exact Original/Current comparisons of changed question wording/code and choices. Keep the removal/addition highlights without a Removed text / Added text legend or a redundant Text changes heading. An unchanged answer letter can still refer to repaired choice text: make that visible. End with a separate Review notes & sources footer only when `repairNotes` exist. Do not duplicate the entire original question after the comparisons; retain the full source snapshot in data. Remove duplicated repair reasons from Full explanation while retaining technical study guidance there. Keep original wording, code, and letters literal, including during submitted exam review; never substitute the repaired content or shuffle the reference. Show an exam letter key for repair-summary references. Keep the short original-key versus graded-key message for genuinely incorrect keys.

Preserve storage keys when fixing answers. Saved selections are regraded against the current key. If option meaning changes, mention that in the notice so users can revisit affected selections.

For a complete bank review, record `review: { date, treatment, reason, references }` on every question, including retained items. Use the schema's treatment values and publish only concise current summaries of Corrected, Repaired and Not scored questions in that quiz's `notice.html`. Update this file directly; do not create dated notice copies or link to superseded reports. Reconcile withdrawn conclusions into the current decisions. Keep notice headings and review labels free of date suffixes. Do not call the review a live Salesforce test.

When a previously scored question becomes Not scored, preserve saved exam IDs, selections, ordering and timing. Exclude the retired item from the current score and explain that adjustment on setup/results. An old attempt containing only retired items has no score. New exams must still sample only scored questions.

Apply factual fixes consistently to repeated questions, even when their answer letters differ. Keep distinctions such as feature availability versus configuration, notification versus rejected-row export, and character encoding versus file structure explicit; similar-sounding controls are not necessarily interchangeable.

## Write `<quiz-name>/notice.html` for the user

Use `class="wrap notice-shell"` on the review page container so its outer edges match every quiz screen. Load `../quiz/js/ui/navigation.js` before the optional notice script.

Write a standalone HTML page with `lang="en"`, UTF-8, a viewport meta tag, and a descriptive title. Link `../quiz/css/styles.css` and `../quiz/css/notice.css`, provide a Back to quiz link to `index.html`, and use the existing notices as layout examples. Use the three category count cards as section links and put wide tables in keyboard-focusable `.notice-table` regions. Keep all notice content in the HTML file so it opens directly from disk without JavaScript, a server, or a Markdown renderer. Escape literal code and markup.

Use the shared notice layout: a short overview with Corrected, Repaired, and Not scored counts; a native Original mock disclosure; section cards; and links back to the quiz. Keep counts aligned with `questions.js`. Preserve the three category anchors and retain detailed findings in question data and feedback. Give table headers `scope="col"` and cells matching `data-label` values so rows remain understandable in the mobile card layout. Each affected question appears once, with a stable row ID and `data-questions` for exact question-number search. Keep hidden accessibility text anchored so it cannot enlarge the page.

Load the optional classic script `../quiz/js/ui/notice.js` with `defer` for local table search, current-section navigation, and printing. All concise review notes must still be readable if JavaScript is disabled. Search matches complete question numbers or all words in a phrase, filters only table rows, keeps the input stable, supports Escape to clear and Enter to focus the first matching note, and announces the result count. Other review text remains visible. Printing includes every table row, even when a search is active. Keep all shared notice development under `/quiz`.

Keep notices specific to the mock and understandable without developer context. Include:

- Original DOCX filename, number of questions, and counts of incorrect keys, wording/option/code repairs, and unscored items.
- An answer-correction table covering **all** incorrect mock keys: question number, original key, reviewed key, and reason.
- A Repaired table with one short description of what changed per question.
- A Not scored table with the original DOCX answer clearly marked unverified and the unresolved issue.
- Keep exact comparisons, technical caveats, sources and recovery details on question pages. Omit unchanged questions, repeated history tables and long reference lists from notices. Do not claim live application execution when only the document/documentation was reviewed.

Do not put mock-specific review logs in `/quiz` or mix a shared UI change history into a mock notice. Update the existing notice when reviewing that quiz again.

## Player behavior and verification

Preserve drafts, resume, skip, missed review, and end-of-set results. Require exactly the requested multi-selection count. Keep native keyboard behavior, focus/scroll position, readable mobile layouts, accessible status labels, and safe reference links. Exclude ungraded questions from accuracy. Reset practice progress resets results, drafts, and resume together after confirmation. Keep practice usable and explain save failures if browser storage is unavailable.

Verify shuffling with single, multiple, equivalent-answer, and unscored questions. Keyboard letters must select the displayed choice, and answer recaps, highlighted answers, and distractor labels must use the same display mapping. Selecting, checking, navigating, and resuming must not reshuffle an active session. Old saved results and drafts must retain their meaning, and invalid saved permutations must be regenerated without discarding valid progress. Keep all shuffle checks in the shared development tools.

Mock Exam has its own standalone `<quiz-name>/exam.html` page. Use the same classic script order and stylesheet as `index.html`, with `<body data-quiz-page="exam">` to select the exam setup screen. The practice home links to this page but contains no exam setup or resume controls. Keep the name **Mock Exam** consistent. Regular practice must not randomly sample questions or shuffle choices.

On the exam page, offer a configurable count defaulting to 60 (or the available scored pool if smaller). Sample scored question IDs uniformly without replacement, randomize their order, and shuffle their choices. Display exam positions **1–N** in the question heading, navigator text and accessibility labels, numeric jump field, and pre/post-submission review rows. Jumping to K opens the Kth sampled question; never interpret it as a source ID. Keep original IDs internally for storage and grading. Verify any official time limit using the certification’s current guide; do not infer timing, pass thresholds, or topic quotas from this count. Save the latest attempt under `<storageKey>:exam`, separately from regular practice results and session data. Preserve its exact sampled IDs, order, current position, canonical selections, and choice permutations across reloads. The exam page must not write practice session data, including when opening an attempt from a stale tab. Show neutral selection progress before submission; never reuse practice grades or expose exam correctness early. Review & finish is a pre-submission checkpoint. Submission locks the attempt, reveals explanations, and scores against the entire sample, with skipped questions earning no points and partial selections graded incorrect. Save & exit returns to exam setup; Back to practice links to `index.html`. Clearly state that starting a new exam replaces the latest attempt. Clear saved attempt clears only the exam; Reset practice progress clears only regular practice. Validate separate direct-file entry points, numbering, sampling, bounds, resume, isolation, grading, and locked-result behavior with the shared exam checks.

Mock Exam also offers a time limit in whole minutes (1–1440), defaulting to `examMinutes`; custom question counts do not silently scale the limit. Save the duration, start time, absolute deadline, submission time, and timeout status with the attempt. Derive the countdown from the deadline instead of decrementing a counter, so background throttling, Save & exit, reloading, and closing the page cannot reset or pause it. Keep the timer visible on question, pre-submission review, and saved-attempt setup screens. Update only its DOM nodes each second, preserving focus, drafts, and scroll position; announce warnings at five minutes and one minute without reading every second aloud. At expiry, submit saved selections, lock editing, retain incomplete/skipped grading rules, and explain automatic submission and time used in results. Check the deadline before accepting an answer or manual submission, and when the tab becomes visible/focused again. An overdue attempt reopened from disk must submit before edits are possible. Preserve older untimed attempts, starting one full default timer on their first resume; keep submitted historical results available without inventing elapsed time. Stop intervals after submission/reset and avoid duplicate timers. Test all of these paths with a fake clock in the shared exam checks.

Keep the question page focused on reading and answering. Distinguish the original question number from position in the current set. Show scored coverage and accuracy separately; unscored-only sets should say they are for review. Give live selection guidance, a clear-selection action before checking, and explicit chosen-versus-correct answer feedback afterward. Equivalent single-choice alternatives must be labeled as alternatives. Never invent a reference answer for an unresolved item. Mark unfinished selections as drafts in the navigator. Next unanswered stays within the current set, skips scored results and unscored items, and wraps without returning to the current question. Preserve drafts and both page and reader scroll when changing selections. Keep results available during practice, mobile action buttons accessible, and keyboard help secondary to the question.

On desktop, size the question layout to the viewport and let the header and progress bar use their actual heights. Long questions and expanded explanations scroll inside the panel, with the answer controls visible. Constrain the navigator to the same available height. Do not estimate the remaining height with a fixed header subtraction or switch to whole-page scrolling just because a desktop window is short. Keep natural document scrolling on narrow mobile layouts.

Constrain the question stem and prompt grid columns with `minmax(0, 1fr)` so long code lines cannot expand the reader. Keep code scrolling within its code block and allow long prompt identifiers to wrap. When revealing feedback on desktop, scroll the reader itself rather than all scrollable ancestors.

The home-page review lists must use the question's current review state, show counts and progress, and support saved resume with the same question IDs and grading rules. Disable a list with no matching questions. Repaired is a source-review label, not a grading result, and does not change the accepted answers.

Keep the home page focused on the learner's next action. Offer priority/topic browsing and a search of question text, topic, or original question number. Switching By priority/By topic must update only the catalog, toggle states, hint, and search state. Do not rebuild the dashboard or replay its entrance animation; preserve open disclosures, keyboard focus, and page scroll. Clicking the active browse mode is a no-op. Search previews must not reveal answer keys or render imported markup. Keep the input and caret stable while updating results; support Enter to open a unique match and Escape to clear the query. Search is local and needs no network access.

Home coverage and accuracy count scored questions only. Put unscored reading progress below the description in Mock review’s Not scored card as “X of Y reviewed”, including zero before the first review. Do not duplicate it in Your progress or append a second Not started/complete status to that card. Put one Reset practice progress button at the bottom of Your progress after the metrics and review shortcuts, separated by a subtle divider. Do not add a disclosure, separate reset section, or instructions beside the button. Keep the existing confirmation and disable the button when no answers, drafts, or resume point are saved; explain reset scope in the confirmation and shared help. Consolidate the study guide and quiz-specific caveats in the footer’s How to use dialog; do not duplicate them inside the question browser. Reserve the page header for quiz identity and Mock Exam navigation. The unanswered-practice shortcut must exclude previously answered and unscored questions. Resume should restore saved selections and advance past a completed question to the next unfinished one. When scored practice is complete, offer missed-question review or revisiting the quiz. Keep study-priority caveats accessible without making them the main action.

Run `node quiz/tools/validate.js` from the project root. Node is optional development tooling; learners still just open HTML. Check counts against the DOCX, complete metadata, schema, answer/distractor consistency, Corrected-label rules, direct-file startup, grading, saved regrading, navigation, and original-question references for Repaired feedback.

## Required UI/UX review for every UI change

Keep all screens on the shared `.wrap` container. Change outer widths and responsive gutters only in `css/layout.css`; do not add page-specific width overrides. Reserve scrollbar space on the root so pages with and without document scrolling stay aligned. Inner reading columns can remain narrower.

Whenever changing an existing interface or adding a new one, review it for UI bugs and improve the affected experience before finishing. This is a standing user requirement; do not wait for a separate testing request.

- Walk through the affected journey and connected screens: practice home, question, explanation, results, Mock Exam setup/submission/resume, and mock review notices as applicable. Check labels, primary actions, navigation, saved state, empty states, invalid input, and recovery from errors. Keep exam answers hidden until submission.
- Review desktop, narrow mobile, short windows, and enlarged text/zoom. Use long certification names, long questions/code, expanded Full explanation notes, and large navigators. Check wrapping, clipping, accidental page scrollbars, panel scrolling, sticky controls, and hidden accessibility text. Keep the question reader's desktop scrolling behavior intact.
- Check keyboard-only use, visible focus, focus after navigation, native Enter/Space behavior, accessible names/statuses, readable contrast, and usable touch targets. Preserve the input/caret and scroll position when updating selections or live search.
- Use the shared `nav-control` class with `ghost` for secondary page navigation and toolbar disclosures, or `primary` for a primary return action. Apply it consistently to Mock Exam, Reset practice progress, Back to practice/quiz, Home, Save & exit, Exam setup, and notice toolbar controls. Keep the shared 44px minimum height, typography, spacing, and corner style across pages and screen widths; allow the surrounding toolbar to wrap instead of shrinking individual controls. Do not add page-specific sizing overrides for these controls.
- Use `ghost nav-control danger` for Clear saved attempt and Reset practice progress. Keep the saved-attempt actions together in a wrapping row, with matching control sizes and a clear destructive-action color. Preserve the existing confirmation and separate exam/practice reset behavior.
- Open the affected HTML entry points directly in a real browser where available, exercise the controls, and inspect the rendered layout at desktop and mobile widths. Fix issues found and recheck the affected path. Automated logic checks do not establish visual correctness.
- Run the relevant shared checks, including `node quiz/tools/validate.js` when player behavior changes. In the completion report, briefly state what was fixed and verified. If browser access is unavailable, report that limit explicitly and distinguish code/logic review from visual testing.
