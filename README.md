# Salesforce Certification Practice

A self-paced Salesforce quiz collection built with vanilla HTML, CSS, and JavaScript. Open a quiz directly in your browser—no installation, server, or build step is required.

## Start practicing

Download or clone the complete repository, then open a quiz's `index.html`:

- [Platform Developer](salesforce-certified-platform-developer/index.html)
- [Sales Cloud Platform Admin](salesforce-sales-cloud-platform-admin/index.html)
- [Marketing Cloud Engagement Administrator](salesforce-certified-marketing-cloud-engagement-administrator/index.html)

Keep the quiz folders beside the shared `quiz` folder. These links point to local HTML files; after downloading the project, open them from your computer.

The player provides:

- Each quiz has its own title, Practice / Mock Exam / Review Notes navigation, and a mobile menu.
- Question navigator filters for answered, unanswered, and missed questions, plus in-page help and keyboard shortcuts.
- Practice by study priority or topic, plus question-number and keyword search.
- Single-answer and multiple-answer questions with explanations and study notes.
- Original choice order in regular practice, with randomized questions and choices only in Mock Exam.
- Saved answers, unfinished selections, and session resume in the same browser on the same device.
- Missed-question review, unanswered practice, and progress summaries.
- Timed random mock exams, with 60 questions by default, configurable duration, and results after submission.
- Keyboard controls and responsive layouts.

Browser storage must be available to retain progress. Quiz data loads locally; optional Google Fonts use the network, with system fonts as a fallback.

Regular practice keeps the original question numbers and answer-choice order, including when you resume or choose Try again. Study-priority sets retain their teaching order. Mock Exam is a separate page that randomly samples questions and shuffles their choices; the sample and choice order stay stable when you revisit or resume that exam. Exam feedback uses the displayed letters. Full explanation notes and mock notices retain the original mock letters; exam explanations include a letter key for the current attempt.

## Take a mock exam

Follow the **Mock Exam** link on the practice home page, or open that quiz's `exam.html` directly. The exam setup is separate from the practice dashboard. Keep the default of **60 questions**, or choose any whole number from 1 to the available scored-question count. Each attempt samples without replacement and shuffles both questions and answer choices. Not scored questions are excluded.

Choose a **time limit in minutes** before starting (1–1440). All three current quizzes default to **105 minutes**, verified on 16 October 2026 against Salesforce's [Platform Developer](https://help.salesforce.com/s/articleView?id=005298965&language=en_US&type=1), [Platform Administrator](https://help.salesforce.com/s/articleView?id=005298966&language=en_US&type=1), and [Marketing Cloud Engagement Administrator](https://help.salesforce.com/s/articleView?id=005298952&language=en_US&type=1) exam guides. Each quiz's `examMinutes` setting controls its default; changing the question count does not automatically change the time limit.

The countdown stays visible while answering and reviewing selections, with warnings in the final five minutes and final minute. It starts immediately and continues after **Save & exit**, reloading, switching tabs, or closing the browser. Resuming restores the same deadline. At zero the attempt submits automatically; if the page was closed, opening it after the deadline submits the saved answers before allowing further edits. Results show time used and whether the timer submitted the attempt. Existing untimed attempts receive a full default timer the first time they are resumed; their selections and order are preserved. Regular practice stays untimed.

Exam questions are numbered **1–N** in headings, the navigator, the jump field, and the results review. Original bank IDs are kept internally for reliable saving and grading.

Selections save automatically. You can skip questions, revisit selections, use **Save & exit**, and resume the same attempt from the exam setup page later. **Review & finish** shows which questions are answered, incomplete, or skipped. **Submit exam** locks the attempt, reveals answers and explanations, and shows the score. Skipped questions earn no points, and incomplete multi-selections are incorrect.

Exam results, drafts, question order, and choice order are saved separately from regular practice progress. Only the latest exam attempt is kept; starting a new exam replaces it. **Clear saved attempt** on the exam page clears only that attempt. **Clear progress** on the practice home clears only regular practice.

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
    styles.css             Public stylesheet entry point
    layout.css             Shared page width, gutters, and scrollbar space
    base.css               Foundations and reusable components
    question.css           Question-reader layout
    pages.css              Home, exam setup, and results styling
    navigation.css         Header, footer, and help styling
    notice.css             Review-page styling
  js/
    app.js                 State, practice actions, events, and startup
    core/
      model.js             Normalization, grading, and choice ordering
      storage.js           Saved practice, sessions, and exams
      exam.js              Exam lifecycle and countdown
    ui/
      content.js           Escaped question and explanation markup
      screens.js           Home, question, exam, and results markup
      events.js            DOM commands, bindings, and listener lifecycle
      navigation.js        Header, footer, and help
      notice.js            Optional review-page interactions
  tools/
    validate.js            Full regression suite
    validate-assets.js     Local script and stylesheet dependency checks
    validate-architecture.js Object isolation, injected policies/ports, and cleanup
    validate-notices.js    Notice checks, also runnable separately
    validate-shuffle.js    Answer-shuffling checks
    validate-exam.js       Mock-exam and countdown checks
    lib/player.js          Reusable in-memory browser fixture
    lib/player-access.js   Test-only adapter for legacy assertions
  README.md                Shared-code maintenance guide
  requirements.md          Functional/non-functional requirements and UI/UX design
  architecture.md          OOP objects, patterns, principles, and dependency contracts
  guideline.md             Instructions for generating and reviewing quizzes
  schema.json              Quiz configuration and question schema
<quiz-name>/
  index.html               Quiz entry point
  exam.html                Standalone Mock Exam entry point
  quiz.js                  Quiz configuration and study topics
  questions.js             Questions, answers, and explanations
  notice.html              Source review findings
  original-mock.docx        Original source document; filename varies
```

See [quiz/requirements.md](quiz/requirements.md) for product requirements and UI/UX design, and [quiz/README.md](quiz/README.md) for the dependency order, layout rules, and maintenance workflow. Shared development files belong under `quiz/`. Each quiz folder contains its entry point, editable data, review notice, and original document.

## Edit or add a quiz

Read [quiz/guideline.md](quiz/guideline.md) before generating a quiz from a DOCX mock or changing reviewed content.

Edit a quiz's `quiz.js` and `questions.js` directly. They define `window.QUIZ_CONFIG` and `window.QUIZ_QUESTIONS` using ordinary JavaScript. Keep question IDs, choice order, and existing storage keys stable so saved progress remains compatible. A new quiz needs its own unique storage key.

Load `quiz/js/ui/navigation.js` on practice, exam, and review-note pages. Each quiz stays independent: the header uses its configuration title (or its review page's overview kicker), and navigation links stay inside that quiz folder. No shared quiz registry is needed.

Use an existing quiz folder as a template. Load classic scripts in this order:

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
