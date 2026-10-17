# Maintaining the shared quiz player

The browser app uses only vanilla JavaScript and CSS. There are no runtime packages, compilation steps, ES module imports, or data requests. Keep each quiz folder beside this folder so it can also open directly from disk.

Read [requirements.md](requirements.md) for functional and non-functional requirements, user journeys, scoring/storage contracts, and UI/UX design rationale. This README explains implementation ownership and maintenance; [guideline.md](guideline.md) covers content authoring and review.

Read [architecture.md](architecture.md) for the JavaScript objects, patterns, dependency contracts, and design principles. Keep runtime classes composed and instance-owned; do not restore free mutable player globals.

## Where changes belong

| Area | File |
| --- | --- |
| App state, practice actions, events, startup | `js/app.js` |
| Question normalization, grading, choice ordering | `js/core/model.js` |
| Saved answers, drafts, resume points, exam persistence | `js/core/storage.js` |
| Exam lifecycle and absolute-deadline countdown | `js/core/exam.js` |
| Escaping, question content, answer explanations | `js/ui/content.js` |
| Home, questions, results, exam screen markup | `js/ui/screens.js` |
| DOM events, action commands, listener lifecycle | `js/ui/events.js` |
| Header, footer, mobile navigation, help | `js/ui/navigation.js` |
| Review-note search, contents, printing | `js/ui/notice.js` |
| Shared outer width and responsive gutters | `css/layout.css` |
| Reusable foundations and components | `css/base.css` |
| Reader, dashboard, and site chrome refinements | `css/question.css`, `css/pages.css`, `css/navigation.css` |
| Review-note layout and print rules | `css/notice.css` |
| Automated checks and reusable browser fixture | `tools/`, `tools/lib/player.js` |

Quiz content and certification-specific settings stay in each quiz's `quiz.js`, `questions.js`, and `notice.html`. Keep source documents there too. See [guideline.md](guideline.md) for content-review conventions and required UI checks.

Full-bank reviews record a dated `review` decision on every question and publish a concise summary of affected questions in the quiz's notice. Preserve original scenario/option meanings; new assumptions belong only in a separately identified, unscored study variant. Verified fixes, externally recovered missing content and accepted single-choice alternatives use Repaired. Online searches record `review.recovery` queries, candidate URLs, outcome and assessment. Partial recoveries show exact changes but remain Not scored, with no accepted key. Retired questions stay in existing saved exam samples, with selections and deadlines preserved, but do not contribute to the current score; new exam samples exclude them.

Fair-grading reassessments use `review.reassessment` to record the previous review state, decision and individual reason. Each current `notice.html` summarizes current Corrected, Repaired and Not scored outcomes without repeating reassessment history. Keep best-answer interpretation tied to the supplied choices and put implementation caveats in the explanation. Preserve the original answer as an unverified reference whenever a question remains Not scored.

`review.optionAudit` records the compared option count, matching/different/incomplete outcome, assessment and comparison URLs. Feedback reveals the option review after the review action, alongside the original unverified DOCX mock answer. Saved exam feedback identifies original letters in source comparisons. `tools/validate-option-review.js` checks unresolved-question notice coverage and ensures no added answer suggestions appear.

## Loading

Practice and exam HTML use ordinary scripts in this order, without `async` or `type="module"`:

```html
<link rel="stylesheet" href="../quiz/css/styles.css">
<script src="quiz.js"></script>
<script src="questions.js"></script>
<script src="../quiz/js/core/model.js"></script>
<script src="../quiz/js/core/storage.js"></script>
<script src="../quiz/js/core/exam.js"></script>
<script src="../quiz/js/ui/content.js"></script>
<script src="../quiz/js/ui/navigation.js"></script>
<script src="../quiz/js/ui/screens.js"></script>
<script src="../quiz/js/ui/events.js"></script>
<script src="../quiz/js/app.js"></script>
```

Classic scripts register classes in `window.QuizModules`; file closures keep helpers private. `app.js` is the composition root and starts a `QuizApplication` instance. `QuizDomController` owns global events, and `ExamController` owns its timer. Keep model helpers free of DOM/storage access, persistent writes in `ProgressRepository`, and practice actions in the application controller. `window.Quiz.start(config, questions)` remains the startup facade; `window.QuizNavigation` is a `SiteNavigation` instance.

Review pages load only `js/ui/navigation.js` and `js/ui/notice.js`, in that order with `defer`. Their findings remain readable without JavaScript.

`css/styles.css` is the public CSS entry point. Its local imports retain the cascade order: base, layout, question, pages, navigation. Review pages then add `notice.css`. Keep these relative paths plain so both local files and HTTP work.

## Layout contract

Use `.wrap` for every outer page container, including `.wrap.notice-shell` on review pages. `layout.css` is the only place that sets the screen width: 1180px maximum, with 24px side gutters on desktop and 12px on narrow screens. Root scrollbar space stays reserved to prevent horizontal movement between document-scrolling pages and the desktop question reader. Narrower inner text columns and result cards are intentional; the header, footer, and outer container still align.

Change this shared rule when adjusting the app width. Do not reintroduce individual widths on `.home-shell`, `.question-shell`, `.exam-page-shell`, or `.notice-shell`. Preserve the desktop reader's flex sizing and internal scrolling, and natural mobile document scrolling.

## Saved-progress contract

Keep quiz IDs, question IDs, choice IDs/order, and existing storage keys stable. Practice answers use `<storageKey>`, drafts and resume use `<storageKey>:session`, and mock exams use `<storageKey>:exam`. Refactoring must preserve these formats and separation. Never test by clearing or overwriting someone's browser progress.

## Verification

From the repository root:

```sh
node quiz/tools/validate.js
git diff --check
```

Node is optional development tooling and uses only built-in modules. The suite checks local asset paths, startup for all entry points, grading, drafts/resume, independent progress, shuffled choices, deadline behavior, notices, and keyboard handling. `tools/validate-changes.js` verifies exact original/current content, edit highlights, unchanged keys, expanded alternatives, code, and safe escaping for every Repaired question. Its browser fixture uses an in-memory storage map.

For visual changes, also inspect home, question, results, exam, and review pages in a real browser. Compare outer edges at desktop and mobile widths; include short windows, long titles/code, help dialogs, and enlarged text. Tests do not replace rendered UI review.
