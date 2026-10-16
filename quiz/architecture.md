# JavaScript architecture and design principles

The runtime uses vanilla JavaScript classes and composition. Classic scripts register constructors in `window.QuizModules`; file closures keep helpers private. `window.Quiz.start(config, questions)` remains the startup facade and owns one application per page. Classes can also be instantiated independently with different dependencies.

See [requirements.md](requirements.md) for product/UI behavior and [README.md](README.md) for loading and file conventions.

## Objects and responsibilities

| Object | Responsibility | File |
| --- | --- | --- |
| `QuizApplication` | Own session state, coordinate practice actions, compose collaborators, preserve rendering focus/scroll. | [js/app.js](js/app.js) |
| `QuestionBank` | Normalize/validate data and own ordered questions/canonical ID index. | [js/core/model.js](js/core/model.js) |
| `AnswerGrader` | Select and invoke an injected grading strategy. | [js/core/model.js](js/core/model.js) |
| `UnscoredGrading`, `EquivalentAnswerGrading`, `ExactAnswerGrading` | Implement the unscored, equivalent-single-answer, and exact-set grading rules. | [js/core/model.js](js/core/model.js) |
| `ChoiceOrder` | Validate permutations and shuffle copies using injected randomness. | [js/core/model.js](js/core/model.js) |
| `ProgressRepository` | Validate/read/write compatible records, regrade through the grading port, and report failures; no DOM dependency. | [js/core/storage.js](js/core/storage.js) |
| `ExamController` | Coordinate attempt lifecycle/practice isolation; own timer handle and injected clock/scheduler. | [js/core/exam.js](js/core/exam.js) |
| `ContentRenderer` | Escape/format question, choice, and explanation markup with consistent display letters. | [js/ui/content.js](js/ui/content.js) |
| `ScreenRenderer` | Build screen markup and select views through an explicit registry; no persistence writes. | [js/ui/screens.js](js/ui/screens.js) |
| `QuizDomController` | Dispatch DOM action commands, bind controls, and own global listener registration/teardown. | [js/ui/events.js](js/ui/events.js) |
| `SiteNavigation` | Own menu state, shared header/footer, and help interactions. | [js/ui/navigation.js](js/ui/navigation.js) |
| `NoticeController` | Own review search, contents highlighting, print state, listeners, and scheduled frames. | [js/ui/notice.js](js/ui/notice.js) |

Exam/presentation collaborators receive the application's explicit context. Model and repository objects remain independent of rendering. Pure normalization/escaping helpers may remain private functions: OOP does not require a class for every utility.

## Patterns and principles

| Pattern | Use and purpose |
| --- | --- |
| Composition root | `QuizApplication` constructs collaborators or accepts ports/policies; dependency wiring has a clear owner. |
| Repository | `ProgressRepository` centralizes storage keys, serialization, validation, and failure handling. |
| Strategy | `AnswerGrader` delegates to ordered `matches`/`grade` objects; `ChoiceOrder` accepts a random policy. |
| Command dispatch | `QuizDomController.actions` maps action names to functions, replacing the long action conditional chain. |
| View registry | `ScreenRenderer.render(view)` selects a known renderer and reports unknown views clearly. |
| Facade | `window.Quiz` preserves simple startup and visible error handling. |
| Lifecycle ownership | Controllers mount once and release owned global listeners/timers; notices cancel pending frames. |

- **Single responsibility:** keep model rules, saving, exam lifecycle, markup, and DOM bindings in their respective objects.
- **Encapsulation:** state/backing data, strategy storage, timer handles, and lifecycle flags belong to instances. No production free `state`, `questions`, or grading/helper globals are exposed.
- **Composition over inheritance:** use collaborating objects and small callable contracts. There is no required superclass or inheritance hierarchy.
- **Open/closed rules:** extend grading by supplying a strategy, without inserting question-type checks throughout storage and UI code.
- **Substitutability:** replacement strategies/ports honor the same arguments, return values, and side effects. Grading returns `correct`, `wrong`, or `ungraded` and must not mutate questions or save progress.
- **Small interfaces/dependency inversion:** storage, time, scheduling, and grading use small duck-typed ports instead of hard-coded browser dependencies in domain/persistence logic.
- **DRY:** share business rules, choice mapping, save formats, and UI components. New quizzes supply data rather than copy the player.
- **KISS/YAGNI:** add abstractions for real responsibilities/variation. Do not add abstract base classes, factories, event buses, or plugin frameworks merely to demonstrate patterns.

The command/view registries are ordinary maps. Add an explicit entry when adding an approved action or screen.

## Dependency contracts

| Port/policy | Contract |
| --- | --- |
| Storage | `getItem(key)`, `setItem(key, serializedValue)`, `removeItem(key)`. Writes may throw; repository catches failures and invokes `onError`. The default adapter accesses storage lazily so blocked storage does not prevent startup. |
| Clock | `now()` returns epoch milliseconds; default delegates to `Date.now()`. |
| Scheduler | `setInterval(callback, milliseconds)` returns a handle; `clearInterval(handle)` releases it. |
| Random source | Function returning `[0, 1)`; ordering copies rather than mutates input. |
| Grader | `grade(question, canonicalPickedIds)` returns a normal grade status. |
| Strategy | `matches(question)` and `grade(question, picks)`; first matching rule wins. Default order: unscored, equivalent, exact. |
| Repository factory | `(bank, onError) => repository` with the same load/save/clear methods as `ProgressRepository`; preserve keys/formats. |
| Navigation | Optional `header(active, title)`, `footer(storageIssue, helpContext)`, `bind()` object. The optional help context contains `hasPriorities` and escaped-on-render `groupsNote` for this quiz’s guide. `null` omits navigation in isolated tests. |

```js
const app = new window.QuizModules.QuizApplication({
  document: testDocument,
  window: testWindow,
  storage: memoryStorage,
  clock: { now: () => simulatedTime },
  scheduler: fakeScheduler,
  random: () => 0,
  navigation: null,
});
app.initialize(testConfig, testQuestions);
// Exercise the same actions/deadlines as the browser application.
app.dispose();
```

`initialize` replaces that instance's bank/session and stops its previous timer. Event mounting is idempotent. `dispose` stops the timer and removes global event handlers. Create another application with its own ports for an independent instance; do not place shared session state on the registration namespace.

## Verification and maintenance

Preserve IDs, canonical choice order/meaning, storage keys/formats, direct-file loading, and UI behavior during structural changes. Keep the product design and [saved-progress contract](requirements.md#6-architecture-and-data-contracts) intact.

Run `node quiz/tools/validate.js`. [tools/validate-architecture.js](tools/validate-architecture.js) checks replaceable grading, injected ports, two independent applications in one JavaScript realm, compatible keys, and listener/timer cleanup. Existing regression assertions use [tools/lib/player-access.js](tools/lib/player-access.js), a test-only adapter for their original vocabulary; those aliases do not ship in the runtime. The fixture verifies the absence of production state/helper globals before installing the adapter.

Update architecture, requirements, loading examples, and focused behavior/contract checks alongside intentional changes. An OOP refactor must not quietly alter grading, timing, saving, navigation, or presentation.
