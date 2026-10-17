window.QUIZ_QUESTIONS = [
  {
    "id": 1,
    "section": "automation",
    "focus": "high",
    "group": "flows",
    "stem": [
      "Universal Containers wants Opportunities to no longer be editable when reaching the Closed/Won stage.",
      {
        "ask": "How should a developer accomplish this?"
      }
    ],
    "choices": [
      "Use a validation rule.",
      "Make fields as read-only on the page layout.",
      "Use the Process Automation settings.",
      "Use Flow Builder."
    ],
    "answer": "A",
    "why": "A validation rule can reject an update when the Opportunity was already Closed Won, regardless of whether the update comes from the UI, Apex, or an API.",
    "wrong": {
      "B": "A page layout blocks edits on that layout only. Other layouts and the API can still change the Closed Won record.",
      "C": "Process Automation settings do not stop a user from editing a stage.",
      "D": "Flow can enforce validation with Custom Error, but requires more configuration than this simple validation formula."
    },
    "notes": [
      "To allow the initial close but prohibit subsequent edits, test the prior value, for example AND(NOT(ISNEW()), ISPICKVAL(PRIORVALUE(StageName), \"Closed Won\")). Checking only the new StageName can also reject the transition into Closed Won. A flow with Custom Error can also reject saves; validation is the direct tool for this simple rule."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "A validation rule can reject an update when the Opportunity was already Closed Won, regardless of whether the update comes from the UI, Apex, or an API.",
      "references": []
    }
  },
  {
    "id": 2,
    "section": "automation",
    "focus": "familiar",
    "group": "flows",
    "stem": [
      "When a user edits the Postal Code on an Account, a custom Account text field named 'Timezone' must be updated based on the values in another custom object called PostalCodeToTimezone__c.",
      {
        "ask": "What is the optimal way to implement this feature?"
      }
    ],
    "choices": [
      "Build a flow with Flow Builder.",
      "Create an account approval process.",
      "Create a formula field.",
      "Build an account assignment rule."
    ],
    "answer": "A",
    "why": "Use a before-save record-triggered flow: when Postal Code changes, Get Records finds the mapping and Assignment writes $Record.Timezone__c.",
    "wrong": {
      "B": "An approval process routes or locks a record. It does not look up a postal code.",
      "C": "A formula cannot query PostalCodeToTimezone__c.",
      "D": "An assignment rule sets the owner. It does not write Timezone."
    },
    "notes": [
      "The mapping object is independent data, so a formula cannot perform an arbitrary postal-code lookup. Define behavior for missing/duplicate mappings and avoid a second update of the triggering Account."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Use a before-save record-triggered flow: when Postal Code changes, Get Records finds the mapping and Assignment writes $Record.Timezone__c.",
      "references": []
    }
  },
  {
    "id": 3,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      "A developer wants to improve runtime performance of Apex calls by caching results on the client.",
      {
        "ask": "What is the most efficient way to implement this and follow best practices?"
      }
    ],
    "choices": [
      "Decorate the server-side method with @AuraEnabled(cacheable=true).",
      "Call the setStorable() method on the action in the JavaScript client-side code.",
      "Decorate the server-side method with @AuraEnabled(storable=true).",
      "Set a cookie in the browser for use upon return to the page."
    ],
    "answer": "A",
    "why": "Use @AuraEnabled(cacheable=true) on the read-only Apex method. Salesforce recommends this centralized caching declaration from API 44.0 onward; Aura setStorable() is the older client-side alternative.",
    "wrong": {
      "B": "setStorable() is a valid legacy Aura caching API. The Apex cacheable declaration is the recommended centralized approach; the source does not specify LWC.",
      "C": "@AuraEnabled uses cacheable=true. There is no storable=true.",
      "D": "A browser cookie is not how Lightning caches an Apex result."
    },
    "notes": [
      "The method must not mutate data. This annotation is required for Apex @wire and optional for imperative reads. Cache lifetime is platform-controlled; use refreshApex for stale wired Apex data rather than assuming a fixed duration.",
      "Salesforce reference: Client-side caching — https://developer.salesforce.com/docs/platform/lwc/guide/apex-result-caching.html",
      "Reference: https://developer.salesforce.com/docs/platform/aura-platform/guide/controllers-server-storable-actions.html"
    ],
    "source": {
      "stem": [
        "A developer wants to improve runtime performance of Apex calls by caching results on the client.",
        {
          "ask": "What is the most efficient way to implement this and follow best practices?"
        }
      ],
      "choices": [
        "Decorate the server-side method with @AuraEnabled(cacheable=true).",
        "Call the setStorable() method on the action in the JavaScript client-side code.",
        "Decorate the server-side method with @AuraEnabled(storable=true).",
        "Set a cookie in the browser for use upon return to the page."
      ],
      "answer": "A"
    },
    "printed": "A",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Restore the framework-neutral source. Salesforce documents cacheable=true as the preferred centralized approach since API 44.0, so A remains the best-practice answer; the valid legacy setStorable alternative belongs in the explanation, not an invented LWC restriction.",
      "references": [
        "https://developer.salesforce.com/docs/platform/lwc/guide/apex-result-caching.html",
        "https://developer.salesforce.com/docs/platform/aura-platform/guide/controllers-server-storable-actions.html"
      ]
    }
  },
  {
    "id": 4,
    "section": "ui",
    "focus": "must",
    "group": "security",
    "stem": [
      "A developer is tasked with building a custom Lightning Web Component (LWC) to collect contact information. The form will be shared among different types of users in the org. There are security requirements stating that only certain fields should be editable and visible to certain groups of users.",
      {
        "ask": "What should the developer use in their Lightning Web Component to support the security requirements?"
      }
    ],
    "choices": [
      "lightning-input-field",
      "force:inputField",
      "aura:input",
      "ui:inputField"
    ],
    "answer": "A",
    "why": "Use lightning-input-field inside lightning-record-edit-form; Lightning Data Service/UI API applies object permissions and field-level security.",
    "wrong": {
      "B": "force:inputField is legacy markup, not the LWC base input-field component.",
      "C": "aura:input is not the LWC record-field component and is not a substitute for LDS permission enforcement.",
      "D": "ui:inputField is not the supported LWC record-field component."
    },
    "notes": [
      "The component uses field metadata to choose the input type. The form supplies the record context; a standalone lightning-input does not automatically bind to a Salesforce field or enforce FLS. Custom Apex calls still need their own security design."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Use lightning-input-field inside lightning-record-edit-form; Lightning Data Service/UI API applies object permissions and field-level security.",
      "references": []
    }
  },
  {
    "id": 5,
    "section": "testing",
    "focus": "must",
    "group": "tests",
    "stem": [
      {
        "ask": "Which two events need to happen when deploying to a production org?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "All custom objects must have visibility set to a value other than in Development.",
      "All Apex code must have at least 75% test coverage.",
      "All triggers must have some test coverage",
      "All Visual flows must have at least 1% test coverage."
    ],
    "answer": "B,C",
    "type": "multi",
    "why": "With RunLocalTests, production deployment requires at least 75% eligible Apex coverage org-wide and some coverage for every trigger; the relevant tests must also pass.",
    "wrong": {
      "A": "Object visibility settings are not a deployment requirement.",
      "D": "Visual Flows do not require test coverage for deployment to production."
    },
    "notes": [
      "The 75% figure is not a minimum for each class under this test level. RunSpecifiedTests uses a different rule: each deployed class and trigger needs 75% coverage from the selected tests. Assertions test behavior even though an assertion count is not the deployment gate.",
      "Deployment test levels: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_start.html"
    ],
    "source": {
      "stem": [
        {
          "ask": "Which two events need to happen when deploying to a production org?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "All custom objects must have visibility set to a value other than in Development.",
        "All Apex code must have at least 75% test coverage.",
        "All triggers must have some test coverage",
        "All Visual flows must have at least 1% test coverage."
      ],
      "answer": "B,C"
    },
    "printed": "B,C",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Specify RunLocalTests and org-wide coverage rather than 75% for every individual class. Original wording and choices are retained; the source key remains accepted. With RunLocalTests, production deployment requires at least 75% eligible Apex coverage org-wide and some coverage for every trigger; the relevant tests must also pass.",
      "references": [
        "https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_start.html"
      ]
    }
  },
  {
    "id": 6,
    "section": "automation",
    "focus": "high",
    "group": "integration",
    "stem": [
      "A developer is integrating with a legacy on-premise SQL database.",
      {
        "ask": "What should the developer use to ensure the data being integrated is matched to the right records in Salesforce?"
      }
    ],
    "choices": [
      "External Object",
      "External ID field",
      "Formula field",
      "Lookup field"
    ],
    "answer": "B",
    "why": "Store the legacy database key in an External ID field and use that field when matching/upserting records.",
    "wrong": {
      "A": "External objects are used for real-time integration with external systems but do not address data matching directly.",
      "C": "A formula computes a value; it is not an eligible External ID field for this matching strategy.",
      "D": "Lookup fields are used for creating relationships between objects within Salesforce, not for matching external data."
    },
    "notes": [
      "External ID and Unique are separate attributes: uniqueness is useful when the source key must identify exactly one row. Marking the field alone does not change insert into upsert. Lookup relationships can reference an external ID, but the stable matching key is the External ID field."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Store the legacy database key in an External ID field and use that field when matching/upserting records.",
      "references": []
    }
  },
  {
    "id": 7,
    "section": "testing",
    "focus": "familiar",
    "group": "tests",
    "stem": [
      "A developer needs to confirm that a Contact trigger works correctly without changing the organization's data.",
      {
        "ask": "What should the developer do to test the Contact trigger?"
      }
    ],
    "choices": [
      "Use Deploy from the VSCode IDE co deploy an 'insert Contact' Apex class.",
      "Use the New button on the Salesforce Contacts Tab to create a new Contact record.",
      "Use the Test menu on the Developer Console to run all test classes for the Contact trigger.",
      "Use the Open Execute Anonymous feature on the Developer Console to run an 'insert Contact' DML statement."
    ],
    "answer": "C",
    "why": "Run the trigger’s Apex test classes. Test-created Contacts exercise the trigger, and ordinary test database changes are rolled back afterward.",
    "wrong": {
      "A": "Deploying code does not confirm that the trigger works correctly.",
      "B": "Creating a Contact through the normal UI changes the organization’s data.",
      "D": "Execute Anonymous DML normally commits real org records; it is not the Apex unit-test rollback context."
    },
    "notes": [
      "A meaningful test inserts/updates test Contacts and asserts the expected effects, including bulk and failure cases. Execute Anonymous and the Contacts New button normally commit real records when their transactions succeed."
    ],
    "source": {
      "stem": [
        "A developer needs to confirm that a Contact trigger works correctly without changing the organization's data.",
        {
          "ask": "What should the developer do to test the Contact trigger?"
        }
      ],
      "choices": [
        "Use Deploy from the VSCode IDE co deploy an 'insert Contact' Apex class.",
        "Use the New button on the Salesforce Contacts Tab to create a new Contact record.",
        "Use the Test menu on the Developer Console to run oil test classes for the Contact trigger.",
        "Use the Open Execute Anonymous feature on the Developer Console to run an 'insert Contact' DML statement."
      ],
      "answer": "C"
    },
    "printed": "C",
    "repaired": true,
    "repair": "Correct the obvious OCR word oil to all in choice C; retain the original test scenario and option meanings.",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Correct the obvious OCR word oil to all in choice C; retain the original test scenario and option meanings.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "explanation-refined",
        "reason": "Removed the unprovided production-environment assumption from distractor explanations; ordinary UI/anonymous DML changes org data, whereas test DML rolls back."
      }
    }
  },
  {
    "id": 8,
    "section": "testing",
    "focus": "familiar",
    "group": "security",
    "stem": [
      "A developer is working on a project to import data from an external system into Salesforce. The data contains sensitive information that should not be visible to all users in Salesforce.",
      {
        "ask": "What should the developer do to ensure that the data is secure?"
      }
    ],
    "choices": [
      "Use a third-party tool to encrypt the sensitive data before importing it into Salesforce.",
      "Use the Apex Data Loader to import the into and write Apex code to handle security and accesscontrol.",
      "Use the Data Import Wizard to import the data arid set up field-level security to restrict access tosensitive fields.",
      "Use the Salesforce CLI to import the data and set up user permissions to restrict access to sensitive data."
    ],
    "answer": "C,D",
    "why": "Protect the sensitive fields using field-level permissions and use a supported import route. Both C and D describe an import plus access restrictions; the CLI choice does not say to ignore field-level security.",
    "wrong": {
      "A": "Encryption can be useful for other requirements, but encrypting outside Salesforce does not configure user-specific field visibility.",
      "B": "A custom security layer is unnecessary when native field permissions implement this requirement."
    },
    "notes": [
      "The import tool does not determine who may read a field after import. Set FLS before granting users access. Salesforce CLI also imports data; object Read permission alone does not restrict individual fields."
    ],
    "source": {
      "stem": [
        "A developer is working on a project to import data from an external system into Salesforce. The data contains sensitive information that should not be visible to all users in Salesforce.",
        {
          "ask": "What should the developer do to ensure that the data is secure?"
        }
      ],
      "choices": [
        "Use a third-party tool to encrypt the sensitive data before importing it into Salesforce.",
        "Use the Apex Data Loader to import the into and write Apex code to handle security and accesscontrol.",
        "Use the Data Import Wizard to import the data arid set up field-level security to restrict access tosensitive fields.",
        "Use the Salesforce CLI to import the data and set up user permissions to restrict access to sensitive data."
      ],
      "answer": "C"
    },
    "printed": "C",
    "acceptAny": true,
    "type": "single",
    "choose": 1,
    "repaired": true,
    "repair": "The source CLI option does not limit permissions to object Read; its access restrictions can include field permissions. Restore it rather than replacing it with an insecure alternative. Accept C or D with the object/import-support caveat.",
    "review": {
      "date": "2026-10-17",
      "treatment": "accepted-alternatives",
      "reason": "The source CLI option does not limit permissions to object Read; its access restrictions can include field permissions. Restore it rather than replacing it with an insecure alternative. Accept C or D with the object/import-support caveat.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "explanation-refined",
        "reason": "Removed the invented Contact-only import scope; the source names sensitive imported data without specifying an object."
      }
    }
  },
  {
    "id": 9,
    "section": "automation",
    "focus": "familiar",
    "group": "limits",
    "stem": [
      {
        "ask": "Which Apex class contains methods to return the amount of resources that have been used for a particular governor, such as the number of DML statements?"
      }
    ],
    "choices": [
      "OrgLimits",
      "Limits",
      "Messaging",
      "Exception"
    ],
    "answer": "B",
    "why": "Limits reports transaction governor usage, such as Limits.getDMLStatements(), and the corresponding ceiling through Limits.getLimitDMLStatements().",
    "wrong": {
      "A": "OrgLimits exists, but reports organization allocations rather than this transaction’s DML statement count.",
      "C": "Messaging deals with email and messaging operations.",
      "D": "Exception is for handling exceptions, not tracking resource usage."
    },
    "notes": [
      "OrgLimits is a real System class for organization-wide allocations such as API consumption. Use Limits for transaction DML/SOQL/CPU usage. A usage check helps code choose a smaller workload, but cannot catch or override an exceeded governor limit.",
      "Salesforce reference: OrgLimits and transaction Limits — https://help.salesforce.com/s/articleView?id=release-notes.rn_apex_OrgLimits.htm&language=en_US&release=240&type=5"
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Limits reports transaction governor usage, such as Limits.getDMLStatements(), and the corresponding ceiling through Limits.getLimitDMLStatements().",
      "references": [
        "https://help.salesforce.com/s/articleView?id=release-notes.rn_apex_OrgLimits.htm&language=en_US&release=240&type=5"
      ]
    }
  },
  {
    "id": 10,
    "section": "automation",
    "focus": "familiar",
    "group": "triggers",
    "stem": [
      {
        "ask": "Which action causes a before trigger to fire by default for Accounts?"
      }
    ],
    "choices": [
      "Renaming or replacing picklists",
      "updating addresses using Mass Address updated tool",
      "Importing data using the Data Loader and the Bulk API",
      "Converting Leads to Contacts"
    ],
    "answer": "C",
    "why": "Data Loader/Bulk API record inserts and updates invoke the applicable Account before triggers.",
    "wrong": {
      "A": "Renaming or replacing picklists does not trigger a record-level operation.",
      "B": "The Mass Address Update tool is not a record operation that triggers before triggers.",
      "D": "Account triggers can run during lead conversion when the relevant org setting is enabled; the question asks what occurs by default."
    },
    "notes": [
      "Mass address changes and picklist replacement are examples of system operations that do not invoke ordinary record triggers. Lead conversion behavior depends on the org’s conversion validation/trigger settings, so it is not the unconditional answer here."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Data Loader/Bulk API record inserts and updates invoke the applicable Account before triggers.",
      "references": []
    }
  },
  {
    "id": 11,
    "section": "automation",
    "focus": "must",
    "group": "limits",
    "stem": [
      "Management asked for opportunities to be automatically created for accounts with annual revenue greater than $1, 000,000. A developer created the following trigger on the Account object to satisfy this requirement.",
      {
        "code": [
          "for (Account a : Trigger.new) {",
          "      if (a.AnnualRevenue > 1000000) {",
          "          List<Opportunity> oppList = [SELECT Id FROM Opportunity WHERE AccountId = :a.Id];",
          "          if (oppList.size() == 0) {",
          "              Opportunity oppty = new Opportunity(",
          "                  Name = a.Name,",
          "                  StageName = 'Prospecting',",
          "                  CloseDate = System.today().addDays(30)",
          "              );",
          "              insert oppty;",
          "          }",
          "      }",
          "  }"
        ]
      },
      "Users are able to update the account records via the UI and can see an opportunity created for high annual revenue accounts. However, when the administrator tries to upload a list of 179 accounts using Data Loader, it fails with system, Exception errors.",
      {
        "ask": "Which two actions should the developer take to fix the code segment shown above?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Query for existing opportunities outside the for loop.",
      "Check if all the required fields for Opportunity are being added on creation.",
      "Move the DML that saves opportunities outside the for loop.",
      "Use Database query to query the opportunities."
    ],
    "answer": "A,C",
    "type": "multi",
    "why": "Query existing Opportunities once for all Account Ids, then insert one collected list of new Opportunities outside the loop.",
    "wrong": {
      "B": "Checking required fields does not remove the query and the insert from the loop.",
      "D": "Database.query changes how SOQL is constructed; moving the same query into that API does not remove the per-record queries."
    },
    "notes": [
      "A 179-record input can exceed 100 synchronous SOQL queries and 150 DML statements if work remains per Account. Filter the query by the full Id set and map existing children by AccountId."
    ],
    "source": {
      "stem": [
        "Management asked for opportunities to be automatically created for accounts with annual revenue greater than $1, 000,000. A developer created the following trigger on the Account object to satisfy this requirement.",
        {
          "code": [
            "for (Account a : Trigger.new) {",
            "      if (a.AnnualRevenue > 1000000) {",
            "          List<Opportunity> oppList = [SELECT Id FROM Opportunity WHERE AccountId = :a.Id];",
            "          if (oppList.size() == 0) {",
            "              Opportunity oppty = new Opportunity(",
            "                  Name = a.Name,",
            "                  StageName = 'Prospecting',",
            "                  CloseDate = System.today().addDays(30)",
            "              );",
            "              insert oppty;",
            "          }",
            "      }",
            "  }"
          ]
        },
        "Users are able to update the account records via the UI and can see an opportunity created for high annual revenue accounts. However, when the administrator tries to upload a list of 179 accounts using Data Loader, it fails with system, Exception errors.",
        {
          "ask": "Which two actions should the developer take to fix the code segment shown above?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "Query for existing opportunities outside the for loop.",
        "Check if all the required fields for Opportunity are being added on creation.",
        "Move the DML that saves opportunities outside the for loop.",
        "Use Database query to query the opportunities."
      ],
      "answer": "A,C"
    },
    "printed": "A,C",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Restore the missing AccountId so the proposed bulk fix also links Opportunities to their Accounts. Original wording and choices are retained; the source key remains accepted. Query existing Opportunities once for all Account Ids, then insert one collected list of new Opportunities outside the loop.",
      "references": []
    }
  },
  {
    "id": 12,
    "section": "fundamentals",
    "focus": "must",
    "group": "platform",
    "stem": [
      {
        "ask": "What is a benefit of developing applications in a multi-tenant environment?"
      }
    ],
    "choices": [
      "Enforced unit testing and code coverage best practices",
      "Access to predefined computing resources",
      "Preconfigured storage for big data",
      "Unlimited processing power and memory"
    ],
    "answer": "A,B",
    "why": "A or B. Managed computing resources are a multitenant-platform benefit, and enforced Apex test/coverage practices support quality on Salesforce’s shared platform. Either single selection is accepted for the broad recovered question.",
    "wrong": {
      "C": "Multitenancy does not provide a universally preconfigured big-data store for every application.",
      "D": "Shared capacity is governed by limits, not unlimited processing power and memory."
    },
    "notes": [
      "A describes Salesforce’s Apex development/deployment discipline; it is not a universal promise about every multitenant vendor. Governor limits protect shared capacity."
    ],
    "source": {
      "stem": [
        {
          "ask": "What is a benefit of developing applications"
        }
      ],
      "choices": [
        "Enforced unit testing and code coverage best practices",
        "Access to predefined computing resources",
        "Preconfigured storage for big data",
        "Unlimited processing power and memory"
      ],
      "answer": "B"
    },
    "printed": "B",
    "review": {
      "date": "2026-10-17",
      "treatment": "accepted-alternatives",
      "reason": "Scoring restored with supported single-choice alternatives A or B after the missing multitenant subject was recovered. Shared managed compute and Salesforce’s testing discipline are both defensible benefits in this Salesforce context; neither requires replacing the original choices.",
      "references": [
        "https://certbull.com/application/public/files/6f9pMZHfsuM0h4qSU6c9geN9GihvVabF8WmRRhd9.pdf",
        "https://developer.salesforce.com/blogs/2011/03/a-billion-lines-of-apex",
        "https://trailhead.salesforce.com/content/learn/modules/apex_testing/apex_testing_intro"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "resolved",
        "queries": [
          "\"What is a benefit of developing applications\" \"multi-tenant\""
        ],
        "candidates": [
          "https://certbull.com/application/public/files/6f9pMZHfsuM0h4qSU6c9geN9GihvVabF8WmRRhd9.pdf"
        ],
        "assessment": "Scoring restored with supported single-choice alternatives A or B after the missing multitenant subject was recovered. Shared managed compute and Salesforce’s testing discipline are both defensible benefits in this Salesforce context; neither requires replacing the original choices."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "not-scored",
        "decision": "scoring-restored",
        "reason": "Scoring restored with supported single-choice alternatives A or B after the missing multitenant subject was recovered. Shared managed compute and Salesforce’s testing discipline are both defensible benefits in this Salesforce context; neither requires replacing the original choices."
      }
    },
    "repair": "The earlier online recovery supplied the missing subject, “in a multi-tenant environment.” This reassessment also accepts original option A alongside printed B because both benefits are defensible in the Salesforce context. The DOCX choices are unchanged.",
    "repairNotes": [
      "Reference: https://certbull.com/application/public/files/6f9pMZHfsuM0h4qSU6c9geN9GihvVabF8WmRRhd9.pdf",
      "Reference: https://developer.salesforce.com/blogs/2011/03/a-billion-lines-of-apex",
      "Reference: https://trailhead.salesforce.com/content/learn/modules/apex_testing/apex_testing_intro"
    ],
    "type": "single",
    "acceptAny": true,
    "repaired": true
  },
  {
    "id": 13,
    "section": "automation",
    "focus": "high",
    "group": "flows",
    "stem": [
      "Universal Containers (UC) is developing a process for their sales teams that requires all sales reps to go through a set of scripted steps with each new customer they create.",
      "In the first step of collecting information, UC's ERP system must be checked via a REST endpoint to see if the customer exists. If the customer exists, the data must be presented to the sales rep in Salesforce.",
      {
        "ask": "Which two should a developer implement to satisfy the requirements?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Flow",
      "Invocable method",
      "Future method",
      "Trigger"
    ],
    "answer": "A,B",
    "type": "multi",
    "why": "Use a screen flow for the scripted interview and an invocable Apex method to call the REST service and return data for the next screen.",
    "wrong": {
      "C": "Future methods are asynchronous and cannot return data to the user in real time.",
      "D": "Triggers are used for database events, not for guiding users through scripted processes or making REST calls."
    },
    "notes": [
      "Declare the Apex action with @InvocableMethod(callout=true) as appropriate, configure authentication through Named Credentials, and preserve input/output order for bulk inputs. A synchronous result is required for display; a future method returns void and runs later. Flow HTTP Callout/External Services can be alternatives, but are not listed here."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Use a screen flow for the scripted interview and an invocable Apex method to call the REST service and return data for the next screen.",
      "references": []
    }
  },
  {
    "id": 14,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      {
        "ask": "Which three code lines are required to create a Lightning component on a Visualforce page?"
      },
      {
        "ask": "Choose 3 answers."
      }
    ],
    "choices": [
      "$Lightning.use",
      "$Lightning.useComponent",
      {
        "code": "<apex:includeLightning/>"
      },
      {
        "code": "<apex:slds/>"
      },
      "$Lightning.createComponent"
    ],
    "answer": "A,C,E",
    "type": "multi",
    "why": "For Lightning Components for Visualforce, apex:includeLightning loads the library, $Lightning.use loads the dependency app, and $Lightning.createComponent creates the component in a DOM container.",
    "wrong": {
      "B": "$Lightning.useComponent is not the method that creates the component.",
      "D": "apex:slds does not load a Lightning Out app."
    },
    "notes": [
      "This is the Lightning Out (beta) integration pattern used by the mock. Define an Aura dependency application extending ltng:outApp and declare the component dependency. apex:slds supplies styling rather than the Lightning Out runtime."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "For Lightning Components for Visualforce, apex:includeLightning loads the library, $Lightning.use loads the dependency app, and $Lightning.createComponent creates the component in a DOM container.",
      "references": []
    }
  },
  {
    "id": 15,
    "section": "automation",
    "focus": "familiar",
    "group": "model",
    "stem": [
      "Universal Containers (UC) uses a custom object called Vendor. The Vendor custom object has a master-detail relationship with the standard Account object.",
      "Based on some internal discussions, the UC administrator tried to change the master-detail relationship to a lookup relationship, but was not able to do so.",
      {
        "ask": "What is a possible reason that this change was not permitted?"
      }
    ],
    "choices": [
      "Some of the Vendor records have null for the Account field.",
      "The Account object has a roll up summary field on the Vendor object.",
      "The Account object does not allow changing a field type for a custom field.",
      "The organization wide default for the Vendor object is Public Read/Write."
    ],
    "answer": "B",
    "why": "An Account roll-up summary that depends on the Vendor master-detail relationship prevents converting that relationship to lookup.",
    "wrong": {
      "A": "An existing master-detail row requires its master, so null Account values do not describe this relationship.",
      "C": "Custom fields can have their types changed as long as dependencies like roll-up fields are not present.",
      "D": "Detail sharing is controlled by the master; a supposed independent Vendor Public Read/Write setting is not the conversion blocker."
    },
    "notes": [
      "Remove the dependent native roll-up summary fields before conversion. Existing Vendor master-detail rows cannot have a null master, and their sharing is controlled by the parent; Public Read/Write on Vendor is not the relevant blocker."
    ],
    "source": {
      "stem": [
        "Universal Containers (UC) uses a custom object called Vendor. The Vendor custom object has a master-detail relationship with the standard Account object.",
        "Based on some internal discussions, the UC administrator tried to change the master-detail relationship to a lookup relationship, but was not able to do so.",
        {
          "ask": "What is a possible reason that this change was not permitted?"
        }
      ],
      "choices": [
        "Some of the Vendor records have null for the Account field.",
        "The Account object has a roll up summary field on the Vendor object.",
        "The Account object does not allow changing a field type for a custom field.",
        "The organization wide default for the Vendor object is Public Read/Write."
      ],
      "answer": "B"
    },
    "printed": "B",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Clarify that the roll-up is on Account and summarizes related Vendors. Original wording and choices are retained; the source key remains accepted. An Account roll-up summary that depends on the Vendor master-detail relationship prevents converting that relationship to lookup.",
      "references": []
    }
  },
  {
    "id": 16,
    "section": "automation",
    "focus": "must",
    "group": "triggers",
    "stem": [
      "A developer writes a trigger on the Account object on the before update event that increments a count field. A record triggered flow also increments the count field every time that an Account is created or updated.",
      {
        "ask": "What is the value of the count field if an Account is inserted with an initial value of zero, assuming no other automation logic is implemented on the Account?"
      }
    ],
    "choices": [
      "4",
      "2",
      "1",
      "3"
    ],
    "answer": "",
    "why": "Not scored. Before-save versus after-save flow timing materially changes the count and possible recursion. The source provides neither timing nor a complete flow; this is essential execution context for the numeric answer.",
    "wrong": {},
    "notes": [
      "Final value: 2. The repaired flow runs on creation only, so the update does not re-enter it. The old explanation incorrectly assumed an unconditional create/update flow stops itself. A before-save increment would have a different order and could produce 1."
    ],
    "printed": "A",
    "source": {
      "stem": [
        "A developer writes a trigger on the Account object on the before update event that increments a count field. A record triggered flow also increments the count field every time that an Account is created or updated.",
        {
          "ask": "What is the value of the count field if an Account is inserted with an initial value of zero, assuming no other automation logic is implemented on the Account?"
        }
      ],
      "choices": [
        "4",
        "2",
        "1",
        "3"
      ],
      "answer": "A"
    },
    "ungraded": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "unresolved",
      "reason": "Before-save versus after-save flow timing materially changes the count and possible recursion. The source provides neither timing nor a complete flow; this is essential execution context for the numeric answer.",
      "references": [
        "https://www.examtopics.com/discussions/salesforce/view/59841-exam-crt-450-topic-1-question-173-discussion/",
        "https://www.actual4test.com/discussions/Salesforce/exam-pdi-topic-3-question-4-discussion-p1217526.html",
        "https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/salesforce_apex_developer_guide.pdf"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "unresolved",
        "queries": [
          "Salesforce \"Counter__c\" \"before update\" \"create and update\" question",
          "\"trigger on the Account object\" \"initial value of zero\""
        ],
        "candidates": [
          "https://www.examtopics.com/discussions/salesforce/view/59841-exam-crt-450-topic-1-question-173-discussion/",
          "https://www.actual4test.com/discussions/Salesforce/exam-pdi-topic-3-question-4-discussion-p1217526.html"
        ],
        "assessment": "Before-save versus after-save flow timing materially changes the count and possible recursion. The source provides neither timing nor a complete flow; this is essential execution context for the numeric answer."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "not-scored",
        "decision": "still-unresolved",
        "reason": "Before-save versus after-save flow timing materially changes the count and possible recursion. The source provides neither timing nor a complete flow; this is essential execution context for the numeric answer."
      },
      "optionAudit": {
        "date": "2026-10-17",
        "status": "matched",
        "comparedChoiceCount": 4,
        "assessment": "All four numeric choices (4, 2, 1, 3) appear in the matching Actual4test copy. Other PDFs use different counts or keys; no missing flow timing was verified. The options are complete, but the execution context remains incomplete.",
        "references": [
          "https://www.actual4test.com/discussions/Salesforce/exam-pdi-topic-3-question-4-discussion-p1217526.html"
        ]
      }
    }
  },
  {
    "id": 17,
    "section": "testing",
    "focus": "familiar",
    "group": "deploy",
    "stem": [
      {
        "ask": "What should be used to create scratch orgs?"
      }
    ],
    "choices": [
      "Salesforce CLI",
      "Sandbox refresh",
      "Developer Console",
      "Workbench"
    ],
    "answer": "A",
    "why": "Use Salesforce CLI to create a scratch org authorized through a Dev Hub.",
    "wrong": {
      "B": "Sandbox refresh is used for creating sandboxes, not scratch orgs.",
      "C": "Developer Console is used for debugging and code development but cannot create scratch orgs.",
      "D": "Workbench is a tool for API testing and data manipulation, not for scratch org creation."
    },
    "notes": [
      "A current command is sf org create scratch with a scratch definition file and target Dev Hub. Scratch orgs are disposable development environments described by source/configuration; a sandbox refresh copies an existing production environment."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Use Salesforce CLI to create a scratch org authorized through a Dev Hub.",
      "references": []
    }
  },
  {
    "id": 18,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      {
        "ask": "Which three steps allow a custom Scalable Vector Graphic (SVG) to be included in a Lightning web component?"
      },
      {
        "ask": "Choose 3 answers"
      }
    ],
    "choices": [
      "Import the static resource and provide a JavaScript property for it.",
      "Upload the SVG as a static resource.",
      "Reference the import in the HTML template.",
      "Import the SVG as a content asset file.",
      "Reference the property in the HTML template."
    ],
    "answer": "A,B,E",
    "type": "multi",
    "why": "Upload the SVG as a static resource, import its URL in JavaScript, expose that URL on the component instance, and bind the property from the template.",
    "wrong": {
      "C": "The template must reference the JavaScript property, not the import.",
      "D": "Content assets are supported generally; this option does not perform the static-resource upload/import/property sequence asked for here."
    },
    "notes": [
      "An imported module variable is not automatically a template property. For the static-resource route, import the URL with @salesforce/resourceUrl, expose an instance property, then bind that property in the template. Content assets are an alternative resource mechanism, not another step in that same three-step route."
    ],
    "printed": "A,B,C",
    "source": {
      "stem": [
        {
          "ask": "Which three steps allow a custom Scalable Vector Graphic (SVG) to be included in a Lightning web component?"
        },
        {
          "ask": "Choose 3 answers"
        }
      ],
      "choices": [
        "Import the static resource and provide a JavaScript property for it.",
        "Upload the SVG as a static resource.",
        "Reference the import in the HTML template.",
        "Import the SVG as a content asset file.",
        "Reference the property in the HTML template."
      ],
      "answer": "A,B,C"
    },
    "corrected": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "Upload the SVG as a static resource, import its URL in JavaScript, expose that URL on the component instance, and bind the property from the template.",
      "references": []
    }
  },
  {
    "id": 19,
    "section": "automation",
    "focus": "familiar",
    "group": "language",
    "stem": [
      "A developer wants to mark each Account in a List<Account> as either Active or Inactive, based on the value in the LastModifiedDate of each Account being greater than 90 days in the past.",
      {
        "ask": "Which Apex technique should the developer use?"
      }
    ],
    "choices": [
      "An if-else statement, with a for loop inside",
      "A switch statement, with a for loop inside",
      "A for loop, with an if or if/else statement inside",
      "A for loop, with a switch statement inside"
    ],
    "answer": "C",
    "why": "Iterate the Accounts with a for loop and evaluate an if/else inside it so each record gets its own date comparison.",
    "wrong": {
      "A": "The if must sit inside the loop so every record is checked.",
      "B": "A switch around the loop does not evaluate the date predicate separately for each Account.",
      "D": "A switch inside the loop is unnecessary when one if can test the condition."
    },
    "notes": [
      "Calculate a cutoff such as System.now().addDays(-90), handle nulls if applicable, and compare each Account.LastModifiedDate. A switch cannot directly express an arbitrary greater-than date predicate as a case value."
    ],
    "source": {
      "stem": [
        "A developer wants to mark each Account in a List<Account> as either Active or Inactive, based on the value in the LastModified each Account being greater than 90 days in the past.",
        {
          "ask": "Which Apex technique should the developer use?"
        }
      ],
      "choices": [
        "An if-else statement, with a for loop inside",
        "A witch statement, with a for loop inside",
        "A for loop, with an if or if/else statement inside",
        "A for loop, with a switch statement inside"
      ],
      "answer": "C"
    },
    "printed": "C",
    "repaired": true,
    "repair": "Repair the damaged LastModifiedDate phrase and witch/switch typo only; retain the original iteration question and C key.",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Repair the damaged LastModifiedDate phrase and witch/switch typo only; retain the original iteration question and C key.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "LastModifiedDate and switch transcription fixes preserve the per-record loop/conditional task."
      }
    }
  },
  {
    "id": 20,
    "section": "automation",
    "focus": "must",
    "group": "limits",
    "stem": [
      "Consider the following code snippet:",
      {
        "code": [
          "public static List<Lead> obtainAllFields(Set<Id> leadIds) {",
          "      List<Lead> result = new List<Lead>();",
          "      for (Id leadId : leadIds) {",
          "          result.add([SELECT FIELDS(ALL) FROM Lead WHERE Id = :leadId]);",
          "      }",
          "      return result;",
          "  }"
        ]
      },
      {
        "ask": "Given the multi-tenant architecture of the Salesforce platform, what is a best practice a developer should implement to ensure successful execution of the method?"
      }
    ],
    "choices": [
      "Avoid using variables as query filters.",
      "Avoid performing queries inside for loops.",
      "Avoid executing queries without a limit clause.",
      "Avoid returning an empty List of records."
    ],
    "answer": "B",
    "why": "B. Query the required Leads as a collection using the Id set rather than execute one query for each Id.",
    "wrong": {
      "A": "Bind variables are appropriate for query filters and are not the problem.",
      "C": "Adding LIMIT does not remove the query-per-record pattern.",
      "D": "Returning an empty collection is valid when there are no matching records."
    },
    "notes": [
      "The source snippet also uses FIELDS(ALL), which is unsupported for this Apex use. A real implementation must select supported fields as well as move the query outside the loop. The original code is retained to preserve the mock; B identifies the asked-about bulkification practice, not every required code fix.",
      "Reference: https://trailhead.salesforce.com/content/learn/modules/apex_triggers/apex_triggers_bulk",
      "Reference: https://developer.salesforce.com/docs/platform/salesforce-soql-sosl/guide/sforce-api-calls-soql-select-fields.html"
    ],
    "source": {
      "stem": [
        "Consider the following code snippet:",
        {
          "code": [
            "public static List<Lead> obtainAllFields(Set<Id> leadIds) {",
            "      List<Lead> result = new List<Lead>();",
            "      for (Id leadId : leadIds) {",
            "          result.add([SELECT FIELDS(ALL) FROM Lead WHERE Id = :leadId]);",
            "      }",
            "      return result;",
            "  }"
          ]
        },
        {
          "ask": "Given the multi-tenant architecture of the Salesforce platform, what is a best practice a developer should implement to ensure successful execution of the method?"
        }
      ],
      "choices": [
        "Avoid using variables as query filters.",
        "Avoid performing queries inside for loops.",
        "Avoid executing queries without a limit clause.",
        "Avoid returning an empty List of records."
      ],
      "answer": "B"
    },
    "printed": "B",
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Scoring restored: the question asks for a multitenant best practice, and querying once per Id inside the loop is the problem B addresses. The separate FIELDS(ALL) defect should be disclosed, not used to reject the only appropriate bulkification answer.",
      "references": [
        "https://developer.salesforce.com/docs/platform/salesforce-soql-sosl/guide/sforce-api-calls-soql-select-fields.html",
        "https://www.certsforce.com/salesforce/questions/crt-450-practice-test",
        "https://trailhead.salesforce.com/content/learn/modules/apex_triggers/apex_triggers_bulk"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "resolved",
        "queries": [
          "Salesforce \"FIELDS(ALL)\" \"governor\" \"developer\" question"
        ],
        "candidates": [
          "https://www.certsforce.com/salesforce/questions/crt-450-practice-test"
        ],
        "assessment": "Scoring restored: the question asks for a multitenant best practice, and querying once per Id inside the loop is the problem B addresses. The separate FIELDS(ALL) defect should be disclosed, not used to reject the only appropriate bulkification answer."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "not-scored",
        "decision": "scoring-restored",
        "reason": "Scoring restored: the question asks for a multitenant best practice, and querying once per Id inside the loop is the problem B addresses. The separate FIELDS(ALL) defect should be disclosed, not used to reject the only appropriate bulkification answer."
      }
    },
    "type": "single"
  },
  {
    "id": 21,
    "section": "automation",
    "focus": "high",
    "group": "language",
    "stem": [
      "The orderHelper class is a utility class that contains business logic for processing orders. Consider the following code snippet:",
      {
        "code": [
          "public without sharing class OrderHelper {",
          "      // code implementation",
          "  }"
        ]
      },
      "A developer needs to create a constant named delivery_multiplier with a value of 4.15. The value of the constant should not change at any time in the code.",
      {
        "ask": "How should the developer declare the delivery multiplier constant to meet the business objectives?"
      }
    ],
    "choices": [
      "static decimal DELIVERY_MULTIPLIER = 4.15;",
      "constant decimal DELIVERY_MULTIPLIER = 4.15;",
      "static final decimal DELIVERY_MULTIPLIER = 4.15;",
      "decimal DELIVERY_MULTIPLIER = 4.15;"
    ],
    "answer": "C",
    "why": "static final Decimal declares one class-level value that can be assigned only once during initialization.",
    "wrong": {
      "A": "Static without final can still be changed later.",
      "B": "Constant is not an Apex keyword.",
      "D": "A plain variable can be reassigned."
    },
    "notes": [
      "static determines the lifetime/scope of the variable; final prevents reassignment after initialization. Apex has no constant declaration keyword. A final reference to a collection does not by itself make the collection’s contents immutable."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "static final Decimal declares one class-level value that can be assigned only once during initialization.",
      "references": []
    }
  },
  {
    "id": 22,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      "Universal Containers is developing a new Lightning web component for their marketing department. They want to ensure that the component is fine-tuned and provides a seamless user experience.",
      {
        "ask": "What are some benefits of using the Lightning Component framework?"
      }
    ],
    "choices": [
      "Better performance due to client-side rendering",
      "Automatic support for accessibility standards",
      "Compatibility with all web browsers",
      "Easy integration with third-party libraries"
    ],
    "answer": "A,B,D",
    "type": "multi",
    "why": "A, B and D. The framework provides client-side UI performance, built-in accessibility support through base components, and mechanisms to integrate compatible third-party libraries.",
    "wrong": {
      "C": "The framework supports documented browsers, not every browser without qualification."
    },
    "notes": [
      "Custom UI still needs accessibility testing. Library integration must respect Lightning Web Security/Locker compatibility; easy integration does not mean every external library is supported.",
      "Reference: https://developer.salesforce.com/docs/platform/lwc/guide/base-components-accessibility.html"
    ],
    "source": {
      "stem": [
        "Universal Containers is developing a new Lightning web component for their marketing department. They want to ensure that the component is fine-tuned and provides a seamless user experience.",
        {
          "ask": "What are some benefits of using the Lightning Component framework?"
        }
      ],
      "choices": [
        "Better performance due to client-side rendering",
        "Automatic support for accessibility standards",
        "Compatibility with all web browsers",
        "Easy integration with third-party libraries"
      ],
      "answer": "A,B,D"
    },
    "printed": "A,B,D",
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Scoring restored: automatic accessibility support refers to framework/base-component support, not a guarantee that every custom component is compliant. The previous review substituted that stronger claim and incorrectly rejected B.",
      "references": [
        "https://www.pass4success.com/salesforce/discussions/exam-dex-450-topic-2-question-107-discussion",
        "https://developer.salesforce.com/docs/platform/lwc/guide/base-components-accessibility.html"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "resolved",
        "queries": [
          "Salesforce \"automatic accessibility\" \"three\" components",
          "\"component is fine-tuned\" \"Lightning\""
        ],
        "candidates": [
          "https://www.pass4success.com/salesforce/discussions/exam-dex-450-topic-2-question-107-discussion"
        ],
        "assessment": "Scoring restored: automatic accessibility support refers to framework/base-component support, not a guarantee that every custom component is compliant. The previous review substituted that stronger claim and incorrectly rejected B."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "not-scored",
        "decision": "scoring-restored",
        "reason": "Scoring restored: automatic accessibility support refers to framework/base-component support, not a guarantee that every custom component is compliant. The previous review substituted that stronger claim and incorrectly rejected B."
      }
    },
    "choose": 3
  },
  {
    "id": 23,
    "section": "fundamentals",
    "focus": "familiar",
    "group": "model",
    "stem": [
      "The values 'High', 'Medium', and 'Low' are identified as common values for multiple picklists across different objects.",
      {
        "ask": "What is an approach a developer can take to streamline maintenance of the picklists and their values, while also restricting the values to the ones mentioned above?"
      }
    ],
    "choices": [
      "Create the Picklist on each object and use a Global Picklist Value Set containing the values.",
      "Create the Picklist on each object as a required field and select 'Display values alphabetically, not in the order entered'.",
      "Create the Picklist on each object and add a validation rule to ensure data integrity.",
      "Create the Picklist on each object and select 'Restrict picklist to the values defined in the value set'."
    ],
    "answer": "A",
    "why": "A Global Picklist Value Set centralizes High, Medium, and Low for reuse by fields on multiple objects and restricts those fields to the shared values.",
    "wrong": {
      "B": "Alphabetical ordering does not ensure consistent value maintenance across objects.",
      "C": "Validation rules do not streamline picklist value maintenance.",
      "D": "Restricting picklist values helps ensure data integrity but does not streamline maintenance across objects."
    },
    "notes": [
      "Updating the value set avoids editing independent field lists. Record types can still select which values are available. Making fields required or alphabetical changes input behavior rather than centralizing maintenance."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "A Global Picklist Value Set centralizes High, Medium, and Low for reuse by fields on multiple objects and restricts those fields to the shared values.",
      "references": []
    }
  },
  {
    "id": 24,
    "section": "ui",
    "focus": "familiar",
    "group": "visualforce",
    "stem": [
      "Universal Containers has a large number of custom applications that were built using a third-party JavaScript framework and exposed using Visualforce pages. The company wants to update these applications to apply styling that resembles the look and feel of Lightning Experience.",
      {
        "ask": "What should the developer do to fulfill the business request in the quickest and most effective manner?"
      }
    ],
    "choices": [
      "Rewrite all Visualforce pages as Lightning components.",
      "Set the attribute enableLightning to true in the definition.",
      "Enable Available for Lightning Experience, Lightning Communities, and the mobile app on Visualforce pages used by the custom application.",
      "Incorporate the Salesforce Lightning Design System CSS stylesheet Into the JavaScript applications."
    ],
    "answer": "D",
    "why": "Apply Salesforce Lightning Design System styling and matching SLDS markup to the existing JavaScript/Visualforce application.",
    "wrong": {
      "A": "Rewriting all Visualforce pages as Lightning components is time-consuming and not efficient.",
      "B": "There is no attribute enableLightning in Visualforce.",
      "C": "Enabling Lightning Experience compatibility does not apply styling automatically."
    },
    "notes": [
      "Loading the stylesheet alone does not rewrite arbitrary HTML: use the appropriate SLDS classes/structures. The Visualforce availability checkbox controls where a page can run, while lightningStylesheets and apex:slds are separate styling facilities. A complete component rewrite is unnecessary for this request."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Apply Salesforce Lightning Design System styling and matching SLDS markup to the existing JavaScript/Visualforce application.",
      "references": []
    }
  },
  {
    "id": 25,
    "section": "automation",
    "focus": "high",
    "group": "limits",
    "stem": [
      "A developer has identified a method in an Apex class that performs resource intensive actions in memory by iterating over the result set of a SOQL statement on the account. The method also performs a DML statement to save the changes to the database.",
      "Which two techniques should the developer implement as a best practice to ensure transaction control and avoid exceeding governor limits'*",
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Use the @ReadOnly annotation to bypass the number of rows returned by a SOQL.",
      "Use partial DML statements to ensure only valid data is committed.",
      "Use the System.Limits class to monitor the current CPU governor limit consumption.",
      "Use the Database.setSavepoint method to enforce database integrity."
    ],
    "answer": "",
    "type": "multi",
    "why": "Not scored. Partial-success DML, CPU monitoring and savepoint-based rollback are valid techniques, but the question does not establish a unique two-answer set. The small API-name repairs do not resolve that ambiguity.",
    "wrong": {},
    "notes": [
      "Neither technique increases governor limits. Inspect SaveResult errors and choose whether business rules allow partial success. Limits.getCpuTime() is valid monitoring, but monitoring alone does not provide partial success or explicit rollback.",
      "Successful row results are still part of the enclosing transaction. A later rollback or unhandled failure can undo them; allOrNone=false is not an independent commit."
    ],
    "source": {
      "stem": [
        "A developer has identified a method in an Apex class that performs resource intensive actions in memory by iterating over the result set of a SOQL statement on the account. The method also performs a DML statement to save the changes to the database.",
        "Which two techniques should the developer implement as a best practice to ensure transaction control and avoid exceeding governor limits'*",
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "Use the @ReadOnly annotation to bypass the number of rows returned by a SOQL.",
        "Use partial DML statements to ensure only valid data is committed.",
        "Use the System.limit class to monitor the current CPU governor limit consumption.",
        "Use the Database.Savepoint method to enforce database integrity."
      ],
      "answer": "B,D"
    },
    "printed": "B,D",
    "ungraded": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "unresolved",
      "reason": "Corrected the identifiable System.Limits and Database.setSavepoint API names only. The source still combines transaction control and governor-limit concerns without establishing a unique pair among partial-success DML, CPU monitoring and savepoint-based rollback. Scoring remains withheld.",
      "references": [
        "https://www.freecram.com/discussions/Salesforce/exam-crt-450-topic-1-question-26-discussion-p1225636.html",
        "https://developer.salesforce.com/docs/atlas.en-us.apexref.meta/apexref/apex_methods_system_limits.htm",
        "https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/langCon_apex_transaction_control.htm"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "partial",
        "queries": [
          "Salesforce \"governor limits\" \"savepoint\" \"Choose 2\" database"
        ],
        "candidates": [
          "https://www.freecram.com/discussions/Salesforce/exam-crt-450-topic-1-question-26-discussion-p1225636.html"
        ],
        "assessment": "The matching FreeCram copy contains all four choices and repeats the malformed System.limit and Database.Savepoint names. Corrected only these identifiable API names to System.Limits and Database.setSavepoint; no choice was missing. The best two techniques remain debatable. Corrected the identifiable System.Limits and Database.setSavepoint API names only. The source still combines transaction control and governor-limit concerns without establishing a unique pair among partial-success DML, CPU monitoring and savepoint-based rollback. Scoring remains withheld."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "not-scored",
        "decision": "still-unresolved",
        "reason": "Corrected the identifiable System.Limits and Database.setSavepoint API names only. The source still combines transaction control and governor-limit concerns without establishing a unique pair among partial-success DML, CPU monitoring and savepoint-based rollback. Scoring remains withheld."
      },
      "optionAudit": {
        "date": "2026-10-17",
        "status": "partial-repair",
        "comparedChoiceCount": 4,
        "assessment": "The matching FreeCram copy contains all four choices and repeats the malformed System.limit and Database.Savepoint names. Corrected only these identifiable API names to System.Limits and Database.setSavepoint; no choice was missing. The best two techniques remain debatable.",
        "references": [
          "https://www.freecram.com/discussions/Salesforce/exam-crt-450-topic-1-question-26-discussion-p1225636.html"
        ]
      }
    },
    "repair": "Corrected two malformed API names only: System.limit to System.Limits in C, and Database.Savepoint to Database.setSavepoint in D. No new technique or scenario was added. The two-answer selection remains unresolved.",
    "repairNotes": [
      "Only the identified term was repaired. Online copies may repeat the same malformed wording; Salesforce documentation verifies the API/feature name. The original key is still unverified.",
      "Reference: https://developer.salesforce.com/docs/atlas.en-us.apexref.meta/apexref/apex_methods_system_limits.htm",
      "Reference: https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/langCon_apex_transaction_control.htm",
      "Reference: https://www.freecram.com/discussions/Salesforce/exam-crt-450-topic-1-question-26-discussion-p1225636.html"
    ]
  },
  {
    "id": 26,
    "section": "automation",
    "focus": "familiar",
    "group": "flows",
    "stem": [
      {
        "ask": "The sales management team at Universal Containers requires that the Lead Source field of the Lead record be populated when a Lead is converted What should be done to ensure that a user populates the Lead Source field prior to converting a Lead?"
      }
    ],
    "choices": [
      "Create an after trigger on Lead.",
      "Use Lead Conversion field mapping.",
      "Use a formula field.",
      "Use a validation rule."
    ],
    "answer": "A,D",
    "why": "With conversion validation and triggers enabled, a validation rule or an after trigger calling addError can require LeadSource during conversion. Both A and D are accepted; mapping a field does not require a value.",
    "wrong": {
      "B": "Lead conversion field mapping copies values. It does not require the field.",
      "C": "A formula cannot block the conversion."
    },
    "notes": [
      "A suitable validation formula is AND(IsConverted, ISBLANK(TEXT(LeadSource))). Enable conversion validation/triggers as applicable. An after trigger may also call addError to reject conversion; field mapping only copies values."
    ],
    "printed": "B",
    "source": {
      "stem": [
        {
          "ask": "The sales management team at Universal Containers requires that the Lead Source field of the Lead record be populated when a Lead is converted What should be done to ensure that a user populates the Lead Source field prior to converting a Lead?"
        }
      ],
      "choices": [
        "Create an after trigger on Lead.",
        "Use Lead Conversion field mapping.",
        "Use a formula field.",
        "Use a validation rule."
      ],
      "answer": "B"
    },
    "acceptAny": true,
    "type": "single",
    "choose": 1,
    "corrected": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "Lead field mapping does not require a value. With conversion validation/triggers enabled, a validation rule or an after trigger using addError can enforce LeadSource. Preserve both original options A and D instead of adding a declarative-only restriction.",
      "references": []
    }
  },
  {
    "id": 27,
    "section": "fundamentals",
    "focus": "high",
    "group": "model",
    "stem": [
      "Universal Containers decides to use exclusively declarative development to build out a new Salesforce application.",
      {
        "ask": "Which three options should be used to build out the database layer for the application?"
      },
      {
        "ask": "Choose 3 answers"
      }
    ],
    "choices": [
      "Custom objects and fields",
      "Triggers",
      "Roll-up summaries",
      "Relationships",
      "Flows"
    ],
    "answer": "A,C,D",
    "type": "multi",
    "why": "Custom objects/fields define stored data, relationships connect objects, and roll-up summaries define declarative aggregates in the data model.",
    "wrong": {
      "B": "Triggers are a programmatic solution, which goes against the declarative-only requirement.",
      "E": "Flows are used for automation and logic, not for building the database layer."
    },
    "notes": [
      "A record-triggered flow is declarative too, but belongs to the automation/business-logic layer in this classification. Apex triggers are programmatic."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Custom objects/fields define stored data, relationships connect objects, and roll-up summaries define declarative aggregates in the data model.",
      "references": []
    }
  },
  {
    "id": 28,
    "section": "automation",
    "focus": "must",
    "group": "language",
    "stem": [
      "A developer must implement a CheckPaymentProcessor class that provides check processing payment capabilities that adhere to what is defined for payments in the PaymentProcessor interface.",
      {
        "code": [
          "public interface PaymentProcessor {",
          "      void pay(Decimal amount);",
          "  }"
        ]
      },
      {
        "ask": "Which is the correct implementation to use the PaymentProcessor interface class?"
      }
    ],
    "choices": [
      {
        "code": [
          "public class CheckPaymentProcessor implements PaymentProcessor {",
          "      public void pay(Decimal amount) {}",
          "  }"
        ]
      },
      {
        "code": [
          "public class CheckPaymentProcessor implements PaymentProcessor {",
          "      public void pay(Decimal amount);",
          "  }"
        ]
      },
      {
        "code": [
          "public class CheckPaymentProcessor extends PaymentProcessor {",
          "      public void pay(Decimal amount);",
          "  }"
        ]
      },
      {
        "code": [
          "public class CheckPaymentProcessor extends PaymentProcessor {",
          "      public void pay(Decimal amount) {}",
          "  }"
        ]
      }
    ],
    "answer": "A",
    "why": "CheckPaymentProcessor must implement PaymentProcessor and provide a concrete public void pay(Decimal amount) method body.",
    "wrong": {
      "B": "implements is correct, but pay has no body. A method in a class needs braces.",
      "C": "An interface is implemented, not extended. The method also has no body.",
      "D": "extends does not apply to an interface. A method body does not fix that."
    },
    "notes": [
      "implements adopts an interface contract; extends inherits a class. A semicolon-only declaration is not a concrete implementation. Keep parameter types and return type consistent with the interface signature."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "CheckPaymentProcessor must implement PaymentProcessor and provide a concrete public void pay(Decimal amount) method body.",
      "references": []
    }
  },
  {
    "id": 29,
    "section": "testing",
    "focus": "familiar",
    "group": "deploy",
    "stem": [
      {
        "ask": "When importing and exporting data into Salesforce, which two statements are true?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Bulk API can be used to bypass the storage limits when importing large data volumes in development environments.",
      "Data import wizard is an application that is installed on your computer",
      "Bulk API can be used to import large data volumes in development environments without bypassing the storage limits.",
      "Developer and Developer Pro sandboxes have different storage limits."
    ],
    "answer": "C,D",
    "type": "multi",
    "why": "Bulk API can process large imports without bypassing storage limits, and Developer versus Developer Pro sandboxes have different storage allocations.",
    "wrong": {
      "A": "Bulk API does not bypass storage limits.",
      "B": "The Data Import Wizard is a web-based tool, not an application installed on your computer."
    },
    "notes": [
      "Bulk processing changes how work is submitted, not the org’s capacity entitlement. Data Import Wizard is browser-based. Choose sandbox type based on configuration, storage, and test-data needs rather than assuming every sandbox copies production data."
    ],
    "source": {
      "stem": [
        {
          "ask": "When importing and exporting data into Salesforce, which two statements are true?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "Bulk API can be used to bypass the storage limits when importing large data volumes in development environments.",
        "Data import wizard is an application that is installed on your computer",
        "Bulk APL can be used to import large data volumes in development environments without bypassing the storage limits.",
        "Developer and Developer Pro sandboxes have different storage limits."
      ],
      "answer": "C,D"
    },
    "printed": "C,D",
    "repaired": true,
    "repair": "Correct Bulk APL to Bulk API only.",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Correct Bulk APL to Bulk API only.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "The Bulk APL/API typo fix preserves both storage-limit facts; no scenario change is needed."
      }
    }
  },
  {
    "id": 30,
    "section": "automation",
    "focus": "familiar",
    "group": "flows",
    "stem": [
      "Universal Containers wants to automatically assign new cases to the appropriate support representative based on the case origin. They have created a custom field on the Case object to store the support representative name.",
      {
        "ask": "What is the best solution to assign the case to the appropriate support representative?"
      }
    ],
    "choices": [
      "Use a trigger on the Case object.",
      "Use a formula field on the Case object.",
      "Use a validation rule on the Case object.",
      "Use an Assignment Flow element."
    ],
    "answer": "D",
    "why": "D. Use flow logic to determine the representative from Case Origin and an Assignment element to set the relevant Case field.",
    "wrong": {
      "A": "A trigger can implement routing, but simple field assignment can be handled declaratively with Flow.",
      "B": "A formula calculates a value; it does not assign ownership or persist a routing-field update.",
      "C": "A validation rule accepts or rejects a save rather than assign the representative."
    },
    "notes": [
      "Assignment changes a flow resource. In a before-save flow, assigning $Record fields is persisted automatically. In another flow design, save the changes with the appropriate record operation. Setting OwnerId requires a valid User/Queue Id, not merely the representative’s display name.",
      "Reference: https://help.salesforce.com/s/articleView?id=platform.flow_concepts_trigger_record.htm&language=en_US&type=5"
    ],
    "source": {
      "stem": [
        "Universal Containers wants to automatically assign new cases to the appropriate support representative based on the case origin. They have created a custom field on the Case object to store the support representative name.",
        {
          "ask": "What is the best solution to assign the case to the appropriate support representative?"
        }
      ],
      "choices": [
        "Use a trigger on the Case object.",
        "Use a formula field on the Case object.",
        "Use a validation rule on the Case object.",
        "Use an Assignment Flow element."
      ],
      "answer": "D"
    },
    "printed": "D",
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Scoring restored: an Assignment element in a record-triggered flow is the best listed declarative way to set the Case’s routing/representative field. The earlier review rejected it for not spelling out the surrounding flow, while accepting a trigger would require surrounding logic too.",
      "references": [
        "https://www.freecram.net/question/Salesforce.PDI.v2024-07-20.q115/universal-containers-wants-to-automatically-assign-new-cases-to-the-appropriate-support-representative",
        "https://help.salesforce.com/s/articleView?id=platform.flow_concepts_trigger_record.htm&language=en_US&type=5"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "resolved",
        "queries": [
          "\"support representative name\" \"Assignment\" Salesforce",
          "\"Universal Containers wants to automatically assign new cases\""
        ],
        "candidates": [
          "https://www.freecram.net/question/Salesforce.PDI.v2024-07-20.q115/universal-containers-wants-to-automatically-assign-new-cases-to-the-appropriate-support-representative"
        ],
        "assessment": "Scoring restored: an Assignment element in a record-triggered flow is the best listed declarative way to set the Case’s routing/representative field. The earlier review rejected it for not spelling out the surrounding flow, while accepting a trigger would require surrounding logic too."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "not-scored",
        "decision": "scoring-restored",
        "reason": "Scoring restored: an Assignment element in a record-triggered flow is the best listed declarative way to set the Case’s routing/representative field. The earlier review rejected it for not spelling out the surrounding flow, while accepting a trigger would require surrounding logic too."
      }
    },
    "type": "single"
  },
  {
    "id": 31,
    "section": "automation",
    "focus": "familiar",
    "group": "language",
    "stem": [
      "A developer considers the following snippet of code:",
      {
        "code": [
          "Boolean isOK;",
          "  Integer x;",
          "  String theString = 'Hello';",
          "  if (isOK == false && theString == 'Hello') {",
          "      x = 1;",
          "  } else if (isOK == true && theString == 'Hello') {",
          "      x = 2;",
          "  } else if (isOK == null && theString == 'Hello') {",
          "      x = 3;",
          "  } else {",
          "      x = 4;",
          "  }"
        ]
      },
      {
        "ask": "Based an this code, what is the value of x?"
      }
    ],
    "choices": [
      "1",
      "2",
      "3",
      "4"
    ],
    "answer": "C",
    "why": "isOK defaults to null. The false and true comparisons fail, but isOK == null succeeds, so x becomes 3.",
    "wrong": {
      "A": "1 would require isOK to be false. An uninitialized Boolean is null.",
      "B": "2 would require isOK to be true.",
      "D": "4 is the final else. The null check matches first, so x is 3."
    },
    "notes": [
      "Do not treat an uninitialized Apex Boolean as automatically false. The code compares it explicitly, avoiding a direct null Boolean condition. Follow the branches in order; the final else is not reached."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "isOK defaults to null. The false and true comparisons fail, but isOK == null succeeds, so x becomes 3.",
      "references": []
    }
  },
  {
    "id": 32,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      {
        "ask": "Since Aura application events follow the traditional publish-subscribe model, which method is used to fire an event?"
      }
    ],
    "choices": [
      "fire()",
      "SegdetesEvent (}",
      "FireEvent()",
      "emit()"
    ],
    "answer": "A",
    "why": "Obtain the Aura application event instance and call its fire() method to publish it to registered handlers.",
    "wrong": {
      "B": "sendEvent() is not a valid method for Aura events.",
      "C": "FireEvent() does not exist.",
      "D": "emit() is not part of the Aura event framework."
    },
    "notes": [
      "For an application event this commonly uses $A.get(\"e.namespace:EventName\").fire(). LWC uses dispatchEvent(new CustomEvent(...)) instead; these are separate event APIs."
    ],
    "source": {
      "stem": [
        {
          "ask": "Since Aura application events follow the traditional publish-subscribe model, which method is used to fire an event?"
        }
      ],
      "choices": [
        "fire()",
        "SegdetesEvent (}",
        "FireEvent()",
        "emit()"
      ],
      "answer": "A"
    },
    "printed": "A",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Restore the corrupted sendEvent() distractor so its explanation matches the displayed option. Original wording and choices are retained; the source key remains accepted. Obtain the Aura application event instance and call its fire() method to publish it to registered handlers.",
      "references": []
    }
  },
  {
    "id": 33,
    "section": "ui",
    "focus": "familiar",
    "group": "visualforce",
    "stem": [
      "A custom Visualforce controller calls the ApexPages.addMessage() method, but no messages are rendering on the page.",
      {
        "ask": "Which component should be added to the Visualforce page to display the message?"
      }
    ],
    "choices": [
      {
        "code": "<opex:message for'info'/>"
      },
      {
        "code": "<apex:pageMessages />"
      },
      {
        "code": "<apex:pageMessage severity='info'' />"
      },
      {
        "code": "<apex:facet name='messages'' />"
      }
    ],
    "answer": "B",
    "why": "apex:pageMessages renders the messages in the ApexPages message collection, including ApexPages.addMessage calls.",
    "wrong": {
      "A": "apex:message targets the messages associated with the specified input component, not the complete page message collection.",
      "C": "Is used for displaying a single, static message, not the dynamic collection of messages.",
      "D": "Does not display messages."
    },
    "notes": [
      "apex:pageMessage is a single declarative message, while apex:message targets a specific input component. If the page uses an AJAX action, rerender the message region when necessary."
    ],
    "source": {
      "stem": [
        "A custom Visualforce controller calls the ApexPages.addMessage() method, but no messages are rendering on the page.",
        {
          "ask": "Which component should be added to the Visualforce page to display the message?"
        }
      ],
      "choices": [
        {
          "code": "<opex:message for'info'/>"
        },
        {
          "code": "<apex:pageMessages />"
        },
        {
          "code": "<apex:pageMessage severity='info'' />"
        },
        {
          "code": "<apex:facet name='messages'' />"
        }
      ],
      "answer": "B"
    },
    "printed": "B",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Repair malformed Visualforce distractor markup without changing the pageMessages answer. Original wording and choices are retained; the source key remains accepted. apex:pageMessages renders the messages in the ApexPages message collection, including ApexPages.addMessage calls.",
      "references": []
    }
  },
  {
    "id": 34,
    "section": "automation",
    "focus": "familiar",
    "group": "flows",
    "stem": [
      "A credit card company needs to implement the functionality for a service agent to process damaged or stolen credit cards. When the customers call in, the service",
      "agent must gather many pieces of information. A developer is tasked to implement this functionality.",
      {
        "ask": "What should the developer use to satisfy this requirement in the most efficient manner?"
      }
    ],
    "choices": [
      "Screen-based flow",
      "Approval process",
      "Apex trigger",
      "Lightning Component"
    ],
    "answer": "A",
    "why": "A screen flow can guide the agent through successive input screens and use the collected information in record actions.",
    "wrong": {
      "B": "An approval process is for routing records for approval, not for gathering user input.",
      "C": "Apex triggers are for automation, not for interactive user input.",
      "D": "A Lightning Component could work but requires custom development, which is less efficient than using flows."
    },
    "notes": [
      "Screen flows provide interactive steps; record-triggered flows and triggers respond to record changes without presenting an interview. Prefer a custom component when screen-flow components cannot meet the actual UI requirement."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "A screen flow can guide the agent through successive input screens and use the collected information in record actions.",
      "references": []
    }
  },
  {
    "id": 35,
    "section": "automation",
    "focus": "must",
    "group": "queries",
    "stem": [
      {
        "ask": "What should a developer use to obtain the Id and Name of all the Leads, Accounts, and Contacts that have the company name 'Universal Containers?"
      }
    ],
    "choices": [
      "FIND 'Universal Containers' IN CompanyName FIELDS RETURNING Lead(Id, Name), Account(Id, Name), Contact(Id, Name)",
      "SELECT Lead.Id, Lead.Name, Account.Id, Account.Name, Contact.Id, Contact.Name FROM Lead, Account, Contact WHERE CompanyName = 'Universal Containers'",
      "FIND 'Universal Containers' IN Name FIELDS RETURNING Lead(Id, Name), Account(Id, Name), Contact(Id, Name)",
      "SELECT Lead(Id, Name), Account(Id, Name), Contact(Id, Name) FROM Lead, Account, Contact WHERE Name = 'Universal Containers'"
    ],
    "answer": "C",
    "why": "C uses valid SOSL IN NAME FIELDS with multiple RETURNING objects. For standard objects that scope includes Lead.Company and Contact.AccountName as well as their name fields.",
    "wrong": {
      "A": "IN CompanyName FIELDS is invalid SOSL; NAME FIELDS is the supported scope that includes the relevant standard company/name fields.",
      "B": "This is one SOQL query over Lead, Account, and Contact. SOQL cannot query those objects together.",
      "D": "This is SOQL written with SOSL-style parentheses. SOQL cannot return Lead, Account, and Contact from one query."
    },
    "notes": [
      "CompanyName is not a valid SOSL search group. SOSL is indexed text search, not an exact relational join or a promise to return every matching record without its result limits. For exact company equality, design object-specific SOQL queries and relationships instead.",
      "Salesforce reference: Valid SOSL search groups and standard name fields — https://developer.salesforce.com/docs/platform/salesforce-soql-sosl/guide/sforce-api-calls-sosl-in.html"
    ],
    "source": {
      "stem": [
        {
          "ask": "What should a developer use to obtain the Id and Name of all the Leads, Accounts, and Contacts that have the company name 'Universal Containers?"
        }
      ],
      "choices": [
        "FIND 'Universal Containers' IN CompanyName FIELDS RETURNING Lead(Id, Name), Account(Id, Name), Contact(Id, Name)",
        "SELECT Lead.Id, Lead.Name, Account.Id, Account.Name, Contact.Id, Contact.Name FROM Lead, Account, Contact WHERE CompanyName = 'Universal Containers'",
        "FIND 'Universal Containers' IN Name FIELDS RETURNING Lead(Id, Name), Account(Id, Name), Contact(Id, Name)",
        "SELECT Lead(Id, Name), Account(Id, Name), Contact(Id, Name) FROM Lead, Account, Contact WHERE Name = 'Universal Containers'"
      ],
      "answer": "A"
    },
    "printed": "A",
    "corrected": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "C uses valid SOSL IN NAME FIELDS with multiple RETURNING objects. For standard objects that scope includes Lead.Company and Contact.AccountName as well as their name fields.",
      "references": [
        "https://developer.salesforce.com/docs/platform/salesforce-soql-sosl/guide/sforce-api-calls-sosl-in.html"
      ]
    }
  },
  {
    "id": 36,
    "section": "automation",
    "focus": "familiar",
    "group": "language",
    "stem": [
      "A lead developer creates an Apex interface called Laptop.",
      "Consider the following code snippet:",
      {
        "code": [
          "public class SilverLaptop {",
          "      // code implementation",
          "  }"
        ]
      },
      {
        "ask": "How can a developer use the Laptop interface within the SilverLaptop class?"
      }
    ],
    "choices": [
      "Extends (class='Laptop') public class SilverLaptop",
      "public class SilverLaptop implements Laptop",
      "public class SilverLaptop extends Laptop",
      "Interface (class='Laptop') public class SilverLaptop"
    ],
    "answer": "B",
    "why": "Declare SilverLaptop implements Laptop, because Laptop is an interface.",
    "wrong": {
      "A": "Extends (class='Laptop') is not Apex syntax.",
      "C": "Extends is for a parent class. An interface uses implements.",
      "D": "Interface (class='Laptop') is not Apex syntax."
    },
    "notes": [
      "The concrete class must supply implementations for the interface methods. extends is used to inherit a virtual or abstract class, not to adopt an interface."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Declare SilverLaptop implements Laptop, because Laptop is an interface.",
      "references": []
    }
  },
  {
    "id": 37,
    "section": "automation",
    "focus": "high",
    "group": "security",
    "stem": [
      "A developer must write an Apex method that will be called from a Lightning component. The method may delete an Account stored in the accountRec variable.",
      {
        "ask": "Which method should a developer use to ensure only users that should be able to delete Accounts can successfully perform deletions?"
      }
    ],
    "choices": [
      "accountRec, isDeletable()",
      {
        "code": "Schema.sObjectType.Account.isDeletable()"
      },
      "accuntRec, sObjectType,isDeletable()",
      "Account,isDeleteable"
    ],
    "answer": "B",
    "why": "Schema.sObjectType.Account.isDeletable() checks the running user’s object-level Delete permission on Account.",
    "wrong": {
      "A": "accountRec.isDeletable() is not a valid method.",
      "C": "Incorrect syntax for checking permissions.",
      "D": "Account.isDeletable does not exist."
    },
    "notes": [
      "This Boolean check does not itself authorize deletion of a particular Account or perform the DML. Enforce the record-level access and actual operation’s security as well. User-mode DML is another enforcement mechanism in current Apex."
    ],
    "source": {
      "stem": [
        "A developer must write an Apex method that will be called from a Lightning component. The method may delete an Account stored in the accountRec variable.",
        {
          "ask": "Which method should a developer use to ensure only users that should be able to delete Accounts can successfully perform deletions?"
        }
      ],
      "choices": [
        "accountRec, isDeletable()",
        "Schema,sObjectType,Account, isDeletable ()",
        "accuntRec, sObjectType,isDeletable()",
        "Account,isDeleteable"
      ],
      "answer": "B"
    },
    "printed": "B",
    "repaired": true,
    "repair": "Correct only the comma-separated Schema.sObjectType.Account.isDeletable() expression in B. Keep the original deletion-security question; explain that object CRUD is not record access.",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Correct only the comma-separated Schema.sObjectType.Account.isDeletable() expression in B. Keep the original deletion-security question; explain that object CRUD is not record access.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "The punctuation repair restores the object Delete-permission describe call; record access remains a separate caveat."
      }
    }
  },
  {
    "id": 38,
    "section": "testing",
    "focus": "familiar",
    "group": "deploy",
    "stem": [
      {
        "ask": "What should a developer use to fix a Lightning web component bug in a sandbox?"
      }
    ],
    "choices": [
      "Developer Console",
      "Force.com IDE",
      "Execute Anonymous",
      "VS Code"
    ],
    "answer": "D",
    "why": "Use Visual Studio Code with Salesforce extensions to edit and deploy the LWC source while reproducing/debugging its behavior in the browser.",
    "wrong": {
      "A": "Developer Console cannot edit the LWC bundle; it can still help inspect server-side Apex logs.",
      "B": "The Force.com IDE is deprecated.",
      "C": "Execute Anonymousdoes not provide tools to debug or fix LWC bugs."
    },
    "notes": [
      "Browser developer tools inspect client-side JavaScript; Salesforce debugging tools inspect Apex called by the component. Developer Console does not edit LWC bundles, and Force.com IDE is retired."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Use Visual Studio Code with Salesforce extensions to edit and deploy the LWC source while reproducing/debugging its behavior in the browser.",
      "references": []
    }
  },
  {
    "id": 39,
    "section": "automation",
    "focus": "high",
    "group": "queries",
    "stem": [
      "Given the following Apex statement:",
      {
        "code": "Account myAccount = [SELECT Id, Name FROM Account];"
      },
      {
        "ask": "What occurs when more than one Account is returned by the SOQL query?"
      }
    ],
    "choices": [
      "The variable, myaccount, is automatically cast to the List data type.",
      "An unhandled exception is thrown and the code terminates.",
      "The query fails and an error is written to the debug log.",
      "The first Account returned is assigned to myAccount."
    ],
    "answer": "B",
    "why": "Assigning a SOQL result directly to a single Account requires exactly one row. More than one row throws System.QueryException.",
    "wrong": {
      "A": "The variable cannot be automatically cast to a list.",
      "C": "The failure is a QueryException during evaluation/assignment, not merely an informational log entry with normal continuation.",
      "D": "The first record is not automatically assigned."
    },
    "notes": [
      "Zero rows also throws for single-sObject assignment. Query into List<Account> when zero/many results are expected; use LIMIT 1 only when choosing one row is intentional and its ordering is defined."
    ],
    "source": {
      "stem": [
        "Given the following Apex statement:",
        {
          "code": "Account myAccount = [SELECT Id, Name FROM Account);"
        },
        {
          "ask": "What occurs when more than one Account is returned by the SOQL query?"
        }
      ],
      "choices": [
        "The variable, myaccount, is automatically cast to the List data type.",
        "An unhandled exception is thrown and the code terminates.",
        "The query fails and an error is written to the debug log.",
        "The first Account returned is assigned to myAccount."
      ],
      "answer": "B"
    },
    "printed": "B",
    "repaired": true,
    "repair": "Replace the malformed closing parenthesis with a SOQL closing bracket. The query and cardinality question are unchanged.",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Replace the malformed closing parenthesis with a SOQL closing bracket. The query and cardinality question are unchanged.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "The bracket repair preserves the single-sObject query/cardinality issue; B is the most precise exception answer."
      }
    }
  },
  {
    "id": 40,
    "section": "testing",
    "focus": "familiar",
    "group": "tests",
    "stem": [
      "A developer at AW Computing is tasked to create the supporting test class for a programmatic customization that leverages records stored within the custom object, Pricing_Structure__c. AW Computing has a complex pricing structure for each item on the store, spanning more than 500 records.",
      {
        "ask": "Which two approaches can the developer use to ensure Pricing_Structure__c records are available when the test class is executed?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Use a test data factory class.",
      "Use the @isTest(SeeAllData=true) annotation.",
      "Use the Test.loadData method.",
      "Use without sharing on the class declaration."
    ],
    "answer": "",
    "type": "multi",
    "why": "Not scored. A factory, Test.loadData and SeeAllData can each make records available under the stated broad can-use wording. The requested two-option set has three actual supported approaches; an isolation requirement is not supplied.",
    "wrong": {},
    "notes": [
      "SeeAllData=true technically exposes existing records but violates the repaired isolation requirement and cannot guarantee those rows exist in another environment. More than 500 rows is a valid use case for either factory creation or a CSV fixture."
    ],
    "source": {
      "stem": [
        "A developer at AW Computing is tasked to create the supporting test class for a programmatic customization that leverages records stored within the custom object, Pricing_Structure__c. AW Computing has a complex pricing structure for each item on the store, spanning more than 500 records.",
        {
          "ask": "Which two approaches can the developer use to ensure Pricing_Structure__c records are available when the test class is executed?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "Use a test data factory class.",
        "Use the @isTest(SeeAllData=true) annotation.",
        "Use the Test.loadData method.",
        "Use without sharing on the class declaration."
      ],
      "answer": "A,B"
    },
    "printed": "A,B",
    "ungraded": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "unresolved",
      "reason": "A factory, Test.loadData and SeeAllData can each make records available under the stated broad can-use wording. The requested two-option set has three actual supported approaches; an isolation requirement is not supplied.",
      "references": [
        "https://www.freecram.net/Salesforce.PDI.v2024-07-20.q115.pdf",
        "https://www.freecram.com/discussions/Salesforce/exam-pdi-topic-3-question-43-discussion-p1336315.html",
        "https://trailhead.salesforce.com/content/learn/modules/unit-testing-on-the-lightning-platform/generate-data-for-tests"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "unresolved",
        "queries": [
          "\"Pricing_Structure__c\" \"500\" \"test\""
        ],
        "candidates": [
          "https://www.freecram.net/Salesforce.PDI.v2024-07-20.q115.pdf",
          "https://www.freecram.com/discussions/Salesforce/exam-pdi-topic-3-question-43-discussion-p1336315.html"
        ],
        "assessment": "A factory, Test.loadData and SeeAllData can each make records available under the stated broad can-use wording. The requested two-option set has three actual supported approaches; an isolation requirement is not supplied."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "not-scored",
        "decision": "still-unresolved",
        "reason": "A factory, Test.loadData and SeeAllData can each make records available under the stated broad can-use wording. The requested two-option set has three actual supported approaches; an isolation requirement is not supplied."
      },
      "optionAudit": {
        "date": "2026-10-17",
        "status": "matched",
        "comparedChoiceCount": 4,
        "assessment": "All four approaches appear in the online question: factory, SeeAllData, Test.loadData and without sharing. Some copies corrupt Test.loadData in OCR or reorder the options. No omitted choice or isolation requirement was found.",
        "references": [
          "https://www.freecram.com/discussions/Salesforce/exam-pdi-topic-3-question-43-discussion-p1336315.html"
        ]
      }
    }
  },
  {
    "id": 41,
    "section": "fundamentals",
    "focus": "must",
    "group": "platform",
    "stem": [
      "A developer is designing a new application on the Salesforce platform and wants to ensure it can support multiple tenants effectively.",
      {
        "ask": "Which design framework should the developer consider to ensure scalability and maintainability?"
      }
    ],
    "choices": [
      "Waterfall Model",
      "Flux (view, action, dispatcher, and store)",
      "Model-View-Controller (MVC)",
      "Agile Development"
    ],
    "answer": "C",
    "why": "MVC separates the data model, presentation, and request/application control responsibilities, which helps organize maintainable Salesforce customizations.",
    "wrong": {
      "A": "The Waterfall model is a development methodology, not a design framework.",
      "B": "Flux is a valid client-side state architecture, but is not the Salesforce model/view/controller separation asked for here.",
      "D": "Agile is a development methodology, not a design framework."
    },
    "notes": [
      "A framework pattern does not create tenant isolation by itself; Salesforce provides the multitenant platform. Flux is a real client-side architecture, while Agile and Waterfall describe development processes rather than this application-layer separation."
    ],
    "source": {
      "stem": [
        "A developer is designing a new application on the Salesforce platform and wants to ensure it can support multiple tenants effectively.",
        {
          "ask": "Which design framework should the developer consider to ensure scalability and maintainability?"
        }
      ],
      "choices": [
        "Waterfall Model",
        "Flux (view, action, dispatcher, and store)",
        "Model-View-Controller (MVC)",
        "Agile Development"
      ],
      "answer": "C"
    },
    "printed": "C",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Ask explicitly about MVC responsibilities rather than suggesting MVC itself creates multitenant isolation. Original wording and choices are retained; the source key remains accepted. MVC separates the data model, presentation, and request/application control responsibilities, which helps organize maintainable Salesforce customizations.",
      "references": []
    }
  },
  {
    "id": 42,
    "section": "testing",
    "focus": "familiar",
    "group": "tests",
    "stem": [
      "A developer has a single custom controller class that works with a Visualforce Wizard to support creating and editing multiple sObjects. The wizard accepts data from user inputs across multiple Visualforce pages and from a parameter on the initial URL.",
      {
        "ask": "Which three statements are useful inside the unit test to effectively test the custom controller?"
      },
      {
        "ask": "Choose 3 answers"
      }
    ],
    "choices": [
      "String nextPage = controller.save().getUrl();",
      "ApexPages.currentPage().getParameters().put('input', 'TestValue');",
      "insert pageRef;",
      {
        "code": "public ExtensionController(ApexPages.StandardController ctrl) { }"
      },
      "Test.setCurrentPage(pageRef);"
    ],
    "answer": "A,B,E",
    "type": "multi",
    "why": "Set the test PageReference with Test.setCurrentPage, populate its URL parameter map before constructing the controller, and call save().getUrl() to inspect navigation.",
    "wrong": {
      "C": "A PageReference is not inserted. The test sets it as the current page.",
      "D": "A constructor is not one of the three statements that drive this test."
    },
    "notes": [
      "Also assert the returned URL and saved record values; calling getUrl without an assertion only executes code. PageReference is not an sObject and cannot be inserted. A controller-extension constructor declaration is not a test statement for this custom controller."
    ],
    "printed": "A,B,D",
    "source": {
      "stem": [
        "A developer has a single custom controller class that works with a Visualforce Wizard to support creating and editing multiple sObjects. The wizard accepts data from user inputs across multiple Visualforce pages and from a parameter on the initial URL.",
        {
          "ask": "Which three statements are useful inside the unit test to effectively test the custom controller?"
        },
        {
          "ask": "Choose 3 answers"
        }
      ],
      "choices": [
        "String nextPage = controller.save().getUrl();",
        "ApexPages.currentPage().getParameters().put('input', 'TestValue');",
        "insert pageRef;",
        {
          "code": "public ExtensionController(ApexPages.StandardController ctrl) { }"
        },
        "Test.setCurrentPage(pageRef);"
      ],
      "answer": "A,B,D"
    },
    "corrected": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "Set the test PageReference with Test.setCurrentPage, populate its URL parameter map before constructing the controller, and call save().getUrl() to inspect navigation.",
      "references": []
    }
  },
  {
    "id": 43,
    "section": "testing",
    "focus": "high",
    "group": "limits",
    "stem": [
      {
        "ask": "What is the result of the following code?"
      },
      {
        "code": [
          "Account a = new Account();",
          "  Database.insert(a, false);"
        ]
      }
    ],
    "choices": [
      "The record will not be created and an exception will be thrown.",
      "The record will not be created and no error will be reported.",
      "The record will be created and no error will be reported.",
      "The record will be created and a message will be in the debug log."
    ],
    "answer": "B",
    "why": "B. The Account is not created because Name is required. The partial-success Database call returns the failure in SaveResult; the displayed code does not inspect or report it.",
    "wrong": {
      "A": "The false allOrNone argument returns this validation failure in SaveResult rather than throwing the normal row-level DmlException.",
      "C": "The required Account Name is missing, so the insert does not succeed.",
      "D": "No record is created and the code has no explicit debug statement."
    },
    "notes": [
      "No error reported here does not mean success or the absence of a SaveResult error. Production code should inspect isSuccess() and getErrors(). Unrelated fatal failures such as governor-limit exceptions are a separate issue.",
      "Reference: https://trailhead.salesforce.com/content/learn/modules/apex_database/apex_database_dml"
    ],
    "printed": "A",
    "source": {
      "stem": [
        {
          "ask": "What is the result of the following code?"
        },
        {
          "code": [
            "Account a = new Account();",
            "  Database.insert(a, false);"
          ]
        }
      ],
      "choices": [
        "The record will not be created and an exception will be thrown.",
        "The record will not be created and no error will be reported.",
        "The record will be created and no error will be reported.",
        "The record will be created and a message will be in the debug log."
      ],
      "answer": "A"
    },
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "Scoring restored with corrected key B. The Account has no Name, and Database.insert(a,false) returns a failure result instead of throwing the row-level DML exception. Because the shown code ignores that result, it reports no error itself; the earlier review treated that wording as if it claimed no error existed.",
      "references": [
        "https://trailhead.salesforce.com/content/learn/modules/apex_database/apex_database_dml",
        "https://www.freecram.net/question/Salesforce.CRT-450.v2023-10-06.q76/what-is-the-result-of-the-following-code"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "resolved",
        "queries": [
          "\"Database.insert(a, false)\" \"reported\""
        ],
        "candidates": [
          "https://www.freecram.net/question/Salesforce.CRT-450.v2023-10-06.q76/what-is-the-result-of-the-following-code"
        ],
        "assessment": "Scoring restored with corrected key B. The Account has no Name, and Database.insert(a,false) returns a failure result instead of throwing the row-level DML exception. Because the shown code ignores that result, it reports no error itself; the earlier review treated that wording as if it claimed no error existed."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "not-scored",
        "decision": "key-corrected",
        "reason": "Scoring restored with corrected key B. The Account has no Name, and Database.insert(a,false) returns a failure result instead of throwing the row-level DML exception. Because the shown code ignores that result, it reports no error itself; the earlier review treated that wording as if it claimed no error existed."
      }
    },
    "type": "single",
    "corrected": true
  },
  {
    "id": 44,
    "section": "automation",
    "focus": "familiar",
    "group": "model",
    "stem": [
      {
        "ask": "What are two characteristics related to formulas?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Formulas are calculated at runtime and are not stored in the database.",
      "Formulas can reference themselves.",
      "Formulas can reference values in related objects.",
      "Fields that are used in a formula field can be deleted or edited without editing the formula."
    ],
    "answer": "A,C",
    "type": "multi",
    "why": "Formula fields are evaluated when read rather than storing a normal editable value, and cross-object formulas can follow supported parent relationships.",
    "wrong": {
      "B": "Formulas cannot reference themselves; doing so would result in a circular reference error.",
      "D": "If a field used in a formula field is deleted, the formula field will break and Salesforce will prevent deletion until the formula field is updated."
    },
    "notes": [
      "Formulas cannot reference themselves or form circular dependencies. A referenced field normally cannot be deleted until its dependencies are removed. Child aggregation is the purpose of a roll-up summary or explicit automation, not an ordinary cross-object formula."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Formula fields are evaluated when read rather than storing a normal editable value, and cross-object formulas can follow supported parent relationships.",
      "references": []
    }
  },
  {
    "id": 45,
    "section": "automation",
    "focus": "high",
    "group": "integration",
    "stem": [
      {
        "ask": "What are two benefits of using External IDs?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "An External ID field can be used to reference an ID from another external system.",
      "An External ID can be a formula field ta help create a unique key from two fields in Salesforce.",
      "An External ID can be used with Salesforce Mobile to make external data visible.",
      "An External ID is indexed and can improve the performance of SOQL queries."
    ],
    "answer": "A,D",
    "type": "multi",
    "why": "External ID fields store integration keys and receive indexes that can help selective matching and SOQL filters.",
    "wrong": {
      "B": "External IDs cannot be formula fields. Only text, number, email and auto-number fields can be set as External IDs.",
      "C": "While External IDs are useful for integrations, they do not make external data visible within Salesforce Mobile."
    },
    "notes": [
      "Indexing is not a guarantee that every filter uses the index. Uniqueness must be configured separately where required. Formula fields are not eligible External ID fields, and an External ID flag does not itself surface external data in mobile."
    ],
    "source": {
      "stem": [
        {
          "ask": "What are two benefits of using External IDs?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "An External ID field can be used to reference an ID from another external system.",
        "An External ID can be a formula field ta help create a unique key from two fields in Salesforce.",
        "An External ID can be used with Salesforce Mobile to make external data visible.",
        "An External 1D is indexed and can improve the performance of SOOL queries."
      ],
      "answer": "A,D"
    },
    "printed": "A,D",
    "repaired": true,
    "repair": "Correct External 1D to External ID and SOOL to SOQL; do not otherwise rewrite the indexing statement.",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Correct External 1D to External ID and SOOL to SOQL; do not otherwise rewrite the indexing statement.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "The ID/SOQL typo repairs preserve integration-key indexing and the A,D answer; indexing is not a guarantee for every query."
      }
    }
  },
  {
    "id": 46,
    "section": "automation",
    "focus": "must",
    "group": "queries",
    "stem": [
      "A developer is tasked to perform a security review of the ContactSearch Apex class that exists in the system. Within the class, the developer identifies the following method as a security threat:",
      {
        "code": [
          "List<Contact> performSearch(String lastName) {",
          "      return Database.query(",
          "          'SELECT Id, FirstName, LastName FROM Contact '",
          "          + 'WHERE LastName LIKE \\'%' + lastName + '%\\''",
          "      );",
          "  }"
        ]
      },
      {
        "ask": "What are two ways the developer can update the method to prevent a SOQL injection attack?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Use variable binding and replace the dynamic query with a static SOQL.",
      "Use the String.escapeSingleQuotes method to sanitize the parameter before its use.",
      "Use the Readonly annotation and the with sharing keyword on the class.",
      "Use a regular expression on the parameter to remove special characters."
    ],
    "answer": "A,B",
    "type": "multi",
    "why": "Bind the LastName pattern into static SOQL, or escape single quotes before concatenating it into this quoted dynamic string literal.",
    "wrong": {
      "C": "While with sharing ensures sharing rules are applied, it does not prevent SOQL injection.",
      "D": "A carefully designed allowlist can mitigate injection, but this unspecified removal of special characters does not define a reliable safe query."
    },
    "notes": [
      "For example, String pattern = '%' + lastName + '%'; then use WHERE LastName LIKE :pattern. Escaping quotes protects this string context, not arbitrary numeric/identifier fragments. A deliberate allowlist can be useful, but an unspecified regular expression is not a complete injection defense."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Bind the LastName pattern into static SOQL, or escape single quotes before concatenating it into this quoted dynamic string literal.",
      "references": []
    }
  },
  {
    "id": 47,
    "section": "automation",
    "focus": "high",
    "group": "flows",
    "stem": [
      "A custom picklist field, Pool Preference , exists on a custom object. The picklist contains the following options: 'Vegan', 'Kosher', 'No Preference'. The developer must ensure a value is populated every time a record is created or updated.",
      {
        "ask": "What is the optimal way to ensure a value is selected every time a record is saved?"
      }
    ],
    "choices": [
      "Set 'Use the first value in the list as the default value' to True.",
      "Write an Apex trigger to ensure a value is selected,",
      "Mark the field as Required on the object's page layout.",
      "Mark the field as Required on the field definition."
    ],
    "answer": "D",
    "why": "Required on the field definition enforces a non-null value through the UI and programmatic save paths.",
    "wrong": {
      "A": "Setting a default value ensures a value is present initially but does not enforce a value during updates.",
      "B": "Writing a trigger is less efficient and adds unnecessary complexity.",
      "C": "Marking the field as required on the page layout is UI-specific and does not enforce the rule during API or code-based operations."
    },
    "notes": [
      "A default does not prevent later clearing, and page-layout Required is a presentation constraint. If conditional requiredness is needed instead, use an appropriate validation rule rather than making the field universally required."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Required on the field definition enforces a non-null value through the UI and programmatic save paths.",
      "references": []
    }
  },
  {
    "id": 48,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      {
        "ask": "What are three capabilities of the <ltng: require> tag when loading JavaScript resources in Aura components?"
      },
      {
        "ask": "Choose 3 answers"
      }
    ],
    "choices": [
      "One-time loading for duplicate scripts",
      "Loading scripts in parallel",
      "Loading Files from Documents",
      "Specifying loading order",
      "Loading externally hosted scripts"
    ],
    "answer": "A,B,D",
    "type": "multi",
    "why": "ltng:require avoids duplicate loads, respects dependency order within a tag, and can load independent sets in parallel using separate tags.",
    "wrong": {
      "C": "Documents is not the supported JavaScript-library source for ltng:require. Load these libraries from static resources; external script URLs are not supported by this component.",
      "E": "External libraries must be uploaded as static resources; direct externally hosted script URLs are not supported here."
    },
    "notes": [
      "Upload third-party JavaScript as Salesforce static resources. An externally developed library is different from a script hosted on an external CDN; the former is supported after upload, while the latter is not loaded directly by this mechanism.",
      "Salesforce reference: Aura library loading — https://developer.salesforce.com/docs/platform/lightning-component-reference/guide/ltng-require.html"
    ],
    "source": {
      "stem": [
        {
          "ask": "What are three capabilities of the <ltng: require> tag when loading JavaScript resources in Aura components?"
        },
        {
          "ask": "Choose 3 answers"
        }
      ],
      "choices": [
        "One-time loading for duplicate scripts",
        "Loading scripts in parallel",
        "Loading Files from Documents",
        "Specifying loading order",
        "Loading externally hosted scripts"
      ],
      "answer": "A,D,E"
    },
    "printed": "A,D,E",
    "corrected": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "ltng:require avoids duplicate loads, respects dependency order within a tag, and can load independent sets in parallel using separate tags.",
      "references": [
        "https://developer.salesforce.com/docs/platform/lightning-component-reference/guide/ltng-require.html"
      ]
    }
  },
  {
    "id": 49,
    "section": "testing",
    "focus": "familiar",
    "group": "tests",
    "stem": [
      {
        "ask": "What should a developer do to check the code coverage of a class after running all tests?"
      }
    ],
    "choices": [
      "View the code coverage percentage for the class using the Overall Code Coverage panel in the Developer Console Tests tab.",
      "View the Class Test Percentage tab on the Apex Class list view in Salesforce Setup.",
      "Select and run the class on the Apex Test Execution page in the Developer Console.",
      "View the Code Coverage column in the list view an the Apex Classes page."
    ],
    "answer": "A,D",
    "why": "After running the tests, per-class coverage can be inspected in Developer Console’s Overall Code Coverage panel or in the Setup Apex Classes coverage column. The source does not restrict the answer to one interface.",
    "wrong": {
      "B": "There is no Class Test Percentage tab on the Setup Apex Classes list; coverage is shown in the Code Coverage column.",
      "C": "The Apex Test Execution page is not where that class coverage panel lives."
    },
    "notes": [
      "Coverage depends on the executed tests and current stored coverage; rerun relevant tests after code changes. Coverage percentage shows exercised lines rather than correctness, so retain meaningful assertions."
    ],
    "source": {
      "stem": [
        {
          "ask": "What should a developer do to check the code coverage of a class after running all tests?"
        }
      ],
      "choices": [
        "View the code coverage percentage for the class using the Overall Code Coverage panel in the Developer Console Tests tab.",
        "View the Class Test Percentage tab on the Apex Class list view in Salesforce Setup.",
        "Select and run the class on the Apex Test Execution page in the Developer Console.",
        "View the Code Coverage column in the list view an the Apex Classes page."
      ],
      "answer": "A"
    },
    "printed": "A",
    "acceptAny": true,
    "type": "single",
    "choose": 1,
    "repaired": true,
    "repair": "The source does not require a Developer Console-only view. The Overall Code Coverage panel and the Setup Apex Classes coverage column are both valid views after running tests. Accept A or D without narrowing the prompt.",
    "review": {
      "date": "2026-10-17",
      "treatment": "accepted-alternatives",
      "reason": "The source does not require a Developer Console-only view. The Overall Code Coverage panel and the Setup Apex Classes coverage column are both valid views after running tests. Accept A or D without narrowing the prompt.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "explanation-refined",
        "reason": "Clarified that the fictitious Class Test Percentage tab is the invalid choice; the Setup coverage column and Developer Console panel both remain accepted."
      }
    }
  },
  {
    "id": 50,
    "section": "automation",
    "focus": "must",
    "group": "limits",
    "stem": [
      {
        "ask": "Which exception type cannot be caught?"
      }
    ],
    "choices": [
      "Custom exception",
      "LimitException",
      "NoAccessException",
      "CalloutException"
    ],
    "answer": "B",
    "why": "A governor LimitException is uncatchable, so a try/catch cannot recover a transaction after that limit is exceeded.",
    "wrong": {
      "A": "A custom exception can be caught.",
      "C": "NoAccessException can be caught.",
      "D": "CalloutException can be caught. LimitException cannot."
    },
    "notes": [
      "Prevent the failure with bulk queries/DML, bounded workloads, and separate transactions where appropriate. Partial-success Database methods and savepoints do not extend governor ceilings."
    ],
    "repaired": true,
    "repair": "Correct LinkException to LimitException and CelloutException to CalloutException; the uncatchable-governor-limit question and B key are unchanged.",
    "source": {
      "stem": [
        {
          "ask": "Which exception type cannot be caught?"
        }
      ],
      "choices": [
        "Custom exception",
        "LinkException",
        "NoAccessException",
        "CelloutException"
      ],
      "answer": "B"
    },
    "printed": "B",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Correct LinkException to LimitException and CelloutException to CalloutException; the uncatchable-governor-limit question and B key are unchanged.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "The exception-name repairs preserve the uncatchable LimitException concept and key B."
      }
    }
  },
  {
    "id": 51,
    "section": "testing",
    "focus": "familiar",
    "group": "debug",
    "stem": [
      {
        "ask": "For which three items can a trace flag be configured?"
      },
      {
        "ask": "Choose 3 answers"
      }
    ],
    "choices": [
      "Apex Class",
      "Flow",
      "User",
      "Visualforce",
      "Apex Trigger"
    ],
    "answer": "A,C,E",
    "type": "multi",
    "why": "Trace flags can target a user, an Apex class, or an Apex trigger.",
    "wrong": {
      "B": "Trace flags cannot be configured for Flows directly.",
      "D": "Trace flags are not used to debug Visualforce pages directly."
    },
    "notes": [
      "User tracing captures transactions. Class/trigger trace flags adjust logging detail for that code but do not independently cause every transaction to be logged; use an appropriate active user/developer trace as well. A flow appears within the transaction log rather than as the listed trace entity."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Trace flags can target a user, an Apex class, or an Apex trigger.",
      "references": []
    }
  },
  {
    "id": 52,
    "section": "ui",
    "focus": "must",
    "group": "lightning",
    "stem": [
      {
        "ask": "Which code statement includes an Apex method named updateAccounts in the class AccountController for use in a Lightning web component?"
      }
    ],
    "choices": [
      "import updateAccounts from 'AccountControlles';",
      "import updateAccounts from 'Salesforce/apex/AccountController:';",
      "import updateAccounts from 'Account@ontroller.updateAccounts';",
      "import updateAccounts from '@salesforce/apex/AccountController.updateAccounts';"
    ],
    "answer": "D",
    "why": "Import the method from @salesforce/apex/AccountController.updateAccounts, using the exact Apex class and method names.",
    "wrong": {
      "A": "The import path must be @salesforce/apex/ClassName.methodName.",
      "B": "The module is @salesforce/apex, with a slash and a dot, not Salesforce/apex and a colon.",
      "C": "The module is @salesforce/apex/AccountController.updateAccounts."
    },
    "notes": [
      "The Apex method must be exposed with @AuraEnabled and be static/public or global as appropriate. Invoke a mutating update method imperatively; @wire requires a read-only cacheable method. Importing a method does not execute it."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Import the method from @salesforce/apex/AccountController.updateAccounts, using the exact Apex class and method names.",
      "references": []
    }
  },
  {
    "id": 53,
    "section": "testing",
    "focus": "familiar",
    "group": "deploy",
    "stem": [
      "A team of many developers work in their own individual orgs that have the same configuration as the production org.",
      {
        "ask": "Which type of org is best suited for this scenario?"
      }
    ],
    "choices": [
      "Developer Sandbox",
      "Full Sandbox",
      "Developer Edition",
      "Partner Developer Edition"
    ],
    "answer": "A",
    "why": "A Developer sandbox copies production metadata and provides an isolated environment for each developer without the cost of copying all production data.",
    "wrong": {
      "B": "A Full sandbox can contain the metadata, but copying all production data and its longer refresh interval are unnecessary for this individual development requirement.",
      "C": "Not connected to the production org and lacks sandbox functionality.",
      "D": "Used by ISVs for AppExchange development, not suitable for internal teams."
    },
    "notes": [
      "A Full sandbox also copies metadata, but its data volume and refresh model suit integration/staging rather than many individual workspaces. A standalone Developer Edition org is not a production sandbox copy."
    ],
    "source": {
      "stem": [
        "A team of many developers work in their own individual orgs that have the same configuration as the production org.",
        {
          "ask": "Which type of org is best suited for this scenario?"
        }
      ],
      "choices": [
        "Developer Sandbox",
        "Full Sandbox",
        "Developer Edition",
        "Partner Developer Edition"
      ],
      "answer": "A"
    },
    "printed": "A",
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "A Developer sandbox copies production metadata and provides an isolated environment for each developer without the cost of copying all production data.",
      "references": []
    }
  },
  {
    "id": 54,
    "section": "ui",
    "focus": "familiar",
    "group": "visualforce",
    "stem": [
      "Universal Containers wants a list button to display a Visualforce page that allows users to edit multiple records.",
      {
        "ask": "Which Visualforce feature supports this requirement?"
      }
    ],
    "choices": [
      "Standard Controller with Custom List Controller extension",
      "Custom List Controller with recorasetvar page attribute",
      "Controller Extension and <spex:listButton> tag",
      "Standard controller and the recordsetvar page attribute"
    ],
    "answer": "D",
    "why": "A standardController with recordSetVar selects the standard list-controller behavior for handling multiple records.",
    "wrong": {
      "A": "Standard controllers can be extended, but using recordSetVar is the direct and best-supported method for this scenario.",
      "B": "Custom controllers can handle lists, but recordSetVar activates the standard list controller rather than a custom controller.",
      "C": "apex:listButton is not a Visualforce component. The standard list-controller capability is enabled by recordSetVar."
    },
    "notes": [
      "The associated Apex type is ApexPages.StandardSetController. Extensions can customize it, and custom list-handling controllers are possible; recordSetVar is what activates the built-in list controller."
    ],
    "source": {
      "stem": [
        "Universal Containers wants a list button to display a Visualforce page that allows users to edit multiple records.",
        {
          "ask": "Which Visualforce feature supports this requirement?"
        }
      ],
      "choices": [
        "Standard Controller with Custom List Controller extension",
        "Custom List Controller with recorasetvar page attribute",
        "Controller Extension and <spex:listButton> tag",
        "Standard controller and the recordsetvar page attribute"
      ],
      "answer": "D"
    },
    "printed": "D",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Normalize recordSetVar and the malformed listButton distractor. Original wording and choices are retained; the source key remains accepted. A standardController with recordSetVar selects the standard list-controller behavior for handling multiple records.",
      "references": []
    }
  },
  {
    "id": 55,
    "section": "ui",
    "focus": "familiar",
    "group": "visualforce",
    "stem": [
      {
        "ask": "How is a controller and extension specified for a custom object named 'Notice' on a Visualforce page?"
      }
    ],
    "choices": [
      {
        "code": "<apex:page standardController=\"Notice__c\" extensions=\"myControllerExtension\">"
      },
      {
        "code": "<apex:page controllers=\"Notice__c, myControllerExtension\">"
      },
      {
        "code": "<apex:page Notice extends=\"myControllerExtension\">"
      },
      {
        "code": "<apex:page controller=\"Notice__c\" extensions=\"myControllerExtension\">"
      }
    ],
    "answer": "A",
    "why": "standardController=\"Notice__c\" selects the custom object’s built-in controller, while extensions=\"myControllerExtension\" attaches the Apex extension class.",
    "wrong": {
      "B": "Controllers is not a page attribute, and it would not name the object.",
      "C": "That markup is not a Visualforce page.",
      "D": "Controller= names an Apex class. The object belongs in standardController."
    },
    "notes": [
      "A standard-controller extension normally receives ApexPages.StandardController in its constructor. controller names a custom Apex controller class, not an sObject API name. A custom controller can also have extensions, but that is not how this object’s standard controller is selected."
    ],
    "printed": "D",
    "source": {
      "stem": [
        {
          "ask": "How is a controller and extension specified for a custom object named 'Notice' on a Visualforce page?"
        }
      ],
      "choices": [
        {
          "code": "<apex:page standardController=\"Notice__c\" extensions=\"myControllerExtension\">"
        },
        {
          "code": "<apex:page controllers=\"Notice__c, myControllerExtension\">"
        },
        {
          "code": "<apex:page Notice extends=\"myControllerExtension\">"
        },
        {
          "code": "<apex:page controller=\"Notice__c\" extensions=\"myControllerExtension\">"
        }
      ],
      "answer": "D"
    },
    "corrected": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "standardController=\"Notice__c\" selects the custom object’s built-in controller, while extensions=\"myControllerExtension\" attaches the Apex extension class.",
      "references": []
    }
  },
  {
    "id": 56,
    "section": "fundamentals",
    "focus": "high",
    "group": "platform",
    "stem": [
      "Universal Containers wants to assess the advantages of declarative development versus programmatic customization for specific use cases in its Salesforce implementation.",
      {
        "ask": "What are two characteristics of declarative development over programmatic customization?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Declarative development does not require Apex test classes.",
      "Declarative development has higher design limits and query limits,",
      "Declarative development can be done using the Setup menu.",
      "Declarative code logic does not require maintenance or review."
    ],
    "answer": "A,C",
    "type": "multi",
    "why": "Point-and-click declarative customizations are configured in Setup and do not inherently require writing Apex test classes.",
    "wrong": {
      "B": "Declarative automation remains subject to platform limits and can share the same transaction with Apex; no general higher-limit rule applies.",
      "D": "Declarative logic still requires maintenance, especially as business needs evolve."
    },
    "notes": [
      "They still need behavior testing and maintenance. Flows share relevant transaction limits with Apex; declarative tools do not generally have higher or uniformly lower governor limits. Some flow activation/deployment settings can impose flow coverage requirements, which is separate from saying every declarative change needs an Apex test class."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Point-and-click declarative customizations are configured in Setup and do not inherently require writing Apex test classes.",
      "references": []
    }
  },
  {
    "id": 57,
    "section": "testing",
    "focus": "must",
    "group": "tests",
    "stem": [
      "A developer wrote Apex code that calls out to an external system using REST API.",
      {
        "ask": "How should a developer write the test to prove the code is working as intended?"
      }
    ],
    "choices": [
      "Write a class that implements HTTPcalloutMock.",
      "Write a class that extends webserviceloo.",
      "Write a class that implements webservicemock.",
      "Write a class that extends HTTPcalloutMock."
    ],
    "answer": "A",
    "why": "Implement HttpCalloutMock and register it with Test.setMock(HttpCalloutMock.class, mockInstance), then exercise and assert the REST-callout behavior.",
    "wrong": {
      "B": "The printed webserviceloo name is not a supported mock API; SOAP mocking uses WebServiceMock, which is implemented rather than extended.",
      "C": "WebServiceMock is for SOAP callouts. An HTTP callout test implements HttpCalloutMock.",
      "D": "There is no concept of extending HttpCalloutMock. It is implemented, not extended."
    },
    "notes": [
      "The respond(HttpRequest) implementation returns a controlled HttpResponse. Assert request details and application behavior for success and error responses; the unit test should not depend on a live REST endpoint. WebServiceMock is the SOAP counterpart."
    ],
    "source": {
      "stem": [
        "A developer wrote Apex code that calls out to an external system using REST API.",
        {
          "ask": "How should a developer write the test to prove the code is working as intended?"
        }
      ],
      "choices": [
        "Write a class that implements HTTPcalloutMock.",
        "Write a class that extends webserviceloo.",
        "Write a class that implements webservicemock.",
        "Write a class that extends HTTPcalloutMock."
      ],
      "answer": "A"
    },
    "printed": "A",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Restore WebServiceMock and distinguish interfaces for HTTP and SOAP mocks. Original wording and choices are retained; the source key remains accepted. Implement HttpCalloutMock and register it with Test.setMock(HttpCalloutMock.class, mockInstance), then exercise and assert the REST-callout behavior.",
      "references": []
    }
  },
  {
    "id": 58,
    "section": "automation",
    "focus": "familiar",
    "group": "security",
    "stem": [
      {
        "ask": "Which two settings must be defined In order to update a record of a junction object?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Read/Write access on the secondary relationship",
      "Read/Write access on the primary relationship",
      "Read/Write access on the junction object",
      "Read access on the primary relationship"
    ],
    "answer": "A,B",
    "type": "multi",
    "why": "A and B. The intended pair is Read/Write access on both the secondary and primary master-detail relationships. Junction-record sharing depends on both associated masters; primary-master access alone does not cover the secondary relationship.",
    "wrong": {
      "C": "A junction record's sharing is controlled by its two masters rather than an independently defined junction-record sharing setting. Object-level Read/Edit permissions still apply, but they are a separate permission layer from the two relationship settings asked for.",
      "D": "Read access alone does not satisfy a primary relationship whose Sharing Setting requires Read/Write. B supplies the intended primary-relationship setting, paired with A for the secondary relationship."
    },
    "notes": [
      "This mock tests the Read/Write relationship-sharing case described in Salesforce's junction-object example: Read/Write access is required on both associated masters when both relationship Sharing Settings require it.",
      "In an actual org, inspect each master-detail field's Sharing Setting. A relationship can instead allow detail updates with Read access to its master, and editing the detail also requires object-level Edit permission. The minimum master-record access therefore depends on the configured settings.",
      "Primary status determines features such as inherited ownership and appearance; sharing access still depends on both masters.",
      "Salesforce reference: Junction sharing and relationships — https://help.salesforce.com/s/articleView?id=platform.relationships_considerations.htm&language=en_US&type=5",
      "Salesforce reference: Custom Object Security — https://help.salesforce.com/s/articleView?id=platform.dev_security.htm&language=en_US&type=5"
    ],
    "source": {
      "stem": [
        {
          "ask": "Which two settings must be defined In order to update a record of a junction object?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "Read/Write access on the secondary relationship",
        "Read/Write access on the primary relationship",
        "Read/Write access on the junction object",
        "Read access on the primary relationship"
      ],
      "answer": "B,C"
    },
    "printed": "B,C",
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "Scoring restored with corrected key A,B: Read/Write on the secondary and primary relationships. FreeCram's B,C and the Trailblazer Community's A,B select these same option texts in different orders. Salesforce's documentation supports this Read/Write junction-sharing case. The earlier Not scored decision over-weighted configurable Read-only thresholds; those are explained as configuration caveats while the intended pair is scored. Original wording and choices are unchanged, and the DOCX key B,C remains in source history.",
      "references": [
        "https://help.salesforce.com/s/articleView?id=platform.relationships_considerations.htm&language=en_US&type=5",
        "https://help.salesforce.com/s/articleView?id=platform.dev_security.htm&language=en_US&type=5",
        "https://www.freecram.com/discussions/Salesforce/exam-pdi-topic-4-question-13-discussion-p1115742.html",
        "https://trailhead.salesforce.com/trailblazer-community/feed/0D54V00007Vh2LASAZ",
        "https://www.examtopics.com/discussions/salesforce/view/402845-exam-certified-platform-developer-topic-1-question-115/"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "resolved",
        "queries": [
          "\"settings must be defined\" \"junction object\""
        ],
        "candidates": [
          "https://www.freecram.com/discussions/Salesforce/exam-pdi-topic-4-question-13-discussion-p1115742.html",
          "https://trailhead.salesforce.com/trailblazer-community/feed/0D54V00007Vh2LASAZ",
          "https://www.examtopics.com/discussions/salesforce/view/402845-exam-certified-platform-developer-topic-1-question-115/"
        ],
        "assessment": "Scoring restored with corrected key A,B: Read/Write on the secondary and primary relationships. FreeCram's B,C and the Trailblazer Community's A,B select these same option texts in different orders. Salesforce's documentation supports this Read/Write junction-sharing case. The earlier Not scored decision over-weighted configurable Read-only thresholds; those are explained as configuration caveats while the intended pair is scored. Original wording and choices are unchanged, and the DOCX key B,C remains in source history."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "not-scored",
        "decision": "key-corrected",
        "reason": "Scoring restored with corrected key A,B: Read/Write on the secondary and primary relationships. FreeCram's B,C and the Trailblazer Community's A,B select these same option texts in different orders. Salesforce's documentation supports this Read/Write junction-sharing case. The earlier Not scored decision over-weighted configurable Read-only thresholds; those are explained as configuration caveats while the intended pair is scored. Original wording and choices are unchanged, and the DOCX key B,C remains in source history."
      }
    },
    "choose": 2,
    "corrected": true
  },
  {
    "id": 59,
    "section": "automation",
    "focus": "must",
    "group": "language",
    "stem": [
      {
        "ask": "What are three considerations when using the @InvocableMethod annotation in Apex?"
      },
      {
        "ask": "Choose 3 answers"
      }
    ],
    "choices": [
      "Only one method using the @InvocableMethod annotation can be defined per Apex class.",
      "A method using the @InvocableMethod annotation can have multiple input parameters.",
      "A method using the @InvocableMethod annotation must be declared as static,",
      "A method using the @InvocableMethod annotation must define a return value.",
      "A method using the @invocableMethod annotation can be declared as Public or Global."
    ],
    "answer": "A,C,E",
    "type": "multi",
    "why": "An invocable method is static, public or global, and only one method per Apex class can carry @InvocableMethod.",
    "wrong": {
      "B": "An invocable method may accept at most one input parameter, rather than arbitrary multiple formal parameters.",
      "D": "An invocable method does not have to return a value."
    },
    "notes": [
      "It may have zero or one input parameter, using a supported list shape when present, and it may return void. User-defined inputs expose supported fields with @InvocableVariable. Check current API requirements such as accessible constructors for wrapper types."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "An invocable method is static, public or global, and only one method per Apex class can carry @InvocableMethod.",
      "references": []
    }
  },
  {
    "id": 60,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      {
        "ask": "Which two are best practices when it comes to Aura component and application event handling?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Try to use application events as opposed to component events.",
      "Reuse the event logic in a component bundle, by putting the logic in the helper.",
      "Use component events to communicate actions that should be handled at the application level.",
      "Handle low-level events in the event handler and re-fire them as higher-level events."
    ],
    "answer": "B,D",
    "type": "multi",
    "why": "Put reusable Aura event logic in the helper, and translate implementation-level events into meaningful higher-level events at component boundaries.",
    "wrong": {
      "A": "Application events are not the first choice for logic that should be reused locally.",
      "C": "A component event is scoped to its containment hierarchy; this option incorrectly treats it as the general application-wide broadcast mechanism."
    },
    "notes": [
      "Use the narrowest suitable communication mechanism and avoid unnecessarily broadcasting application events. Component events can bubble through their containment hierarchy; use application events or Lightning Message Service when the communication scope actually requires them."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Put reusable Aura event logic in the helper, and translate implementation-level events into meaningful higher-level events at component boundaries.",
      "references": []
    }
  },
  {
    "id": 61,
    "section": "automation",
    "focus": "high",
    "group": "triggers",
    "stem": [
      {
        "ask": "Which two operations affect the number of times a trigger can fire?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Criteria-based sharing calculations",
      "Email messages",
      "Roll-up summary fields",
      "After-save record-triggered flow"
    ],
    "answer": "C,D",
    "type": "multi",
    "why": "C and D. A changed roll-up can cause the parent save pipeline to run, and an after-save flow can perform record updates that invoke triggers again.",
    "wrong": {
      "A": "Sharing recalculation updates access; it does not itself execute a record DML trigger as a normal record update.",
      "B": "Sending an email notification does not itself rerun the triggering record’s Apex trigger."
    },
    "notes": [
      "After-save flows do not always cause another trigger run; it depends on their record operations. Inserting an EmailMessage record is a distinct DML operation from sending the email notification meant by this distractor.",
      "Reference: https://developer.salesforce.com/ja/wiki/apex_code_best_practices",
      "Reference: https://help.salesforce.com/s/articleView?id=000386831&language=en_US&type=1",
      "Reference: https://help.salesforce.com/s/articleView?id=platform.flow_concepts_trigger_record.htm&language=en_US&type=5"
    ],
    "source": {
      "stem": [
        {
          "ask": "Which two operations affect the number of times a trigger can fire?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "Criteria-based sharing calculations",
        "Email messages",
        "Roll-up summary fields",
        "After-save record-triggered flow"
      ],
      "answer": "C,D"
    },
    "printed": "C,D",
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Scoring restored: roll-up-driven parent updates and DML from after-save flows can cause additional trigger execution. The question asks what can affect firing counts, not whether every configured flow necessarily performs DML; the earlier review made that unwarranted requirement.",
      "references": [
        "https://certempire.com/practice-tests/free-crt-450-practice-questions/",
        "https://developer.salesforce.com/ja/wiki/apex_code_best_practices",
        "https://help.salesforce.com/s/articleView?id=000386831&language=en_US&type=1",
        "https://help.salesforce.com/s/articleView?id=platform.flow_concepts_trigger_record.htm&language=en_US&type=5"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "resolved",
        "queries": [
          "\"Which two operations affect\" \"trigger can fire\""
        ],
        "candidates": [
          "https://certempire.com/practice-tests/free-crt-450-practice-questions/"
        ],
        "assessment": "Scoring restored: roll-up-driven parent updates and DML from after-save flows can cause additional trigger execution. The question asks what can affect firing counts, not whether every configured flow necessarily performs DML; the earlier review made that unwarranted requirement."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "not-scored",
        "decision": "scoring-restored",
        "reason": "Scoring restored: roll-up-driven parent updates and DML from after-save flows can cause additional trigger execution. The question asks what can affect firing counts, not whether every configured flow necessarily performs DML; the earlier review made that unwarranted requirement."
      }
    },
    "choose": 2
  },
  {
    "id": 62,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      "A developer must perform a complex SOQL query that joins two objects in a Lightning component.",
      {
        "ask": "How can the Lightning component execute the query?"
      }
    ],
    "choices": [
      "Write the query in a custom Lightning web component wrapper and invoke from the Lightning component.",
      "Invoke an Apex class with the method annotated as @AuraEnabled to perform the query.",
      "Use the Salesforce Streaming APL to perform the SOQL query.",
      "Create a flow to execute the query end invoke from the Lightning component."
    ],
    "answer": "B",
    "why": "Expose a static Apex method with @AuraEnabled, execute the relationship query on the server, and return a suitable result to the component.",
    "wrong": {
      "A": "The SOQL does not belong in the component wrapper.",
      "C": "The Streaming API does not run this SOQL query.",
      "D": "Flow Get Records is not a direct arbitrary-SOQL execution interface for the component; expose the custom relationship query through Apex."
    },
    "notes": [
      "SOQL uses relationship traversals/subqueries rather than arbitrary SQL joins. Lightning Data Service and GraphQL may meet some collection requirements, but the listed direct mechanism for this custom Apex query is the annotated method. Apply the required access checks."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Expose a static Apex method with @AuraEnabled, execute the relationship query on the server, and return a suitable result to the component.",
      "references": []
    }
  },
  {
    "id": 63,
    "section": "automation",
    "focus": "must",
    "group": "limits",
    "stem": [
      {
        "ask": "If Apex code executes inside the execute() method of an Apex class when implementing the Batchable interface, which two statements are true regarding governor limits?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "The Apex governor limits are reset for each iteration of the execute () method.",
      "The Apex governor limits cannot be exceeded due to the asynchronaus nature of the transaction.",
      "The Apex governor limits will use the asynchronous limit levels.",
      "The Apex governor limits are omitted while calling the constructor of the Apex class."
    ],
    "answer": "A,C",
    "type": "multi",
    "why": "Each Batch Apex execute invocation is a separate transaction with fresh applicable asynchronous governor limits.",
    "wrong": {
      "B": "Asynchronous work can still exceed governor limits.",
      "D": "Calling the constructor does not remove governor limits."
    },
    "notes": [
      "Not every limit is higher in async Apex: DML statements and DML rows still have transaction ceilings, and org-wide asynchronous quotas also apply. Constructor work uses the context where the batch is instantiated; it does not run free of limits."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Each Batch Apex execute invocation is a separate transaction with fresh applicable asynchronous governor limits.",
      "references": []
    }
  },
  {
    "id": 64,
    "section": "automation",
    "focus": "high",
    "group": "limits",
    "stem": [
      {
        "ask": "What is the result of the following code snippet?"
      },
      {
        "code": [
          "public void doWork(Account acct) {",
          "      for (Integer i = 0; i <= 200; i++) {",
          "          insert acct;",
          "      }",
          "  }"
        ]
      }
    ],
    "choices": [
      "200 Accounts are inserted.",
      "1 Account is inserted.",
      "201 Accounts are inserted.",
      "0 Accounts are inserted."
    ],
    "answer": "D",
    "why": "D. Zero new Accounts remain committed. If the first insert succeeds, it populates acct.Id; the next iteration tries to insert that same Account again and throws a DmlException. With no exception handler shown, the transaction rolls back, including the first insert.",
    "wrong": {
      "A": "The loop reuses the same Account instead of creating 200 distinct Accounts, and its unhandled failure rolls back the transaction.",
      "B": "The first insert can succeed temporarily, but it is rolled back when the subsequent insert fails without being handled.",
      "C": "The inclusive loop would attempt 201 iterations, but reinserting the same Account fails before it completes."
    },
    "notes": [
      "Each successful insert assigns an Id to the same sObject instance. Calling insert again on that instance is invalid; this example fails before reaching the 150-DML-statement governor limit.",
      "If acct already has an Id or is otherwise invalid, an earlier insert fails instead. Under the unhandled-transaction reading, no new Accounts are committed. An outer caller that catches the exception could change the outcome; no such handler is supplied.",
      "Reference: https://trailhead.salesforce.com/content/learn/modules/apex_database/apex_database_dml"
    ],
    "printed": "D",
    "source": {
      "stem": [
        {
          "ask": "What is the result of the following code snippet?"
        },
        {
          "code": [
            "public void doWork(Account acct) {",
            "      for (Integer i = 0; i <= 200; i++) {",
            "          insert acct;",
            "      }",
            "  }"
          ]
        }
      ],
      "choices": [
        "Accounts are inserted.",
        "Account is inserted.",
        "200 Accounts are inserted.",
        "201 Accounts are inserted."
      ],
      "answer": "D"
    },
    "review": {
      "date": "2026-10-17",
      "treatment": "online-recovery",
      "reason": "Scoring restored with D after recovering the damaged numeric choices as A=200, B=1, C=201, D=0. The user-provided Examtopics option list is independently corroborated by the matching Daypo question; Examtopics itself was inaccessible to the research tool. Reinserting the same Account raises an unhandled DML error and rolls back the transaction. The original method, source snapshot and key D are retained, with all choice changes displayed.",
      "references": [
        "https://trailhead.salesforce.com/content/learn/modules/apex_database/apex_database_dml",
        "https://www.examtopics.com/discussions/salesforce/view/343253-exam-crt-450-topic-1-question-302-discussion/",
        "https://www.daypo.com/pd1-4.html",
        "https://www.pass4success.com/salesforce/discussions/exam-dex-450-topic-6-question-119-discussion"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "resolved",
        "queries": [
          "\"doWork(Account acct)\" \"201\""
        ],
        "candidates": [
          "https://www.examtopics.com/discussions/salesforce/view/343253-exam-crt-450-topic-1-question-302-discussion/",
          "https://www.daypo.com/pd1-4.html",
          "https://www.pass4success.com/salesforce/discussions/exam-dex-450-topic-6-question-119-discussion"
        ],
        "assessment": "Scoring restored with D after recovering the damaged numeric choices as A=200, B=1, C=201, D=0. The user-provided Examtopics option list is independently corroborated by the matching Daypo question; Examtopics itself was inaccessible to the research tool. Reinserting the same Account raises an unhandled DML error and rolls back the transaction. The original method, source snapshot and key D are retained, with all choice changes displayed."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "not-scored",
        "decision": "scoring-restored",
        "reason": "Scoring restored with D after recovering the damaged numeric choices as A=200, B=1, C=201, D=0. The user-provided Examtopics option list is independently corroborated by the matching Daypo question; Examtopics itself was inaccessible to the research tool. Reinserting the same Account raises an unhandled DML error and rolls back the transaction. The original method, source snapshot and key D are retained, with all choice changes displayed."
      }
    },
    "type": "single",
    "repaired": true,
    "repair": "Recovered the four numeric answer choices in the supplied published sequence: A = 200, B = 1, C = 201, D = 0. The DOCX-derived list omitted A/B counts and contained a different C/D sequence. The original code and answer key D are unchanged.",
    "repairNotes": [
      "The user supplied the Examtopics option text. That page could not be read by the research tool; an accessible matching Daypo mock independently contains the same code and the complete 200 / 1 / 201 / 0 option sequence. The Original comparison retains the damaged DOCX-derived list.",
      "User-supplied comparison: https://www.examtopics.com/discussions/salesforce/view/343253-exam-crt-450-topic-1-question-302-discussion/",
      "Matching published option list: https://www.daypo.com/pd1-4.html",
      "Salesforce DML and transaction behavior: https://trailhead.salesforce.com/content/learn/modules/apex_database/apex_database_dml"
    ]
  },
  {
    "id": 65,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      "A developer must create a Lightning component that allows users to input Contact record information to create a Contact record, including a Salary__c custom field.",
      {
        "ask": "What should the developer use, along with a lightning-record-edit-form, so that Salary__c field functions as a currency input and is only viewable and editable by users that have the correct field-level permissions on Salary__c?"
      }
    ],
    "choices": [
      {
        "code": [
          "<lightning-input type='number' value='Salary__c' formatter='currency'>",
          "  </lightning-input>"
        ]
      },
      {
        "code": [
          "<lightning-formatted-number value='Salary__c' format-style='currency'>",
          "  </lightning-formatted-number>"
        ]
      },
      {
        "code": [
          "<lightning-input-field field-name='Salary__c'>",
          "  </lightning-input-field>"
        ]
      },
      {
        "code": [
          "<lightning-input-currency value='Salary__c'>",
          "  </lightning-input-currency>"
        ]
      }
    ],
    "answer": "C",
    "why": "Use lightning-input-field field-name=\"Salary__c\" inside lightning-record-edit-form so field metadata selects currency input behavior and LDS enforces field permissions.",
    "wrong": {
      "A": "Lightning-input does not bind Salary__c or enforce field security by itself.",
      "B": "Lightning-formatted-number only displays a value.",
      "D": "Lightning-input-currency is not the field component inside a record edit form."
    },
    "notes": [
      "A lightning-input can format a number as currency but does not itself know the field’s permissions or save binding. lightning-formatted-number is display-only. Use lightning-messages to show form errors."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Use lightning-input-field field-name=\"Salary__c\" inside lightning-record-edit-form so field metadata selects currency input behavior and LDS enforces field permissions.",
      "references": []
    }
  },
  {
    "id": 66,
    "section": "testing",
    "focus": "high",
    "group": "tests",
    "stem": [
      "A developer wants to get access to the standard price book in the org while writing a test class that covers an OpportunityLineItem trigger.",
      {
        "ask": "Which method allows access to the price book?"
      }
    ],
    "choices": [
      "Use Test.getStandardPricebookId() to get the standard price book ID.",
      "Use @isTest(SeeAllData=true) and delete the existing standard price book.",
      "Use @TestVisible to allow the test method to see the standard price book.",
      "Use Test.loadData() and a static resource to load a standard price book."
    ],
    "answer": "A",
    "why": "Test.getStandardPricebookId() provides the standard Pricebook2 Id in an isolated Apex test without SeeAllData=true.",
    "wrong": {
      "B": "Deleting the price book does not provide its usable ID. Test.getStandardPricebookId() supplies the ID without relying on SeeAllData=true.",
      "C": "@TestVisible exposes otherwise private/protected Apex members to tests; it does not provide access to standard price book data.",
      "D": "Test.loadData() loads test data from static resources but is unnecessary for accessing the Standard Price Book."
    },
    "notes": [
      "Create test Product2 and standard PricebookEntry records with the required activation/pricing fields before creating an OpportunityLineItem. Having the price book Id is not enough to satisfy the line’s product/pricebook prerequisites."
    ],
    "source": {
      "stem": [
        "A developer wants to get access to the standard price book in the org while writing a test class that covers an OpportunityLineItem trigger.",
        {
          "ask": "Which method allows access to the price book?"
        }
      ],
      "choices": [
        "Use Test.getStandardPricebookId() to get the standard price book ID.",
        "Use @isTest(SeeAllData=true) and delete the existing standard price book.",
        "Use @TestVisible to allow the test method to see the standard price book.",
        "Use Test.loadData() and a static resource to load a standard price book."
      ],
      "answer": "A"
    },
    "printed": "A",
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Test.getStandardPricebookId() provides the standard Pricebook2 Id in an isolated Apex test without SeeAllData=true.",
      "references": []
    }
  },
  {
    "id": 67,
    "section": "testing",
    "focus": "high",
    "group": "limits",
    "stem": [
      "A Developer Edition org has five existing accounts. A developer wants to add 10 more accounts for testing purposes.",
      "The following code is executed in the Developer Console using the Execute Anonymous window:",
      {
        "code": [
          "Account myAccount = new Account(Name = 'MyAccount');",
          "  insert myAccount;"
        ]
      },
      {
        "code": [
          "Integer x = 1;",
          "  List<Account> newAccounts = new List<Account>();",
          "  do {",
          "      Account acct = new Account(Name = 'New Account ' + x++);",
          "      newAccounts.add(acct);",
          "  } while (x < 10);"
        ]
      },
      {
        "ask": "How many total accounts will be in the org after this code is executed?"
      }
    ],
    "choices": [
      "5",
      "6",
      "10",
      "15"
    ],
    "answer": "B",
    "why": "Only insert myAccount performs DML. The do/while creates nine in-memory Accounts but never inserts their list, so five existing plus one new Account gives six.",
    "wrong": {
      "A": "5 ignores the Account that insert myAccount commits.",
      "C": "The nine Accounts in the list are not inserted, and 10 is not the resulting total.",
      "D": "15 assumes extra persisted records that the shown code never inserts."
    },
    "notes": [
      "The post-increment uses suffixes 1 through 9; when x reaches 10, the condition fails. Adding an sObject to a List is not persistence. The existing source image confirms there is no insert newAccounts statement."
    ],
    "printed": "D",
    "source": {
      "stem": [
        "A Developer Edition org has five existing accounts. A developer wants to add 10 more accounts for testing purposes.",
        "The following code is executed in the Developer Console using the Execute Anonymous window:",
        {
          "code": [
            "Account myAccount = new Account(Name = 'MyAccount');",
            "  insert myAccount;"
          ]
        },
        {
          "code": [
            "Integer x = 1;",
            "  List<Account> newAccounts = new List<Account>();",
            "  do {",
            "      Account acct = new Account(Name = 'New Account ' + x++);",
            "      newAccounts.add(acct);",
            "  } while (x < 10);"
          ]
        },
        {
          "ask": "How many total accounts will be in the org after this code is executed?"
        }
      ],
      "choices": [
        "5",
        "6",
        "10",
        "15"
      ],
      "answer": "D"
    },
    "corrected": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "Only insert myAccount performs DML. The do/while creates nine in-memory Accounts but never inserts their list, so five existing plus one new Account gives six.",
      "references": []
    }
  },
  {
    "id": 68,
    "section": "automation",
    "focus": "high",
    "group": "integration",
    "stem": [
      "A PrimaryId__c custom field exists on the Candidate__c custom object. The field is used to store each candidate's id number and is marked as Unique in the schema definition.",
      "As part of a data enrichment process, Universal Containers has a CSV file that contains updated data for all candidates in the system. The file contains each Candidate's primary .. as a data point. Universal Containers wants to upload this information into Salesforce, while ensuring all data rows are correctly mapped to a candidate in the system.",
      {
        "ask": "Which technique should the developer implement to streamline the data upload?"
      }
    ],
    "choices": [
      "Upload the CSV into-a custom object related to candidate__c.",
      "Create a before insert trigger to correctly map the records,",
      "Update the PrimaryId__c field definition to mark it as an External ID.",
      "Create a before save flow to correctly map the records."
    ],
    "answer": "C",
    "why": "Mark the unique candidate identifier as an External ID and configure the import/upsert to use it for matching.",
    "wrong": {
      "A": "Upload the CSV into a custom object related to Candidate__c: This approach unnecessarily introduces another object, adding complexity. The goal is to update existing Candidate__c records, not store the data in a separate object.",
      "B": "Create a before insert trigger to correctly map the records: Using triggers for this purpose is overengineering. Salesforce already provides tools like upsert for this exact use case. Writing a trigger would require additional effort and could introduce unintended errors or performance issues.",
      "D": "Create a before save flow to correctly map the records: While flows are powerful, they are not the optimal solution for this use case. Data mapping is better handled using an external ID during import to ensure proper matching and updates."
    },
    "notes": [
      "Unique prevents duplicate key values; External ID supplies an integration matching key. Keep its normalization/case-sensitivity consistent with the source. A trigger is unnecessary for the matching operation when the import tool already supports external IDs."
    ],
    "source": {
      "stem": [
        "A Primaryld_c custom field exists on the Candidate _c custom object. The field is used to store each candidate's id number and is marked as Unique in the schema definition.",
        "As part of a data enrichment process, Universal Containers has a CSV file that contains updated data for all candidates in the system. The file contains each Candidate's primary .. as a data point. Universal Containers wants to upload this information into Salesforce, while ensuring all data rows are correctly mapped to a candidate in the system.",
        {
          "ask": "Which technique should the developer implement to streamline the data upload?"
        }
      ],
      "choices": [
        "Upload the CSV into-a custom object related to candidate__c.",
        "Create a before insert trigger to correctly map the records,",
        "Update the Primarytd_c field definition to mark it. as.an External Id.",
        "Create a before save flow to correctly map the records."
      ],
      "answer": "C"
    },
    "printed": "C",
    "repaired": true,
    "repair": "Normalize the damaged candidate identifier and custom-object API names only; preserve the existing CSV-matching scenario and choices. The import must still be configured to match/upsert by that External ID.",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Normalize the damaged candidate identifier and custom-object API names only; preserve the existing CSV-matching scenario and choices. The import must still be configured to match/upsert by that External ID.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "The identifier repairs agree with the candidate matching context; External ID remains the native import/upsert matching mechanism."
      }
    }
  },
  {
    "id": 69,
    "section": "automation",
    "focus": "familiar",
    "group": "triggers",
    "stem": [
      "The Account object in an organization has a master-detail relationship to a child object called Branch. The following automations exist:",
      "* Roll-up summary fields",
      "* Custom validation rules",
      "* Duplicate rules",
      "developer created a trigger on the Account object.",
      {
        "ask": "Which two things should the developer consider while testing the trigger code?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Rollup summary fields can cause the parent record to go through Save.",
      "Duplicate rules are executed once all DML operations commit to the database.",
      "The trigger may fire multiple times during a transaction.",
      "The validation rules will cause the trigger to fire again."
    ],
    "answer": "A,C",
    "type": "multi",
    "why": "Roll-up summary changes can save the Account parent, and the Account trigger may therefore be invoked repeatedly within a transaction.",
    "wrong": {
      "B": "Duplicate rules are executed once all DML operations commit to the database: This is incorrect because duplicate rules execute before the DML operation is committed. Duplicate rules prevent duplicate records from being created or updated before the database operation occurs.",
      "D": "The validation rules will cause the trigger to fire again: This is incorrect because validation rules do not cause triggers to fire again. Validation rules validate the record and may prevent DML operations, but they do not independently re-trigger the Apex trigger."
    },
    "notes": [
      "Duplicate rules and validation rules run before commit; a validation rule rejects an invalid save rather than independently launching another save. Prefer changes-based/idempotent logic over a single static Boolean that can skip later legitimate bulk chunks."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Roll-up summary changes can save the Account parent, and the Account trigger may therefore be invoked repeatedly within a transaction.",
      "references": []
    }
  },
  {
    "id": 70,
    "section": "automation",
    "focus": "familiar",
    "group": "model",
    "stem": [
      "A developer is creating a page that allows users to create multiple Opportunities. The developer is asked to verify the current user's default Opportunity record type, and set certain default values based on the record type before inserting the record.",
      {
        "ask": "How can the developer find the current user's default record type?"
      }
    ],
    "choices": [
      "Create the Opportunity and check Opportunity.RecordTypeId, which will hold the current user's default record type, before inserting.",
      "Query the Profile where the Id equals UserInfo.getProfileId(), then call Profile.Opportunity.getDefaultRecordType().",
      "Call Schema.UserInfo.Opportunity.getDefaultRecordType().",
      "Call Opportunity.SObjectType.getDescribe().getRecordTypeInfos() and iterate until isDefaultRecordTypeMapping() is true."
    ],
    "answer": "D",
    "why": "Describe Opportunity record types and select the RecordTypeInfo for which isDefaultRecordTypeMapping() is true for the current user.",
    "wrong": {
      "A": "The default record type is not reliably available on a new Opportunity before insert.",
      "B": "Profile has no Opportunity.getDefaultRecordType() method.",
      "C": "Schema.UserInfo.Opportunity.getDefaultRecordType() is not a real method."
    },
    "notes": [
      "RecordTypeInfo describes metadata; it is not a query against Opportunity records. Do not assume that new Opportunity() has already populated its default RecordTypeId. Respect record type availability when building a creation UI."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Describe Opportunity record types and select the RecordTypeInfo for which isDefaultRecordTypeMapping() is true for the current user.",
      "references": []
    }
  },
  {
    "id": 71,
    "section": "automation",
    "focus": "familiar",
    "group": "flows",
    "stem": [
      "A company decides to implement a new process where every time an Opportunity is created, a follow up Task should be created and assigned to the Opportunity Owner.",
      {
        "ask": "What is the most efficient way for a developer to implement this?"
      }
    ],
    "choices": [
      "Apex trigger on Task",
      "Task actions",
      "Auto-launched flow on Task",
      "Record-triggered flow on Opportunity"
    ],
    "answer": "D",
    "why": "Use an after-save record-triggered flow on Opportunity creation and Create Records to insert the Task with OwnerId set from the Opportunity.",
    "wrong": {
      "A": "A trigger on Task runs after the Task exists. It does not create the Task from the Opportunity.",
      "B": "Task actions are not the automation that creates this Task.",
      "C": "A flow on Task runs too late. The Opportunity change is what should create the Task."
    },
    "notes": [
      "An after-save flow has the new Opportunity Id available for the Task WhatId. A before-save flow is for changing the triggering record itself and cannot create this related Task."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Use an after-save record-triggered flow on Opportunity creation and Create Records to insert the Task with OwnerId set from the Opportunity.",
      "references": []
    }
  },
  {
    "id": 72,
    "section": "automation",
    "focus": "familiar",
    "group": "triggers",
    "stem": [
      "A developer needs to prevent the creation of Request__c records when certain conditions exist in the system. A RequestLogic class exists that checks the conditions.",
      {
        "ask": "What is the correct implementation?"
      }
    ],
    "choices": [
      {
        "code": [
          "trigger RequestTrigger on Request__c (before insert) {",
          "      RequestLogic.validateRecords(Trigger.new);",
          "  }"
        ]
      },
      {
        "code": [
          "trigger RequestTrigger on Request__c (before insert) {",
          "      RequestLogic.validateRecords(trigger.new);",
          "  }"
        ]
      },
      {
        "code": [
          "trigger RequestTrigger on Request__c (before insert) {",
          "      if (RequestLogic.isValid(Request__c)) {",
          "          Request.addError('Your request cannot be created at this time.');",
          "      }",
          "  }"
        ]
      },
      {
        "code": [
          "trigger RequestTrigger on Request__c (after insert) {",
          "      if (RequestLogic.isValid(Request__c)) {",
          "          Request.addError('Your request cannot be created at this time.');",
          "      }",
          "  }"
        ]
      }
    ],
    "answer": "A,B",
    "why": "A and B perform the same call because Apex identifiers are case-insensitive. Either single selection is accepted for the duplicated source choices.",
    "wrong": {
      "C": "Request__c is an sObject type rather than the record collection expected here, and Request is not a defined trigger record.",
      "D": "After-insert addError can reject the insert, but this option still has invalid record references and does not call the stated validator correctly."
    },
    "notes": [
      "The assumed validateRecords method must call addError on invalid Trigger.new records. Both before and after triggers can reject their triggering DML with addError before commit. C/D also misuse a type name and an undefined Request reference."
    ],
    "source": {
      "stem": [
        "A developer needs to prevent the creation of Request__c records when certain conditions exist in the system. A RequestLogic class exists that checks the conditions.",
        {
          "ask": "What is the correct implementation?"
        }
      ],
      "choices": [
        {
          "code": [
            "trigger RequestTrigger on Request__c (before insert) {",
            "      RequestLogic.validateRecords(Trigger.new);",
            "  }"
          ]
        },
        {
          "code": [
            "trigger RequestTrigger on Request__c (before insert) {",
            "      RequestLogic.validateRecords(trigger.new);",
            "  }"
          ]
        },
        {
          "code": [
            "trigger RequestTrigger on Request__c (before insert) {",
            "      if (RequestLogic.isValid(Request__c)) {",
            "          Request.addError('Your request cannot be created at this time.');",
            "      }",
            "  }"
          ]
        },
        {
          "code": [
            "trigger RequestTrigger on Request__c (after insert) {",
            "      if (RequestLogic.isValid(Request__c)) {",
            "          Request.addError('Your request cannot be created at this time.');",
            "      }",
            "  }"
          ]
        }
      ],
      "answer": "B"
    },
    "printed": "B",
    "acceptAny": true,
    "type": "single",
    "choose": 1,
    "repaired": true,
    "repair": "A and B are case-only duplicates in case-insensitive Apex. Keep the original prompt and code; accept either duplicate without placing the answer or new validator assumptions in the question.",
    "review": {
      "date": "2026-10-17",
      "treatment": "accepted-alternatives",
      "reason": "A and B are case-only duplicates in case-insensitive Apex. Keep the original prompt and code; accept either duplicate without placing the answer or new validator assumptions in the question.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "A and B are case-only Apex duplicates; both remain accepted without inventing another validator implementation."
      }
    }
  },
  {
    "id": 73,
    "section": "testing",
    "focus": "familiar",
    "group": "deploy",
    "stem": [
      "A team of developers is working on a source-driven project that allows them to work independently, with many different org configurations.",
      {
        "ask": "Which type of Salesforce orgs should they use for their development?"
      }
    ],
    "choices": [
      "Developer sandboxes.",
      "Full Copy sandboxes",
      "Developer orgs",
      "Scratch orgs"
    ],
    "answer": "D",
    "why": "Scratch orgs are disposable, configurable environments intended for source-driven development and independent feature work.",
    "wrong": {
      "A": "A Developer sandbox copies its associated production metadata; a scratch definition is better suited to disposable project-specific feature combinations.",
      "B": "A Full sandbox copies production data and metadata and is unnecessarily heavy for independent disposable feature environments.",
      "C": "A Developer Edition org is persistent; it is not recreated from a scratch definition for each independent feature environment."
    },
    "notes": [
      "A scratch definition controls features/settings for the desired environment. Keep metadata in version control and recreate an org when needed. Sandboxes copy their associated production org rather than expressing arbitrary project shapes."
    ],
    "source": {
      "stem": [
        "A team of developers is working on a source-driven project that allows them to work independently, with many different org configurations.",
        {
          "ask": "Which type of Salesforce orgs should they use for their development?"
        }
      ],
      "choices": [
        "Developer sandboxes.",
        "Full Copy sandboxes",
        "Developer orgs",
        "Scratch orgs"
      ],
      "answer": "D"
    },
    "printed": "D",
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Scratch orgs are disposable, configurable environments intended for source-driven development and independent feature work.",
      "references": []
    }
  },
  {
    "id": 74,
    "section": "automation",
    "focus": "familiar",
    "group": "flows",
    "stem": [
      "Managers at Universal Containers want to ensure that only decommissioned containers are able to be deleted in the system. To meet the business requirement a Salesforce developer adds 'Decommissioned' as a picklist value for the Status _c custom field within the Container _c object.",
      {
        "ask": "Which two approaches could a developer use to enforce only Container records with a status of 'Decommissioned' can be deleted?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Before record-triggered flow",
      "Apex trigger",
      "After record-triggered flow",
      "Validation rule"
    ],
    "answer": "A,B",
    "type": "multi",
    "why": "A before-delete Apex trigger can call addError, and a before-delete record-triggered flow can use Custom Error to reject a non-Decommissioned Container deletion.",
    "wrong": {
      "C": "A create/update after-save flow does not run as a delete guard.",
      "D": "Validation rules do not execute to prohibit deleting a record."
    },
    "notes": [
      "Validation rules evaluate saves, not deletes. The Custom Error flow element rolls back the triggering change; check object/release support. An after-save flow on create/update is not a delete guard.",
      "Salesforce reference: Custom Error and delete prevention — https://help.salesforce.com/s/articleView?id=platform.flow_ref_elements_custom_error.htm&language=en_US&type=5",
      "Reference: https://help.salesforce.com/s/articleView?id=005386900&language=en_US&type=1"
    ],
    "source": {
      "stem": [
        "Managers at Universal Containers want to ensure that only decommissioned containers are able to be deleted in the system. To meet the business requirement a Salesforce developer adds 'Decommissioned' as a picklist value for the Status _c custom field within the Container _c object.",
        {
          "ask": "Which two approaches could a developer use to enforce only Container records with a status of 'Decommissioned' can be deleted?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "Before record-triggered flaw",
        "Apex trigger",
        "After record-triggered flow",
        "Validation rule"
      ],
      "answer": "B,D"
    },
    "printed": "B,D",
    "corrected": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "Validation rules do not run on deletion. Current before-delete record-triggered Flow with Custom Error and an Apex trigger can reject deletion; restore the original broad options and correct only the flaw/flow typo.",
      "references": [
        "https://help.salesforce.com/s/articleView?id=platform.flow_ref_elements_custom_error.htm&language=en_US&type=5",
        "https://help.salesforce.com/s/articleView?id=005386900&language=en_US&type=1"
      ]
    }
  },
  {
    "id": 75,
    "section": "testing",
    "focus": "familiar",
    "group": "debug",
    "stem": [
      "A developer is alerted to an issue with a custom Apex trigger that is causing records to be duplicated.",
      {
        "ask": "What is the most appropriate debugging approach to troubleshoot the issue?"
      }
    ],
    "choices": [
      "Review the Historical Event logs to identify the source of the issue.",
      "Add system.debug statements to the code to track the execution flow and identify the issue.",
      "Use the Apex Interactive Debugger to step through the code and identify the issue.",
      "Disable the trigger in production and test to see if the issue still occurs."
    ],
    "answer": "B,C",
    "why": "Debug logs and a provisioned Apex Interactive Debugger are both valid ways to inspect the execution. The original question does not require breakpoint stepping, so B or C is accepted.",
    "wrong": {
      "A": "Historical event logs are not specific enough for debugging triggers.",
      "D": "Disabling the trigger disrupts the system and prevents further testing."
    },
    "notes": [
      "Debug logs with System.debug can also diagnose duplication; they are not inherently inferior or invalid. Live stepping requires provisioned debugger access."
    ],
    "source": {
      "stem": [
        "A developer is alerted to an issue with a custom Apex trigger that is causing records to be duplicated.",
        {
          "ask": "What is the most appropriate debugging approach to troubleshoot the issue?"
        }
      ],
      "choices": [
        "Review the Historical Event logs to identify the source of the issue.",
        "Add system.debug statements to the code to track the execution flow and identify the issue.",
        "Use the Apex Interactive Debugger to step through the code and identify the issue.",
        "Disable the trigger in production and test to see if the issue still occurs."
      ],
      "answer": "C"
    },
    "printed": "C",
    "acceptAny": true,
    "type": "single",
    "choose": 1,
    "repaired": true,
    "repair": "Both execution logging and provisioned Apex Interactive Debugger stepping are valid troubleshooting methods. The source supplies no requirement making stepping uniquely preferable; retain both original choices.",
    "review": {
      "date": "2026-10-17",
      "treatment": "accepted-alternatives",
      "reason": "Both execution logging and provisioned Apex Interactive Debugger stepping are valid troubleshooting methods. The source supplies no requirement making stepping uniquely preferable; retain both original choices.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "Debug logging and provisioned interactive stepping remain valid alternatives for the broad debugging request."
      }
    }
  },
  {
    "id": 76,
    "section": "ui",
    "focus": "low",
    "group": "lightning",
    "stem": [
      "A Salesforce administrator used Flow Builder to create a flow named 'accountOnboarding'. The flow must be used inside an Aura component.",
      {
        "ask": "Which tag should a developer use to display the flow in the component?"
      }
    ],
    "choices": [
      "lightning:flow",
      "lightning-low",
      "sure-flow",
      "aura:flow"
    ],
    "answer": "A",
    "why": "lightning:flow is the Aura component for hosting a Flow interview inside an Aura component.",
    "wrong": {
      "B": "lightning-flow is the LWC base component. This question asks for the Aura component lightning:flow.",
      "C": "sure-flow is not a Lightning component.",
      "D": "aura:flow is not the component that hosts a flow. The Aura component is lightning:flow."
    },
    "notes": [
      "Start an active flow by API name through the component’s startFlow method and handle status changes as needed. The LWC equivalent uses lightning-flow with a hyphen, whereas Aura uses the namespace colon."
    ],
    "source": {
      "stem": [
        "A Salesforce administrator used Flow Builder to create a flow named 'accountOnboarding'. The flow must be used inside an Aura component.",
        {
          "ask": "Which tag should a developer use to display the flow in the component?"
        }
      ],
      "choices": [
        "lightning:flow",
        "lightning-low",
        "sure-flow",
        "aura:flow"
      ],
      "answer": "A"
    },
    "printed": "A",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Restore lightning-flow as a meaningful LWC distractor and distinguish it from Aura syntax. Original wording and choices are retained; the source key remains accepted. lightning:flow is the Aura component for hosting a Flow interview inside an Aura component.",
      "references": []
    }
  },
  {
    "id": 77,
    "section": "testing",
    "focus": "must",
    "group": "tests",
    "stem": [
      {
        "ask": "Which two statements are true about using the @testSetup annotation in an Apex test class?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Records created in the test setup method cannot be updated in individual test methods.",
      "In a test setup method, test data is inserted once and made available for all test methods In the test class.",
      "A method defined with the @testSetup annotation executes once for each test method in the test class and counts towards system limits.",
      "The @testSetup annotation is not supported when the @isTest(SeeAllData=True) annotation is used ."
    ],
    "answer": "B,D",
    "type": "multi",
    "why": "A @testSetup method supplies baseline records for the test class, and it cannot be combined with SeeAllData=true.",
    "wrong": {
      "A": "Records can be updated in individual test methods.",
      "C": "@testSetup does not execute repeatedly; it runs once per class."
    },
    "notes": [
      "Each test method starts with the baseline and can modify its own copy; changes from one method do not leak into another. Query for setup data within each test rather than relying on static variables to carry record Ids across execution boundaries."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "A @testSetup method supplies baseline records for the test class, and it cannot be combined with SeeAllData=true.",
      "references": []
    }
  },
  {
    "id": 78,
    "section": "automation",
    "focus": "high",
    "group": "limits",
    "stem": [
      "A developer created a new after insert trigger on the Lead object that creates Task records for each Lead.",
      "After deploying to production, an existing outside integration that inserts Lead records in batches to Salesforce is occasionally reporting total batch failures being caused by the Task insert statement. This causes the integration process in the outside system to stop, requiring a manual restart.",
      "Which change should the developer make to allow the integration to continue when some records in a batch cause failures due to the Task",
      {
        "ask": "insert statement, so that manual restarts are not needed?"
      }
    ],
    "choices": [
      "Use the Database method with allOrNone set to false.",
      "Deactivate the trigger before the integration runs.",
      "Remove the Apex class from the integration user's profile.",
      "Use a try-catch block after the insert statement."
    ],
    "answer": "A",
    "why": "Database.insert(tasks, false) allows ordinary Task row failures to be returned in SaveResult while valid Tasks can succeed without failing the entire operation.",
    "wrong": {
      "B": "Deactivating the trigger removes the business logic.",
      "C": "Removing the class from the profile does not save the valid Tasks.",
      "D": "A try/catch around one insert does not keep the valid rows and discard the bad ones."
    },
    "notes": [
      "Inspect and record every failed result so the integration does not silently lose follow-up Tasks. Later uncaught exceptions or governor failures can still roll back the encompassing Lead transaction. A catch around an all-or-none insert cannot turn it into partial row success."
    ],
    "printed": "D",
    "source": {
      "stem": [
        "A developer created a new after insert trigger on the Lead object that creates Task records for each Lead.",
        "After deploying to production, an existing outside integration that inserts Lead records in batches to Salesforce is occasionally reporting total batch failures being caused by the Task insert statement. This causes the integration process in the outside system to stop, requiring a manual restart.",
        "Which change should the developer make to allow the integration to continue when some records in a batch cause failures due to the Task",
        {
          "ask": "insert statement, so that manual restarts are not needed?"
        }
      ],
      "choices": [
        "Use the Database method with allow one set to false.",
        "Deactivate the trigger before the integration runs.",
        "Remove the Apex class from the integration user's profile.",
        "Use a try-catch block after the insert statement."
      ],
      "answer": "D"
    },
    "corrected": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "Partial-success Database DML can return per-row failures. Correct the obvious allow one/allOrNone term only; do not replace the entire answer choice.",
      "references": []
    }
  },
  {
    "id": 79,
    "section": "fundamentals",
    "focus": "high",
    "group": "queries",
    "stem": [
      {
        "ask": "Which three data types can a SOQL query return?"
      },
      {
        "ask": "Choose 3 answers"
      }
    ],
    "choices": [
      "Double",
      "Long",
      "sObject",
      "Integer",
      "List"
    ],
    "answer": "C,D,E",
    "type": "multi",
    "why": "Inline SOQL can be assigned to a single sObject, a List of sObjects, or an Integer for the special COUNT() form.",
    "wrong": {
      "A": "Double is not a type that a SOQL statement evaluates to.",
      "B": "Long is not a type that a SOQL statement evaluates to."
    },
    "notes": [
      "Single-record assignment requires exactly one result. Other aggregates are exposed through AggregateResult rows and have function-specific value types; do not claim every aggregate returns Decimal. This question concerns the direct SOQL expression shape rather than every field value a query can contain."
    ],
    "printed": "A,C,E",
    "source": {
      "stem": [
        {
          "ask": "Which three data types can a SOQL query return?"
        },
        {
          "ask": "Choose 3 answers"
        }
      ],
      "choices": [
        "Double",
        "O Long",
        "sObject",
        "dg Integer",
        "List"
      ],
      "answer": "A,C,E"
    },
    "corrected": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "For direct Apex SOQL assignment the supported forms here are sObject, Integer COUNT(), and List. Remove only the O/dg OCR markers from Long and Integer.",
      "references": []
    }
  },
  {
    "id": 80,
    "section": "automation",
    "focus": "high",
    "group": "integration",
    "stem": [
      "A business has a proprietary Order Management System (OMS) that creates orders from its website and fulfills the orders. When the order is created in the OMS, an integration also creates an order record inSalesforce and relates it to the contact as identified by the email on the order. As the order goes through different stages in the OMS, the integration also updates it in Salesforce.",
      "The business notices that each update from the OMS creates a new order record in Salesforce.",
      {
        "ask": "Which two actions should prevent the duplicate order records from being created in Salesforce?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Use the order number from the OMS as an external ID.",
      "Ensure that the order number in the OMS is unique.",
      "O Use the email on the contact record as an external ID.",
      "O Write a trigger on the Order object to delete the duplicates."
    ],
    "answer": "A,B",
    "type": "multi",
    "why": "Use the stable OMS order number as the Salesforce external-ID matching field for upsert, and ensure that key uniquely identifies an order in the source.",
    "wrong": {
      "C": "Email on the contact is unrelated to the uniqueness of order records.",
      "D": "Deleting duplicates with triggers is reactive and not a best practice."
    },
    "notes": [
      "An integration that always inserts still creates duplicates even if a field is marked External ID. Configure matching explicitly and consider Salesforce Unique as well. Contact email identifies a customer imperfectly and cannot identify multiple different orders from that customer."
    ],
    "source": {
      "stem": [
        "A business has a proprietary Order Management System (OMS) that creates orders from its website and fulfills the orders. When the order is created in the OMS, an integration also creates an order record inSalesforce and relates it to the contact as identified by the email on the order. As the order goes through different stages in the OMS, the integration also updates it in Salesforce.",
        "The business notices that each update from the OMS creates a new order record in Salesforce.",
        {
          "ask": "Which two actions should prevent the duplicate order records from being created in Salesforce?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "Use the order number from the OMS as an external ID.",
        "Ensure that the order number in the OMS is unique.",
        "O Use the email on the contact record as an external ID.",
        "O Write a trigger on the Order object to delete the duplicates."
      ],
      "answer": "A,B"
    },
    "printed": "A,B",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: State that the integration upserts against the external ID; an External ID flag alone does not turn inserts into updates. Remove OCR option markers and the joined words inSalesforce. Original wording and choices are retained; the source key remains accepted. Use the stable OMS order number as the Salesforce external-ID matching field for upsert, and ensure that key uniquely identifies an order in the source.",
      "references": []
    }
  },
  {
    "id": 81,
    "section": "testing",
    "focus": "high",
    "group": "tests",
    "stem": [
      "A developer created a trigger on the Account object and wants to test if the trigger is properly bulkified. The developer team decided that the trigger should be tested with 200 account records with unique names.",
      {
        "ask": "What two things should be done to create the test data within the unit test with the least amount of code?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Use the @isTest (seeAllData=true) annotation in the test class.",
      "Use the @isTest (isParallel=true) annotation in the test class.",
      "Create a static resource containing test data.",
      "Use Test.loadData to populate data in your test methods."
    ],
    "answer": "C,D",
    "type": "multi",
    "why": "Prepare a CSV static resource with 200 unique Accounts and load it in the test with Test.loadData(Account.sObjectType, resourceName).",
    "wrong": {
      "A": "SeeAllData exposes existing data; it does not create the required 200 uniquely named Account test records.",
      "B": "@isTest(isParallel=true) is used for parallel execution, not for creating test data."
    },
    "notes": [
      "Assert the bulk trigger’s outcomes and that every input was processed. SeeAllData exposes existing data without creating the required fixture. isParallel affects scheduling, not the record values generated for a test."
    ],
    "source": {
      "stem": [
        "A developer created a trigger on the Account object and wants to test if the trigger is properly bulkified. The developer team decided that the trigger should be tested with 200 account records with unique names.",
        {
          "ask": "What two things should be done to create the test data within the unit test with the least amount of code?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "Use the @isTest (seeAllData=true) annotation in the test class.",
        "Use the @isTest (isParallel=true) annotation in the test class.",
        "Create a static resource containing test data.",
        "Use Test, loadData to populate data in your test methods."
      ],
      "answer": "C,D"
    },
    "printed": "C,D",
    "repaired": true,
    "repair": "Correct Test, loadData to Test.loadData only; retain the CSV/static-resource question and C,D key.",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Correct Test, loadData to Test.loadData only; retain the CSV/static-resource question and C,D key.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "explanation-refined",
        "reason": "Explained SeeAllData in terms of the requested generated 200-record fixture rather than treating the annotation itself as forbidden."
      }
    }
  },
  {
    "id": 82,
    "section": "automation",
    "focus": "familiar",
    "group": "flows",
    "stem": [
      "A developer is asked to prevent anyone other than a user with Sales Manager profile from changing the Opportunity Status to Closed Lost if the lost reason is blank.",
      {
        "ask": "Which automation allows the developer to satisfy this requirement in the most efficient manner?"
      }
    ],
    "choices": [
      "An Apex trigger on the Opportunity object",
      "An error condition formula on a validation rule on Opportunity",
      "A record trigger flow on the Opportunity object",
      "An approval process on the Opportunity object"
    ],
    "answer": "B",
    "why": "A validation-rule error formula can combine the Closed Lost transition, blank lost reason, and the exception for a Sales Manager profile.",
    "wrong": {
      "A": "Triggers are more complex and unnecessary for this simple validation.",
      "C": "A suitably configured record-triggered flow with a Custom Error could enforce a rule, but a validation rule directly expresses this simple save-time formula condition.",
      "D": "Approval processes do not handle this type of field-level restriction."
    },
    "notes": [
      "Use StageName for Opportunity stage, ISCHANGED when the rule should apply only on transition, and the real lost-reason field API name. A custom permission is often more maintainable than hard-coding a profile name, but the mock explicitly describes that profile exception."
    ],
    "source": {
      "stem": [
        "A developer is asked to prevent anyone other than a user with Sales Manager profile from changing the Opportunity Status to Closed Lost if the lost reason is blank.",
        {
          "ask": "Which automation allows the developer to satisfy this requirement in the most efficient manner?"
        }
      ],
      "choices": [
        "An Apex trigger on the Opportunity object",
        "An error condition formula on a validation rule on Opportunity",
        "A record trigger flow on the Opportunity object",
        "An approval process on the Opportunity object"
      ],
      "answer": "B"
    },
    "printed": "B",
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "A validation-rule error formula can combine the Closed Lost transition, blank lost reason, and the exception for a Sales Manager profile.",
      "references": []
    }
  },
  {
    "id": 83,
    "section": "testing",
    "focus": "familiar",
    "group": "deploy",
    "stem": [
      "Developers at Universal Containers (UC) use version control to share their code changes, but they notice that when they deploy their code to different environments they often have failures. They decide to set up Continuous Integration (CI).",
      {
        "ask": "What should the UC development team use to automatically run tests as part of their CI process?"
      }
    ],
    "choices": [
      "Salesforce CLI",
      "Visual Studio Code",
      "Force.com Toolkit",
      "Developer Console"
    ],
    "answer": "A",
    "why": "Salesforce CLI can be invoked by a CI runner to execute Apex tests automatically and report failures through command output/exit status.",
    "wrong": {
      "B": "Visual Studio Code is a development IDE, not a CI tool.",
      "C": "Force.com Toolkit is a vague legacy toolkit label. Some toolkits can automate APIs, but Salesforce CLI is the current command-line product named in this question.",
      "D": "Developer Console is for debugging and manual testing, not automation."
    },
    "notes": [
      "Use authenticated CI credentials, wait for the test run or poll its job Id, and retain the results. VS Code is an editor; Developer Console is interactive. The CI runner orchestrates the pipeline while CLI communicates with Salesforce."
    ],
    "source": {
      "stem": [
        "Developers at Universal Containers (UC) use version control to share their code changes, but they notice that when they deploy their code to different environments they often have failures. They decide to set up Continuous Integration (CI).",
        {
          "ask": "What should the UC development team use to automatically run tests as part of their CI process?"
        }
      ],
      "choices": [
        "Salesforce CLI",
        "Visual Studio Code",
        "Force.com Toolkit",
        "Developer Console"
      ],
      "answer": "A"
    },
    "printed": "A",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Specify the current Salesforce command-line tool and avoid claiming legacy API toolkits cannot be used in CI. Original wording and choices are retained; the source key remains accepted. Salesforce CLI can be invoked by a CI runner to execute Apex tests automatically and report failures through command output/exit status.",
      "references": []
    }
  },
  {
    "id": 84,
    "section": "testing",
    "focus": "familiar",
    "group": "tests",
    "stem": [
      {
        "ask": "Which scenario is valid for execution by unit tests?"
      }
    ],
    "choices": [
      "Execute anonymous Apex as a different user.",
      "Generate a Visualforce PDF with getContentAsPDF ().",
      "Load data from a remote site with a callout.",
      "Set the created date of a record using a system method."
    ],
    "answer": "D",
    "why": "Test.setCreatedDate(recordId, datetime) can change CreatedDate on an eligible record created by the test.",
    "wrong": {
      "A": "Execute Anonymous does not by itself run the test as another user.",
      "B": "A test cannot call getContentAsPDF().",
      "C": "A standard unit test cannot load live remote data; register an HttpCalloutMock response instead."
    },
    "notes": [
      "Create the record first and set a suitable past Datetime. Standard isolated unit tests mock HTTP responses rather than load live remote data; getContent/getContentAsPDF are not supported test operations. System.runAs is the test user-context mechanism, not Execute Anonymous."
    ],
    "printed": "B",
    "source": {
      "stem": [
        {
          "ask": "Which scenario is valid for execution by unit tests?"
        }
      ],
      "choices": [
        "Execute anonymous Apex as a different user.",
        "Generate a Visualforce PDF with getcontentaAsPDF ().",
        "Load data from a remote site with a callout.",
        "Set the created date of a record using a system method."
      ],
      "answer": "B"
    },
    "corrected": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "Test.setCreatedDate is supported on test-created records. getContentAsPDF is not supported in tests and a real remote callout is not permitted; no new isolation requirement is needed to correct the source B key.",
      "references": []
    }
  },
  {
    "id": 85,
    "section": "fundamentals",
    "focus": "high",
    "group": "language",
    "stem": [
      "A developer is implementing an Apex class for a financial system. Within the class, the variables 'creditAmount' and 'debitAmount' should not be able to change once a value is assigned.",
      {
        "ask": "In which two ways can the developer declare the variables to ensure their value can only be assigned one time?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Use the static keyword and assign its value in a static initializer.",
      "Use the final keyword and assign its value in the class constructor.",
      "Use the final keyword and assign its value when declaring the variable.",
      "Use the static keyword and assign its value in the class constructor."
    ],
    "answer": "B,C",
    "type": "multi",
    "why": "Declare a variable final, then initialize it either at declaration or in the appropriate constructor/initializer exactly once.",
    "wrong": {
      "A": "Static variables can have their values reassigned unless marked as final.",
      "D": "static does not make a value immutable; assigning it in a constructor does not prevent later reassignment."
    },
    "notes": [
      "static controls class-level state and does not prohibit reassignment. Constructors can assign a non-final static variable, but that still fails the one-time-assignment requirement; the old explanation incorrectly claimed such assignment was forbidden."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Declare a variable final, then initialize it either at declaration or in the appropriate constructor/initializer exactly once.",
      "references": []
    }
  },
  {
    "id": 86,
    "section": "automation",
    "focus": "familiar",
    "group": "model",
    "stem": [
      "Universal Containers is building a recruiting app with an Applicant object that stores information about an individual person and a Job",
      "object that represents a job. Each applicant may apply for more than one job.",
      {
        "ask": "What should a developer implement to represent that an applicant has applied for a job?"
      }
    ],
    "choices": [
      "Junction object between Applicant and Job",
      "Lookup field from Applicant to Job",
      "Master-detail field from Applicant to Job",
      "Formula field on Applicant that references Job"
    ],
    "answer": "A",
    "why": "Use a Job Application junction so each record represents one Applicant–Job association and can store application-specific details.",
    "wrong": {
      "B": "Lookup field from Applicant to Job: A lookup field creates a one-to-many relationship. While an Applicant could reference one Job, it does not support the many-to-many relationship required in this scenario.",
      "C": "A single master-detail from Applicant to Job makes each Applicant belong to one Job; a separate application association is needed for multiple Jobs.",
      "D": "Formula field on Applicant that references Job: A formula field cannot establish relationships between records or represent a many-to-many relationship. It is only for computed fields."
    },
    "notes": [
      "Two master-detail relationships are the canonical Salesforce many-to-many model. Lookup-based association objects can also represent many-to-many where independent lifecycle is needed; two master-detail fields on a junction are allowed."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Use a Job Application junction so each record represents one Applicant–Job association and can store application-specific details.",
      "references": []
    }
  },
  {
    "id": 87,
    "section": "automation",
    "focus": "high",
    "group": "integration",
    "stem": [
      {
        "ask": "Which annotation exposes an Apex class as a RESTful web service?"
      }
    ],
    "choices": [
      "@RemoteAction",
      "@RestResource (urlMapping='/myService/*')",
      "@HttpInvocable",
      "@AuraEnabled(cacheable=true)"
    ],
    "answer": "B",
    "why": "@RestResource(urlMapping=...) annotates the Apex class that exposes the REST endpoint.",
    "wrong": {
      "A": "@RemoteAction is used for JavaScript remoting.",
      "C": "There is no @HttpInvocable annotation; @InvocableMethod exposes a Flow/Apex action.",
      "D": "@AuraEnabled is for enabling methods in Aura components or LWC, not REST services."
    },
    "notes": [
      "Define appropriately accessible static HTTP methods using annotations such as @HttpGet or @HttpPost and secure the endpoint. @RemoteAction is Visualforce remoting, @AuraEnabled exposes Lightning Apex, and @HttpInvocable is not a real annotation.",
      "An Apex REST endpoint uses a global class annotated @RestResource and a global static method annotated for the HTTP verb, such as @HttpGet. The annotation alone does not supply access checks or authentication."
    ],
    "source": {
      "stem": [
        {
          "ask": "Which annotation exposes an Apex class as a RESTful web service?"
        }
      ],
      "choices": [
        "@RemoteAction",
        "@RestResource (urlMapping='/myService/*'')",
        "@HttpInvocable",
        "@Aurabnabled(cacheable=true)"
      ],
      "answer": "B"
    },
    "printed": "B",
    "repaired": true,
    "repair": "Remove the extra quote in RestResource and repair the AuraEnabled misspelling only; retain the REST-class annotation question and B key.",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Remove the extra quote in RestResource and repair the AuraEnabled misspelling only; retain the REST-class annotation question and B key.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "The annotation syntax/name fixes preserve the Apex REST class exposure question."
      }
    }
  },
  {
    "id": 88,
    "section": "ui",
    "focus": "must",
    "group": "lightning",
    "stem": [
      "A developer is creating an app that contains multiple Lightning web components.",
      "One of the child components is used for navigation purposes. When a user clicks a button called Next in the child component, the parent component must be alerted so it can navigate to the next page.",
      {
        "ask": "How should this be accomplished?"
      }
    ],
    "choices": [
      "Update a property on the parent.",
      "Call a method in the Apex controller.",
      "Fire a notification.",
      "Create a custom event."
    ],
    "answer": "D",
    "why": "The child dispatches a CustomEvent, and the parent attaches an onnext handler to the child’s host element to respond.",
    "wrong": {
      "A": "Properties in LWC are one-way data-bound; updates do not notify parents.",
      "B": "Calling an Apex method is unnecessary for parent-child communication.",
      "C": "A user notification is not the defined child-to-parent event contract; a CustomEvent communicates the Next action."
    },
    "notes": [
      "Put any event payload in detail. A direct host listener can receive this child-dispatched event without making it bubble globally. Keep data flow clear: properties/methods down, events up."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "The child dispatches a CustomEvent, and the parent attaches an onnext handler to the child’s host element to respond.",
      "references": []
    }
  },
  {
    "id": 89,
    "section": "automation",
    "focus": "familiar",
    "group": "model",
    "stem": [
      "Universal Containers has a support process that allows users to request support from its engineering team using a custom object,",
      "Engineering Support c.",
      "Users should be able to associate multiple Engineering Support __c records to a single Opportunity record. Additionally, aggregate information",
      "about the Engineering Support _c records should be shown on the Opportunity record.",
      {
        "ask": "Which relationship field should be implemented to support these requirements?"
      }
    ],
    "choices": [
      "Lookup field from Opportunity to Engineering _support__c",
      "Master-detail field from Engineering Support__c to Opportunity",
      "Master-detail field from Opportunity to Engineering Support__c",
      "Lookup field from Engineering Support __c to Opportunity"
    ],
    "answer": "B",
    "why": "Put the master-detail field on Engineering_Support__c pointing to Opportunity, so the Opportunity is the parent and can hold native roll-up summaries.",
    "wrong": {
      "A": "A lookup does not support the roll-up summary from Engineering Support to Opportunity.",
      "C": "Master-detail cannot go in the opposite direction (Opportunity to Engineering_Support__c) for this use case.",
      "D": "Lookup relationships do not support roll-up summary fields."
    },
    "notes": [
      "The relationship direction matters: many engineering-support details belong to one Opportunity. An ordinary custom lookup does not supply native roll-up summary fields, though automation can implement an aggregate if a lookup is required."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Put the master-detail field on Engineering_Support__c pointing to Opportunity, so the Opportunity is the parent and can hold native roll-up summaries.",
      "references": []
    }
  },
  {
    "id": 90,
    "section": "automation",
    "focus": "must",
    "group": "security",
    "stem": [
      "Universal Containers implemented a private sharing model for the Account object. A custom Account search tool was developed with",
      "Apex to help sales representatives find accounts that match multiple criteria they specify. Since its release, users of the tool report they can see",
      "Accounts they do not own.",
      {
        "ask": "What should the developer use to enforce sharing permissions for the currently logged in user while using the custom search tool?"
      }
    ],
    "choices": [
      "Use the with sharing keyword on the class declaration.",
      "Use the without sharing keyword on the class declaration.",
      "Use the userInfo Apex class to filter all SOQL queries to returned records owned by the logged-in user.",
      "Use the schema describe calls to determine if the logged-in user has access to the Account object."
    ],
    "answer": "A",
    "why": "with sharing explicitly requests the running user’s record-sharing rules in the Apex search class.",
    "wrong": {
      "B": "without sharing does not provide the requested class-level sharing enforcement. Explicit user-mode database operations can still enforce sharing even inside a without-sharing class.",
      "C": "OwnerId-only filtering excludes legitimately shared records and does not implement the full record-access model.",
      "D": "Schema describe calls do not enforce sharing permissions but only check object-level access."
    },
    "notes": [
      "Private sharing does not mean users see only records they own: hierarchy, teams, sharing, and elevated permissions may grant access. Do not replace sharing with OwnerId filtering. Database user/system mode and class sharing are distinct controls; API 67.0+ defaults to user mode for database operations."
    ],
    "source": {
      "stem": [
        "Universal Containers implemented a private sharing model for the Account object. A custom Account search tool was developed with",
        "Apex to help sales representatives find accounts that match multiple criteria they specify. Since its release, users of the tool report they can see",
        "Accounts they do not own.",
        {
          "ask": "What should the developer use to enforce sharing permissions for the currently logged in user while using the custom search tool?"
        }
      ],
      "choices": [
        "Use the with sharing keyword on the class declaration.",
        "Use the without sharing keyword on the class declaration.",
        "Use the userInfo Apex class to filter all SOQL queries to returned records owned by the logged-in user.",
        "Use the schema describe calls to determine if the logged-in user has access to the Account object."
      ],
      "answer": "A"
    },
    "printed": "A",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Distinguish unauthorized records from legitimately shared records, and sharing declarations from database modes. Original wording and choices are retained; the source key remains accepted. with sharing explicitly requests the running user’s record-sharing rules in the Apex search class.",
      "references": []
    }
  },
  {
    "id": 91,
    "section": "automation",
    "focus": "must",
    "group": "triggers",
    "stem": [
      "A developer created a trigger on a custom object. This custom object also has some dependent pick lists.",
      {
        "ask": "According to the order of execution rules, which step happens first?"
      }
    ],
    "choices": [
      "The original record is loaded from the database.",
      "System validation is run for maximum field lengths.",
      "Old values are overwritten with the new record values.",
      "JavaScript validation is run in the browser,"
    ],
    "answer": "A",
    "why": "In the server-side save sequence, Salesforce first loads the original record, or initializes the new record for an insert.",
    "wrong": {
      "B": "Maximum field length is not the first step of the save order.",
      "C": "The new values overwrite the old ones after the original record is loaded.",
      "D": "Browser validation is not the first server save step."
    },
    "notes": [
      "It then loads the submitted new field values and performs the relevant initial system checks. Browser JavaScript validation occurs on the client before the server request, not as a later server save step."
    ],
    "source": {
      "stem": [
        "A developer created a trigger on a custom object. This custom object also has some dependent pick lists.",
        {
          "ask": "According to the order of execution rules, which step happens first?"
        }
      ],
      "choices": [
        "The original record is loaded from the database.",
        "System validation is run for maximum field lengths.",
        "Old values are overwritten with the new record values.",
        "JavaScript validation is run in the browser,"
      ],
      "answer": "A"
    },
    "printed": "A",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Specify the server-side order of execution; browser validation can precede a server request. Original wording and choices are retained; the source key remains accepted. In the server-side save sequence, Salesforce first loads the original record, or initializes the new record for an insert.",
      "references": []
    }
  },
  {
    "id": 92,
    "section": "automation",
    "focus": "high",
    "group": "triggers",
    "stem": [
      {
        "ask": "Which two actions may cause triggers to fire?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Changing a user's default division when the transfer division option is checked",
      "Updates to FeedItem",
      "Cascading delete operations",
      "Renaming or replacing a picklist entry"
    ],
    "answer": "",
    "type": "multi",
    "why": "Not scored. B (Updates to FeedItem) is supported. FreeCram and the original mock also select C, but Salesforce documents cascading deletes as an operation that does not invoke the deleted children's triggers. A and D are also documented exceptions, so the supplied Choose 2 instruction has no supported second answer.",
    "wrong": {},
    "notes": [
      "Salesforce distinguishes the initiating delete from automatic cascade deletion. An explicit delete of a parent can invoke the parent's delete triggers; automatically deleted child records do not invoke their delete triggers. Explicitly deleting children in custom Apex is a separate DML operation.",
      "The same official exceptions list includes changing a user's default division with the transfer option checked, and renaming or replacing picklists. FeedItem updates can invoke triggers, although LikeCount counter changes are a documented exception.",
      "The supplied FreeCram page chooses cascading deletes plus FeedItem updates (A,C there; B,C here). Its explanation that cascade deletion fires child-record triggers conflicts with the official guide. The original mock key B,C remains visible as an unverified reference.",
      "Salesforce reference: Operations That Don't Invoke Triggers — https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_triggers_ignoring_operations.htm",
      "Salesforce Apex Developer Guide, Operations That Don't Invoke Triggers — https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/salesforce_apex_developer_guide.pdf",
      "Supplied mock comparison: https://www.freecram.com/discussions/Salesforce/exam-pdi-topic-2-question-154-discussion-p1142904.html"
    ],
    "source": {
      "stem": [
        {
          "ask": "Which two actions may cause triggers to fire?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "Changing a user's default division when the transfer division option is checked",
        "Updates to FeedItem",
        "Cascading delete operations",
        "Renaming or replacing a picklist entry"
      ],
      "answer": "B,C"
    },
    "printed": "B,C",
    "ungraded": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "unresolved",
      "reason": "Remains Not scored after checking the supplied FreeCram page: its A,C maps to this bank's B,C, matching the original mock key. However, its claim that cascade-deleted child records fire delete triggers contradicts Salesforce's Operations That Don't Invoke Triggers documentation. Only the initiating delete record causes trigger evaluation. B is supported, while the Choose 2 instruction has no supported second choice. Preserve the original options and show B,C as the unverified mock answer.",
      "references": [
        "https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_triggers_ignoring_operations.htm",
        "https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/salesforce_apex_developer_guide.pdf",
        "https://www.freecram.com/discussions/Salesforce/exam-pdi-topic-2-question-154-discussion-p1142904.html",
        "https://codingnconcepts.com/salesforce/salesforce-platform-developer-i-exam-questions/"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "unresolved",
        "queries": [
          "\"Which two actions may cause triggers to fire\""
        ],
        "candidates": [
          "https://www.freecram.com/discussions/Salesforce/exam-pdi-topic-2-question-154-discussion-p1142904.html",
          "https://codingnconcepts.com/salesforce/salesforce-platform-developer-i-exam-questions/"
        ],
        "assessment": "Remains Not scored after checking the supplied FreeCram page: its A,C maps to this bank's B,C, matching the original mock key. However, its claim that cascade-deleted child records fire delete triggers contradicts Salesforce's Operations That Don't Invoke Triggers documentation. Only the initiating delete record causes trigger evaluation. B is supported, while the Choose 2 instruction has no supported second choice. Preserve the original options and show B,C as the unverified mock answer."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "not-scored",
        "decision": "still-unresolved",
        "reason": "Remains Not scored after checking the supplied FreeCram page: its A,C maps to this bank's B,C, matching the original mock key. However, its claim that cascade-deleted child records fire delete triggers contradicts Salesforce's Operations That Don't Invoke Triggers documentation. Only the initiating delete record causes trigger evaluation. B is supported, while the Choose 2 instruction has no supported second choice. Preserve the original options and show B,C as the unverified mock answer."
      },
      "optionAudit": {
        "date": "2026-10-17",
        "status": "matched",
        "comparedChoiceCount": 4,
        "assessment": "All four actions are present on the supplied FreeCram page, reordered as cascading delete / division / FeedItem / picklist. Its A,C maps to this bank B,C. No action is missing; the published cascade-delete explanation conflicts with Salesforce documentation.",
        "references": [
          "https://www.freecram.com/discussions/Salesforce/exam-pdi-topic-2-question-154-discussion-p1142904.html"
        ]
      }
    }
  },
  {
    "id": 93,
    "section": "automation",
    "focus": "high",
    "group": "triggers",
    "stem": [
      "An Opportunity needs to have an amount rolled up from a custom object that is not in a master-detail relationship.",
      {
        "ask": "How can this be achieved?"
      }
    ],
    "choices": [
      "Write a trigger on the Opportunity object and use tree sorting to sum the amount for all related child objects under the Opportunity.",
      "Use the Streaming API to create real-time roll-up summaries.",
      "Write a trigger on the child object and use an aggregate function to sum the amount for all related child objects under the Opportunity.",
      "Use the Metadata API to create real-time roll-up summaries."
    ],
    "answer": "C",
    "why": "Use child-object trigger logic to recalculate an aggregate and write the total to the related Opportunity when a native roll-up relationship is unavailable.",
    "wrong": {
      "A": "Tree sorting is unnecessary and unrelated to roll-up summaries.",
      "B": "The Streaming API pushes record changes to a client. It does not calculate a roll-up.",
      "D": "The Metadata API deploys configuration. It does not calculate a roll-up."
    },
    "notes": [
      "Bulk-query totals for all affected parent Ids, include old and new parents when reparenting, and handle insert/update/delete/undelete. A missing aggregate row should usually reset the total to zero. Avoid a query or parent update per child."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Use child-object trigger logic to recalculate an aggregate and write the total to the related Opportunity when a native roll-up relationship is unavailable.",
      "references": []
    }
  },
  {
    "id": 94,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      {
        "ask": "What does the Lightning Component framework provide to developers?"
      }
    ],
    "choices": [
      "Support for Classic and Lightning UIs",
      "Prebuilt components that can be reused",
      "Templates to create custom components",
      "Extended governor limits for applications"
    ],
    "answer": "A,B,C",
    "why": "The Lightning framework supplies reusable base components and component scaffolding/templates, and components can be embedded in supported Classic/Visualforce contexts through Lightning Out. Any one of A, B or C answers the broad source question.",
    "wrong": {
      "D": "Extended governor limits are not provided by the framework."
    },
    "notes": [
      "Lightning components can also be embedded in Visualforce/Classic through supported integration paths, and development tools generate component templates."
    ],
    "source": {
      "stem": [
        {
          "ask": "What does the Lightning Component framework provide to developers?"
        }
      ],
      "choices": [
        "Support for Classic and Lightning UIs",
        "Prebuilt components that can be reused",
        "Templates to create custom components",
        "Extended governor limits for applications"
      ],
      "answer": "B"
    },
    "printed": "B",
    "acceptAny": true,
    "type": "single",
    "choose": 1,
    "repaired": true,
    "repair": "The original broad question allows reusable base components, component templates, and Classic embedding through Visualforce/Lightning Out. Preserve those alternatives rather than rewriting the question to ask only for ready-made UI blocks.",
    "review": {
      "date": "2026-10-17",
      "treatment": "accepted-alternatives",
      "reason": "The original broad question allows reusable base components, component templates, and Classic embedding through Visualforce/Lightning Out. Preserve those alternatives rather than rewriting the question to ask only for ready-made UI blocks.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "The broad framework question supports reusable components, scaffolding and supported Classic embedding; no ready-made-UI-only constraint is added."
      }
    }
  },
  {
    "id": 95,
    "section": "testing",
    "focus": "familiar",
    "group": "debug",
    "stem": [
      {
        "ask": "Which three statements are accurate about debug logs?"
      },
      {
        "ask": "Choose 3 answers"
      }
    ],
    "choices": [
      "Debug logs can be set for specific users, classes, and triggers.",
      "System debug logs are retained for 24 hours.",
      "Only the 20 most recent debug logs for a user are kept.",
      "Debug log levels are cumulative, where FINE log level includes all events logged at the DEBUG, INFO, WARN, and ERROR levels.",
      "The maximum size of a debug log is 5 MB."
    ],
    "answer": "A,B,D",
    "type": "multi",
    "why": "User/class/trigger tracing, 24-hour system-log retention, and cumulative log levels are the accurate statements; FINE includes DEBUG and coarser levels.",
    "wrong": {
      "C": "Keeping only the 20 most recent logs is an outdated limit.",
      "E": "A debug log can be 20 MB, not 5 MB."
    },
    "notes": [
      "A single debug log is limited to 20 MB. Monitoring logs are retained seven days, which differs from system-log retention. Class/trigger trace flags refine logging levels but need an appropriate transaction trace to generate logs.",
      "Salesforce reference: Debug log limits and retention — https://help.salesforce.com/s/articleView?id=platform.code_debug_log.htm&language=en_US&type=5"
    ],
    "printed": "A,C,E",
    "source": {
      "stem": [
        {
          "ask": "Which three statements are accurate about debug logs?"
        },
        {
          "ask": "Choose 3 answers"
        }
      ],
      "choices": [
        "Debug logs can be set for specific users, classes, and triggers.",
        "System debug logs are retained for 24 hours.",
        "Only the 20 most recent debug logs for a user are kept.",
        "Debug log levels are cumulative, where FINE log level includes all events logged at the DEBUG, INFO, WARN, and ERROR levels.",
        "The maximum size of a debug log is 5 MB."
      ],
      "answer": "A,C,E"
    },
    "corrected": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "User/class/trigger tracing, 24-hour system-log retention, and cumulative log levels are the accurate statements; FINE includes DEBUG and coarser levels.",
      "references": [
        "https://help.salesforce.com/s/articleView?id=platform.code_debug_log.htm&language=en_US&type=5"
      ]
    }
  },
  {
    "id": 96,
    "section": "automation",
    "focus": "high",
    "group": "model",
    "stem": [
      "A developer created a custom order management app that uses an Apex class. The order is represented by an Order object and an",
      "OrderlItem object that has a master-detail relationship to Order. During order processing, an order may be split into multiple orders.",
      {
        "ask": "What should a developer do to allow their code to move some existing OrderItem records to a new Order record?"
      }
    ],
    "choices": [
      "Add without sharing to the Apex class declaration.",
      "Change the master-detail relationship to an external lookup relationship.",
      "Create a junction object between OrderItem and Order.",
      "Select the Allow Reparenting option on the master-detail relationship."
    ],
    "answer": "",
    "why": "Not scored. The source explicitly names standard Order/OrderItem. The Allow Reparenting configuration in the printed choice belongs to configurable custom master-detail relationships, not this stated standard relationship.",
    "wrong": {},
    "notes": [
      "Reparenting changes inherited access and roll-up totals. A standard OrderItem relationship is not an arbitrary custom master-detail field whose configuration can be edited."
    ],
    "source": {
      "stem": [
        "A developer created a custom order management app that uses an Apex class. The order is represented by an Order object and an",
        "OrderlItem object that has a master-detail relationship to Order. During order processing, an order may be split into multiple orders.",
        {
          "ask": "What should a developer do to allow their code to move some existing OrderItem records to a new Order record?"
        }
      ],
      "choices": [
        "Add without sharing to the Apex class declaration.",
        "Change the master-detail relationship to an external lookup relationship.",
        "Create a junction object between OrderItem and Order.",
        "Select the Allow reprinting option on the master-detail relationship."
      ],
      "answer": "D"
    },
    "printed": "D",
    "ungraded": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "unresolved",
      "reason": "The source explicitly names standard Order/OrderItem. The Allow Reparenting configuration in the printed choice belongs to configurable custom master-detail relationships, not this stated standard relationship.",
      "references": [
        "https://www.actual4test.com/discussions/Salesforce/exam-crt-450-topic-3-question-195-discussion-p1162036.html",
        "https://help.salesforce.com/s/articleView?id=platform.relationships_considerations.htm&language=en_US&type=5"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "partial",
        "queries": [
          "\"OrderItem\" \"Allow reparenting\" \"split\" exam"
        ],
        "candidates": [
          "https://www.actual4test.com/discussions/Salesforce/exam-crt-450-topic-3-question-195-discussion-p1162036.html"
        ],
        "assessment": "The Actual4test copy has the same four options and repeats Allow reprinting. The intended Salesforce feature is Allow Reparenting; corrected that word only. No missing option resolves the standard Order/OrderItem relationship limitation. The source explicitly names standard Order/OrderItem. The Allow Reparenting configuration in the printed choice belongs to configurable custom master-detail relationships, not this stated standard relationship."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "not-scored",
        "decision": "still-unresolved",
        "reason": "The source explicitly names standard Order/OrderItem. The Allow Reparenting configuration in the printed choice belongs to configurable custom master-detail relationships, not this stated standard relationship."
      },
      "optionAudit": {
        "date": "2026-10-17",
        "status": "partial-repair",
        "comparedChoiceCount": 4,
        "assessment": "The Actual4test copy has the same four options and repeats Allow reprinting. The intended Salesforce feature is Allow Reparenting; corrected that word only. No missing option resolves the standard Order/OrderItem relationship limitation.",
        "references": [
          "https://www.actual4test.com/discussions/Salesforce/exam-crt-450-topic-3-question-195-discussion-p1162036.html"
        ]
      }
    },
    "repair": "Corrected Allow reprinting to the Salesforce feature name Allow Reparenting in D. The standard Order/OrderItem scenario is unchanged and still does not supply a configurable custom master-detail relationship, so the question remains Not scored.",
    "repairNotes": [
      "Only the identified term was repaired. Online copies may repeat the same malformed wording; Salesforce documentation verifies the API/feature name. The original key is still unverified.",
      "Reference: https://help.salesforce.com/s/articleView?id=platform.relationships_considerations.htm&language=en_US&type=5",
      "Reference: https://www.actual4test.com/discussions/Salesforce/exam-crt-450-topic-3-question-195-discussion-p1162036.html"
    ]
  },
  {
    "id": 97,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      {
        "ask": "Which three resources in an Aura component can contain JavaScript functions?"
      },
      {
        "ask": "Choose 3 answers"
      }
    ],
    "choices": [
      "Style",
      "Renderer",
      "Controller",
      "Design",
      "Helper"
    ],
    "answer": "B,C,E",
    "type": "multi",
    "why": "Aura renderer, client-side controller, and helper resources can contain JavaScript functions.",
    "wrong": {
      "A": "Contains CSS, not JavaScript.",
      "D": "Defines design-time attributes, not JavaScript logic."
    },
    "notes": [
      "The style resource contains CSS; the design resource describes design-time configuration. Prefer helper functions for shared logic and customize rendering only when ordinary component lifecycle behavior cannot meet the need."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Aura renderer, client-side controller, and helper resources can contain JavaScript functions.",
      "references": []
    }
  },
  {
    "id": 98,
    "section": "fundamentals",
    "focus": "must",
    "group": "queries",
    "stem": [
      "A custom object Trainer__c has a lookup field to another custom object Gym__c.",
      {
        "ask": "Which SOQL query will get the record for the Viridian City Gym and all it's trainers?"
      }
    ],
    "choices": [
      "SELECT ID FROM Trainer__c WHERE Gym__r.Name = 'Viridian City Gym'",
      "SELECT Id, (SELECT Id FROM Trainer__c FROM Gym__c WHERE Name = 'Viridian City Gym'",
      "SELECT Id, (SELECT Id FROM Trainers__r) FROM Gym__c WHERE Name = 'Viridian City Gym'",
      "SELECT Id, (SELECT Id FROM Trainers__c) FROM Gym__c WHERE Name = 'Viridian City Gym'"
    ],
    "answer": "C",
    "why": "Query Gym__c as the outer object and use its configured Trainers__r child relationship in the nested SELECT.",
    "wrong": {
      "A": "Gym__r walks up to the parent. This query needs the child Trainers from the Gym.",
      "B": "The subquery is not closed, and the second FROM is invalid.",
      "D": "Trainers__c is not the configured child relationship name. The child object is Trainer__c, and this parent-to-child subquery must use Trainers__r."
    },
    "notes": [
      "Custom parent traversal uses the lookup’s __r path, while a parent-to-child subquery uses the configured child relationship name. That name is not reliably guessed from the child object."
    ],
    "source": {
      "stem": [
        "A custom object Trainer__c has a lookup field to another custom object Gym__c.",
        {
          "ask": "Which SOQL query will get the record for the Viridian City Gym and all it's trainers?"
        }
      ],
      "choices": [
        "SELECT ID FROM Trainer_c WHERE Gym_r.Name = 'Viridian City Gym'",
        "SELECT Id, (SELECT Id FROM Trainer_c FROM Gym_c WHERE Name = 'Viridian City Gym'",
        "SELECT Id, (SELECT Id FROM Trainers _r) FROM Gym_c WHERE Name = 'Viridian City Gym'",
        "SELECT Id, (SELECT Id FROM Trainers _c) FROM Gym_c WHERE Name = 'Viridian City Gym'"
      ],
      "answer": "C"
    },
    "printed": "C",
    "repaired": true,
    "repair": "Repair only damaged custom-object/relationship suffixes in the choices. C is the parent-to-child query under the relationship name shown in that choice; explain that actual metadata must define that name, without inventing it in the stem.",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Repair only damaged custom-object/relationship suffixes in the choices. C is the parent-to-child query under the relationship name shown in that choice; explain that actual metadata must define that name, without inventing it in the stem.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "The __c/__r repairs preserve the parent-to-child query shape; the actual child relationship name remains a metadata caveat."
      }
    }
  },
  {
    "id": 99,
    "section": "automation",
    "focus": "high",
    "group": "flows",
    "stem": [
      "Universal Containers decides to use purely declarative development to build out a new Salesforce application.",
      {
        "ask": "Which two options can be used to build out the business logic layer for this application?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Record-Triggered Flow",
      "Batch Jobs",
      "Remote Actions",
      "Validation Rules"
    ],
    "answer": "A,D",
    "type": "multi",
    "why": "Record-triggered flows implement declarative automation, and validation rules enforce declarative data-quality conditions.",
    "wrong": {
      "B": "Batch jobs are not declarative.",
      "C": "Remote Actions require code."
    },
    "notes": [
      "Batch Apex and @RemoteAction require code. Flow still needs tests, error handling, and bulk-safe design; being declarative does not remove governor limits or change-management responsibilities."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Record-triggered flows implement declarative automation, and validation rules enforce declarative data-quality conditions.",
      "references": []
    }
  },
  {
    "id": 100,
    "section": "ui",
    "focus": "high",
    "group": "visualforce",
    "stem": [
      "Universal Containers has a Visualforce page that displays a table of every Container__c being rented by a given Account. Recently this page is failing with a view state limit because some of the customers rent over 10,000 containers.",
      {
        "ask": "What should a developer change about the Visualforce page to help with the page load errors?"
      }
    ],
    "choices": [
      "Implement pagination with an OffsetController.",
      "Implement pagination with a StandardSetController.",
      "Use JavaScript remoting with SOQL Offset.",
      "Use lazy loading and a transient List variable."
    ],
    "answer": "D",
    "why": "D addresses the original view-state problem with bounded lazy loading and a transient collection. StandardSetController has a 10,000-record ceiling, so B does not meet the stated volume. Use bounded/keyset retrieval rather than deep OFFSET pagination.",
    "wrong": {
      "A": "OffsetController is not a Salesforce pagination class.",
      "B": "StandardSetController supports at most 10,000 records, below the volume in the original question.",
      "C": "Large SOQL OFFSET values are limited and do not by themselves fix retaining a large collection in view state."
    },
    "notes": [
      "StandardSetController has a 10,000-record ceiling. Larger collections need a different paging architecture. OFFSET itself has a 2,000-row skip limit; transient alone does not provide pagination.",
      "Salesforce reference: Standard list controller record ceiling — https://developer.salesforce.com/docs/platform/salesforce-pages-developers-guide/guide/pages-controller-sosc-access-data.html",
      "Reference: https://developer.salesforce.com/docs/platform/salesforce-app-limits-cheatsheet/guide/salesforce-app-limits-platform-vf.html"
    ],
    "source": {
      "stem": [
        "Universal Containers has a Visualforce page that displays a table of every Container__c being rented by a given Account. Recently this page is failing with a view state limit because some of the customers rent over 10,000 containers.",
        {
          "ask": "What should a developer change about the Visualforce page to help with the page load errors?"
        }
      ],
      "choices": [
        "Implement pagination with an OffsetController.",
        "Implement pagination with a StandardSetController.",
        "Use JavaScript remoting with SOQL Offset.",
        "Use lazy loading and a transient List variable."
      ],
      "answer": "B"
    },
    "printed": "B",
    "corrected": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "The original explicitly exceeds 10,000 records, so StandardSetController is not a valid answer. Lazy loading with a transient collection addresses view state without that controller ceiling; preserve the original volume rather than changing it to 8,000. Use bounded loading/keyset techniques, not large SOQL OFFSET values.",
      "references": [
        "https://developer.salesforce.com/docs/platform/salesforce-pages-developers-guide/guide/pages-controller-sosc-access-data.html",
        "https://developer.salesforce.com/docs/platform/salesforce-app-limits-cheatsheet/guide/salesforce-app-limits-platform-vf.html"
      ]
    }
  },
  {
    "id": 101,
    "section": "testing",
    "focus": "high",
    "group": "deploy",
    "stem": [
      {
        "ask": "What are two considerations for deploying from a sandbox to production?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "At least 75% of Apex code must be covered by unit tests.",
      "Unit tests must have calls to the System.assert method.",
      "Should deploy during business hours to ensure feedback can be quickly addressed.",
      "All triggers must have at least one line of test coverage."
    ],
    "answer": "A,D",
    "type": "multi",
    "why": "Under RunLocalTests, at least 75% eligible Apex coverage is required org-wide and every trigger needs some executed coverage.",
    "wrong": {
      "B": "Assertions (System.assert) are recommended but not required.",
      "C": "Deployment during business hours is not a requirement."
    },
    "notes": [
      "Tests must pass as well. Assertions are essential to useful tests but no particular System.assert call count is the deployment gate. RunSpecifiedTests has different per-deployed-component coverage rules.",
      "Deployment test levels: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_start.html"
    ],
    "source": {
      "stem": [
        {
          "ask": "What are two considerations for deploying from a sandbox to production?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "At least 75% of Apex code must be covered by unit tests.",
        "Unit tests must have calls to the System.assert method.",
        "Should deploy during business hours to ensure feedback can be quickly addressed.",
        "All triggers must have at least one line of test coverage."
      ],
      "answer": "A,D"
    },
    "printed": "A,D",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Specify the coverage rules for RunLocalTests. Original wording and choices are retained; the source key remains accepted. Under RunLocalTests, at least 75% eligible Apex coverage is required org-wide and every trigger needs some executed coverage.",
      "references": [
        "https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_start.html"
      ]
    }
  },
  {
    "id": 102,
    "section": "automation",
    "focus": "must",
    "group": "security",
    "stem": [
      {
        "ask": "In the following example, which sharing context will myMethod execute when it is invoked?"
      }
    ],
    "choices": [
      "Sharing rules will be enforced by the instantiating class.",
      "Sharing rules will be enforced for the running user.",
      "Sharing rules will not be enforced for the running user.",
      "Sharing rules will be inherited from the calling context."
    ],
    "answer": "",
    "why": "Not scored. The sharing-context example itself is still missing. Sharing defaults also depend on the applicable API/caller context, so selecting a sharing answer would invent essential execution facts.",
    "wrong": {},
    "notes": [
      "The prior review supplied API 67.0+ and selected B. That makes a valid modern study example, but does not establish that the source's historical C was always wrong. The Corrected badge is withdrawn and the original incomplete question is left unscored.",
      "Specify both API version and entry/caller context before restoring scoring. Prefer explicit with sharing or inherited sharing in real code, and choose database user/system mode deliberately for CRUD/FLS enforcement.",
      "Current security defaults: https://developer.salesforce.com/docs/platform/lwc/guide/apex-security",
      "Summer 26 changes: https://developer.salesforce.com/blogs/2026/06/the-salesforce-developers-guide-to-the-summer-26-release",
      "Compared historical variant: https://www.freecram.net/question/Salesforce.DEX-450.v2025-03-03.q80/in-the-following-example-which-sharing-context-will-mymethod-execute-when-it-is-invoked-exhibit"
    ],
    "printed": "C",
    "source": {
      "stem": [
        {
          "ask": "In the following example, which sharing context will myMethod execute when it is invoked?"
        }
      ],
      "choices": [
        "Sharing rules will be enforced by the instantiating class.",
        "Sharing rules will be enforced for the running user.",
        "Sharing rules will not be enforced for the running user.",
        "Sharing rules will be inherited from the calling context."
      ],
      "answer": "C"
    },
    "ungraded": true,
    "exhibitMissing": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "unresolved",
      "reason": "The sharing-context example itself is still missing. Sharing defaults also depend on the applicable API/caller context, so selecting a sharing answer would invent essential execution facts.",
      "references": [
        "https://developer.salesforce.com/docs/platform/lwc/guide/apex-security",
        "https://developer.salesforce.com/blogs/2026/06/the-salesforce-developers-guide-to-the-summer-26-release",
        "https://www.freecram.net/question/Salesforce.DEX-450.v2025-03-03.q80/in-the-following-example-which-sharing-context-will-mymethod-execute-when-it-is-invoked-exhibit",
        "https://www.freecram.com/discussions/Salesforce/exam-pdi-topic-5-question-42-discussion-p1225658.html"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "unresolved",
        "queries": [
          "\"which sharing context\" \"myMethod\" \"myClass\""
        ],
        "candidates": [
          "https://www.freecram.net/question/Salesforce.DEX-450.v2025-03-03.q80/in-the-following-example-which-sharing-context-will-mymethod-execute-when-it-is-invoked-exhibit",
          "https://www.freecram.com/discussions/Salesforce/exam-pdi-topic-5-question-42-discussion-p1225658.html"
        ],
        "assessment": "The sharing-context example itself is still missing. Sharing defaults also depend on the applicable API/caller context, so selecting a sharing answer would invent essential execution facts."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "not-scored",
        "decision": "still-unresolved",
        "reason": "The sharing-context example itself is still missing. Sharing defaults also depend on the applicable API/caller context, so selecting a sharing answer would invent essential execution facts."
      },
      "optionAudit": {
        "date": "2026-10-17",
        "status": "incomplete",
        "comparedChoiceCount": 4,
        "assessment": "The FreeCram variants contain all four sharing-context choices, in different orders. The linked exhibit could not be retrieved. A comment on a same-order copy explicitly guesses a missing class; that guessed code is not verified recovery evidence. Retain the missing exhibit.",
        "references": [
          "https://www.freecram.com/discussions/Salesforce/exam-pdi-topic-5-question-42-discussion-p1225658.html",
          "https://www.freecram.net/question/Salesforce.DEX-450.v2025-03-03.q80/in-the-following-example-which-sharing-context-will-mymethod-execute-when-it-is-invoked-exhibit"
        ]
      }
    }
  },
  {
    "id": 103,
    "section": "testing",
    "focus": "familiar",
    "group": "deploy",
    "stem": [
      "Universal Containers has developed custom Apex code and Lightning Components in a Sandbox environment. They need to deploy",
      "the code and associated configurations to the Production environment.",
      {
        "ask": "What is the recommended process for deploying the code and configurations to Production?"
      }
    ],
    "choices": [
      "Use the Force.com IDE to deploy the Apex code and Lightning Components.",
      "Use the Ant Migration Tool to deploy the Apex cade and Lightning Components.",
      "Use a change set to deploy the Apex code and Lightning Components.",
      "Use Salesforce CLI to deploy the Apex code and Lightning Components."
    ],
    "answer": "C,D",
    "why": "Change sets and Salesforce CLI can both deploy the sandbox metadata to production. The source does not require a point-and-click interface, so C or D is accepted.",
    "wrong": {
      "A": "The Force.com IDE is deprecated.",
      "B": "The Ant Migration Tool can still function as-is, but it is retired and unsupported; Salesforce recommends Salesforce CLI for a supported developer workflow."
    },
    "notes": [
      "Authorize the deployment connection, include dependent components, upload, then validate/deploy the inbound change set. Salesforce CLI is also supported and is preferred for many source-controlled pipelines."
    ],
    "source": {
      "stem": [
        "Universal Containers has developed custom Apex code and Lightning Components in a Sandbox environment. They need to deploy",
        "the code and associated configurations to the Production environment.",
        {
          "ask": "What is the recommended process for deploying the code and configurations to Production?"
        }
      ],
      "choices": [
        "Use the Force.com IDE to deploy the Apex code and Lightning Components.",
        "Use the Ant Migration Tool to deploy the Apex cade and Lightning Components.",
        "Use a change set to deploy the Apex code and Lightning Components.",
        "Use Salesforce CLI to deploy the Apex code and Lightning Components."
      ],
      "answer": "C"
    },
    "printed": "C",
    "acceptAny": true,
    "type": "single",
    "choose": 1,
    "repaired": true,
    "repair": "The original does not request point-and-click deployment. Both change sets and Salesforce CLI can deploy sandbox Apex/components/configuration to production. Preserve both supported options instead of narrowing the question.",
    "review": {
      "date": "2026-10-17",
      "treatment": "accepted-alternatives",
      "reason": "The original does not request point-and-click deployment. Both change sets and Salesforce CLI can deploy sandbox Apex/components/configuration to production. Preserve both supported options instead of narrowing the question.",
      "references": [
        "https://developer.salesforce.com/docs/platform/salesforce-migration-guide/guide/forcemigrationtool.html"
      ],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "explanation-refined",
        "reason": "Removed the invented point-and-click restriction from the Ant explanation and retained both supported deployment alternatives."
      }
    }
  },
  {
    "id": 104,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      "Universal Containers decided to transition from Classic to Lightning Experience. They asked a developer to replace a JavaScript button that was being used to create records with prepopulated values.",
      {
        "ask": "What can the developer use to accomplish this?"
      }
    ],
    "choices": [
      "Validation rules",
      "Apex triggers",
      "Record triggered flows",
      "Quick Actions"
    ],
    "answer": "D",
    "why": "A create-record quick action can replace the JavaScript button and provide predefined field values in Lightning Experience.",
    "wrong": {
      "A": "Validation rules enforce data integrity but do not create records.",
      "B": "A trigger runs in response to record DML, including DML initiated by users. It does not itself supply the requested user-launchable interface.",
      "C": "Record-triggered flows execute automatically when records are created or updated, but they do not replace JavaScript buttons for user-initiated actions."
    },
    "notes": [
      "Configure the action for the correct target object, layout, and predefined values. Record-triggered automation acts on a save; it does not by itself provide the user-invoked creation interface that the button supplied."
    ],
    "source": {
      "stem": [
        "Universal Containers decided to transition from Classic to Lightning Experience. They asked a developer to replace a JavaScript button that was being used to create records with prepopulated values.",
        {
          "ask": "What can the developer use to accomplish this?"
        }
      ],
      "choices": [
        "Validation rules",
        "Apex triggers",
        "Record triggered flows",
        "Quick Actions"
      ],
      "answer": "D"
    },
    "printed": "D",
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "A create-record quick action can replace the JavaScript button and provide predefined field values in Lightning Experience.",
      "references": []
    }
  },
  {
    "id": 105,
    "section": "automation",
    "focus": "high",
    "group": "flows",
    "stem": [
      "A Next Best Action strategy uses an Enhance Element that invokes an Apex method to determine a discount level for a Contact, based on a number of factors.",
      {
        "ask": "What is the correct definition of the Apex method?"
      }
    ],
    "choices": [
      {
        "code": [
          "@InvocableMethod",
          "  global static List<List<Recommendation>> getLevel(List<ContactWrapper> input) { /* implementation */ }"
        ]
      },
      {
        "code": [
          "@InvocableMethod",
          "  global Recommendation getLevel(ContactWrapper input) { /* implementation */ }"
        ]
      },
      {
        "code": [
          "@InvocableMethod",
          "  global List<List<Recommendation>> getLevel(List<ContactWrapper> input) { /* implementation */ }"
        ]
      },
      {
        "code": [
          "@InvocableMethod",
          "  global static List<Recommendation> getLevel(List<ContactWrapper> input) { /* implementation */ }"
        ]
      }
    ],
    "answer": "A",
    "why": "A is static, annotated @InvocableMethod, accepts a list of wrapper inputs, and returns List<List<Recommendation>> as required by the Enhance element.",
    "wrong": {
      "B": "The method must be static and must return List<List<Recommendation>>.",
      "C": "The method is missing static.",
      "D": "A single list is the wrong return type. Next Best Action expects a nested list."
    },
    "notes": [
      "The wrapper must expose the required recommendations collection and other inputs with @InvocableVariable. Each input’s enhanced recommendations occupy a corresponding inner list. A flat List<Recommendation> is a possible invocable shape elsewhere but not the Enhance contract here. Enhancements are in memory unless explicitly persisted.",
      "Salesforce reference: Next Best Action Enhance contract — https://help.salesforce.com/s/articleView?id=sf.nba_strategy_elements_enhance.htm&language=en_US&type=5",
      "These are declaration excerpts, not complete compilable implementations. A real non-void method must return a value of the declared type, and the containing class must have suitable visibility."
    ],
    "printed": "D",
    "source": {
      "stem": [
        "A Next Best Action strategy uses an Enhance Element that invokes an Apex method to determine a discount level for a Contact, based on a number of factors.",
        {
          "ask": "What is the correct definition of the Apex method?"
        }
      ],
      "choices": [
        {
          "code": [
            "@InvocableMethod",
            "  global static List<List<Recommendation>> getLevel(List<ContactWrapper> input) { /* implementation */ }"
          ]
        },
        {
          "code": [
            "@InvocableMethod",
            "  global Recommendation getLevel(ContactWrapper input) { /* implementation */ }"
          ]
        },
        {
          "code": [
            "@InvocableMethod",
            "  global List<List<Recommendation>> getLevel(List<ContactWrapper> input) { /* implementation */ }"
          ]
        },
        {
          "code": [
            "@InvocableMethod",
            "  global static List<Recommendation> getLevel(List<ContactWrapper> input) { /* implementation */ }"
          ]
        }
      ],
      "answer": "D"
    },
    "corrected": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "A is static, annotated @InvocableMethod, accepts a list of wrapper inputs, and returns List<List<Recommendation>> as required by the Enhance element.",
      "references": [
        "https://help.salesforce.com/s/articleView?id=sf.nba_strategy_elements_enhance.htm&language=en_US&type=5"
      ]
    }
  },
  {
    "id": 106,
    "section": "testing",
    "focus": "familiar",
    "group": "deploy",
    "stem": [
      "A developer wants to import 500 Opportunity records into a sandbox.",
      {
        "ask": "Why should the developer choose to use Data Loader instead of Data Import Wizard?"
      }
    ],
    "choices": [
      "Data Loader automatically relates Opportunities to Accounts.",
      "Data Loader runs from the developer's browser.",
      "Data Import Wizard does not support Opportunities.",
      "Data Import Wizard can not import all 500 records,"
    ],
    "answer": "C",
    "why": "Data Import Wizard does not support Opportunity import, whereas Data Loader supports the Opportunity object.",
    "wrong": {
      "A": "Account relationships must be mapped using an Id or supported external-ID reference; they are not automatically inferred.",
      "B": "Data Loader is a desktop application, not browser-based.",
      "D": "The Data Import Wizard can handle more than 500 records for supported objects, but it doesn't support Opportunities."
    },
    "notes": [
      "Five hundred records is not itself too many for the wizard on supported objects. Map AccountId or an appropriate related external-ID reference explicitly; Data Loader does not infer the correct Account association from arbitrary input."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Data Import Wizard does not support Opportunity import, whereas Data Loader supports the Opportunity object.",
      "references": []
    }
  },
  {
    "id": 107,
    "section": "fundamentals",
    "focus": "high",
    "group": "language",
    "stem": [
      "Refer to the exhibit.",
      {
        "code": [
          "public static void insertAccounts(List<Account> theseAccounts) {",
          "      for (Account thisAccount : theseAccounts) {",
          "          if (thisAccount.website == null) {",
          "              thisAccount.website = 'https://www.demo.com';",
          "          }",
          "      }",
          "      update theseAccounts;",
          "  }"
        ]
      },
      "When the code executes, a DML exception is thrown.",
      {
        "ask": "How should a developer modify the code to ensure exceptions are handled gracefully?"
      }
    ],
    "choices": [
      "Implement the upsert DML statement.",
      "Implement Change Data Capture.",
      "Implement a try/catch block for the DML.",
      "Remove null items from the list of Accounts."
    ],
    "answer": "C",
    "why": "Wrap the update DML in a try/catch for DmlException and handle/report the failure in a way the caller can act on.",
    "wrong": {
      "A": "Changing update to upsert does not catch the exception.",
      "B": "Change Data Capture does not handle this DML exception.",
      "D": "Removing nulls does not catch the exception the update throws."
    },
    "notes": [
      "Upsert changes matching behavior rather than providing exception handling. If partial row success is a requirement, Database.update(records, false) plus SaveResult inspection is another design. Do not silently swallow a thrown exception."
    ],
    "source": {
      "stem": [
        "Refer to the exhibit.",
        {
          "code": [
            "public static void insertAccounts(List<Account> theseAccounts) {",
            "      for (Account thisAccount : theseAccounts) {",
            "          if (thisAccount.website == null) {",
            "              thisAccount.website = 'https://www.demo.com';",
            "          }",
            "      }",
            "      update theseAccounts;",
            "  }"
          ]
        },
        "When the code executes, a DML exception is thrown.",
        {
          "ask": "How should a developer modify the code to ensure exceptions are handled gracefully?"
        }
      ],
      "choices": [
        "Implement the upset DML statement.",
        "Implement Change Data Capture.",
        "Implement a try/catch block for the DML.",
        "Remove null items from the list of Accounts."
      ],
      "answer": "C"
    },
    "printed": "C",
    "repaired": true,
    "repair": "Correct upset to upsert in the distractor only. The source method name need not match its update operation and must not be renamed as a supposed repair.",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Correct upset to upsert in the distractor only. The source method name need not match its update operation and must not be renamed as a supposed repair.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "The upsert typo fix preserves the exception-handling question; try/catch remains the appropriate listed response."
      }
    }
  },
  {
    "id": 108,
    "section": "automation",
    "focus": "high",
    "group": "triggers",
    "stem": [
      {
        "ask": "What is the value of the Trigger.old context variable in a before insert trigger?"
      }
    ],
    "choices": [
      "An empty list of sObjects",
      "Undefined",
      "null",
      "A list of newly created sObjects without IDs"
    ],
    "answer": "C",
    "why": "Trigger.old is null in before insert because newly inserted records have no previous database version.",
    "wrong": {
      "A": "An empty list of sObjects: This is incorrect because Trigger.old is not initialized as an empty list for insert triggers---it is simply null.",
      "B": "Undefined: Trigger.old is defined in the trigger context, but it is null for insert operations. Undefined is not a valid Apex state.",
      "D": "A list of newly created sObjects without IDs: This describes Trigger.new in abefore inserttrigger, not Trigger.old. Trigger.new contains the new records being inserted."
    },
    "notes": [
      "Trigger.new contains the incoming records and their Ids are not assigned yet. Trigger.old is available for update/delete contexts. Check the context rather than dereferencing an unavailable variable."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Trigger.old is null in before insert because newly inserted records have no previous database version.",
      "references": []
    }
  },
  {
    "id": 109,
    "section": "automation",
    "focus": "high",
    "group": "language",
    "stem": [
      "A lead developer creates a virtual class called 'OrderRequest'. Consider the following code snippet:",
      {
        "code": [
          "public class CustomerOrder {",
          "      // code implementation",
          "  }"
        ]
      },
      {
        "ask": "How can a developer use the OrderRequest class within the CustomerOrder class?"
      }
    ],
    "choices": [
      "extends (class='OrderRequest')\n  public class CustomerOrder",
      "public class CustomerOrder implements Order",
      "public class CustomerOrder extends OrderRequest",
      "@Implements (class='OrderRequest')\n  public class CustomerOrder"
    ],
    "answer": "C",
    "why": "CustomerOrder extends OrderRequest because OrderRequest is a virtual Apex class.",
    "wrong": {
      "A": "Extends (class='OrderRequest') is not Apex syntax.",
      "B": "Implements is for an interface. OrderRequest is a virtual class.",
      "D": "@Implements is not how a class extends another class."
    },
    "notes": [
      "A virtual class can be instantiated and subclassed. Override its virtual methods with override where behavior changes; implements is for interfaces. A base class that is neither virtual nor abstract cannot be subclassed in Apex."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "CustomerOrder extends OrderRequest because OrderRequest is a virtual Apex class.",
      "references": []
    }
  },
  {
    "id": 110,
    "section": "automation",
    "focus": "low",
    "group": "language",
    "stem": [
      "A lead developer creates a virtual class called 'OrderRequest'. Consider the following code snippet:",
      {
        "code": [
          "Public class CustomerOrder {",
          "      //code implementation}"
        ]
      },
      {
        "ask": "How can a developer use the OrderRequest class within the CustomerOrder class?"
      }
    ],
    "choices": [
      "Extends (class='OrderRequest')\n  public class CustomerOrder",
      "public class CustomerOrder implements Order",
      "public class CustomerOrder extends OrderRequest",
      "@Implements (class='OrderRequest')\n  public class Customerorder"
    ],
    "answer": "C",
    "why": "Use public class CustomerOrder extends OrderRequest to inherit the virtual class.",
    "wrong": {
      "A": "Extends (class='OrderRequest') is not Apex syntax.",
      "B": "Implements is for an interface. OrderRequest is a virtual class.",
      "D": "@Implements is not how a class extends another class."
    },
    "notes": [
      "A virtual method can be overridden with override; implementing an interface uses implements."
    ],
    "source": {
      "stem": [
        "A lead developer creates a virtual class called 'OrderRequest'. Consider the following code snippet:",
        {
          "code": [
            "Public class CustomerOrder {",
            "      //code implementation}"
          ]
        },
        {
          "ask": "How can a developer use the OrderRequest class within the CustomerOrder class?"
        }
      ],
      "choices": [
        "Extends (class='OrderRequest')\n  public class CustomerOrder",
        "public class CustomerOrder implements Order",
        "public class CustomerOrder extends OrderRequest",
        "@Implements (class='OrderRequest')\n  public class Customerorder"
      ],
      "answer": "C"
    },
    "printed": "C",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Restore the closing class brace that was swallowed by an OCR line comment. Original wording and choices are retained; the source key remains accepted. Use public class CustomerOrder extends OrderRequest to inherit the virtual class.",
      "references": []
    }
  },
  {
    "id": 111,
    "section": "testing",
    "focus": "high",
    "group": "async",
    "stem": [
      {
        "ask": "Where are two locations a developer can look to find information about the status of batch or future methods?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Developer Console",
      "Apex Jobs",
      "Paused Flow Interviews component",
      "Apex Flex Queue"
    ],
    "answer": "",
    "type": "multi",
    "why": "Not scored. Developer Console queries, Apex Jobs and Apex Flex Queue all provide real status information for at least one of the stated batch-or-future job types. Flex Queue excludes future jobs, but the source says or rather than requiring both; three supported locations conflict with Choose 2.",
    "wrong": {},
    "notes": [
      "The Flex Queue is specifically for held Batch Apex jobs and their ordering; it does not provide the equivalent future-method view. A log gives execution details, while AsyncApexJob/Apex Jobs are the appropriate status sources."
    ],
    "source": {
      "stem": [
        {
          "ask": "Where are two locations a developer can look to find information about the status of batch or future methods?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "Developer Console",
        "Apex Jobs",
        "Paused Flow Interviews component",
        "Apex Flex Queue"
      ],
      "answer": "A,B"
    },
    "printed": "A,B",
    "ungraded": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "unresolved",
      "reason": "Developer Console queries, Apex Jobs and Apex Flex Queue all provide real status information for at least one of the stated batch-or-future job types. Flex Queue excludes future jobs, but the source says or rather than requiring both; three supported locations conflict with Choose 2.",
      "references": [
        "https://www.freecram.com/discussions/Salesforce/exam-pdi-topic-3-question-113-discussion-p1150101.html",
        "https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/salesforce_apex_developer_guide.pdf"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "unresolved",
        "queries": [
          "\"status of batch or future methods\""
        ],
        "candidates": [
          "https://www.freecram.com/discussions/Salesforce/exam-pdi-topic-3-question-113-discussion-p1150101.html"
        ],
        "assessment": "Developer Console queries, Apex Jobs and Apex Flex Queue all provide real status information for at least one of the stated batch-or-future job types. Flex Queue excludes future jobs, but the source says or rather than requiring both; three supported locations conflict with Choose 2."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "not-scored",
        "decision": "still-unresolved",
        "reason": "Developer Console queries, Apex Jobs and Apex Flex Queue all provide real status information for at least one of the stated batch-or-future job types. Flex Queue excludes future jobs, but the source says or rather than requiring both; three supported locations conflict with Choose 2."
      },
      "optionAudit": {
        "date": "2026-10-17",
        "status": "matched",
        "comparedChoiceCount": 4,
        "assessment": "All four locations match the FreeCram copy exactly. That page gives A,B while a comment favors B,D. No location is omitted; the issue is the scope of batch or future status and whether indirect Developer Console queries count.",
        "references": [
          "https://www.freecram.com/discussions/Salesforce/exam-pdi-topic-3-question-113-discussion-p1150101.html"
        ]
      }
    }
  },
  {
    "id": 112,
    "section": "automation",
    "focus": "high",
    "group": "integration",
    "stem": [
      "Cloud Kicks has a multi-screen flow that its call center agents use when handling inbound service desk calls.",
      "At one of the steps in the flow, the agents should be presented with a list of order numbers and dates that are retrieved from an external order management system in real time and displayed on the screen.",
      {
        "ask": "What should a developer use to satisfy this requirement?"
      }
    ],
    "choices": [
      "An outbound message",
      "An Apex REST class",
      "An Apex controller",
      "An invocable method"
    ],
    "answer": "D",
    "why": "Expose an invocable Apex method that the screen flow calls to retrieve order numbers/dates and return them for display.",
    "wrong": {
      "A": "An outbound message sends a notification. It is not the Apex a flow calls.",
      "B": "Apex REST receives an inbound call. A flow calls an invocable method.",
      "C": "An Apex controller can serve a UI, but the label alone does not expose a Flow action. Use a supported @InvocableMethod contract for this Flow-to-Apex call."
    },
    "notes": [
      "The method performs an outbound HTTP callout, normally using a Named Credential and an appropriate @InvocableMethod(callout=true) definition. Configure the flow transaction boundary so pending DML does not block the callout. An Apex REST class exposes an inbound endpoint rather than a Flow action."
    ],
    "printed": "B",
    "source": {
      "stem": [
        "Cloud Kicks has a multi-screen flow that its call center agents use when handling inbound service desk calls.",
        "At one of the steps in the flow, the agents should be presented with a list of order numbers and dates that are retrieved from an external order management system in real time and displayed on the screen.",
        {
          "ask": "What should a developer use to satisfy this requirement?"
        }
      ],
      "choices": [
        "An outbound message",
        "An Apex REST class",
        "An Apex controller",
        "An invocable method"
      ],
      "answer": "B"
    },
    "corrected": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "Expose an invocable Apex method that the screen flow calls to retrieve order numbers/dates and return them for display.",
      "references": []
    }
  },
  {
    "id": 113,
    "section": "ui",
    "focus": "must",
    "group": "lightning",
    "stem": [
      {
        "ask": "Which two characteristics are true for Lightning Web Component custom events?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Data may be passed in the payload of a custom event using @wire decorated properties.",
      "Data may be passed In the payload of a custom event using a property called detail.",
      "By default a custom event only propagates to its immediate container and to its immediate child component.",
      "By default a custom event only propagates to it's immediate container."
    ],
    "answer": "B,D",
    "type": "multi",
    "why": "Custom-event data belongs in detail, and a parent can listen directly on the child component’s host to receive an event dispatched using this.dispatchEvent().",
    "wrong": {
      "A": "@wire is not the payload of a custom event.",
      "C": "With the defaults, the event does not reach a child."
    },
    "notes": [
      "bubbles and composed both default to false. A host listener still runs, but the event does not automatically traverse ancestors or travel downward into children. Dispatching an event from an internal DOM element is a different listener/encapsulation situation.",
      "Salesforce reference: LWC event propagation — https://developer.salesforce.com/docs/platform/lwc/guide/events-propagation.html"
    ],
    "printed": "B,C",
    "source": {
      "stem": [
        {
          "ask": "Which two characteristics are true for Lightning Web Component custom events?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "Data may be passed in the payload of a custom event using @wire decorated properties.",
        "Data may be passed In the payload of a custom event using a property called detail.",
        "By default a custom event only propagates to its immediate container and to its immediate child component.",
        "By default a custom event only propagates to it's immediate container."
      ],
      "answer": "B,C"
    },
    "corrected": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "Event payload uses detail; the parent can listen on the child host for the ordinary default event. Preserve the original choices and explain bubbles/composed defaults rather than replacing their text.",
      "references": [
        "https://developer.salesforce.com/docs/platform/lwc/guide/events-propagation.html"
      ]
    }
  },
  {
    "id": 114,
    "section": "automation",
    "focus": "must",
    "group": "limits",
    "stem": [
      {
        "ask": "How many Accounts will be inserted by the following block of code?"
      },
      {
        "code": [
          "for (Integer i = 0; i < 500; i++) {",
          "      Account a = new Account(Name = 'New Account ' + i);",
          "      insert a;",
          "  }"
        ]
      }
    ],
    "choices": [
      "100",
      "0",
      "150",
      "500"
    ],
    "answer": "B",
    "why": "The 151st separate insert exceeds the 150-DML-statement transaction limit, causing an uncatchable LimitException and rollback; zero Accounts remain committed.",
    "wrong": {
      "A": "100 rows do not remain. The failed transaction rolls back.",
      "C": "150 is the DML statement limit that is hit, not the number of saved rows.",
      "D": "The loop plans 500 inserts but execution stops at the 151st DML statement. The failed transaction leaves none of those inserted Accounts committed."
    },
    "notes": [
      "The loop is capable of 500 iterations but never completes them. A single insert of a prepared 500-record list would use one DML statement if all other applicable limits and validation permit it. Distinguish attempted work from committed records."
    ],
    "printed": "D",
    "source": {
      "stem": [
        {
          "ask": "How many Accounts will be inserted by the following block of code?"
        },
        {
          "code": [
            "for (Integer i = 0; i < 500; i++) {",
            "      Account a = new Account(Name = 'New Account ' + i);",
            "      insert a;",
            "  }"
          ]
        }
      ],
      "choices": [
        "100",
        "0",
        "150",
        "500"
      ],
      "answer": "D"
    },
    "corrected": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "The 151st separate insert exceeds the 150-DML-statement transaction limit, causing an uncatchable LimitException and rollback; zero Accounts remain committed.",
      "references": []
    }
  },
  {
    "id": 115,
    "section": "testing",
    "focus": "must",
    "group": "tests",
    "stem": [
      "While working in a sandbox, an Apex test fails when run in the Test Runner. However, executing the Apex logic in the Execute Anonymous window succeeds with no exceptions or errors.",
      {
        "ask": "Why did the method fail in the sandbox test framework but succeed in the Developer Console?"
      }
    ],
    "choices": [
      "The test method does not use system. runAs to execute as a specific user.",
      "The test method is calling an @future method.",
      "The test method relies on existing data in the sandbox.",
      "The test method has a syntax error in the code."
    ],
    "answer": "C",
    "why": "The test most likely depends on ordinary sandbox records that isolated Apex tests do not see, while Execute Anonymous can access existing data under its execution context.",
    "wrong": {
      "A": "System.runAs changes user context, but it does not make ordinary existing sandbox data available to an isolated test.",
      "B": "Calling an @future method alone does not explain this difference. If the test depends on its result, also investigate Test.startTest()/Test.stopTest() and the actual failure.",
      "D": "Syntax errors would prevent code compilation."
    },
    "notes": [
      "Create deterministic test data instead of making SeeAllData=true the default fix. Some setup/metadata records are exceptions to ordinary test isolation, so not every query against org configuration requires SeeAllData."
    ],
    "source": {
      "stem": [
        "While working in a sandbox, an Apex test fails when run in the Test Runner. However, executing the Apex logic in the Execute Anonymous window succeeds with no exceptions or errors.",
        {
          "ask": "Why did the method fail in the sandbox test framework but succeed in the Developer Console?"
        }
      ],
      "choices": [
        "The test method does not use system. runAs to execute as a specific user.",
        "The test method is calling an @future method.",
        "The test method relies on existing data in the sandbox.",
        "The test method has a syntax error in the code."
      ],
      "answer": "C"
    },
    "printed": "C",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Describe data isolation as a likely listed cause rather than diagnosing every sandbox/production test failure. Describe anonymous execution and isolated tests as different execution contexts. Original wording and choices are retained; the source key remains accepted. The test most likely depends on ordinary sandbox records that isolated Apex tests do not see, while Execute Anonymous can access existing data under its execution context.",
      "references": []
    }
  },
  {
    "id": 116,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      {
        "ask": "What can be easily developed using the Lightning Component framework?"
      }
    ],
    "choices": [
      "Salesforce Classic user interface pages",
      "Lightning Pages",
      "Customized JavaScript buttons",
      "Salesforce integrations"
    ],
    "answer": "B",
    "why": "Lightning components are the building blocks assembled into Lightning pages.",
    "wrong": {
      "A": "Classic pages are not the primary output of Lightning page composition, though Visualforce can embed components through Lightning Out.",
      "C": "JavaScript buttons are replaced by Quick Actions in Lightning Experience.",
      "D": "While integrations are possible, the framework is not primarily used for integrations."
    },
    "notes": [
      "Lightning can also be embedded in Visualforce in Classic through supported integration. That does not make Classic JavaScript buttons a Lightning framework feature. Integrations can be part of a component application but are not the page-building capability asked for."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Lightning components are the building blocks assembled into Lightning pages.",
      "references": []
    }
  },
  {
    "id": 117,
    "section": "automation",
    "focus": "must",
    "group": "security",
    "stem": [
      {
        "ask": "While developing an Apex class with custom search functionality that will be launched from a Lightning Web Component, how can the developer ensure only records accessible to the currently logged in user are displayed?"
      }
    ],
    "choices": [
      "Use the WITH SECURITY_ENFORCED clause within the SOQL.",
      "Use the inherited sharing keyword.",
      "Use the with sharing keyword.",
      "Use the without sharing keyword."
    ],
    "answer": "B,C",
    "why": "For an AuraEnabled Apex entry point called from LWC, with sharing and inherited sharing both enforce the entry user’s record sharing. SECURITY_ENFORCED concerns object/field access, not record-level sharing; accept B or C.",
    "wrong": {
      "A": "WITH SECURITY_ENFORCED is not a class sharing declaration and is retired in API 67.0+.",
      "D": "Without sharing ignores sharing rules."
    },
    "notes": [
      "inherited sharing follows the caller in other Apex call paths. At an AuraEnabled LWC entry point it resolves to sharing enforcement, as does with sharing. Object/field access and record sharing are distinct; use the appropriate user-mode operations or access checks for both.",
      "Reference: https://developer.salesforce.com/docs/platform/lwc/guide/apex-security"
    ],
    "printed": "A",
    "source": {
      "stem": [
        {
          "ask": "While developing an Apex class with custom search functionality that will be launched from a Lightning Web Component, how can the developer ensure only records accessible to the currently logged in user are displayed?"
        }
      ],
      "choices": [
        "Use the WITH SECURITY_ENFORCED clause within the SOQL.",
        "Use the inherited sharing keyword.",
        "Use the with sharing keyword.",
        "Use the without sharing keyword."
      ],
      "answer": "A"
    },
    "acceptAny": true,
    "type": "single",
    "choose": 1,
    "corrected": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "For an AuraEnabled class entered from LWC, explicit inherited sharing and with sharing enforce record sharing. SECURITY_ENFORCED checks object/field access, not record sharing. The prior without-sharing caller restriction was not in the source.",
      "references": [
        "https://developer.salesforce.com/docs/platform/lwc/guide/apex-security"
      ]
    }
  },
  {
    "id": 118,
    "section": "automation",
    "focus": "high",
    "group": "model",
    "stem": [
      "Universal Containers has implemented an order management application. Each Order can have one or more Order Line items. The Order Line object is related to the Order via a master-detail relationship. For each Order Line item, the total price is calculated by multiplying the Order Line item price with the quantity ordered.",
      {
        "ask": "What is the best practice to get the sum of all Order Line item totals on the Order record?"
      }
    ],
    "choices": [
      "Roll-up summary field",
      "Formula field",
      "Apex trigger",
      "Quick action"
    ],
    "answer": "A",
    "why": "A SUM roll-up summary on the Order parent can aggregate eligible line totals across a master-detail relationship.",
    "wrong": {
      "B": "A formula cannot sum child line totals.",
      "C": "A trigger can add the totals, but a roll-up summary is the declarative tool.",
      "D": "A quick action does not aggregate the line totals."
    },
    "notes": [
      "Native roll-up operations are COUNT, SUM, MIN, and MAX; AVG is not an operation. A line total formula can be an eligible summed field subject to roll-up restrictions. If these are standard order products rather than a configurable custom model, check actual object/field support before assuming the same setup."
    ],
    "source": {
      "stem": [
        "Universal Containers has implemented an order management application. Each Order can have one or more Order Line items. The Order Line object is related to the Order via a master-detail relationship. For each Order Line item, the total price is calculated by multiplying the Order Line item price with the quantity ordered.",
        {
          "ask": "What is the best practice to get the sum of all Order Line item totals on the Order record?"
        }
      ],
      "choices": [
        "Roll-up summary field",
        "Formula field",
        "Apex trigger",
        "Quick action"
      ],
      "answer": "A"
    },
    "printed": "A",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Specify the configurable custom master-detail model for the native roll-up. Original wording and choices are retained; the source key remains accepted. A SUM roll-up summary on the Order parent can aggregate eligible line totals across a master-detail relationship.",
      "references": []
    }
  },
  {
    "id": 119,
    "section": "automation",
    "focus": "must",
    "group": "queries",
    "stem": [
      {
        "ask": "Assuming that name is a String obtained by a Visualforce page, which two SOQL queries performed are safe from SOQL injection? (Choose two.)"
      }
    ],
    "choices": [
      "String query = '%' + name + '%';List<Account> results = [SELECT Id FROM Account WHERE Name LIKE :query];",
      "String query = 'SELECT Id FROM Account WHERE Name LIKE \\'%' + name.noQuotes() + '%\\'';List<Account> results = Database.query(query);",
      "String query = 'SELECT Id FROM Account WHERE Name LIKE \\'%' + String.escapeSingleQuotes(name) + '%\\'';List<Account> results = Database.query(query);",
      "String query = 'SELECT Id FROM Account WHERE Name LIKE \\'%' + name + '%\\'';List<Account> results = Database.query(query);"
    ],
    "answer": "A,C",
    "type": "multi",
    "why": "A binds the entire LIKE pattern as data, and C escapes quotes in the untrusted value before placing it inside a quoted dynamic SOQL literal.",
    "wrong": {
      "B": "name.noQuotes() is not an Apex method, and name is still concatenated into the query string.",
      "D": "name is concatenated with no bind variable and no escaping. A quote in name can change the query."
    },
    "notes": [
      "Prefer binds because they separate query structure from input. String.escapeSingleQuotes protects a string-literal context, not every possible injection location. It does not make user-supplied field names or ORDER BY clauses safe; allowlist identifiers separately. Apex String has no noQuotes method."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "A binds the entire LIKE pattern as data, and C escapes quotes in the untrusted value before placing it inside a quoted dynamic SOQL literal.",
      "references": []
    }
  },
  {
    "id": 120,
    "section": "testing",
    "focus": "must",
    "group": "tests",
    "stem": [
      {
        "ask": "How should a developer write unit tests for a private method in an Apex class?"
      }
    ],
    "choices": [
      "Use the SeeAllData annotation.",
      "Add a test method in the Apex class.",
      "Mark the Apex class as global.",
      "Use the @TestVisible annotation."
    ],
    "answer": "D",
    "why": "Use @TestVisible to let a separate test class call the private method while keeping it private to production callers.",
    "wrong": {
      "A": "SeeAllData does not let a test call a private method.",
      "B": "Test methods inside executable production classes are a legacy pre-API-28 pattern; API 28.0 and later require separate @isTest classes.",
      "C": "global exposes the class. It does not open one private method to tests."
    },
    "notes": [
      "Prefer asserting behavior through the public contract when practical; use @TestVisible when direct access to an internal helper is justified. SeeAllData controls record visibility, not method access.",
      "Reference: https://developer.salesforce.com/blogs/2013/04/apex-test-code-segregation"
    ],
    "source": {
      "stem": [
        {
          "ask": "How should a developer write unit tests for a private method in an Apex class?"
        }
      ],
      "choices": [
        "Use the SeeAllData annotation.",
        "Add a test method in the Apex class.",
        "Mark the Apex class as global.",
        "Use the @TestVisible annotation."
      ],
      "answer": "D"
    },
    "printed": "D",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Specify a separate test class rather than older colocated test patterns. Distinguish colocated private-member access from access by the separate test class in this scenario. Original wording and choices are retained; the source key remains accepted. Use @TestVisible to let a separate test class call the private method while keeping it private to production callers.",
      "references": [
        "https://developer.salesforce.com/blogs/2013/04/apex-test-code-segregation"
      ]
    }
  },
  {
    "id": 121,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      "Universal Containers needs to create a custom user interface component that allows users to enter information about their accounts.",
      "The component should be able to validate the user input before saving the information to the database.",
      {
        "ask": "What is the best technology to create this component?"
      }
    ],
    "choices": [
      "Flow",
      "Lightning Web Components",
      "Visualforce",
      "VUE JavaScript framework"
    ],
    "answer": "B",
    "why": "Lightning Web Components are the native component framework for a reusable custom account-entry UI with client-side validation. Flow and Visualforce can implement forms too; B is the best component-technology fit, not the only tool able to validate input.",
    "wrong": {
      "A": "Flow can collect and validate input. A native custom UI component is better matched by LWC here; the source does not impose an HTML/JavaScript requirement.",
      "C": "Visualforce can implement a form, but is the older page framework rather than the preferred native Lightning component approach.",
      "D": "Vue is not a Salesforce framework for this Account form."
    },
    "notes": [
      "Use base components and browser validity APIs for client feedback, and enforce required business rules on the server too. Screen Flow and Visualforce can also validate forms."
    ],
    "source": {
      "stem": [
        "Universal Containers needs to create a custom user interface component that allows users to enter information about their accounts.",
        "The component should be able to validate the user input before saving the information to the database.",
        {
          "ask": "What is the best technology to create this component?"
        }
      ],
      "choices": [
        "Flow",
        "Lightning Web Components",
        "Visualforce",
        "VUE JavaScript framework"
      ],
      "answer": "B"
    },
    "printed": "B",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Specify a custom web-standards component rather than a general validating form that Flow could also build. Acknowledge Flow can validate input; explain the explicit custom-component requirement. Original wording and choices are retained; the source key remains accepted. Lightning Web Components are the native component framework for a reusable custom account-entry UI with client-side validation. Flow and Visualforce can implement forms too; B is the best component-technology fit, not the only tool able to validate input.",
      "references": []
    }
  },
  {
    "id": 122,
    "section": "ui",
    "focus": "must",
    "group": "lightning",
    "stem": [
      "Which Lightning Web Component custom event property settings enable the event to bubble up the containment hierarchy and cross",
      {
        "ask": "the Shadow DOM boundary?"
      }
    ],
    "choices": [
      "bubbles: true, composed: false",
      "bubbles: false, composed: false",
      "bubbles: true, composed: true",
      "bubbles: false, composed: true"
    ],
    "answer": "C",
    "why": "bubbles: true allows upward bubbling and composed: true allows the event to cross a shadow boundary; both are needed for this broad propagation request.",
    "wrong": {
      "A": "Composed false does not cross the shadow boundary.",
      "B": "Both false is the default, so the event stays where it was fired.",
      "D": "bubbles:false does not enable the requested upward bubbling. composed alone is insufficient for that requirement."
    },
    "notes": [
      "Prefer a direct parent listener and the least permissive event configuration that meets the contract. composed alone does not enable ordinary ancestor bubbling, and a broadly composed/bubbling event becomes part of the public API along its path.",
      "Salesforce reference: LWC event propagation — https://developer.salesforce.com/docs/platform/lwc/guide/events-propagation.html"
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "bubbles: true allows upward bubbling and composed: true allows the event to cross a shadow boundary; both are needed for this broad propagation request.",
      "references": [
        "https://developer.salesforce.com/docs/platform/lwc/guide/events-propagation.html"
      ]
    }
  },
  {
    "id": 123,
    "section": "automation",
    "focus": "high",
    "group": "flows",
    "stem": [
      "An org has an existing flow that edits an Opportunity with an Update Records element. A developer must update the flow to also create a Contact and store the created Contact's ID on the Opportunity.",
      {
        "ask": "Which update must the developer make in the flow?"
      }
    ],
    "choices": [
      "Add a new Update Records element.",
      "Add a new Roll Back Records element.",
      "Add a new Create Records element.",
      "Add a new Get Records element."
    ],
    "answer": "C",
    "why": "Add Create Records to create the Contact, capture its Id, then supply that Id to the existing Opportunity Update Records element.",
    "wrong": {
      "A": "Update Records is for updating existing records, not creating new ones.",
      "B": "Roll Back Records is used for rolling back transactions, not for creating records.",
      "D": "Get Records retrieves records but does not create them."
    },
    "notes": [
      "Creation and update are separate data operations. If the business requires all-or-nothing behavior, keep them in a suitable transaction and handle faults; do not assume that Get Records creates missing records."
    ],
    "source": {
      "stem": [
        "An org has an existing flow that edits an Opportunity with an Update Records element. A developer must update the flow to also create a Contact and store the created Contact's ID on the Opportunity.",
        {
          "ask": "Which update must the developer make in the flow?"
        }
      ],
      "choices": [
        "Add a new Update Records element.",
        "Add a new Roll Back Records element.",
        "Add a new Create Records element.",
        "Add a new Get Records element."
      ],
      "answer": "C"
    },
    "printed": "C",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Specify a custom Contact lookup; Opportunity has no general-purpose standard ContactId field for this design. Original wording and choices are retained; the source key remains accepted. Add Create Records to create the Contact, capture its Id, then supply that Id to the existing Opportunity Update Records element.",
      "references": []
    }
  },
  {
    "id": 124,
    "section": "automation",
    "focus": "high",
    "group": "integration",
    "stem": [
      "A company has a custom object, Order__c, that has a required, unique external ID field called Order_Number__c.",
      "Which statement should be used to perform the DML necessary to insert new records and update existing records in a list of Order__c records",
      {
        "ask": "using the external ID field?"
      }
    ],
    "choices": [
      "merge orders;",
      "merge orders Order_Number__c;",
      "upsert orders Order_Number__c;",
      "upsert orders;"
    ],
    "answer": "C",
    "why": "Use upsert orders Order_Number__c; to explicitly match the custom External ID rather than Salesforce Id.",
    "wrong": {
      "A": "merge combines duplicate records. It does not match orders on an external ID.",
      "B": "merge still combines duplicates. An external ID field is not a merge argument.",
      "D": "Plain upsert orders matches Salesforce Id by default, not Order_Number__c."
    },
    "notes": [
      "Without the field token, upsert orders uses Id matching; marking some field External ID does not make Apex choose it automatically. No match inserts, one match updates, and multiple matches fail. Unique helps ensure the external key identifies at most one row.",
      "Salesforce reference: Partial DML and external-ID upsert — https://trailhead.salesforce.com/content/learn/modules/apex_database/apex_database_dml",
      "Apex merge supports eligible Account, Contact, and Lead records, not this custom Order__c object. Upsert against the declared External ID implements the requested insert-or-update matching."
    ],
    "source": {
      "stem": [
        "A company has a custom object, order __c, that has a required, unique external ID field called order Number__c.",
        "Which statement should be used to perform the DML necessary to insert new records and update existing records in a list of Order __c records",
        {
          "ask": "using the external ID field?"
        }
      ],
      "choices": [
        "merge orders;",
        "merge orders Order Number_c;",
        "upsert orders Order Number c;",
        "upsert orders;"
      ],
      "answer": "D"
    },
    "printed": "D",
    "corrected": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "An upsert matching a custom External ID must name that field. Restore the original task and correct only the damaged Order_Number__c identifier; plain upsert matches Salesforce Id.",
      "references": [
        "https://trailhead.salesforce.com/content/learn/modules/apex_database/apex_database_dml"
      ]
    }
  },
  {
    "id": 125,
    "section": "testing",
    "focus": "familiar",
    "group": "debug",
    "stem": [
      "A developer must troubleshoot to pinpoint the causes of performance issues when a custom page loads in their org.",
      {
        "ask": "Which tool should the developer use to troubleshoot query performance?"
      }
    ],
    "choices": [
      "Setup Menu",
      "Visual Studio Code IDE",
      "AppExchange",
      "Developer Console"
    ],
    "answer": "D",
    "why": "Developer Console’s Query Plan tool helps assess SOQL selectivity, candidate access paths, and relative query cost.",
    "wrong": {
      "A": "Setup Menu: Used for administrative tasks, not performance troubleshooting.",
      "B": "Visual Studio Code IDE: Useful for development, but does not offer query performance tools.",
      "C": "AppExchange: Provides apps but does not directly help with query troubleshooting."
    },
    "notes": [
      "Use the Query Editor and Query Plan for the specific filter and representative data volume. A low line count or adding LIMIT is not a substitute for selective filtering. Browser performance problems may need additional client/network tools beyond query analysis."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Developer Console’s Query Plan tool helps assess SOQL selectivity, candidate access paths, and relative query cost.",
      "references": []
    }
  },
  {
    "id": 126,
    "section": "testing",
    "focus": "high",
    "group": "tests",
    "stem": [
      "A developer needs to create a baseline set of data (Accounts, Contacts, Products, Assets) for an entire suite of Apex tests allowing",
      "them to test isolated requirements for various types of Salesforce cases.",
      {
        "ask": "Which approach can efficiently generate the required data for each unit test?"
      }
    ],
    "choices": [
      "Create a mock using the HttpcalloutMock interface.",
      "Use @TestSetup with a void method.",
      "Add @IsTest (seeAllData=true) at the start of the unit test class.",
      "Create test data before Test .startTest() in the unit test."
    ],
    "answer": "B",
    "why": "A static void @testSetup method creates the shared baseline once for a test class, giving each test an isolated starting data set.",
    "wrong": {
      "A": "HttpCalloutMock is used for mocking callouts, not for creating test data.",
      "C": "Using seeAllData=true is discouraged because it relies on org data, violating test isolation principles.",
      "D": "Creating records before Test.startTest is valid, but @testSetup avoids repeating a shared baseline in every method."
    },
    "notes": [
      "Query the setup records in each test and add only scenario-specific data there. A reusable test factory can support multiple classes. Creating data before Test.startTest is also valid, but repeating the same setup in every test is less convenient for this shared-class baseline."
    ],
    "source": {
      "stem": [
        "A developer needs to create a baseline set of data (Accounts, Contacts, Products, Assets) for an entire suite of Apex tests allowing",
        "them to test isolated requirements for various types of Salesforce cases.",
        {
          "ask": "Which approach can efficiently generate the required data for each unit test?"
        }
      ],
      "choices": [
        "Create a mock using the HttpcalloutMock interface.",
        "Use @TestSetup with a void method.",
        "Add @IsTest (seeAllData=true) at the start of the unit test class.",
        "Create test data before Test .startTest() in the unit test."
      ],
      "answer": "B"
    },
    "printed": "B",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Scope @testSetup reuse to methods in one test class, not an entire multi-class suite. Original wording and choices are retained; the source key remains accepted. A static void @testSetup method creates the shared baseline once for a test class, giving each test an isolated starting data set.",
      "references": []
    }
  },
  {
    "id": 127,
    "section": "testing",
    "focus": "must",
    "group": "tests",
    "stem": [
      "A developer created this Apex trigger that calls MyClass.mystaticMethod:",
      {
        "code": [
          "trigger myTrigger on Contact (before insert) {",
          "    MyClass.myStaticMethod(Trigger.new, Trigger.oldMap);",
          "}"
        ]
      },
      {
        "ask": "The developer creates a test class with a test method that calls MyClass.myStaticMethod directly, resulting in 81% overall code coverage What happens when the developer tries to deploy the trigger and two classes to production, assuming no other code exists?"
      }
    ],
    "choices": [
      "The deployment passes because both classes and the trigger were included in the deployment.",
      "The deployment fails because no assertions were made in the test method.",
      "The deployment passes because the Apex code has the required >75% code coverage.",
      "The deployment fails because the Apex trigger has no code coverage."
    ],
    "answer": "D",
    "why": "D. A direct helper-method test does not execute the trigger entry point described here. The trigger needs its own test coverage; 81% overall coverage alone is insufficient.",
    "wrong": {
      "A": "Including the files in a deployment does not waive trigger coverage requirements.",
      "B": "Assertions are important for a meaningful test but their absence is not the deployment coverage rule in this question.",
      "C": "The overall percentage does not waive the requirement for some coverage of each trigger."
    },
    "notes": [
      "Use suitable Contact DML in the test to exercise the trigger and assert its effects. If a helper itself performs DML that fires the trigger, that execution can count too; such extra behavior is not described by this mock."
    ],
    "source": {
      "stem": [
        "A developer created this Apex trigger that calls MyClass.mystaticMethod:",
        {
          "ask": "The developer creates a test class with a test method that calls MyClass.myStaticMethod directly, resulting in 81% overall code coverage What happens when the developer tries to deploy the trigger and two classes to production, assuming no other code exists?"
        }
      ],
      "choices": [
        "The deployment passes because both classes and the trigger were included in the deployment.",
        "The deployment fails because no assertions were made in the test method.",
        "The deployment passes because the Apex code has the required >75% code coverage.",
        "The deployment fails because the Apex trigger has no code coverage."
      ],
      "answer": "D"
    },
    "printed": "D",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Scoring restored with the recovered trigger exhibit and original key D. The described test calls the helper directly instead of exercising the trigger through Contact DML. Every trigger needs some coverage even when overall Apex coverage is 81%; inventing additional helper DML was an unnecessary reason to withhold scoring.",
      "references": [
        "https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_start.html",
        "https://www.freecram.net/question/Salesforce.PDI.v2022-03-30.q75/developer-created-this-apex-trigger-that-calls-myclass-.mystaticmethod-trigger-mytrigger-on-contact-befor",
        "https://www.freecram.net/question/Salesforce.PDI.v2021-11-04.q66/developer-created-this-apex-trigger-that-calls-myclass-.mystaticmethod-trigger-mytrigger-on-contact-befor",
        "https://trailhead.salesforce.com/content/learn/modules/apex_testing/apex_testing_intro",
        "https://trailhead.salesforce.com/content/learn/modules/apex-testing-write-unit-tests/create-specialized-tests"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "resolved",
        "queries": [
          "\"trigger\" \"myStaticMethod\" \"81%\""
        ],
        "candidates": [
          "https://www.freecram.net/question/Salesforce.PDI.v2021-11-04.q66/developer-created-this-apex-trigger-that-calls-myclass-.mystaticmethod-trigger-mytrigger-on-contact-befor"
        ],
        "assessment": "Scoring restored with the recovered trigger exhibit and original key D. The described test calls the helper directly instead of exercising the trigger through Contact DML. Every trigger needs some coverage even when overall Apex coverage is 81%; inventing additional helper DML was an unnecessary reason to withhold scoring."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "not-scored",
        "decision": "scoring-restored",
        "reason": "Scoring restored with the recovered trigger exhibit and original key D. The described test calls the helper directly instead of exercising the trigger through Contact DML. Every trigger needs some coverage even when overall Apex coverage is 81%; inventing additional helper DML was an unnecessary reason to withhold scoring."
      }
    },
    "repair": "Retained the externally recovered before-insert Contact trigger that calls MyClass.myStaticMethod. Its missing DOCX exhibit remains visible in the Original/Current comparison. Restored the original D grading key after removing the prior hypothetical-helper-DML objection.",
    "repairNotes": [
      "Reference: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_start.html",
      "Reference: https://www.freecram.net/question/Salesforce.PDI.v2022-03-30.q75/developer-created-this-apex-trigger-that-calls-myclass-.mystaticmethod-trigger-mytrigger-on-contact-befor",
      "Reference: https://www.freecram.net/question/Salesforce.PDI.v2021-11-04.q66/developer-created-this-apex-trigger-that-calls-myclass-.mystaticmethod-trigger-mytrigger-on-contact-befor",
      "Reference: https://trailhead.salesforce.com/content/learn/modules/apex_testing/apex_testing_intro",
      "Reference: https://trailhead.salesforce.com/content/learn/modules/apex-testing-write-unit-tests/create-specialized-tests"
    ],
    "type": "single",
    "repaired": true
  },
  {
    "id": 128,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      {
        "ask": "What can be used to override the Account's standard Edit button for Lightning Experience?"
      }
    ],
    "choices": [
      "Lightning action",
      "Lightning page",
      "Lightning component",
      "Lightning flow"
    ],
    "answer": "C",
    "why": "Use an Aura component implementing lightning:actionOverride for a standard Edit override in Lightning Experience.",
    "wrong": {
      "A": "A Lightning action is not the Edit override.",
      "B": "A Lightning page is not the Edit override.",
      "D": "A flow is not the Edit override."
    },
    "notes": [
      "An LWC cannot directly implement this Aura interface, but can be hosted inside the overriding Aura component. Quick actions are a different entry point. A Visualforce override can also be selected in supported contexts, but is not one of these choices."
    ],
    "printed": "A",
    "source": {
      "stem": [
        {
          "ask": "What can be used to override the Account's standard Edit button for Lightning Experience?"
        }
      ],
      "choices": [
        "Lightning action",
        "Lightning page",
        "Lightning component",
        "Lightning flow"
      ],
      "answer": "A"
    },
    "corrected": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "Use an Aura component implementing lightning:actionOverride for a standard Edit override in Lightning Experience.",
      "references": []
    }
  },
  {
    "id": 129,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      {
        "ask": "A developer needs to make a custom Lightning Web Component available in the Salesforce Classic user interface Which approach can be used to accomplish this?"
      }
    ],
    "choices": [
      "Embed the Lightning Web Component is a Visualforce Component and add directly to the page layout.",
      "Use the Lightning Out JavaScript library to embed the Lightning Web Component in a Visualforce page and add to the page layout.",
      "Use a Visualforce page with a custom controller to invoke the Lightning Web Component using a call to an Apex method.",
      "Wrap the Lightning Web Component in an Aura Component and surface the Aura Component as a Visualforce tab."
    ],
    "answer": "B",
    "why": "Use Lightning Components for Visualforce/Lightning Out to instantiate the component within a Visualforce page that is exposed in Classic.",
    "wrong": {
      "A": "A Visualforce component is not how this LWC is placed on a Classic layout.",
      "C": "A Visualforce controller cannot host the Lightning web component.",
      "D": "Wrapping it in Aura is not the Classic page approach. Lightning Out is."
    },
    "notes": [
      "For the beta pattern, supply an Aura dependency app extending ltng:outApp and declare the required dependencies. Apex can supply data but cannot itself mount a browser component. A wrapper alone is insufficient without the Visualforce/Lightning Out hosting mechanism."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Use Lightning Components for Visualforce/Lightning Out to instantiate the component within a Visualforce page that is exposed in Classic.",
      "references": []
    }
  },
  {
    "id": 130,
    "section": "ui",
    "focus": "familiar",
    "group": "visualforce",
    "stem": [
      "Recovered exhibit (paraphrased): The custom controller declares a private Account named theAccount and a plain public String field named actType, with no getter or property accessor. Its constructor queries the Account identified by the page URL and assigns theAccount.Type to actType. The Visualforce page displays {!actType}.",
      {
        "ask": "The value of the account type field is not being displayed correctly on the page. Assuming the custom controller is properly referenced on the Visualforce page, what should the developer do to correct the problem?"
      }
    ],
    "choices": [
      "Add a getter method for the actType attribute.",
      "Change theAccount attribute to public.",
      "Add with sharing to the custom controller.",
      "Convert theAccount.Type to a String."
    ],
    "answer": "A",
    "why": "A. Visualforce needs a getter or readable property for actType. A plain public field assigned in the constructor does not provide that binding accessor.",
    "wrong": {
      "B": "The page binds to actType, so exposing the separate Account field does not supply its getter.",
      "C": "Sharing controls record visibility; it does not create a getter for the page binding.",
      "D": "Account.Type is already a String value; conversion does not fix the missing getter."
    },
    "notes": [
      "A plain public field is not a Visualforce getter property. Supply public String getActType() { return actType; } or an appropriate public property with a get accessor."
    ],
    "source": {
      "stem": [
        {
          "ask": "The value of the account type field is not being displayed correctly on the page. Assuming the custom controller is properly referenced on the Visualforce page, what should the developer do to correct the problem?"
        }
      ],
      "choices": [
        "Add a getter method for the actType attribute.",
        "Change theAccount attribute to public.",
        "Add with sharing to the custom controller.",
        "Convert theAccount.Type to a String."
      ],
      "answer": "A"
    },
    "printed": "A",
    "review": {
      "date": "2026-10-17",
      "treatment": "online-recovery",
      "reason": "Recovered the omitted controller/page exhibit from a matching published question. The added prose summarizes that exhibit: actType is a public field without a getter, assigned from Account.Type, and bound by the page. All four DOCX answer choices and key A are unchanged.",
      "references": [
        "https://developer.salesforce.com/docs/atlas.en-us.pages.meta/pages/pages_controller_methods.htm",
        "https://quizlet.com/760295701/sf-developer-2022-flash-cards/",
        "https://www.freecram.net/question/Salesforce.CRT-450.v2022-03-18.q189/a-developer-created-a-visualforce-page-and-custom-controller-to-display-the-account-type-field-as-shown",
        "https://developer.salesforce.com/docs/platform/salesforce-pages-developers-guide/guide/pages-controller-methods.html"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "resolved",
        "queries": [
          "\"actType\" \"Visualforce\" \"getter\""
        ],
        "candidates": [
          "https://www.freecram.net/question/Salesforce.CRT-450.v2022-03-18.q189/a-developer-created-a-visualforce-page-and-custom-controller-to-display-the-account-type-field-as-shown"
        ],
        "assessment": "Recovered the omitted controller/page exhibit from a matching published question. The added prose summarizes that exhibit: actType is a public field without a getter, assigned from Account.Type, and bound by the page. All four DOCX answer choices and key A are unchanged."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "The matching recovered controller/page context still supports a getter for actType; no new scenario requirement is introduced."
      }
    },
    "repair": "Recovered the omitted controller/page exhibit from a matching published question. The added prose summarizes that exhibit: actType is a public field without a getter, assigned from Account.Type, and bound by the page. All four DOCX answer choices and key A are unchanged.",
    "repairNotes": [
      "Online recovery: missing material is externally sourced; the Original comparison retains the supplied DOCX. Published option letters can differ.",
      "Reference: https://developer.salesforce.com/docs/atlas.en-us.pages.meta/pages/pages_controller_methods.htm",
      "Reference: https://quizlet.com/760295701/sf-developer-2022-flash-cards/",
      "Reference: https://www.freecram.net/question/Salesforce.CRT-450.v2022-03-18.q189/a-developer-created-a-visualforce-page-and-custom-controller-to-display-the-account-type-field-as-shown",
      "Reference: https://developer.salesforce.com/docs/platform/salesforce-pages-developers-guide/guide/pages-controller-methods.html"
    ],
    "repaired": true
  },
  {
    "id": 131,
    "section": "automation",
    "focus": "high",
    "group": "integration",
    "stem": [
      "A developer needs to implement a custom SOAP Web Service that is used by an external Web Application. The developer chooses to include helper methods that are not used by the Web Application in the implementation of the Web Service Class.",
      {
        "ask": "Which code segment shows the correct declaration of the class and methods?"
      }
    ],
    "choices": [
      "webservice class WebServiceClass {private Boolean helperMethod() { /* implementation ... */ }global static String updateRecords() { /* implementation ... */ }}",
      {
        "code": [
          "global class WebServiceClass {",
          "      private Boolean helperMethod() { /* implementation ... */ }",
          "      webservice static String updateRecords() { /* implementation ... */ }",
          "  }"
        ]
      },
      "webservice class WebServiceClass {private Boolean helperMethod() { /* implementation ... */ }webservice static String updateRecords() { /* implementation ... */ }}",
      {
        "code": [
          "global class WebServiceClass {",
          "      private Boolean helperMethod() { /* implementation ... */ }",
          "      global String updateRecords() { /* implementation ... */ }",
          "  }"
        ]
      }
    ],
    "answer": "B",
    "why": "Use a global class with a webservice static operation; helper methods can remain private when they are not part of the SOAP API.",
    "wrong": {
      "A": "webservice is not a class modifier. The class is global, and the SOAP method is webservice static.",
      "C": "The method is webservice static, but webservice is still not a valid class modifier.",
      "D": "The class is global, but updateRecords is an instance method. A SOAP method must be webservice static."
    },
    "notes": [
      "The webservice keyword applies to exposed methods, not the class declaration. A global instance method alone is not a SOAP operation. Include only intended operations and validate permissions/input for the external caller.",
      "These are declaration excerpts, not complete compilable implementations. A real non-void method must return a value of the declared type, and the containing class must have suitable visibility."
    ],
    "source": {
      "stem": [
        "A developer needs to implement a custom SOAP Web Service that is used by an external Web Application. The developer chooses to include helper methods that are not used by the Web Application in the implementation of the Web Service Class.",
        {
          "ask": "Which code segment shows the correct declaration of the class and methods?"
        }
      ],
      "choices": [
        "webservice class WebServiceClass {private Boolean helperMethod() { /* implementation ... */ }global static String updateRecords() { /* implementation ... */ }}",
        {
          "code": [
            "global class WebServiceClass {",
            "      private Boolean helperMethod() { /* implementation ... */ }",
            "      webservice static String updateRecords() { /* implementation ... */ }",
            "  }"
          ]
        },
        "webservice class WebServiceClass {private Boolean helperMethod() { /* implementation ... */ }webservice static String updateRecords() { /* implementation ... */ }}",
        {
          "code": [
            "global class WebServiceClass {",
            "      private Boolean helperMethod() { /* implementation ... */ }",
            "      global String updateRecords() { /* implementation ... */ }",
            "  }"
          ]
        }
      ],
      "answer": "B"
    },
    "printed": "B",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Treat method bodies as omitted signature examples rather than claiming comment-only non-void methods compile. Original wording and choices are retained; the source key remains accepted. Use a global class with a webservice static operation; helper methods can remain private when they are not part of the SOAP API.",
      "references": []
    }
  },
  {
    "id": 132,
    "section": "automation",
    "focus": "high",
    "group": "model",
    "stem": [
      "A developer has the following requirements:",
      "* Calculate the total amount on an Order.",
      "* Calculate the line amount for each Line Item based on quantity selected and price.",
      "* Move Line Items to a different Order if a Line Item is not in stock.",
      {
        "ask": "Which relationship implementation supports these requirements on its own?"
      }
    ],
    "choices": [
      "Line Item has a re-parentable master-detail field to Order.",
      "Line Item has a re-parentable lookup field to Order.",
      "Order has a re-parentable lookup field to Line Item.",
      "Order has are-parentable master-detail field to Line Item."
    ],
    "answer": "A",
    "why": "A reparentable custom master-detail from Line Item to Order supplies parent roll-ups and permits moving an existing detail to another master.",
    "wrong": {
      "B": "Lookup field: Does not support roll-up summary fields for calculations.",
      "C": "The lookup is on Order and points at the line. The relationship field has to be on the line item.",
      "D": "A master-detail on Order pointing at the line runs in the wrong direction. The field belongs on the line item."
    },
    "notes": [
      "Use a formula on each line for quantity × unit price and SUM on the parent for the total; the relationship alone does not create those fields. The field belongs on the detail. Enable Allow reparenting explicitly and consider access/roll-up changes."
    ],
    "source": {
      "stem": [
        "A developer has the following requirements:",
        "* Calculate the total amount on an Order.",
        "* Calculate the line amount for each Line Item based on quantity selected and price.",
        "* Move Line Items to a different Order if a Line Item is not in stock.",
        {
          "ask": "Which relationship implementation supports these requirements on its own?"
        }
      ],
      "choices": [
        "Line Item has a re-parentable master-detail field to Order.",
        "Line Item has a re-parentable lookup field to Order.",
        "Order has a re-parentable lookup field to Line Item.",
        "Order has are-parentable master-detail field to Line Item."
      ],
      "answer": "A"
    },
    "printed": "A",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Specify custom objects for the configurable reparenting scenario. Ask for the relationship foundation; a relationship alone does not create calculation fields. Original wording and choices are retained; the source key remains accepted. A reparentable custom master-detail from Line Item to Order supplies parent roll-ups and permits moving an existing detail to another master.",
      "references": []
    }
  },
  {
    "id": 133,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      "As part of new feature development, a developer is asked to build a responsive application capable of responding to touch events, that will be executed on stateful clients.",
      {
        "ask": "Which two technologies are built on a framework that fully supports the business requirement? Choose 2 answers"
      }
    ],
    "choices": [
      "Lightning Web Components",
      "Visualforce Components",
      "Visualforce Pages",
      "Aura Components"
    ],
    "answer": "A,D",
    "type": "multi",
    "why": "LWC and Aura use interactive client-side component frameworks suitable for responsive layouts and touch-capable applications.",
    "wrong": {
      "B": "Visualforce can contain JavaScript, but is not the native client-side component framework requested.",
      "C": "A Visualforce page can be made responsive, but does not provide the same native component model as Aura/LWC."
    },
    "notes": [
      "Responsive and accessible behavior still requires correct layout and event design. Visualforce can host JavaScript and touch handlers, but its server-oriented page/controller model is not the native component framework described here."
    ],
    "source": {
      "stem": [
        "As part of new feature development, a developer is asked to build a responsive application capable of responding to touch events, that will be executed on stateful clients.",
        {
          "ask": "Which two technologies are built on a framework that fully supports the business requirement? Choose 2 answers"
        }
      ],
      "choices": [
        "Lightning Web Components",
        "Visualforce Components",
        "Visualforce Pages",
        "Aura Components"
      ],
      "answer": "A,D"
    },
    "printed": "A,D",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Specify native Salesforce component frameworks rather than claiming only they can build responsive UIs. Original wording and choices are retained; the source key remains accepted. LWC and Aura use interactive client-side component frameworks suitable for responsive layouts and touch-capable applications.",
      "references": []
    }
  },
  {
    "id": 134,
    "section": "automation",
    "focus": "familiar",
    "group": "flows",
    "stem": [
      "When a user edits the Postal Code on an Account, a custom Account text field named 'Timezone' must be updated based on the values in a PostalCodeToTimezone__c custom object.",
      {
        "ask": "Which two automation tools can be used to implement this feature? Choose 2 answers"
      }
    ],
    "choices": [
      "Quick actions",
      "Approval process",
      "Account trigger",
      "Fast Field Updates record-triggered flow"
    ],
    "answer": "C,D",
    "type": "multi",
    "why": "A before-update Account trigger or a Fast Field Updates before-save flow can read the postal-code mapping and assign Timezone on the Account being saved.",
    "wrong": {
      "A": "Quick actions: Used for user interface updates, not for automation based on edits.",
      "B": "Approval process: Not relevant to dynamic field updates."
    },
    "notes": [
      "Bulkify an Apex mapping query and define behavior when the mapping is absent or duplicated. In Flow, Get Records retrieves the mapping and Assignment changes $Record without a separate same-record update."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "A before-update Account trigger or a Fast Field Updates before-save flow can read the postal-code mapping and assign Timezone on the Account being saved.",
      "references": []
    }
  },
  {
    "id": 135,
    "section": "automation",
    "focus": "familiar",
    "group": "async",
    "stem": [
      "Universal Containers (UC) processes orders in Salesforce in a custom object, Order__c. They also allow sales reps to upload CSV files with thousands of orders at a time.",
      "A developer is tasked with integrating orders placed in Salesforce with UC's enterprise resource planning (ERP) system.",
      "After the status for an Order__c is first set to 'Placed', the order information must be sent to a REST endpoint in the ERP system that can",
      "process one order at a time.",
      {
        "ask": "What should the developer implement to accomplish this?"
      }
    ],
    "choices": [
      "Callout from a Queueable class called from a trigger",
      "Callout from a Batchable class called from a scheduled job",
      "Flow with a callout from an invocable method",
      "Callout from an @future method called from a trigger"
    ],
    "answer": "A",
    "why": "Queueable Apex launched from a bulkified trigger can process bounded groups of orders with callouts and chain further work. For thousands of orders, do not enqueue a job or future call for every record; the Queueable design must respect the callout and enqueue limits.",
    "wrong": {
      "B": "A scheduled batch can perform callouts, but does not directly respond to the first transition to Placed without a separate polling/scheduling design.",
      "C": "An invocable callout is not by itself a bulk-safe after-commit delivery design for thousands of trigger-originated orders.",
      "D": "A future callout can work for small volumes, but a per-order future invocation for thousands of orders exceeds invocation limits; it lacks Queueable chaining for bounded groups."
    },
    "notes": [
      "Collect changed Order Ids and enqueue bulk work rather than one job per record. Make at most the allowed callouts per transaction, chain the remainder, and design idempotency/retry tracking. Batch can make callouts too; future can do asynchronous callouts but lacks Queueable’s chaining/job contract."
    ],
    "source": {
      "stem": [
        "Universal Containers (UC) processes orders in Salesforce in a custom object, Order__c. They also allow sales reps to upload CSV files with thousands of orders at a time.",
        "A developer is tasked with integrating orders placed in Salesforce with UC's enterprise resource planning (ERP) system.",
        "After the status for an Order__c is first set to 'Placed', the order information must be sent to a REST endpoint in the ERP system that can",
        "process one order at a time.",
        {
          "ask": "What should the developer implement to accomplish this?"
        }
      ],
      "choices": [
        "Callout from a Queueable class called from a trigger",
        "Callout from a Batchable class called from a scheduled job",
        "Flow with a callout from an invocable method",
        "Callout from an @future method called from a trigger"
      ],
      "answer": "A"
    },
    "printed": "A",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Specify prompt, chainable processing so Queueable is preferred over valid future/batch alternatives. Original wording and choices are retained; the source key remains accepted. Queueable Apex launched from a bulkified trigger can process bounded groups of orders with callouts and chain further work. For thousands of orders, do not enqueue a job or future call for every record; the Queueable design must respect the callout and enqueue limits.",
      "references": []
    }
  },
  {
    "id": 136,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      "Refer to the component code requirements below:",
      {
        "code": [
          "<lightning:layout multipleRows='true'>",
          "  <lightning:layoutItem size='12'>{!v.account.Name}</lightning:layoutItem>",
          "  <lightning:layoutItem size='12'>{!v.account.AccountNumber}</lightning:layoutItem>",
          "  <lightning:layoutItem size='12'>{!v.account.Industry}</lightning:layoutItem>",
          "  </lightning:layout>"
        ]
      },
      "Requirements:",
      "For mobile devices, the information should display in three rows.",
      "For desktops and tablets, the information should display in a single row.",
      "Requirement 2 is not displaying as desired.",
      {
        "ask": "Which option has the correct component code to meet the requirements for desktops and tablets?"
      }
    ],
    "choices": [
      {
        "code": [
          "<lightning:layout multipleRows='true'>",
          "  <lightning:layoutItem size='12' mediumDeviceSize='4'>{!v.account.Name}</lightning:layoutItem>",
          "  <lightning:layoutItem size='12' mediumDeviceSize='4'>{!v.account.AccountNumber}</lightning:layoutItem>",
          "  <lightning:layoutItem size='12' mediumDeviceSize='4'>{!v.account.Industry}</lightning:layoutItem>",
          "  </lightning:layout>"
        ]
      },
      {
        "code": [
          "<lightning:layout multipleRows='true'>",
          "  <lightning:layoutItem size='12' mediumDeviceSize='4'>{!v.account.Name}</lightning:layoutItem>",
          "  <lightning:layoutItem size='12' largeDeviceSize='4'>{!v.account.AccountNumber}</lightning:layoutItem>",
          "  <lightning:layoutItem size='12' largeDeviceSize='4'>{!v.account.Industry}</lightning:layoutItem>",
          "  </lightning:layout>"
        ]
      },
      {
        "code": [
          "<lightning:layout multipleRows='true'>",
          "  <lightning:layoutItem size='12' mediumDeviceSize='6'>{!v.account.Name}</lightning:layoutItem>",
          "  <lightning:layoutItem size='12' mediumDeviceSize='6'>{!v.account.AccountNumber}</lightning:layoutItem>",
          "  <lightning:layoutItem size='12' mediumDeviceSize='6'>{!v.account.Industry}</lightning:layoutItem>",
          "  </lightning:layout>"
        ]
      },
      {
        "code": [
          "<lightning:layout multipleRows='true'>",
          "  <lightning:layoutItem size='12' mediumDeviceSize='6' largeDeviceSize='4'>{!v.account.Name}</lightning:layoutItem>",
          "  <lightning:layoutItem size='12' mediumDeviceSize='6' largeDeviceSize='4'>{!v.account.AccountNumber}</lightning:layoutItem>",
          "  <lightning:layoutItem size='12' mediumDeviceSize='6' largeDeviceSize='4'>{!v.account.Industry}</lightning:layoutItem>",
          "  </lightning:layout>"
        ]
      }
    ],
    "answer": "A",
    "why": "Use size=12 and mediumDeviceSize=4 on all three items: phones get full-width rows, while tablets and larger devices fit 4 + 4 + 4 into one 12-column row.",
    "wrong": {
      "B": "LargeDeviceSize on only some items does not put all three on one tablet row.",
      "C": "MediumDeviceSize 6 wraps the third item onto a second row.",
      "D": "Medium 6 and large 4 wraps the third item on a tablet."
    },
    "notes": [
      "A medium width remains applicable at larger breakpoints unless overridden. mediumDeviceSize=6 permits only two items per row on tablets, even if largeDeviceSize=4 later fixes desktop width."
    ],
    "printed": "D",
    "source": {
      "stem": [
        "Refer to the component code requirements below:",
        {
          "code": [
            "<lightning:layout multipleRows='true'>",
            "  <lightning:layoutItem size='12'>{!v.account.Name}</lightning:layoutItem>",
            "  <lightning:layoutItem size='12'>{!v.account.AccountNumber}</lightning:layoutItem>",
            "  <lightning:layoutItem size='12'>{!v.account.Industry}</lightning:layoutItem>",
            "  </lightning:layout>"
          ]
        },
        "Requirements:",
        "For mobile devices, the information should display in three rows.",
        "For desktops and tablets, the information should display in a single row.",
        "Requirement 2 is not displaying as desired.",
        {
          "ask": "Which option has the correct component code to meet the requirements for desktops and tablets?"
        }
      ],
      "choices": [
        {
          "code": [
            "<lightning:layout multipleRows='true'>",
            "  <lightning:layoutItem size='12' mediumDeviceSize='4'>{!v.account.Name}</lightning:layoutItem>",
            "  <lightning:layoutItem size='12' mediumDeviceSize='4'>{!v.account.AccountNumber}</lightning:layoutItem>",
            "  <lightning:layoutItem size='12' mediumDeviceSize='4'>{!v.account.Industry}</lightning:layoutItem>",
            "  </lightning:layout>"
          ]
        },
        {
          "code": [
            "<lightning:layout multipleRows='true'>",
            "  <lightning:layoutItem size='12' mediumDeviceSize='4'>{!v.account.Name}</lightning:layoutItem>",
            "  <lightning:layoutItem size='12' largeDeviceSize='4'>{!v.account.AccountNumber}</lightning:layoutItem>",
            "  <lightning:layoutItem size='12' largeDeviceSize='4'>{!v.account.Industry}</lightning:layoutItem>",
            "  </lightning:layout>"
          ]
        },
        {
          "code": [
            "<lightning:layout multipleRows='true'>",
            "  <lightning:layoutItem size='12' mediumDeviceSize='6'>{!v.account.Name}</lightning:layoutItem>",
            "  <lightning:layoutItem size='12' mediumDeviceSize='6'>{!v.account.AccountNumber}</lightning:layoutItem>",
            "  <lightning:layoutItem size='12' mediumDeviceSize='6'>{!v.account.Industry}</lightning:layoutItem>",
            "  </lightning:layout>"
          ]
        },
        {
          "code": [
            "<lightning:layout multipleRows='true'>",
            "  <lightning:layoutItem size='12' mediumDeviceSize='6' largeDeviceSize='4'>{!v.account.Name}</lightning:layoutItem>",
            "  <lightning:layoutItem size='12' mediumDeviceSize='6' largeDeviceSize='4'>{!v.account.AccountNumber}</lightning:layoutItem>",
            "  <lightning:layoutItem size='12' mediumDeviceSize='6' largeDeviceSize='4'>{!v.account.Industry}</lightning:layoutItem>",
            "  </lightning:layout>"
          ]
        }
      ],
      "answer": "D"
    },
    "corrected": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "Use size=12 and mediumDeviceSize=4 on all three items: phones get full-width rows, while tablets and larger devices fit 4 + 4 + 4 into one 12-column row.",
      "references": []
    }
  },
  {
    "id": 137,
    "section": "testing",
    "focus": "familiar",
    "group": "tests",
    "stem": [
      "Consider the following code snippet:",
      {
        "code": [
          "public with sharing class AccountsController {",
          "    @AuraEnabled",
          "    public static List<Account> getAllAccounts(){",
          "        return [SELECT Id, Name, Industry FROM Account];",
          "    }",
          "}"
        ]
      },
      "Apex Test Class Snippet:",
      {
        "code": [
          "@isTest",
          "private with sharing class AccountsController_Test {",
          "    @testSetup",
          "    private static void makeData(){",
          "        User user1 = [SELECT Id FROM User WHERE Profile.Name = 'System Administrator' AND isActive = true LIMIT 1];",
          "        User user2 = [SELECT Id FROM User WHERE Profile.Name = 'Standard User' AND UserName = 'test@test.com' AND isActive = true LIMIT 1];",
          "        TestUtils.insertAccounts(10, user1.Id);",
          "        TestUtils.insertAccounts(20, user2.Id);",
          "    }",
          "    @isTest",
          "    private static void getAllAccounts_StandardUser_Test(){",
          "        List<Account> result = AccountsController.getAllAccounts();",
          "        System.assertEquals(20, result.size());",
          "    }",
          "}"
        ]
      },
      "When the test class runs, the assertion fails.",
      {
        "ask": "Which change should the developer implement in the Apex test method to ensure the test method executes successfully?"
      }
    ],
    "choices": [
      "Query the Administrator user into memory and enclose lines 15 and 16 within the System.runAs(user); method.",
      "Query the Standard User into memory and enclose lines 15 and 16 within the System.runAs(); method.",
      "Add @isTest(seeAllData=true); to line 12 and enclose lines 15 and 16 within Test.startTest(); and Test.stopTest();.",
      "Add System.runAs(user); to line 14 and enclose line 15 within Test.startTest(); and Test.stopTest();."
    ],
    "answer": "B",
    "why": "B. Query the intended Standard User and execute the query/assertion inside System.runAs(user) so the test uses that user’s record-sharing context.",
    "wrong": {
      "A": "Running as the administrator does not test the Standard User’s visibility.",
      "C": "SeeAllData and startTest/stopTest do not change the running user.",
      "D": "A standalone runAs call and startTest/stopTest do not wrap the operations in the specified user context."
    },
    "notes": [
      "The exact visible row count still depends on the org’s sharing model and correctly provisioned test users. For a real test, create those fixtures and arrange sharing explicitly. The listed question tests the runAs context change; it does not establish that all orgs expose exactly 20 rows."
    ],
    "source": {
      "stem": [
        "Consider the following code snippet:",
        {
          "code": [
            "public class with sharing AccountsController {",
            "    @AuraEnabled",
            "    public List<Account> getAllAccounts(){",
            "        return [SELECT Id, Name, Industry FROM Account];",
            "    }",
            "}"
          ]
        },
        "Apex Test Class Snippet:",
        {
          "code": [
            "@isTest",
            "private class with sharing AccountsController_Test {",
            "    @testSetup",
            "    private static void makeData(){",
            "        User user1 = [SELECT Id FROM User WHERE Profile.Name = 'System Administrator' AND isActive = true LIMIT 1];",
            "        User user2 = [SELECT Id FROM User WHERE Profile.Name = 'Standard User' AND UserName = 'test@test.com' AND isActive = true LIMIT 1];",
            "        TestUtils.insertAccounts(10, user1.Id);",
            "        TestUtils.insertAccounts(20, user2.Id);",
            "    }",
            "    @isTest",
            "    private static void getAllAccounts_StandardUser_Test(){",
            "        List<Account> result = AccountsController.getAllAccounts();",
            "        System.assertEquals(20, result.size());",
            "    }",
            "}"
          ]
        },
        "When the test class runs, the assertion fails.",
        {
          "ask": "Which change should the developer implement in the Apex test method to ensure the test method executes successfully?"
        }
      ],
      "choices": [
        "Query the Administrator user into memory and enclose lines 15 and 16 within the System.runAs(user); method.",
        "Query the Standard User into memory and enclose lines 15 and 16 within the System.runAs(); method.",
        "Add @isTest(seeAllData=true); to line 12 and enclose lines 15 and 16 within Test.startTest(); and Test.stopTest();.",
        "Add System.runAs(user); to line 14 and enclose line 15 within Test.startTest(); and Test.stopTest();."
      ],
      "answer": "B"
    },
    "printed": "B",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Scoring restored: B is the only listed change that executes the assertion as the Standard User whose context is being tested. Corrected the misplaced with sharing keywords in both class declarations and made the AuraEnabled method static to match its class-level call. No Private OWD or other new scenario condition was inserted.",
      "references": [
        "https://www.freecram.net/question/Salesforce.PDI.v2025-10-03.q93/consider-the-following-code-snippet-apex-copyedit-public-class-with-sharing-accountscontroller-auraenabled",
        "https://trailhead.salesforce.com/content/learn/modules/apex-testing-write-unit-tests/create-specialized-tests"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "resolved",
        "queries": [
          "\"getAllAccounts_StandardUser_Test\"",
          "\"AccountsController_Test\" \"System.assertEquals(20\""
        ],
        "candidates": [
          "https://www.freecram.net/question/Salesforce.PDI.v2025-10-03.q93/consider-the-following-code-snippet-apex-copyedit-public-class-with-sharing-accountscontroller-auraenabled"
        ],
        "assessment": "Scoring restored: B is the only listed change that executes the assertion as the Standard User whose context is being tested. Corrected the misplaced with sharing keywords in both class declarations and made the AuraEnabled method static to match its class-level call. No Private OWD or other new scenario condition was inserted."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "not-scored",
        "decision": "scoring-restored",
        "reason": "Scoring restored: B is the only listed change that executes the assertion as the Standard User whose context is being tested. Corrected the misplaced with sharing keywords in both class declarations and made the AuraEnabled method static to match its class-level call. No Private OWD or other new scenario condition was inserted."
      }
    },
    "type": "single",
    "repaired": true,
    "repair": "Moved with sharing before class in the AccountsController and AccountsController_Test declarations and added static to getAllAccounts(), matching @AuraEnabled and its existing class-level call. Preserved the original user records, expected row count, choices and key B; no sharing configuration was added.",
    "repairNotes": [
      "Reference: https://www.freecram.net/question/Salesforce.PDI.v2025-10-03.q93/consider-the-following-code-snippet-apex-copyedit-public-class-with-sharing-accountscontroller-auraenabled",
      "Reference: https://trailhead.salesforce.com/content/learn/modules/apex-testing-write-unit-tests/create-specialized-tests"
    ]
  },
  {
    "id": 138,
    "section": "testing",
    "focus": "must",
    "group": "tests",
    "stem": [
      "A developer creates a new Apex trigger with a helper class, and writes a test class that only exercises 95% coverage of the new Apex helper class.",
      "Change Set deployment to production fails with the test coverage warning:",
      "'Test coverage of selected Apex Trigger is 0%, at least 1% test coverage is required.'",
      {
        "ask": "What should the developer do to successfully deploy the new Apex trigger and helper class?"
      }
    ],
    "choices": [
      "Run the tests using the Run All Tests' method.",
      "Remove the failing test methods from the test class",
      "Create a test class and methods to cover the Apex trigger.",
      "Increase the test class coverage on the helper class."
    ],
    "answer": "C",
    "why": "Add tests that perform the relevant object DML and invoke the trigger, rather than testing only the helper directly.",
    "wrong": {
      "A": "Run All Tests does not create coverage for a trigger that no test calls.",
      "B": "Deleting failing tests does not cover the trigger.",
      "D": "More coverage on the helper still leaves the trigger at 0 percent."
    },
    "notes": [
      "A helper’s 95% coverage does not count as trigger coverage. Assert behavior for representative positive, negative, and bulk cases and check the production deployment’s selected test level."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Add tests that perform the relevant object DML and invoke the trigger, rather than testing only the helper directly.",
      "references": []
    }
  },
  {
    "id": 139,
    "section": "automation",
    "focus": "familiar",
    "group": "security",
    "stem": [
      "A software company uses the following objects and relationships:",
      "* Case: to handle customer support issues",
      "* Defect__c: a custom object to represent known issues with the company's software",
      "* Case Defect__c a junction object between Case and Defect __c to represent that a defect is a cause of a customer issue",
      "Case and Defect__c have Private organization-wide defaults.",
      {
        "ask": "What should be done to share a specific Case_Defect__c record with a user?"
      }
    ],
    "choices": [
      "Share the parent Cast record Defect_c records.",
      "Share the parent Case and record_c record.",
      "Share the parent Defect__c record.",
      "Share the case_Defect_c record."
    ],
    "answer": "",
    "why": "Not scored. Two parent-sharing options are garbled. Published variants confirm the general both-parent rule, but reorder their choices and do not verify which two damaged DOCX options were intended. A specific grading letter cannot be mapped confidently.",
    "wrong": {},
    "notes": [
      "The user also needs the relevant object permissions. For edit/delete, check both relationship Sharing Settings and their required master access. A detail record in this model does not have independent manual sharing.",
      "Salesforce reference: Junction sharing and relationships — https://help.salesforce.com/s/articleView?id=platform.relationships_considerations.htm&language=en_US&type=5"
    ],
    "source": {
      "stem": [
        "A software company uses the following objects and relationships:",
        "* Case: to handle customer support issues",
        "* Defect__c: a custom object to represent known issues with the company's software",
        "* Case Defect__c a junction object between Case and Defect __c to represent that a defect is a cause of a customer issue",
        "Case and Defect__c have Private organization-wide defaults.",
        {
          "ask": "What should be done to share a specific Case_Defect__c record with a user?"
        }
      ],
      "choices": [
        "Share the parent Cast record Defect_c records.",
        "Share the parent Case and record_c record.",
        "Share the parent Defect__c record.",
        "Share the case_Defect_c record."
      ],
      "answer": "B"
    },
    "printed": "B",
    "ungraded": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "unresolved",
      "reason": "Two parent-sharing options are garbled. Published variants confirm the general both-parent rule, but reorder their choices and do not verify which two damaged DOCX options were intended. A specific grading letter cannot be mapped confidently.",
      "references": [
        "https://help.salesforce.com/s/articleView?id=platform.relationships_considerations.htm&language=en_US&type=5",
        "https://www.freecram.com/discussions/Salesforce/exam-pdi-topic-2-question-183-discussion-p1209368.html"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "unresolved",
        "queries": [
          "\"Case_Defect__c\" \"Share the parent\""
        ],
        "candidates": [
          "https://www.freecram.com/discussions/Salesforce/exam-pdi-topic-2-question-183-discussion-p1209368.html"
        ],
        "assessment": "Two parent-sharing options are garbled. Published variants confirm the general both-parent rule, but reorder their choices and do not verify which two damaged DOCX options were intended. A specific grading letter cannot be mapped confidently."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "not-scored",
        "decision": "still-unresolved",
        "reason": "Two parent-sharing options are garbled. Published variants confirm the general both-parent rule, but reorder their choices and do not verify which two damaged DOCX options were intended. A specific grading letter cannot be mapped confidently."
      },
      "optionAudit": {
        "date": "2026-10-17",
        "status": "incomplete",
        "comparedChoiceCount": 4,
        "assessment": "Published copies contain four clear concepts: share Case only, share Defect only, share both parents, or share the junction directly. They reorder the first three choices. Two DOCX-derived choices are garbled, and their original letter-to-concept mapping cannot be verified; no replacement letter is invented.",
        "references": [
          "https://www.freecram.com/discussions/Salesforce/exam-pdi-topic-2-question-183-discussion-p1209368.html"
        ]
      }
    }
  },
  {
    "id": 140,
    "section": "testing",
    "focus": "high",
    "group": "tests",
    "stem": [
      "A developer needs to have records with specific field values in order to test a new Apex class.",
      {
        "ask": "What should the developer do to ensure the data is available to the test?"
      }
    ],
    "choices": [
      "Use SOQL to query the org for the required data.",
      "Use Test.loadData() and reference a CSV file in a static resource.",
      "Use Anonymous Apex to create the required data.",
      "Use Test. loadData() and reference a JSON file in Documents."
    ],
    "answer": "B",
    "why": "Test.loadData inserts test rows from a CSV static resource, letting the test use the required field values without relying on existing business records.",
    "wrong": {
      "A": "A query alone does not provide deterministic ordinary org records in an isolated test; create or load the fixture first.",
      "C": "Anonymous Apex cannot be used within test classes.",
      "D": "JSON files in Documents are not supported by Test.loadData()."
    },
    "notes": [
      "Provide valid field headers and satisfy required-field and relationship dependencies. Test.loadData does not read arbitrary JSON from Documents. Querying test-created records is normal; relying on undeclared preexisting business data is the problem."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Test.loadData inserts test rows from a CSV static resource, letting the test use the required field values without relying on existing business records.",
      "references": []
    }
  },
  {
    "id": 141,
    "section": "automation",
    "focus": "must",
    "group": "language",
    "stem": [
      "A developer creates a custom exception as shown below:",
      {
        "code": "public class ParityException extends Exception { }"
      },
      {
        "ask": "What are two ways the developer can fire the exception in Apex?"
      }
    ],
    "choices": [
      "throw new ParityException ();",
      "throw new parityException ('parity does not match');",
      "new ParityException ();",
      "new ParityException('parity does not match');"
    ],
    "answer": "A,B",
    "type": "multi",
    "why": "Both throw new ParityException() and throw new parityException(message) raise the custom exception; Apex identifier case does not distinguish the two names.",
    "wrong": {
      "C": "new ParityException() only constructs the exception. throw is what raises it.",
      "D": "new ParityException('...') only constructs the exception. throw is what raises it."
    },
    "notes": [
      "Constructing an exception object with new does not throw it. Use an appropriate message and catch it only where the application can recover or translate the failure."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Both throw new ParityException() and throw new parityException(message) raise the custom exception; Apex identifier case does not distinguish the two names.",
      "references": []
    }
  },
  {
    "id": 142,
    "section": "ui",
    "focus": "must",
    "group": "security",
    "stem": [
      "A developer is migrating a Visualforce page into a Lightning web component.",
      "The Visualforce page shows information about a single record. The developer decides to use Lightning Data Service to access record data.",
      {
        "ask": "Which security consideration should the developer be aware of?"
      }
    ],
    "choices": [
      "Lightning Data Service ignores field-level security.",
      "The with sharing keyword must be used to enforce sharing rules.",
      "Lightning Data Service handles sharing rules and field-level security.",
      "The isAccessible () method must be used for field-level access checks."
    ],
    "answer": "C",
    "why": "Lightning Data Service applies sharing, object permissions, and field-level security when supplying supported record data.",
    "wrong": {
      "A": "Incorrect, LDS enforces FLS.",
      "B": "with sharing applies to Apex, not Lightning Data Service.",
      "D": "isAccessible() is unnecessary for LDS because it already enforces FLS."
    },
    "notes": [
      "Apex sharing keywords and Describe calls are not additional requirements for the LDS-managed access itself. If the component also invokes custom Apex or another service, that separate access path needs its own security treatment."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Lightning Data Service applies sharing, object permissions, and field-level security when supplying supported record data.",
      "references": []
    }
  },
  {
    "id": 143,
    "section": "ui",
    "focus": "high",
    "group": "visualforce",
    "stem": [
      "Consider the following code snippet for a Visualforce page that is launched using a Custom Button on the Account detail page layout.",
      {
        "code": [
          "<apex:page standardController=\"Account\">",
          "      <!-- additional UI elements -->",
          "      <apex:commandButton action=\"{!save}\" value=\"Save\"/>",
          "  </apex:page>"
        ]
      },
      "When the Save button is pressed the developer must perform a complex validation that involves multiple objects and, upon success, redirect the user to another Visualforce page.",
      {
        "ask": "What can the developer use to meet this business requirement?"
      }
    ],
    "choices": [
      "Apex",
      "trigger",
      "Controller",
      "extension"
    ],
    "answer": "A,C,D",
    "why": "D is the specific extension mechanism for adding custom save logic to the supplied standard-controller page. A (Apex) and C (Controller) are broader descriptions or alternative controller implementations, so either is also accepted for the original broad wording.",
    "wrong": {
      "B": "A database trigger can validate records but cannot perform the requested Visualforce page redirect."
    },
    "notes": [
      "For the supplied page, an extension can override save and return a PageReference after validation. A full custom controller is another design if the page is adapted. The broad options overlap, so this single-choice mock accepts A, C or D."
    ],
    "printed": "C",
    "source": {
      "stem": [
        "Consider the following code snippet for a Visualforce page that is launched using a Custom Button on the Account detail page layout.",
        {
          "code": [
            "<apex:page standardController=\"Account\">",
            "      <!-- additional UI elements -->",
            "      <apex:commandButton action=\"{!save}\" value=\"Save\"/>",
            "  </apex:page>"
          ]
        },
        "When the Save button is pressed the developer must perform a complex validation that involves multiple objects and, upon success, redirect the user to another Visualforce page.",
        {
          "ask": "What can the developer use to meet this business requirement?"
        }
      ],
      "choices": [
        "Apex",
        "trigger",
        "Controller",
        "extension"
      ],
      "answer": "C"
    },
    "review": {
      "date": "2026-10-17",
      "treatment": "accepted-alternatives",
      "reason": "Scoring restored with accepted alternatives A, C or D. A controller extension is the direct fit for the supplied standard-controller page, but the original what-can-be-used question also offers the broad Apex and Controller labels. Accept the defensible overlapping choices instead of inventing a must-retain-standard-controller restriction or marking printed C wrong.",
      "references": [
        "https://www.p2pexams.com/free-questions/salesforce-crt-450-vceexamstest-actual-questions-by-rutledge-12-12-2023-8qa.pdf",
        "https://developer.salesforce.com/docs/platform/salesforce-pages-developers-guide/guide/pages-controller-extension.html"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "resolved",
        "queries": [
          "\"standardController\" \"complex validation\" \"extension\" exam"
        ],
        "candidates": [
          "https://www.p2pexams.com/free-questions/salesforce-crt-450-vceexamstest-actual-questions-by-rutledge-12-12-2023-8qa.pdf"
        ],
        "assessment": "Scoring restored with accepted alternatives A, C or D. A controller extension is the direct fit for the supplied standard-controller page, but the original what-can-be-used question also offers the broad Apex and Controller labels. Accept the defensible overlapping choices instead of inventing a must-retain-standard-controller restriction or marking printed C wrong."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "not-scored",
        "decision": "scoring-restored",
        "reason": "Scoring restored with accepted alternatives A, C or D. A controller extension is the direct fit for the supplied standard-controller page, but the original what-can-be-used question also offers the broad Apex and Controller labels. Accept the defensible overlapping choices instead of inventing a must-retain-standard-controller restriction or marking printed C wrong."
      }
    },
    "type": "single",
    "acceptAny": true,
    "repaired": true,
    "repair": "Expanded accepted single-choice answers from printed C to A, C or D because the original Apex, Controller and extension options overlap. D is the direct extension for the supplied page; the question and all option text remain unchanged.",
    "repairNotes": [
      "Reference: https://www.p2pexams.com/free-questions/salesforce-crt-450-vceexamstest-actual-questions-by-rutledge-12-12-2023-8qa.pdf",
      "Reference: https://developer.salesforce.com/docs/platform/salesforce-pages-developers-guide/guide/pages-controller-extension.html"
    ]
  },
  {
    "id": 144,
    "section": "automation",
    "focus": "high",
    "group": "flows",
    "stem": [
      "Flow Builder uses an Apex action to provide additional information about multiple Contacts, stored in a custom class ContactInfo.",
      {
        "ask": "Which is the correct definition of the Apex method that gets the additional information?"
      }
    ],
    "choices": [
      {
        "code": "@InvocableMethod(label='Additional Info') public ContactInfo getInfo(Id contactId) { /* implementation */ }"
      },
      {
        "code": "@InvocableMethod(label='Additional Info') public static List<ContactInfo> getInfo(List<Id> contactIds) { /* implementation */ }"
      },
      {
        "code": "@InvocableMethod(label='Additional Info') public static ContactInfo getInfo(Id contactId) { /* implementation */ }"
      },
      {
        "code": "@InvocableMethod(label='Additional Info') public List<ContactInfo> getInfo(List<Id> contactIds) { /* implementation */ }"
      }
    ],
    "answer": "B",
    "why": "B is a static invocable method with one List<Id> input and a List<ContactInfo> output, the supported bulk action shape among these options.",
    "wrong": {
      "A": "The method is not static and does not take or return a list.",
      "C": "The method is static, but it still takes and returns a single value.",
      "D": "The method is not static."
    },
    "notes": [
      "Expose wrapper fields with @InvocableVariable and align each result with the corresponding input interview. A return value is not mandatory for every invocable method, but this action explicitly needs information returned to Flow.",
      "These are declaration excerpts, not complete compilable implementations. A real non-void method must return a value of the declared type, and the containing class must have suitable visibility."
    ],
    "source": {
      "stem": [
        "Flow Builder uses an Apex action to provide additional information about multiple Contacts, stored in a custom class ContactInfo.",
        {
          "ask": "Which is the correct definition of the Apex method that gets the additional information?"
        }
      ],
      "choices": [
        {
          "code": "@InvocableMethod(label='Additional Info') public ContactInfo getInfo(Id contactId) { /* implementation */ }"
        },
        {
          "code": "@InvocableMethod(label='Additional Info') public static List<ContactInfo> getInfo(List<Id> contactIds) { /* implementation */ }"
        },
        {
          "code": "@InvocableMethod(label='Additional Info') public static ContactInfo getInfo(Id contactId) { /* implementation */ }"
        },
        {
          "code": "@InvocableMethod(label='Additional Info') public List<ContactInfo> getInfo(List<Id> contactIds) { /* implementation */ }"
        }
      ],
      "answer": "B"
    },
    "printed": "B",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Treat method bodies as omitted signature examples rather than claiming comment-only non-void methods compile. Original wording and choices are retained; the source key remains accepted. B is a static invocable method with one List<Id> input and a List<ContactInfo> output, the supported bulk action shape among these options.",
      "references": []
    }
  },
  {
    "id": 145,
    "section": "ui",
    "focus": "must",
    "group": "lightning",
    "stem": [
      "An Apex method, getAccounts, that returns a List of Accounts given a searchTerm, is available for Lightning Web Components to use.",
      {
        "ask": "What is the correct definition of a Lightning Web Component property that uses the getAccounts method?"
      }
    ],
    "choices": [
      "@wire(getAccounts, { searchTerm: '$searchTerm' })",
      "@track(getAccounts, '$searchTerm')",
      "@wire(getAccounts, 'searchTerm: $searchTerm')",
      "@wire(getAccounts, '$searchTerm')"
    ],
    "answer": "A",
    "why": "Use @wire(getAccounts, { searchTerm: '$searchTerm' }) so the Apex parameter receives the component property reactively.",
    "wrong": {
      "B": "@track does not call the Apex method.",
      "C": "The wire config must be an object, not a string.",
      "D": "The wire config is missing the searchTerm property."
    },
    "notes": [
      "Decorate the Apex method @AuraEnabled(cacheable=true). The wire result provides data/error; a change in the reactive property can provision a new result. The configuration must be an object keyed by the Apex parameter name.",
      "Salesforce reference: Client-side caching — https://developer.salesforce.com/docs/platform/lwc/guide/apex-result-caching.html"
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Use @wire(getAccounts, { searchTerm: '$searchTerm' }) so the Apex parameter receives the component property reactively.",
      "references": [
        "https://developer.salesforce.com/docs/platform/lwc/guide/apex-result-caching.html"
      ]
    }
  },
  {
    "id": 146,
    "section": "testing",
    "focus": "high",
    "group": "deploy",
    "stem": [
      {
        "ask": "When using Salesforce DX, what does a developer need to enable to create and manage scratch orgs?"
      }
    ],
    "choices": [
      "Sandbox",
      "Environment Hub",
      "Production",
      "Dev Hub"
    ],
    "answer": "D",
    "why": "Enable Dev Hub in a supported production or Developer Edition org, authorize it, and use it to create/manage scratch orgs.",
    "wrong": {
      "A": "A sandbox is a copy of an org. Scratch orgs are created from a Dev Hub.",
      "B": "Environment Hub connects orgs. It does not create scratch orgs.",
      "C": "A production org can host Dev Hub, but Production is an org type rather than the feature that authorizes scratch-org creation."
    },
    "notes": [
      "The scratch org is a separate disposable environment; Dev Hub tracks its allocation and lifetime. Environment Hub and sandbox refresh solve different org-management problems."
    ],
    "source": {
      "stem": [
        {
          "ask": "When using Salesforce DX, what does a developer need to enable to create and manage scratch orgs?"
        }
      ],
      "choices": [
        "Sandbox",
        "Environment Hub",
        "Production",
        "Dev Hub"
      ],
      "answer": "D"
    },
    "printed": "D",
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Enable Dev Hub in a supported production or Developer Edition org, authorize it, and use it to create/manage scratch orgs.",
      "references": []
    }
  },
  {
    "id": 147,
    "section": "ui",
    "focus": "must",
    "group": "lightning",
    "stem": [
      {
        "ask": "Which annotation should a developer use on an Apex method to make it available to be wired to a property in a Lightning web component?"
      }
    ],
    "choices": [
      "@AuraEnabled(cacheable=true)",
      "@RemoteAction (cacheable-true)",
      "@RemoteAction",
      "@AuraEnabled"
    ],
    "answer": "A",
    "why": "@AuraEnabled(cacheable=true) makes a read-only static Apex method eligible for Apex @wire in an LWC.",
    "wrong": {
      "B": "@RemoteAction is Visualforce remoting, and cacheable-true is not its syntax.",
      "C": "@RemoteAction does not make an Apex method available to a wire adapter.",
      "D": "@AuraEnabled without cacheable=true cannot be wired."
    },
    "notes": [
      "The cacheable method must not perform data mutations. An imperative method can omit cacheable for writes; Visualforce @RemoteAction is not the LWC wire API.",
      "Salesforce reference: Client-side caching — https://developer.salesforce.com/docs/platform/lwc/guide/apex-result-caching.html"
    ],
    "source": {
      "stem": [
        {
          "ask": "Which annotation should a developer use on an Apex method to make it available to be wired to a property in a Lightning web component?"
        }
      ],
      "choices": [
        "@AuraEnabled(cacneable=true)",
        "@RemoteAction (cacheable-true)",
        "@RemoteAction",
        "@AuraEnabled"
      ],
      "answer": "A"
    },
    "printed": "A",
    "repaired": true,
    "repair": "Correct cacneable to cacheable only; the annotation question and A key are unchanged.",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Correct cacneable to cacheable only; the annotation question and A key are unchanged.",
      "references": [
        "https://developer.salesforce.com/docs/platform/lwc/guide/apex-result-caching.html"
      ],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "The cacheable typo fix preserves the documented Apex wire annotation requirement."
      }
    },
    "repairNotes": [
      "Reference: https://developer.salesforce.com/docs/platform/lwc/guide/apex-result-caching.html"
    ]
  },
  {
    "id": 148,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      "A developer must provide custom user interfaces when users edit a Contact in either Salesforce Classic or Lightning Experience.",
      {
        "ask": "What should the developer use to override the Contact's Edit button and provide this functionality?"
      }
    ],
    "choices": [
      "A Lightning component in Salesforce Classic and a Lightning component in Lightning Experience",
      "A Lightning page in Salesforce Classic and a Visualforce page in Lightning Experience",
      "A Visualforce page in Salesforce Classic and a Lightning page in Lightning Experience",
      "A Visualforce page in Salesforce Classic and a Lightning component in Lightning Experience"
    ],
    "answer": "D",
    "why": "Use a Visualforce page for the Classic override and an Aura lightning:actionOverride component for the Lightning-specific override.",
    "wrong": {
      "A": "Salesforce Classic cannot use a Lightning component as the Edit override.",
      "B": "A Lightning page is not a Classic Edit-button override. Visualforce itself can be a valid Lightning override.",
      "C": "A Lightning App Builder page is not the component action-override mechanism."
    },
    "notes": [
      "Visualforce can also be used as an override in Lightning contexts; it is not categorically unsupported there. The listed pair D identifies the Classic Visualforce choice and a Lightning component choice. An LWC needs an Aura wrapper for a standard action override."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Use a Visualforce page for the Classic override and an Aura lightning:actionOverride component for the Lightning-specific override.",
      "references": []
    }
  },
  {
    "id": 149,
    "section": "testing",
    "focus": "familiar",
    "group": "deploy",
    "stem": [
      "A development team wants to use a deployment script to automatically deploy to a sandbox during their development cycles.",
      {
        "ask": "Which two tools can they use to run a script that deploys to a sandbox?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "SFDX CLI",
      "Developer Console",
      "Change Sets",
      "Ant Migration Tool"
    ],
    "answer": "A,D",
    "type": "multi",
    "why": "Salesforce CLI and the legacy Ant Migration Tool both support scripted metadata deployments; Developer Console and change-set selection are not equivalent deployment scripts.",
    "wrong": {
      "B": "Developer Console does not support deployment scripting.",
      "C": "Change Sets cannot be scripted; they require manual selection and deployment."
    },
    "notes": [
      "Ant was retired in Spring 2024 and remains functional without updates/support. Use current sf project deploy commands for new workflows rather than starting a new Ant dependency.",
      "Salesforce reference: Ant retirement — https://help.salesforce.com/s/articleView?id=release-notes.rn_deployment_ant_migration_tool_eol.htm&language=en_US&release=248&type=5"
    ],
    "source": {
      "stem": [
        "A development team wants to use a deployment script to automatically deploy to a sandbox during their development cycles.",
        {
          "ask": "Which two tools can they use to run a script that deploys to a sandbox?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "SFDX CLI",
        "Developer Console",
        "Change Sets",
        "Ant Migration Tool"
      ],
      "answer": "A,D"
    },
    "printed": "A,D",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Explicitly identify Ant as a still-functioning retired tool, not a current supported recommendation. Original wording and choices are retained; the source key remains accepted. Salesforce CLI and the legacy Ant Migration Tool both support scripted metadata deployments; Developer Console and change-set selection are not equivalent deployment scripts.",
      "references": [
        "https://help.salesforce.com/s/articleView?id=release-notes.rn_deployment_ant_migration_tool_eol.htm&language=en_US&release=248&type=5"
      ]
    }
  },
  {
    "id": 150,
    "section": "automation",
    "focus": "high",
    "group": "language",
    "stem": [
      "Refer to the following Apex code:",
      {
        "code": [
          "Integer x = 0;",
          "  do {",
          "      x++;",
          "  } while (x < 1);",
          "  System.debug(x);"
        ]
      },
      {
        "ask": "What is the value of x when it is written to the debug log?"
      }
    ],
    "choices": [
      "0",
      "2",
      "1",
      "3"
    ],
    "answer": "C",
    "why": "The do body runs once before testing the condition: x increments from 0 to 1, x < 1 is false, and the log prints 1.",
    "wrong": {
      "A": "0 is the starting value. The do body runs before the condition is checked.",
      "B": "The loop stops when x is no longer less than 1, so it does not reach 2.",
      "D": "Nothing in the loop adds 3."
    },
    "notes": [
      "A do/while always enters its body at least once. Compare the condition after each increment rather than treating it like a pre-checked while loop."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "The do body runs once before testing the condition: x increments from 0 to 1, x < 1 is false, and the log prints 1.",
      "references": []
    }
  },
  {
    "id": 151,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      "A developer needs to allow users to complete a form on an Account record that will create a record for a custom object.",
      "The form needs to display different fields depending on the user's job role, The functionality should only be available to a small group of users.",
      {
        "ask": "Which three things should the developer do to satisfy these requirements?"
      },
      {
        "ask": "Choose 3 answers"
      }
    ],
    "choices": [
      "Create a Dynamic Form.",
      "Create a Custom Permission for the users.",
      "Add a Dynamic Action to the Users' assigned Page Layouts.",
      "Create a Lightning web component.",
      "Add a Dynamic Action to the Account Record Page."
    ],
    "answer": "B,D,E",
    "type": "multi",
    "why": "Build the Lightning web component action, grant the custom permission through a permission set, and configure the dynamic action and its visibility on the Lightning record page.",
    "wrong": {
      "A": "Dynamic Forms configure fields rather than this custom action experience.",
      "C": "Assigning a page layout is not how the dynamic action and its visibility are configured on the Lightning record page."
    },
    "notes": [
      "Filter action visibility by that permission and implement field behavior in the form. Visibility is not authorization: object, field, and record access still protect reads/writes. Dynamic Forms arrange record fields; they do not replace this specified custom action."
    ],
    "printed": "B,C,D",
    "source": {
      "stem": [
        "A developer needs to allow users to complete a form on an Account record that will create a record for a custom object.",
        "The form needs to display different fields depending on the user's job role, The functionality should only be available to a small group of users.",
        {
          "ask": "Which three things should the developer do to satisfy these requirements?"
        },
        {
          "ask": "Choose 3 answers"
        }
      ],
      "choices": [
        "Create a Dynamic Form.",
        "Create a Custom Permission for the users.",
        "Add a Dynamic Action to the Users' assigned Page Layouts.",
        "Create a Lightning wed component.",
        "Add a Dynamic Action to the Account Record Page."
      ],
      "answer": "B,C,D"
    },
    "corrected": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "Dynamic actions are configured on the Lightning record page, not assigned page layouts. Preserve the original custom-UI requirement and correct only wed/web; the LWC requirement need not be invented in the stem.",
      "references": []
    }
  },
  {
    "id": 152,
    "section": "testing",
    "focus": "familiar",
    "group": "tests",
    "stem": [
      {
        "ask": "What are two ways for a developer to execute tests in an org?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Tooling API",
      "Metadata API",
      "Bulk API",
      "Developer Console"
    ],
    "answer": "",
    "type": "multi",
    "why": "Not scored. Tooling API, Developer Console and Metadata API deployment tests can all execute tests in an org. These are actual supported mechanisms, not hypothetical edge cases; the broad Choose 2 question has three valid choices.",
    "wrong": {},
    "notes": [
      "Metadata API can also cause tests to run as part of deployment. Bulk API processes data rather than invoking the Apex test runner."
    ],
    "source": {
      "stem": [
        {
          "ask": "What are two ways for a developer to execute tests in an org?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "Tooling API",
        "Metadata API",
        "Bulk API",
        "Developer Console"
      ],
      "answer": "A,D"
    },
    "printed": "A,D",
    "ungraded": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "unresolved",
      "reason": "Tooling API, Developer Console and Metadata API deployment tests can all execute tests in an org. These are actual supported mechanisms, not hypothetical edge cases; the broad Choose 2 question has three valid choices.",
      "references": [
        "https://www.examtopics.com/discussions/salesforce/view/94412-exam-crt-450-topic-1-question-333-discussion/",
        "https://www.pass4success.com/salesforce/discussions/exam-dex-450-topic-4-question-79-discussion",
        "https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/salesforce_apex_developer_guide.pdf"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "unresolved",
        "queries": [
          "\"two ways\" \"execute tests in an org\" \"Metadata API\""
        ],
        "candidates": [
          "https://www.examtopics.com/discussions/salesforce/view/94412-exam-crt-450-topic-1-question-333-discussion/",
          "https://www.pass4success.com/salesforce/discussions/exam-dex-450-topic-4-question-79-discussion"
        ],
        "assessment": "Tooling API, Developer Console and Metadata API deployment tests can all execute tests in an org. These are actual supported mechanisms, not hypothetical edge cases; the broad Choose 2 question has three valid choices."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "not-scored",
        "decision": "still-unresolved",
        "reason": "Tooling API, Developer Console and Metadata API deployment tests can all execute tests in an org. These are actual supported mechanisms, not hypothetical edge cases; the broad Choose 2 question has three valid choices."
      },
      "optionAudit": {
        "date": "2026-10-17",
        "status": "matched",
        "comparedChoiceCount": 4,
        "assessment": "The online variant has the same four options in the same order: Tooling API, Metadata API, Bulk API, Developer Console. No missing option was found. Most mock keys select direct test runners and omit deployment-triggered tests.",
        "references": [
          "https://www.pass4success.com/salesforce/discussions/exam-dex-450-topic-4-question-79-discussion"
        ]
      }
    }
  },
  {
    "id": 153,
    "section": "testing",
    "focus": "familiar",
    "group": "debug",
    "stem": [
      {
        "ask": "What is a considerations for running a flow in debug mode?"
      }
    ],
    "choices": [
      "When debugging a schedule-triggered flow, the flow starts only for one record.",
      "Clicking Pause allows an element to be replaced in the flow.",
      "DML operations will be rolled back when the debugging ends.",
      "Callouts to external are not when debugging a flow."
    ],
    "answer": "A",
    "why": "A schedule-triggered flow debug run starts with one record. Whether DML changes persist depends on the flow type and selected debug/rollback mode, so C is not universally true.",
    "wrong": {
      "B": "Pausing a debug run does not let the developer replace an element while it is executing.",
      "C": "Rollback behavior is mode-dependent; not every flow debug run necessarily rolls back all DML.",
      "D": "A database rollback cannot undo a side effect already performed by an external system."
    },
    "notes": [
      "Flow debugging is not universally read-only: without rollback mode, supported flow debug runs can commit changes. Record-triggered debug runs always use rollback, and schedule-triggered debug starts for one record. Rollback does not undo actions already performed by an external HTTP service.",
      "Salesforce reference: Flow debugging and rollback — https://help.salesforce.com/s/articleView?id=sf.flow_considerations_troubleshooting.htm&language=en_US&type=5"
    ],
    "source": {
      "stem": [
        {
          "ask": "What is a considerations for running a flow in debug mode?"
        }
      ],
      "choices": [
        "When debugging a schedule-triggered flow, the flow starts only for one record.",
        "Clicking Pause allows an element to be replaced in the flow.",
        "DML operations will be rolled back when the debugging ends.",
        "Callouts to external are not when debugging a flow."
      ],
      "answer": "C"
    },
    "printed": "C",
    "corrected": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "Schedule-triggered flow debugging starts with one record. DML rollback depends on the selected debug mode, so C is not a general statement about all debugging. Restore the source question instead of adding rollback mode.",
      "references": [
        "https://help.salesforce.com/s/articleView?id=sf.flow_considerations_troubleshooting.htm&language=en_US&type=5"
      ]
    }
  },
  {
    "id": 154,
    "section": "automation",
    "focus": "familiar",
    "group": "model",
    "stem": [
      "A developer created these three Rollup Summary fields in the custom object, Project__c:",
      {
        "code": [
          "Total_Timesheets__c",
          "Total_Approved_Timesheets__c",
          "Total_Rejected_Timesheet__c"
        ]
      },
      "The developer is asked to create a new field that shows the ratio between rejected and approved timesheets for a given project.",
      {
        "ask": "Which should the developer use to implement the business requirement in order to minimize maintenance overhead?"
      }
    ],
    "choices": [
      "Formula field",
      "Record-triggered flow",
      "Roll-up summary field",
      "Apex trigger"
    ],
    "answer": "A",
    "why": "A. The approved and rejected totals already exist on Project__c. A formula divides the rejected total by the approved total without maintaining another automation.",
    "wrong": {
      "B": "A record-triggered flow duplicates a calculation that the existing totals already support declaratively.",
      "C": "Another roll-up can aggregate child records but does not divide these two existing Project totals.",
      "D": "An Apex trigger introduces code and tests for a calculation supported by a formula field."
    },
    "notes": [
      "Define a zero/null-denominator display policy. For example: IF(Total_Approved_Timesheets__c = 0, NULL, Total_Rejected_Timesheet__c / Total_Approved_Timesheets__c). The recovered rejected-field API name uses singular Timesheet; keep the actual schema name when implementing it."
    ],
    "source": {
      "stem": [
        "A developer created these three Rollup Summary fields in the custom object, Project__c:",
        "The developer is asked to create a new field that shows the ratio between rejected and approved timesheets for a given project.",
        {
          "ask": "Which should the developer use to implement the business requirement in order to minimize maintenance overhead?"
        }
      ],
      "choices": [
        "Formula field",
        "Record-triggered flow",
        "Roll-up summary field",
        "Apex trigger"
      ],
      "answer": "A"
    },
    "printed": "A",
    "review": {
      "date": "2026-10-17",
      "treatment": "online-recovery",
      "reason": "Recovered the three omitted roll-up field names from a matching published question: Total_Timesheets__c, Total_Approved_Timesheets__c and Total_Rejected_Timesheet__c. Added only that field list; the original ratio requirement, four answer choices and key A remain unchanged.",
      "references": [
        "https://www.freecram.net/question/Salesforce.PDI.v2025-12-04.q96/a-developer-created-these-three-rollup-summary-fields-in-the-custom-object-project__c-the-developer",
        "https://www.freecram.net/Salesforce.PDI.v2024-07-20.q115.pdf",
        "https://help.salesforce.com/s/articleView?id=platform.customize_functions_divide.htm&language=en_US&type=5"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "resolved",
        "queries": [
          "\"three Rollup Summary\" \"timesheets\""
        ],
        "candidates": [
          "https://www.freecram.net/Salesforce.PDI.v2024-07-20.q115.pdf"
        ],
        "assessment": "Recovered the three omitted roll-up field names from a matching published question: Total_Timesheets__c, Total_Approved_Timesheets__c and Total_Rejected_Timesheet__c. Added only that field list; the original ratio requirement, four answer choices and key A remain unchanged."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "The recovered three-field list supports a formula ratio; the original business requirement and options are unchanged."
      }
    },
    "repair": "Recovered the three omitted roll-up field names from a matching published question: Total_Timesheets__c, Total_Approved_Timesheets__c and Total_Rejected_Timesheet__c. Added only that field list; the original ratio requirement, four answer choices and key A remain unchanged.",
    "repairNotes": [
      "Online recovery: missing material is externally sourced; the Original comparison retains the supplied DOCX. Published option letters can differ.",
      "Reference: https://www.freecram.net/question/Salesforce.PDI.v2025-12-04.q96/a-developer-created-these-three-rollup-summary-fields-in-the-custom-object-project__c-the-developer",
      "Reference: https://www.freecram.net/Salesforce.PDI.v2024-07-20.q115.pdf",
      "Reference: https://help.salesforce.com/s/articleView?id=platform.customize_functions_divide.htm&language=en_US&type=5"
    ],
    "repaired": true
  },
  {
    "id": 155,
    "section": "testing",
    "focus": "familiar",
    "group": "tests",
    "stem": [
      {
        "ask": "How can a developer check the test coverage of autolaunched Flows before deploying them in a change set?"
      }
    ],
    "choices": [
      "Use the ApextestResult class.",
      "Use the Flow Properties page.",
      "Use SOQL and the Tooling API.",
      "Use the Code Coverage Setup page,"
    ],
    "answer": "C",
    "why": "Query FlowTestCoverage through the Tooling API to inspect flow coverage associated with Apex test execution.",
    "wrong": {
      "A": "ApexTestResult is not how you query autolaunched-flow coverage.",
      "B": "The Flow Properties page does not report that coverage.",
      "D": "The Apex code coverage page does not show autolaunched-flow coverage."
    },
    "notes": [
      "Flow coverage and Apex line coverage are different measures. Check the current deployment/activation setting and flow type before assuming coverage is mandatory. Coverage records identify a flow version, so confirm that the version being deployed is the version tested.",
      "Salesforce reference: Flow coverage and active deployment — https://help.salesforce.com/s/articleView?id=platform.flow_distribute_deploy_active.htm&language=en_US&type=5"
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Query FlowTestCoverage through the Tooling API to inspect flow coverage associated with Apex test execution.",
      "references": [
        "https://help.salesforce.com/s/articleView?id=platform.flow_distribute_deploy_active.htm&language=en_US&type=5"
      ]
    }
  },
  {
    "id": 156,
    "section": "automation",
    "focus": "familiar",
    "group": "flows",
    "stem": [
      "Universal Hiring uses Salesforce to capture job applications. A salesforce administrator created two custom objects; Job__c acting as the master object, to Job_Application__c acting as the detail.",
      "Within the Job__c object, a custom multi-select picklist, Preferred_Locations__c, contains a list of approved states for the position. Each Job_Application__c record relates to a Contact within the system through a master-detail relationship.",
      "Recruiters have requested the ability to view whether the Contact's Mailing State value matches a value selected on the Preferred_Locations__c field, within the Job_Application__c record. Recruiters would like this value to be kept in sync if changes occur to the Contact's Mailing State.",
      {
        "ask": "What is the recommended tool a developer should use to meet the business requirement?"
      }
    ],
    "choices": [
      "Apex trigger",
      "Roll-up summary field",
      "Record-triggered flow"
    ],
    "answer": "C",
    "why": "Record-triggered flows can maintain the stored match on related applications when Contact mailing state, Job preferred locations, or application relationships change.",
    "wrong": {
      "A": "Bulk-safe Apex can implement this synchronization, but a record-triggered flow is the simpler native option for this declarative data-maintenance requirement.",
      "B": "A roll-up summary cannot compare the Contact state with the Job state."
    },
    "notes": [
      "A flow on Job_Application__c alone will not run merely because the parent Contact changes. Trigger the synchronization from the relevant source objects and update affected applications in bulk. Multi-select membership must compare complete selected values, not a substring; dynamic multi-select comparison is not an unrestricted cross-object formula."
    ],
    "source": {
      "stem": [
        "Universal Hiring uses Salesforce to capture job applications. A salesforce administrator created two custom objects; Job__c acting as the master object, to Application_c acting as the detail.",
        "Within the Job__c object, a custom multi-select picklist, preferred _Locations__c, contains a list of approved states for the position. Each Job_Application__c record relates to a Contact within the system through a master-detail relationship.",
        "Recruiters have requested the ability to view whether the Contact's Mailing State value matches a value selected on the Preferred Locations__c field, within the Job_Application__c record. Recruiters would like this value to be kept in sync if changes occur to the Contact's Mailing State.",
        {
          "ask": "What is the recommended tool a developer should use to meet the business requirement?"
        }
      ],
      "choices": [
        "Apex trigger",
        "Roll-up summary field",
        "Record-triggered flow"
      ],
      "answer": "C"
    },
    "printed": "C",
    "repaired": true,
    "repair": "Normalize damaged Application and Preferred Locations API names only. Retain the Contact-state synchronization requirement and C key; discuss parent-triggered flows and matching logic in the explanation.",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Normalize damaged Application and Preferred Locations API names only. Retain the Contact-state synchronization requirement and C key; discuss parent-triggered flows and matching logic in the explanation.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "The API-name repairs preserve the parent-state synchronization request; relevant source-object flows can maintain child matches."
      }
    }
  },
  {
    "id": 157,
    "section": "automation",
    "focus": "familiar",
    "group": "triggers",
    "stem": [
      "A developer created a trigger on the Account object. While testing the trigger, the developer sees the error message 'Maximum trigger depth exceeded'.",
      {
        "ask": "What could be the possible causes?"
      }
    ],
    "choices": [
      "The developer does not have the correct user permission.",
      "The trigger is too long and should be refactored into a helper class.",
      "The trigger does not have sufficient code coverage.",
      "The trigger is getting executed multiple times."
    ],
    "answer": "D",
    "why": "Repeated nested saves can re-enter triggers until the maximum trigger depth is exceeded.",
    "wrong": {
      "A": "A permissions error by itself does not explain a maximum-trigger-depth failure; investigate repeated record updates and re-entry.",
      "B": "Length of the trigger is unrelated to recursion.",
      "C": "Code coverage does not influence runtime errors like recursion."
    },
    "notes": [
      "Use old/new-value guards and idempotent logic, and avoid unnecessary same-record DML in before triggers. A single transaction-wide static Boolean can accidentally skip later legitimate bulk chunks; if tracking is required, track records/operations and test re-entry plus bulk scenarios."
    ],
    "source": {
      "stem": [
        "A developer created a trigger on the Account object. While testing the trigger, the developer sees the error message 'Maximum trigger depth exceeded'.",
        {
          "ask": "What could be the possible causes?"
        }
      ],
      "choices": [
        "The developer does not have the correct user permission.",
        "The trigger is too long and should be refactored into a helper class.",
        "The trigger does not have sufficient code coverage.",
        "The trigger is getting executed multiple times."
      ],
      "answer": "D"
    },
    "printed": "D",
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Repeated nested saves can re-enter triggers until the maximum trigger depth is exceeded.",
      "references": []
    }
  },
  {
    "id": 158,
    "section": "automation",
    "focus": "high",
    "group": "language",
    "stem": [
      "Cloud Kicks Fitness, an ISV Salesforce partner, is developing a managed package application. One of the application modules allows the user to calculate body fat using the Apex class, Bodyfat, and its method, calculateBodyFat (). The product owner wants to ensure this method is accessible by the consumer of the application when developing customizations outside the ISV's package namespace.",
      {
        "ask": "Which approach should a developer take to ensure calculateBodyFat () is accessible outside the package namespace?"
      }
    ],
    "choices": [
      "Declare the class and method using the global access modifier.",
      "Declare the class and method using the public access modifier.",
      "Declare the class as public and use the global access modifier on the method.",
      "Declare the class as global and use the public access modifier on the method."
    ],
    "answer": "A",
    "why": "Both the managed-package class and the method must be global to expose that API to subscriber code outside the package namespace.",
    "wrong": {
      "B": "public keeps the class and method inside the namespace. External code needs global.",
      "C": "A public class cannot expose a global method outside the namespace. The class must be global too.",
      "D": "A global class with a public method does not expose that method outside the namespace."
    },
    "notes": [
      "public is namespace-scoped for this purpose. A global API becomes a compatibility commitment for managed-package upgrades, so expose only the intended contract."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Both the managed-package class and the method must be global to expose that API to subscriber code outside the package namespace.",
      "references": []
    }
  },
  {
    "id": 159,
    "section": "automation",
    "focus": "familiar",
    "group": "model",
    "stem": [
      "A software company is using Salesforce to track the companies they sell their software to in the Account object. They also use Salesforce to track bugs in their software with a custom object, Bug__c.",
      "As part of a process improvement initiative, they want to be able to report on which companies have reported which bugs. Each company should be able to report multiple bugs and bugs can also be reported by multiple companies.",
      {
        "ask": "What is needed to allow this reporting?"
      }
    ],
    "choices": [
      "Roll-up summary field of Bug_c on Account",
      "Master-detail field on Bug_c to Account",
      "Lookup field on Bug_c to Account",
      "Junction object between Bug__c and Account"
    ],
    "answer": "D",
    "why": "A junction object records each Account–Bug__c association, allowing many Accounts per bug and many bugs per Account.",
    "wrong": {
      "A": "Roll-up summary field: Not suitable for many-to-many relationships.",
      "B": "Master-detail field on Bug__c to Account: Creates a one-to-many relationship, not many-to-many.",
      "C": "Lookup field on Bug__c to Account: Still creates a one-to-many relationship, not many-to-many."
    },
    "notes": [
      "A canonical junction has two master-detail fields; choose lookups instead if independent ownership/lifecycle requirements warrant them. Add report types/permissions as needed."
    ],
    "source": {
      "stem": [
        "A software company is using Salesforce to track the companies they sell their software to in the Account object. They also use Salesforce to track bugs in their software with a custom object, Bug__c.",
        "As part of a process improvement initiative, they want to be able to report on which companies have reported which bugs. Each company should be able to report multiple bugs and bugs can also be reported by multiple companies.",
        {
          "ask": "What is needed to allow this reporting?"
        }
      ],
      "choices": [
        "Roll-up summary field of Bug_c on Account",
        "Master-detail field on Bug_c to Account",
        "Lookup field on Bug_c to Account",
        "Function object between Bug__c and Account"
      ],
      "answer": "D"
    },
    "printed": "D",
    "repaired": true,
    "repair": "Correct Function object to Junction object only; preserve the many-to-many reporting requirement.",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Correct Function object to Junction object only; preserve the many-to-many reporting requirement.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "Function/Junction is a direct transcription repair for the stated many-to-many reporting model."
      }
    }
  },
  {
    "id": 160,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      {
        "ask": "Which two are phases in the Aura application event propagation framework?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Control",
      "default",
      "Bubble",
      "Emit"
    ],
    "answer": "B,C",
    "type": "multi",
    "why": "Bubble and default are two supported Aura application-event propagation phases among these choices.",
    "wrong": {
      "A": "Control: Not a valid Aura event propagation phase.",
      "D": "Emit is not an Aura application-event phase. The listed valid phases are default and bubble."
    },
    "notes": [
      "Aura also supports capture, which is not listed. The default phase invokes registered handlers without the same hierarchy-order guarantee as capture/bubble; event.setDefault does not define it. Do not confuse Aura phases with LWC’s bubbling-only event model.",
      "Salesforce reference: Aura application-event phases — https://developer.salesforce.com/docs/platform/aura-platform/guide/events-application-propagation.html"
    ],
    "source": {
      "stem": [
        {
          "ask": "Which two are phases in the Aura application event propagation framework?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "Control",
        "default",
        "Buddle",
        "Emit"
      ],
      "answer": "B,C"
    },
    "printed": "B,C",
    "repaired": true,
    "repair": "Correct Buddle to Bubble only; preserve the Aura event-phase question.",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Correct Buddle to Bubble only; preserve the Aura event-phase question.",
      "references": [
        "https://developer.salesforce.com/docs/platform/aura-platform/guide/events-application-propagation.html"
      ],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "explanation-refined",
        "reason": "Corrected a contradictory distractor explanation: default and bubble are listed; capture is supported but is not one of the choices."
      }
    },
    "repairNotes": [
      "Reference: https://developer.salesforce.com/docs/platform/aura-platform/guide/events-application-propagation.html"
    ]
  },
  {
    "id": 161,
    "section": "testing",
    "focus": "familiar",
    "group": "deploy",
    "stem": [
      "Universal Containers wants to back up all of the data and attachments in its Salesforce org once a month.",
      {
        "ask": "Which approach should a developer use to meet this requirement?"
      }
    ],
    "choices": [
      "Schedule a report.",
      "Use the Data Loader command line.",
      "Define a Data Export scheduled job.",
      "Create a Schedulable Apex class."
    ],
    "answer": "C",
    "why": "Schedule Data Export for a monthly export and select the relevant options to include attachments and Salesforce Files/content.",
    "wrong": {
      "A": "Schedule a Report: Does not export attachments and is limited to reportable data.",
      "B": "Data Loader Comm and Line: Requires manual setup and scripting, which is unnecessary for this requirement.",
      "D": "Create a Schedulable Apex class: Not suitable, as the Data Export tool is more efficient for full data and attachment backup."
    },
    "notes": [
      "Scheduling creates downloadable export archives; ensure someone or an authorized process retrieves them within the download window and stores them appropriately. Data Loader can script data exports, but does not provide the same built-in all-data/attachment backup workflow."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Schedule Data Export for a monthly export and select the relevant options to include attachments and Salesforce Files/content.",
      "references": []
    }
  },
  {
    "id": 162,
    "section": "automation",
    "focus": "must",
    "group": "queries",
    "stem": [
      "The Job_Application__c custom object has a field that is a master-detail relationship to the Contact object, where the Contact object is the master.",
      "As part of a feature implementation, a developer needs to retrieve a list containing all Contact records where the related Account Industry is 'Technology', while also retrieving the Contact's Job_Application__c records.",
      {
        "ask": "Based on the object's relationships, what is the most efficient statement to retrieve the list of Contacts?"
      }
    ],
    "choices": [
      "[SELECT Id, (SELECT Id FROM Job_Applications__r) FROM Contact WHERE Accounts.Industry = 'Technology']",
      "[SELECT Id, (SELECT Id FROM Job_Application__c) FROM Contact WHERE Accounts.Industry = 'Technology']",
      "[SELECT Id, (SELECT Id FROM Job_Application__c) FROM Contact WHERE Account.Industry = 'Technology']",
      "[SELECT Id, (SELECT Id FROM Job_Applications__r) FROM Contact WHERE Account.Industry = 'Technology']"
    ],
    "answer": "D",
    "why": "D uses a parent-to-child subquery and the Contact-to-Account parent path Account.Industry. The child relationship must actually be named Job_Applications__r in the org metadata; a custom object name alone does not guarantee it.",
    "wrong": {
      "A": "Accounts.Industry is not the parent field. The relationship is Account.",
      "B": "Job_Application__c is the child object, and Accounts.Industry is the wrong parent path.",
      "C": "Job_Application__c is the child object. The subquery uses Job_Applications__r."
    },
    "notes": [
      "The child relationship name is configured metadata, not simply the child object’s API name. Use the configured Job_Applications relationship. Query Contact as the outer object to retrieve Contacts with nested children."
    ],
    "source": {
      "stem": [
        "The Job_Application__c custom object has a field that is a master-detail relationship to the Contact object, where the Contact object is the master.",
        "As part of a feature implementation, a developer needs to retrieve a list containing all Contact records where the related Account Industry is 'Technology', while also retrieving the Contact's Job_Application__c records.",
        {
          "ask": "Based on the object's relationships, what is the most efficient statement to retrieve the list of Contacts?"
        }
      ],
      "choices": [
        "[SELECT Id, (SELECT Id FROM Job_Applications__r) FROM Contact WHERE Accounts.Industry = 'Technology']",
        "[SELECT Id, (SELECT Id FROM Job_Application__c) FROM Contact WHERE Accounts.Industry = 'Technology']",
        "[SELECT Id, (SELECT Id FROM Job_Application__c) FROM Contact WHERE Account.Industry = 'Technology']",
        "[SELECT Id, (SELECT Id FROM Job_Applications__r) FROM Contact WHERE Account.Industry = 'Technology']"
      ],
      "answer": "D"
    },
    "printed": "D",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: State the configured child relationship name rather than guessing it. Original wording and choices are retained; the source key remains accepted. D uses a parent-to-child subquery and the Contact-to-Account parent path Account.Industry. The child relationship must actually be named Job_Applications__r in the org metadata; a custom object name alone does not guarantee it.",
      "references": []
    }
  },
  {
    "id": 163,
    "section": "testing",
    "focus": "high",
    "group": "deploy",
    "stem": [
      {
        "ask": "What should a developer use to script the deployment and unit test execution as part of continuous integration?"
      }
    ],
    "choices": [
      "VS Code",
      "Execute Anonymous",
      "Salesforce CLI",
      "Developer Console"
    ],
    "answer": "C",
    "why": "Salesforce CLI provides scriptable commands for metadata deployment and Apex test execution within a CI pipeline.",
    "wrong": {
      "A": "VS Code is an IDE and requires CLI integration for scripting.",
      "B": "Execute Anonymous is used for running code snippets manually, not for CI.",
      "D": "Developer Console is for manual testing and debugging, not CI automation."
    },
    "notes": [
      "The CI system runs the commands, handles authorization, waits/polls for completion, and retains failure reports. An IDE can launch CLI commands but is not the automation interface itself."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Salesforce CLI provides scriptable commands for metadata deployment and Apex test execution within a CI pipeline.",
      "references": []
    }
  },
  {
    "id": 164,
    "section": "ui",
    "focus": "must",
    "group": "lightning",
    "stem": [
      {
        "ask": "Which code in a Visualforce page and/or controller might present a security vulnerability?"
      }
    ],
    "choices": [
      {
        "code": "<apex:outputText value='{!$CurrentPage.parameters.userInput}' />"
      },
      {
        "code": "<apex:outputText escape='false' value='{!$CurrentPage.parameters.userInput}' />"
      },
      {
        "code": "<apex:outputField value='{!ctrl.userInput}' rendered='{!isEditable}' />"
      },
      {
        "code": "<apex:outputField value='{!ctrl.userInput}' />"
      }
    ],
    "answer": "B",
    "why": "B outputs untrusted URL input with escape=\"false\", allowing it to be interpreted as HTML rather than safely displayed as text.",
    "wrong": {
      "A": "OutputText escapes by default, so this tag does not run the parameter as markup.",
      "C": "OutputField escapes the value. rendered does not turn that off.",
      "D": "OutputField escapes the value."
    },
    "notes": [
      "Keep the default escaping unless the content is deliberately sanitized for its exact output context. HTML escaping, JavaScript encoding, and URL encoding solve different contexts."
    ],
    "source": {
      "stem": [
        {
          "ask": "Which code in a Visualforce page and/or controller might present a security vulnerability?"
        }
      ],
      "choices": [
        {
          "code": "<apex:outputText value='{!SCurrentPage.parameters.userInput}' />"
        },
        {
          "code": "<apex:outputText escape='false' value='{!sCurrentPage.parameters.userInput}' />"
        },
        {
          "code": "<apex:outputField value='{!ctrl.userInput}' rendered='{!isEditable}' />"
        },
        {
          "code": "<apex:outputField value='{!ctrl.userInput}' />"
        }
      ],
      "answer": "B"
    },
    "printed": "B",
    "repaired": true,
    "repair": "Use the initial question options in the DOCX, not the later appended explanation that substituted invalid Apex method calls into Visualforce. Correct only SCurrentPage/sCurrentPage to $CurrentPage; do not introduce a new controller or Account field.",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Use the initial question options in the DOCX, not the later appended explanation that substituted invalid Apex method calls into Visualforce. Correct only SCurrentPage/sCurrentPage to $CurrentPage; do not introduce a new controller or Account field.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "The $CurrentPage token repairs preserve the unescaped user-input XSS comparison and B key."
      }
    }
  },
  {
    "id": 165,
    "section": "testing",
    "focus": "familiar",
    "group": "tests",
    "stem": [
      "While writing an Apex class, a developer wants to make sure that all functionality being developed is handled as specified by the requirements.",
      {
        "ask": "Which approach should the developer use to be sure that the Apex class is working according to specifications?"
      }
    ],
    "choices": [
      "Include a savepoint and pacabase.rollback().",
      "Include a try/catch block to the Apex class.",
      "Run the code in an Execute Anonymous block in the Developer Console.",
      "Create a test class to execute the business logic and run the test in the Developer Console."
    ],
    "answer": "D",
    "why": "Write Apex tests that execute the required behavior and assert expected results, then run them through Developer Console or another supported test runner.",
    "wrong": {
      "A": "Savepoints and rollbacks are used to manage transactions, not for validation.",
      "B": "Try/catch blocks handle exceptions but do not ensure the code adheres to specifications.",
      "C": "Anonymous Apex can execute complex logic, but it does not replace repeatable unit tests with assertions and isolated test data."
    },
    "notes": [
      "Cover successful, failing, boundary, and bulk scenarios. Executing lines or reaching 75% coverage does not prove the specification was met. A try/catch or savepoint is runtime behavior, not a substitute for assertions."
    ],
    "source": {
      "stem": [
        "While writing an Apex class, a developer wants to make sure that all functionality being developed is handled as specified by the requirements.",
        {
          "ask": "Which approach should the developer use to be sure that the Apex class is working according to specifications?"
        }
      ],
      "choices": [
        "Include a savepoint and pacabase.rollback().",
        "Include a try/catch block to the Apex class.",
        "Run the code in an Execute Anonymous block in the Developer Console.",
        "Create a test class to execute the business logic and run the test in the Developer Console."
      ],
      "answer": "D"
    },
    "printed": "D",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Restore the rollback API distractor and explain that anonymous execution can be complex but is not a repeatable asserted test. Original wording and choices are retained; the source key remains accepted. Write Apex tests that execute the required behavior and assert expected results, then run them through Developer Console or another supported test runner.",
      "references": []
    }
  },
  {
    "id": 166,
    "section": "automation",
    "focus": "high",
    "group": "flows",
    "stem": [
      "Universal Containers wants Opportunities to no longer be editable when they reach the Closed/Wonstage.",
      {
        "ask": "Which two strategies can a developer use to accomplish this?"
      },
      {
        "ask": "Choose 2 answers."
      }
    ],
    "choices": [
      "Use an automatically launched Approval Process.",
      "Use a Validation Rule.",
      "Use a before-save Apex Trigger.",
      "Use an Auto-Response Rule."
    ],
    "answer": "",
    "type": "multi",
    "why": "Not scored. Approval locking, validation rules and a before-save Apex trigger can all implement the stated edit restriction. The source requests only two and does not exclude an automatically launched approval design.",
    "wrong": {},
    "notes": [
      "An Apex before-update trigger with addError also works when code is permitted. To permit initial closing but block later changes, use the prior StageName rather than ISCHANGED(StageName) && new stage Closed Won, which blocks the closing transition itself. Approval lock edit exceptions and final-action behavior must match the policy."
    ],
    "source": {
      "stem": [
        "Universal Containers wants Opportunities to no longer be editable when they reach the Closed/Wonstage.",
        {
          "ask": "Which two strategies can a developer use to accomplish this?"
        },
        {
          "ask": "Choose 2 answers."
        }
      ],
      "choices": [
        "Use an automatically launched Approval Process.",
        "Use a Validation Rule.",
        "Use a before-save Apex Trigger.",
        "Use an Auto-Response Rule."
      ],
      "answer": "A,B"
    },
    "printed": "A,B",
    "ungraded": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "unresolved",
      "reason": "Approval locking, validation rules and a before-save Apex trigger can all implement the stated edit restriction. The source requests only two and does not exclude an automatically launched approval design.",
      "references": [
        "https://www.examtopics.com/discussions/salesforce/view/120648-exam-crt-450-topic-1-question-273-discussion/",
        "https://www.examdiscuss.com/Salesforce/discussions/1130263-exam-pdi-topic-2-question-182-discussion/",
        "https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/salesforce_apex_developer_guide.pdf"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "unresolved",
        "queries": [
          "\"Opportunities to no longer be editable\" \"two strategies\""
        ],
        "candidates": [
          "https://www.examtopics.com/discussions/salesforce/view/120648-exam-crt-450-topic-1-question-273-discussion/",
          "https://www.examdiscuss.com/Salesforce/discussions/1130263-exam-pdi-topic-2-question-182-discussion/"
        ],
        "assessment": "Approval locking, validation rules and a before-save Apex trigger can all implement the stated edit restriction. The source requests only two and does not exclude an automatically launched approval design."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "not-scored",
        "decision": "still-unresolved",
        "reason": "Approval locking, validation rules and a before-save Apex trigger can all implement the stated edit restriction. The source requests only two and does not exclude an automatically launched approval design."
      },
      "optionAudit": {
        "date": "2026-10-17",
        "status": "matched",
        "comparedChoiceCount": 4,
        "assessment": "Online copies contain all four strategies, although their order and published keys differ. Validation rules and before-save triggers are retained; an automatically launched approval process is also explicitly present. No omitted restriction excludes approval locking.",
        "references": [
          "https://www.examdiscuss.com/Salesforce/discussions/1130263-exam-pdi-topic-2-question-182-discussion/"
        ]
      }
    }
  },
  {
    "id": 167,
    "section": "ui",
    "focus": "familiar",
    "group": "visualforce",
    "stem": [
      {
        "ask": "Which code displays the contents of a Visualforce page as a PDF?"
      }
    ],
    "choices": [
      {
        "code": "<apex:page renderAs='application/pdf'>"
      },
      {
        "code": "<apex:page renderAs='pdf'>"
      },
      {
        "code": "<apex:page contentType='application/pdf'>"
      },
      {
        "code": "<apex:page contentType='pdf'>"
      }
    ],
    "answer": "B",
    "why": "renderAs=\"pdf\" on apex:page instructs Visualforce to generate PDF output.",
    "wrong": {
      "A": "Application/pdf is not the renderAs value. renderAs uses pdf.",
      "C": "ContentType does not render the page as a PDF.",
      "D": "ContentType='pdf' does not render the page as a PDF."
    },
    "notes": [
      "contentType controls response content labeling; it does not convert rendered HTML into a PDF. PDF rendering has its own supported markup, fonts, and resource limitations, so verify the generated file when implementing a real document."
    ],
    "printed": "A",
    "source": {
      "stem": [
        {
          "ask": "Which code displays the contents of a Visualforce page as a PDF?"
        }
      ],
      "choices": [
        {
          "code": "<apex:page renderAs='application/pdf'>"
        },
        {
          "code": "<apex:page renderAs='pdf'>"
        },
        {
          "code": "<apex:page contentType='application/pdf'>"
        },
        {
          "code": "<apex:page contentType='pdf'>"
        }
      ],
      "answer": "A"
    },
    "corrected": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "renderAs=\"pdf\" on apex:page instructs Visualforce to generate PDF output.",
      "references": []
    }
  },
  {
    "id": 168,
    "section": "ui",
    "focus": "high",
    "group": "visualforce",
    "stem": [
      "A developer has a Visualforce page and custom controller to save Account records. The developer wants to display any validation rule violations to the user.",
      {
        "ask": "How can the developer make sure that validation rule violations are displayed?"
      }
    ],
    "choices": [
      "Add custom controller attributes to display the message.",
      "Use a try/catch with a custom exception class.",
      "Include <apex:messages> on the Visualforce page.",
      "Perform the DML using the database.unsert() method,"
    ],
    "answer": "C",
    "why": "The original apex:messages component displays the messages added by the controller after catching the DmlException. apex:pageMessages is also valid, but replacing a valid source component was unnecessary.",
    "wrong": {
      "A": "Controller attributes alone cannot handle validation messages.",
      "B": "Catching an exception alone does not render it; this controller already added messages and now needs a message component.",
      "D": "The Database.upsert method is not related to validation error handling."
    },
    "notes": [
      "apex:messages and apex:pageMessages both render page messages. Catching an exception alone does not display it: add an ApexPages.Message or use addMessages, and include a supported messages component.",
      "Reference: https://developer.salesforce.com/docs/platform/salesforce-pages-developers-guide/guide/pages-compref-messages.html"
    ],
    "source": {
      "stem": [
        "A developer has a Visualforce page and custom controller to save Account records. The developer wants to display any validation rule violations to the user.",
        {
          "ask": "How can the developer make sure that validation rule violations are displayed?"
        }
      ],
      "choices": [
        "Add custom controller attributes to display the message.",
        "Use a try/catch with a custom exception class.",
        "Include <apex:messages> on the Visualforce page.",
        "Perform the DML using the database.unsert() method,"
      ],
      "answer": "C"
    },
    "printed": "C",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Make custom-controller message handling explicit and use the formatted pageMessages component. Original wording and choices are retained; the source key remains accepted. The original apex:messages component displays the messages added by the controller after catching the DmlException. apex:pageMessages is also valid, but replacing a valid source component was unnecessary.",
      "references": [
        "https://developer.salesforce.com/docs/platform/salesforce-pages-developers-guide/guide/pages-compref-messages.html"
      ]
    }
  },
  {
    "id": 169,
    "section": "automation",
    "focus": "familiar",
    "group": "model",
    "stem": [
      {
        "ask": "What is an example of a polymorphic lookup field in Salesforce?"
      }
    ],
    "choices": [
      "The Parentid field on the standard Account object",
      "A custom field, Link__c, on the standard Contact object that looks up to an Account or a Campaign",
      "The WhatId field on the standard Event object",
      "The LeadId and Contactid fields on the standard Campaign Member object"
    ],
    "answer": "C",
    "why": "Event.WhatId is polymorphic because it can reference records from several supported object types, such as Account or Opportunity.",
    "wrong": {
      "A": "ParentId on Account is not polymorphic; it only points to other Accounts.",
      "B": "Custom fields cannot be polymorphic.",
      "D": "LeadId and ContactId are specific fields, not polymorphic."
    },
    "notes": [
      "It does not reference every arbitrary object; the related object must support the activity relationship. Event.WhoId is a separate person/name relationship. Ordinary custom lookup fields target one defined object."
    ],
    "source": {
      "stem": [
        {
          "ask": "What is an example of a polymorphic lookup field in Salesforce?"
        }
      ],
      "choices": [
        "The Parentid field on the standard Account object",
        "A custom field, Link__c, on the standard Contact object that looks up to an Account or a Campaign",
        "The Whatld field on the standard Event object",
        "The LeadId and Contactid fields on the standard Campaign Member object"
      ],
      "answer": "C"
    },
    "printed": "C",
    "repaired": true,
    "repair": "Correct Whatld to WhatId only; preserve the polymorphic lookup question.",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Correct Whatld to WhatId only; preserve the polymorphic lookup question.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "Whatld/WhatId is a direct API-name repair; Event.WhatId is the listed polymorphic lookup."
      }
    }
  },
  {
    "id": 170,
    "section": "automation",
    "focus": "familiar",
    "group": "queries",
    "stem": [
      "Universal Containers hires a developer to build a custom search page to help users find the Accounts they want. Users will be able to search on Name, Description, and a custom comments field.",
      {
        "ask": "Which consideration should the developer be aware of when deciding between SOQL and SOSL?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "SOSL is faster for text searches.",
      "SOQL is able to return more records",
      "SOQL Is faster for text searches.",
      "SOSL is able to return more records."
    ],
    "answer": "A,B",
    "type": "multi",
    "why": "SOSL is designed for indexed text searches, while ordinary synchronous Apex permits up to 50,000 SOQL query rows versus 2,000 SOSL results. This is a capability/limit comparison, not a guarantee that SOSL beats every SOQL query.",
    "wrong": {
      "C": "SOQL is appropriate for structured object/relationship retrieval. It does not provide SOSL's single multi-object indexed text-search operation; relative speed still depends on the query.",
      "D": "The ordinary synchronous Apex ceilings are 2,000 SOSL results and 50,000 SOQL query rows; SOSL does not have the larger ceiling."
    },
    "notes": [
      "Typical transaction query-row limits are 50,000 for SOQL versus a 2,000-result SOSL ceiling. SOSL is often appropriate for broad text search, but absolute performance depends on selectivity/data and is not guaranteed. Long-text search needs the actual field’s search/index support."
    ],
    "source": {
      "stem": [
        "Universal Containers hires a developer to build a custom search page to help users find the Accounts they want. Users will be able to search on Name, Description, and a custom comments field.",
        {
          "ask": "Which consideration should the developer be aware of when deciding between SOQL and SOSL?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "SOSL is faster for text searches.",
        "SOQL is able to return more records",
        "SOQL Is faster for text searches.",
        "SOSL is able to return more records."
      ],
      "answer": "A,B"
    },
    "printed": "A,B",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Avoid claiming SOSL is universally faster than SOQL for all queries. State the search capability and standard synchronous row-ceiling comparison without a universal speed claim. Original wording and choices are retained; the source key remains accepted. SOSL is designed for indexed text searches, while ordinary synchronous Apex permits up to 50,000 SOQL query rows versus 2,000 SOSL results. This is a capability/limit comparison, not a guarantee that SOSL beats every SOQL query.",
      "references": []
    }
  },
  {
    "id": 171,
    "section": "automation",
    "focus": "familiar",
    "group": "integration",
    "stem": [
      "A developer wants to send an outbound message when a record meets a specific criteria.",
      {
        "ask": "Which two features satisfy this use case?"
      }
    ],
    "choices": [
      "Flow Builder can be used to check the record criteria and send an outbound message.",
      "Approval Process can be used to check the record criteria and send an outbound message without Apex code.",
      "Entitlement Process can be used to check the record criteria and send an outbound message without Apex code.",
      "Next Best Action can be used to check the record criteria and send an outbound message."
    ],
    "answer": "A,B",
    "type": "multi",
    "why": "An eligible record-triggered flow can invoke an outbound-message action, and an approval process can include outbound messages among its configured actions.",
    "wrong": {
      "C": "Entitlement Process: Focuses on managing entitlements, not triggering outbound messages.",
      "D": "Next Best Action: Used for recommendations and guided actions, not for triggering outbound messages."
    },
    "notes": [
      "An outbound message is a Salesforce SOAP notification with its own delivery behavior, not an arbitrary REST HTTP callout. Select the correct trigger timing and include the required endpoint/field configuration."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "An eligible record-triggered flow can invoke an outbound-message action, and an approval process can include outbound messages among its configured actions.",
      "references": []
    }
  },
  {
    "id": 172,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      {
        "ask": "How does the Lightning Component framework help developers implement solutions faster?"
      }
    ],
    "choices": [
      "By providing device-awareness for mobile and desktops",
      "By providing an Agile process with default steps",
      "By providing change history and version control",
      "By providing code review standards and processes"
    ],
    "answer": "A",
    "why": "The Lightning component ecosystem supports device-aware layouts and mobile/desktop use through its components and styling system.",
    "wrong": {
      "B": "Agile processes are not part of the Lightning framework itself.",
      "C": "Change history and version control are not features of the Lightning Component framework.",
      "D": "Code review standards are a team practice. The Lightning Component framework does not provide them."
    },
    "notes": [
      "Custom code must still choose responsive widths, keyboard/touch handling, and accessibility behavior. The framework does not provide your team’s source-control history, Agile process, or review policy."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "The Lightning component ecosystem supports device-aware layouts and mobile/desktop use through its components and styling system.",
      "references": []
    }
  },
  {
    "id": 173,
    "section": "testing",
    "focus": "must",
    "group": "tests",
    "stem": [
      "A developer completed modifications feature that is comprised of two elements:",
      "* Apex trigger",
      "* Trigger handler Apex class",
      {
        "ask": "What are two factors that the developer must take into account to properly deploy them to the production environment?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Apex classes must have at least 75% code coverage org-wide.",
      "All methods in the test classes must use @istest.",
      "At least one line of code must be executed for the Apex trigger.",
      "Test methods must be declared with the testMethod keyword."
    ],
    "answer": "A,C",
    "type": "multi",
    "why": "For the usual RunLocalTests production coverage gate, eligible Apex coverage is at least 75% org-wide and each trigger must have some executed coverage.",
    "wrong": {
      "B": "Test helper methods need not be test methods, and supported test methods can use @isTest or the older testMethod declaration.",
      "D": "testMethod is not mandatory: @isTest is the recommended alternative. Older testMethod syntax is not universally invalid."
    },
    "notes": [
      "A test method can use @isTest or the older testMethod syntax where supported, and test helper methods need not all be test methods. RunSpecifiedTests changes the calculation to 75% per deployed class/trigger; do not generalize the org-wide rule to every deployment mode.",
      "Deployment test levels: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_start.html"
    ],
    "source": {
      "stem": [
        "A developer completed modifications feature that is comprised of two elements:",
        "* Apex trigger",
        "* Trigger handler Apex class",
        {
          "ask": "What are two factors that the developer must take into account to properly deploy them to the production environment?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "Apex classes must have at least 75% code coverage org-wide.",
        "All methods in the test classes must use @istest.",
        "At least one line of code must be executed for the Apex trigger.",
        "Test methods must be declared with the testMethod keyword."
      ],
      "answer": "A,C"
    },
    "printed": "A,C",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: State RunLocalTests for the coverage calculation. Clarify eligible combined coverage and the supported older testMethod alternative. Original wording and choices are retained; the source key remains accepted. For the usual RunLocalTests production coverage gate, eligible Apex coverage is at least 75% org-wide and each trigger must have some executed coverage.",
      "references": [
        "https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_start.html"
      ]
    }
  },
  {
    "id": 174,
    "section": "automation",
    "focus": "high",
    "group": "language",
    "stem": [
      {
        "code": [
          "Boolean isOK;",
          "  Integer x;",
          "  String theString = 'Hello';",
          "  if (isOK == false && theString == 'Hello') {",
          "      x = 1;",
          "  } else if (isOK == true && theString == 'Hello') {",
          "      x = 2;",
          "  } else if (isOK != null && theString == 'Hello') {",
          "      x = 3;",
          "  } else {",
          "      x = 4;",
          "  }"
        ]
      },
      {
        "ask": "Based on this code, what is the value of x?"
      }
    ],
    "choices": [
      "4",
      "1",
      "2",
      "3"
    ],
    "answer": "A",
    "why": "isOK is null. Equality to false and true both fail, and isOK != null also fails, so the final else assigns x = 4.",
    "wrong": {
      "B": "1 would require isOK to be false.",
      "C": "2 would require isOK to be true.",
      "D": "3 would require isOK != null. An uninitialized Boolean is null, so the else sets 4."
    },
    "notes": [
      "The code image was checked: its third condition is != null, unlike the similar earlier question that uses == null. One changed operator determines which branch executes; do not answer from the apparent duplicate pattern."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "isOK is null. Equality to false and true both fail, and isOK != null also fails, so the final else assigns x = 4.",
      "references": []
    }
  },
  {
    "id": 175,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      "A developer created a child Lightning web component nested inside a parent Lightning web component. The parent component needs to pass a string value to the child component.",
      {
        "ask": "In which two ways can this be accomplished?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "The parent component can invoke a public method in the child component.",
      "The parent component can use a public property to pass the data to the child component,",
      "The parent can use the Apex controller class to send data to the child component.",
      "The parent component can use a custom event to pass the data to the child component."
    ],
    "answer": "A,B",
    "type": "multi",
    "why": "Expose an @api property for declarative parent-to-child input or an @api method that accepts the string when the parent calls it.",
    "wrong": {
      "C": "Apex controllers are not used for direct communication between parent and child components.",
      "D": "Custom events are used for communication from child to parent, not parent to child."
    },
    "notes": [
      "The parent uses the child’s template attribute or queries the child element and calls its public method. Use events for the normal child-to-parent notification direction. An event can be manually dispatched to other targets, but that is not the standard parent input contract."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Expose an @api property for declarative parent-to-child input or an @api method that accepts the string when the parent calls it.",
      "references": []
    }
  },
  {
    "id": 176,
    "section": "automation",
    "focus": "high",
    "group": "triggers",
    "stem": [
      {
        "ask": "Which statement describes the execution order when triggers are associated to the same object and event?"
      }
    ],
    "choices": [
      "Triggers are executed in the order they are modified.",
      "Trigger execution order cannot be guaranteed.",
      "Triggers are executed alphabetically by trigger name.",
      "Triggers are executed in the order they are created."
    ],
    "answer": "B",
    "why": "Salesforce does not guarantee the order of multiple Apex triggers registered for the same object and event.",
    "wrong": {
      "A": "Modification time does not set trigger order.",
      "C": "Trigger names do not set execution order.",
      "D": "Creation time does not set trigger order."
    },
    "notes": [
      "Keep one trigger per object and dispatch to clearly ordered handlers when predictable sequencing is needed. Trigger name, creation time, and modification time do not define execution order. Distinct events still follow the documented save sequence."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Salesforce does not guarantee the order of multiple Apex triggers registered for the same object and event.",
      "references": []
    }
  },
  {
    "id": 177,
    "section": "testing",
    "focus": "high",
    "group": "async",
    "stem": [
      {
        "ask": "What are two ways a developer can get the status of an enqueued job for a class that implements the queueable interface?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "View the Apex Status page",
      "View the Apex Jobs page",
      "Query the AsyncApexJob object",
      "View the Apex Flex Queue"
    ],
    "answer": "B,C",
    "type": "multi",
    "why": "Use Apex Jobs or query AsyncApexJob using the Id returned by System.enqueueJob to inspect a Queueable job’s status.",
    "wrong": {
      "A": "Apex Status page: Not a relevant Salesforce feature.",
      "D": "Apex Flex Queue: Only applicable to Batch Apex jobs, not Queueable jobs."
    },
    "notes": [
      "Flex Queue orders held Batch Apex jobs, not Queueable jobs. Query fields such as Status and NumberOfErrors for monitoring; a queued status does not mean the asynchronous work has completed."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Use Apex Jobs or query AsyncApexJob using the Id returned by System.enqueueJob to inspect a Queueable job’s status.",
      "references": []
    }
  },
  {
    "id": 178,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      {
        "ask": "In terms of the MVC paradigm, what are two advantages of implementing the view layer of a Salesforce application using Lightning Web Component-based development over Visualforce?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Rich component ecosystem",
      "Log capturing via the Debug Logs Setup page",
      "Built-in standard and custom set controllers",
      "Self-contained and reusable units of an application"
    ],
    "answer": "A,D",
    "type": "multi",
    "why": "LWC supplies a rich component ecosystem and encapsulated, reusable application units for the view layer.",
    "wrong": {
      "B": "Log capturing via Debug Logs Setup page: This is unrelated to LWC and is a debugging feature.",
      "C": "Built-in standard and custom set controllers: Relevant to Visualforce, not LWCs."
    },
    "notes": [
      "Standard/standard-set controllers belong to Visualforce, and debug-log capture is not an LWC-only view benefit. Component reuse still requires well-defined public properties, methods, and event contracts."
    ],
    "source": {
      "stem": [
        {
          "ask": "In terms of the MVC paradigm, what are two advantages of implementing the view layer of a Salesforce application using Lightning Web Component-based development over Visualforce?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "Rich component ecosystem",
        "Leg capturing via the Debug Logs Setup page",
        "Built-in standard and custom set controllers",
        "Self-contained and reusable units of an application"
      ],
      "answer": "A,D"
    },
    "printed": "A,D",
    "repaired": true,
    "repair": "Correct Leg capturing to Log capturing only; do not rewrite the MVC-comparison scenario.",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Correct Leg capturing to Log capturing only; do not rewrite the MVC-comparison scenario.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "Leg/Log is a direct typo repair; the LWC view-layer advantages remain component ecosystem and reuse."
      }
    }
  },
  {
    "id": 179,
    "section": "automation",
    "focus": "familiar",
    "group": "integration",
    "stem": [
      "Universal Containers has an order system that uses an Order Number to identify an order for customers and service agents. Order records will be imported into Salesforce.",
      {
        "ask": "How should the Order Number field be defined in Salesforce?"
      }
    ],
    "choices": [
      "Indirect Lookup",
      "Direct Lookup",
      "External ID and Unique",
      "Lookup"
    ],
    "answer": "C",
    "why": "Use an External ID field for the source Order Number and mark it Unique when one number must identify only one Salesforce order.",
    "wrong": {
      "A": "Indirect Lookup: Used for external object relationships, which is not applicable here.",
      "B": "Direct Lookup: Not relevant for unique field identification.",
      "D": "Lookup: Used for creating relationships, not for identifying unique fields."
    },
    "notes": [
      "Configure upsert/matching explicitly; the field flags alone do not change an integration’s insert behavior. A lookup describes a relationship to another record, not the uniqueness or external matching semantics of the order’s identifier."
    ],
    "source": {
      "stem": [
        "Universal Containers has an order system that uses an Order Number to identify an order for customers and service agents. Order records will be imported into Salesforce.",
        {
          "ask": "How should the Order Number field be defined in Salesforce?"
        }
      ],
      "choices": [
        "Indirect Lockup",
        "Direct Lookup",
        "External ID and Unique",
        "Lookup"
      ],
      "answer": "C"
    },
    "printed": "C",
    "repaired": true,
    "repair": "Correct Indirect Lockup to Indirect Lookup only; preserve the external matching-key question.",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Correct Indirect Lockup to Indirect Lookup only; preserve the external matching-key question.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "Lockup/Lookup is a direct typo repair; an imported order number remains an External ID/Unique matching key."
      }
    }
  },
  {
    "id": 180,
    "section": "automation",
    "focus": "familiar",
    "group": "model",
    "stem": [
      "Universal Containers (UC) uses out-of-the-box order management, that has a Master-Detail relationship between Order and Order Line Item.",
      "UC stores the availability date on each Order Line Item and Orders are only shipped when all of the Order Line Items are available.",
      {
        "ask": "Which method should be used to calculate the estimated ship date for an Order?"
      }
    ],
    "choices": [
      "Use 2 LATEST formula on each of the latest availability date fields.",
      "Use a CEILING formula on each of the latest availability date fields.",
      "Use @ DAYS formula on each of the availability date fields and a COUNT Roll-Up Summary field on the Order.",
      "Use a MAX Roll-Up Summary field on the latest availability date fields."
    ],
    "answer": "",
    "why": "Not scored. The required MAX aggregation is conceptually clear, but the source specifies out-of-the-box standard Order/Order Line Item. A configurable native roll-up summary for this relationship is not supplied, so the only plausible option is technically unavailable as stated.",
    "wrong": {},
    "notes": [
      "A custom master-detail model supports a native roll-up. Define what a missing availability date means: MAX ignores nulls, so a null must not accidentally imply readiness. COUNT measures line count, while CEILING rounds numbers.",
      "Reference: https://help.salesforce.com/s/articleView?id=sf.fields_about_roll_up_summary_fields.htm&language=en_US&type=5"
    ],
    "source": {
      "stem": [
        "Universal Containers (UC) uses out-of-the-box order management, that has a Master-Detail relationship between Order and Order Line Item.",
        "UC stores the availability date on each Order Line Item and Orders are only shipped when all of the Order Line Items are available.",
        {
          "ask": "Which method should be used to calculate the estimated ship date for an Order?"
        }
      ],
      "choices": [
        "Use 2 LATEST formula on each of the latest availability date fields.",
        "Use a CEILING formula on each of the latest availability date fields.",
        "Use @ DAYS formula on each of the availability date fields and a COUNT Roll-Up Summary field on the Order.",
        "Use a MAX Roll-Up Summary field on the latest availability date fields."
      ],
      "answer": "D"
    },
    "printed": "D",
    "ungraded": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "unresolved",
      "reason": "The required MAX aggregation is conceptually clear, but the source specifies out-of-the-box standard Order/Order Line Item. A configurable native roll-up summary for this relationship is not supplied, so the only plausible option is technically unavailable as stated.",
      "references": [
        "https://help.salesforce.com/s/articleView?id=sf.fields_about_roll_up_summary_fields.htm&language=en_US&type=5",
        "https://www.freecram.com/discussions/Salesforce/exam-pdi-topic-1-question-88-discussion-p1115324.html"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "unresolved",
        "queries": [
          "\"out-of-the-box order management\" \"availability date\""
        ],
        "candidates": [
          "https://www.freecram.com/discussions/Salesforce/exam-pdi-topic-1-question-88-discussion-p1115324.html"
        ],
        "assessment": "The required MAX aggregation is conceptually clear, but the source specifies out-of-the-box standard Order/Order Line Item. A configurable native roll-up summary for this relationship is not supplied, so the only plausible option is technically unavailable as stated."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "not-scored",
        "decision": "still-unresolved",
        "reason": "The required MAX aggregation is conceptually clear, but the source specifies out-of-the-box standard Order/Order Line Item. A configurable native roll-up summary for this relationship is not supplied, so the only plausible option is technically unavailable as stated."
      },
      "optionAudit": {
        "date": "2026-10-17",
        "status": "matched",
        "comparedChoiceCount": 4,
        "assessment": "The matching online version contains all four aggregation choices, reordered. Its MAX roll-up choice maps to D here. Q180 also has minor OCR prefixes, but there is no missing alternative implementing a supported native standard Order/OrderItem roll-up.",
        "references": [
          "https://www.freecram.com/discussions/Salesforce/exam-pdi-topic-1-question-88-discussion-p1115324.html"
        ]
      }
    }
  },
  {
    "id": 181,
    "section": "automation",
    "focus": "low",
    "group": "model",
    "stem": [
      "Universal Containers (UC) uses out-of-the-box order management, that has a Master-Detail relationship between Order and Order Line Item.",
      "UC stores the availability date on each Order Line Item and Orders are only shipped when all of the Order Line Items are available.",
      {
        "ask": "Which method should be used to calculate the estimated ship date for an Order?"
      }
    ],
    "choices": [
      "Use a LATEST formula on each of the latest availability date fields.",
      "Use a CEILING formula on each of the latest availability date fields.",
      "Use a DAYS formula on each of the availability date fields and a COUNT Roll-Up Summary field on the Order.",
      "Use a MAX Roll-Up Summary field on the latest availability date fields."
    ],
    "answer": "",
    "why": "Not scored. Same standard-object availability defect as Q180: the source does not establish a supported native Order/OrderItem MAX roll-up, and no alternative option implements the stated ship-date calculation.",
    "wrong": {},
    "notes": [
      "MAX only considers populated dates and does not independently validate every line’s readiness. The same null-date policy and master-detail eligibility apply.",
      "Reference: https://help.salesforce.com/s/articleView?id=sf.fields_about_roll_up_summary_fields.htm&language=en_US&type=5"
    ],
    "source": {
      "stem": [
        "Universal Containers (UC) uses out-of-the-box order management, that has a Master-Detail relationship between Order and Order Line Item.",
        "UC stores the availability date on each Order Line Item and Orders are only shipped when all of the Order Line Items are available.",
        {
          "ask": "Which method should be used to calculate the estimated ship date for an Order?"
        }
      ],
      "choices": [
        "Use a LATEST formula on each of the latest availability date fields.",
        "Use a CEILING formula on each of the latest availability date fields.",
        "Use a DAYS formula on each of the availability date fields and a COUNT Roll-Up Summary field on the Order.",
        "Use a MAX Roll-Up Summary field on the latest availability date fields."
      ],
      "answer": "D"
    },
    "printed": "D",
    "ungraded": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "unresolved",
      "reason": "Same standard-object availability defect as Q180: the source does not establish a supported native Order/OrderItem MAX roll-up, and no alternative option implements the stated ship-date calculation.",
      "references": [
        "https://help.salesforce.com/s/articleView?id=sf.fields_about_roll_up_summary_fields.htm&language=en_US&type=5",
        "https://www.freecram.com/discussions/Salesforce/exam-pdi-topic-1-question-88-discussion-p1115324.html"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "unresolved",
        "queries": [
          "\"Order Line Items are available\" \"ship date\""
        ],
        "candidates": [
          "https://www.freecram.com/discussions/Salesforce/exam-pdi-topic-1-question-88-discussion-p1115324.html"
        ],
        "assessment": "Same standard-object availability defect as Q180: the source does not establish a supported native Order/OrderItem MAX roll-up, and no alternative option implements the stated ship-date calculation."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "not-scored",
        "decision": "still-unresolved",
        "reason": "Same standard-object availability defect as Q180: the source does not establish a supported native Order/OrderItem MAX roll-up, and no alternative option implements the stated ship-date calculation."
      },
      "optionAudit": {
        "date": "2026-10-17",
        "status": "matched",
        "comparedChoiceCount": 4,
        "assessment": "The matching online version contains all four aggregation choices, reordered. Its MAX roll-up choice maps to D here. Q180 also has minor OCR prefixes, but there is no missing alternative implementing a supported native standard Order/OrderItem roll-up.",
        "references": [
          "https://www.freecram.com/discussions/Salesforce/exam-pdi-topic-1-question-88-discussion-p1115324.html"
        ]
      }
    }
  },
  {
    "id": 182,
    "section": "automation",
    "focus": "familiar",
    "group": "model",
    "stem": [
      "Universal Containers (UC) wants to lower its shipping cost while making the shipping process more efficient. The Distribution Officer advises UC to implement global addresses to allow multiple Accounts to share a default pickup address. The developer is tasked to create the supporting object and relationship for this business requirement and uses the Setup Menu to create a custom object called 'Global Address'.",
      {
        "ask": "Which field should the developer add to create the most efficient model that supports the business need?"
      }
    ],
    "choices": [
      "Add a master-detail field on the Global Address object to the Account object.",
      "Add a lookup field on the Global Address object to the Account object.",
      "Add a lookup field on the Account object to the Global Address object.",
      "Add a master-detail field on the Account object to the Global Address object."
    ],
    "answer": "C",
    "why": "Put a lookup on Account pointing to Global_Address__c so many Accounts can reference one shared default address.",
    "wrong": {
      "A": "A master-detail on Global Address would not let many Accounts share one address.",
      "B": "The lookup would be on the wrong object. Account should point at the address.",
      "D": "Account is a standard object and cannot be the detail in this new custom master-detail relationship."
    },
    "notes": [
      "The lookup allows independent lifecycles without making Account a detail. A standard object such as Account cannot become the detail of a new custom master-detail relationship. The reverse lookup would allow many addresses per Account rather than the shared-address direction requested."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Put a lookup on Account pointing to Global_Address__c so many Accounts can reference one shared default address.",
      "references": []
    }
  },
  {
    "id": 183,
    "section": "automation",
    "focus": "must",
    "group": "limits",
    "stem": [
      "A developer deployed a trigger to update the Status__c of Assets related to an Account when the Account's status changes. A nightly integration that updates Accounts in bulk has started to fail with limit failures.",
      {
        "code": [
          "trigger AccountTrigger on Account (after update) {",
          "      List<Asset> assetsToUpdate = new List<Asset>();",
          "      for (Account newA : Trigger.new) {",
          "          Account oldA = Trigger.oldMap.get(newA.Id);",
          "          if (oldA.Status__c != newA.Status__c) {",
          "              assetsToUpdate.addAll(AccountHelper.getAssetsToUpdate(newA));",
          "          }",
          "      }",
          "      update assetsToUpdate;",
          "  }"
        ]
      },
      "Recovered helper exhibit (paraphrased): AccountHelper.getAssetsToUpdate accepts one Account, queries its related Assets, changes differing Asset statuses to match the Account, and returns those Assets. That query runs once for each Account passed from the trigger loop.",
      {
        "ask": "What should the developer change about the code to address the failure while still having the code update all of the Assets correctly?"
      }
    ],
    "choices": [
      "Move all of the logic to a Queveable class that queries for and updates the Assets and call it from the trigger.",
      "Add List<asset> assets = [SELECT id, Status_ FROM WHERE AccountId = : acctId] to line 14 and iterate over the assets list in the for loop on line 15.;",
      "Add a LIMIT clause to the SOQL query on line 16 to limit the number of Assets queried for an Account.",
      "Change the getAssetsToUpdate method to process all Accounts in one call and call it outside of the for loop that starts on line 03."
    ],
    "answer": "D",
    "why": "D. Process the Account collection in one helper call, query all relevant Assets together and update the collected changes once outside the Account loop.",
    "wrong": {
      "A": "Moving the same per-Account query pattern to Queueable changes the transaction but does not itself bulkify that pattern.",
      "B": "Moving a query within the per-Account helper still leaves one query per helper invocation; the shown query fragment is also damaged.",
      "C": "An arbitrary LIMIT can omit Assets and violates the requirement to update all relevant Assets."
    },
    "notes": [
      "A real asynchronous design must still bulkify its queries and DML. Use further transaction partitioning only when actual volume requires it."
    ],
    "printed": "A",
    "source": {
      "stem": [
        "A developer deployed a trigger to update the Status__c of Assets related to an Account when the Account's status changes. A nightly integration that updates Accounts in bulk has started to fail with limit failures.",
        {
          "code": [
            "trigger AccountTrigger on Account (after update) {",
            "      List<Asset> assetsToUpdate = new List<Asset>();",
            "      for (Account newA : Trigger.new) {",
            "          Account oldA = Trigger.oldMap.get(newA.Id);",
            "          if (oldA.Status__c != newA.Status__c) {",
            "              assetsToUpdate.addAll(AccountHelper.getAssetsToUpdate(newA));",
            "          }",
            "      }",
            "      update assetsToUpdate;",
            "  }"
          ]
        },
        {
          "ask": "What should the developer change about the code to address the failure while still having the code update all of the Assets correctly?"
        }
      ],
      "choices": [
        "Move all of the logic to a Queveable class that queries for and updates the Assets and call it from the trigger.",
        "Add List<asset> assets = [SELECT id, Status_ FROM WHERE AccountId = : acctId] to line 14 and iterate over the assets list in the for loop on line 15.;",
        "Add a LIMIT clause to the SOQL query on line 16 to limit the number of Assets queried for an Account.",
        "Change the getAssetsToUpdate method to process all Accounts in one call and call it outside of the for loop that starts on line 03."
      ],
      "answer": "A"
    },
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "Scoring restored with corrected key D and the recovered helper context. The source’s query-per-Account pattern calls for bulkifying the helper and invoking it once for the Account collection. Moving the same logic to Queueable is not the targeted fix; an unstated volume requirement is unnecessary to select D.",
      "references": [
        "https://trailhead.salesforce.com/content/learn/modules/apex_triggers/apex_triggers_bulk",
        "https://www.freecram.net/Salesforce.PDI.v2024-07-20.q115.pdf"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "resolved",
        "queries": [
          "\"getAssetsToUpdate\" \"limit failures\""
        ],
        "candidates": [
          "https://www.freecram.net/Salesforce.PDI.v2024-07-20.q115.pdf"
        ],
        "assessment": "Scoring restored with corrected key D and the recovered helper context. The source’s query-per-Account pattern calls for bulkifying the helper and invoking it once for the Account collection. Moving the same logic to Queueable is not the targeted fix; an unstated volume requirement is unnecessary to select D."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "not-scored",
        "decision": "key-corrected",
        "reason": "Scoring restored with corrected key D and the recovered helper context. The source’s query-per-Account pattern calls for bulkifying the helper and invoking it once for the Account collection. Moving the same logic to Queueable is not the targeted fix; an unstated volume requirement is unnecessary to select D."
      }
    },
    "type": "single",
    "corrected": true,
    "repair": "Added a paraphrased description of the missing AccountHelper exhibit found in the matching published question: the helper queries Assets for one Account on each call. Preserved the original trigger and all options. Corrected the original A key to D because D addresses that query-in-loop defect.",
    "repairNotes": [
      "Reference: https://trailhead.salesforce.com/content/learn/modules/apex_triggers/apex_triggers_bulk",
      "Reference: https://www.freecram.net/Salesforce.PDI.v2024-07-20.q115.pdf"
    ]
  },
  {
    "id": 184,
    "section": "automation",
    "focus": "must",
    "group": "limits",
    "stem": [
      "The following Apex method is part of the ContactService class that is called from a trigger:",
      {
        "code": [
          "public static void setBusinessUnitToEMEA(Contact thisContact) {",
          "      thisContact.Business_Unit__c = 'EMEA';",
          "      update thisContact;",
          "  }"
        ]
      },
      {
        "ask": "How should the developer modify the code to ensure best practices are met?"
      }
    ],
    "choices": [
      {
        "code": [
          "public static void setBusinessUnitToEMEA(List<Contact> contacts) {",
          "      for (Contact thisContact : contacts) {",
          "          thisContact.Business_Unit__c = 'EMEA';",
          "      }",
          "      update contacts;",
          "  }"
        ]
      },
      {
        "code": [
          "public static void setBusinessUnitToEMEA(Contact thisContact) {",
          "    List<Contact> contacts = new List<Contact>();",
          "    contacts.add(thisContact.Business_Unit__c = 'EMEA');",
          "    update contacts;",
          "}"
        ]
      },
      {
        "code": [
          "public static void setBusinessUnitToEMEA(List<Contact> contacts) {",
          "    for (Contact thisContact : contacts) {",
          "        thisContact.Business_Unit__c = 'EMEA';",
          "        update contacts[0];",
          "    }",
          "}"
        ]
      },
      {
        "code": [
          "public void setBusinessUnitToEMEA(List<Contact> contacts) {",
          "    contacts[0].Business_Unit__c = 'EMEA';",
          "    update contacts[0];",
          "}"
        ]
      }
    ],
    "answer": "A",
    "why": "A. This implementation processes every supplied Contact and performs one update on the collection outside the loop, following the bulk-processing pattern.",
    "wrong": {
      "B": "The assignment returns a String, which cannot be added to List<Contact>; the method still accepts only one Contact.",
      "C": "DML runs inside the loop and repeatedly updates contacts[0] instead of updating the collection once.",
      "D": "Only the first Contact is changed and updated, so the remaining supplied records are skipped."
    },
    "notes": [
      "For a before-save handler mutating Trigger.new directly, omit same-record DML. An after-trigger implementation must also use writable records and guard recursion. These are implementation caveats; the listed bulk-processing comparison does not specify the trigger phase."
    ],
    "source": {
      "stem": [
        "The following Apex method is part of the ContactService class that is called from a trigger:",
        {
          "code": [
            "public static void setBusinessUnitToEMEA(Contact thisContact) {",
            "      thisContact.Business_Unit__c = 'EMEA';",
            "      update thisContact;",
            "  }"
          ]
        },
        {
          "ask": "How should the developer modify the code to ensure best practices are met?"
        }
      ],
      "choices": [
        {
          "code": [
            "public static void setBusinessUnitToEMEA(List<Contact> contacts) {",
            "      for (Contact thisContact : contacts) {",
            "          thisContact.Business_Unit__c = 'EMEA';",
            "      }",
            "      update contacts;",
            "  }"
          ]
        },
        {
          "code": [
            "public static void setBusinessUnitToEMEA(Contact thisContact) {",
            "    List<Contact> contacts = new List<Contact>();",
            "    contacts.add(thisContact.Business_Unit__c = 'EMEA');",
            "    update contacts;",
            "}"
          ]
        },
        {
          "code": [
            "public static void setBusinessUnitToEMEA(List<Contact> contacts) {",
            "    for (Contact thisContact : contacts) {",
            "        thisContact.Business_Unit__c = 'EMEA';",
            "        update contacts[0];",
            "    }",
            "}"
          ]
        },
        "[Option D exhibit is missing from the source document.]"
      ],
      "answer": "A"
    },
    "printed": "A",
    "review": {
      "date": "2026-10-17",
      "treatment": "online-recovery",
      "reason": "Recovered missing option D from a published version with the same method and A/B/C option sequence. D updates only contacts[0]. Preserved the DOCX method, options A/B/C, option order and key A; no handler timing or writable-record assumption was added.",
      "references": [
        "https://www.freecram.net/question/Salesforce.PDI.v2022-03-30.q75/the-following-apex-method-is-part-of-the-contactservice-class-that-is-called-from-a-trigger-public-static",
        "https://quizlet.com/760295701/sf-developer-2022-flash-cards/",
        "https://trailhead.salesforce.com/content/learn/modules/apex_triggers/apex_triggers_bulk"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "resolved",
        "queries": [
          "\"ContactService\" \"setBusinessUnitToEMEA\""
        ],
        "candidates": [
          "https://quizlet.com/760295701/sf-developer-2022-flash-cards/"
        ],
        "assessment": "Recovered missing option D from a published version with the same method and A/B/C option sequence. D updates only contacts[0]. Preserved the DOCX method, options A/B/C, option order and key A; no handler timing or writable-record assumption was added."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "Recovered option D still updates only the first Contact; A remains the complete bulk-processing alternative."
      }
    },
    "repair": "Recovered missing option D from a published version with the same method and A/B/C option sequence. D updates only contacts[0]. Preserved the DOCX method, options A/B/C, option order and key A; no handler timing or writable-record assumption was added.",
    "repairNotes": [
      "Online recovery: missing material is externally sourced; the Original comparison retains the supplied DOCX. Published option letters can differ.",
      "Reference: https://www.freecram.net/question/Salesforce.PDI.v2022-03-30.q75/the-following-apex-method-is-part-of-the-contactservice-class-that-is-called-from-a-trigger-public-static",
      "Reference: https://quizlet.com/760295701/sf-developer-2022-flash-cards/",
      "Reference: https://trailhead.salesforce.com/content/learn/modules/apex_triggers/apex_triggers_bulk"
    ],
    "repaired": true
  },
  {
    "id": 185,
    "section": "automation",
    "focus": "familiar",
    "group": "triggers",
    "stem": [
      "A developer has an integer variable called maxAttempts. The developer needs to ensure that once maxAttempts is initialized, it preserves its value for the length of the Apex transaction; while being able to share the variable's state between trigger executions.",
      {
        "ask": "How should the developer declare maxAttempts to meet these requirements?"
      }
    ],
    "choices": [
      "Declare maxattempts as a constant using the static and final keywords.",
      "Declare maxattempts as a member variable on the trigger definition.",
      "Declare maxattempts as a variable on a helper class.",
      "Declare maxAttempts as a private static variable on a helper class."
    ],
    "answer": "A,D",
    "why": "A static helper field persists across trigger executions in the same transaction; both static final and private static fields can hold such a value. The source does not require changing the value after initialization, so A or D is accepted.",
    "wrong": {
      "B": "Trigger member variables cannot retain values across executions within the same transaction.",
      "C": "Instance state belongs to a particular helper object. It is not automatically shared between separate helper instances or calls the way a class static variable is."
    },
    "notes": [
      "Expose controlled static helper methods if other classes need to use it. static final preserves an immutable value. Static state resets at transaction boundaries, including new asynchronous transactions."
    ],
    "source": {
      "stem": [
        "A developer has an integer variable called maxAttempts. The developer needs to ensure that once maxAttempts is initialized, it preserves its value for the length of the Apex transaction; while being able to share the variable's state between trigger executions.",
        {
          "ask": "How should the developer declare maxAttempts to meet these requirements?"
        }
      ],
      "choices": [
        "Declare maxattempts as a constant using the static and final keywords.",
        "Declare maxattempts as a member variable on the trigger definition.",
        "Declare maxattempts as a variable on a helper class.",
        "Declare maxAttempts as a private static variable on a helper class."
      ],
      "answer": "D"
    },
    "printed": "D",
    "acceptAny": true,
    "type": "single",
    "choose": 1,
    "repaired": true,
    "repair": "Both static final and a private static helper field can preserve a transaction-scoped value across trigger executions. The source never requires mutation or private direct access, so those restrictions must not be added to force D.",
    "review": {
      "date": "2026-10-17",
      "treatment": "accepted-alternatives",
      "reason": "Both static final and a private static helper field can preserve a transaction-scoped value across trigger executions. The source never requires mutation or private direct access, so those restrictions must not be added to force D.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "The source does not require mutating the initialized value; static final and a private static helper field remain defensible alternatives."
      }
    }
  },
  {
    "id": 186,
    "section": "ui",
    "focus": "high",
    "group": "integration",
    "stem": [
      "Universal Containers recently transitioned from Classic to Lightning Experience. One of its business processes requires certain values from the Opportunity object to be sent via an HTTP REST callout to its external order management system when the user presses a custom button on the Opportunity detail page.",
      "Example fields:",
      "Name",
      "Amount",
      {
        "code": "Account"
      },
      {
        "ask": "Which two methods should the developer implement to fulfill the business requirement?"
      },
      {
        "ask": "Choose 2 answers."
      }
    ],
    "choices": [
      "Create a custom Visualforce quick action that performs the HTTP REST callout and use it on the Opportunity detail page.",
      "Create anafter update triggeron the Opportunity object that calls a helper method using @future(callout=true) to perform the HTTP REST callout.",
      "Create a Lightning component quick action that performs the HTTP REST callout and use it on the Opportunity detail page.",
      "Create a Remote Action on the Opportunity object that executes an Apex immediate action to perform the HTTP REST callout whenever the Opportunity is updated."
    ],
    "answer": "A,C",
    "type": "multi",
    "why": "Both Visualforce and Lightning component quick actions can invoke Apex that sends the authenticated HTTP callout when the user launches the action.",
    "wrong": {
      "B": "A future callout from a trigger can work for update-driven integration, but does not implement the requested explicit quick-action entry point.",
      "D": "A Visualforce @RemoteAction is an Apex method mechanism, not an automatic object action that runs whenever an Opportunity is updated."
    },
    "notes": [
      "Use a Named Credential and implement server-side access checks and response/error handling. An update trigger responds to data changes, not the specified button click, and would need separate async callout handling."
    ],
    "source": {
      "stem": [
        "Universal Containers recently transitioned from Classic to Lightning Experience. One of its business processes requires certain values from the Opportunity object to be sent via an HTTP REST callout to its external order management system when the user presses a custom button on the Opportunity detail page.",
        "Example fields:",
        "Name",
        "Amount",
        {
          "code": "Account"
        },
        {
          "ask": "Which two methods should the developer implement to fulfill the business requirement?"
        },
        {
          "ask": "Choose 2 answers."
        }
      ],
      "choices": [
        "Create a custom Visualforce quick action that performs the HTTP REST callout and use it on the Opportunity detail page.",
        "Create anafter update triggeron the Opportunity object that calls a helper method using @future(callout=true) to perform the HTTP REST callout.",
        "Create a Lightning component quick action that performs the HTTP REST callout and use it on the Opportunity detail page.",
        "Create a Remote Action on the Opportunity object that executes an Apex immediate action to perform the HTTP REST callout whenever the Opportunity is updated."
      ],
      "answer": "A,C"
    },
    "printed": "A,C",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: State that the quick actions invoke Apex for the HTTP callout. Restore trigger wording and identify AccountId as the Opportunity field sent in the callout. Original wording and choices are retained; the source key remains accepted. Both Visualforce and Lightning component quick actions can invoke Apex that sends the authenticated HTTP callout when the user launches the action.",
      "references": []
    }
  },
  {
    "id": 187,
    "section": "testing",
    "focus": "high",
    "group": "tests",
    "stem": [
      "A developer is asked to write helper methods that create test data for unit tests.",
      {
        "code": [
          "01: public class TestUtils {",
          "  02:",
          "  03:     public static Account createAccount() {",
          "  04:         Account act = new Account();",
          "  05:         // ...set some fields on act...",
          "  06:         return act;",
          "  07:     }",
          "  08:     // ...other methods...",
          "  09: }"
        ]
      },
      {
        "ask": "What should be changed in the TestUtils class so that its methods are only usable by unit test methods?"
      }
    ],
    "choices": [
      "@isTest above line 03.",
      "Add @istest above line 01.",
      "Change public to private on line 01.",
      "Remove static from line 03."
    ],
    "answer": "B",
    "why": "Annotate the public TestUtils helper class @isTest so its reusable factory methods are available to test code rather than production callers.",
    "wrong": {
      "A": "@isTest on createAccount does not hide the rest of the class.",
      "C": "private on the class also hides the methods from the tests that need them.",
      "D": "Removing static does not limit the method to tests."
    },
    "notes": [
      "Keep helper methods public static for reuse from other test classes; ordinary factory methods need not themselves be test methods. Annotating the entire helper class @isTest restricts its use to test execution."
    ],
    "repaired": true,
    "repair": "The embedded code image omits the class keyword in the TestUtils declaration. Add only that keyword; preserve the helper methods, all choices and B key.",
    "source": {
      "stem": [
        "A developer is asked to write helper methods that create test data for unit tests.",
        {
          "code": [
            "01: public TestUtils {",
            "  02:",
            "  03:     public static Account createAccount() {",
            "  04:         Account act = new Account();",
            "  05:         // ...set some fields on act...",
            "  06:         return act;",
            "  07:     }",
            "  08:     // ...other methods...",
            "  09: }"
          ]
        },
        {
          "ask": "What should be changed in the TestUtils class so that its methods are only usable by unit test methods?"
        }
      ],
      "choices": [
        "@isTest above line 03.",
        "Add @istest above line 01.",
        "Change public to private on line 01.",
        "Remove static from line 03."
      ],
      "answer": "B"
    },
    "printed": "B",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "The embedded code image omits the class keyword in the TestUtils declaration. Add only that keyword; preserve the helper methods, all choices and B key.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "The omitted class keyword is deterministic syntax damage; class-level isTest remains the test-helper restriction."
      }
    }
  },
  {
    "id": 188,
    "section": "automation",
    "focus": "must",
    "group": "limits",
    "stem": [
      "The following code snippet is executed by a Lightning web component in an environment with more than 2,000 lead records:",
      {
        "code": [
          "@AuraEnabled",
          "  public static void updateLeads() {",
          "      for (Lead thisLead : [SELECT Origin__c FROM Lead]) {",
          "          thisLead.LeadSource = thisLead.Origin__c;",
          "          update thisLead;",
          "      }",
          "  }"
        ]
      },
      {
        "ask": "Which governor limit will likely be exceeded within the Apex transaction?"
      }
    ],
    "choices": [
      "Total number of SOQL queries issued",
      "Total number of DML statements issued",
      "Total number of records processed as a result of DML statements"
    ],
    "answer": "B",
    "why": "The loop performs a separate update for each Lead. With enough successfully processed Leads, it reaches the 150-DML-statement limit before the 10,000-DML-row limit; B is the likely outcome among the listed choices.",
    "wrong": {
      "A": "The query is one SOQL for-loop. The limit that breaks first is DML statements.",
      "C": "DML rows allow 10,000. The update inside the loop hits 150 statements first."
    },
    "notes": [
      "The DML-row ceiling is 10,000, so the repeated statements fail first. SOQL for-loop fetch batches do not turn this into many separately written SOQL statements. Collect changes and perform bulk DML instead of updating each Lead separately."
    ],
    "printed": "C",
    "source": {
      "stem": [
        "The following code snippet is executed by a Lightning web component in an environment with more than 2,000 lead records:",
        {
          "code": [
            "@AuraEnabled",
            "  public void static updateLeads() {",
            "      for (Lead thisLead : [SELECT Origin__c FROM Lead]) {",
            "          thisLead.LeadSource = thisLead.Origin__c;",
            "          update thisLead;",
            "      }",
            "  }"
          ]
        },
        {
          "ask": "Which governor limit will likely be exceeded within the Apex transaction?"
        }
      ],
      "choices": [
        "Total number of SOOL quires issued",
        "Total number of DML statements issued",
        "Total number of records processed as a result of DML statements"
      ],
      "answer": "C"
    },
    "corrected": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "The source updates one Lead per iteration, so DML statements (B) is the likely exceeded limit. Preserve the original requirement and choices, repairing only SOQL spelling and the obvious void/static modifier-order typo in the code image.",
      "references": []
    }
  },
  {
    "id": 189,
    "section": "ui",
    "focus": "must",
    "group": "security",
    "stem": [
      "A developer is creating a Lightning web component to show a list of sales records.",
      "The Sales Representative user should be able to see the commission field on each record. The Sales Assistant user should be able to see all fields on the record except the commission field.",
      {
        "ask": "How should this be enforced so that the component works for both users without showing any errors?"
      }
    ],
    "choices": [
      "Use WITH SECURITY_ENFORCED In the SOQL that fetches the data for the component,",
      "Use Security.stripInaccessible to remove fields inaccessible to the current user.",
      "Use Lightning Locker Service to enforce sharing rules and field-level security.",
      "Use Lightning Data Service to get the collection of sales records."
    ],
    "answer": "B,D",
    "why": "stripInaccessible can sanitize an Apex result by removing unreadable fields, and supported Lightning Data Service/UI API access can also honor field permissions. The source does not require retaining one existing query, so B or D is accepted.",
    "wrong": {
      "A": "WITH SECURITY_ENFORCED throws when a field is hidden. It does not quietly drop Commission.",
      "C": "Locker Service does not strip fields from this Apex query."
    },
    "notes": [
      "Check removed fields if the UI needs to explain omissions; do not return the original list. stripInaccessible does not by itself filter record sharing. A user-mode query can throw for inaccessible selected fields; graceful stripping of an explicitly system-mode query is a separate design. LDS/GraphQL can also retrieve collections."
    ],
    "source": {
      "stem": [
        "A developer is creating a Lightning web component to show a list of sales records.",
        "The Sales Representative user should be able to see the commission field on each record. The Sales Assistant user should be able to see all fields on the record except the commission field.",
        {
          "ask": "How should this be enforced so that the component works for both users without showing any errors?"
        }
      ],
      "choices": [
        "Use WITH SECURITY_ENFORCED In the SOQL that fetches the data for the component,",
        "Use Security.stripInaccessible Le to remove fields inaccessible to the current user.",
        "Use Lightning Locker Service to enforce sharing rules and field-level security.",
        "Use Lightning Data Service to get the collection of sales records."
      ],
      "answer": "B"
    },
    "printed": "B",
    "acceptAny": true,
    "type": "single",
    "choose": 1,
    "repaired": true,
    "repair": "A sanitized Apex result using stripInaccessible and supported Lightning Data Service/UI API collection access can both omit unreadable commission data. The source never requires retaining a legacy system-mode query.",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "A sanitized Apex result using stripInaccessible and supported Lightning Data Service/UI API collection access can both omit unreadable commission data. The source never requires retaining a legacy system-mode query.",
      "references": [
        "https://developer.salesforce.com/docs/platform/lwc/guide/apex-security"
      ],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "stripInaccessible and supported LDS/UI API retrieval remain defensible graceful-FLS alternatives; no legacy query constraint is assumed."
      }
    },
    "repairNotes": [
      "Reference: https://developer.salesforce.com/docs/platform/lwc/guide/apex-security"
    ]
  },
  {
    "id": 190,
    "section": "automation",
    "focus": "high",
    "group": "language",
    "stem": [
      "A developer must create a CreditCardPayment class that provides an implementation of an existing Payment class.",
      {
        "code": [
          "public virtual class Payment {",
          "      public virtual void makePayment(Decimal amount) {",
          "          // implementation",
          "      }",
          "  }"
        ]
      },
      {
        "ask": "Which is the correct implementation?"
      }
    ],
    "choices": [
      {
        "code": [
          "public class CreditCardPayment extends Payment {",
          "      public virtual void makePayment(Decimal amount) { /* implementation */ }",
          "  }"
        ]
      },
      {
        "code": [
          "public class CreditCardPayment implements Payment {",
          "      public virtual void makePayment(Decimal amount) { /* implementation */ }",
          "  }"
        ]
      },
      {
        "code": [
          "public class CreditCardPayment implements Payment {",
          "      public override void makePayment(Decimal amount) { /* implementation */ }",
          "  }"
        ]
      },
      {
        "code": [
          "public class CreditCardPayment extends Payment {",
          "      public override void makePayment(Decimal amount) { /* implementation */ }",
          "  }"
        ]
      }
    ],
    "answer": "D",
    "why": "CreditCardPayment extends the virtual Payment class and uses override on the replacement makePayment implementation.",
    "wrong": {
      "A": "A virtual method is overridden with override, not declared virtual again.",
      "B": "Implements is for an interface. Payment is a class.",
      "C": "Implements is still wrong for a class, even with override."
    },
    "notes": [
      "Apex requires override when redefining that virtual method. implements applies to interfaces, and repeating virtual does not implement an override of the inherited signature."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "CreditCardPayment extends the virtual Payment class and uses override on the replacement makePayment implementation.",
      "references": []
    }
  },
  {
    "id": 191,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      {
        "ask": "Which three Salesforce resources can be accessed from a Lightning web component?"
      },
      {
        "ask": "Choose 3 answers"
      }
    ],
    "choices": [
      "Static resources",
      "All external libraries",
      "SVG resources",
      "Third-party web components",
      "Content asset files"
    ],
    "answer": "A,C,E",
    "type": "multi",
    "why": "A, C and E. These are the listed Salesforce-hosted resource categories that LWC can access.",
    "wrong": {
      "B": "Not all external libraries are compatible with the supported runtime and security model.",
      "D": "Third-party web components can be integrated, but they are external UI components rather than one of the Salesforce resource categories asked for."
    },
    "notes": [
      "Do not infer that LWC cannot use third-party web components. The distinction here is the original question’s Salesforce-resources scope.",
      "Reference: https://developer.salesforce.com/docs/platform/lwc/guide/create-global-value-providers.html"
    ],
    "source": {
      "stem": [
        {
          "ask": "Which three Salesforce resources can be accessed from a Lightning web component?"
        },
        {
          "ask": "Choose 3 answers"
        }
      ],
      "choices": [
        "Static resources",
        "All external libraries",
        "SVG resources",
        "Third-party web components",
        "Content asset files"
      ],
      "answer": "A,C,E"
    },
    "printed": "A,C,E",
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Scoring restored: the question specifically asks for Salesforce resources. Static resources, SVG resources and content asset files are the resource categories in the official LWC resource guide. Supporting third-party web components does not make those external components an additional Salesforce resource category.",
      "references": [
        "https://developer.salesforce.com/docs/platform/lwc/guide/create-use-third-party-components.html",
        "https://www.freecram.net/question/Salesforce.PDI.v2024-07-20.q115/which-three-salesforce-resources-can-be-accessed-from-a-lightning-web-component-choose-3-answers",
        "https://developer.salesforce.com/docs/platform/lwc/guide/create-global-value-providers.html"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "resolved",
        "queries": [
          "\"Which three Salesforce resources\" \"Third-party web components\""
        ],
        "candidates": [
          "https://www.freecram.net/question/Salesforce.PDI.v2024-07-20.q115/which-three-salesforce-resources-can-be-accessed-from-a-lightning-web-component-choose-3-answers"
        ],
        "assessment": "Scoring restored: the question specifically asks for Salesforce resources. Static resources, SVG resources and content asset files are the resource categories in the official LWC resource guide. Supporting third-party web components does not make those external components an additional Salesforce resource category."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "not-scored",
        "decision": "scoring-restored",
        "reason": "Scoring restored: the question specifically asks for Salesforce resources. Static resources, SVG resources and content asset files are the resource categories in the official LWC resource guide. Supporting third-party web components does not make those external components an additional Salesforce resource category."
      }
    },
    "choose": 3
  },
  {
    "id": 192,
    "section": "ui",
    "focus": "familiar",
    "group": "security",
    "stem": [
      "A developer is tasked with building a custom Lightning web component to collect Contact information.",
      "The form will be shared among many different types of users in the org. There are security requirements that only certain fields should be edited and viewed by certain groups of users.",
      {
        "ask": "What should the developer use in their Lightning Web Component to support the security requirements?"
      }
    ],
    "choices": [
      "aura-input-failed",
      "force-input-failed",
      "ui-input-failed",
      "lightning-input-field"
    ],
    "answer": "D",
    "why": "lightning-input-field inside lightning-record-edit-form uses field metadata and LDS permissions to render supported Contact inputs.",
    "wrong": {
      "A": "aura-input-failed is not a supported LWC field component.",
      "B": "force-input-failed is not a supported LWC field component.",
      "C": "ui-input-failed is not a supported LWC field component."
    },
    "notes": [
      "Provide object-api-name=\"Contact\" on the form and field-name on each input. Include lightning-messages and a submit button as appropriate. LDS-managed saves respect object permissions/FLS/sharing; separate custom Apex logic still requires separate security handling."
    ],
    "repaired": true,
    "repair": "Correct lightning-input-failed to lightning-input-field only, matching the same security scenario in Q4. Do not invent other answer choices.",
    "source": {
      "stem": [
        "A developer is tasked with building a custom Lightning web component to collect Contact information.",
        "The form will be shared among many different types of users in the org. There are security requirements that only certain fields should be edited and viewed by certain groups of users.",
        {
          "ask": "What should the developer use in their Lightning Web Component to support the security requirements?"
        }
      ],
      "choices": [
        "aura-input-failed",
        "force-input-failed",
        "ui-input-failed",
        "lightning-input-failed"
      ],
      "answer": "D"
    },
    "printed": "D",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Correct lightning-input-failed to lightning-input-field only, matching the same security scenario in Q4. Do not invent other answer choices.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "The component-name typo fix restores lightning-input-field within an LDS-backed form; custom Apex security remains separate."
      }
    }
  },
  {
    "id": 193,
    "section": "automation",
    "focus": "must",
    "group": "limits",
    "stem": [
      "Given the following Anonymous block:",
      {
        "code": [
          "List<Case> casesToUpdate = new List<Case>();",
          "  for (Case thisCase : [SELECT Id, Status FROM Case LIMIT 50000]) {",
          "      thisCase.Status = 'Working';",
          "      casesToUpdate.add(thisCase);",
          "  }",
          "  try {",
          "      Database.update(casesToUpdate, false);",
          "  } catch (Exception e) {",
          "      System.debug(e.getMessage());",
          "  }"
        ]
      },
      {
        "ask": "What should a developer consider for an environment that has over 10,000 Case records?"
      }
    ],
    "choices": [
      "The transaction will succeed and changes will be committed.",
      "The try-catch block will handle exceptions thrown by governor limits.",
      "The transaction will fail due to exceeding the governor limit.",
      "The try-catch block will handle any DML exceptions thrown,"
    ],
    "answer": "C",
    "why": "Updating more than 10,000 Case rows in one transaction exceeds the DML-row governor limit and fails with an uncatchable LimitException.",
    "wrong": {
      "A": "More than 10,000 rows cannot be updated in one transaction.",
      "B": "A catch (Exception) does not catch LimitException.",
      "D": "catch (Exception) could handle ordinary catchable exceptions, but it cannot handle the governor LimitException that occurs in this scenario."
    },
    "notes": [
      "Database.update(records, false) only permits ordinary per-row partial success; it does not raise the row limit. Use bounded separate transactions, such as Batch Apex, for the large update. The query LIMIT 50000 still allows far more DML rows than one transaction permits."
    ],
    "source": {
      "stem": [
        "Given the following Anonymous block:",
        {
          "code": [
            "List<Case> casesToUpdate = new List<Case>();",
            "  for (Case thisCase : [SELECT Id, Status FROM Case LIMIT 50000]) {",
            "      thisCase.Status = 'Working';",
            "      casesToUpdate.add(thisCase);",
            "  }",
            "  try {",
            "      Database.update(casesToUpdate, false);",
            "  } catch (Exception e) {",
            "      System.debug(e.getMessage());",
            "  }"
          ]
        },
        {
          "ask": "What should a developer consider for an environment that has over 10,000 Case records?"
        }
      ],
      "choices": [
        "The transaction will succeed and changes will be committed.",
        "The try-catch block will handle exceptions thrown by governor limits.",
        "The transaction will fail due to exceeding the governor limit.",
        "The try-catch block will handle any DML exceptions thrown,"
      ],
      "answer": "C"
    },
    "printed": "C",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Base the governor-limit result on returned, writable records rather than the total rows hidden anywhere in the org. Original wording and choices are retained; the source key remains accepted. Updating more than 10,000 Case rows in one transaction exceeds the DML-row governor limit and fails with an uncatchable LimitException.",
      "references": []
    }
  },
  {
    "id": 194,
    "section": "fundamentals",
    "focus": "familiar",
    "group": "platform",
    "stem": [
      {
        "ask": "What are two benefits of using declarative customizations over code?"
      },
      {
        "ask": "Choose 2 answer"
      }
    ],
    "choices": [
      "Declarative customizations automatically update with each Salesforce release.",
      "Declarative customizations automatically generate test classes.",
      "Declarative customizations cannot generate run time errors",
      "Declarative customizations generally require less maintenance"
    ],
    "answer": "A,D",
    "type": "multi",
    "why": "Salesforce maintains declarative platform features across releases, and declarative configuration generally needs less custom-code maintenance for suitable use cases.",
    "wrong": {
      "B": "Declarative tools do not automatically generate test classes. This is specific to Apex code.",
      "C": "Declarative customizations can still result in runtime errors, such as invalid field updates or logic conflicts."
    },
    "notes": [
      "That does not guarantee zero regressions, zero testing, or automatically updated business logic. Flows and validation rules can fail at runtime and must be reviewed as requirements evolve. Declarative tools do not automatically generate a complete Apex test suite."
    ],
    "source": {
      "stem": [
        {
          "ask": "What are two benefits of using declarative customizations over code?"
        },
        {
          "ask": "Choose 2 answer"
        }
      ],
      "choices": [
        "Declarative customizations automatically update with each Salesforce release.",
        "Declarative customizations automatically generate test classes.",
        "Declarative customizations cannot generate run time errors",
        "Declarative customizations generally require less maintenance"
      ],
      "answer": "A,D"
    },
    "printed": "A,D",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Avoid promising automatic business-logic migration during releases. Original wording and choices are retained; the source key remains accepted. Salesforce maintains declarative platform features across releases, and declarative configuration generally needs less custom-code maintenance for suitable use cases.",
      "references": []
    }
  },
  {
    "id": 195,
    "section": "testing",
    "focus": "familiar",
    "group": "debug",
    "stem": [
      "A developer creates a batch Apex job to update a large number of records, and receives reports of the job timing out and not completing.",
      {
        "ask": "What is the first step towards troubleshooting the issue?"
      }
    ],
    "choices": [
      "Check the asynchronous job monitoring page to view the job status and logs.",
      "Check the debug logs for the batch job.",
      "Disable the batch job and recreate it with a smaller number of records.",
      "Decrease the batch size to reduce the load on the system."
    ],
    "answer": "A",
    "why": "Start with asynchronous job monitoring to establish status, progress and reported errors, then inspect the relevant debug logs for execution detail. Reducing the batch size is a possible remedy after identifying the cause.",
    "wrong": {
      "B": "Debug logs are useful for the failing execution; job monitoring first establishes whether and where the batch failed or stalled.",
      "C": "Disabling and recreating the job skips the status that explains the delay.",
      "D": "A smaller batch is a later change. Check the monitoring page first."
    },
    "notes": [
      "Debug logs are also useful early evidence. Establish job state before changing batch size. Reduce scope only after measuring CPU, queries, locks, callouts, or record-specific failures."
    ],
    "source": {
      "stem": [
        "A developer creates a batch Apex job to update a large number of records, and receives reports of the job timing out and not completing.",
        {
          "ask": "What is the first step towards troubleshooting the issue?"
        }
      ],
      "choices": [
        "Check the asynchronous job monitoring page to view the job status and logs.",
        "Check the debug logs for the batch job.",
        "Disable the batch job and recreate it with a smaller number of records.",
        "Decrease the batch size to reduce the load on the system."
      ],
      "answer": "A"
    },
    "printed": "A",
    "review": {
      "date": "2026-10-17",
      "treatment": "restored",
      "reason": "Withdraw the previous rewrite: Ask specifically for job-level status/progress and distinguish it from execution-level debug logs. Original wording and choices are retained; the source key remains accepted. Start with asynchronous job monitoring to establish status, progress and reported errors, then inspect the relevant debug logs for execution detail. Reducing the batch size is a possible remedy after identifying the cause.",
      "references": []
    }
  },
  {
    "id": 196,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      "A developer created a Lightning web component called statuscomponent to be Inserted into the Account record page.",
      {
        "ask": "Which two things should the developer do to make this component available?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Add <target>lightning__RecordPage</target> to the statuscomponent. js file,",
      "Add <target>lightning__RecordPage</target> to the statuscomponent.js-meta.xml file.",
      "Set isExposed to true In the statuscomponent.js-meta.xml file.",
      "Add <masterLabel>Account </masterLabel> to the statusComponent. js-meta.xm1 file."
    ],
    "answer": "B,C",
    "type": "multi",
    "why": "Set isExposed to true and include lightning__RecordPage in the component’s .js-meta.xml targets.",
    "wrong": {
      "A": "App Builder targets belong in .js-meta.xml under <targets>, not in the JavaScript source file.",
      "D": "MasterLabel is not what exposes the component on the Account record page."
    },
    "notes": [
      "The JavaScript file does not declare App Builder targets. If the component should be limited to Account pages, add a targetConfigs/targetConfig objects restriction for Account; the two listed settings expose record-page availability generally."
    ],
    "source": {
      "stem": [
        "A developer created a Lightning web component called statuscomponent to be Inserted into the Account record page.",
        {
          "ask": "Which two things should the developer do to make this component available?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "Add <targer>lightning_Recordpage</target> to the statuscomponent. js file,",
        "Add <target>lightning RecordPage</target> to the statusComp .js-meta.xml file.",
        "Set is Exposes to true In the statuscomponent.js-meta.xml file.",
        "Add <mastertabel>Account </masterLabel> to the statusComponent. js-meta.xm1 file."
      ],
      "answer": "B,C"
    },
    "printed": "B,C",
    "repaired": true,
    "repair": "Repair only the damaged LWC metadata identifiers and file spellings in the existing choices. Preserve wrong-file distractors, the scenario, and B,C key.",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Repair only the damaged LWC metadata identifiers and file spellings in the existing choices. Preserve wrong-file distractors, the scenario, and B,C key.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "The metadata token fixes preserve .js-meta.xml exposure and record-page target requirements."
      }
    }
  },
  {
    "id": 197,
    "section": "testing",
    "focus": "high",
    "group": "async",
    "stem": [
      {
        "ask": "What are two use cases for executing Anonymous Apex code?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "schedule an Apex class to run periodically",
      "To delete 15,000 inactive Accounts in a single transaction after a deployment",
      "To run a batch Apex class to update all Contacts",
      "To add unit test code coverage to an org"
    ],
    "answer": "A,C",
    "type": "multi",
    "why": "Anonymous Apex can call System.schedule to register a periodic Schedulable job and Database.executeBatch to start a Batch Apex job.",
    "wrong": {
      "B": "One transaction cannot delete 15,000 rows. The DML row limit is 10,000.",
      "D": "Anonymous Apex does not add test coverage."
    },
    "notes": [
      "These calls enqueue later execution; the later jobs run in their own transactions. Anonymous Apex does not contribute unit-test coverage, and a single ordinary transaction cannot delete 15,000 rows because the DML-row limit is 10,000."
    ],
    "printed": "B,C",
    "source": {
      "stem": [
        {
          "ask": "What are two use cases for executing Anonymous Apex code?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "schedule an Apex class to run periodically",
        "To delete 15,000 inactive Accounts in a single transaction after a deployment",
        "To run a batch Apex class to update all Contacts",
        "To add unit test code coverage to an org"
      ],
      "answer": "B,C"
    },
    "corrected": true,
    "review": {
      "date": "2026-10-17",
      "treatment": "key-correction",
      "reason": "Anonymous Apex can call System.schedule to register a periodic Schedulable job and Database.executeBatch to start a Batch Apex job.",
      "references": []
    }
  },
  {
    "id": 198,
    "section": "ui",
    "focus": "familiar",
    "group": "platform",
    "stem": [
      "A developer creates a Lightning web component that imports a method within an Apex class. When a Validate button is pressed, the method runs to execute complex validations.",
      {
        "ask": "In this implementation scenario, which two options are part of the Controller according to the MVC architecture?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "HTML file",
      "Apex class",
      "JavaScript file",
      "XML file"
    ],
    "answer": "B,C",
    "type": "multi",
    "why": "In this teaching model, the component JavaScript handles client interaction and the Apex class supplies server-side business control logic; HTML is the view.",
    "wrong": {
      "A": "HTML file: Represents the 'View' in MVC, focusing on UI rendering.",
      "D": "XML is metadata. It is not the controller."
    },
    "notes": [
      "LWC is not literally the Visualforce MVC implementation. The .js-meta.xml file configures exposure/targets rather than performing the validation when the button is pressed. Keep UI state and server authorization responsibilities explicit."
    ],
    "source": {
      "stem": [
        "A developer creates a Lightning web component that imports a method within an Apex class. When a Validate button is pressed, the method runs to execute complex validations.",
        {
          "ask": "In this implementation scenario, which two options are.. of the Controller according to the MVC architecture?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "HTML file",
        "Apex class",
        "JavaScript file",
        "XML file"
      ],
      "answer": "B,C"
    },
    "printed": "B,C",
    "repaired": true,
    "repair": "Restore the missing words part of in the controller-role prompt only; retain the source JavaScript/Apex teaching analogy and B,C key.",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Restore the missing words part of in the controller-role prompt only; retain the source JavaScript/Apex teaching analogy and B,C key.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "The missing part-of phrase is a small repair to the stated MVC teaching analogy; JavaScript/Apex remain the intended controller layers."
      }
    }
  },
  {
    "id": 199,
    "section": "automation",
    "focus": "must",
    "group": "queries",
    "stem": [
      {
        "ask": "Which statement generates a list of Leads and Contacts that have a field containing the phrase 'ACME'?"
      }
    ],
    "choices": [
      "List<SObject> searchList = [FIND '*ACME*' IN FIELDS RETURNING Contact, Lead];",
      "List<List<SObject>> searchList = [SELECT Name, Id FROM Contact, Lead WHERE Name LIKE '%ACME%'];",
      "List<List<SObject>> searchList = [FIND 'ACME*' IN ALL FIELDS RETURNING Contact, Lead];",
      "List<SObject> searchList = [find 'acme' in all fields returning Contact, Lead];"
    ],
    "answer": "C",
    "why": "C. SOSL searches the Contact and Lead objects and returns a List<List<SObject>>. The repaired ACME* search term uses a supported trailing wildcard.",
    "wrong": {
      "A": "SOSL returns a list of lists, not List<SObject>; this option also has a damaged IN clause and leading wildcard.",
      "B": "The shown multi-object SELECT is not valid SOQL; SOSL is used to search multiple object types.",
      "D": "The SOSL result type is a list of lists, not a flat List<SObject>."
    },
    "notes": [
      "SOSL is token/word based. ACME* matches words beginning with ACME; it is not an arbitrary within-word substring search. The source asks for the phrase ACME and does not define a requirement to match a token such as XACMEY."
    ],
    "source": {
      "stem": [
        {
          "ask": "Which statement generates a list of Leads and Contacts that have a field containing the phrase 'ACME'?"
        }
      ],
      "choices": [
        "List<SObject> searchList = [FIND '*ACME*' IN FIELDS RETURNING Contact, Lead];",
        "List<List<SObject>> searchList = [SELECT Name, Id FROM Contact, Lead WHERE Name LIKE '%ACME%'];",
        "List<List<SObject>> searchList = [FIND '*ACME*' IN ALL FIELDS RETURNING Contact, Lead];",
        "List<SObject> searchList = [find 'acme' in all fields returning Contact, Lead];"
      ],
      "answer": "C"
    },
    "printed": "C",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Scoring restored after a one-character SOSL repair: removed the unsupported leading asterisk from C while preserving its trailing wildcard, return type, objects and original question. The earlier review incorrectly treated containing the phrase as an explicit arbitrary-substring-search contract instead of the normal SOSL term-search question.",
      "references": [
        "https://developer.salesforce.com/docs/platform/salesforce-soql-sosl/guide/sforce-api-calls-sosl-find.html",
        "https://www.pass4success.com/salesforce/discussions/exam-dex-450-topic-4-question-47-discussion"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "resolved",
        "queries": [
          "\"field containing the phrase\" \"ACME\""
        ],
        "candidates": [
          "https://www.pass4success.com/salesforce/discussions/exam-dex-450-topic-4-question-47-discussion"
        ],
        "assessment": "Scoring restored after a one-character SOSL repair: removed the unsupported leading asterisk from C while preserving its trailing wildcard, return type, objects and original question. The earlier review incorrectly treated containing the phrase as an explicit arbitrary-substring-search contract instead of the normal SOSL term-search question."
      },
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "not-scored",
        "decision": "scoring-restored",
        "reason": "Scoring restored after a one-character SOSL repair: removed the unsupported leading asterisk from C while preserving its trailing wildcard, return type, objects and original question. The earlier review incorrectly treated containing the phrase as an explicit arbitrary-substring-search contract instead of the normal SOSL term-search question."
      }
    },
    "type": "single",
    "repaired": true,
    "repair": "Removed only the first asterisk from the search literal in option C: FIND '*ACME*' becomes FIND 'ACME*'. SOSL permits wildcards in the middle or at the end of a term. The question, return type, searched fields/objects, other choices and key C are retained.",
    "repairNotes": [
      "Reference: https://developer.salesforce.com/docs/platform/salesforce-soql-sosl/guide/sforce-api-calls-sosl-find.html",
      "Reference: https://www.pass4success.com/salesforce/discussions/exam-dex-450-topic-4-question-47-discussion"
    ]
  },
  {
    "id": 200,
    "section": "automation",
    "focus": "must",
    "group": "triggers",
    "stem": [
      "A developer identifies the following triggers on the Expense__c object:",
      "deleteExpense,",
      "applyDefaultsToExpense,",
      "validateExpenseUpdate;",
      "The triggers process before delete, before insert, and before update events respectively.",
      {
        "ask": "Which two techniques should the developer implement to ensure trigger best practices are followed?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Unify all three triggers In a single trigger on the Expense__c object that Includes all events.",
      "Unify the before insert and before update triggers and use Flow for the delete action.",
      "Create helper classes to execute the appropriate logic when a record is saved.",
      "Maintain all three triggers on the Expense __c object, but move the Apex logic out of the trigger definition."
    ],
    "answer": "A,C",
    "type": "multi",
    "why": "Consolidate the object’s trigger entry point and delegate event-specific business logic to helper/handler classes.",
    "wrong": {
      "B": "Splitting record automation across Flow and Apex adds another entry point; consolidating the existing triggers with event-specific helpers is the recommended pattern here.",
      "D": "Moving logic to helpers is useful, but retaining separate trigger entry points does not complete the recommended consolidation."
    },
    "notes": [
      "The three listed triggers use different events, so do not claim their relative event order is inherently undefined. Consolidation improves discoverability and future control; only multiple triggers for the same object/event have unspecified ordering. Keep before-delete logic separate from insert/update paths inside the handler."
    ],
    "source": {
      "stem": [
        "A developer identifies the following triggers on the Expense__c object:",
        "deleteExpense,",
        "applyDefaultsToExpense,",
        "validateExpenseUpdate;",
        "The triggers process before delete, before insert, and before update events respectively.",
        {
          "ask": "Which two techniques should the developer implement to ensure trigger best practices are followed?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "Unity all three triggers In a single trigger on the Expense__c object that Includes all events.",
        "Unify the before insert and before update triggers and use Flow for the delete action.",
        "Create helper classes to execute the appropriate logic when a record is saved.",
        "Maintain all three triggers on the Expense __c object, but move the Apex logic out of the trigger definition."
      ],
      "answer": "A,C"
    },
    "printed": "A,C",
    "repaired": true,
    "repair": "Correct Unity to Unify only. Keep the three different trigger events and explain consolidation without falsely claiming their relative event order is undefined.",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Correct Unity to Unify only. Keep the three different trigger events and explain consolidation without falsely claiming their relative event order is undefined.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "explanation-refined",
        "reason": "Removed a claim that the source explicitly demanded an Apex-only refactor; explain consolidation as the recommended existing-trigger pattern."
      }
    }
  },
  {
    "id": 201,
    "section": "automation",
    "focus": "high",
    "group": "limits",
    "stem": [
      {
        "ask": "Which statement should be used to allow some of the records in a list of records to be inserted if others fail to be inserted?"
      }
    ],
    "choices": [
      "Database. insert (records, true)",
      "insert records",
      "insert (records, false)",
      "Database. insert (records, false)"
    ],
    "answer": "D",
    "why": "Database.insert(records, false) returns per-row SaveResult objects so valid records may succeed even when other rows fail ordinary validation.",
    "wrong": {
      "A": "Database.insert(records, true): The true parameter makes the operation transactional (all or none). If any record fails, all records will roll back.",
      "B": "insert records: The insert DML statement behaves like Database.insert(records, true) by default and rolls back all records if any error occurs.",
      "C": "insert(records, false): This syntax is invalid in Apex."
    },
    "notes": [
      "Read every result and handle rejected rows. Successful row results are still part of the surrounding transaction; a later uncaught exception or governor-limit failure can roll everything back. Partial success is not an independent commit per row."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Database.insert(records, false) returns per-row SaveResult objects so valid records may succeed even when other rows fail ordinary validation.",
      "references": []
    }
  },
  {
    "id": 202,
    "section": "automation",
    "focus": "familiar",
    "group": "triggers",
    "stem": [
      "Universal Containers wants to ensure that all new leads created in the system have a valid email address. They have already created a validation rule to enforce this requirement, but want to add an additional layer of validation using automation.",
      {
        "ask": "What would be the best solution for this requirement?"
      }
    ],
    "choices": [
      "Submit a REST API Callout with a JSON payload and validate the fields on a third party system",
      "Use a before-save Apex trigger on the Lead object to validate the email address and display an error message if it is invalid",
      "Use a custom Lightning Web component to make a callout to validate the fields on a third party system.",
      "Use an Approval Process to enforce the completion of a valid email address using an outbound message action."
    ],
    "answer": "B",
    "why": "B. Among the listed choices, a before-insert Apex trigger provides additional server-side validation when a Lead is created. It can check the email value and call addError() on an invalid record or field to prevent that record from being saved and return an error.",
    "wrong": {
      "A": "A REST callout introduces an external service that the requirement does not request; a callout alone does not define save-time enforcement for every new Lead.",
      "C": "A custom Lightning web component validates only entry through that component; it does not enforce the additional check for Lead creation through imports or APIs.",
      "D": "An approval process and outbound message do not provide the requested immediate email validation when a new Lead is saved."
    },
    "notes": [
      "“Before-save Apex trigger” here means an Apex before-insert trigger for new Leads; before update can also be used if the same policy must cover edits. Apply checks to every relevant record in Trigger.new and use addError() for invalid values.",
      "The existing validation rule can make a second identical check redundant in a real implementation. However, this question explicitly asks for an additional automated layer, and B is the best supplied implementation. Redundancy alone is not a reason to exclude it from scoring.",
      "This answer covers validation performed within Apex. It does not establish that a mailbox exists or is deliverable. Callouts made from a trigger must run asynchronously; do not copy an online explanation claiming a synchronous before-trigger callout can verify an external mailbox and block that save.",
      "Reference: https://trailhead.salesforce.com/content/learn/modules/apex_triggers/apex_triggers_intro"
    ],
    "source": {
      "stem": [
        "Universal Containers wants to ensure that all new leads created in the system have a valid email address. They have already created a validation rule to enforce this requirement, but want to add an additional layer of validation using automation.",
        {
          "ask": "What would be the best solution for this requirement?"
        }
      ],
      "choices": [
        "Submit a REST API Callout with a JSON payload and validate the fields on a third party system",
        "Use a before-save Apex trigger on the Lead object to validate the email address and display an error message if it is invalid",
        "Use a custom Lightning Web component to make a callout to validate the fields on a third party system.",
        "Use an Approval Process to enforce the completion of a valid email address using an outbound message action."
      ],
      "answer": "B"
    },
    "printed": "B",
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Scoring restored with original key B after reassessing the complete CRT-450 question and Salesforce trigger documentation. The request is for an additional automated validation layer, and a before-insert Lead trigger with addError() is the best listed server-side option. External mailbox verification is not stated and must not be assumed to disqualify B. The original wording, options and key are retained; no Repaired or Corrected badge is needed.",
      "references": [
        "https://trailhead.salesforce.com/content/learn/modules/apex_triggers/apex_triggers_intro",
        "https://www.freecram.net/question/Salesforce.CRT-450.v2025-10-24.q84/universal-containers-wants-to-ensure-that-all-new-leads-created-in-the-system-have-a-valid-email-address",
        "https://www.freecram.com/discussions/Salesforce/exam-crt-450-topic-1-question-64-discussion-p1253727.html"
      ],
      "recovery": {
        "date": "2026-10-17",
        "status": "resolved",
        "queries": [
          "\"valid email address\" \"additional layer of validation\" Salesforce",
          "CRT-450 \"Universal Containers\" \"valid email address\" \"validation rule\""
        ],
        "candidates": [
          "https://www.freecram.net/question/Salesforce.CRT-450.v2025-10-24.q84/universal-containers-wants-to-ensure-that-all-new-leads-created-in-the-system-have-a-valid-email-address",
          "https://www.freecram.com/discussions/Salesforce/exam-crt-450-topic-1-question-64-discussion-p1253727.html"
        ],
        "assessment": "Scoring restored with original key B after reassessing the complete CRT-450 question and Salesforce trigger documentation. The request is for an additional automated validation layer, and a before-insert Lead trigger with addError() is the best listed server-side option. External mailbox verification is not stated and must not be assumed to disqualify B. The original wording, options and key are retained; no Repaired or Corrected badge is needed."
      }
    }
  },
  {
    "id": 203,
    "section": "testing",
    "focus": "familiar",
    "group": "deploy",
    "stem": [
      {
        "ask": "What are three characteristics of change set deployments?"
      },
      {
        "ask": "Choose 3 answers"
      }
    ],
    "choices": [
      "Change sets can deploy custom settings data.",
      "Change sets can only be used between related organizations.",
      "Deployment is done in a one-way, single transaction.",
      "Sending a change set between two orgs requires a deployment connection.",
      "Change sets can be used to transfer records."
    ],
    "answer": "B,C,D",
    "type": "multi",
    "why": "Change sets move metadata between related orgs through an authorized deployment connection, and an inbound deployment applies its changes transactionally.",
    "wrong": {
      "A": "Change sets can deploy custom settings data: Change sets cannot deploy data, including custom settings data. They only move metadata.",
      "E": "Change sets can be used to transfer records: Records (data) are not supported by change sets; they only facilitate metadata migration."
    },
    "notes": [
      "Custom-setting definitions are metadata, but their ordinary data rows are not transported by a change set. Do not confuse custom metadata records with custom-setting records. The upload direction is authorized separately from any reverse deployment connection."
    ],
    "review": {
      "date": "2026-10-17",
      "treatment": "retained",
      "reason": "Change sets move metadata between related orgs through an authorized deployment connection, and an inbound deployment applies its changes transactionally.",
      "references": []
    }
  },
  {
    "id": 204,
    "section": "fundamentals",
    "focus": "low",
    "group": "platform",
    "stem": [
      {
        "ask": "A company's engineering department is conducting a month-long test on the scalability of an in-house-developed software that requires a cluster of 100 or more servers. Which of the following models is the best to use?"
      }
    ],
    "choices": [
      "PaaS",
      "SaaS",
      "BaaS",
      "IaaS"
    ],
    "answer": "D",
    "why": "Infrastructure as a Service supplies on-demand virtual compute/storage/networking suitable for a temporary custom server cluster.",
    "wrong": {
      "A": "While PaaS is excellent for application development and deployment, it abstracts the infrastructure layer, which would limit the engineering team's control over the cluster's configuration.",
      "B": "SaaS delivers fully managed applications, not infrastructure or testing environments. It's irrelevant for this use case.",
      "C": "BaaS is tailored to mobile or web application backend development, providing APIs and pre-built services, not infrastructure for a server cluster."
    },
    "notes": [
      "PaaS abstracts more infrastructure for application development, SaaS provides a finished application, and BaaS provides backend services."
    ],
    "source": {
      "stem": [
        {
          "ask": "A company's engineering department is conducting a month-long test on the scalability of an in-house-developed software that requires a cluster of 100 or more servers. Which of the following models is the best to use?"
        }
      ],
      "choices": [
        "PaaS",
        "SaaS",
        "BaaS",
        "laaS"
      ],
      "answer": "D"
    },
    "printed": "D",
    "repaired": true,
    "repair": "Correct lowercase l in laaS to capital I in IaaS only.",
    "review": {
      "date": "2026-10-17",
      "treatment": "minimal-repair",
      "reason": "Correct lowercase l in laaS to capital I in IaaS only.",
      "references": [],
      "reassessment": {
        "date": "2026-10-17",
        "previousState": "repaired",
        "decision": "retained",
        "reason": "The lowercase-l/capital-I repair preserves the temporary-server-cluster IaaS comparison."
      }
    }
  }
];
