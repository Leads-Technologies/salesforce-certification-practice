# Salesforce Certification Practice

A self-paced Salesforce quiz collection built with vanilla HTML, CSS, and JavaScript. Open a quiz directly in your browser—no installation, server, or build step is required.

## Start practicing

Download or clone the complete repository, then open a quiz's `index.html`:

- [Platform Developer](salesforce-certified-platform-developer/index.html)
- [Sales Cloud Platform Admin](salesforce-sales-cloud-platform-admin/index.html)
- [Marketing Cloud Engagement Administrator](salesforce-certified-marketing-cloud-engagement-administrator/index.html)

Keep the quiz folders beside the shared `quiz` folder. These links point to local HTML files; after downloading the project, open them from your computer.

The player provides:

- Practice by study priority or topic, plus question-number and keyword search.
- Single-answer and multiple-answer questions with explanations and study notes.
- Saved answers, unfinished selections, and session resume in the same browser on the same device.
- Missed-question review, unanswered practice, and progress summaries.
- Keyboard controls and responsive layouts.

Browser storage must be available to retain progress. Quiz data loads locally; optional Google Fonts use the network, with system fonts as a fallback.

## Understand the review states

Each quiz includes a standalone `notice.html` documenting issues in its source mock, repairs, references, and unresolved questions.

| State | Meaning |
| --- | --- |
| Corrected | The source answer key was wrong, and the quiz uses a reviewed answer. |
| Repaired | Question content was repaired while the source answer remains accepted. |
| Not scored | The question is unresolved and excluded from accuracy. |

These states describe the source review. Correct and Missed describe your practice results. Some review notes only improve explanations and do not receive a Repaired badge.

The quizzes are study aids based on reviewed mock documents. Consult the notices for source limitations, assumptions, and version-sensitive guidance.

## Project structure

```text
quiz/
  css/
    styles.css             Shared quiz styling
    notice.css             Review-page styling
  js/
    app.js                 Quiz player
    notice.js              Optional review-page interactions
  tools/
    validate.js            Quiz and notice checks
    validate-notices.js    Notice checks, also runnable separately
  guideline.md             Instructions for generating and reviewing quizzes
  schema.json              Quiz configuration and question schema
<quiz-name>/
  index.html               Quiz entry point
  quiz.js                  Quiz configuration and study topics
  questions.js             Questions, answers, and explanations
  notice.html              Source review findings
  original-mock.docx        Original source document; filename varies
```

Shared development files belong under `quiz/`. Each quiz folder contains its entry point, editable data, review notice, and original document.

## Edit or add a quiz

Read [quiz/guideline.md](quiz/guideline.md) before generating a quiz from a DOCX mock or changing reviewed content.

Edit a quiz's `quiz.js` and `questions.js` directly. They define `window.QUIZ_CONFIG` and `window.QUIZ_QUESTIONS` using ordinary JavaScript. Keep question IDs, choice order, and existing storage keys stable so saved progress remains compatible. A new quiz needs its own unique storage key.

Use an existing quiz folder as a template. Load classic scripts in this order:

```html
<link rel="stylesheet" href="../quiz/css/styles.css">
<script src="quiz.js"></script>
<script src="questions.js"></script>
<script src="../quiz/js/app.js"></script>
```

Preserve direct-file support: use local relative paths, and avoid modules, fetched JSON, loaders, or asset version suffixes. Keep mock-specific findings in that quiz's `notice.html` and preserve the original DOCX.

## Validate changes

Node.js is optional development tooling; it is not needed to use the quizzes. From the repository root, run:

```sh
node quiz/tools/validate.js
```

The checks cover data structure, answers and selection counts, review-state rules, saved-answer regrading, direct-file script loading, player interactions, notice counts, links, and search behavior. They do not replace visual browser checks or live Salesforce testing.

To check only the notice pages:

```sh
node quiz/tools/validate-notices.js
```
