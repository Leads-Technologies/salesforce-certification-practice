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
    ]
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
    ]
  },
  {
    "id": 3,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      "A developer wants to cache results of read-only Apex calls made by a Lightning web component (LWC).",
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
    "why": "Annotate a read-only Apex method @AuraEnabled(cacheable=true) so the LWC framework can cache its result on the client.",
    "wrong": {
      "B": "setStorable() is a valid Aura action API, but this repaired question explicitly concerns LWC.",
      "C": "@AuraEnabled uses cacheable=true. There is no storable=true.",
      "D": "A browser cookie is not how Lightning caches an Apex result."
    },
    "notes": [
      "The method must not mutate data. This annotation is required for Apex @wire and optional for imperative reads. Cache lifetime is platform-controlled; use refreshApex for stale wired Apex data rather than assuming a fixed duration.",
      "Salesforce reference: Client-side caching — https://developer.salesforce.com/docs/platform/lwc/guide/apex-result-caching.html",
      "Question repair: Specify LWC, because Aura setStorable is also a valid caching mechanism."
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
    "repaired": true
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
    ]
  },
  {
    "id": 5,
    "section": "testing",
    "focus": "must",
    "group": "tests",
    "stem": [
      {
        "ask": "Which two coverage conditions apply when deploying Apex to production using RunLocalTests, assuming all tests pass?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "All custom objects must have visibility set to a value other than in Development.",
      "At least 75% of the eligible Apex code must be covered org-wide.",
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
      "Deployment test levels: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_start.html",
      "Question repair: Specify RunLocalTests and org-wide coverage rather than 75% for every individual class."
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
    "repaired": true
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
    ]
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
      "Use the Test menu in Developer Console to run the test classes for the Contact trigger.",
      "Use the Open Execute Anonymous feature on the Developer Console to run an 'insert Contact' DML statement."
    ],
    "answer": "C",
    "why": "Run the trigger’s Apex test classes. Test-created Contacts exercise the trigger, and ordinary test database changes are rolled back afterward.",
    "wrong": {
      "A": "Deploying code does not confirm that the trigger works correctly.",
      "B": "Creating a new Contact directly modifies production data, which is not recommended.",
      "D": "Executing a DML statement in Execute Anonymous directly affects production data and is not a safe testing method."
    },
    "notes": [
      "A meaningful test inserts/updates test Contacts and asserts the expected effects, including bulk and failure cases. Execute Anonymous and the Contacts New button normally commit real records when their transactions succeed.",
      "Question repair: Correct the OCR wording of the test execution choice."
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
    "repaired": true
  },
  {
    "id": 8,
    "section": "testing",
    "focus": "familiar",
    "group": "security",
    "stem": [
      "A developer imports Contact data containing sensitive fields. Users may read the Contact records, but only authorized users may read the sensitive fields.",
      {
        "ask": "What should the developer do to ensure that the data is secure?"
      }
    ],
    "choices": [
      "Use a third-party tool to encrypt the sensitive data before importing it into Salesforce.",
      "Use the Apex Data Loader to import the into and write Apex code to handle security and accesscontrol.",
      "Import the Contacts with Data Import Wizard and configure field-level security for the sensitive fields.",
      "Import the Contacts with Salesforce CLI and grant all users Read permission on Contact, without configuring field permissions."
    ],
    "answer": "C",
    "why": "Configure field-level security so unauthorized users cannot read the sensitive Contact fields; Data Import Wizard is a supported way to load Contacts.",
    "wrong": {
      "A": "Encryption can be useful for other requirements, but encrypting outside Salesforce does not configure user-specific field visibility.",
      "B": "A custom security layer is unnecessary when native field permissions implement this requirement.",
      "D": "Salesforce CLI can import data, but granting object Read without appropriate FLS does not hide sensitive fields."
    },
    "notes": [
      "The import tool does not determine who may read a field after import. Set FLS before granting users access. Salesforce CLI also imports data; the repaired distractor is wrong because object Read permission alone does not restrict individual fields.",
      "Question repair: Distinguish field-level security from object permissions and choose a supported import scenario."
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
    "repaired": true
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
    ]
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
    ]
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
          "                  AccountId = a.Id,",
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
      "The AccountId was restored in the repaired sample so generated Opportunities are actually related to the Accounts. A 179-record input can exceed 100 synchronous SOQL queries and 150 DML statements if work remains per Account. Filter the query by the full Id set and map existing children by AccountId.",
      "Question repair: Restore the missing AccountId so the proposed bulk fix also links Opportunities to their Accounts."
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
    "repaired": true
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
    "answer": "B",
    "why": "Multitenancy provides Salesforce-managed shared computing resources, so each customer need not provision a separate application server fleet.",
    "wrong": {
      "A": "Unit tests are a development practice. They are not the shared compute resource.",
      "C": "Preconfigured big-data storage is not the multi-tenant benefit described here.",
      "D": "Governor limits mean processing power and memory are not unlimited."
    },
    "notes": [
      "Tenant data remains logically isolated while the platform shares infrastructure. Governor limits protect capacity across tenants; managed resources do not mean unlimited CPU, storage, or heap."
    ]
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
    ]
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
    ]
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
      "Account has a roll-up summary field that aggregates Vendor records through this master-detail relationship.",
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
      "Remove the dependent native roll-up summary fields before conversion. Existing Vendor master-detail rows cannot have a null master, and their sharing is controlled by the parent; Public Read/Write on Vendor is not the relevant blocker.",
      "Question repair: Clarify that the roll-up is on Account and summarizes related Vendors."
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
    "repaired": true
  },
  {
    "id": 16,
    "section": "automation",
    "focus": "must",
    "group": "triggers",
    "stem": [
      "An Account before-update Apex trigger increments Count__c by 1. An after-save record-triggered flow runs only when an Account is created and uses Update Records to increment Count__c by 1 on that Account. The flow does not run on updates.",
      {
        "ask": "What is the final Count__c after inserting an Account with Count__c = 0, assuming the transaction succeeds and no other automation exists?"
      }
    ],
    "choices": [
      "4",
      "2",
      "1",
      "3"
    ],
    "answer": "B",
    "why": "The insert does not run a before-update trigger. The create-only after-save flow changes 0 to 1 and issues an update; the before-update trigger changes 1 to 2.",
    "wrong": {
      "A": "4 counts a before-insert trigger that this automation does not have.",
      "C": "1 is only the flow's increment. The before-update trigger runs on the second save and makes 2.",
      "D": "3 does not match the flow increment plus one before-update run."
    },
    "notes": [
      "Final value: 2. The repaired flow runs on creation only, so the update does not re-enter it. The old explanation incorrectly assumed an unconditional create/update flow stops itself. A before-save increment would have a different order and could produce 1.",
      "Question repair: Make flow timing and re-entry explicit; an unconditional after-save update does not stop automatically."
    ],
    "corrected": true,
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
    ]
  },
  {
    "id": 18,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      {
        "ask": "Which three steps implement a static-resource-based custom SVG image in a Lightning web component?"
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
      "An imported module variable is not automatically a template property. For example, import logo from @salesforce/resourceUrl/logo, assign logoUrl = logo in the class, then use an img src binding to logoUrl. Content assets are another supported resource mechanism, but do not implement this specified static-resource sequence.",
      "Question repair: Make the requested static-resource sequence explicit."
    ],
    "corrected": true,
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
    }
  },
  {
    "id": 19,
    "section": "automation",
    "focus": "familiar",
    "group": "language",
    "stem": [
      "A developer must mark each Account in a List<Account> Active or Inactive according to whether its LastModifiedDate is more than 90 days ago.",
      {
        "ask": "Which Apex technique directly expresses this per-record date comparison?"
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
    "repaired": true
  },
  {
    "id": 20,
    "section": "automation",
    "focus": "must",
    "group": "limits",
    "stem": [
      "Consider this Apex method that retrieves selected Lead fields:",
      {
        "code": [
          "public static List<Lead> obtainLeads(Set<Id> leadIds) {",
          "    List<Lead> result = new List<Lead>();",
          "    for (Id leadId : leadIds) {",
          "        result.add([SELECT Id, LastName, Company FROM Lead WHERE Id = :leadId]);",
          "    }",
          "    return result;",
          "}"
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
    "why": "Replace the query per Lead Id with one SOQL query using WHERE Id IN :leadIds.",
    "wrong": {
      "A": "A bind variable is a normal, safe filter.",
      "C": "The defect is the query inside the loop, not a missing LIMIT.",
      "D": "An empty list is a valid result. It is not the bulkification problem."
    },
    "notes": [
      "The repaired sample uses an explicit field list because unbounded FIELDS(ALL) is not supported in Apex. For example, return [SELECT Id, LastName, Company FROM Lead WHERE Id IN :leadIds]; this consumes one query and naturally returns an empty list for no matches.",
      "Salesforce reference: FIELDS support in Apex — https://developer.salesforce.com/docs/platform/salesforce-soql-sosl/guide/sforce-api-calls-soql-select-fields.html",
      "Question repair: Replace unsupported unbounded FIELDS(ALL) in Apex with an explicit field list."
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
    "repaired": true
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
    ]
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
      },
      {
        "ask": "Choose 3 answers"
      }
    ],
    "choices": [
      "Better performance due to client-side rendering",
      "Accessibility support from Lightning base components when used correctly.",
      "Compatibility with all web browsers",
      "Integration with compatible third-party libraries loaded through supported mechanisms."
    ],
    "answer": "A,B,D",
    "type": "multi",
    "why": "Lightning offers client-side rendering, accessible base components, and supported integration with compatible third-party libraries.",
    "wrong": {
      "C": "Lightning components are compatible with modern browsers but not all browsers."
    },
    "notes": [
      "Accessibility support is not a guarantee that every custom component complies: developers must provide labels, keyboard behavior, focus management, and appropriate semantics. Supported browsers and library/security compatibility still matter.",
      "Question repair: Describe accessibility support without promising automatic compliance for custom code."
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
    "repaired": true
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
    ]
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
    ]
  },
  {
    "id": 25,
    "section": "automation",
    "focus": "high",
    "group": "limits",
    "stem": [
      "An Apex service updates a collection of Accounts. The developer needs to inspect ordinary row-level failures while allowing valid rows to succeed, and also be able to undo the logical unit of work if a later business check fails.",
      {
        "ask": "Which two techniques provide these transaction-control capabilities?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Use the @ReadOnly annotation to bypass the number of rows returned by a SOQL.",
      "Use Database.update(records, false) and inspect each Database.SaveResult for partial row success.",
      "Use the Limits class to inspect current CPU time consumption.",
      "Create a Savepoint with Database.setSavepoint() and use Database.rollback(savepoint) when needed."
    ],
    "answer": "B,D",
    "type": "multi",
    "why": "Use Database.update(records, false) for ordinary per-row results, and a Savepoint plus Database.rollback(savepoint) for explicit rollback of the logical unit of work.",
    "wrong": {
      "A": "The @ReadOnly annotation is for read-only operations and would not allow DML operations.",
      "C": "Limits is a valid monitoring class, but reading CPU usage does not provide partial success or explicit rollback."
    },
    "notes": [
      "Neither technique increases governor limits. Inspect SaveResult errors and choose whether business rules allow partial success. Limits.getCpuTime() is valid monitoring, but monitoring alone does not provide either transaction capability requested by the repaired prompt.",
      "Question repair: Correct savepoint API and narrow the question to partial success and explicit rollback.",
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
    "repaired": true
  },
  {
    "id": 26,
    "section": "automation",
    "focus": "familiar",
    "group": "flows",
    "stem": [
      "Lead Settings is configured to enforce validation and triggers during lead conversion. Sales management requires LeadSource to be populated when converting a Lead.",
      {
        "ask": "Which declarative tool should require the user to supply LeadSource before conversion succeeds?"
      }
    ],
    "choices": [
      "Create an after trigger on Lead.",
      "Use Lead Conversion field mapping.",
      "Use a formula field.",
      "Use a validation rule."
    ],
    "answer": "D",
    "why": "With conversion validation enabled, a Lead validation rule can return an error when IsConverted is true and LeadSource is blank.",
    "wrong": {
      "A": "An after trigger can use addError to reject conversion, but is Apex rather than the requested declarative approach.",
      "B": "Lead conversion field mapping copies values. It does not require the field.",
      "C": "A formula cannot block the conversion."
    },
    "notes": [
      "A suitable formula is AND(IsConverted, ISBLANK(TEXT(LeadSource))). Field mapping only copies existing values. An after trigger can also reject DML by calling addError, so the repaired prompt specifically asks for the declarative solution.",
      "Question repair: Specify declarative enforcement and enabled conversion validation; after triggers can also add errors."
    ],
    "corrected": true,
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
    ]
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
    ]
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
      "Bulk API can import large data volumes without bypassing the development environment’s storage limits.",
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
      "Bulk processing changes how work is submitted, not the org’s capacity entitlement. Data Import Wizard is browser-based. Choose sandbox type based on configuration, storage, and test-data needs rather than assuming every sandbox copies production data.",
      "Question repair: Correct Bulk APL to Bulk API."
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
    "repaired": true
  },
  {
    "id": 30,
    "section": "automation",
    "focus": "familiar",
    "group": "flows",
    "stem": [
      "A Case before-save record-triggered flow must populate Support_Representative_Name__c, a custom text field, based on Case.Origin. The requirement is to set that field; it does not change Case ownership.",
      {
        "ask": "Which flow element sets the field value after the appropriate branch has been selected?"
      }
    ],
    "choices": [
      "Use a trigger on the Case object.",
      "Use a formula field on the Case object.",
      "Use a validation rule on the Case object.",
      "Use an Assignment element to set $Record.Support_Representative_Name__c."
    ],
    "answer": "D",
    "why": "An Assignment element writes the chosen representative name into $Record.Support_Representative_Name__c in this before-save flow.",
    "wrong": {
      "A": "Using a trigger is a programmatic approach and less ideal when declarative tools can solve the problem.",
      "B": "A formula field cannot assign values; it only calculates and displays results.",
      "C": "Validation rules are used to enforce constraints, not for assigning values."
    },
    "notes": [
      "The before-save flow saves that field with the original Case save. Case Assignment Rules are the usual tool for ownership routing, which is a different requirement; an Assignment element alone is not a complete routing mechanism.",
      "Question repair: Separate assignment of a text value from ownership routing, and put Assignment inside a before-save flow."
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
    "repaired": true
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
    ]
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
      "sendEvent()",
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
    "repaired": true
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
        "code": "<apex:message for=\"info\" />"
      },
      {
        "code": "<apex:pageMessages />"
      },
      {
        "code": "<apex:pageMessage summary=\"Information\" severity=\"info\" />"
      },
      {
        "code": "<apex:facet name=\"messages\">Information</apex:facet>"
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
    "repaired": true
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
    ]
  },
  {
    "id": 35,
    "section": "automation",
    "focus": "must",
    "group": "queries",
    "stem": [
      {
        "ask": "Which valid SOSL statement searches the searchable name fields of Leads, Accounts, and Contacts for Universal Containers, including Lead.Company and Contact.AccountName, and returns Id and Name?"
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
      "B": "This is one SOQL query over Lead, Account, and Contact. SOQL cannot query those objects together.",
      "D": "This is SOQL written with SOSL-style parentheses. SOQL cannot return Lead, Account, and Contact from one query.",
      "A": "IN CompanyName FIELDS is invalid SOSL; NAME FIELDS is the supported scope that includes the relevant standard company/name fields."
    },
    "notes": [
      "CompanyName is not a valid SOSL search group. SOSL is indexed text search, not an exact relational join or a promise to return every matching record without its result limits. For exact company equality, design object-specific SOQL queries and relationships instead.",
      "Salesforce reference: Valid SOSL search groups and standard name fields — https://developer.salesforce.com/docs/platform/salesforce-soql-sosl/guide/sforce-api-calls-sosl-in.html",
      "Question repair: IN CompanyName FIELDS is invalid; IN NAME FIELDS also searches Lead.Company and Contact.AccountName."
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
    "corrected": true,
    "printed": "A"
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
    ]
  },
  {
    "id": 37,
    "section": "automation",
    "focus": "high",
    "group": "security",
    "stem": [
      "A developer must write an Apex method that will be called from a Lightning component. The method may delete an Account stored in the accountRec variable.",
      {
        "ask": "Which Describe API expression checks whether the running user has object-level Delete permission on Account? Record access is checked separately."
      }
    ],
    "choices": [
      {
        "code": [
          "accountRec.isDeletable()"
        ]
      },
      {
        "code": [
          "Schema.sObjectType.Account.isDeletable()"
        ]
      },
      {
        "code": [
          "accountRec.sObjectType.isDeletable()"
        ]
      },
      {
        "code": [
          "Account.isDeleteable"
        ]
      }
    ],
    "answer": "B",
    "why": "Schema.sObjectType.Account.isDeletable() checks the running user’s object-level Delete permission on Account.",
    "wrong": {
      "A": "accountRec.isDeletable() is not a valid method.",
      "C": "Incorrect syntax for checking permissions.",
      "D": "Account.isDeletable does not exist."
    },
    "notes": [
      "This Boolean check does not itself authorize deletion of a particular Account or perform the DML. Enforce the record-level access and actual operation’s security as well. User-mode DML is another enforcement mechanism in current Apex.",
      "Question repair: Restore executable Describe API syntax and specify that the question asks for the object Delete permission check."
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
    "repaired": true
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
    ]
  },
  {
    "id": 39,
    "section": "automation",
    "focus": "high",
    "group": "queries",
    "stem": [
      "Given the following Apex statement:",
      {
        "code": [
          "Account myAccount = [SELECT Id, Name FROM Account];"
        ]
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
      "Zero rows also throws for single-sObject assignment. Query into List<Account> when zero/many results are expected; use LIMIT 1 only when choosing one row is intentional and its ordering is defined.",
      "Question repair: Fix malformed SOQL closing bracket so the question tests result cardinality."
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
    "repaired": true
  },
  {
    "id": 40,
    "section": "testing",
    "focus": "familiar",
    "group": "tests",
    "stem": [
      "A developer at AW Computing is tasked to create the supporting test class for a programmatic customization that leverages records stored within the custom object, Pricing_Structure__c. AW Computing has a complex pricing structure for each item on the store, spanning more than 500 records.",
      {
        "ask": "Which two approaches can provide Pricing_Structure__c records while keeping the tests independent of existing org data?"
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
    "answer": "A,C",
    "type": "multi",
    "why": "A test data factory can insert deterministic pricing rows, and Test.loadData can insert them from a CSV static resource without depending on org data.",
    "wrong": {
      "D": "without sharing changes record-sharing behavior; it neither creates test data nor disables test data isolation.",
      "B": "SeeAllData=true depends on the destination org’s records, so it fails the requested test isolation."
    },
    "notes": [
      "SeeAllData=true technically exposes existing records but violates the repaired isolation requirement and cannot guarantee those rows exist in another environment. More than 500 rows is a valid use case for either factory creation or a CSV fixture.",
      "Question repair: Require isolated test data; Test.loadData is valid, while SeeAllData depends on org records."
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
    "corrected": true,
    "printed": "A,B"
  },
  {
    "id": 41,
    "section": "fundamentals",
    "focus": "must",
    "group": "platform",
    "stem": [
      "A developer wants to organize an application into three responsibilities: the data model, its presentation, and the logic controlling requests and interactions.",
      {
        "ask": "Which architecture names these three responsibilities?"
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
    "repaired": true
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
    "corrected": true,
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
      "The record is not created; a failed SaveResult is returned and no DmlException is thrown for the missing Name.",
      "The record will be created and no error will be reported.",
      "The record will be created and a message will be in the debug log."
    ],
    "answer": "B",
    "why": "The Account is missing Name. Database.insert(a, false) returns an unsuccessful Database.SaveResult for that row instead of throwing a DmlException for the required-field error.",
    "wrong": {
      "A": "For this ordinary missing-Name row error, allOrNone=false returns an unsuccessful SaveResult instead of the DmlException described by this option. It does not suppress every possible exception.",
      "C": "Name is required, so the row is not saved.",
      "D": "No Account is created because the required Name is missing; this says nothing about whether the platform creates execution logs."
    },
    "notes": [
      "The error exists in SaveResult.getErrors even if this code ignores it. Check isSuccess before using getId. Partial-success DML does not suppress uncatchable governor failures or guarantee that a surrounding transaction ultimately commits.",
      "Salesforce reference: Partial DML and external-ID upsert — https://trailhead.salesforce.com/content/learn/modules/apex_database/apex_database_dml",
      "Question repair: State that row errors are returned in SaveResult; do not imply the platform reports no error at all."
    ],
    "corrected": true,
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
    }
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
    ]
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
      "An External ID field is indexed and can improve selective SOQL query performance."
    ],
    "answer": "A,D",
    "type": "multi",
    "why": "External ID fields store integration keys and receive indexes that can help selective matching and SOQL filters.",
    "wrong": {
      "B": "External IDs cannot be formula fields. Only text, number, email and auto-number fields can be set as External IDs.",
      "C": "While External IDs are useful for integrations, they do not make external data visible within Salesforce Mobile."
    },
    "notes": [
      "Indexing is not a guarantee that every filter uses the index. Uniqueness must be configured separately where required. Formula fields are not eligible External ID fields, and an External ID flag does not itself surface external data in mobile.",
      "Question repair: Correct External ID and SOQL spelling in the indexed-field choice."
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
    "repaired": true
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
    ]
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
    ]
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
      "Loading independent sets of scripts in parallel using separate ltng:require tags.",
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
      "Salesforce reference: Aura library loading — https://developer.salesforce.com/docs/platform/lightning-component-reference/guide/ltng-require.html",
      "Question repair: Aura supports parallel sets of scripts but does not load third-party scripts directly from external hosts."
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
    "corrected": true,
    "printed": "A,D,E"
  },
  {
    "id": 49,
    "section": "testing",
    "focus": "familiar",
    "group": "tests",
    "stem": [
      {
        "ask": "After running all tests in Developer Console, where can a developer view the overall coverage percentage for each class within that console?"
      }
    ],
    "choices": [
      "View the code coverage percentage for the class using the Overall Code Coverage panel in the Developer Console Tests tab.",
      "View the Class Test Percentage tab on the Apex Class list view in Salesforce Setup.",
      "Select and run the class on the Apex Test Execution page in the Developer Console.",
      "View the Code Coverage column in the list view an the Apex Classes page."
    ],
    "answer": "A",
    "why": "The Tests tab’s Overall Code Coverage panel in Developer Console lists coverage for each class and trigger.",
    "wrong": {
      "B": "The Apex Class list view does not show the Overall Code Coverage panel.",
      "C": "The Apex Test Execution page is not where that class coverage panel lives.",
      "D": "The repaired prompt asks specifically for the Developer Console view, not a Setup Apex Classes list view."
    },
    "notes": [
      "Coverage depends on the executed tests and current stored coverage; rerun relevant tests after code changes. Coverage percentage shows exercised lines rather than correctness, so retain meaningful assertions.",
      "Question repair: Specify the Developer Console panel so alternative coverage views do not make the question ambiguous."
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
    "repaired": true
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
    ]
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
    ]
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
    ]
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
    "printed": "A"
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
      "Custom List Controller with recordSetVar page attribute",
      "Controller extension and an <apex:listButton> tag",
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
    "repaired": true
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
    "corrected": true,
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
    ]
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
      "Write a class that implements HttpCalloutMock.",
      "Write a class that extends WebServiceMock.",
      "Write a class that implements WebServiceMock.",
      "Write a class that extends HttpCalloutMock."
    ],
    "answer": "A",
    "why": "Implement HttpCalloutMock and register the instance with Test.setMock(HttpCalloutMock.class, mockInstance) before exercising the HTTP callout.",
    "wrong": {
      "B": "WebServiceMock is a SOAP mock interface to implement, not a superclass to extend for an HTTP callout.",
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
    "repaired": true
  },
  {
    "id": 58,
    "section": "automation",
    "focus": "familiar",
    "group": "security",
    "stem": [
      "A junction object has two master-detail relationships. The primary relationship Sharing Setting requires Read/Write access on its master. The secondary relationship allows junction edits with Read access on its master, and the user already has that Read access.",
      {
        "ask": "Which two additional permissions/access levels are required to update the junction record?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Read/Write access on the secondary relationship",
      "Read/Write access on the primary relationship",
      "Read and Edit object permissions on the junction object.",
      "Read access on the primary relationship"
    ],
    "answer": "B,C",
    "type": "multi",
    "why": "Given the stated relationship sharing settings and existing secondary-master access, the user still needs Read/Write on the primary master and Read/Edit object permissions on the junction.",
    "wrong": {
      "A": "Write access on the secondary master is not the access this update requires.",
      "D": "Read access on the primary master is not enough to update the junction."
    },
    "notes": [
      "Junction record access derives from both masters and both relationship Sharing Setting values. Primary-master status does not generally eliminate the secondary master’s access requirement. The prompt now states those conditions instead of claiming a universal primary-only rule.",
      "Salesforce reference: Junction sharing and relationships — https://help.salesforce.com/s/articleView?id=platform.relationships_considerations.htm&language=en_US&type=5",
      "Question repair: Junction access depends on both masters and both relationship sharing settings."
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
    "repaired": true
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
    ]
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
    ]
  },
  {
    "id": 61,
    "section": "automation",
    "focus": "high",
    "group": "triggers",
    "stem": [
      {
        "ask": "Which two operations can initiate an additional record-save cycle and invoke the affected records' Apex triggers?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Recalculating criteria-based record shares without updating business records",
      "Sending an email notification without saving an EmailMessage or updating business records",
      "Recalculating a roll-up summary and saving the affected parent",
      "An after-save record-triggered flow that updates records"
    ],
    "answer": "C,D",
    "type": "multi",
    "why": "A roll-up change can save a parent record, and after-save flow DML can cause another record-save cycle; either can invoke triggers.",
    "wrong": {
      "A": "Sharing recalculation alone does not save the business record again.",
      "B": "Sending this notification alone does not initiate an additional business-record save. Explicit EmailMessage DML would be a different operation."
    },
    "notes": [
      "A trigger can run multiple times in one transaction. Compare old and new values and make processing idempotent. Sending an email or recalculating a sharing rule does not by itself save the business record again."
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
    "repaired": true
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
    ]
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
    ]
  },
  {
    "id": 64,
    "section": "automation",
    "focus": "high",
    "group": "limits",
    "stem": [
      "Assume doWork is called with new Account(Name = 'Example'), no other automation fails, and the caller does not catch the resulting exception.",
      {
        "ask": "How many Accounts remain inserted after this transaction finishes?"
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
    "why": "The first insert assigns an Id to acct. The second insert reuses the same sObject with that Id and throws; because the exception escapes the transaction, the first insert is rolled back and zero Accounts remain.",
    "wrong": {
      "A": "200 rows never commit. The second insert fails and the transaction rolls back.",
      "B": "The first insert is rolled back with the failed second insert.",
      "C": "201 is the number of attempts, not the number of saved accounts."
    },
    "notes": [
      "The loop would have 201 iterations if it completed, but it does not reach the DML statement limit in this scenario. Catching the DmlException in an outer caller would change the transaction outcome, which is why the repaired prompt explicitly excludes that case.",
      "Question repair: Supply a valid unsaved Account and state uncaught transaction rollback; restore original choice labels in the source snapshot."
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
    "repaired": true
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
    ]
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
    "printed": "A"
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
    "corrected": true,
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
    }
  },
  {
    "id": 68,
    "section": "automation",
    "focus": "high",
    "group": "integration",
    "stem": [
      "Candidate__c has a Unique custom field PrimaryId__c containing each candidate’s identifier. A CSV contains new values for existing candidates and includes PrimaryId__c for matching.",
      {
        "ask": "Which field configuration lets the upload/upsert match candidates by this identifier?"
      }
    ],
    "choices": [
      "Upload the CSV into-a custom object related to candidate__c.",
      "Create a before insert trigger to correctly map the records,",
      "Mark PrimaryId__c as an External ID and configure the upload to match on that field.",
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
      "Unique prevents duplicate key values; External ID supplies an integration matching key. Keep its normalization/case-sensitivity consistent with the source. A trigger is unnecessary for the matching operation when the import tool already supports external IDs.",
      "Question repair: Normalize the candidate identifier API name throughout the scenario."
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
    "repaired": true
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
    ]
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
    ]
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
    ]
  },
  {
    "id": 72,
    "section": "automation",
    "focus": "familiar",
    "group": "triggers",
    "stem": [
      "A developer needs to prevent the creation of Request__c records when certain conditions exist in the system. A RequestLogic class exists that checks the conditions. Assume validateRecords accepts List<Request__c> and calls addError() on invalid records. The source contains duplicate choices A and B; select either one.",
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
    "acceptAny": true,
    "why": "A and B perform the same call because Apex identifiers are case-insensitive. Either single selection is accepted for the duplicated source choices.",
    "wrong": {
      "C": "Request__c is an sObject type rather than the record collection expected here, and Request is not a defined trigger record.",
      "D": "After-insert addError can reject the insert, but this option still has invalid record references and does not call the stated validator correctly."
    },
    "notes": [
      "The assumed validateRecords method must call addError on invalid Trigger.new records. Both before and after triggers can reject their triggering DML with addError before commit; the source’s claim that after triggers cannot block inserts was wrong. C/D also misuse a type name and an undefined Request reference.",
      "Question repair: Mark the duplicate case-insensitive choices explicitly; retain either single selection as accepted."
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
    "repaired": true
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
    "printed": "D"
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
      "A before-delete record-triggered flow that checks Status__c and uses a Custom Error element.",
      "A before-delete Apex trigger that calls addError() on records whose Status__c is not Decommissioned.",
      "An after-save record-triggered flow that runs on create or update.",
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
      "Question repair: Validation rules do not run on delete; a before-delete flow with Custom Error can block deletion."
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
    "corrected": true,
    "printed": "B,D"
  },
  {
    "id": 75,
    "section": "testing",
    "focus": "familiar",
    "group": "debug",
    "stem": [
      "A developer can reproduce a duplicate-record Apex trigger issue in a sandbox with Apex Interactive Debugger access configured.",
      {
        "ask": "Which option lets the developer set breakpoints and inspect variables while stepping through that transaction?"
      }
    ],
    "choices": [
      "Review the Historical Event logs to identify the source of the issue.",
      "Add system.debug statements to the code to track the execution flow and identify the issue.",
      "Use the Apex Interactive Debugger to step through the code and identify the issue.",
      "Disable the trigger in production and test to see if the issue still occurs."
    ],
    "answer": "C",
    "why": "Apex Interactive Debugger provides breakpoints, stepping, and variable inspection for the configured sandbox transaction.",
    "wrong": {
      "A": "Historical event logs are not specific enough for debugging triggers.",
      "B": "System.debug is useful for log-based investigation, but does not provide the live stepping requested in the repaired prompt.",
      "D": "Disabling the trigger disrupts the system and prevents further testing."
    },
    "notes": [
      "Debug logs with System.debug can also diagnose duplication; they are not inherently inferior or invalid. The repaired question specifically requests live stepping, and states that debugger access has been provisioned.",
      "Question repair: Make interactive debugging a specified sandbox capability, not universally more efficient than logs."
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
    "repaired": true
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
      "lightning-flow",
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
    "repaired": true
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
    ]
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
      "Use Database.insert(tasks, false), setting allOrNone to false, and inspect the returned SaveResult values.",
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
      "Inspect and record every failed result so the integration does not silently lose follow-up Tasks. Later uncaught exceptions or governor failures can still roll back the encompassing Lead transaction. A catch around an all-or-none insert cannot turn it into partial row success.",
      "Question repair: Correct allOrNone parameter spelling."
    ],
    "corrected": true,
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
      "Single-record assignment requires exactly one result. Other aggregates are exposed through AggregateResult rows and have function-specific value types; do not claim every aggregate returns Decimal. This question concerns the direct SOQL expression shape rather than every field value a query can contain.",
      "Question repair: Remove OCR artifacts from type names."
    ],
    "corrected": true,
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
    }
  },
  {
    "id": 80,
    "section": "automation",
    "focus": "high",
    "group": "integration",
    "stem": [
      "A business has a proprietary Order Management System (OMS) that creates orders from its website and fulfills the orders. When the order is created in the OMS, an integration also creates an order record in Salesforce and relates it to the contact as identified by the email on the order. As the order goes through different stages in the OMS, the integration also updates it in Salesforce.",
      "The business notices that each update from the OMS creates a new order record in Salesforce.",
      {
        "ask": "Which two actions should prevent the duplicate order records from being created in Salesforce?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Store the OMS order number in an External ID field and configure the integration to upsert using that field.",
      "Ensure that the order number in the OMS is unique.",
      "Use the email on the contact record as an external ID.",
      "Write a trigger on the Order object to delete the duplicates."
    ],
    "answer": "A,B",
    "type": "multi",
    "why": "Use the stable OMS order number as the Salesforce external-ID matching field for upsert, and ensure that key uniquely identifies an order in the source.",
    "wrong": {
      "C": "Email on the contact is unrelated to the uniqueness of order records.",
      "D": "Deleting duplicates with triggers is reactive and not a best practice."
    },
    "notes": [
      "An integration that always inserts still creates duplicates even if a field is marked External ID. Configure matching explicitly and consider Salesforce Unique as well. Contact email identifies a customer imperfectly and cannot identify multiple different orders from that customer.",
      "Question repair: State that the integration upserts against the external ID; an External ID flag alone does not turn inserts into updates."
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
    "repaired": true
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
      "Use Test.loadData to insert the CSV static-resource data in the test."
    ],
    "answer": "C,D",
    "type": "multi",
    "why": "Prepare a CSV static resource with 200 unique Accounts and load it in the test with Test.loadData(Account.sObjectType, resourceName).",
    "wrong": {
      "A": "Using @isTest(seeAllData=true) violates test isolation principles and is discouraged.",
      "B": "@isTest(isParallel=true) is used for parallel execution, not for creating test data."
    },
    "notes": [
      "Assert the bulk trigger’s outcomes and that every input was processed. SeeAllData exposes existing data without creating the required fixture. isParallel affects scheduling, not the record values generated for a test.",
      "Question repair: Restore valid Test.loadData spelling."
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
    "repaired": true
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
    "printed": "B"
  },
  {
    "id": 83,
    "section": "testing",
    "focus": "familiar",
    "group": "deploy",
    "stem": [
      "Developers at Universal Containers (UC) use version control to share their code changes, but they notice that when they deploy their code to different environments they often have failures. They decide to set up Continuous Integration (CI).",
      {
        "ask": "Which current Salesforce command-line tool should the team invoke from its CI runner to execute Apex tests automatically?"
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
    "repaired": true
  },
  {
    "id": 84,
    "section": "testing",
    "focus": "familiar",
    "group": "tests",
    "stem": [
      {
        "ask": "Which operation is supported in a standard isolated Apex unit test, without contacting a live external service?"
      }
    ],
    "choices": [
      "Execute anonymous Apex as a different user.",
      "Generate a Visualforce PDF by calling PageReference.getContentAsPDF().",
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
      "Create the record first and set a suitable past Datetime. Standard isolated unit tests mock HTTP responses rather than load live remote data; getContent/getContentAsPDF are not supported test operations. System.runAs is the test user-context mechanism, not Execute Anonymous.",
      "Question repair: Clarify normal isolated unit tests and correct malformed method spelling."
    ],
    "corrected": true,
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
    ]
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
    ]
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
      "@RestResource(urlMapping='/myService/*')",
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
      "Question repair: Restore valid REST annotation spelling.",
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
    "repaired": true
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
    ]
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
    ]
  },
  {
    "id": 90,
    "section": "automation",
    "focus": "must",
    "group": "security",
    "stem": [
      "An Account search written in Apex returns records that the user cannot access through the standard Salesforce UI. The Account organization-wide default is Private. The developer wants an explicit class declaration enforcing the running user's record sharing.",
      {
        "ask": "Which declaration should the search class use?"
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
    "repaired": true
  },
  {
    "id": 91,
    "section": "automation",
    "focus": "must",
    "group": "triggers",
    "stem": [
      "A developer created a trigger on a custom object. This custom object also has some dependent pick lists.",
      {
        "ask": "After the request reaches Salesforce, which listed step happens first in the server-side order of execution?"
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
      "It then loads the submitted new field values and performs the relevant initial system checks. Browser JavaScript validation occurs on the client before the server request, not as a later server save step. The source’s four-step ordering mixed those contexts.",
      "Question repair: Specify the server-side order of execution; browser validation can precede a server request."
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
    "repaired": true
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
      "Updating the body of an editable FeedItem through a supported DML operation.",
      "Explicitly deleting a record through a supported Apex DML operation.",
      "Renaming or replacing a picklist entry"
    ],
    "answer": "B,C",
    "type": "multi",
    "why": "Supported FeedItem body updates and explicit record-delete DML invoke applicable triggers.",
    "wrong": {
      "A": "Changing a user's default division does not fire triggers.",
      "D": "Renaming or replacing a picklist entry does not fire triggers."
    },
    "notes": [
      "Cascade-deleting child rows does not invoke those children’s delete triggers; only the record that initiates deletion is evaluated. FeedItem LikeCount counter changes are another exception. The C choice was repaired because the source incorrectly said cascading deletes fire child triggers.",
      "Question repair: Replace cascade-delete misconception with an explicit record deletion."
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
    "repaired": true
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
    ]
  },
  {
    "id": 94,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      {
        "ask": "Which option identifies the ready-made UI building blocks supplied by the Lightning Component framework?"
      }
    ],
    "choices": [
      "Support for Classic and Lightning UIs",
      "Prebuilt components that can be reused",
      "Templates to create custom components",
      "Extended governor limits for applications"
    ],
    "answer": "B",
    "why": "The Lightning framework supplies reusable base components for forms, layouts, navigation, and other UI building blocks.",
    "wrong": {
      "A": "Classic/Lightning integration contexts do not identify the ready-made UI building blocks requested here.",
      "C": "Templates/scaffolding can help author custom code, but the listed ready-made building blocks are prebuilt reusable components.",
      "D": "Extended governor limits are not provided by the framework."
    },
    "notes": [
      "Lightning components can also be embedded in Visualforce/Classic through supported integration paths, and development tools generate component templates. Those facts do not change this question’s request for ready-made component building blocks.",
      "Question repair: Narrow to reusable UI building blocks; Lightning can also be embedded in Classic through Visualforce."
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
    "repaired": true
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
    "corrected": true,
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
    }
  },
  {
    "id": 96,
    "section": "automation",
    "focus": "high",
    "group": "model",
    "stem": [
      "A custom order management app uses Order__c and Order_Item__c. Order_Item__c has a custom master-detail field to Order__c. An Apex service must move an existing line to a different order.",
      {
        "ask": "Which relationship-field setting permits this change of master?"
      }
    ],
    "choices": [
      "Add without sharing to the Apex class declaration.",
      "Change the master-detail relationship to an external lookup relationship.",
      "Create a junction object between OrderItem and Order.",
      "Select Allow reparenting on the custom master-detail relationship."
    ],
    "answer": "D",
    "why": "Enable Allow reparenting on the custom Order_Item__c master-detail field to let an existing detail reference a different Order__c master.",
    "wrong": {
      "A": "Add without sharing to the Apex class declaration: Adding without sharing modifies sharing rules but does not affect the ability to reparent child records. This is unrelated to the issue described.",
      "B": "Change the master-detail relationship to an external lookup relationship: Changing the relationship type is not necessary. Additionally, doing so could introduce unintended side effects, as master-detail relationships have features like roll-up summaries that are lost with a lookup relationship.",
      "C": "Create a junction object between OrderItem and Order: Introducing a junction object is not required. This adds unnecessary complexity and deviates from the intended use of master-detail relationships."
    },
    "notes": [
      "Reparenting changes inherited access and roll-up totals. The repaired question explicitly uses custom objects because a standard OrderItem relationship is not an arbitrary custom master-detail field whose configuration can be edited.",
      "Question repair: Use custom objects for configurable master-detail reparenting."
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
    "repaired": true
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
    ]
  },
  {
    "id": 98,
    "section": "fundamentals",
    "focus": "must",
    "group": "queries",
    "stem": [
      "Trainer__c has a lookup to Gym__c whose child relationship name is Trainers.",
      {
        "ask": "Which SOQL query retrieves the Gym named Viridian City Gym and its Trainer children?"
      }
    ],
    "choices": [
      {
        "code": [
          "SELECT Id FROM Trainer__c WHERE Gym__r.Name = 'Viridian City Gym'"
        ]
      },
      {
        "code": [
          "SELECT Id, (SELECT Id FROM Trainer__c FROM Gym__c WHERE Name = 'Viridian City Gym'"
        ]
      },
      {
        "code": [
          "SELECT Id, (SELECT Id FROM Trainers__r) FROM Gym__c WHERE Name = 'Viridian City Gym'"
        ]
      },
      {
        "code": [
          "SELECT Id, (SELECT Id FROM Trainers__c) FROM Gym__c WHERE Name = 'Viridian City Gym'"
        ]
      }
    ],
    "answer": "C",
    "why": "Query Gym__c as the outer object and use its configured Trainers__r child relationship in the nested SELECT.",
    "wrong": {
      "A": "Gym__r walks up to the parent. This query needs the child Trainers from the Gym.",
      "B": "The subquery is not closed, and the second FROM is invalid.",
      "D": "Trainers__c is not the configured child relationship name. The child object is Trainer__c, and this parent-to-child subquery must use Trainers__r."
    },
    "notes": [
      "Custom parent traversal uses the lookup’s __r path, while a parent-to-child subquery uses the configured child relationship name. That name is not reliably guessed from the child object; this repaired question states it explicitly.",
      "Question repair: Restore valid object/relationship API names and state the configured child relationship name."
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
    "repaired": true
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
    ]
  },
  {
    "id": 100,
    "section": "ui",
    "focus": "high",
    "group": "visualforce",
    "stem": [
      "A Visualforce page stores and renders every Container__c rented by an Account. It exceeds view state limits for Accounts with 8,000 containers. The filtered result set will never exceed 10,000 records.",
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
    "answer": "B",
    "why": "StandardSetController paginates this result set within its 10,000-record ceiling, reducing the number of records stored/rendered in view state for each page.",
    "wrong": {
      "A": "OffsetController is not a Salesforce pagination class.",
      "C": "SOQL OFFSET is a poor way to page a large Visualforce table.",
      "D": "A transient list does not give set-controller pagination."
    },
    "notes": [
      "The original more-than-10,000 scenario exceeded that controller’s ceiling, so the repaired prompt uses 8,000 with an explicit maximum. Larger collections need a different paging architecture. OFFSET itself has a 2,000-row skip limit; transient alone does not provide pagination.",
      "Salesforce reference: Standard list controller record ceiling — https://developer.salesforce.com/docs/platform/salesforce-pages-developers-guide/guide/pages-controller-sosc-access-data.html",
      "Question repair: Keep the example within the 10,000-record StandardSetController ceiling."
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
    "repaired": true
  },
  {
    "id": 101,
    "section": "testing",
    "focus": "high",
    "group": "deploy",
    "stem": [
      {
        "ask": "Which two statements describe production Apex coverage requirements when deploying with RunLocalTests, assuming all tests pass?"
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
      "Tests must pass as well. Assertions are essential to useful tests but no particular System.assert call count is the deployment gate. RunSpecifiedTests has different per-deployed-component coverage rules, so the test level is now explicit.",
      "Deployment test levels: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_start.html",
      "Question repair: Specify the coverage rules for RunLocalTests."
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
    "repaired": true
  },
  {
    "id": 102,
    "section": "automation",
    "focus": "must",
    "group": "security",
    "stem": [
      {
        "ask": "In the following example, which sharing context will myMethod execute when it is invoked?"
      },
      {
        "code": [
          "public class myClass {",
          "      public void myMethod() {",
          "          /* implementation */",
          "      }",
          "  }"
        ]
      }
    ],
    "choices": [
      "Sharing rules will be enforced by the instantiating class.",
      "Sharing rules will be enforced for the running user.",
      "Sharing rules will not be enforced for the running user.",
      "Sharing rules will be inherited from the calling context."
    ],
    "answer": "",
    "why": "Not scored. The source does not specify the class API version or entry/caller context. In API 67.0+, an omitted sharing declaration defaults to with sharing (B). In API 66.0 and earlier, omission can inherit the caller; an unqualified entry point can run without sharing. Those different contexts make the original question incomplete.",
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
        },
        {
          "code": [
            "public class myClass {",
            "      public void myMethod() {",
            "          /* implementation */",
            "      }",
            "  }"
          ]
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
    "ungraded": true
  },
  {
    "id": 103,
    "section": "testing",
    "focus": "familiar",
    "group": "deploy",
    "stem": [
      "Universal Containers has custom Apex and Lightning components in a sandbox related to its production org.",
      {
        "ask": "Which option provides a point-and-click metadata deployment to production without local deployment scripts?"
      }
    ],
    "choices": [
      "Use the Force.com IDE to deploy the Apex code and Lightning Components.",
      "Use the Ant Migration Tool to deploy the Apex code and Lightning Components.",
      "Use a change set to deploy the Apex code and Lightning Components.",
      "Use Salesforce CLI to deploy the Apex code and Lightning Components."
    ],
    "answer": "C",
    "why": "A change set provides the requested point-and-click metadata transfer between a production org and its related sandbox.",
    "wrong": {
      "A": "The Force.com IDE is deprecated.",
      "B": "Ant can script legacy deployment but is retired and is not this point-and-click workflow.",
      "D": "Salesforce CLI is a supported deployment tool, but this repaired requirement explicitly asks for point-and-click deployment without local scripts."
    },
    "notes": [
      "Authorize the deployment connection, include dependent components, upload, then validate/deploy the inbound change set. Salesforce CLI is also supported and is preferred for many source-controlled pipelines; the repaired prompt does not claim change sets are universally the best deployment method.",
      "Question repair: Specify a point-and-click related-org deployment; CLI is also a supported deployment choice."
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
    "repaired": true
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
    "printed": "D"
  },
  {
    "id": 105,
    "section": "automation",
    "focus": "high",
    "group": "flows",
    "stem": [
      "The choices compare declarations/signatures. Method implementations and required return statements are omitted; assume referenced wrapper and sObject types exist.",
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
    "corrected": true,
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
    ]
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
          "public static void updateAccounts(List<Account> theseAccounts) {",
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
      "Upsert changes matching behavior rather than providing exception handling. If partial row success is a requirement, Database.update(records, false) plus SaveResult inspection is another design; the question asks how to handle the thrown exception. Do not silently swallow it."
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
    "repaired": true
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
    ]
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
    ]
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
          "public class CustomerOrder {",
          "    // Implementation omitted.",
          "}"
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
      "This is a duplicate of the preceding inheritance pattern. A virtual method can be overridden with override; implementing an interface uses implements. The duplicate is retained to preserve original mock numbering."
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
    "repaired": true
  },
  {
    "id": 111,
    "section": "testing",
    "focus": "high",
    "group": "async",
    "stem": [
      {
        "ask": "Which two locations can provide execution/status information for both batch Apex and future-method jobs?"
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
    "answer": "A,B",
    "type": "multi",
    "why": "Apex Jobs reports asynchronous job status, and Developer Console can provide logs or query AsyncApexJob through its Query Editor.",
    "wrong": {
      "C": "Only used for paused flows, not batch or future jobs.",
      "D": "Flex Queue applies to held batch jobs, not the future-method status required for both job types."
    },
    "notes": [
      "The Flex Queue is specifically for held Batch Apex jobs and their ordering; it does not provide the equivalent future-method view. A log gives execution details, while AsyncApexJob/Apex Jobs are the appropriate status sources.",
      "Question repair: Require locations that provide information about both batch and future jobs."
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
    "repaired": true
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
    "corrected": true,
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
    }
  },
  {
    "id": 113,
    "section": "ui",
    "focus": "must",
    "group": "lightning",
    "stem": [
      {
        "ask": "An LWC dispatches new CustomEvent('next') using this.dispatchEvent(). With default propagation options, which two statements are true?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Data may be passed in the payload of a custom event using @wire decorated properties.",
      "Data may be passed In the payload of a custom event using a property called detail.",
      "The event automatically propagates into the component’s child components.",
      "A parent can handle it with a listener attached directly to the child component’s host element."
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
      "Salesforce reference: LWC event propagation — https://developer.salesforce.com/docs/platform/lwc/guide/events-propagation.html",
      "Question repair: Replace imprecise propagation wording with listener placement for a host-dispatched event."
    ],
    "corrected": true,
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
    "corrected": true,
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
        "ask": "Which listed cause should the developer investigate first for this difference between execution contexts?"
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
    "repaired": true
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
    ]
  },
  {
    "id": 117,
    "section": "automation",
    "focus": "must",
    "group": "security",
    "stem": [
      {
        "ask": "Which explicit class sharing declaration always requests enforcement of record sharing, even when the class is called from without sharing Apex? This question concerns the declaration, independently of database access mode."
      }
    ],
    "choices": [
      "Use the WITH SECURITY_ENFORCED clause within the SOQL.",
      "Use the inherited sharing keyword.",
      "Use the with sharing keyword.",
      "Use the without sharing keyword."
    ],
    "answer": "C",
    "why": "with sharing explicitly fixes the class’s record-sharing declaration even when called from without sharing code.",
    "wrong": {
      "A": "WITH SECURITY_ENFORCED is not a class sharing declaration and is retired in API 67.0+.",
      "B": "inherited sharing is secure for an LWC entry point, but follows a caller in other Apex call paths rather than fixing the class declaration to with sharing.",
      "D": "Without sharing ignores sharing rules."
    },
    "notes": [
      "inherited sharing is valid for an LWC entry point and generally resolves securely there; it is wrong only for the repaired requirement to use the same fixed declaration regardless of caller. WITH SECURITY_ENFORCED was a CRUD/FLS check rather than a sharing declaration and is retired for API 67.0+. Current user-mode queries enforce record and field/object access.",
      "Salesforce reference: Current and legacy Apex security defaults — https://developer.salesforce.com/docs/platform/lwc/guide/apex-security",
      "Question repair: Require a fixed sharing declaration regardless of caller; inherited sharing is valid for an LWC entry point."
    ],
    "corrected": true,
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
    }
  },
  {
    "id": 118,
    "section": "automation",
    "focus": "high",
    "group": "model",
    "stem": [
      "Assume Order and Order Line in this scenario are custom objects with eligible numeric line-total fields and a configurable master-detail relationship.",
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
      "Native roll-up operations are COUNT, SUM, MIN, and MAX; AVG is not an operation. A line total formula can be an eligible summed field subject to roll-up restrictions. If these are standard order products rather than a configurable custom model, check actual object/field support before assuming the same setup.",
      "Question repair: Specify the configurable custom master-detail model for the native roll-up."
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
    "repaired": true
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
    ]
  },
  {
    "id": 120,
    "section": "testing",
    "focus": "must",
    "group": "tests",
    "stem": [
      {
        "ask": "Which annotation lets a separate Apex test class directly call a private method without making that method public for production callers?"
      }
    ],
    "choices": [
      "Use the SeeAllData annotation.",
      "Add a test method in the Apex class.",
      "Mark the Apex class as global.",
      "Use the @TestVisible annotation."
    ],
    "answer": "D",
    "why": "@TestVisible allows a separate Apex test class to access the annotated private/protected method without exposing it to normal production callers.",
    "wrong": {
      "A": "SeeAllData does not let a test call a private method.",
      "B": "Colocating test methods inside the class can allow private-member access, but it does not grant the separate test class in this question access to that private member.",
      "C": "global exposes the class. It does not open one private method to tests."
    },
    "notes": [
      "Prefer asserting behavior through the public contract when practical; use @TestVisible when direct access to an internal helper is justified. SeeAllData controls record visibility, not method access.",
      "Question repair: Specify a separate test class rather than older colocated test patterns."
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
    "repaired": true
  },
  {
    "id": 121,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      "A developer needs a reusable custom component for a Lightning record page, using an HTML template and JavaScript event handlers to validate Account inputs before save.",
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
    "why": "Lightning Web Components provide the requested reusable HTML/JavaScript component for a Lightning record page.",
    "wrong": {
      "A": "A screen flow can collect and validate input, but the scenario specifically requests a reusable custom web component built with HTML and JavaScript.",
      "C": "Visualforce is not the Lightning component for this form.",
      "D": "Vue is not a Salesforce framework for this Account form."
    },
    "notes": [
      "Use base components and browser validity APIs for client feedback, and enforce required business rules on the server too. Screen Flow and Visualforce can also validate forms, so the repaired prompt specifies the LWC component architecture rather than claiming only LWC can validate input.",
      "Question repair: Specify a custom web-standards component rather than a general validating form that Flow could also build."
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
    "repaired": true
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
    ]
  },
  {
    "id": 123,
    "section": "automation",
    "focus": "high",
    "group": "flows",
    "stem": [
      "An existing flow updates an Opportunity. It must also create a Contact and put the created Contact's Id in an existing custom Contact lookup field on that Opportunity.",
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
    "repaired": true
  },
  {
    "id": 124,
    "section": "automation",
    "focus": "high",
    "group": "integration",
    "stem": [
      "Order__c has a required, unique External ID field Order_Number__c. A List<Order__c> named orders contains external order numbers but no Salesforce record Ids.",
      {
        "ask": "Which statement inserts new orders and updates existing orders by matching Order_Number__c?"
      }
    ],
    "choices": [
      {
        "code": [
          "merge orders;"
        ]
      },
      {
        "code": [
          "merge orders Order_Number__c;"
        ]
      },
      {
        "code": [
          "upsert orders Order_Number__c;"
        ]
      },
      {
        "code": [
          "upsert orders;"
        ]
      }
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
      "Question repair: Correct external-ID upsert matching and restore API identifiers.",
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
    "corrected": true,
    "printed": "D"
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
    ]
  },
  {
    "id": 126,
    "section": "testing",
    "focus": "high",
    "group": "tests",
    "stem": [
      "Several test methods in one Apex test class need the same baseline Accounts, Contacts, Products, and Assets, with isolated data changes for each method.",
      {
        "ask": "Which approach creates that shared per-class baseline without repeating its insertion in every test method?"
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
    "repaired": true
  },
  {
    "id": 127,
    "section": "testing",
    "focus": "must",
    "group": "tests",
    "stem": [
      "A matching online variant supplies this Contact trigger. The helper accepts List<Contact>. The only test calls the helper directly; it never inserts Contacts or otherwise fires the trigger.",
      {
        "code": [
          "trigger myTrigger on Contact (before insert) {",
          "    MyClass.myStaticMethod(Trigger.new);",
          "}"
        ]
      },
      {
        "ask": "The direct helper test gives 81% overall coverage. Under the ordinary RunLocalTests coverage rules, what happens when these are the only Apex components being deployed to production?"
      }
    ],
    "choices": [
      "The deployment passes because both classes and the trigger were included in the deployment.",
      "The deployment fails because no assertions were made in the test method.",
      "The deployment passes because the Apex code has the required >75% code coverage.",
      "The deployment fails because the Apex trigger has no code coverage."
    ],
    "answer": "D",
    "why": "The helper’s 81% coverage does not cover the trigger. Because no test fires the trigger, its zero coverage blocks production deployment.",
    "wrong": {
      "A": "Deploying the trigger does not give it coverage.",
      "B": "Missing assertions do not cause this deployment failure.",
      "C": "81 percent class coverage does not cover a trigger at 0 percent."
    },
    "notes": [
      "Insert Contacts in a test to execute the trigger and assert its effects. Covering the helper directly does not execute the trigger body. The online variants differ in helper arguments, so this is a paraphrased, explicitly scoped reconstruction rather than a recovered DOCX exhibit.",
      "Recovered variant: https://www.freecram.net/question/Salesforce.PDI.v2022-03-30.q75/developer-created-this-apex-trigger-that-calls-myclass-.mystaticmethod-trigger-mytrigger-on-contact-befor",
      "Coverage: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_start.html"
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
    "corrected": true,
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
    ]
  },
  {
    "id": 130,
    "section": "ui",
    "focus": "familiar",
    "group": "visualforce",
    "stem": [
      "A Visualforce page binds {!actType}. Its custom controller declares a plain public String actType field initialized from a queried Account.Type, but has no getActType() method or public get property. Assume the page references the correct controller.",
      {
        "ask": "What should expose actType to the Visualforce binding?"
      }
    ],
    "choices": [
      "Add a getter method for the actType attribute.",
      "Change theAccount attribute to public.",
      "Add with sharing to the custom controller.",
      "Convert theAccount.Type to a String."
    ],
    "answer": "A",
    "why": "Expose actType through a public getter or get property so the Visualforce expression {!actType} can read it.",
    "wrong": {
      "B": "Making the Account public does not expose actType to the page.",
      "C": "With sharing does not create the missing getter.",
      "D": "Converting Type to a String does not make the attribute available."
    },
    "notes": [
      "A plain public field is not a Visualforce getter property. Supply public String getActType() { return actType; } or an appropriate public property with a get accessor. The online controller variant uses a public field; the missing DOCX code was not proven to declare it private.",
      "Recovered context: https://quizlet.com/760295701/sf-developer-2022-flash-cards/",
      "Visualforce getters: https://developer.salesforce.com/docs/atlas.en-us.pages.meta/pages/pages_controller_methods.htm"
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
    "repaired": true
  },
  {
    "id": 131,
    "section": "automation",
    "focus": "high",
    "group": "integration",
    "stem": [
      "The choices compare declarations/signatures. Method implementations and required return statements are omitted; assume referenced wrapper and sObject types exist.",
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
    "repaired": true
  },
  {
    "id": 132,
    "section": "automation",
    "focus": "high",
    "group": "model",
    "stem": [
      "Order and Line Item in this question are custom objects with a configurable master-detail relationship.",
      "A developer has the following requirements:",
      "* Calculate the total amount on an Order.",
      "* Calculate the line amount for each Line Item based on quantity selected and price.",
      "* Move Line Items to a different Order if a Line Item is not in stock.",
      {
        "ask": "Which relationship provides the foundation for native parent roll-up summaries and configurable detail reparenting, with the required formula and summary fields added separately?"
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
      "Use a formula on each line for quantity × unit price and SUM on the parent for the total; the relationship alone does not create those fields. The field belongs on the detail. Enable Allow reparenting explicitly and consider access/roll-up changes.",
      "Question repair: Specify custom objects for the configurable reparenting scenario."
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
    "repaired": true
  },
  {
    "id": 133,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      "Select native Salesforce client component frameworks for this implementation, rather than a server-rendered page technology that could be customized to behave similarly.",
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
    "repaired": true
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
    ]
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
      },
      "The integration must start promptly after commit, expose a job Id for monitoring, and chain further chunks when one job cannot finish the input within callout limits."
    ],
    "choices": [
      "Callout from a Queueable class called from a trigger",
      "Callout from a Batchable class called from a scheduled job",
      "Flow with a callout from an invocable method",
      "Callout from an @future method called from a trigger"
    ],
    "answer": "A",
    "why": "Queueable Apex with Database.AllowsCallouts provides an after-commit callout job, a job Id, and chaining for bounded groups of placed Orders.",
    "wrong": {
      "B": "Batch can perform callouts, but a scheduled batch does not provide the prompt trigger-started chain requested here.",
      "C": "An invocable method is not itself the required asynchronous, chainable job architecture.",
      "D": "future(callout=true) supports callouts, but does not provide Queueable chaining or the returned job Id required by this prompt."
    },
    "notes": [
      "Collect changed Order Ids and enqueue bulk work rather than one job per record. Make at most the allowed callouts per transaction, chain the remainder, and design idempotency/retry tracking. Batch can make callouts too; future can do asynchronous callouts but lacks Queueable’s chaining/job contract.",
      "Question repair: Specify prompt, chainable processing so Queueable is preferred over valid future/batch alternatives."
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
    "repaired": true
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
    "corrected": true,
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
    }
  },
  {
    "id": 137,
    "section": "testing",
    "focus": "familiar",
    "group": "tests",
    "stem": [
      "Assume Account sharing is Private, the Standard User can see only the 20 Accounts owned by that user, and the named test users are available to the test. Both test users have Read access to Account and every queried field; no additional restriction rule changes these results.",
      "Consider the following code snippet:",
      {
        "code": [
          "public with sharing class AccountsController {",
          "      @AuraEnabled",
          "      public static List<Account> getAllAccounts() {",
          "          return [SELECT Id, Name, Industry FROM Account];",
          "      }",
          "  }"
        ]
      },
      "Apex test class snippet:",
      {
        "code": [
          "01: @isTest",
          "  02: private with sharing class AccountsController_Test {",
          "  03:     @testSetup",
          "  04:     private static void makeData() {",
          "  05:         User user1 = [SELECT Id FROM User",
          "  06:             WHERE Profile.Name = 'System Administrator'",
          "  07:             AND isActive = true LIMIT 1];",
          "  08:         User user2 = [SELECT Id FROM User",
          "  09:             WHERE Profile.Name = 'Standard User'",
          "  10:             AND UserName = 'test@test.com'",
          "  11:             AND isActive = true LIMIT 1];",
          "  12:         TestUtils.insertAccounts(10, user1.Id);",
          "  13:         TestUtils.insertAccounts(20, user2.Id);",
          "  14:     }",
          "  15:     @isTest",
          "  16:     private static void getAllAccounts_StandardUser_Test() {",
          "  17:         List<Account> result = AccountsController.getAllAccounts();",
          "  18:         System.assertEquals(20, result.size());",
          "  19:     }",
          "  20: }"
        ]
      },
      "When the test class runs, the assertion fails.",
      {
        "ask": "Which change should the developer implement in the Apex test method to ensure the test method executes successfully?"
      }
    ],
    "choices": [
      "Query the Administrator user into memory and enclose lines 17 and 18 within System.runAs(user).",
      "Query the Standard User into memory and enclose lines 17 and 18 within System.runAs(user).",
      "Add @isTest(seeAllData=true) to line 15 and enclose lines 17 and 18 within Test.startTest() and Test.stopTest().",
      "Add System.runAs(user) to line 16 and enclose line 17 within Test.startTest() and Test.stopTest()."
    ],
    "answer": "B",
    "why": "Query the Standard User and wrap the controller call and assertion in System.runAs(standardUser) so the expected sharing context can see its 20 Accounts.",
    "wrong": {
      "A": "The Administrator typically has elevated visibility and does not simulate the intended Standard User, regardless of record ownership.",
      "C": "SeeAllData and startTest/stopTest do not switch the executing identity to the Standard User. The test needs System.runAs for that user to verify the stated twenty-record visibility.",
      "D": "runAs is a block that needs the actual Standard User instance; it is not added to the method declaration."
    },
    "notes": [
      "The repaired prompt states the private-sharing and no-extra-access assumptions. Real tests should create deterministic users/data rather than require a hard-coded existing username. runAs principally tests user/record-sharing context; do not assume it alone proves all CRUD/FLS checks.",
      "Question repair: State the sharing assumptions needed for the expected count of 20."
    ],
    "source": {
      "stem": [
        "Consider the following code snippet:",
        {
          "code": [
            "public with sharing class AccountsController {",
            "      @AuraEnabled",
            "      public static List<Account> getAllAccounts() {",
            "          return [SELECT Id, Name, Industry FROM Account];",
            "      }",
            "  }"
          ]
        },
        "Apex test class snippet:",
        {
          "code": [
            "01: @isTest",
            "  02: private with sharing class AccountsController_Test {",
            "  03:     @testSetup",
            "  04:     private static void makeData() {",
            "  05:         User user1 = [SELECT Id FROM User",
            "  06:             WHERE Profile.Name = 'System Administrator'",
            "  07:             AND isActive = true LIMIT 1];",
            "  08:         User user2 = [SELECT Id FROM User",
            "  09:             WHERE Profile.Name = 'Standard User'",
            "  10:             AND UserName = 'test@test.com'",
            "  11:             AND isActive = true LIMIT 1];",
            "  12:         TestUtils.insertAccounts(10, user1.Id);",
            "  13:         TestUtils.insertAccounts(20, user2.Id);",
            "  14:     }",
            "  15:     @isTest",
            "  16:     private static void getAllAccounts_StandardUser_Test() {",
            "  17:         List<Account> result = AccountsController.getAllAccounts();",
            "  18:         System.assertEquals(20, result.size());",
            "  19:     }",
            "  20: }"
          ]
        },
        "When the test class runs, the assertion fails.",
        {
          "ask": "Which change should the developer implement in the Apex test method to ensure the test method executes successfully?"
        }
      ],
      "choices": [
        "Query the Administrator user into memory and enclose lines 17 and 18 within System.runAs(user).",
        "Query the Standard User into memory and enclose lines 17 and 18 within System.runAs(user).",
        "Add @isTest(seeAllData=true) to line 15 and enclose lines 17 and 18 within Test.startTest() and Test.stopTest().",
        "Add System.runAs(user) to line 16 and enclose line 17 within Test.startTest() and Test.stopTest()."
      ],
      "answer": "B"
    },
    "printed": "B",
    "repaired": true
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
    ]
  },
  {
    "id": 139,
    "section": "automation",
    "focus": "familiar",
    "group": "security",
    "stem": [
      "A software company uses the following objects and relationships: Case_Defect__c has master-detail relationships to both Case and Defect__c. The user already has Read object permission on all three objects.",
      "* Case: to handle customer support issues",
      "* Defect__c: a custom object to represent known issues with the company's software",
      "* Case Defect__c a junction object between Case and Defect __c to represent that a defect is a cause of a customer issue",
      "Case and Defect__c have Private organization-wide defaults.",
      {
        "ask": "What should be done to share a specific Case_Defect__c record with a user?"
      }
    ],
    "choices": [
      "Share only the parent Case record.",
      "Grant the user sufficient access to both parent Case and Defect__c records.",
      "Share only the parent Defect__c record.",
      "Manually share only the Case_Defect__c record."
    ],
    "answer": "B",
    "why": "Grant access to both master records because a two-master junction inherits record access from its Case and Defect__c relationships.",
    "wrong": {
      "A": "Sharing only one parent does not share the junction.",
      "C": "Sharing only Defect__c leaves the Case side closed.",
      "D": "Sharing the junction row itself is not how access is opened when both parents are private."
    },
    "notes": [
      "The user also needs the relevant object permissions. For edit/delete, check both relationship Sharing Settings and their required master access. A detail record in this model does not have independent manual sharing.",
      "Salesforce reference: Junction sharing and relationships — https://help.salesforce.com/s/articleView?id=platform.relationships_considerations.htm&language=en_US&type=5",
      "Question repair: Restore readable choices and explicitly define a two-master junction."
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
    "repaired": true
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
    ]
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
    ]
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
    ]
  },
  {
    "id": 143,
    "section": "ui",
    "focus": "high",
    "group": "visualforce",
    "stem": [
      "The page must retain its Account standard controller and customize its Save action.",
      "Consider the following code snippet for a Visualforce page that is launched using a Custom Button on the Account detail page layout.",
      {
        "code": [
          "<apex:page standardController=\"Account\">",
          "    <apex:form>",
          "      <!-- additional UI elements -->",
          "      <apex:commandButton action=\"{!save}\" value=\"Save\"/>",
          "    </apex:form>",
          "  </apex:page>"
        ]
      },
      "When the Save button is pressed the developer must perform a complex validation that involves multiple objects and, upon success, redirect the user to another Visualforce page.",
      {
        "ask": "What can the developer use to meet this business requirement?"
      }
    ],
    "choices": [
      "A standalone Apex utility class without a page binding",
      "A database trigger",
      "Replace the standard controller with a custom controller",
      "An extension to the existing standard controller"
    ],
    "answer": "D",
    "why": "Add a controller extension and define a save action that performs the additional checks and returns the next PageReference while retaining the Account standard controller.",
    "wrong": {
      "A": "An unbound utility class does not override the page Save action.",
      "B": "A trigger can validate DML but does not supply page navigation or override the page action.",
      "C": "A custom controller could implement saving, but replacing the standard controller violates the stated requirement to retain it."
    },
    "notes": [
      "Declare the extension in the page’s extensions attribute. On success call the standard controller save or perform the intended DML, then redirect; on failure add page messages and keep the user on the form. A database trigger cannot return a browser redirect."
    ],
    "corrected": true,
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
    }
  },
  {
    "id": 144,
    "section": "automation",
    "focus": "high",
    "group": "flows",
    "stem": [
      "The choices compare declarations/signatures. Method implementations and required return statements are omitted; assume referenced wrapper and sObject types exist.",
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
    "repaired": true
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
    ]
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
    "printed": "D"
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
      "The cacheable method must not perform data mutations. An imperative method can omit cacheable for writes; Visualforce @RemoteAction is not the LWC wire API. The source choice’s misspelling was repaired to valid syntax.",
      "Salesforce reference: Client-side caching — https://developer.salesforce.com/docs/platform/lwc/guide/apex-result-caching.html",
      "Question repair: Restore the cacheable annotation spelling so the correct choice compiles."
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
    "repaired": true
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
    ]
  },
  {
    "id": 149,
    "section": "testing",
    "focus": "familiar",
    "group": "deploy",
    "stem": [
      "A development team wants to use a deployment script to automatically deploy to a sandbox during their development cycles.",
      {
        "ask": "Which two listed command-line tools can script metadata deployment to a sandbox, including legacy tooling that remains functional but is retired?"
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
      "Ant was retired in Spring 2024 and remains functional without updates/support. Use current sf project deploy commands for new workflows rather than starting a new Ant dependency. This question retains Ant only as an explicitly identified legacy capability.",
      "Salesforce reference: Ant retirement — https://help.salesforce.com/s/articleView?id=release-notes.rn_deployment_ant_migration_tool_eol.htm&language=en_US&release=248&type=5",
      "Question repair: Explicitly identify Ant as a still-functioning retired tool, not a current supported recommendation."
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
    "repaired": true
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
    ]
  },
  {
    "id": 151,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      "A developer must build a custom LWC form launched from an Account record-page action to create a custom-object record.",
      "The form uses role-dependent fields, and the action must be visible only to users assigned a custom permission. Server-side permissions must also protect the data.",
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
      "Create a Lightning web component configured as a record action.",
      "Add a Dynamic Action to the Account Record Page."
    ],
    "answer": "B,D,E",
    "type": "multi",
    "why": "Build the LWC record action, assign a custom permission through the appropriate permission set, and place/configure the dynamic action on the Account Lightning record page.",
    "wrong": {
      "A": "Dynamic Forms do not implement the explicitly required custom LWC record action.",
      "C": "A Classic page layout is not where this dynamic action is added."
    },
    "notes": [
      "Filter action visibility by that permission and implement field behavior in the form. Visibility is not authorization: object, field, and record access still protect reads/writes. Dynamic Forms arrange record fields; they do not replace this specified custom action.",
      "Question repair: Clarify a custom LWC action and its visibility requirement."
    ],
    "corrected": true,
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
    }
  },
  {
    "id": 152,
    "section": "testing",
    "focus": "familiar",
    "group": "tests",
    "stem": [
      {
        "ask": "Which two listed options directly run Apex tests without submitting a metadata deployment?"
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
    "answer": "A,D",
    "type": "multi",
    "why": "Tooling API supports direct Apex test runs, and Developer Console provides interactive test execution.",
    "wrong": {
      "B": "Metadata API can run tests during deployment, but this prompt asks for a standalone test run without deployment.",
      "C": "Bulk API: Used for data operations, not related to testing."
    },
    "notes": [
      "Metadata API can also cause tests to run as part of deployment. The repaired prompt asks for direct execution without a deployment, which removes that ambiguity. Bulk API processes data rather than invoking the Apex test runner.",
      "Question repair: Ask about standalone test execution; Metadata API deployments can run tests too."
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
    "repaired": true
  },
  {
    "id": 153,
    "section": "testing",
    "focus": "familiar",
    "group": "debug",
    "stem": [
      {
        "ask": "A developer selects Run flow in rollback mode while debugging an autolaunched flow in Flow Builder. What happens to database changes made within that debug transaction?"
      }
    ],
    "choices": [
      "When debugging a schedule-triggered flow, the flow starts only for one record.",
      "Clicking Pause allows an element to be replaced in the flow.",
      "The transaction’s DML changes are rolled back when debugging ends.",
      "Both Salesforce DML changes and effects of HTTP callouts on external systems are rolled back."
    ],
    "answer": "C",
    "why": "With rollback mode selected, DML changes in the debug transaction are rolled back rather than retained.",
    "wrong": {
      "A": "A schedule-triggered debug can process one record, but this option does not describe the requested database-change outcome for this rollback-mode run.",
      "B": "Pause does not let you replace an element while debugging.",
      "D": "Database rollback cannot undo side effects that an external system has already performed."
    },
    "notes": [
      "Flow debugging is not universally read-only: without rollback mode, supported flow debug runs can commit changes. Record-triggered debug runs always use rollback, and schedule-triggered debug starts for one record. Rollback does not undo actions already performed by an external HTTP service.",
      "Salesforce reference: Flow debugging and rollback — https://help.salesforce.com/s/articleView?id=sf.flow_considerations_troubleshooting.htm&language=en_US&type=5",
      "Question repair: Scope rollback to a selected rollback-mode debug run; schedule-triggered debug also processes one record."
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
    "repaired": true
  },
  {
    "id": 154,
    "section": "automation",
    "focus": "familiar",
    "group": "model",
    "stem": [
      "Project__c already has numeric roll-up summary fields Total_Rejected_Timesheets__c and Total_Approved_Timesheets__c.",
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
    "why": "A formula field can divide the existing rejected and approved roll-up values without maintaining another stored total.",
    "wrong": {
      "B": "A record-triggered flow is not needed to divide two roll-up numbers.",
      "C": "A roll-up can total each side, but it cannot divide one roll-up by the other.",
      "D": "A trigger is not needed for this division."
    },
    "notes": [
      "Guard zero/null denominators according to the required business display. For example, IF(Total_Approved_Timesheets__c = 0, NULL, Total_Rejected_Timesheets__c / Total_Approved_Timesheets__c). Define whether the result is a ratio or formatted percentage.",
      "Question repair: Remove reference to an absent list and state the two existing roll-up fields needed for the ratio.",
      "Online variants contain the same rejected/approved timesheet ratio but do not reliably recover the entire three-field DOCX exhibit. The two explicitly supplied roll-ups remain a study repair; a zero denominator needs a defined display policy.",
      "Matching variant: https://www.freecram.net/question/Salesforce.PDI.v2025-12-04.q96/a-developer-created-these-three-rollup-summary-fields-in-the-custom-object-project__c-the-developer"
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
    ]
  },
  {
    "id": 156,
    "section": "automation",
    "focus": "familiar",
    "group": "flows",
    "stem": [
      "Universal Hiring uses Job__c and Job_Application__c. Each Job_Application__c has master-detail relationships to Job__c and Contact. Job__c has a multi-select picklist Preferred_Locations__c containing approved state codes.",
      "Recruiters want a stored Boolean on each application indicating whether Contact.MailingState matches a whole selected value in its related Job's Preferred_Locations__c. Keep it synchronized after changes to Contact state, Job locations, or application relationships.",
      "Use a declarative design for ordinary supported record volumes. Assume the source state codes use the same format.",
      {
        "ask": "Which listed tool should implement this synchronization?"
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
      "A": "Bulk-safe Apex could implement the synchronization, but requires custom code where the requested declarative design is sufficient.",
      "B": "A roll-up summary cannot compare the Contact state with the Job state."
    },
    "notes": [
      "A flow on Job_Application__c alone will not run merely because the parent Contact changes. Trigger the synchronization from the relevant source objects and update affected applications in bulk. Multi-select membership must compare complete selected values, not a substring; dynamic multi-select comparison is not an unrestricted cross-object formula.",
      "Question repair: Identify Contact-triggered synchronization, not an application-only flow that would miss parent changes."
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
    "repaired": true
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
    "printed": "D"
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
    ]
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
      "A canonical junction has two master-detail fields; choose lookups instead if independent ownership/lifecycle requirements warrant them. Add report types/permissions as needed. The source’s Function object wording was a typo, not a separate Salesforce feature.",
      "Question repair: Correct Function object to Junction object."
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
    "repaired": true
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
      "D": "Emit is not an Aura application-event propagation phase. Capture and bubble are the two listed phases."
    },
    "notes": [
      "Aura also supports capture, which is not listed. The default phase invokes registered handlers without the same hierarchy-order guarantee as capture/bubble; event.setDefault does not define it. Do not confuse Aura phases with LWC’s bubbling-only event model.",
      "Salesforce reference: Aura application-event phases — https://developer.salesforce.com/docs/platform/aura-platform/guide/events-application-propagation.html",
      "Question repair: Correct Buddle to Bubble; the default phase has no event.setDefault method."
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
    "repaired": true
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
    ]
  },
  {
    "id": 162,
    "section": "automation",
    "focus": "must",
    "group": "queries",
    "stem": [
      "The Contact-to-Job_Application__c child relationship name is configured as Job_Applications.",
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
    "why": "D uses the configured Job_Applications__r child relationship in the subquery and Account.Industry to traverse from Contact to its parent Account.",
    "wrong": {
      "A": "Accounts.Industry is not the parent field. The relationship is Account.",
      "B": "Job_Application__c is the child object, and Accounts.Industry is the wrong parent path.",
      "C": "Job_Application__c is the child object. The subquery uses Job_Applications__r."
    },
    "notes": [
      "The child relationship name is configured metadata, not simply the child object’s API name. This question assumes it is Job_Applications. Query Contact as the outer object because the requested result is a list of Contacts with nested children.",
      "Question repair: State the configured child relationship name rather than guessing it."
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
    "repaired": true
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
    ]
  },
  {
    "id": 164,
    "section": "ui",
    "focus": "must",
    "group": "lightning",
    "stem": [
      "The custom controller exposes the untrusted URL parameter as a public String property userInput.",
      {
        "ask": "Which code in a Visualforce page and/or controller might present a security vulnerability?"
      }
    ],
    "choices": [
      {
        "code": [
          "<apex:outputText value=\"{!userInput}\" />"
        ]
      },
      {
        "code": [
          "<apex:outputText escape=\"false\" value=\"{!userInput}\" />"
        ]
      },
      {
        "code": [
          "<apex:outputField value=\"{!account.Name}\" rendered=\"{!isEditable}\" />"
        ]
      },
      {
        "code": [
          "<apex:outputField value=\"{!account.Name}\" />"
        ]
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
      "Keep the default escaping unless the content is deliberately sanitized for its exact output context. HTML escaping, JavaScript encoding, and URL encoding solve different contexts. Valid page bindings were restored so the question tests XSS rather than malformed Visualforce syntax.",
      "Question repair: Restore valid Visualforce bindings; calling Apex methods with arguments is not valid page expression syntax."
    ],
    "source": {
      "stem": [
        {
          "ask": "Which code in a Visualforce page and/or controller might present a security vulnerability?"
        }
      ],
      "choices": [
        {
          "code": "<apex:outputText value='{!ApexPages.currentPage().getParameters().get('userInput')}' />"
        },
        {
          "code": "<apex:outputText escape='false' value='{!ApexPages.currentPage().getParameters().get('userInput')}' />"
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
    "repaired": true
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
      "Include a savepoint and Database.rollback(savepoint).",
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
    "repaired": true
  },
  {
    "id": 166,
    "section": "automation",
    "focus": "high",
    "group": "flows",
    "stem": [
      "Universal Containers wants Opportunities to no longer be editable when they reach the Closed/Wonstage.",
      {
        "ask": "Which two declarative strategies can enforce this policy? Assume an approval-based strategy is explicitly submitted by automation and configured to retain its lock while the record is Closed Won."
      },
      {
        "ask": "Choose 2 answers."
      }
    ],
    "choices": [
      "Use automated submission to an approval process configured to lock the record, with suitable final-action locking.",
      "Use a Validation Rule.",
      "Use a before-update Apex trigger that calls addError() on prohibited edits.",
      "Use an Auto-Response Rule."
    ],
    "answer": "A,B",
    "type": "multi",
    "why": "A validation rule can reject prohibited edits, and an approval process with automated submission and appropriate record-lock actions can provide the requested declarative lock.",
    "wrong": {
      "C": "A before-update trigger with addError is valid enforcement, but is programmatic rather than one of the two requested declarative strategies.",
      "D": "Auto-response rules are for sending emails, not restricting edits."
    },
    "notes": [
      "An Apex before-update trigger with addError also works when code is permitted; the repaired prompt explicitly asks for declarative strategies. To permit initial closing but block later changes, use the prior StageName rather than ISCHANGED(StageName) && new stage Closed Won, which blocks the closing transition itself. Approval lock edit exceptions and final-action behavior must match the policy.",
      "Question repair: Constrain to declarative solutions; a before-update trigger with addError is also valid when code is allowed."
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
    "repaired": true
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
    "corrected": true,
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
    }
  },
  {
    "id": 168,
    "section": "ui",
    "focus": "high",
    "group": "visualforce",
    "stem": [
      "A Visualforce custom controller catches a validation-rule DmlException during Account save and calls ApexPages.addMessages(exception). The page currently has no message component.",
      {
        "ask": "Which addition displays those messages to the user?"
      }
    ],
    "choices": [
      "Add custom controller attributes to display the message.",
      "Use a try/catch with a custom exception class.",
      "Include <apex:pageMessages /> on the Visualforce page.",
      "Perform the DML using the database.unsert() method,"
    ],
    "answer": "C",
    "why": "apex:pageMessages displays the messages that the custom controller added from the caught DmlException.",
    "wrong": {
      "A": "Controller attributes alone cannot handle validation messages.",
      "B": "Catching an exception alone does not render it; this controller already added messages and now needs a message component.",
      "D": "The Database.upsert method is not related to validation error handling."
    },
    "notes": [
      "The message component and controller exception handling play separate roles. A custom controller should catch the save failure, call ApexPages.addMessages or addMessage appropriately, and rerender the message area for AJAX saves. Errors do not automatically appear just because the page has a form.",
      "Question repair: Make custom-controller message handling explicit and use the formatted pageMessages component."
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
    "repaired": true
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
      "It does not reference every arbitrary object; the related object must support the activity relationship. Event.WhoId is a separate person/name relationship. Ordinary custom lookup fields target one defined object.",
      "Question repair: Correct Whatld to WhatId."
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
    "repaired": true
  },
  {
    "id": 170,
    "section": "automation",
    "focus": "familiar",
    "group": "queries",
    "stem": [
      "Compare indexed free-text search capabilities and the ordinary synchronous Apex query-result ceilings; actual performance depends on the query and data.",
      "Universal Containers hires a developer to build a custom search page to help users find the Accounts they want. Users will be able to search on Name, Description, and a custom comments field.",
      {
        "ask": "Which consideration should the developer be aware of when deciding between SOQL and SOSL?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "SOSL is designed for indexed free-text searches.",
      "SOQL has a higher ordinary synchronous Apex result-row ceiling than SOSL.",
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
    "repaired": true
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
    ]
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
    ]
  },
  {
    "id": 173,
    "section": "testing",
    "focus": "must",
    "group": "tests",
    "stem": [
      "Assume production deployment uses RunLocalTests and all tests pass.",
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
      "Eligible Apex must have at least 75% combined code coverage org-wide under RunLocalTests.",
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
      "Deployment test levels: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_project_deploy_start.html",
      "Question repair: State RunLocalTests for the coverage calculation."
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
    "repaired": true
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
    ]
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
    ]
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
    ]
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
    ]
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
    "repaired": true
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
    "repaired": true
  },
  {
    "id": 180,
    "section": "automation",
    "focus": "familiar",
    "group": "model",
    "stem": [
      "Universal Containers uses custom Order__c and Order_Line__c objects. Order_Line__c has a master-detail relationship to Order__c, and Availability_Date__c is a Date field on each line.",
      "Every relevant line has a known, non-null Availability_Date__c; all other fulfillment constraints are outside this estimate.",
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
    "answer": "D",
    "why": "A MAX roll-up on the parent over child Availability_Date__c yields the latest line availability date, the earliest date when all dated lines can be ready.",
    "wrong": {
      "A": "LATEST is not a formula function, so it cannot return the latest availability date.",
      "B": "CEILING rounds a number. It does not return the latest date.",
      "C": "A COUNT Roll-Up Summary is irrelevant for calculating dates."
    },
    "notes": [
      "The repaired custom master-detail model explicitly supports a native roll-up. Define what a missing availability date means: MAX ignores nulls, so a null must not accidentally imply readiness. COUNT measures line count, while CEILING rounds numbers.",
      "Question repair: Use a custom master-detail model rather than assuming unrestricted custom roll-ups on standard order products."
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
    "repaired": true
  },
  {
    "id": 181,
    "section": "automation",
    "focus": "low",
    "group": "model",
    "stem": [
      "Universal Containers uses custom Order__c and Order_Line__c objects. Order_Line__c has a master-detail relationship to Order__c, and Availability_Date__c is a Date field on each line.",
      "Every relevant line has a known, non-null Availability_Date__c; all other fulfillment constraints are outside this estimate.",
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
    "answer": "D",
    "why": "Use MAX over the child availability dates in a parent roll-up to obtain the latest required date.",
    "wrong": {
      "A": "LATEST is not a formula function, so it cannot return the latest availability date.",
      "B": "CEILING rounds a number. It does not return the latest date.",
      "C": "A COUNT Roll-Up Summary is irrelevant for calculating dates."
    },
    "notes": [
      "This duplicate is retained with its original Id. The same null-date policy and master-detail eligibility apply: MAX only considers populated dates and does not independently validate every line’s readiness.",
      "Question repair: Apply the same explicit custom master-detail assumptions to this duplicate scenario."
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
    "repaired": true
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
    ]
  },
  {
    "id": 183,
    "section": "automation",
    "focus": "must",
    "group": "limits",
    "stem": [
      "A developer deployed a trigger to update the Status__c of Assets related to an Account when the Account's status changes. A nightly integration that updates Accounts in bulk has started to fail with limit failures. AccountHelper.getAssetsToUpdate performs one SOQL query for the Account passed in.",
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
      "Move all of the logic to a Queueable class that queries for and updates the Assets and call it from the trigger.",
      "Add another Asset query inside the Account loop.",
      "Add LIMIT to the helper query so it returns only some Assets for each Account.",
      "Pass all changed Accounts to a bulk helper once, outside the Account loop, and query Assets for their combined Id set."
    ],
    "answer": "",
    "why": "Not scored. D is the direct bulk repair: collect changed Account IDs, query their Assets together, and update once. A can also be implemented as a valid bulk Queueable design, and the prompt does not require synchronous completion or specify its internal query pattern.",
    "wrong": {
      "B": "An additional per-Account query increases the repeated work.",
      "C": "Limiting each query can omit Assets that must be updated."
    },
    "notes": [
      "The prior review called A wrong by assuming the Queueable retained per-record queries. That assumption is not stated in A, so the Corrected badge has been withdrawn. Decide whether synchronous completion is required, or specify the Queueable implementation, before assigning a unique key.",
      "A matching online version supplies the helper: it queries Assets for one Account per call. That establishes the original N-query defect, but not the internal design of the proposed Queueable replacement.",
      "Recovered variant: https://www.freecram.net/Salesforce.PDI.v2024-07-20.q115.pdf",
      "Bulk trigger design: https://trailhead.salesforce.com/content/learn/modules/apex_triggers/apex_triggers_bulk"
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
    "ungraded": true
  },
  {
    "id": 184,
    "section": "automation",
    "focus": "must",
    "group": "limits",
    "stem": [
      "A trigger handler calls this ContactService method to save Business_Unit__c changes. Assume it passes writable Contact instances queried after insert, invokes the service once per trigger batch, and prevents recursive reprocessing.",
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
          "public static void setBusinessUnitToEMEA(List<Contact> contacts) {",
          "    for (Contact thisContact : contacts) {",
          "        thisContact.Business_Unit__c = 'EMEA';",
          "    }",
          "    // No DML is performed.",
          "}"
        ]
      }
    ],
    "answer": "A",
    "why": "A accepts the full Contact list, assigns Business_Unit__c to each record, and performs one update outside the loop.",
    "wrong": {
      "B": "contacts.add receives a String assignment rather than a Contact; the option is invalid Apex and still has a single-record signature.",
      "C": "It performs DML inside the loop and repeatedly saves only the first Contact.",
      "D": "It modifies queried instances in memory but never saves them, contrary to the repaired persistence requirement."
    },
    "notes": [
      "The source images show that B adds a String assignment to List<Contact>, which is invalid, and C repeatedly updates only contacts[0] inside the loop. The D image is absent; D was explicitly replaced with a no-DML distractor rather than presented as recovered source code. For a before-save handler changing Trigger.new directly, omit same-record DML instead.",
      "Question repair: Restore actual source option code and replace the missing D exhibit with an explicitly repaired distractor.",
      "A complete-looking online variant places this DOCX's B/C code under different letters and does not prove what its missing D contained. It was not used to overwrite the inspected source images or to relabel the supplied replacement D.",
      "Compared variant: https://www.freecram.net/question/Salesforce.PDI.v2022-03-30.q75/the-following-apex-method-is-part-of-the-contactservice-class-that-is-called-from-a-trigger-public-static"
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
            "      List<Contact> contacts = new List<Contact>();",
            "      contacts.add(thisContact);",
            "      thisContact.Business_Unit__c = 'EMEA';",
            "      update contacts;",
            "  }"
          ]
        },
        {
          "code": [
            "public static void setBusinessUnitToEMEA(List<Contact> contacts) {",
            "      for (Contact thisContact : contacts) {",
            "          thisContact.Business_Unit__c = 'EMEA';",
            "      }",
            "      update contacts[0];",
            "  }"
          ]
        },
        "Option D does not set the field on every Contact and then perform one update for the whole list."
      ],
      "answer": "A"
    },
    "printed": "A",
    "repaired": true
  },
  {
    "id": 185,
    "section": "automation",
    "focus": "familiar",
    "group": "triggers",
    "stem": [
      "A helper must maintain a mutable Integer maxAttempts shared by repeated trigger invocations within the same Apex transaction. Helper methods may update the value, while direct access from other classes should be restricted.",
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
    "answer": "D",
    "why": "A private static variable on a helper class shares mutable state across trigger invocations in one transaction while restricting direct external access.",
    "wrong": {
      "A": "Constants (static + final) cannot be modified after initialization.",
      "B": "Trigger member variables cannot retain values across executions within the same transaction.",
      "C": "Instance state belongs to a particular helper object. It is not automatically shared between separate helper instances or calls the way a class static variable is."
    },
    "notes": [
      "Expose controlled static helper methods if other classes need to use it. static final would preserve an immutable value instead, so the repaired prompt explicitly requires mutation. Static state resets at transaction boundaries, including new asynchronous transactions.",
      "Question repair: Clarify mutable transaction state; an immutable static final constant would also preserve a fixed value."
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
    "repaired": true
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
        "code": "Name, Amount, AccountId"
      },
      {
        "ask": "Which two methods should the developer implement to fulfill the business requirement?"
      },
      {
        "ask": "Choose 2 answers."
      }
    ],
    "choices": [
      "Create a Visualforce quick action whose Apex controller performs the authenticated HTTP REST callout.",
      "Create an after-update trigger on the Opportunity object that calls a helper method using @future(callout=true) to perform the HTTP REST callout.",
      "Create an LWC or Aura quick action that invokes Apex to perform the authenticated HTTP REST callout.",
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
      "Use a Named Credential and implement server-side access checks and response/error handling. An update trigger responds to data changes, not the specified button click, and would need separate async callout handling.",
      "Question repair: State that the quick actions invoke Apex for the HTTP callout."
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
    "repaired": true
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
      "Keep helper methods public static for reuse from other test classes; ordinary factory methods need not themselves be test methods. The source image omitted class in the declaration, which the existing transcription had already normalized."
    ]
  },
  {
    "id": 188,
    "section": "automation",
    "focus": "must",
    "group": "limits",
    "stem": [
      "This synchronous Apex method is invoked by an LWC. Its query returns more than 2,000 Leads that the executing user can read and update, including the queried/updated fields. Assume no other automation or ordinary validation failure interrupts it first.",
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
    "why": "One SOQL for-loop feeds an update per Lead. Assuming the rows are accessible and ordinary validation succeeds, the 151st update exceeds the 150-statement DML limit.",
    "wrong": {
      "A": "The query is one SOQL for-loop. The limit that breaks first is DML statements.",
      "C": "DML rows allow 10,000. The update inside the loop hits 150 statements first."
    },
    "notes": [
      "The DML-row ceiling is 10,000, so the repeated statements fail first. SOQL for-loop fetch batches do not turn this into many separately written SOQL statements. Collect changes and perform bulk DML instead of updating each Lead separately."
    ],
    "corrected": true,
    "printed": "C",
    "source": {
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
        "Total number of SOOL quires issued",
        "Total number of DML statements issued",
        "Total number of records processed as a result of DML statements"
      ],
      "answer": "C"
    }
  },
  {
    "id": 189,
    "section": "ui",
    "focus": "must",
    "group": "security",
    "stem": [
      "An existing Apex API 66.0 controller runs a system-mode query for sales records including Commission__c and returns the results to an LWC. The developer will retain this query rather than replace the data-access approach.",
      "The Sales Representative user should be able to see the commission field on each record. The Sales Assistant user should be able to see all fields on the record except the commission field.",
      {
        "ask": "How should this be enforced so that the component works for both users without showing any errors?"
      }
    ],
    "choices": [
      "Use WITH SECURITY_ENFORCED In the SOQL that fetches the data for the component,",
      "Use Security.stripInaccessible(AccessType.READABLE, records) and return the sanitized getRecords() result.",
      "Use Lightning Locker Service to enforce sharing rules and field-level security.",
      "Use Lightning Data Service to get the collection of sales records."
    ],
    "answer": "B",
    "why": "For the retained system-mode query, Security.stripInaccessible removes unreadable fields, and returning getRecords() exposes only the sanitized rows.",
    "wrong": {
      "A": "WITH SECURITY_ENFORCED throws when a field is hidden. It does not quietly drop Commission.",
      "C": "Locker Service does not strip fields from this Apex query.",
      "D": "LDS supports collection access, but replacing the data-access approach is excluded by the repaired prompt."
    },
    "notes": [
      "Check removed fields if the UI needs to explain omissions; do not return the original list. stripInaccessible does not by itself filter record sharing. A user-mode query can throw for inaccessible selected fields; graceful stripping of an explicitly system-mode query is a separate design. LDS/GraphQL can also retrieve collections, so the prompt now specifies that Apex access is retained.",
      "Question repair: Specify legacy Apex system-mode query plus graceful field stripping; LDS can also query collections."
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
    "repaired": true
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
    ]
  },
  {
    "id": 191,
    "section": "ui",
    "focus": "familiar",
    "group": "lightning",
    "stem": [
      {
        "ask": "Which three are supported Salesforce asset/resource types that an LWC can reference using the documented resource or asset mechanisms?"
      },
      {
        "ask": "Choose 3 answers"
      }
    ],
    "choices": [
      "Static resources",
      "All external libraries",
      "Custom SVG image files uploaded as static resources.",
      "An Aura bundle’s controller.js file imported as the LWC controller.",
      "Content asset files"
    ],
    "answer": "A,C,E",
    "type": "multi",
    "why": "LWC can reference static resources, SVG images uploaded as static resources, and Salesforce content asset files.",
    "wrong": {
      "B": "Not every external library is compatible with the supported loading and Lightning security constraints.",
      "D": "An Aura controller.js bundle resource is not an LWC JavaScript controller module."
    },
    "notes": [
      "Use @salesforce/resourceUrl and @salesforce/contentAssetUrl for the relevant asset types. Third-party web components are also supported through documented mechanisms, so the source’s blanket rejection was removed; the repaired D now describes an invalid Aura-controller import instead.",
      "Salesforce reference: Supported third-party web components — https://developer.salesforce.com/docs/platform/lwc/guide/create-use-third-party-components.html",
      "Question repair: Ask about asset categories, not everything LWC supports; third-party web components are supported."
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
    "repaired": true
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
      "aura-input-field",
      "force-input-field",
      "ui-input-field",
      "lightning-input-field"
    ],
    "answer": "D",
    "why": "lightning-input-field inside lightning-record-edit-form uses field metadata and LDS permissions to render supported Contact inputs.",
    "wrong": {
      "A": "Aura-input-field is not the LWC field component.",
      "B": "Force-input-field is not the LWC field component.",
      "C": "Ui-input-field is not the LWC field component."
    },
    "notes": [
      "Provide object-api-name=\"Contact\" on the form and field-name on each input. Include lightning-messages and a submit button as appropriate. LDS-managed saves respect object permissions/FLS/sharing; separate custom Apex logic still requires separate security handling."
    ]
  },
  {
    "id": 193,
    "section": "automation",
    "focus": "must",
    "group": "limits",
    "stem": [
      "Assume the query returns more than 10,000 Cases, the executing user can update them and Status, and no earlier failure prevents the bulk DML attempt.",
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
        "ask": "What happens when this block attempts to update the resulting collection?"
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
    "repaired": true
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
      "Declarative platform features are maintained by Salesforce as part of platform releases.",
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
      "That does not guarantee zero regressions, zero testing, or automatically updated business logic. Flows and validation rules can fail at runtime and must be reviewed as requirements evolve. Declarative tools do not automatically generate a complete Apex test suite.",
      "Question repair: Avoid promising automatic business-logic migration during releases."
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
    "repaired": true
  },
  {
    "id": 195,
    "section": "testing",
    "focus": "familiar",
    "group": "debug",
    "stem": [
      "A developer creates a batch Apex job to update a large number of records, and receives reports of the job timing out and not completing.",
      {
        "ask": "Before investigating individual execution logs, where should the developer establish the job's status, processed batch count, and reported errors?"
      }
    ],
    "choices": [
      "Check Apex Jobs, or query AsyncApexJob, for the job status, progress, and errors.",
      "Check the debug logs for the batch job.",
      "Disable the batch job and recreate it with a smaller number of records.",
      "Decrease the batch size to reduce the load on the system."
    ],
    "answer": "A",
    "why": "Start with Apex Jobs/AsyncApexJob to establish job status, progress, and reported errors, then correlate the failing execution with debug logs.",
    "wrong": {
      "B": "Debug logs explain individual executions. The question asks first for job-level status and progress, available in Apex Jobs/AsyncApexJob.",
      "C": "Disabling and recreating the job skips the status that explains the delay.",
      "D": "A smaller batch is a later change. Check the monitoring page first."
    },
    "notes": [
      "Debug logs are also useful early evidence; the question’s first-step recommendation is to establish job state before changing batch size. Reduce scope only after measuring CPU, queries, locks, callouts, or record-specific failures."
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
    "repaired": true
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
      "Add <target>lightning__RecordPage</target> to statuscomponent.js.",
      "Add <target>lightning__RecordPage</target> inside <targets> in statuscomponent.js-meta.xml.",
      "Set <isExposed>true</isExposed> in statuscomponent.js-meta.xml.",
      "Add <masterLabel>Account</masterLabel> to statuscomponent.js-meta.xml."
    ],
    "answer": "B,C",
    "type": "multi",
    "why": "Set isExposed to true and include lightning__RecordPage in the component’s .js-meta.xml targets.",
    "wrong": {
      "A": "App Builder targets belong in .js-meta.xml under <targets>, not in the JavaScript source file.",
      "D": "MasterLabel is not what exposes the component on the Account record page."
    },
    "notes": [
      "The JavaScript file does not declare App Builder targets. If the component should be limited to Account pages, add a targetConfigs/targetConfig objects restriction for Account; the two listed settings expose record-page availability generally.",
      "Question repair: Restore executable LWC metadata identifiers."
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
    "repaired": true
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
    "corrected": true,
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
        "ask": "In this simplified MVC teaching analogy, which two files contain the client interaction handling and server-side validation logic?"
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
    "repaired": true
  },
  {
    "id": 199,
    "section": "automation",
    "focus": "must",
    "group": "queries",
    "stem": [
      {
        "ask": "Which valid Apex/SOSL statement searches Contact and Lead searchable text for terms beginning with ACME?"
      }
    ],
    "choices": [
      "List<SObject> searchList = [FIND '*ACME*' IN FIELDS RETURNING Contact, Lead];",
      "List<List<SObject>> searchList = [SELECT Name, Id FROM Contact, Lead WHERE Name LIKE '%ACME%'];",
      {
        "code": [
          "List<List<SObject>> searchList = [FIND 'ACME*' IN ALL FIELDS RETURNING Contact, Lead];"
        ]
      },
      "List<SObject> searchList = [find 'acme' in all fields returning Contact, Lead];"
    ],
    "answer": "C",
    "why": "C uses a nested List<List<SObject>> result and valid SOSL with a trailing wildcard, returning separate result lists for Contact and Lead.",
    "wrong": {
      "A": "Incorrect syntax; needs ALL FIELDS or NAME FIELDS and proper result typing.",
      "B": "SOQL does not support searching across multiple objects in a single query.",
      "D": "Apex/SOSL keyword case is not the issue; SOSL returns a list of lists rather than List<SObject>."
    },
    "notes": [
      "The original leading * was removed: use supported search terms such as ACME* rather than a leading-wildcard substring assumption. SOSL searches indexed searchable fields and returns capped results. Lowercase find/in/returning is not an error; D is wrong because of its flat List<SObject> target.",
      "Salesforce reference: SOSL search terms and wildcards — https://developer.salesforce.com/docs/platform/salesforce-soql-sosl/guide/sforce-api-calls-sosl-find.html",
      "Question repair: Remove unsupported leading wildcard and correct the casing explanation. Align the prompt with a supported prefix search rather than an arbitrary substring."
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
    "repaired": true
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
      "Unify all three triggers into one Expense__c trigger that handles the listed events.",
      "Unify the before insert and before update triggers and use Flow for the delete action.",
      "Create helper classes to execute the appropriate logic when a record is saved.",
      "Maintain all three triggers on the Expense __c object, but move the Apex logic out of the trigger definition."
    ],
    "answer": "A,C",
    "type": "multi",
    "why": "Consolidate the object’s trigger entry point and delegate event-specific business logic to helper/handler classes.",
    "wrong": {
      "B": "Flow can implement delete checks, but moving only that path is not the requested consolidated Apex entry point/handler refactor.",
      "D": "Moving logic to helpers is useful, but retaining separate trigger entry points does not complete the recommended consolidation."
    },
    "notes": [
      "The three listed triggers use different events, so do not claim their relative event order is inherently undefined. Consolidation improves discoverability and future control; only multiple triggers for the same object/event have unspecified ordering. Keep before-delete logic separate from insert/update paths inside the handler.",
      "Question repair: Correct Unity to Unify in the trigger-consolidation choice."
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
    "repaired": true
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
    ]
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
    "answer": "",
    "why": "Not scored. The existing validation rule already enforces the stated requirement. The prompt does not say whether the additional check is local format/business logic, external mailbox verification, or UI-only feedback, so it cannot establish one best additional implementation.",
    "wrong": {},
    "notes": [
      "For additional local checks that must reject every save channel, a before-insert/before-update trigger can call addError. For external mailbox verification, use an explicit asynchronous verification design; a UI-only LWC does not protect imports or APIs.",
      "Online variants publish different keys without supplying the missing requirement. Neither majority votes nor the prior AI answer establish a unique best solution. Specify the additional check before enabling scoring.",
      "Compared variant: https://www.freecram.net/question/Salesforce.CRT-450.v2024-07-02.q97/universal-containers-wants-to-ensure-that-all-new-leads-created-in-the-system-have-a-valid-email-address",
      "Trigger behavior: https://trailhead.salesforce.com/content/learn/modules/apex_triggers/apex_triggers_intro"
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
    "ungraded": true
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
    ]
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
      "PaaS abstracts more infrastructure for application development, SaaS provides a finished application, and BaaS provides backend services. This broader cloud-model question is retained as supplementary knowledge rather than a Salesforce-specific platform capability.",
      "Question repair: Correct lowercase l to capital I in IaaS."
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
    "repaired": true
  }
];
