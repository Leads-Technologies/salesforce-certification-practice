window.QUIZ_QUESTIONS = [
  {
    "id": 1,
    "section": "service",
    "stem": [
      "The CTO of AW Computing has defined a new policy for cases to improve customer satisfaction. All cases submitted with a Case Reason of Installation must be acknowledged immediately through email and assigned to the appropriate agents. Any cases that are still in the New status after 4 hours must be escalated to support management. A Platform Administrator has implemented auto-response rules and initial case assignment rules.",
      {
        "ask": "Which additional case management tool is necessary to meet this requirement?"
      }
    ],
    "choices": [
      "Support Processes",
      "Formulas",
      "Escalation Rules",
      "Entitlements"
    ],
    "answer": "C",
    "focus": "must",
    "group": "service",
    "why": "Escalation rules act when a case meets criteria for a specified age, and can notify managers or reassign ownership.",
    "wrong": {
      "A": "Support processes determine available case statuses; they do not run age-based actions.",
      "B": "A formula calculates a value but does not send notifications or reassign cases.",
      "D": "Entitlements define support eligibility and SLA milestones; this request needs a case-age escalation."
    },
    "notes": "Distinguish initial assignment, immediate customer acknowledgement, and delayed escalation. Auto-response rules cover the acknowledgement; escalation rules cover the four-hour threshold. Configure rule criteria, business hours, and actions.",
    "source": {
      "stem": [
        "The CTO of AW Computing has defined a new policy for cases to improve customer satisfaction. All cases submitted with a Case Reason of Installation must be acknowledged immediately through email and assigned to the appropriate agents. Any cases that are still in the New status after 4 hours must be escalated to support management. A Platform Administrator has implemented auto-response rules.",
        {
          "ask": "Which additional case management tool is necessary to meet this requirement?"
        }
      ],
      "choices": [
        "Support Processes",
        "Formulas",
        "Escalation Rules",
        "Entitlements"
      ],
      "answer": "C"
    },
    "printed": "C",
    "repaired": true
  },
  {
    "id": 2,
    "section": "data",
    "stem": [
      "A Platform Administrator at Ursa Major Solar has been asked to change the Work Item and Project custom object relationship from a master-detail to a lookup.",
      {
        "ask": "Which scenario prevents the administrator from fulfilling this requirement?"
      }
    ],
    "choices": [
      "A junction object is required to support the lookup.",
      "Roll-up summary fields on Project summarize Work Items through this master-detail relationship.",
      "The lookup field in all the records contains a value.",
      "The lookup field is required for saving records."
    ],
    "answer": "B",
    "focus": "must",
    "group": "model",
    "why": "Roll-up summary fields depend on the master-detail relationship, so remove those dependencies before converting it to lookup.",
    "wrong": {
      "A": "A lookup relationship does not require a junction object.",
      "C": "Populated relationship fields are not a blocker to master-detail-to-lookup conversion.",
      "D": "A required lookup can exist; requiredness is not the roll-up dependency described here."
    },
    "notes": "Master-detail enables native roll-ups on the master. Lookup allows more independent ownership and sharing. Conversion changes those relationship semantics, so review roll-ups, sharing, and deletion behavior before applying it.",
    "source": {
      "stem": [
        "A Platform Administrator at Ursa Major Solar has been asked to change the Work Item and Project custom object relationship from a master-detail to a lookup.",
        {
          "ask": "Which scenario prevents the administrator from fulfilling this requirement?"
        }
      ],
      "choices": [
        "A junction object is required to support the lookup.",
        "Roll-up summary fields exist on the master object.",
        "The lookup field in all the records contains a value.",
        "The lookup field is required for saving records."
      ],
      "answer": "B"
    },
    "printed": "B",
    "repaired": true
  },
  {
    "id": 3,
    "section": "automation",
    "stem": [
      {
        "ask": "Which component of an approval process defines the chain of approval, determines which records can advance, and specifies where to assign approval requests?"
      }
    ],
    "choices": [
      "Process Definition Detail",
      "Approval Steps",
      "Entry Criteria",
      "Approval Actions"
    ],
    "answer": "B",
    "focus": "must",
    "group": "approvals",
    "why": "Approval steps specify the approvers and the sequence and criteria that control movement through an approval process.",
    "wrong": {
      "A": "Process definition details describe overall settings rather than the individual approval chain.",
      "C": "Entry criteria determine whether a record enters the process, not its sequence of approvers.",
      "D": "Approval actions execute outcomes such as field updates; they do not define the approver chain."
    },
    "notes": "Separate process entry criteria from step criteria. A record must first qualify for the process, then meet each step’s criteria and route to its assigned approver."
  },
  {
    "id": 4,
    "section": "automation",
    "stem": [
      {
        "ask": "Which action should a Platform Administrator configure to reverse a submitted approval request and unlock the associated record when setting up an approval process?"
      }
    ],
    "choices": [
      "Final Rejection Actions",
      "Recall Actions",
      "Final Approval Actions",
      "Initial Submission Actions"
    ],
    "answer": "B",
    "focus": "high",
    "group": "approvals",
    "why": "Recall actions run when an allowed submitter withdraws an approval request; recall can unlock the record.",
    "wrong": {
      "A": "Final rejection actions run after rejection, not when the submitter recalls the request.",
      "C": "Final approval actions run after successful approval.",
      "D": "Initial submission actions run when the request is first submitted."
    },
    "notes": "Enable submitter recall when appropriate and configure recall behavior explicitly. Record unlocking after recall is distinct from final approval or final rejection settings."
  },
  {
    "id": 5,
    "section": "agentforce",
    "stem": [
      "Cloud Kicks wants Agentforce to execute a custom business operation selected in response to the customer's current conversation.",
      {
        "ask": "Which feature supplies that executable capability?"
      }
    ],
    "choices": [
      "Data Cloud",
      "Custom actions",
      "Screen flow",
      "Tableau"
    ],
    "answer": "B",
    "focus": "high",
    "group": "agent-actions",
    "why": "Custom actions give an agent executable capabilities it can select in response to the current conversation.",
    "wrong": {
      "A": "Data Cloud supplies unified data and grounding; it does not by itself perform the requested business action.",
      "C": "A screen flow needs an interactive screen and is not the direct agent-action mechanism.",
      "D": "Tableau analyzes and visualizes data rather than executing conversational agent tasks."
    },
    "notes": "The reasoning engine decides what to do; actions perform the work. Custom actions can invoke supported flows, Apex, or other services. Use autolaunched flows without screens for flow-backed agent actions.",
    "source": {
      "stem": [
        "Cloud Kicks wants Agentforce to adapt its behavior based on real-time customer input.",
        {
          "ask": "Which feature directly enables this capability?"
        }
      ],
      "choices": [
        "Data Cloud",
        "Custom actions",
        "Screen flow",
        "Tableau"
      ],
      "answer": "B"
    },
    "printed": "B",
    "repaired": true
  },
  {
    "id": 6,
    "section": "analytics",
    "stem": [
      "The sales and service teams at Cloud Kicks would like to have more visibility into their pipeline and stay on top of every case. A Platform Administrator needs to quickly create dashboards for each of the teams but does not know where to start.",
      {
        "ask": "What should the administrator do?"
      }
    ],
    "choices": [
      "Use the Salesforce Labs Field Service Dashboards for service teams from AppExchange.",
      "Enable Einstein Analytics and build custom dashboards using advanced analytics tools.",
      "Use the Salesforce Labs CRM Dashboards for sales teams from AppExchange.",
      "Manually create dashboards without using any prebuilt templates or packages."
    ],
    "answer": "C",
    "focus": "high",
    "group": "platform",
    "why": "The Salesforce Labs CRM Dashboards package offers ready-made CRM reporting and dashboards that can be adapted quickly.",
    "wrong": {
      "A": "Field Service dashboards target field-service operations rather than this general sales-and-case request.",
      "B": "Introducing advanced analytics and building everything from scratch does not meet the quickest-start requirement.",
      "D": "Manual dashboard creation ignores the available prebuilt starting point."
    },
    "notes": "Treat AppExchange packages as a starting point, not a guarantee of a perfect fit. Review package permissions, source reports, installed components, and compatibility in a sandbox."
  },
  {
    "id": 7,
    "section": "agentforce",
    "stem": [
      "An agent cannot complete its scoped task because a required input is missing. The input can be provided by the user, and no configured escalation or technical-failure condition applies.",
      {
        "ask": "What should the agent do next?"
      }
    ],
    "choices": [
      "Provides the best answer possible with caveats",
      "Gives an error message",
      "Routes to a live agent",
      "Asks for additional information"
    ],
    "answer": "D",
    "focus": "high",
    "group": "agent-prompts",
    "why": "Asking for missing information lets an agent clarify the request when its attempted tasks cannot produce a satisfactory result.",
    "wrong": {
      "A": "Returning an inadequate result with caveats does not resolve the missing information.",
      "B": "An error is appropriate for a technical failure, not the default conversational clarification step.",
      "C": "Human escalation requires an applicable handoff policy; it is not automatically the next step in every loop."
    },
    "notes": [
      "An agentic loop observes results and adjusts its next action. Clarification is suitable when needed inputs or intent are unclear; configured handoff and failure policies still govern real deployments.",
      "The original question overgeneralized unsuccessful loops. Clarification fits this explicitly missing-input case; configured handoff, retry limits, and safe failure messages apply in other cases. Reference: https://www.salesforce.com/agentforce/guide/"
    ],
    "source": {
      "stem": [
        {
          "ask": "What is the next step an agent performs when the tasks within an agentic loop are all unsatisfactory?"
        }
      ],
      "choices": [
        "Provides the best answer possible with caveats",
        "Gives an error message",
        "Routes to a live agent",
        "Asks for additional information"
      ],
      "answer": "D"
    },
    "printed": "D",
    "repaired": true
  },
  {
    "id": 8,
    "section": "data",
    "stem": [
      "An administrator mistakenly inserted new records into an object supported by Mass Delete Records. The import did not update existing records, and its new record IDs or reliable selection criteria are available.",
      {
        "ask": "Which two tools should the administrator use to undo this import?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Weekly Data Export",
      "Data Loader",
      "Data Import Wizard",
      "Mass Delete Records"
    ],
    "answer": "B,D",
    "type": "multi",
    "focus": "must",
    "group": "data",
    "why": "Data Loader can delete imported records by ID, and Mass Delete Records can remove supported records matching criteria.",
    "wrong": {
      "A": "Weekly Data Export creates a backup; it does not undo an import.",
      "C": "Data Import Wizard creates or updates records and has no general rollback or delete operation."
    },
    "notes": [
      "There is no universal Undo Import button. Keep import success files and record IDs so you can target a safe deletion. Mass Delete supports only selected objects and has per-operation limits.",
      "Deleting imported records reverses an unwanted insertion, not an import that overwrote existing values. Restore previous field values from a backup when updates were involved."
    ],
    "source": {
      "stem": [
        "A Platform Administrator at Ursa Major Solar imported records into an object by mistake.",
        {
          "ask": "Which two tools should the administrator use to undo this import?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "Weekly Data Export",
        "Data Loader",
        "Data Import Wizard",
        "Mass Delete Records"
      ],
      "answer": "B,D"
    },
    "printed": "B,D",
    "repaired": true
  },
  {
    "id": 9,
    "section": "security",
    "stem": [
      "A Platform Administrator at Universal Containers is trying to deactivate a user who has left the company but is unable to do so.",
      {
        "ask": "What is preventing the administrator from deactivating this user?"
      }
    ],
    "choices": [
      "The user is the running user of a dashboard.",
      "The user is part of an active case assignment rule.",
      "The user is part of an Opportunity team.",
      "The user is part of an Account team."
    ],
    "answer": "B",
    "printed": "A",
    "corrected": true,
    "focus": "must",
    "group": "users",
    "why": "A user referenced by a case assignment rule can be blocked from deactivation until the routing dependency is removed.",
    "wrong": {
      "A": "Dashboard running-user ownership can break dashboard results after deactivation; it is not the blocker listed here.",
      "C": "Opportunity-team membership alone does not prevent deactivation.",
      "D": "Account-team membership alone does not prevent deactivation."
    },
    "notes": [
      "Corrected from source A to B: remove assignment or escalation references before deactivating. Freeze the user first if immediate login prevention is needed.",
      "Salesforce: https://help.salesforce.com/s/articleView?id=000383178&language=en_US&type=1"
    ],
    "source": {
      "stem": [
        "A Platform Administrator at Universal Containers is trying to deactivate a user who has left the company but is unable to do so.",
        {
          "ask": "What is preventing the administrator from deactivating this user?"
        }
      ],
      "choices": [
        "The user is the running user of a dashboard.",
        "The user is part of an active case assignment rule.",
        "The user is part of an Opportunity team.",
        "The user is part of an Account team."
      ],
      "answer": "A"
    }
  },
  {
    "id": 10,
    "section": "agentforce",
    "stem": [
      "An agent is being developed with several actions that all retrieve information from different databases. A Platform Administrator has named the actions as follows: GetCustomerInfo, GetOrderDetails, GetShippingStatus.",
      {
        "ask": "Which best practice should the administrator follow to improve these names?"
      }
    ],
    "choices": [
      "Remove all verbs and use only nouns, such as CustomerInfo, OrderDetails, and ShippingStatus.",
      "Add the word 'Salesforce' to the beginning of each action name to improve context for the large language model.",
      "Use a consistent naming convention by starting each action with the verb 'Get'.",
      "Use additional related verbs, such as Find, Retrieve, or Identify."
    ],
    "answer": "D",
    "printed": "C",
    "corrected": true,
    "focus": "high",
    "group": "agent-actions",
    "why": "Distinct, descriptive action names using related verbs can help the reasoning engine differentiate similar retrieval actions.",
    "wrong": {
      "A": "Removing verbs obscures what each action does.",
      "B": "A repeated Salesforce prefix adds little information about the action’s purpose.",
      "C": "All three names already begin with Get; repeating that prefix is not the improvement asked for."
    },
    "notes": [
      "Corrected from source C to D. Salesforce’s instruction guidance recommends varied related verbs, alongside plain-language descriptions of functionality. Names alone do not replace good input and action instructions.",
      "Salesforce: https://help.salesforce.com/s/articleView?id=005134944&language=en_US&type=1"
    ],
    "source": {
      "stem": [
        "An agent is being developed with several actions that all retrieve information from different databases. A Platform Administrator has named the actions as follows: GetCustomerInfo, GetOrderDetails, GetShippingStatus.",
        {
          "ask": "Which best practice should the administrator follow to improve these names?"
        }
      ],
      "choices": [
        "Remove all verbs and use only nouns, such as CustomerInfo, OrderDetails, and ShippingStatus.",
        "Add the word 'Salesforce' to the beginning of each action name to improve context for the large language model.",
        "Use a consistent naming convention by starting each action with the verb 'Get'.",
        "Use additional related verbs, such as Find, Retrieve, or Identify."
      ],
      "answer": "C"
    }
  },
  {
    "id": 11,
    "section": "agentforce",
    "stem": [
      "A Platform Administrator is building an agent to help an ecommerce support team. The agent needs to call an action, named updateShippingAddress, that modifies a customer's shipping address in the system.",
      {
        "ask": "Which set of Action Instructions should the administrator use for the updateShippingAddress action, according to best practices?"
      }
    ],
    "choices": [
      "'Use this to update shipping information. It's used for any changes to a customer's address in the system.'",
      "'This action updates the customer's shipping address. It is to be used when a user wants to change their address. Only use this when a customer does not have an active order in the system.'",
      "'This action allows for the changing of a shipping address, and the goal is to make sure the address is current and accurate.'",
      "This action updates a customer's shipping address. Use it when the user explicitly requests an address change. Validate authorization and the new address before updating the customer record."
    ],
    "answer": "D",
    "focus": "high",
    "group": "agent-actions",
    "why": "D describes the action’s effect and explicitly says when the agent should use it: when the customer requests an address change.",
    "wrong": {
      "A": "The wording is vague and repeats shipping/address changes without a clear invocation condition.",
      "B": "It introduces an active-order restriction that the scenario never specifies.",
      "C": "It describes a general goal without stating the user intent that should trigger execution."
    },
    "notes": "Good instructions describe purpose, affected records, invocation conditions, and relevant constraints in plain language. Enforce authorization and business restrictions in the underlying action, not merely in conversational instructions.",
    "source": {
      "stem": [
        "A Platform Administrator is building an agent to help an ecommerce support team. The agent needs to call an action, named updateShippingAddress, that modifies a customer's shipping address in the system.",
        {
          "ask": "Which set of Action Instructions should the administrator use for the updateShippingAddress action, according to best practices?"
        }
      ],
      "choices": [
        "'Use this to update shipping information. It's used for any changes to a customer's address in the system.'",
        "'This action updates the customer's shipping address. It is to be used when a user wants to change their address. Only use this when a customer does not have an active order in the system.'",
        "'This action allows for the changing of a shipping address, and the goal is to make sure the address is current and accurate.'",
        "'Updates the shipping address for a customer order. The goal of the action is to modify the address on a customer's record. The agent should only use this action when the user explicitly requests to change their address.'"
      ],
      "answer": "D"
    },
    "printed": "D",
    "repaired": true
  },
  {
    "id": 12,
    "section": "analytics",
    "stem": [
      "The call center manager at Ursa Major Solar wants to provide agents with a case dashboard that can be drilled down by case origin, status, and owner.",
      {
        "ask": "What should a Platform Administrator add to the dashboard to fulfill the request?"
      }
    ],
    "choices": [
      "Dashboard Filter",
      "Dashboard Widget",
      "Combination Chart",
      "Bucket Column"
    ],
    "answer": "A",
    "focus": "must",
    "group": "analytics",
    "why": "Dashboard filters let viewers narrow compatible dashboard widgets by case origin, status, or owner.",
    "wrong": {
      "B": "A widget displays a visualization; adding one does not create cross-dashboard filtering.",
      "C": "A combination chart changes the visualization, not the viewer’s filter controls.",
      "D": "A bucket categorizes report values and is not the requested dashboard-level selector."
    },
    "notes": "Map each dashboard filter to compatible fields in its source reports. A filter narrows displayed data; it does not grant access to records the running user cannot see."
  },
  {
    "id": 13,
    "section": "automation",
    "stem": [
      {
        "ask": "In an approval process, what happens when a queue is selected as the approver?"
      }
    ],
    "choices": [
      "The queue requires unanimous approval from all of its members before the record is approved.",
      "Any member of the queue can approve or reject the record and the queue is treated as a single entity.",
      "Only the queue owner is notified about the approval request, not its members.",
      "The queue can only be used for objects that do not support individual user approvals."
    ],
    "answer": "B",
    "focus": "high",
    "group": "approvals",
    "why": "When a supported approval step is assigned to a queue, an eligible queue member can act for that queue.",
    "wrong": {
      "A": "Queue assignment does not require unanimous approval by every member.",
      "C": "Approval is not reserved for a special queue owner.",
      "D": "Queues are available only for supported objects and processes, not because user approval is unsupported."
    },
    "notes": "Queue membership distributes the work without creating one mandatory approval per member. Verify object support and queue notification settings; email notifications are not the same as approval authority."
  },
  {
    "id": 14,
    "section": "sales",
    "stem": [
      "The VP of sales at AW Computing would like sales reps to check in with their top account every Monday. The VP would like a dashboard component to show the status of the check-ins.",
      {
        "ask": "What should a Platform Administrator configure to remind the reps to contact their top account?"
      }
    ],
    "choices": [
      "Create a time-based workflow task.",
      "Enable the creation of recurring tasks.",
      "Add the email action to the page layout.",
      "Use a process email alert on the account."
    ],
    "answer": "B",
    "focus": "high",
    "group": "sales",
    "why": "Recurring tasks can create a regular Monday reminder for each rep’s account check-in.",
    "wrong": {
      "A": "A single time-based workflow task does not itself define a weekly recurring task series.",
      "C": "An email action supplies a communication button, not a recurring reminder.",
      "D": "A process email alert does not provide the requested recurring task records."
    },
    "notes": "Create tasks with owners, due dates, related accounts, and recurrence. Reports and dashboards can summarize completion only when reps record the check-ins consistently."
  },
  {
    "id": 15,
    "section": "analytics",
    "stem": [
      "Assume the administrator owns the dashboard and has the required folder-management permissions.",
      "A Platform Administrator at Cloud Kicks needs to temporarily remove one dashboard from a shared folder with several dashboards to make some required changes.",
      {
        "ask": "How should the administrator achieve this?"
      }
    ],
    "choices": [
      "Remove View access to the shared folder.",
      "Edit the dashboard properties and move it to a private dashboards folder.",
      "Remove the permission set to the dashboard from the users.",
      "Create a private group and add the dashboard to it."
    ],
    "answer": "B",
    "focus": "familiar",
    "group": "analytics",
    "why": "Moving the dashboard to a private folder removes that individual dashboard from the shared folder without affecting its neighbors.",
    "wrong": {
      "A": "Removing folder access affects every dashboard in that folder.",
      "C": "Dashboard folder sharing is not removed by changing an unrelated permission-set assignment.",
      "D": "A private group does not make a dashboard private unless the relevant folder sharing is changed."
    },
    "notes": "Folder permissions control access to saved reports and dashboards. Moving a dashboard does not change the record-level permissions behind its source data.",
    "source": {
      "stem": [
        "A Platform Administrator at Cloud Kicks needs to temporarily remove one dashboard from a shared folder with several dashboards to make some required changes.",
        {
          "ask": "How should the administrator achieve this?"
        }
      ],
      "choices": [
        "Remove View access to the shared folder.",
        "Edit the dashboard properties and move it to a private dashboards folder.",
        "Remove the permission set to the dashboard from the users.",
        "Create a private group and add the dashboard to it."
      ],
      "answer": "B"
    },
    "printed": "B",
    "repaired": true
  },
  {
    "id": 16,
    "section": "sales",
    "stem": [
      "Universal Containers wants to track all stakeholders involved in its sales opportunities to ensure proper relationship management. Sales reps need to identify who has decision-making authority, who influences the buying process, and who serves as the primary contact for each deal.",
      {
        "ask": "Which feature should a Platform Administrator configure to meet this requirement?"
      }
    ],
    "choices": [
      "Configure opportunity team members to track internal and external stakeholders.",
      "Set up account teams to track stakeholders across multiple opportunities.",
      "Use standard fields on opportunities to track stakeholder information.",
      "Use contact roles on opportunities to identify stakeholder involvement and influence."
    ],
    "answer": "D",
    "focus": "high",
    "group": "sales",
    "why": "Opportunity contact roles identify the external people involved in a deal and their roles, including the primary contact.",
    "wrong": {
      "A": "Opportunity teams describe internal collaborators, not the external buying committee.",
      "B": "Account teams share account responsibilities and do not identify each opportunity’s decision makers.",
      "C": "Generic opportunity fields do not provide the standard multiple-contact role model."
    },
    "notes": "Use contact roles for customer stakeholders and opportunity teams for internal selling collaborators. The primary-contact flag and role values serve different purposes."
  },
  {
    "id": 17,
    "section": "data",
    "stem": [
      {
        "ask": "What are three characteristics of a master-detail relationship?"
      },
      {
        "ask": "Choose 3 answers"
      }
    ],
    "choices": [
      "Each object can have up to five master-detail relationships.",
      "Permissions for the detail record are set independently of the master.",
      "Roll-up summaries are supported in master-detail relationships.",
      "The master object can be a standard or custom object.",
      "Detail records inherit ownership from their master; they have no independently assignable owner."
    ],
    "answer": "C,D,E",
    "type": "multi",
    "focus": "must",
    "group": "model",
    "why": "Master-detail supports roll-up summaries, permits standard or custom masters, and makes detail ownership follow the master.",
    "wrong": {
      "A": "A custom object normally supports up to two master-detail relationship fields, not five.",
      "B": "Detail record access is controlled through the master rather than independent sharing ownership."
    },
    "notes": "Create the relationship field on the detail object. Master deletion normally cascades to details. A standard object can be a master, but cannot be the detail side of a custom master-detail relationship.",
    "source": {
      "stem": [
        {
          "ask": "What are three characteristics of a master-detail relationship?"
        },
        {
          "ask": "Choose 3 answers"
        }
      ],
      "choices": [
        "Each object can have up to five master-detail relationships.",
        "Permissions for the detail record are set independently of the master.",
        "Roll-up summaries are supported in master-detail relationships.",
        "The master object can be a standard or custom object.",
        "The owner field on the detail records is the owner of the master record."
      ],
      "answer": "C,D,E"
    },
    "printed": "C,D,E",
    "repaired": true
  },
  {
    "id": 18,
    "section": "experience",
    "stem": [
      "Ursa Major Solar wants to see collaboration and updates across various Chatter groups, records, and announcements from the CEO in a single place.",
      {
        "ask": "What should a Platform Administrator configure to achieve this?"
      }
    ],
    "choices": [
      "Chatter Group",
      "Chatter Daily Digest",
      "Chatter Feed",
      "Chatter Stream"
    ],
    "answer": "D",
    "focus": "high",
    "group": "collaboration",
    "why": "A Chatter stream combines selected feeds so users can follow updates from several groups, records, or people in one place.",
    "wrong": {
      "A": "A group is a collaboration space; it is not a personalized combination of multiple feeds.",
      "B": "A daily digest is a periodic email summary rather than the requested combined in-app feed.",
      "C": "A feed shows updates, but streams explicitly collect several selected feeds."
    },
    "notes": "A stream does not bypass group membership or record access. Users see only updates they are authorized to access, even when several feeds are combined."
  },
  {
    "id": 19,
    "section": "security",
    "stem": [
      "The sales reps at Cloud Kicks should be able to report on each other's account and opportunity records with the organization-wide default for Account and Opportunity both set to Private.",
      {
        "ask": "What should a Platform Administrator do to achieve this?"
      }
    ],
    "choices": [
      "Create an owner-based sharing rule for Accounts with sharing between a Public Group of Sales Reps and Read Only Opportunity Access.",
      "Create an Account and Opportunity report to show any owned by each member of the Sales Team and save the report into a shared report folder.",
      "Utilize Apex sharing to programmatically share records between a group of Sales Rep users.",
      "Create manual sharing to share specific account and opportunity records between the sales reps."
    ],
    "answer": "A",
    "focus": "must",
    "group": "security",
    "why": "An owner-based account sharing rule can share sales-rep accounts with their public group and specify related opportunity access.",
    "wrong": {
      "B": "Sharing a report folder does not share the underlying account and opportunity records.",
      "C": "Apex sharing adds unnecessary development when a declarative sharing rule meets the requirement.",
      "D": "Manual sharing is record-by-record and is harder to maintain for an entire team."
    },
    "notes": "Start with restrictive organization-wide defaults and open access using the appropriate sharing mechanism. Account sharing can include related-record access; object permissions must still allow reading those objects."
  },
  {
    "id": 20,
    "section": "sales",
    "stem": [
      "A sales team is having difficulty understanding which stage their opportunity is in and what the company sales process requires of them in that stage.",
      {
        "ask": "Which feature should a Platform Administrator implement to help the sales team quickly determine where they are in the sales process and what is required of them?"
      }
    ],
    "choices": [
      "Reports & Dashboards",
      "Opportunity Sales Path",
      "Big Deal Alerts",
      "List Views"
    ],
    "answer": "B",
    "focus": "must",
    "group": "sales",
    "why": "Opportunity Path shows the current stage along with stage-specific key fields and guidance for success.",
    "wrong": {
      "A": "Reports and dashboards summarize pipeline data but do not provide the same in-record stage guidance.",
      "C": "Big Deal Alerts notify people about threshold conditions rather than guide each stage.",
      "D": "List views organize records but do not show stage-specific guidance on an opportunity."
    },
    "notes": "Path is configured for an object, record type, and picklist. It guides users; validation rules are still needed when progression or required data must be enforced."
  },
  {
    "id": 21,
    "section": "automation",
    "stem": [
      {
        "ask": "In an approval process, which feature allows a user to temporarily assign their approval responsibilities to another user while they are unavailable?"
      }
    ],
    "choices": [
      "Approval Rule",
      "Queue",
      "Delegated Approver",
      "Manager"
    ],
    "answer": "C",
    "focus": "high",
    "group": "approvals",
    "why": "A delegated approver can handle approval requests for another user when delegation is enabled for the applicable step.",
    "wrong": {
      "A": "An approval rule does not identify the substitute person.",
      "B": "A queue distributes work among members rather than temporarily delegates one user’s responsibility.",
      "D": "A manager is an approver-routing choice, not the delegation setting."
    },
    "notes": "Wording corrected: the source implies an automatically dated delegation period. A delegated approver is the substitute approver; set and remove that delegation according to the leave period and permit delegation in the approval configuration.",
    "printed": "C",
    "source": {
      "stem": [
        {
          "ask": "In an approval process, which feature allows a user to temporarily assign their approval responsibilities to another user for a predefined time period?"
        }
      ],
      "choices": [
        "Approval Rule",
        "Queue",
        "Delegated Approver",
        "Manager"
      ],
      "answer": "C"
    },
    "repaired": true
  },
  {
    "id": 22,
    "section": "sales",
    "stem": [
      {
        "ask": "Which feature gives a sales team the ability to prioritize deals with recent updates in the List view and Kanban view?"
      }
    ],
    "choices": [
      "Big Deal Alerts",
      "Report Filters",
      "Deal Change Highlights",
      "Opportunity Path"
    ],
    "answer": "C",
    "focus": "familiar",
    "group": "sales",
    "why": "Deal Change Highlights make recent opportunity changes visible in supported opportunity list and Kanban views.",
    "wrong": {
      "A": "Big Deal Alerts send threshold-based notifications rather than highlight changed values in a list.",
      "B": "Report filters select report data and do not mark recent list-view changes.",
      "D": "Path explains the current stage rather than highlighting recent changes across deals."
    },
    "notes": "This is a visual productivity feature. It is different from field history tracking, which stores an audit history, and from pipeline forecasting."
  },
  {
    "id": 23,
    "section": "experience",
    "stem": [
      "A salesperson complains that the Log a Call button is missing from the highlights panel of an Opportunity page.",
      {
        "ask": "What is the reason for this?"
      }
    ],
    "choices": [
      "The Log a Call action will appear within the Activity Component as a standard behavior rather than the highlights panel.",
      "The Log a Call action has not been added to the Salesforce Mobile and Lightning Experience Actions section of the page layout.",
      "The custom Log a Call permission is missing from the user's profile and assigned permission sets.",
      "The custom Log a Call permission has been disabled at the org level in Setup."
    ],
    "answer": "A",
    "printed": "B",
    "corrected": true,
    "focus": "high",
    "group": "experience",
    "why": "For an Opportunity, Log a Call is an activity action shown in the Activities component rather than the highlights panel.",
    "wrong": {
      "B": "Page-layout action configuration controls availability in the activity composer; it does not move this standard activity action into the highlights panel.",
      "C": "There is no standard custom permission named Log a Call that explains this placement.",
      "D": "An org-level custom permission switch is not the standard placement rule."
    },
    "notes": [
      "Corrected from source B to A because the question explicitly asks about the highlights panel. If the action is missing from Activities, then check the page layout, task permissions, and action record type.",
      "Salesforce: https://help.salesforce.com/s/articleView?id=xcloud.lex_enable_existing_features.htm&language=en_US&type=5"
    ],
    "source": {
      "stem": [
        "A salesperson complains that the Log a Call button is missing from the highlights panel of an Opportunity page.",
        {
          "ask": "What is the reason for this?"
        }
      ],
      "choices": [
        "The Log a Call action will appear within the Activity Component as a standard behavior rather than the highlights panel.",
        "The Log a Call action has not been added to the Salesforce Mobile and Lightning Experience Actions section of the page layout.",
        "The custom Log a Call permission is missing from the user's profile and assigned permission sets.",
        "The custom Log a Call permission has been disabled at the org level in Setup."
      ],
      "answer": "B"
    }
  },
  {
    "id": 24,
    "section": "security",
    "stem": [
      "There are multiple system administrators at Cloud Kicks that make configuration changes.",
      {
        "ask": "Which tool gives the system administrators the ability to track these changes?"
      }
    ],
    "choices": [
      "Health Check",
      "Setup Audit Trail",
      "History Tracking",
      "Feed Tracking"
    ],
    "answer": "B",
    "focus": "must",
    "group": "platform",
    "why": "Setup Audit Trail records administrative configuration changes, including which administrator made a change.",
    "wrong": {
      "A": "Health Check evaluates security settings against a baseline rather than listing setup edits.",
      "C": "Field history tracks selected record-field changes, not general configuration changes.",
      "D": "Feed tracking publishes selected record changes to Chatter and is not the setup audit log."
    },
    "notes": "Distinguish configuration auditing from business-record auditing. Review the audit trail promptly and export it when longer-term retention or investigation is needed."
  },
  {
    "id": 25,
    "section": "service",
    "stem": [
      "At Cloud Kicks, when a rep needs to seek additional support help, there's a series of actions the company wants to ensure are taken. The steps include sending an email and changing the status and owner of the case.",
      {
        "ask": "What should a Platform Administrator use to give the reps an easy way to make these updates?"
      }
    ],
    "choices": [
      "Case Assignment Rules",
      "Macros with Quick Actions",
      "Quick Text with Email Templates",
      "Autolaunched Flows with Email Alerts"
    ],
    "answer": "B",
    "focus": "high",
    "group": "service",
    "why": "Macros can guide and execute repetitive console actions, including supported quick actions used to update cases and send email.",
    "wrong": {
      "A": "Assignment rules primarily route ownership; they do not provide this agent-initiated series of actions.",
      "C": "Quick Text and email templates supply reusable content but do not perform the full update sequence.",
      "D": "An autolaunched flow can automate work, but macros are the listed tool for a repeatable agent console action sequence."
    },
    "notes": "Check console support and the actions the macro can use. Macro behavior differs between activity composer configurations; test the workflow in the actual service console."
  },
  {
    "id": 26,
    "section": "agentforce",
    "stem": [
      "A Platform Administrator deactivates an agent to add a new topic and action.",
      {
        "ask": "What happens to any ongoing user conversations with the agent?"
      }
    ],
    "choices": [
      "The agent will pause the conversation and resume once reactivated.",
      "The agent will continue conversations using the deactivated agent until reactivated.",
      "The agent window automatically closes to prevent new messages.",
      "The agent will send a system error message as a response to any new messages."
    ],
    "answer": "D",
    "focus": "familiar",
    "group": "agent-actions",
    "why": "Deactivating the agent interrupts ongoing conversations. Subsequent messages receive the system error response; the existing panel can remain open until the user closes it.",
    "wrong": {
      "A": "Deactivation does not promise to pause and later resume every conversation.",
      "B": "The deactivated agent does not simply continue normal execution until reactivation.",
      "C": "The panel can remain open; automatic window closure is not the standard behavior."
    },
    "notes": [
      "Prefer creating and testing another agent version rather than disrupting the production agent. Exact channel behavior varies, but deactivation is not a transparent live-edit operation.",
      "Salesforce: https://help.salesforce.com/s/articleView?id=ai.agent_versions_commit.htm&language=en_US&type=5"
    ],
    "source": {
      "stem": [
        "A Platform Administrator deactivates an agent to add a new topic and action.",
        {
          "ask": "What happens to any ongoing user conversations with the agent?"
        }
      ],
      "choices": [
        "The agent will pause the conversation and resume once reactivated.",
        "The agent will continue conversations using the deactivated agent until reactivated.",
        "The agent window automatically closes to prevent new messages.",
        "The agent will send a system error message as a response to any new messages."
      ],
      "answer": "D"
    },
    "printed": "D"
  },
  {
    "id": 27,
    "section": "sales",
    "stem": [
      {
        "ask": "When a qualified lead is converted, what happens to its related records?"
      }
    ],
    "choices": [
      "Records from custom objects are attached to the resulting contact, account, and opportunity records.",
      "Open activities only are attached to the resulting contact, account, and opportunity records.",
      "All activities are attached to the resulting contact, account, and opportunity records.",
      "Campaign history is attached to the resulting contact, account, and opportunity records."
    ],
    "answer": "C",
    "focus": "high",
    "group": "sales",
    "why": "Lead conversion associates the lead’s activities with the resulting account, contact, and applicable opportunity records.",
    "wrong": {
      "A": "Arbitrary related custom-object records are not universally reparented by standard conversion.",
      "B": "Conversion is not limited to open activities.",
      "D": "Campaign membership is associated with the converted contact; it is not copied to every resulting record as stated."
    },
    "notes": "Review activity access and custom lead-field mappings as part of conversion. Existing-account/contact choices and conversion options affect the resulting records."
  },
  {
    "id": 28,
    "section": "service",
    "stem": [
      "Universal Containers (UC) customers have provided feedback that their support cases are not being responded to quickly enough. UC wants to send all unclaimed queue-owned cases that have been open for more than 2 hours to an urgent Case queue and alert the support manager.",
      {
        "ask": "Which feature should a Platform Administrator configure to meet this requirement?"
      }
    ],
    "choices": [
      "Case Scheduled Reports",
      "Case Dashboard Refreshes",
      "Case Escalation Rules",
      "Case Assignment Rules"
    ],
    "answer": "C",
    "focus": "familiar",
    "group": "service",
    "why": "Case escalation rules can identify unassigned cases older than two hours, reassign them, and notify the support manager.",
    "wrong": {
      "A": "Scheduled reports deliver report results rather than reassign case ownership.",
      "B": "Refreshing a dashboard updates a display without routing the underlying cases.",
      "D": "Assignment rules route cases but do not provide the described age-based escalation by themselves."
    },
    "notes": "Use the case age condition and matching criteria carefully. Assignment answers who should initially own work; escalation answers what should happen if work waits too long.",
    "source": {
      "stem": [
        "Universal Containers (UC) customers have provided feedback that their support cases are not being responded to quickly enough. UC wants to send all unassigned cases that have been open for more than 2 hours to an urgent Case queue and alert the support manager.",
        {
          "ask": "Which feature should a Platform Administrator configure to meet this requirement?"
        }
      ],
      "choices": [
        "Case Scheduled Reports",
        "Case Dashboard Refreshes",
        "Case Escalation Rules",
        "Case Assignment Rules"
      ],
      "answer": "C"
    },
    "printed": "C",
    "repaired": true
  },
  {
    "id": 29,
    "section": "security",
    "stem": [
      "A Platform Administrator at Cloud Kicks is trying to set up a new user but receives an error about a duplicate username when trying to save the user record.",
      {
        "ask": "What is causing this error to happen?"
      }
    ],
    "choices": [
      "The username was not configured in the format of an email address.",
      "The email address and username must be unique across all Salesforce orgs.",
      "The username is already used in another org in the applicable Salesforce production or sandbox username namespace.",
      "The username has a restricted domain name within it."
    ],
    "answer": "C",
    "focus": "must",
    "group": "users",
    "why": "A Salesforce username must be globally unique across the applicable Salesforce environment, not just within the current org.",
    "wrong": {
      "A": "Email-address syntax alone does not explain an error specifically reporting a duplicate username.",
      "B": "User email addresses can be reused; the username is the globally unique login identifier.",
      "D": "A domain restriction is different from the duplicate-username problem."
    },
    "notes": "A username resembles an email address but need not be the user’s actual email. Production and sandbox username namespaces have their own rules; do not assume one org’s user list is the entire uniqueness check.",
    "source": {
      "stem": [
        "A Platform Administrator at Cloud Kicks is trying to set up a new user but receives an error about a duplicate username when trying to save the user record.",
        {
          "ask": "What is causing this error to happen?"
        }
      ],
      "choices": [
        "The username was not configured in the format of an email address.",
        "The email address and username must be unique across all Salesforce orgs.",
        "The username must be unique across all Salesforce orgs.",
        "The username has a restricted domain name within it."
      ],
      "answer": "C"
    },
    "printed": "C",
    "repaired": true
  },
  {
    "id": 30,
    "section": "analytics",
    "stem": [
      "A sales rep typically has several open opportunities for each of their accounts.",
      {
        "ask": "Which tool should a Platform Administrator suggest to the sales rep to obtain the total number of accounts associated with open opportunities in a report?"
      }
    ],
    "choices": [
      "Bucket Column",
      "Report Filter",
      "Unique Count",
      "Group Rows"
    ],
    "answer": "C",
    "focus": "high",
    "group": "analytics",
    "why": "Unique Count counts distinct account values so several opportunities for one account do not inflate the account total.",
    "wrong": {
      "A": "A bucket categorizes values; it does not perform a distinct count.",
      "B": "A filter limits which opportunity rows are included but does not deduplicate accounts.",
      "D": "Grouping organizes rows; Unique Count explicitly provides the distinct-value measure."
    },
    "notes": "Use an account identifier or appropriate account column to avoid merging different accounts that share a name. Row count and unique account count answer different business questions."
  },
  {
    "id": 31,
    "section": "experience",
    "stem": [
      "Cloud Kicks' management team is hoping to increase user productivity by switching to consoles instead of the current traditional Salesforce user interface.",
      {
        "ask": "What should a Platform Administrator use to implement this request?"
      }
    ],
    "choices": [
      "App Builder",
      "Screen Flow",
      "App Manager",
      "Omni-Channel"
    ],
    "answer": "C",
    "focus": "high",
    "group": "platform",
    "why": "App Manager creates and configures Lightning apps, including apps that use console navigation.",
    "wrong": {
      "A": "Lightning App Builder configures pages, not the app’s standard-versus-console navigation choice.",
      "B": "A screen flow guides a process rather than defines console navigation.",
      "D": "Omni-Channel routes work; it does not create the Lightning console app."
    },
    "notes": "Use App Manager for app navigation, branding, utility items, and user assignment. Use Lightning App Builder for the pages displayed inside the app."
  },
  {
    "id": 32,
    "section": "security",
    "stem": [
      "Universal Containers has two sales teams, sales team A and sales team B. Each team has their own role in the role hierarchy. Both roles are subordinates of the same Manager role.",
      {
        "ask": "How should a Platform Administrator share records owned by sales team A with sales team B?"
      }
    ],
    "choices": [
      "Criteria-based sharing",
      "Owner-based sharing",
      "Hierarchical sharing",
      "Manual sharing"
    ],
    "answer": "B",
    "focus": "high",
    "group": "security",
    "why": "Owner-based sharing can share records owned by users in team A’s role with users in team B’s role.",
    "wrong": {
      "A": "Criteria-based sharing selects records by field values rather than ownership.",
      "C": "Sibling roles do not automatically inherit each other’s records through the hierarchy.",
      "D": "Manual sharing handles individual records and does not scale as a role-to-role policy."
    },
    "notes": "A shared manager can inherit both teams’ access while the teams remain isolated from each other. Sharing rules open access; they never remove access granted elsewhere."
  },
  {
    "id": 33,
    "section": "security",
    "stem": [
      "Service reps in a call center do not have assigned desks. They sit at any available desk and use the computer on that desk to access Salesforce. A Platform Administrator has been asked to streamline the login process so the reps do not receive repeated identity-verification challenges when they log in from a different computer on the trusted office network.",
      {
        "ask": "Which function should the administrator use to implement this request?"
      }
    ],
    "choices": [
      "Custom Profile",
      "Trusted IP Ranges",
      "Multi-factor Authentication",
      "Permission Set"
    ],
    "answer": "B",
    "focus": "high",
    "group": "users",
    "why": "Trusted network IP ranges reduce repeated identity-verification challenges when users connect from the organization’s trusted network.",
    "wrong": {
      "A": "A different profile does not specifically designate a network as trusted.",
      "C": "MFA verifies identity and does not itself eliminate verification prompts across computers.",
      "D": "A generic permission set is not the setting for trusted network ranges."
    },
    "notes": "Wording corrected: trusted network ranges reduce identity-verification challenges, not normal authentication or required MFA. Profile login IP ranges are a different control that can block access outside an allowed network.",
    "printed": "B",
    "source": {
      "stem": [
        "Service reps in a call center do not have assigned desks. They sit at any available desk and use the computer on that desk to access Salesforce. A Platform Administrator has been asked to streamline the login process so the reps do not have to authenticate each time they log in at a different computer.",
        {
          "ask": "Which function should the administrator use to implement this request?"
        }
      ],
      "choices": [
        "Custom Profile",
        "Trusted IP Ranges",
        "Multi-factor Authentication",
        "Permission Set"
      ],
      "answer": "B"
    },
    "repaired": true
  },
  {
    "id": 34,
    "section": "security",
    "stem": [
      "A user at Northern Trail Outfitters is having trouble logging in to Salesforce. The user's login history shows that this person has attempted to log in multiple times and has been locked out of the organization.",
      {
        "ask": "Which two user-record actions are available to help recover access after failed-password lockout? Select available actions, not a mandatory two-step sequence."
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Log in as the user to unlock the user and reset the password.",
      "Use the unlock button on the user's record detail page.",
      "Reset password on the user's record detail page.",
      "Reset the password policies to allow the user to login."
    ],
    "answer": "B,C",
    "type": "multi",
    "focus": "must",
    "group": "users",
    "why": "The User record offers Unlock and Reset Password. Either may be appropriate; a password reset can also unlock a user, so both are not necessarily required.",
    "wrong": {
      "A": "An administrator cannot solve the lockout by first logging in as the locked-out user.",
      "D": "Weakening organization-wide password policy is unnecessary and affects unrelated users."
    },
    "notes": "Check Login History before choosing a fix. Locked-out, frozen, inactive, expired-password, and IP-restricted users require different remedies. An unlock does not change the password.",
    "source": {
      "stem": [
        "A user at Northern Trail Outfitters is having trouble logging in to Salesforce. The user's login history shows that this person has attempted to log in multiple times and has been locked out of the organization.",
        {
          "ask": "Which two steps should a Platform Administrator take to help the user log in to Salesforce?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "Log in as the user to unlock the user and reset the password.",
        "Use the unlock button on the user's record detail page.",
        "Reset password on the user's record detail page.",
        "Reset the password policies to allow the user to login."
      ],
      "answer": "B,C"
    },
    "printed": "B,C",
    "repaired": true
  },
  {
    "id": 35,
    "section": "experience",
    "stem": [
      "Ursa Major Solar wants mobile users to see Top Opportunities in a Pinned Report card on their mobile landing experience. Users can be guided through choosing the report.",
      {
        "ask": "What should a Platform Administrator configure to achieve this?"
      }
    ],
    "choices": [
      "Add the Reports tab to the Salesforce mobile app.",
      "Enable Today for the Salesforce mobile app.",
      "Enable Mobile Home and have users select Top Opportunities in its Pinned Report card.",
      "Add the Dashboards tab to the Salesforce mobile app."
    ],
    "answer": "C",
    "focus": "high",
    "group": "experience",
    "why": "Mobile Home can present a pinned report so the user can see the chosen report from their mobile landing experience.",
    "wrong": {
      "A": "Adding Reports makes reports available in navigation but does not create the personalized report card.",
      "B": "Today is not the Mobile Home pinned-report configuration.",
      "D": "A Dashboards navigation item is different from the requested report landing experience."
    },
    "notes": [
      "Mobile Home is configurable and users can select the report on its Pinned Report card. Include Mobile Home in the appropriate app navigation and guide users through pinning Top Opportunities.",
      "Salesforce: https://help.salesforce.com/s/articleView?id=sf.salesforce_app_mobile_home.htm&language=en_US&type=5"
    ],
    "source": {
      "stem": [
        "Ursa Major Solar wants to roll out the Salesforce mobile app, and the first information it wants its users to see is the Top Opportunities report.",
        {
          "ask": "What should a Platform Administrator configure to achieve this?"
        }
      ],
      "choices": [
        "Add the Reports tab to the Salesforce mobile app.",
        "Enable Today for the Salesforce mobile app.",
        "Enable Mobile Home for the Salesforce mobile app.",
        "Add the Dashboards tab to the Salesforce mobile app."
      ],
      "answer": "C"
    },
    "printed": "C",
    "repaired": true
  },
  {
    "id": 36,
    "section": "sales",
    "stem": [
      "The Universal Containers sales team wants a visual way to manage their opportunity pipeline that allows them to see all deals at once, track progress through sales stages, and quickly move opportunities forward.",
      {
        "ask": "Which feature should a Platform Administrator recommend to meet these requirements?"
      }
    ],
    "choices": [
      "Set up opportunity reports with chart components and stage-based grouping.",
      "Create a custom dashboard with opportunity pipeline charts and stage metrics.",
      "Use the Kanban view for opportunities with card fields and drag-and-drop functionality.",
      "Configure opportunity list views with custom filters and summary fields."
    ],
    "answer": "C",
    "focus": "familiar",
    "group": "sales",
    "why": "Kanban displays opportunities as cards grouped by stage and supports moving eligible records between columns.",
    "wrong": {
      "A": "A report chart provides analysis rather than an editable drag-and-drop board.",
      "B": "A dashboard displays pipeline metrics but is not the interactive record board.",
      "D": "A normal list view provides rows; switching it to Kanban provides the requested board behavior."
    },
    "notes": "Kanban changes still respect permissions, required fields, and validation rules. Users cannot bypass stage restrictions simply by dragging a card."
  },
  {
    "id": 37,
    "section": "automation",
    "stem": [
      "Northern Trail Outfitters (NTO) wants to ensure new Contacts are validated before they can be saved. If a user selects that the LeadSource picklist value is Other, NTO also wants users to populate a custom text field called Source__c.",
      {
        "ask": "Which validation rule should a Platform Administrator configure to meet this requirement?"
      }
    ],
    "choices": [
      {
        "code": "AND(LeadSource = 'Other', Source__c = '')"
      },
      {
        "code": "AND(NOT(LeadSource = 'Other'), NOT(Source__c = ''))"
      },
      {
        "code": "AND(ISPICKVAL(LeadSource,'Other'), ISBLANK(Source__c))"
      },
      {
        "code": "AND(NOT(ISPICKVAL(LeadSource,'Other'))), NOT(ISBLANK(Source__c))"
      }
    ],
    "answer": "C",
    "focus": "must",
    "group": "validation",
    "why": "ISPICKVAL tests a picklist value and ISBLANK tests the text field; AND blocks a save only when both conditions are true.",
    "wrong": {
      "A": "Comparing a picklist directly to a string is not the supported formula pattern.",
      "B": "The negated conditions do not express “Other selected and Source__c blank.”",
      "D": "The negations invert the requirement, and the parentheses shown are invalid."
    },
    "notes": "Wording corrected: the validation rule requires users to enter Source__c; it does not automatically populate that field. The invalid state is LeadSource = Other and Source__c blank.",
    "printed": "C",
    "source": {
      "stem": [
        "Northern Trail Outfitters (NTO) wants to ensure new Contacts are validated before they can be saved. If a user selects that the LeadSource picklist value is Other, NTO also wants to populate a custom text field called Source__c.",
        {
          "ask": "Which validation rule should a Platform Administrator configure to meet this requirement?"
        }
      ],
      "choices": [
        {
          "code": "AND(LeadSource = 'Other', Source__c = '')"
        },
        {
          "code": "AND(NOT(LeadSource = 'Other'), NOT(Source__c = ''))"
        },
        {
          "code": "AND(ISPICKVAL(LeadSource,'Other'), ISBLANK(Source__c))"
        },
        {
          "code": "AND(NOT(ISPICKVAL(LeadSource,'Other'))), NOT(ISBLANK(Source__c))"
        }
      ],
      "answer": "C"
    },
    "repaired": true
  },
  {
    "id": 38,
    "section": "data",
    "stem": [
      "Cloud Kicks (CK) has a new Platform Administrator who is asked to put together a memo detailing Salesforce usage to budget for upcoming license purchases.",
      {
        "ask": "Where should the administrator go to find out what type of licenses CK has purchased and how many are available?"
      }
    ],
    "choices": [
      "Usage-based entitlements related list in company information",
      "Search for licenses types in setup",
      "User licenses related list in company information",
      "User management settings in setup"
    ],
    "answer": "C",
    "focus": "must",
    "group": "users",
    "why": "Company Information shows purchased and available user licenses in the User Licenses related list.",
    "wrong": {
      "A": "Usage-based entitlements represent metered allocations rather than the inventory of user licenses.",
      "B": "A broad setup search is not the specific license inventory page.",
      "D": "User Management Settings controls behavior, not the purchased-license totals."
    },
    "notes": "Separate user licenses, feature licenses, and permission-set licenses. A permission set grants supported permissions but cannot supply capabilities excluded by the user’s license."
  },
  {
    "id": 39,
    "section": "sales",
    "stem": [
      "A manager wants the sales team to update their opportunities on a regular basis.",
      {
        "ask": "Which feature should a Platform Administrator implement to help with this?"
      }
    ],
    "choices": [
      "Similar Opportunities",
      "Opportunity Update Reminders",
      "Big Deal Alerts",
      "Scheduled Reports"
    ],
    "answer": "B",
    "focus": "familiar",
    "group": "sales",
    "why": "Opportunity Update Reminders are the listed sales-management feature for prompting regular opportunity updates.",
    "wrong": {
      "A": "Similar Opportunities helps compare deals rather than sends update reminders.",
      "C": "Big Deal Alerts apply to large-deal thresholds, not routine update cadence.",
      "D": "Scheduled reports distribute information and do not provide the same purpose-built update reminder workflow."
    },
    "notes": "This is a feature-specific legacy-style question. In a live org, also consider current sales-productivity capabilities and flow-based reminders; verify availability in that edition and interface."
  },
  {
    "id": 40,
    "section": "service",
    "stem": [
      "Assume the existing profiles already provide the app/object permissions, and the purchased support entitlement is assigned through the Service Cloud User checkbox.",
      "Cloud Kicks has been seeing exponential growth and will be hiring an additional 10 sales reps and 15 support reps to its teams. The support team will need access to the Service Console to manage cases. A Platform Administrator will be assigning the users to existing custom sales and support profiles.",
      {
        "ask": "How should the administrator ensure the support reps have the appropriate access to the console?"
      }
    ],
    "choices": [
      "Enable the Service Cloud User feature license for the support reps on the User Detail page.",
      "Create a permission set for the Service Console and assign it to the support reps.",
      "Build a Service Console using Lightning App Builder for the custom service profile.",
      "Assign the Salesforce Platform User License to the support reps."
    ],
    "answer": "A",
    "focus": "high",
    "group": "users",
    "why": "The Service Cloud User feature license is the listed user-level entitlement relevant to the service-console scenario.",
    "wrong": {
      "B": "A permission set cannot replace a required feature or user license.",
      "C": "Building pages does not grant a user the underlying product entitlement.",
      "D": "A Salesforce Platform user license alone does not supply the support entitlement in this scenario. Some products offer separate console add-ons; that is a different licensing configuration."
    },
    "notes": [
      "Licenses, app assignment, and permissions all contribute to access. The checkbox alone is not a universal guarantee of every console feature; validate the organization’s current SKU and console configuration.",
      "Feature-license assignment: https://help.salesforce.com/s/articleView?id=service.console2_assign_service_feature_license.htm&language=en_US"
    ],
    "source": {
      "stem": [
        "Cloud Kicks has been seeing exponential growth and will be hiring an additional 10 sales reps and 15 support reps to its teams. The support team will need access to the Service Console to manage cases. A Platform Administrator will be assigning the users to existing custom sales and support profiles.",
        {
          "ask": "How should the administrator ensure the support reps have the appropriate access to the console?"
        }
      ],
      "choices": [
        "Enable the Service Cloud User feature license for the support reps on the User Detail page.",
        "Create a permission set for the Service Console and assign it to the support reps.",
        "Build a Service Console using Lightning App Builder for the custom service profile.",
        "Assign the Salesforce Platform User License to the support reps."
      ],
      "answer": "A"
    },
    "printed": "A",
    "repaired": true
  },
  {
    "id": 41,
    "section": "automation",
    "stem": [
      "Northern Trail Outfitters wants to initiate expense reports from Salesforce to the external HR system. Managers and directors need to review this process.",
      {
        "ask": "Which two tools should a Platform Administrator configure?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Outbound Message",
      "Email Alert Action",
      "Quick Action",
      "Approval Process"
    ],
    "answer": "A,D",
    "type": "multi",
    "focus": "high",
    "group": "approvals",
    "why": "An approval process supplies the human review and an outbound message can send the approved record information to an external endpoint.",
    "wrong": {
      "B": "An email alert sends email rather than a structured outbound integration message.",
      "C": "A quick action starts an interaction but does not implement the approval chain or outbound integration by itself."
    },
    "notes": "Classic outbound messages use a defined SOAP payload and delivery mechanism; they are not arbitrary REST callouts. Modern implementations can combine Flow, approvals, and supported integration actions."
  },
  {
    "id": 42,
    "section": "agentforce",
    "stem": [
      "Customer data is fragmented across systems. The proposed Agentforce design explicitly requires a unified customer profile for grounding.",
      {
        "ask": "Which listed platform should the administrator configure to unify those customer data sources?"
      }
    ],
    "choices": [
      "Activate Email-to-Case for the agent.",
      "Configure a new Service Console layout.",
      "Data Cloud (Data 360)",
      "Create new user profiles for the agent."
    ],
    "answer": "C",
    "focus": "high",
    "group": "agent-trust",
    "why": "Of the listed choices, Data Cloud addresses unified customer data and grounding for a complete customer view.",
    "wrong": {
      "A": "Email-to-Case creates service records but does not unify all customer information.",
      "B": "A console layout arranges the UI rather than integrates customer data.",
      "D": "New profiles alone cannot make fragmented customer data complete or accurate."
    },
    "notes": "Do not memorize “Data Cloud is mandatory for every Agentforce use case.” Requirements vary by feature and grounding source. This question emphasizes a complete customer data view rather than a universal activation prerequisite.",
    "source": {
      "stem": [
        "A Platform Administrator needs to enable Agentforce for the service team.",
        {
          "ask": "What is the most critical prerequisite for ensuring the Service Agents have a complete and accurate view of their customers?"
        }
      ],
      "choices": [
        "Activate Email-to-Case for the agent.",
        "Configure a new Service Console layout.",
        "Verify Data Cloud is implemented.",
        "Create new user profiles for the agent."
      ],
      "answer": "C"
    },
    "printed": "C",
    "repaired": true
  },
  {
    "id": 43,
    "section": "automation",
    "stem": [
      "DreamHouse Realty has an approval process. A manager attempts to approve a record but receives an error.",
      {
        "ask": "What should a Platform Administrator do to troubleshoot this issue?"
      }
    ],
    "choices": [
      "Check if the user in the next approver is inactive or missing.",
      "Review the page layout to ensure the fields updated in the process are visible.",
      "Update the field-level security to view on fields that are updated in the process.",
      "Add a delegated approver for the next approver in the process."
    ],
    "answer": "A",
    "focus": "high",
    "group": "approvals",
    "why": "An inactive or missing next approver can prevent an approval request from advancing to its next step.",
    "wrong": {
      "B": "Page-layout visibility is not the main explanation for an invalid next approver.",
      "C": "Field visibility does not resolve a missing or inactive approval recipient.",
      "D": "Adding a delegate without checking the routing configuration does not fix every inactive-approver error."
    },
    "notes": "Read the exact approval error and inspect the next step’s routing. Delegated approval is useful only when the configured process permits it and the designated substitute is valid."
  },
  {
    "id": 44,
    "section": "service",
    "stem": [
      "Ursa Major Solar wants to automatically notify a manager about any cases awaiting a response from an agent for more than 2 hours after case creation.",
      {
        "ask": "Which feature should a Platform Administrator use to fulfill this requirement?"
      }
    ],
    "choices": [
      "Assignment Rule",
      "Case Escalation Rule",
      "Formula field",
      "Omni-Channel Supervisor"
    ],
    "answer": "B",
    "focus": "familiar",
    "group": "service",
    "why": "An escalation rule can monitor case age and send the manager a notification when the two-hour condition is met.",
    "wrong": {
      "A": "Assignment rules select an owner rather than monitor an unanswered case’s age.",
      "C": "A formula cannot send the notification by itself.",
      "D": "Omni-Channel Supervisor monitors routing and workload but is not the specified timed notification rule."
    },
    "notes": "Define what “awaiting a response” means in case criteria. A timer alone cannot tell whether a meaningful agent response occurred unless the relevant status or fields are maintained."
  },
  {
    "id": 45,
    "section": "security",
    "stem": [
      "A Platform Administrator at Universal Containers is asked to restrict login access for users to specific hours and specific IP addresses to help minimize the risk of bad actors getting into the org.",
      {
        "ask": "Which setting should the administrator update to accomplish this?"
      }
    ],
    "choices": [
      "Company Settings",
      "The user's role",
      "The user's profile",
      "Custom permission sets"
    ],
    "answer": "C",
    "focus": "must",
    "group": "users",
    "why": "Profile login hours and login IP ranges restrict when and from which networks a user can log in.",
    "wrong": {
      "A": "Organization-wide company settings are not the per-profile controls asked for.",
      "B": "Roles govern record visibility, not login hours and IP restrictions.",
      "D": "Permission sets do not define profile login-hour or login-IP restrictions."
    },
    "notes": "Trusted network IP ranges reduce identity-verification challenges; profile login IP ranges restrict access. Those are different mechanisms with different security effects."
  },
  {
    "id": 46,
    "section": "agentforce",
    "stem": [
      {
        "ask": "Which task is especially suited for Agentforce?"
      }
    ],
    "choices": [
      "Single-step predefined processes",
      "Static document generation",
      "Multi-step processes that need adaption to change",
      "Tasks without decision-making"
    ],
    "answer": "C",
    "focus": "high",
    "group": "agent-actions",
    "why": "Agentforce fits multi-step work where the reasoning engine must choose actions and adapt to changing conversational context.",
    "wrong": {
      "A": "A fixed one-step task often fits simpler deterministic automation.",
      "B": "Static document generation alone does not require an adaptive agent.",
      "D": "A task with no decisions gains little from an agentic reasoning loop."
    },
    "notes": "An agent still needs explicit scope, grounded data, permissions, and executable actions. Use deterministic automation for rules that must always produce a fixed outcome."
  },
  {
    "id": 47,
    "section": "experience",
    "stem": [
      "DreamHouse Realty (DHR) wants a templated process with a mortgage calculator that generates leads for loans. DHR needs to complete the project within 30 days and has maxed out its budget for the year.",
      {
        "ask": "Which AppExchange item should help a Platform Administrator meet the request?"
      }
    ],
    "choices": [
      "Bolt Solutions",
      "Lightning Community",
      "Lightning Data",
      "Flow Solutions"
    ],
    "answer": "D",
    "focus": "familiar",
    "group": "platform",
    "why": "Flow solutions can provide prebuilt process templates or components suited to assembling the guided calculation-and-lead workflow quickly.",
    "wrong": {
      "A": "Bolt solutions focus on packaged industry or experience solutions rather than the most direct flow-process starting point.",
      "B": "A Lightning Community alone is a site experience, not the required mortgage process.",
      "C": "Lightning Data enriches data and does not supply the guided process."
    },
    "notes": "The source uses older AppExchange category names. Evaluate the actual package capabilities, costs, supported edition, and flow dependencies before assuming a template fits the deadline and budget."
  },
  {
    "id": 48,
    "section": "sales",
    "stem": [
      "A sales manager at DreamHouse Realty wants sales users to have a quick way to view and update the opportunities in their pipeline expected to close in the next 90 days.",
      {
        "ask": "What should a Platform Administrator do to accomplish this request?"
      }
    ],
    "choices": [
      "Create a custom report and schedule the sales users to receive it each day as a reminder to update their opportunities.",
      "Make a new Sales dashboard and add a component that shows all opportunities that meet the criteria.",
      "Enable Sales Console and show users how to open a tab for each opportunity in the pipeline that meets the requirements.",
      "Create a list view on the Opportunity object and recommend users switch the view to Kanban to edit by drag and drop."
    ],
    "answer": "D",
    "focus": "high",
    "group": "sales",
    "why": "A filtered Opportunity list view in Kanban offers an interactive view of deals closing in the next ninety days.",
    "wrong": {
      "A": "A daily report is useful for monitoring but not the quickest interactive board for editing deals.",
      "B": "A dashboard visualizes the pipeline rather than provides the same direct record-board edits.",
      "C": "Opening console tabs does not create the requested filtered pipeline view."
    },
    "notes": "Set Close Date criteria on the list and then switch to Kanban. Record access, stage validation, and field requirements continue to apply."
  },
  {
    "id": 49,
    "section": "data",
    "stem": [
      "A Platform Administrator at Cloud Kicks has a custom picklist field on Lead, which is missing on the Contact when leads are converted.",
      {
        "ask": "Which two steps should the administrator take to ensure these values are populated?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Update the picklist value with a validation rule.",
      "Create a custom picklist field on Contact.",
      "Map the picklist field on the Lead to the Contact.",
      "Set the picklist field to be required on the Lead object."
    ],
    "answer": "B,C",
    "type": "multi",
    "focus": "must",
    "group": "model",
    "why": "Create a compatible target custom field on Contact, then map the custom Lead field to it for conversion.",
    "wrong": {
      "A": "A validation rule checks data but cannot create a missing target field or conversion mapping.",
      "D": "Making the Lead field required does not determine where its value goes on conversion."
    },
    "notes": "Custom lead-field mappings are separate from page layouts and requiredness. Check compatible field types, lengths, and picklist values so conversion can populate the target successfully."
  },
  {
    "id": 50,
    "section": "analytics",
    "stem": [
      "Users at DreamHouse Realty are only allowed to see opportunities they own. Leadership wants an enterprise-wide dashboard of all open opportunities in the pipeline so that users can see how the company is performing at any point in time.",
      {
        "ask": "How should a Platform Administrator create the dashboard without changing any sharing settings?"
      }
    ],
    "choices": [
      "Create a dashboard with the running user set as someone who can see all opportunities.",
      "Add a filter to the dashboard to filter the opportunities by owner role.",
      "Build individual dashboards for profiles that need to see the enterprise results.",
      "Update the dashboard folder settings to manager for the sales reps role."
    ],
    "answer": "A",
    "focus": "must",
    "group": "analytics",
    "why": "A fixed running user with broad opportunity access can display an aggregate enterprise-wide dashboard without changing viewers’ record sharing.",
    "wrong": {
      "B": "An owner-role filter narrows data; it does not establish a broader running-user access context.",
      "C": "Separate dashboards do not automatically solve the data-access context problem.",
      "D": "Folder access controls who can open the dashboard, not which opportunity rows its running user can access."
    },
    "notes": "This intentionally exposes aggregate results using another user’s visibility. Choose that user carefully and review confidential metrics. A dynamic dashboard instead uses each viewer’s own record access."
  },
  {
    "id": 51,
    "section": "experience",
    "stem": [
      "The client services and customer support teams share the same profile but have different permission sets. The custom object Retention related list needs to be restricted to the client services team on the Lightning record page layout.",
      {
        "ask": "What should a Platform Administrator use to fulfill this request?"
      }
    ],
    "choices": [
      "Page Layout Assignment",
      "Component Visibility",
      "Record Type Assignment",
      "Sharing Settings"
    ],
    "answer": "B",
    "focus": "high",
    "group": "experience",
    "why": "Lightning component visibility rules can conditionally show the related list based on supported user criteria such as a custom permission.",
    "wrong": {
      "A": "Page-layout assignment is based on profile and record type, so it cannot by itself distinguish these same-profile teams.",
      "C": "Record-type assignment does not directly provide the requested per-component visibility rule.",
      "D": "Sharing governs record access; it does not conditionally place a Lightning component on the page."
    },
    "notes": "Grant a custom permission through the client-services permission set and filter the component on that permission. Hiding a component is not a substitute for securing sensitive records and fields."
  },
  {
    "id": 52,
    "section": "sales",
    "stem": [
      "The sales director at Cloud Kicks wants to be able to predict upcoming revenue in the next several fiscal quarters so they can set goals and benchmark how reps are performing.",
      {
        "ask": "Which two features should a Platform Administrator configure?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Sales Quotes",
      "Forecasting",
      "Opportunity List View",
      "Opportunity Stages"
    ],
    "answer": "B,D",
    "type": "multi",
    "focus": "high",
    "group": "sales",
    "why": "Forecasting projects revenue, while opportunity stages supply pipeline progression and forecast-related classification.",
    "wrong": {
      "A": "Quotes document commercial proposals; they are not the main revenue forecasting engine.",
      "C": "A list view displays selected opportunities without implementing the forecasting feature."
    },
    "notes": "Reliable forecasts depend on accurate amounts, close dates, stages, forecast categories, and the forecast hierarchy. Forecast configuration does not repair poor opportunity data automatically."
  },
  {
    "id": 53,
    "section": "agentforce",
    "stem": [
      "A new agent is being developed to help customer service reps process customer requests for a replacement product. The agent needs to call an action that takes two inputs:",
      "productId: An 18 character ID for the product being replaced",
      "reasonCode: A three-digit code representing the reason for the replacement",
      {
        "ask": "Which set of agent instructions should a Platform Administrator use for these inputs, according to best practices for Agentforce instructions?"
      }
    ],
    "choices": [
      "Instructions for productId: 'The 18 character ID of the product.' Instructions for reasonCode: 'A numerical code.'",
      "Instructions for productId: 'The product ID. Retrieve this from the conversation history or the user's input.' Instructions for reasonCode: 'The three-digit replacement reason. This is required when the product ID is present.'",
      "Instructions for productId: 'ID from the product record.' Instructions for reasonCode: 'Code for the reason.'",
      "Instructions for productId: 'The 18 character ID of the product. Retrieve this from the conversation history or the user's input. Required.' Instructions for reasonCode: 'A three-digit code that specifies the reason for replacement. This is required only when the product ID is present.'"
    ],
    "answer": "D",
    "focus": "high",
    "group": "agent-actions",
    "why": "D states the input formats, where productId comes from, and when reasonCode is required, giving the agent actionable input guidance.",
    "wrong": {
      "A": "“A numerical code” omits the required format and retrieval context.",
      "B": "The product ID description omits the stated eighteen-character format.",
      "C": "The descriptions are too vague to guide reliable collection of the required inputs."
    },
    "notes": "Specify meaning, format, source, and conditional requirements for each input. The action must still validate the ID, allowed reason codes, authorization, and business rules before changing data."
  },
  {
    "id": 54,
    "section": "security",
    "stem": [
      "One of the sales managers at Universal Containers will be going on leave for several months. The executives want to make sure the sales manager does not log in to Salesforce while on leave.",
      {
        "ask": "What should a Platform Administrator do to ensure the user is not able to log in while on leave?"
      }
    ],
    "choices": [
      "Reassign the user's license during leave.",
      "Change the Login Hours for the profile.",
      "Freeze the user's account.",
      "Restrict Login IP Addresses for the profile."
    ],
    "answer": "C",
    "focus": "must",
    "group": "users",
    "why": "Freezing blocks the user from logging in while preserving the active user and license assignment for temporary leave.",
    "wrong": {
      "A": "Reassigning the license is not the standard temporary login-blocking operation.",
      "B": "Changing shared profile login hours can affect other users.",
      "D": "Profile IP restrictions target networks and can affect colleagues using the same profile."
    },
    "notes": "Freeze and deactivate are different. Freezing does not free a user license; deactivation does. Freezing is useful while investigating dependencies that prevent immediate deactivation."
  },
  {
    "id": 55,
    "section": "security",
    "stem": [
      "A Platform Administrator for Cloud Kicks needs to ensure that only the financial records belonging to each individual user are visible on the report in order to meet scope of the data privacy requirements.",
      {
        "ask": "Which organization-wide sharing baseline should the administrator start with, before auditing hierarchy access, additional sharing, and elevated permissions?"
      }
    ],
    "choices": [
      "Set sharing model as Public Read/Write for the respective object(s).",
      "Set sharing model as Private for the respective object(s).",
      "Create multiple reports, each filtered to show records owned by each user.",
      "Use Apex sharing to hide records."
    ],
    "answer": "B",
    "focus": "high",
    "group": "security",
    "why": "Private organization-wide defaults provide a restrictive record-access baseline for the financial object.",
    "wrong": {
      "A": "Public Read/Write exposes records broadly and violates the privacy goal.",
      "C": "A report filter can be changed and does not secure the underlying records.",
      "D": "Sharing mechanisms generally grant access; Apex sharing is not a way to subtract existing access."
    },
    "notes": "Private defaults alone do not guarantee owner-only visibility for every user: hierarchy, sharing, teams, and elevated permissions can still grant access. Audit those paths against the actual privacy requirement.",
    "source": {
      "stem": [
        "A Platform Administrator for Cloud Kicks needs to ensure that only the financial records belonging to each individual user are visible on the report in order to meet scope of the data privacy requirements.",
        {
          "ask": "How should the administrator achieve this?"
        }
      ],
      "choices": [
        "Set sharing model as Public Read/Write for the respective object(s).",
        "Set sharing model as Private for the respective object(s).",
        "Create multiple reports, each filtered to show records owned by each user.",
        "Use Apex sharing to hide records."
      ],
      "answer": "B"
    },
    "printed": "B",
    "repaired": true
  },
  {
    "id": 56,
    "section": "data",
    "stem": [
      {
        "ask": "What are three characteristics of a master-detail relationship?"
      },
      {
        "ask": "Choose 3 answers"
      }
    ],
    "choices": [
      "Permissions for the detail record are set independently of the master.",
      "The master object can be a standard or custom object.",
      "Roll-up summaries are supported in master-detail relationships.",
      "Detail records inherit ownership from their master; they have no independently assignable owner.",
      "Each object can have up to five master-detail relationships."
    ],
    "answer": "B,C,D",
    "type": "multi",
    "focus": "familiar",
    "group": "model",
    "why": "The three valid characteristics are a standard or custom master, native roll-up summaries, and detail ownership inherited from the master.",
    "wrong": {
      "A": "Detail record access is controlled through its master rather than independent ownership-based sharing.",
      "E": "The normal limit is two master-detail relationship fields on a custom object, not five."
    },
    "notes": "This repeats Question 17 with the choices reordered. Relearn the relationship behavior rather than memorizing the letters: the correct letters change while the underlying concepts do not.",
    "source": {
      "stem": [
        {
          "ask": "What are three characteristics of a master-detail relationship?"
        },
        {
          "ask": "Choose 3 answers"
        }
      ],
      "choices": [
        "Permissions for the detail record are set independently of the master.",
        "The master object can be a standard or custom object.",
        "Roll-up summaries are supported in master-detail relationships.",
        "The owner field on the detail records is the owner of the master record.",
        "Each object can have up to five master-detail relationships."
      ],
      "answer": "B,C,D"
    },
    "printed": "B,C,D",
    "repaired": true
  },
  {
    "id": 57,
    "section": "service",
    "stem": [
      "Cloud Kicks wants to ensure that every client has support based on the level of service that has been agreed on in the sales cycle. There are tiers to this support model, Gold, Silver, and Bronze.",
      {
        "ask": "What should a Platform Administrator create to ensure that this is part of every client's account once they become a client?"
      }
    ],
    "choices": [
      "A flow to assign Entitlements",
      "Routing Configuration for each client",
      "Email to Case for each service level",
      "Case Assignment Rules for each client"
    ],
    "answer": "A",
    "focus": "high",
    "group": "service",
    "why": "A flow can assign the appropriate entitlement so a customer’s agreed support tier is applied consistently.",
    "wrong": {
      "B": "Routing configuration controls work distribution and is not the customer’s service entitlement.",
      "C": "Email-to-Case creates cases; it does not define Gold, Silver, or Bronze support eligibility.",
      "D": "Assignment rules choose owners and do not represent contracted support terms."
    },
    "notes": "An entitlement represents support eligibility; an entitlement process and milestones measure delivery obligations. Determine whether the entitlement belongs on the account, contact, asset, or service contract for the organization’s design."
  },
  {
    "id": 58,
    "section": "data",
    "stem": [
      {
        "ask": "Which two data loss considerations should a Platform Administrator keep in mind when changing a custom field type from Text to Picklist?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Auto updates will be made to Visualforce references to prevent data loss.",
      "If the conversion causes data loss, list views based on the field can be deleted.",
      "There will be no data loss with use of a global value set.",
      "Assignment and escalation rules may be affected."
    ],
    "answer": "B,D",
    "type": "multi",
    "focus": "familiar",
    "group": "model",
    "why": "Text-to-Picklist conversion can cause data loss; if data is lost, dependent list views can be deleted and assignment or escalation rules can be affected.",
    "wrong": {
      "A": "Visualforce references are not universally rewritten automatically during field conversion.",
      "C": "A global value set is not a guarantee that every conversion and dependent feature is safe."
    },
    "notes": [
      "Back up data and inspect field-conversion warnings. The list-view and rule effects are conditional on the conversion and data-loss scenario, not a promise that every conversion deletes all views.",
      "Salesforce: https://help.salesforce.com/s/articleView?id=platform.notes_on_changing_custom_field_types.htm&language=en_US"
    ],
    "source": {
      "stem": [
        {
          "ask": "Which two data loss considerations should a Platform Administrator keep in mind when changing a custom field type from Text to Picklist?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "Auto updates will be made to Visualforce references to prevent data loss.",
        "Any list view based on the custom field is deleted.",
        "There will be no data loss with use of a global value set.",
        "Assignment and escalation rules may be affected."
      ],
      "answer": "B,D"
    },
    "printed": "B,D",
    "repaired": true
  },
  {
    "id": 59,
    "section": "experience",
    "stem": [
      {
        "ask": "Cloud Kicks is working on a rebrand. In which two areas of the Salesforce mobile app can a Platform Administrator customize the branding?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Individual record field text color",
      "Record background color",
      "Loading page logo",
      "Header background color"
    ],
    "answer": "C,D",
    "type": "multi",
    "focus": "familiar",
    "group": "experience",
    "why": "The loading-page logo and header background color are supported standard Salesforce mobile branding customizations.",
    "wrong": {
      "A": "Per-field text colors on individual record pages are not a standard mobile branding setting.",
      "B": "Record background color is not the standard mobile branding setting requested."
    },
    "notes": [
      "Option A corrected: the source offered two overlapping names for header color. Replacing one with an unsupported per-field text-color setting leaves C and D as a clear two-answer question.",
      "Salesforce: https://help.salesforce.com/s/articleView?id=salesforce_app_customize_branding.htm&language=en_US&type=0"
    ],
    "printed": "C,D",
    "source": {
      "stem": [
        {
          "ask": "Cloud Kicks is working on a rebrand. In which two areas of the Salesforce mobile app can a Platform Administrator customize the branding?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "App header color",
        "Record background color",
        "Loading page logo",
        "Header background color"
      ],
      "answer": "C,D"
    },
    "repaired": true
  },
  {
    "id": 60,
    "section": "data",
    "stem": [
      "A sales rep has a list of 300 accounts with contacts that they want to load at one time.",
      {
        "ask": "Which built-in guided import tool is the simplest fit for these supported Account and Contact records?"
      }
    ],
    "choices": [
      "Manual Import",
      "Data Import Wizard",
      "Dataloader.io",
      "Data Loader"
    ],
    "answer": "B",
    "focus": "high",
    "group": "data",
    "why": "Data Import Wizard supports a guided import of accounts and contacts and easily accommodates a three-hundred-record file.",
    "wrong": {
      "A": "Manual entry is slow and unnecessarily error-prone for three hundred accounts and contacts.",
      "C": "Dataloader.io is not the built-in guided import wizard requested by this scenario.",
      "D": "Data Loader can perform imports, but the guided wizard is the simpler fit here."
    },
    "notes": "The alternatives are not all incapable of importing. Choose the simplest appropriate supported tool. Check matching rules, field mapping, ownership, and duplicate handling before importing.",
    "source": {
      "stem": [
        "A sales rep has a list of 300 accounts with contacts that they want to load at one time.",
        {
          "ask": "Which tool should a Platform Administrator utilize to import the records to Salesforce?"
        }
      ],
      "choices": [
        "Manual Import",
        "Data Import Wizard",
        "Dataloader.io",
        "Data Loader"
      ],
      "answer": "B"
    },
    "printed": "B",
    "repaired": true
  },
  {
    "id": 61,
    "section": "experience",
    "stem": [
      "Users at Cloud Kicks want to see information that is more useful for their role on the Case page.",
      {
        "ask": "How should a Platform Administrator make the pages more dynamic and easier to use?"
      }
    ],
    "choices": [
      "Add component visibility filters to the components.",
      "Include more tab components with filters.",
      "Remove fields from the record details component.",
      "Delete the extra components from the page."
    ],
    "answer": "A",
    "focus": "high",
    "group": "experience",
    "why": "Component visibility filters show components only when their configured record, user, or context criteria are met.",
    "wrong": {
      "B": "Adding more tabs alone does not conditionally tailor content to user context.",
      "C": "Removing fields permanently does not make the page context-sensitive.",
      "D": "Deleting components is a static simplification, not dynamic visibility."
    },
    "notes": "Keep essential information visible by default and hide irrelevant components conditionally. Visibility is a presentation rule; use object permissions, sharing, and field-level security for actual data protection."
  },
  {
    "id": 62,
    "section": "automation",
    "stem": [
      "Use a classic approval configuration for this record review; Flow Orchestration is outside the chosen design. Assume the criteria can be implemented within the process's step and routing limits.",
      "A Platform Administrator at Cloud Kicks received a request from the head of sales operations to create a process in which opportunities must be validated by specific team leaders based on a mix of criteria. When the administrator analysed the list of criteria, they found that there were 30 potential sets of criteria that would identify the proper person to route the request to.",
      {
        "ask": "How should the administrator fulfill this request?"
      }
    ],
    "choices": [
      "Create a button on the opportunity that brings up an email template to send to the correct leader.",
      "Create an approval process with specific entry criteria and approval steps for each of the sets of criteria specified.",
      "Create a record triggered flow orchestration to properly route the requests.",
      "Use a screen flow to allow the seller to input the criteria in a form that is then sent to the appropriate leader."
    ],
    "answer": "B",
    "focus": "high",
    "group": "approvals",
    "why": "An approval process can use entry and step criteria to select the appropriate approver for different business conditions.",
    "wrong": {
      "A": "Emailing a template does not implement controlled approval routing and tracking.",
      "C": "Flow Orchestration may support complex processes, but the stated approval requirement can use approval criteria and steps.",
      "D": "A screen flow that collects criteria does not by itself define the required approval chain."
    },
    "notes": "Review classic approval limits and branching requirements before implementing thirty criteria sets. A long list of conditions does not automatically require code or make one particular architecture appropriate for every org.",
    "source": {
      "stem": [
        "A Platform Administrator at Cloud Kicks received a request from the head of sales operations to create a process in which opportunities must be validated by specific team leaders based on a mix of criteria. When the administrator analysed the list of criteria, they found that there were 30 potential sets of criteria that would identify the proper person to route the request to.",
        {
          "ask": "How should the administrator fulfill this request?"
        }
      ],
      "choices": [
        "Create a button on the opportunity that brings up an email template to send to the correct leader.",
        "Create an approval process with specific entry criteria and approval steps for each of the sets of criteria specified.",
        "Create a record triggered flow orchestration to properly route the requests.",
        "Use a screen flow to allow the seller to input the criteria in a form that is then sent to the appropriate leader."
      ],
      "answer": "B"
    },
    "printed": "B",
    "repaired": true
  },
  {
    "id": 63,
    "section": "service",
    "stem": [
      "Ursa Major Solar has its business hours set from 9:00 AM to 5:00 PM for the reps that are on Pacific Time. The reps on Eastern Time need business hours set to start 3 hours earlier to cover for support.",
      {
        "ask": "How should a Platform Administrator solve for this issue?"
      }
    ],
    "choices": [
      "Adjust the current business hours to accommodate the Eastern time zone.",
      "Allow the reps to set business hours manually.",
      "Set temporary business hours for each time zone.",
      "Create one set of business hours per time zone."
    ],
    "answer": "D",
    "focus": "high",
    "group": "service",
    "why": "Separate business-hours records model support schedules in the appropriate time zones.",
    "wrong": {
      "A": "Changing the existing schedule would also affect the Pacific team.",
      "B": "Business hours are administered centrally rather than separately invented by each rep.",
      "C": "Temporary schedules do not provide a maintainable ongoing configuration for both teams."
    },
    "notes": "Business hours specify a time zone and working intervals; holidays are configured separately. Associate the correct schedule with the relevant support or entitlement process."
  },
  {
    "id": 64,
    "section": "data",
    "stem": [
      "A sales rep has left the company, and a Platform Administrator has been asked to re-assign all their accounts and opportunities to a new sales rep and keep the team as is.",
      {
        "ask": "Which tool should the administrator use to accomplish this?"
      }
    ],
    "choices": [
      "Data Loader",
      "Dataloader.io",
      "Mass Transfer Records",
      "Data Import Wizard"
    ],
    "answer": "C",
    "focus": "high",
    "group": "data",
    "why": "Mass Transfer Records provides an administrator workflow for transferring supported account records and related opportunities.",
    "wrong": {
      "A": "Data Loader can update owners, but requires more care to reproduce the related-record and team transfer options.",
      "B": "Dataloader.io is an external data tool rather than the built-in mass-transfer workflow.",
      "D": "Data Import Wizard is not the built-in mass-transfer interface."
    },
    "notes": [
      "Review related-record and Keep Account Team options rather than assuming every transfer preserves all teams. Test ownership changes and resulting record access before a large transfer.",
      "Select Keep Account Team and Keep Opportunity Team on all opportunities as appropriate, and review which open/closed opportunities transfer. Mass Transfer handles at most 250 selected records per operation. Reference: https://help.salesforce.com/s/articleView?id=admin_transfer.htm&language=en_US&type=5"
    ],
    "source": {
      "stem": [
        "A sales rep has left the company, and a Platform Administrator has been asked to re-assign all their accounts and opportunities to a new sales rep and keep the team as is.",
        {
          "ask": "Which tool should the administrator use to accomplish this?"
        }
      ],
      "choices": [
        "Data Loader",
        "Dataloader.io",
        "Mass Transfer Records",
        "Data Import Wizard"
      ],
      "answer": "C"
    },
    "printed": "C"
  },
  {
    "id": 65,
    "section": "automation",
    "stem": [
      "Northern Trail Outfitters has a new flow that automatically sets field values when a new account is created. The flow is launched by a process, but the flow is not working properly.",
      {
        "ask": "What should a Platform Administrator do to identify the problem?"
      }
    ],
    "choices": [
      "View the Setup Audit Trail and review for errors.",
      "Set up email logs and review the send error logs.",
      "Use the native debug feature in Flow Builder.",
      "Review debug logs with the flow logging level."
    ],
    "answer": "C",
    "focus": "must",
    "group": "flows",
    "why": "Flow Builder’s Debug tool runs a flow with test inputs and shows the path and variable values that explain the failure.",
    "wrong": {
      "A": "Setup Audit Trail records setup changes rather than the flow execution path.",
      "B": "Email logs are not the primary diagnostic for field-update logic.",
      "D": "Debug logs can help, but the native Flow Debug tool is the direct first step offered here."
    },
    "notes": "Use representative input records and an appropriate debug context. Rollback/debug options and execution behavior vary by flow type; an isolated successful run does not prove the invoking process supplies the right inputs."
  },
  {
    "id": 66,
    "section": "analytics",
    "stem": [
      "A sales rep wants to be able to categorize multiple picklist values into a single value on a report.",
      {
        "ask": "Which option should a Platform Administrator suggest to the sales rep to accomplish this?"
      }
    ],
    "choices": [
      "Bucket Column",
      "Unique Count",
      "Report Filter",
      "Chart"
    ],
    "answer": "A",
    "focus": "high",
    "group": "analytics",
    "why": "A bucket column groups several existing field values into report-specific categories without changing stored records.",
    "wrong": {
      "B": "Unique Count counts distinct values rather than combines them into categories.",
      "C": "A filter includes or excludes rows rather than maps values into groups.",
      "D": "A chart visualizes data after categorization; it does not define the bucket mapping."
    },
    "notes": "Buckets belong to a report and are useful for ad hoc categories. Use a real field or formula when the classification must drive automation, integrations, or consistent cross-report business rules."
  },
  {
    "id": 67,
    "section": "sales",
    "stem": [
      "Sales managers would like to know what could be implemented to surface important values based on the stage of the opportunity?",
      {
        "ask": "Which tool should a Platform Administrator use to meet this requirement?"
      }
    ],
    "choices": [
      "Workflow Rules",
      "Path Key Fields",
      "Opportunity Processes",
      "Dynamic Forms"
    ],
    "answer": "B",
    "focus": "high",
    "group": "sales",
    "why": "Path key fields surface the most important fields for the selected opportunity stage.",
    "wrong": {
      "A": "Workflow rules automate changes but do not define the Path’s stage-specific key fields.",
      "C": "A sales process selects available stages; it does not itself define Path key-field guidance.",
      "D": "Dynamic Forms can conditionally display fields, but Path Key Fields is the direct stage-guidance feature."
    },
    "notes": "Use key fields for concise stage-specific emphasis and Guidance for Success for instructions. Path does not make a field universally required or prevent users from bypassing guidance."
  },
  {
    "id": 68,
    "section": "experience",
    "stem": [
      {
        "ask": "Which two solutions is a Platform Administrator able to find on AppExchange to enhance their organization?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Components",
      "Customers",
      "Communities",
      "Consultants"
    ],
    "answer": "A,D",
    "type": "multi",
    "focus": "familiar",
    "group": "platform",
    "why": "AppExchange offers reusable components and partner consulting services that can extend an organization’s capabilities.",
    "wrong": {
      "B": "Customers are not a type of enhancement package or professional service offered for installation.",
      "C": "A community is not the listed marketplace solution category in this question."
    },
    "notes": "Assess publisher reputation, security review, installation permissions, support model, and cost. A consultant listing is a service offering; a component listing is deployable functionality."
  },
  {
    "id": 69,
    "section": "automation",
    "stem": [
      "Cloud Kicks wants users to only be able to choose the opportunity stage Closed Won if the Lead source has been selected.",
      {
        "ask": "How should a Platform Administrator accomplish this goal?"
      }
    ],
    "choices": [
      "Make Lead source a dependent picklist to the Opportunity Stage field.",
      "Change the Opportunity Stage field to Read Only on the page layout.",
      "Configure a validation rule requiring Lead source when the stage is set to Closed Won.",
      "Make the opportunity stage a dependent picklist to the Lead source."
    ],
    "answer": "C",
    "focus": "must",
    "group": "validation",
    "why": "A validation rule can reject Closed Won when Lead Source is blank.",
    "wrong": {
      "A": "A dependent picklist does not express the required conditional save rule for this standard-field combination.",
      "B": "Making Stage read-only prevents intended edits rather than allows valid Closed Won transitions.",
      "D": "Reversing the picklist dependency still does not enforce the stated blank-value requirement."
    },
    "notes": "Write the rule to be true only for an invalid record. Decide whether the rule should apply to all Closed Won edits or only a transition, using ISCHANGED and PRIORVALUE when appropriate."
  },
  {
    "id": 70,
    "section": "automation",
    "stem": [
      "A Platform Administrator at Cloud Kicks has a request from the finance team that all won opportunities over a certain value must be checked for accuracy before the deal can be considered fully closed. The assigned finance team member, as well as the sellers' manager, both must sign off on the deal, with the manager doing so first. Then, the finance team member must sign off, for a total of two required sign-offs per opportunity.",
      {
        "ask": "How should the administrator address this request?"
      }
    ],
    "choices": [
      "Create a screen flow that runs anytime an opportunity is closed.",
      "Add a Lightning web component to the opportunity page to capture the details in an approval record.",
      "Create a quick action to send emails to both the manager and the finance team member.",
      "Create an approval process with specific steps."
    ],
    "answer": "D",
    "focus": "high",
    "group": "approvals",
    "why": "Ordered approval steps can require the manager’s decision before the finance reviewer’s decision.",
    "wrong": {
      "A": "A screen flow alone does not supply the persistent multi-reviewer approval chain.",
      "B": "A custom component adds development without providing the standard approval engine automatically.",
      "C": "Sending emails does not enforce approval sequence or record the required decisions."
    },
    "notes": "Wording corrected: the source named a manager and a finance reviewer but also said up to three sign-offs. The repaired question consistently requires those two sequential approvals.",
    "printed": "D",
    "source": {
      "stem": [
        "A Platform Administrator at Cloud Kicks has a request from the finance team that all won opportunities over a certain value must be checked for accuracy before the deal can be considered fully closed. The assigned finance team member, as well as the sellers' manager, both must sign off on the deal, with the manager doing so first. Then, the finance team member must sign off, for a total of up to three sign-offs per opportunity.",
        {
          "ask": "How should the administrator address this request?"
        }
      ],
      "choices": [
        "Create a screen flow that runs anytime an opportunity is closed.",
        "Add a Lightning web component to the opportunity page to capture the details in an approval record.",
        "Create a quick action to send emails to both the manager and the finance team member.",
        "Create an approval process with specific steps."
      ],
      "answer": "D"
    },
    "repaired": true
  },
  {
    "id": 71,
    "section": "agentforce",
    "stem": [
      "A Platform Administrator is adding a new topic to an agent.",
      {
        "ask": "What is best practice for topic instructions?"
      }
    ],
    "choices": [
      "Write the instructions generically to allow the agent maximum flexibility in its reasoning.",
      "Include a few representative user questions and clear instructions that define the topic's scope.",
      "Keep instructions as minimal as possible to reduce agent latency.",
      "Add business-specific language rather than plain language."
    ],
    "answer": "B",
    "focus": "familiar",
    "group": "agent-prompts",
    "why": "Representative examples and clear scope help the reasoning engine recognize when the topic applies.",
    "wrong": {
      "A": "Vague generic instructions give the agent too little operational guidance.",
      "C": "Minimal length alone is not a goal if it removes necessary instructions.",
      "D": "Unexplained business jargon can make interpretation less reliable."
    },
    "notes": "Option B corrected: the source recommended an “extended list,” which could encourage excessive prompt length. Use a few representative examples, explicit boundaries, plain language, and realistic tests.",
    "printed": "B",
    "source": {
      "stem": [
        "A Platform Administrator is adding a new topic to an agent.",
        {
          "ask": "What is best practice for topic instructions?"
        }
      ],
      "choices": [
        "Write the instructions generically to allow the agent maximum flexibility in its reasoning.",
        "Include an extended list of example user questions so the agent can learn from patterns.",
        "Keep instructions as minimal as possible to reduce agent latency.",
        "Add business-specific language rather than plain language."
      ],
      "answer": "B"
    },
    "repaired": true
  },
  {
    "id": 72,
    "section": "security",
    "stem": [
      "Cloud Kicks has the organization wide defaults for Opportunity set to Private.",
      {
        "ask": "Which two features should a Platform Administrator use to open up access to opportunity records for sales users working on collaborative deals?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Sharing rules",
      "Sharing set",
      "Role hierarchy",
      "Profiles"
    ],
    "answer": "A,C",
    "type": "multi",
    "focus": "high",
    "group": "security",
    "why": "Sharing rules and the role hierarchy can open record access above a Private organization-wide default.",
    "wrong": {
      "B": "Sharing sets are an external-user access mechanism, not the standard internal collaborative-sales solution.",
      "D": "Profiles grant object permissions but do not select which privately owned opportunity records a peer can see."
    },
    "notes": "Object access is required before record sharing helps. The role hierarchy generally opens access upward; use sharing rules or teams for lateral collaboration rather than assuming all role members share all records."
  },
  {
    "id": 73,
    "section": "analytics",
    "stem": [
      "Cloud Kicks has three teams of customer service reps that use a custom field on the Case object to populate the team assigned to manage the tickets. The customer support manager would like a Custom Dashboard to show data specific to each team.",
      {
        "ask": "What should a Platform Administrator do to meet this requirement?"
      }
    ],
    "choices": [
      "Create separate Dashboards for each Customer Support team.",
      "Create a Dashboard with widgets specific to each team.",
      "Create a Dashboard that uses Dashboard filters to show specific team data.",
      "Add Cross Filters to switch between the three customer service teams."
    ],
    "answer": "C",
    "focus": "familiar",
    "group": "analytics",
    "why": "Dashboard filters let one dashboard display records for the selected customer-support team.",
    "wrong": {
      "A": "Separate dashboards duplicate maintenance when a common team filter meets the requirement.",
      "B": "Dedicated widgets for every team are less flexible than selecting the team on one dashboard.",
      "D": "Cross filters select report records through related-record conditions rather than act as dashboard team selectors."
    },
    "notes": "Use the case team field consistently across source reports and map the dashboard filter to compatible report fields. Filters narrow what the running user can already access."
  },
  {
    "id": 74,
    "section": "service",
    "stem": [
      "Cloud Kicks needs to change the owner of a case when it has been open for more than 7 days.",
      {
        "ask": "What should a Platform Administrator use to complete this requirement?"
      }
    ],
    "choices": [
      "Escalation Rules",
      "Auto Response Rules",
      "Assignment Rules",
      "Validation Rules"
    ],
    "answer": "A",
    "focus": "low",
    "group": "service",
    "why": "Escalation rules can reassign a case when its age and criteria meet the seven-day threshold.",
    "wrong": {
      "B": "Auto-response rules send acknowledgements rather than delayed ownership changes.",
      "C": "Assignment rules perform routing without this case-age escalation mechanism.",
      "D": "Validation rules prevent invalid saves rather than automatically change ownership later."
    },
    "notes": "This repeats the age-based escalation pattern in Questions 1, 28, 44, and 80. Learn the tool distinction instead of treating each time threshold as a new feature."
  },
  {
    "id": 75,
    "section": "agentforce",
    "stem": [
      "When Agentforce performs its grounding check, it examines source information, the topic instructions, and scope.",
      {
        "ask": "Which additional information does the agent look for during its grounding check?"
      }
    ],
    "choices": [
      "Incompatible data types",
      "Prompt injection risks",
      "Encrypted fields",
      "The web for information verification"
    ],
    "answer": "B",
    "focus": "high",
    "group": "agent-trust",
    "why": "Prompt-injection risks are relevant when checking whether source content or instructions attempt to redirect the agent away from its intended task.",
    "wrong": {
      "A": "Data-type validation is not the principal grounding-safety issue described.",
      "C": "An encrypted field is an access or data-handling concern, not a prompt-injection pattern.",
      "D": "Grounding does not imply unrestricted external-web fact checking."
    },
    "notes": [
      "Ground answers in permitted, trustworthy sources. Treat instructions found inside retrieved content as data rather than authority; enforce record and field access separately from conversational safety checks.",
      "Salesforce explicitly includes prompt-injection risk protection in this workflow description: https://help.salesforce.com/s/articleView?id=005134880&language=en_US&type=1"
    ],
    "source": {
      "stem": [
        "When Agentforce performs its grounding check, it examines source information, the topic instructions, and scope.",
        {
          "ask": "Which additional information does the agent look for during its grounding check?"
        }
      ],
      "choices": [
        "Incompatible data types",
        "Prompt injection risks",
        "Encrypted fields",
        "The web for information verification"
      ],
      "answer": "B"
    },
    "printed": "B"
  },
  {
    "id": 76,
    "section": "analytics",
    "stem": [
      "A group of sales reps can view each other's orders on a report; however, they would like a report to view just their own orders.",
      {
        "ask": "What should a Platform Administrator do to set up a report for the sales reps?"
      }
    ],
    "choices": [
      "Set the Opportunity Filter for Primary as True.",
      "Filter on Order Owner using a supported current-user owner filter or owner-is-current-user formula.",
      "Set Organization Wide Defaults of Order object to Private.",
      "Save the report in a private folder for the user."
    ],
    "answer": "B",
    "focus": "high",
    "group": "analytics",
    "why": "Filtering by the current user’s Order ownership returns their own orders without removing the team’s existing cross-user access.",
    "wrong": {
      "A": "A primary-opportunity filter does not identify the current order owner.",
      "C": "Changing organization-wide defaults would remove desired cross-user visibility rather than just personalize this report.",
      "D": "A private report folder restricts access to the saved report, not which order rows it returns."
    },
    "notes": "Option B corrected: the source filtered Opportunity Owner and assumed a universal $USER report-filter value. Use the report type’s supported current-user ownership scope or a suitable formula comparing order ownership to the current user.",
    "printed": "B",
    "source": {
      "stem": [
        "A group of sales reps can view each other's orders on a report; however, they would like a report to view just their own orders.",
        {
          "ask": "What should a Platform Administrator do to set up a report for the sales reps?"
        }
      ],
      "choices": [
        "Set the Opportunity Filter for Primary as True.",
        "Filter by Opportunity Owner equals $USER.",
        "Set Organization Wide Defaults of Order object to Private.",
        "Save the report in a private folder for the user."
      ],
      "answer": "B"
    },
    "repaired": true
  },
  {
    "id": 77,
    "section": "experience",
    "stem": [
      "Users have reported that the new Lightning account record page is loading very slowly.",
      {
        "ask": "Which feature should a Platform Administrator use to determine the cause of the performance issues?"
      }
    ],
    "choices": [
      "Lightning Analytics",
      "Lightning Usage App",
      "Lightning Page Visibility Rule",
      "Performance Analysis (Analyze) in Lightning App Builder"
    ],
    "answer": "D",
    "focus": "high",
    "group": "experience",
    "why": "Analyze in Lightning App Builder identifies page-design and component contributions to slow record-page loading.",
    "wrong": {
      "A": "Lightning Analytics is not the specific record-page performance analysis command.",
      "B": "Lightning Usage App reports observed page-load metrics; Analyze is the direct tool for component-level causes and recommendations.",
      "C": "A visibility rule can reduce component load but is not itself an analysis tool."
    },
    "notes": [
      "Option D corrected: the source called the tool “Lightning App Builder Analytics.” The actual command is Analyze, providing Performance Analysis for the record page.",
      "Salesforce: https://help.salesforce.com/s/articleView?id=platform.lightning_page_performance.htm&language=en_US&type=5"
    ],
    "printed": "D",
    "source": {
      "stem": [
        "Users have reported that the new Lightning account record page is loading very slowly.",
        {
          "ask": "Which feature should a Platform Administrator use to determine the cause of the performance issues?"
        }
      ],
      "choices": [
        "Lightning Analytics",
        "Lightning Usage App",
        "Lightning Page Visibility Rule",
        "Lightning App Builder Analytics"
      ],
      "answer": "D"
    },
    "repaired": true
  },
  {
    "id": 78,
    "section": "agentforce",
    "stem": [
      {
        "ask": "A Platform Administrator is designing a prompt template for a new agent. The agent's purpose is to help service reps troubleshoot technical issues by providing concise, step-by-step instructions. Based on best practices for creating effective prompts, which approach should the administrator use when writing this prompt?"
      }
    ],
    "choices": [
      "Write a detailed prompt with multiple nested conditions to cover all the major troubleshooting scenarios.",
      "Use specific technical terms and abbreviations to ensure the AI understands the specialised domain.",
      "Focus on providing high-level, theoretical concepts so the AI has the flexibility to respond creatively.",
      "Use natural, easy-to understand language and clear, concise instructions to guide the AI's behavior."
    ],
    "answer": "D",
    "focus": "high",
    "group": "agent-prompts",
    "why": "Clear, concise natural-language instructions help an agent produce the requested step-by-step troubleshooting response.",
    "wrong": {
      "A": "Many nested conditions can make instructions harder to interpret and maintain.",
      "B": "Specialized abbreviations require context and can introduce ambiguity.",
      "C": "High-level theory does not define the concrete troubleshooting output requested."
    },
    "notes": "Specify the audience, task, relevant context, safety boundaries, and expected output format. Test realistic inputs; plain wording does not eliminate the need for grounded, accurate technical content."
  },
  {
    "id": 79,
    "section": "data",
    "stem": [
      "A Platform Administrator has been asked to change the data type of an auto number to a text field.",
      {
        "ask": "What should the administrator be aware of before changing the field?"
      }
    ],
    "choices": [
      "Existing field values will remain unchanged.",
      "Changing Auto Number field to Text is prevented.",
      "Existing field values will be deleted.",
      "Existing field values will be converted."
    ],
    "answer": "A",
    "focus": "high",
    "group": "model",
    "why": "Converting an Auto Number field to Text preserves existing field values.",
    "wrong": {
      "B": "This particular field-type conversion is supported.",
      "C": "Existing values are not automatically deleted in an Auto Number-to-Text conversion.",
      "D": "The existing values are preserved rather than regenerated into a different numbering scheme."
    },
    "notes": "After conversion, future values are no longer automatically assigned by that field’s old numbering sequence. Back up data and review dependencies before changing any field type."
  },
  {
    "id": 80,
    "section": "service",
    "stem": [
      "Cloud Kicks wants to make sure clients are getting the attention they need and cases are not sitting longer than the Service Level Agreement (SLA) it has with its clients.",
      {
        "ask": "Which standard feature helps route cases to a Tier 2 team if they have not been addressed in a specific amount of time?"
      }
    ],
    "choices": [
      "Milestone and Entitlements",
      "Omni Channel Routing",
      "Auto Response Rules",
      "Escalation Rules"
    ],
    "answer": "D",
    "focus": "low",
    "group": "service",
    "why": "Escalation rules can move aged cases to a Tier 2 owner or queue.",
    "wrong": {
      "A": "Milestones track service commitments but are not the simplest listed case-ownership escalation mechanism.",
      "B": "Omni-Channel distributes available work based on routing configuration rather than this age rule alone.",
      "C": "Auto-response rules acknowledge customers without performing delayed ownership escalation."
    },
    "notes": "This is another version of the escalation-versus-assignment pattern. Business hours determine how elapsed escalation time is interpreted when configured."
  },
  {
    "id": 81,
    "section": "automation",
    "stem": [
      "Cloud Kicks (CK) is partnering with a used shoe store and second-hand bicycle emporium. CK has an automated business process it wants to run once a week to count the number of open cases related to an Account.",
      {
        "ask": "Which flow should a Platform Administrator recommend automating within Flow Builder for this business process?"
      }
    ],
    "choices": [
      "Scheduled flow",
      "Record triggered flow",
      "Autolaunched flow",
      "Automation event triggered flow"
    ],
    "answer": "A",
    "focus": "must",
    "group": "flows",
    "why": "A schedule-triggered flow can run at a specified recurring time, including once a week.",
    "wrong": {
      "B": "A record-triggered flow starts from record events rather than an independent weekly schedule.",
      "C": "An autolaunched no-trigger flow needs another caller or scheduling mechanism.",
      "D": "“Automation event triggered flow” is not the schedule-triggered type required here."
    },
    "notes": "Choose trigger type from what initiates the work. A scheduled flow still needs the correct query scope and aggregation/update design; scheduling alone does not calculate related-case totals."
  },
  {
    "id": 82,
    "section": "automation",
    "stem": [
      "Marketing users at Cloud Kicks have been completing the Lead Source field inconsistently, with values like Web, Website, and Online. To ensure data quality, a Platform Administrator needs to standardize these records. The cleanup must scan existing records unattended on a nightly schedule.",
      {
        "ask": "Which Flow should the administrator use to clean up these inconsistent Lead Source values?"
      }
    ],
    "choices": [
      "Segment triggered flow",
      "Record triggered flow",
      "Schedule-triggered flow",
      "Screen flow"
    ],
    "answer": "C",
    "focus": "high",
    "group": "flows",
    "why": "A schedule-triggered flow can clean existing records in batches without waiting for each record to be edited.",
    "wrong": {
      "A": "Segment-triggered flow is not the general Salesforce-record cleanup tool in this scenario.",
      "B": "A record-triggered flow only helps existing inconsistent records when a qualifying record event occurs.",
      "D": "A screen flow requires user interaction rather than unattended bulk cleanup."
    },
    "notes": "For a one-time cleanup, an appropriate data-update tool may also be simpler. Prevent recurrence with controlled field values, validation, or well-designed before-save normalization.",
    "source": {
      "stem": [
        "Marketing users at Cloud Kicks have been completing the Lead Source field inconsistently, with values like Web, Website, and Online. To ensure data quality, a Platform Administrator needs to standardize these records.",
        {
          "ask": "Which Flow should the administrator use to clean up these inconsistent Lead Source values?"
        }
      ],
      "choices": [
        "Segment triggered flow",
        "Record triggered flow",
        "Schedule-triggered flow",
        "Screen flow"
      ],
      "answer": "C"
    },
    "printed": "C",
    "repaired": true
  },
  {
    "id": 83,
    "section": "security",
    "stem": [
      "Ursa Major Solar (UMS) wants a place within Salesforce to discuss sensitive records. UMS would like to be able to add new members but does not want non-members to be able to see any information about the forum.",
      {
        "ask": "What should a Platform Administrator configure to achieve this?"
      }
    ],
    "choices": [
      "Chatter Unlisted Group",
      "Chatter Private Group",
      "Chatter Public Group",
      "Private Chatter Channel"
    ],
    "answer": "A",
    "focus": "high",
    "group": "collaboration",
    "why": "An unlisted Chatter group hides the group’s existence and content from non-members, subject to administrator capabilities.",
    "wrong": {
      "B": "A private group can still be discoverable even though its posts are restricted.",
      "C": "A public group is visible and does not meet the confidentiality requirement.",
      "D": "Private Chatter Channel is not the standard group visibility type offered here."
    },
    "notes": "Distinguish discoverability from access to posts. Group confidentiality does not replace record sharing and field-level security for records discussed or linked in the group."
  },
  {
    "id": 84,
    "section": "data",
    "stem": [
      "A user is unable to relate a task to the Course custom object.",
      {
        "ask": "What should a Platform Administrator do to allow tasks to be related to courses?"
      }
    ],
    "choices": [
      "Create a sharing rule for the Course object to grant the user Read/Write access.",
      "Select Allow Activities on the Course object in Object Manager.",
      "Add the Open Activities related list to the Course page layout.",
      "Update the user's profile to grant them Edit access to the Task object."
    ],
    "answer": "B",
    "focus": "high",
    "group": "model",
    "why": "Enable Allow Activities on the Course custom object so tasks and events can relate to its records.",
    "wrong": {
      "A": "Sharing access alone does not make an object activity-enabled.",
      "C": "Adding a related list displays supported relationships but does not enable the capability.",
      "D": "Task permissions cannot replace the custom object’s Allow Activities setting."
    },
    "notes": "An activity-enabled object can be selected in supported activity relationships. Users also need the appropriate activity and target-record permissions and a suitable page layout to see the related information."
  },
  {
    "id": 85,
    "section": "automation",
    "stem": [
      "Universal Containers requires that when an opportunity is closed won, all other open opportunities on the same account must be rendered as Closed Lost.",
      {
        "ask": "Which automation solution should a Platform Administrator use to implement this request?"
      }
    ],
    "choices": [
      "Flow Builder",
      "Outbound Message",
      "Flow Orchestration",
      "Quick Action"
    ],
    "answer": "A",
    "focus": "must",
    "group": "flows",
    "why": "An after-save record-triggered flow can find and update other open opportunities on the same account.",
    "wrong": {
      "B": "An outbound message sends information externally rather than updates sibling opportunities by itself.",
      "C": "Flow Orchestration coordinates stages of work and is unnecessary for this direct related-record update.",
      "D": "A quick action requires a user interaction and does not implement the automatic trigger by itself."
    },
    "notes": "Detect the transition to Closed Won and avoid updating the triggering record repeatedly. Query only the intended sibling opportunities, consider bulk operations, and review whether automatically losing every other deal is really the approved business rule."
  },
  {
    "id": 86,
    "section": "data",
    "stem": [
      "Northern Trail Outfitters uses a custom Invoice object to collect customer payment information from an external billing system. The Billing System field needs to be filled in on every Invoice record.",
      {
        "ask": "How should a Platform Administrator ensure this requirement?"
      }
    ],
    "choices": [
      "Create a flow to update the field.",
      "Require the field on the record type.",
      "Define an approval process for the field.",
      "Make the field universally required."
    ],
    "answer": "D",
    "focus": "must",
    "group": "model",
    "why": "Making the custom field required at the field definition enforces a value across supported entry channels, including imports and APIs.",
    "wrong": {
      "A": "A flow that fills a field is not equivalent to rejecting every record without a required value.",
      "B": "Record types do not have an independent universal field-required setting.",
      "C": "An approval process does not enforce presence on every invoice save."
    },
    "notes": "Page-layout requiredness applies to that layout. Field-definition requiredness and validation rules enforce broader data-integrity requirements; use them carefully for integration and historical data."
  },
  {
    "id": 87,
    "section": "data",
    "stem": [
      "Cloud Kicks has a custom object called Shipments. The company wants to see all the shipment items from an Account page. When an Account is deleted, the shipments should remain.",
      {
        "ask": "Which type of relationship should a Platform Administrator make between Shipments and Accounts?"
      }
    ],
    "choices": [
      "Accounts should have a lookup to Shipments.",
      "Shipments should have a master detail to Accounts.",
      "Shipments should have a lookup to Account.",
      "Accounts should have a master detail to Shipments."
    ],
    "answer": "C",
    "focus": "must",
    "group": "model",
    "why": "A lookup on Shipment pointing to Account associates shipments with accounts without the default cascade-delete dependency of master-detail.",
    "wrong": {
      "A": "A lookup in the opposite direction does not model many shipments belonging to one account.",
      "B": "A master-detail relationship would normally delete details when the account master is deleted.",
      "D": "Reversing master-detail also models the relationship in the wrong direction."
    },
    "notes": "Review the lookup’s deletion setting. Choose behavior that permits the shipment to remain when the referenced account is deleted, and ensure the relationship need not stay required."
  },
  {
    "id": 88,
    "section": "agentforce",
    "stem": [
      "A Platform Administrator is creating a new action instruction for an agent. This action, named createCase, is designed to generate a new Salesforce Case record based on the user's conversation with the agent.",
      {
        "ask": "Which set of Action Instructions should the administrator use for the createCase action, according to best practices for action instructions?"
      }
    ],
    "choices": [
      "'This action provides the ability to create a new case record in the Salesforce system. Its function is to simply save customer information as a record. Use this when the user wants to create a case.'",
      "'Use this action to create a new Salesforce Case record. The goal is to document a customer's issue in the system. Use this when the user's intent is to create a formal record of their problem or question.'",
      "'Creates a new case record in the system for any type of customer inquiry. The purpose of this is to ensure a record of the interaction is saved.'",
      "'The createCase code snippet is configured to create a case. It runs in the background to handle the user's request to log a new issue. Its purpose is to solve the customer's issue.'"
    ],
    "answer": "B",
    "focus": "high",
    "group": "agent-actions",
    "why": "B clearly states the action’s effect, goal, and customer intent that should cause the agent to create a Case.",
    "wrong": {
      "A": "The description is generic and less clearly connects the action to documenting a customer problem.",
      "C": "“Any type of customer inquiry” is broad and does not set a clear invocation condition.",
      "D": "Creating a record does not itself solve the customer’s issue; describing background code adds little guidance."
    },
    "notes": "Explain when an action should run and what business outcome it produces. Do not promise issue resolution merely because the action creates a case record."
  },
  {
    "id": 89,
    "section": "automation",
    "stem": [
      "A Platform Administrator at Cloud Kicks has created a screen flow to help service reps ask the same set of questions when customers call in with issues. This screen should be visible from cases.",
      {
        "ask": "How should the administrator distribute the screen flow?"
      }
    ],
    "choices": [
      "Page Layout",
      "Home Page",
      "Lightning Page",
      "Component Filter"
    ],
    "answer": "C",
    "focus": "high",
    "group": "flows",
    "why": "A Flow component on the case Lightning record page can display and run the screen flow in record context.",
    "wrong": {
      "A": "A page layout does not directly host the Lightning Flow component.",
      "B": "A Home page does not place the guided screen on the case record itself.",
      "D": "A component filter controls visibility rather than supplies the flow-hosting page."
    },
    "notes": "Activate the flow and assign the Lightning page appropriately. Pass recordId through an input variable when the flow needs the current case; validate user permissions and flow access."
  },
  {
    "id": 90,
    "section": "security",
    "stem": [
      "The VP of sales at Cloud Kicks has a standard sales profile and is receiving an error message that prevents them from saving an opportunity. A Platform Administrator attempted the same edit without receiving an error.",
      {
        "ask": "How should the administrator troubleshoot this issue?"
      }
    ],
    "choices": [
      "Log in as a system administrator to troubleshoot.",
      "Use 'Login as' to log in as the user.",
      "Use an AppExchange product to troubleshoot.",
      "Ask the user for their password so the admin can log in as the user."
    ],
    "answer": "B",
    "focus": "high",
    "group": "users",
    "why": "Login As reproduces the problem under the affected user’s permissions and context.",
    "wrong": {
      "A": "A system administrator can bypass access restrictions and may not reproduce the user’s failure.",
      "C": "An AppExchange product is unnecessary for the first diagnostic step.",
      "D": "Administrators should never ask users to share their passwords."
    },
    "notes": "Use the approved Login As capability and reproduce the exact operation. Check validation rules, field permissions, record access, and automation differences rather than assuming the error is only a profile problem."
  },
  {
    "id": 91,
    "section": "security",
    "stem": [
      "A Platform Administrator assigned a custom profile based on the Minimum Access named Salesforce profile to a group of new users and assigned them several existing permission sets. However, when the users log in, they do not see the Lightning interface.",
      {
        "ask": "Which action should the administrator take to give the users access to the Lightning interface?"
      }
    ],
    "choices": [
      "Enable the Enhanced Interface for User Access Policies.",
      "Add Lightning component to a layout.",
      "Create a page in Lightning App Builder with the org as default.",
      "Assign a permission to enable Lightning Experience User."
    ],
    "answer": "D",
    "focus": "must",
    "group": "users",
    "why": "The Lightning Experience User permission enables eligible users to access Lightning Experience.",
    "wrong": {
      "A": "Enhanced interface for access policies is not the user’s Lightning Experience entitlement.",
      "B": "Adding a component to a page does not enable Lightning access for a user.",
      "C": "Activating a Lightning page does not replace the user permission."
    },
    "notes": "A minimum-access profile intentionally grants little. Add only the required permissions through suitable permission sets, and confirm the user’s license supports the intended application features."
  },
  {
    "id": 92,
    "section": "experience",
    "stem": [
      "A Platform Administrator has reviewed an upcoming critical update.",
      {
        "ask": "How should the administrator proceed with activation of the critical update?"
      }
    ],
    "choices": [
      "Allow the critical update to auto-activate in a sandbox.",
      "Activate the critical update in production.",
      "Activate the critical update in a sandbox.",
      "Allow the critical update to auto-activate."
    ],
    "answer": "C",
    "focus": "low",
    "group": "platform",
    "why": "Test and activate a release update in a sandbox before enabling it in production.",
    "wrong": {
      "A": "Waiting for automatic sandbox activation does not provide a deliberate compatibility test plan.",
      "B": "Activating in production first risks affecting live users and integrations.",
      "D": "Waiting for automatic enforcement forfeits the opportunity to investigate and remediate in advance."
    },
    "notes": "“Critical Update” is older terminology for release-update management. Review enforcement dates, prerequisites, test runs, and behavior changes for the actual release rather than treating updates as optional indefinitely."
  },
  {
    "id": 93,
    "section": "automation",
    "stem": [
      "A Platform Administrator needs to configure an approval process for the sales team when opportunities that meet particular conditions are closed.",
      {
        "ask": "How should the administrator make sure the right records are included in the process?"
      }
    ],
    "choices": [
      "Add Specific Entry Criteria.",
      "Use Dynamic Forms to display a button.",
      "Create a screen flow.",
      "Add a validation rule to the opportunity."
    ],
    "answer": "A",
    "focus": "must",
    "group": "approvals",
    "why": "Entry criteria determine which records qualify to enter an approval process.",
    "wrong": {
      "B": "Showing a button conditionally does not enforce the approval engine’s entry criteria.",
      "C": "A screen flow can submit a record but does not replace the process’s qualification rules.",
      "D": "A validation rule controls saves and is not the process entry-criteria setting."
    },
    "notes": "Process entry criteria and approval-step criteria serve different purposes. Restrict eligible submitters and review automatic submission separately from defining record eligibility."
  },
  {
    "id": 94,
    "section": "analytics",
    "stem": [
      {
        "ask": "A sales manager receives a URL to a Dashboard folder containing several dashboards. However, when the sales manager clicks on the URL, a message appears stating, 'We couldn't find the record you're trying to access.' What is the reason for this?"
      },
      "Choices C and D overlap: a private folder is one reason folder access is missing. Either single selection is accepted."
    ],
    "choices": [
      "The sales manager does not have the correct permission set.",
      "The sales manager needs the correct sales user profile.",
      "The Dashboard folder is set to Private.",
      "View access has not been granted to the Dashboard folder."
    ],
    "answer": "C,D",
    "focus": "high",
    "group": "analytics",
    "why": "A private dashboard folder (C) and missing View access to the target folder (D) can both explain this access failure. The source offers a specific cause and its broader access condition as competing choices; either single selection is accepted.",
    "wrong": {
      "A": "A generic permission set is not a substitute for the specific folder share described.",
      "B": "A sales profile alone does not grant access to every dashboard folder."
    },
    "notes": [
      "Check folder sharing and report/dashboard permissions independently. Folder access lets a user open the saved artifact; source data visibility depends on the dashboard’s running-user context.",
      "This error is not a complete diagnosis by itself. Check that the folder still exists, its sharing, and the user's reporting permissions. The printed D remains accepted, so no Corrected badge applies.",
      "Matching option-set variant: https://www.actual4test.com/discussions/Salesforce/exam-plat-admn-201-topic-5-question-40-discussion-p1240389.html"
    ],
    "source": {
      "stem": [
        {
          "ask": "A sales manager receives a URL to a Dashboard folder containing several dashboards. However, when the sales manager clicks on the URL, a message appears stating, 'We couldn't find the record you're trying to access.' What is the reason for this?"
        }
      ],
      "choices": [
        "The sales manager does not have the correct permission set.",
        "The sales manager needs the correct sales user profile.",
        "The Dashboard folder is set to Private.",
        "View access has not been granted to the Dashboard folder."
      ],
      "answer": "D"
    },
    "printed": "D",
    "acceptAny": true,
    "repaired": true
  },
  {
    "id": 95,
    "section": "automation",
    "stem": [
      "A configured record-triggered flow is expected to create records in production, but none appear. Its trigger and intended entry conditions have already been defined.",
      {
        "ask": "Which basic flow-version state should the administrator check before debugging the execution logic?"
      }
    ],
    "choices": [
      "Confirm that the intended flow version is active.",
      "The flow URL is deactivated.",
      "The flow is Read Only.",
      "The flow trigger is missing."
    ],
    "answer": "A",
    "focus": "high",
    "group": "flows",
    "why": "A defined record-triggered flow must have the intended active version before it runs automatically for qualifying events. This is an initial check, not proof of the incident's cause.",
    "wrong": {
      "B": "A flow URL is a launch mechanism for certain flows, not a universal active/inactive switch.",
      "C": "Read Only is not the relevant activation state for a flow.",
      "D": "Some flows are called by another process, so lacking a native trigger does not universally prevent execution."
    },
    "notes": "Activation is an important first check, not proof of the cause in every incident. Then inspect entry conditions, caller configuration, input values, fault paths, and execution logs.",
    "source": {
      "stem": [
        "A Platform Administrator at Cloud Kicks has a flow in production that is supposed to create new records. However, no new records are being created.",
        {
          "ask": "What is causing the issue?"
        }
      ],
      "choices": [
        "The flow is inactive.",
        "The flow URL is deactivated.",
        "The flow is Read Only.",
        "The flow trigger is missing."
      ],
      "answer": "A"
    },
    "printed": "A",
    "repaired": true
  },
  {
    "id": 96,
    "section": "data",
    "stem": [
      "Sales and marketing need different picklist choices on their assigned data-entry layouts. This presentation requirement permits either a shared field with record types or separate fields on separate layouts; it does not require one common stored field.",
      {
        "ask": "Which two options meet this requirement?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Two permission sets, one record type, one picklist",
      "One record type, two profiles, one picklist",
      "One page layout, two record types, one picklist",
      "Two page layouts, one record type, two picklists"
    ],
    "answer": "C,D",
    "type": "multi",
    "focus": "high",
    "group": "model",
    "why": "Separate record types can expose different allowed values for one picklist; separate picklist fields on separate layouts can also present different sets.",
    "wrong": {
      "A": "Permission sets alone do not define record-type-specific picklist values.",
      "B": "Two profiles using the same record type and same picklist do not by themselves create different allowed value sets."
    },
    "notes": "C is the conventional single-field design. D uses two different fields, so it is a workaround rather than per-user value filtering on one field; page-layout field visibility is not field-level security.",
    "source": {
      "stem": [
        "Cloud Kicks needs to be able to show different picklist values for sales and marketing users.",
        {
          "ask": "Which two options meet this requirement?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "Two permission sets, one record type, one picklist",
        "One record type, two profiles, one picklist",
        "One page layout, two record types, one picklist",
        "Two page layouts, one record type, two picklists"
      ],
      "answer": "C,D"
    },
    "printed": "C,D",
    "repaired": true
  },
  {
    "id": 97,
    "section": "agentforce",
    "stem": [
      {
        "ask": "What is an Agentforce use case in a sales organization?"
      }
    ],
    "choices": [
      "Generating cold calls",
      "Automating all marketing content",
      "Providing basic web bot chats",
      "Automating Lead Qualification"
    ],
    "answer": "D",
    "focus": "high",
    "group": "sales",
    "why": "Automated lead qualification is an Agentforce sales use case, using approved interactions and business criteria.",
    "wrong": {
      "A": "Generating cold calls is not the listed standard sales-development use case.",
      "B": "“All marketing content” is an overbroad claim and ignores controls and review.",
      "C": "A basic web bot does not capture the sales-specific qualification capability."
    },
    "notes": "Define lead qualification criteria, permitted communication channels, opt-out handling, and handoff conditions. An agent’s sales role does not imply authority to negotiate and close every deal autonomously."
  },
  {
    "id": 98,
    "section": "sales",
    "stem": [
      "Sales reps miss key data during Opportunity entry. The administrator wants universally required UI fields, stage-specific guidance, and a save-time rule preventing unauthorized moves to a previous stage.",
      {
        "ask": "Which three options should a Platform Administrator use to address this need?"
      },
      {
        "ask": "Choose 3 answers"
      }
    ],
    "choices": [
      "Mark fields required on the page layout.",
      "Use Flow to mark fields required.",
      "Configure Opportunity Path.",
      "Use validation rules.",
      "Enable guided selling."
    ],
    "answer": "A,C,D",
    "type": "multi",
    "focus": "must",
    "group": "validation",
    "why": "Page-layout requiredness collects the universally required fields in that UI; Path presents stage guidance; validation rules enforce the stated data or backward-transition restrictions. Path alone does not enforce stage order.",
    "wrong": {
      "B": "Flow does not make a page-layout field required merely by “marking” it; its exact validation or error behavior must be designed.",
      "E": "Guided selling is not the general standard opportunity stage-enforcement feature requested."
    },
    "notes": "Only some of these tools enforce all save channels. Page-layout requiredness is UI-specific, Path guides users, and validation rules enforce data and transition constraints. Account for skipped stages and legitimate manager exceptions.",
    "source": {
      "stem": [
        "Sales reps miss key fields when filling out an opportunity record through the sales process. Reps need to move forward in stages but are unable to enter a previous stage.",
        {
          "ask": "Which three options should a Platform Administrator use to address this need?"
        },
        {
          "ask": "Choose 3 answers"
        }
      ],
      "choices": [
        "Mark fields required on the page layout.",
        "Use Flow to mark fields required.",
        "Configure Opportunity Path.",
        "Use validation rules.",
        "Enable guided selling."
      ],
      "answer": "A,C,D"
    },
    "printed": "A,C,D",
    "repaired": true
  },
  {
    "id": 99,
    "section": "analytics",
    "stem": [
      "Management at Universal Containers would like to share dashboard components with their team in Chatter but currently does not have access to this capability.",
      {
        "ask": "How should a Platform Administrator make this functionality available to management?"
      }
    ],
    "choices": [
      "Enable reporting snapshots.",
      "Select Download Chart on the component.",
      "Set View Dashboard As to the dashboard viewer.",
      "Enable dashboard feed tracking."
    ],
    "answer": "D",
    "focus": "familiar",
    "group": "analytics",
    "why": "Enabling dashboard feed tracking makes supported dashboard posts and discussion capabilities available in Chatter.",
    "wrong": {
      "A": "Reporting snapshots store report results over time rather than enable Chatter discussion.",
      "B": "Downloading a chart creates a file and does not enable feed tracking.",
      "C": "Choosing the dashboard viewer changes data context rather than enables social sharing."
    },
    "notes": "Review what the shared chart or dashboard post reveals. Sharing an aggregate image is not the same as giving access to the underlying records or dashboard folder."
  },
  {
    "id": 100,
    "section": "agentforce",
    "stem": [
      "A Platform Administrator created a new prompt template and is testing it. Every time the administrator tests the template, it gives a different response.",
      {
        "ask": "Why is the prompt template giving different responses each time it's run?"
      }
    ],
    "choices": [
      "Prompt Builder caches the large language model's response, so the prompt is only sent once for every template the administrator creates.",
      "Every time the administrator runs a prompt template in Prompt Builder, it creates a unique call to the large language model.",
      "The prompt is only sent to the large language model after the administrator deploys the template to a live agent, not when the prompt is run in the builder.",
      "Prompt Builder runs a simulated call to the large language model to save on costs, so the prompt is never sent to the actual model."
    ],
    "answer": "B",
    "focus": "must",
    "group": "agent-prompts",
    "why": "Each test invokes the language model again, so a generative response can vary even when the prompt template is unchanged.",
    "wrong": {
      "A": "Prompt Builder does not simply reuse one cached answer for every test.",
      "C": "Testing a template can call the model before an agent is deployed.",
      "D": "The test is not universally a simulated response that never calls the actual model."
    },
    "notes": "Variation does not by itself indicate a broken template. Ground the prompt, define the output format, evaluate multiple runs, and use deterministic validation when exact business outcomes matter."
  },
  {
    "id": 101,
    "section": "sales",
    "stem": [
      "A Platform Administrator at Cloud Kicks would like to use Salesforce to start tracking details around its marketing efforts. They would like to track details around emails, trade shows, and webinars. Additionally, each of these initiatives will need to track different types of information.",
      {
        "ask": "How should the administrator accomplish this?"
      }
    ],
    "choices": [
      "Create a custom report type with relevant fields.",
      "Create a custom field on the Campaign object for the type of initiative.",
      "Create record types and page layouts for each type of campaign.",
      "Use campaign hierarchies to organize campaign types."
    ],
    "answer": "C",
    "focus": "high",
    "group": "sales",
    "why": "Campaign record types and page layouts support different marketing initiative types with their own visible fields and picklist options.",
    "wrong": {
      "A": "A report type controls reporting relationships, not the campaign data-entry experience.",
      "B": "A single category field alone does not implement distinct layouts.",
      "D": "Campaign hierarchy organizes related campaigns rather than supplies type-specific layouts."
    },
    "notes": "Use record types for meaningful business-process variations and layouts for the relevant data-entry presentation. Avoid creating record types solely as substitutes for record-level security."
  },
  {
    "id": 102,
    "section": "experience",
    "stem": [
      "The changed layout has already been saved. A sandbox contains its known-good version; the different profile's layout in option A has different content.",
      "Ursa Major Solar's Platform Administrator is editing the page layout for a new custom object. A text area field is accidentally removed from the page layout, and it needs to be restored to the page layout.",
      {
        "ask": "What are two methods for achieving this goal?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Clone the layout from a different profile and use save as.",
      "Restore original page layout from a sandbox.",
      "Restore from the recycle bin within 15 days.",
      "From the fields palette, drag the field into the same position."
    ],
    "answer": "B,D",
    "type": "multi",
    "focus": "familiar",
    "group": "experience",
    "why": "The field can be restored by recreating the layout from a known-good sandbox or by dragging it back from the fields palette.",
    "wrong": {
      "A": "Cloning an arbitrary different profile’s layout does not guarantee restoration of this layout’s original content.",
      "C": "The field was removed from a layout, not deleted into the Recycle Bin."
    },
    "notes": "A layout removal does not erase the field definition or stored values. If the change has not been saved, Undo or Cancel may be simpler; otherwise restore only the affected layout metadata.",
    "source": {
      "stem": [
        "Ursa Major Solar's Platform Administrator is editing the page layout for a new custom object. A text area field is accidentally removed from the page layout, and it needs to be restored to the page layout.",
        {
          "ask": "What are two methods for achieving this goal?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "Clone the layout from a different profile and use save as.",
        "Restore original page layout from a sandbox.",
        "Restore from the recycle bin within 15 days.",
        "From the fields palette, drag the field into the same position."
      ],
      "answer": "B,D"
    },
    "printed": "B,D",
    "repaired": true
  },
  {
    "id": 103,
    "section": "experience",
    "stem": [
      "A Platform Administrator at Ursa Major Solar wants to add prepopulated subjects for Tasks and Events. Tasks should have the subjects 'Schedule Site Visit' and 'Send Contract', while Events should have the subjects 'Site Visit' and 'Ride Along'.",
      {
        "ask": "What should the administrator configure to achieve this requirement?"
      }
    ],
    "choices": [
      "Add the new values to the predefined field values for the global actions New Event and New Task.",
      "Add Schedule Site Visit and Send Contract picklist values for the Task subject field. Add Site Visit and Ride Along picklist values for the Event subject field.",
      "Create a new custom Subject picklist field on Activity and add the field values.",
      "Include Schedule Site Visit, Send Contract, Site Visit, and Ride Along picklist values for the Activity subject field."
    ],
    "answer": "B",
    "focus": "high",
    "group": "sales",
    "why": "Task and Event Subject fields support the predefined subject choices described in the source.",
    "wrong": {
      "A": "A predefined quick-action field value selects a default; it is not the same as adding the requested subject choices.",
      "C": "A new custom field is unnecessary when the standard Subject behavior meets the requirement.",
      "D": "Task and Event have distinct subject choices rather than one combined generic activity picklist."
    },
    "notes": "Subject can behave as an editable combo-style field rather than a strictly restricted picklist. Distinguish adding suggested subjects from enforcing that users can choose only those subjects."
  },
  {
    "id": 104,
    "section": "experience",
    "stem": [
      "A Platform Administrator creates a custom text field on the Account object and adds it to the service team's page layout. The service team manager loves the addition of this field and wants it to appear in the highlights panel so that the service reps can quickly find it when on the Account page.",
      {
        "ask": "How should the administrator accomplish this?"
      }
    ],
    "choices": [
      "In the Account object manager, create a custom compact layout.",
      "Make the field required and move it to the top of the page.",
      "Create a new page layout and a new section titled highlights panel.",
      "From the page layout editor, drag the field to the highlights panel."
    ],
    "answer": "A",
    "focus": "high",
    "group": "experience",
    "why": "A custom compact layout can place a supported Text field in the record highlights panel.",
    "wrong": {
      "B": "Requiredness and position on the full page layout do not select highlights-panel fields.",
      "C": "A page-layout section named highlights panel does not configure the actual component.",
      "D": "Dragging a field on the full layout is not compact-layout configuration."
    },
    "notes": [
      "Field type corrected: the source asked to place a Text Area field in a compact layout. Text Area, Long Text Area, Rich Text Area, and multi-select picklists are excluded; the repaired question uses a supported Text field.",
      "Salesforce: https://help.salesforce.com/s/articleView?id=platform.compact_layout_notes.htm&language=en_US&type=5"
    ],
    "printed": "A",
    "source": {
      "stem": [
        "A Platform Administrator creates a custom text area field on the Account object and adds it to the service team's page layout. The service team manager loves the addition of this field and wants it to appear in the highlights panel so that the service reps can quickly find it when on the Account page.",
        {
          "ask": "How should the administrator accomplish this?"
        }
      ],
      "choices": [
        "In the Account object manager, create a custom compact layout.",
        "Make the field required and move it to the top of the page.",
        "Create a new page layout and a new section titled highlights panel.",
        "From the page layout editor, drag the field to the highlights panel."
      ],
      "answer": "A"
    },
    "repaired": true
  },
  {
    "id": 105,
    "section": "agentforce",
    "stem": [
      "The existing session and its conversation history are successfully saved during the handoff. Authorized reps can find that history separately, but it is absent on their Case record page.",
      "Agentforce is escalating cases to the support team, but the support team complains they have no context and have to ask the customer to repeat everything.",
      {
        "ask": "Which configuration issue is the most likely cause of this issue?"
      }
    ],
    "choices": [
      "The support team members are missing the Agentforce User permission set.",
      "The support team's case page layout is missing the agent history component.",
      "The agent's instructions are preventing the history and context from being saved.",
      "The handoff is creating a new case instead of transferring the existing session."
    ],
    "answer": "B",
    "focus": "high",
    "group": "agent-actions",
    "why": "Because the session history was captured and the reps can access it, check the receiving page's supported conversation/history component and visibility. The stated problem is displaying existing context, not generating it.",
    "wrong": {
      "A": "The scenario states that these reps already have access to the saved history; the missing view on this page points to its component configuration.",
      "C": "Instructions do not replace the configured storage and display of conversation history.",
      "D": "The scenario specifies that the existing session was preserved; it does not describe replacing it with an unrelated new case."
    },
    "notes": "In a real handoff, verify both that context is transferred or stored and that the receiving console exposes it with the right permissions. Adding a component cannot recover context that was never captured.",
    "source": {
      "stem": [
        "Agentforce is escalating cases to the support team, but the support team complains they have no context and have to ask the customer to repeat everything.",
        {
          "ask": "Which configuration issue is the most likely cause of this issue?"
        }
      ],
      "choices": [
        "The support team members are missing the Agentforce User permission set.",
        "The support team's case page layout is missing the agent history component.",
        "The agent's instructions are preventing the history and context from being saved.",
        "The handoff is creating a new case instead of transferring the existing session."
      ],
      "answer": "B"
    },
    "printed": "B",
    "repaired": true
  },
  {
    "id": 106,
    "section": "analytics",
    "stem": [
      "A Platform Administrator wants to limit the kinds of reports their users can create.",
      {
        "ask": "Which tool should the administrator use?"
      }
    ],
    "choices": [
      "Hide Report Types",
      "Report Folder Sharing",
      "Standard Report Types",
      "Joined Report"
    ],
    "answer": "A",
    "focus": "familiar",
    "group": "analytics",
    "why": "Hide Report Types controls which report types appear for users when they create reports.",
    "wrong": {
      "B": "Folder sharing controls access to saved reports rather than which report types can be selected.",
      "C": "Standard report types are reporting definitions, not the visibility-management tool.",
      "D": "A joined report is a report format rather than the report-type catalog control."
    },
    "notes": "Hiding a report type simplifies report creation; it is not a replacement for object, field, and record security. Review access to existing saved reports separately."
  },
  {
    "id": 107,
    "section": "experience",
    "stem": [
      "The Activity Timeline is missing from the Account record page.",
      {
        "ask": "What should a Platform Administrator do to correct this?"
      }
    ],
    "choices": [
      "Add the standard Activities component to the Account Lightning record page.",
      "Update the user's permission to allow Edit access to the Activity Timeline.",
      "Run a report to verify whether any activities have been logged for that Account.",
      "Add a button for the Activity Timeline in the Object Manager for the Account object."
    ],
    "answer": "A",
    "focus": "high",
    "group": "experience",
    "why": "Add the standard Activities component to the Lightning record page to show the Activity Timeline.",
    "wrong": {
      "B": "There is no general Edit Activity Timeline permission that adds a missing page component.",
      "C": "Existing activity data does not make the absent component appear.",
      "D": "A custom button is not how the standard timeline is placed on a Lightning page."
    },
    "notes": "Verify page activation and assignment to the user’s app, profile, and record type. Then check activity access, page-layout actions, and the object’s activity support."
  },
  {
    "id": 108,
    "section": "automation",
    "stem": [
      "A Platform Administrator at Universal Containers has a screen flow that helps users create new leads. When Lead Source is 'Search Engine', the administrator needs to require the user to choose a specific search engine from a picklist. If Lead Source is not 'Search Engine', this picklist should be hidden.",
      {
        "ask": "What is the most efficient way for the administrator to complete this requirement?"
      },
      "A and C both describe conditional visibility on the screen picklist. Either single selection is accepted; the visible picklist must also be configured as required."
    ],
    "choices": [
      "Use a conditional filter in the screen element to only show the Specific Search Engine field only when Lead Source is 'Search Engine'.",
      "Use Assignment elements; one for when Lead Source is 'Search Engine' and one for everything else.",
      "Create a picklist for Specific Search Engine, and set conditional visibility so that it is only shown when Lead Source is 'Search Engine'.",
      "Configure a picklist for Specific Search Engine, and use a validation rule to conditionally show only when Lead Source is 'Search Engine'."
    ],
    "answer": "A,C",
    "focus": "must",
    "group": "flows",
    "why": "Both A and C describe showing the screen component only when Lead Source is Search Engine. Configure the picklist as required while visible and test changes to the controlling value. The two descriptions are equivalent for this requirement.",
    "wrong": {
      "B": "Assignment elements set resource values and do not directly control screen-component visibility.",
      "D": "A validation rule can reject a save but cannot hide a screen component."
    },
    "notes": [
      "Set requiredness appropriately for the visible component and test what happens when Lead Source changes back. Visibility, input collection, and save-time validation are separate concerns.",
      "Online variants retain both descriptions; differences in answer letters do not make one visibility description invalid. Primary reference: https://help.salesforce.com/s/articleView?id=platform.flow_ref_elements_screen_conditional_visibility.htm&language=en_US&type=5"
    ],
    "source": {
      "stem": [
        "A Platform Administrator at Universal Containers has a screen flow that helps users create new leads. When Lead Source is 'Search Engine', the administrator needs to require the user to choose a specific search engine from a picklist. If Lead Source is not 'Search Engine', this picklist should be hidden.",
        {
          "ask": "What is the most efficient way for the administrator to complete this requirement?"
        }
      ],
      "choices": [
        "Use a conditional filter in the screen element to only show the Specific Search Engine field only when Lead Source is 'Search Engine'.",
        "Use Assignment elements; one for when Lead Source is 'Search Engine' and one for everything else.",
        "Create a picklist for Specific Search Engine, and set conditional visibility so that it is only shown when Lead Source is 'Search Engine'.",
        "Configure a picklist for Specific Search Engine, and use a validation rule to conditionally show only when Lead Source is 'Search Engine'."
      ],
      "answer": "C"
    },
    "printed": "C",
    "acceptAny": true,
    "repaired": true
  },
  {
    "id": 109,
    "section": "data",
    "stem": [
      "Universal Containers' Platform Administrator has been asked to create a many-to-many relationship between two existing custom objects.",
      {
        "ask": "Which two steps should the administrator take when enabling the many-to-many relationship?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Create a junction with a custom object.",
      "Create two master-detail relationships on the new object.",
      "Create URL fields on a custom object.",
      "Create two lookup relationships on the new object."
    ],
    "answer": "A,B",
    "type": "multi",
    "focus": "must",
    "group": "model",
    "why": "A junction custom object with two master-detail relationships implements the standard many-to-many relationship pattern.",
    "wrong": {
      "C": "URL fields store links and do not create relational integrity.",
      "D": "Two lookups can model associations, but do not provide the standard master-detail junction behavior asked for here."
    },
    "notes": "Each junction record represents one association between two master records. Review inherited access, cascade deletion, and the primary-versus-secondary master relationship behavior."
  },
  {
    "id": 110,
    "section": "agentforce",
    "stem": [
      "A Platform Administrator is building an agent to nurture leads.",
      {
        "ask": "How does Agentforce SDR help?"
      }
    ],
    "choices": [
      "Generate a dynamic call script and talking points for the human sales reps to use.",
      "Autonomously negotiate pricing with the lead and close the final deal.",
      "Analyze the performance of human sales reps and provide coaching tips.",
      "Answer the lead's questions with responses that are grounded in company data."
    ],
    "answer": "D",
    "focus": "high",
    "group": "sales",
    "why": "The sales-development agent can respond to lead questions using approved, grounded company information.",
    "wrong": {
      "A": "Drafting human call scripts is not the main autonomous lead-nurturing behavior in this question.",
      "B": "Lead nurturing does not imply authority to negotiate pricing and close the deal.",
      "C": "Coaching human sales reps is a different sales-agent use case."
    },
    "notes": "Keep qualification, nurturing, sales coaching, and deal closing distinct. Define escalation and scheduling boundaries and ensure generated communications respect consent and approved company content."
  },
  {
    "id": 111,
    "section": "data",
    "stem": [
      "Cloud Kicks uses the standard Account Type field to indicate different account tiers. Users find this confusing, so management has asked that the field be changed to read 'Tier' on the page layouts.",
      {
        "ask": "How should a Platform Administrator implement this change?"
      }
    ],
    "choices": [
      "Edit the Type field and change the name.",
      "Use Rename Tabs and Labels.",
      "Build a custom field called Tier and delete Type.",
      "Create a global picklist value set."
    ],
    "answer": "B",
    "focus": "high",
    "group": "model",
    "why": "Rename Tabs and Labels can change the displayed label of supported standard fields without replacing the field.",
    "wrong": {
      "A": "Directly renaming a standard field through the generic custom-field editor is not the specified supported route.",
      "C": "Deleting and replacing a standard field is unnecessary and may not be possible.",
      "D": "A global value set manages picklist values rather than changes the field label."
    },
    "notes": "A label change does not change the field’s API identity or automatically rename every custom formula label, document, and integration reference. Update supporting user guidance consistently."
  },
  {
    "id": 112,
    "section": "security",
    "stem": [
      "Universal Containers (UC) has a private sharing model for Opportunities and uses Opportunity teams. Criteria-based sharing rules are not used. A sales rep at UC leaves the company, and their user record is deactivated. The rep is later rehired in the same role. A Platform Administrator activates the old user record. The user is added to the same default Opportunity teams but is no longer able to see the same records the user worked on before leaving the company.",
      {
        "ask": "What is the likely cause?"
      }
    ],
    "choices": [
      "The stage of the opportunity records was changed to Closed Lost.",
      "The record type of the opportunity records was changed.",
      "The records were manually shared with the user.",
      "Permission sets were removed when the user was deactivated."
    ],
    "answer": "C",
    "focus": "high",
    "group": "security",
    "why": "Manual record shares can be removed on deactivation and are not automatically recreated just by reactivating the user.",
    "wrong": {
      "A": "An opportunity’s stage does not by itself explain loss of the former user’s manual share.",
      "B": "A record-type change does not automatically define this manual-sharing lifecycle.",
      "D": "Deactivation does not universally remove every permission-set assignment as this option assumes."
    },
    "notes": "Reactivation is not a full restoration of all previous sharing state. Review manual and team access explicitly; rebuilding default teams is not the same as restoring each record’s old manual shares."
  },
  {
    "id": 113,
    "section": "experience",
    "stem": [
      "An administrator at DreamHouse Realty needs to create customized pages for the Salesforce mobile app.",
      {
        "ask": "Which two types of pages should a Platform Administrator build and customize using the Lightning App Builder?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "App page",
      "User page",
      "Record page",
      "Dashboard page"
    ],
    "answer": "A,C",
    "type": "multi",
    "focus": "high",
    "group": "experience",
    "why": "Lightning App Builder supports app pages and record pages that can be configured for supported mobile use.",
    "wrong": {
      "B": "User page is not a Lightning App Builder page type for this request.",
      "D": "Dashboards have their own builder rather than being this Lightning App Builder page type."
    },
    "notes": "Use mobile-supported components and form factors and activate the page for the intended app. Home pages and utility experiences have separate support considerations."
  },
  {
    "id": 114,
    "section": "data",
    "stem": [
      "Users at Cloud Kicks are reporting different options when updating a custom picklist on the Opportunity object based on the kind of opportunity.",
      {
        "ask": "Where should a Platform Administrator update the option in the picklist?"
      }
    ],
    "choices": [
      "Related lookup filters",
      "Record type",
      "Picklist value sets",
      "Fields and relationships"
    ],
    "answer": "B",
    "focus": "must",
    "group": "model",
    "why": "Record types control which values from a picklist’s defined value set are available for a given business process.",
    "wrong": {
      "A": "Lookup filters constrain related-record selection rather than picklist value subsets.",
      "C": "A value set defines the available universe of values, not each opportunity type’s selected subset.",
      "D": "Fields and Relationships defines the field but does not alone assign a different value subset to each record type."
    },
    "notes": "For opportunity Stage, the sales process supplies the stage set associated with a record type. For other picklists, maintain record-type value assignments and defaults."
  },
  {
    "id": 115,
    "section": "sales",
    "stem": [
      "Sales reps at Ursa Major Solar are having difficulty managing deals. The leadership team has asked a Platform Administrator to help sales reps prioritize and close more deals.",
      {
        "ask": "What should the administrator configure to help with these issues?"
      }
    ],
    "choices": [
      "Einstein Search Personalization",
      "Einstein Lead Scoring",
      "Einstein Opportunity Scoring",
      "Einstein Activity Capture"
    ],
    "answer": "C",
    "focus": "high",
    "group": "sales",
    "why": "Einstein Opportunity Scoring helps prioritize opportunities using predicted likelihood and contributing signals.",
    "wrong": {
      "A": "Search personalization changes search relevance rather than scores opportunities.",
      "B": "Lead Scoring prioritizes unconverted leads rather than existing opportunities.",
      "D": "Activity Capture records communications and is not the opportunity-scoring feature."
    },
    "notes": "A score is decision support, not a guarantee of a win. Availability, licensing, model eligibility, and data quality affect how scoring can be used."
  },
  {
    "id": 116,
    "section": "sales",
    "stem": [
      "Senior leadership wants to be notified of any opportunities over $250,000 with more than a 75% probability of closing.",
      {
        "ask": "Which feature should a Platform Administrator set up to facilitate this?"
      }
    ],
    "choices": [
      "Guidance for Success",
      "Big Deal Alerts",
      "Reports and Dashboards",
      "Similar Opportunities"
    ],
    "answer": "B",
    "focus": "familiar",
    "group": "sales",
    "why": "Big Deal Alerts support notification thresholds based on opportunity amount and probability.",
    "wrong": {
      "A": "Guidance for Success is stage guidance within Path.",
      "C": "Reports and dashboards can monitor deals, but the specific threshold-alert feature is the direct answer.",
      "D": "Similar Opportunities helps compare deals rather than sends the threshold notification."
    },
    "notes": "Check the org’s alert configuration and notification recipients. For richer routing or complex exceptions, Flow may be appropriate; that does not change the feature named by this question."
  },
  {
    "id": 117,
    "section": "security",
    "stem": [
      "Cloud Kicks has an administrator team that manages the org. The company has asked for a small subset of leadership users to have Modify All access, like the administrators have. They need Modify All on a specified business object, not Modify All Data or setup administration.",
      {
        "ask": "How should the administrator team accomplish this?"
      }
    ],
    "choices": [
      "Assign the standard Platform User profile to the leadership users and edit the permissions to Modify All access.",
      "Assign the standard System Administrator profile to the leadership users that includes the Modify All access.",
      "Assign the standard User profile to the leadership users and add a custom permission set with Modify All access.",
      "Clone the standard User profile to the leadership users and assign a Modify All role to grant access."
    ],
    "answer": "C",
    "focus": "must",
    "group": "security",
    "why": "A permission set can add the specific Modify All object permissions without giving leadership a full System Administrator profile.",
    "wrong": {
      "A": "Standard profile object permissions cannot simply be edited to add this access.",
      "B": "System Administrator grants far more setup and data authority than required.",
      "D": "Roles do not grant object-level Modify All permissions."
    },
    "notes": "Modify All on an object differs from Modify All Data across the org. Grant the minimum required scope and review the effect on sharing restrictions before assigning elevated permissions.",
    "source": {
      "stem": [
        "Cloud Kicks has an administrator team that manages the org. The company has asked for a small subset of leadership users to have Modify All access, like the administrators have.",
        {
          "ask": "How should the administrator team accomplish this?"
        }
      ],
      "choices": [
        "Assign the standard Platform User profile to the leadership users and edit the permissions to Modify All access.",
        "Assign the standard System Administrator profile to the leadership users that includes the Modify All access.",
        "Assign the standard User profile to the leadership users and add a custom permission set with Modify All access.",
        "Clone the standard User profile to the leadership users and assign a Modify All role to grant access."
      ],
      "answer": "C"
    },
    "printed": "C",
    "repaired": true
  },
  {
    "id": 118,
    "section": "analytics",
    "stem": [
      "A sales manager at Cloud Kicks would like a dashboard to emphasize some important data and tell a more compelling data story to the sales reps.",
      {
        "ask": "How should a Platform Administrator achieve this for the sales manager?"
      }
    ],
    "choices": [
      "Use a Text Widget.",
      "Assign a new Task to each rep.",
      "Use the Highlights Panel.",
      "Send out a mass email."
    ],
    "answer": "A",
    "focus": "familiar",
    "group": "analytics",
    "why": "A text widget adds narrative context, instructions, or commentary alongside dashboard data.",
    "wrong": {
      "B": "A task does not add explanatory content to the dashboard.",
      "C": "The record highlights panel is not a dashboard narrative widget.",
      "D": "A mass email communicates outside the dashboard rather than annotates it."
    },
    "notes": "Keep dashboard commentary concise and current. Text and image widgets should explain the metrics and assumptions, not obscure the source data or imply that a static note updates automatically."
  },
  {
    "id": 119,
    "section": "automation",
    "stem": [
      "A Platform Administrator at Universal Containers needs an automated way to delete records based on field values.",
      {
        "ask": "Which automated solution should the administrator use?"
      }
    ],
    "choices": [
      "Flow Builder",
      "Automation Studio",
      "Mass Delete Records",
      "Flow Orchestration"
    ],
    "answer": "A",
    "focus": "high",
    "group": "flows",
    "why": "Flow Builder can find and delete qualifying records through the appropriate flow type and Delete Records element.",
    "wrong": {
      "B": "Automation Studio is associated with Marketing Cloud and is not the Salesforce-record tool intended here.",
      "C": "Mass Delete is an administrator-initiated utility, not the requested field-driven automated process.",
      "D": "Orchestration coordinates multi-stage work rather than being necessary for straightforward deletion logic."
    },
    "notes": "Define a narrow record scope, execution schedule or trigger, permissions, and failure handling. Automated deletion can affect related records and downstream integrations; test it carefully before activation."
  },
  {
    "id": 120,
    "section": "automation",
    "stem": [
      "Ursa Major Solar wants to assist users with a guided expense report process to simplify submissions, routing, and authorizations.",
      {
        "ask": "Which two tools should a Platform Administrator use to build this solution?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Validation Rule",
      "Quick Action",
      "Flow Builder",
      "Approval Process"
    ],
    "answer": "C,D",
    "type": "multi",
    "focus": "high",
    "group": "approvals",
    "why": "A screen flow can guide expense submission while an approval process routes the resulting record for review and authorization.",
    "wrong": {
      "A": "A validation rule can check data but does not provide the guided interview and approval chain.",
      "B": "A quick action can launch a process but does not itself implement the entire guided flow and approval mechanism."
    },
    "notes": "Flow handles data collection and preparation; approval handles decisions, routing, and recorded outcomes. Define who can submit and which record qualifies before connecting them."
  },
  {
    "id": 121,
    "section": "experience",
    "stem": [
      "The Cloud Kicks sales team has asked that two of the fields that appear on the Opportunity cards in Kanban view be changed to make the cards more meaningful.",
      {
        "ask": "Which feature should a Platform Administrator access to make this change?"
      }
    ],
    "choices": [
      "Record Type",
      "List view field selection (Select Fields to Display)",
      "Page Layout",
      "Kanban Settings"
    ],
    "answer": "B",
    "focus": "high",
    "group": "experience",
    "why": "Kanban card fields come from the corresponding list-view field selection.",
    "wrong": {
      "A": "Record types select business-process variations rather than the visible list columns used on cards.",
      "C": "A full page layout does not directly select the displayed list-view card fields.",
      "D": "Kanban Settings primarily selects grouping and summarization, not the list-view field selection."
    },
    "notes": [
      "Option B corrected: the source confused card content with the Kanban details panel. Compact layouts control the top fields in the details panel; list-view field selection controls the card fields.",
      "Salesforce: https://trailhead.salesforce.com/content/learn/modules/lightning-experience-for-salesforce-classic-users/work-with-list-views",
      "Salesforce: https://help.salesforce.com/s/articleView?id=sf.kanban_considerations_admin.htm&language=en_US&type=5"
    ],
    "printed": "B",
    "source": {
      "stem": [
        "The Cloud Kicks sales team has asked that two of the fields that appear on the Opportunity cards in Kanban view be changed to make the cards more meaningful.",
        {
          "ask": "Which feature should a Platform Administrator access to make this change?"
        }
      ],
      "choices": [
        "Record Type",
        "Compact Layout",
        "Page Layout",
        "Kanban Settings"
      ],
      "answer": "B"
    },
    "repaired": true
  },
  {
    "id": 122,
    "section": "automation",
    "stem": [
      {
        "ask": "Which Salesforce feature allows a Platform Administrator to automate the routing of records to specific users for review and decision-making based on predefined criteria?"
      }
    ],
    "choices": [
      "Assignment Rules",
      "Validation Rules",
      "Approval Process",
      "Schema Builder"
    ],
    "answer": "C",
    "focus": "familiar",
    "group": "approvals",
    "why": "An approval process routes qualifying records to designated approvers for a decision.",
    "wrong": {
      "A": "Assignment rules route ownership rather than record an approval decision.",
      "B": "Validation rules prevent invalid saves rather than request a reviewer’s decision.",
      "D": "Schema Builder displays and edits the data model rather than routes review work."
    },
    "notes": "Learn the distinction between routing ownership and routing approval. Entry criteria select eligible records, steps select approvers, and actions handle the resulting outcomes."
  },
  {
    "id": 123,
    "section": "automation",
    "stem": [
      "Once an opportunity reaches the negotiation stage at Cloud Kicks, the Amount field becomes required for sales users. Sales managers need to be able to move opportunities into this stage without knowing the amount.",
      {
        "ask": "How should a Platform Administrator require this field during the negotiation stage for sales users but allow their managers to make changes?"
      }
    ],
    "choices": [
      "Make the field required for all users.",
      "Assign the Administrator profile to the managers.",
      "Configure a validation rule to meet the criteria.",
      "Create a formula field to fill in the field for managers."
    ],
    "answer": "C",
    "focus": "high",
    "group": "validation",
    "why": "A validation rule can require Amount at Negotiation while excluding authorized managers from that condition.",
    "wrong": {
      "A": "Universal requiredness also applies to the managers who need the exception.",
      "B": "System Administrator access is excessive and does not represent a narrow business-rule exception.",
      "D": "A formula computes a value but does not implement the specified conditional requirement."
    },
    "notes": "Prefer a custom permission for the exemption rather than hardcoding a manager’s name or profile label. Define whether the rule applies on every edit or only on stage transition."
  },
  {
    "id": 124,
    "section": "data",
    "stem": [
      "A sales rep has a list of 300 accounts with contacts that they want to load at one time.",
      {
        "ask": "Which built-in guided import tool is the simplest fit for these supported Account and Contact records?"
      }
    ],
    "choices": [
      "Dataloader.io",
      "Manual Import",
      "Data Import Wizard",
      "Data Loader"
    ],
    "answer": "C",
    "focus": "low",
    "group": "data",
    "why": "Data Import Wizard is the simplest built-in guided tool for this supported accounts-and-contacts import.",
    "wrong": {
      "A": "Dataloader.io can import data but is unnecessary for the straightforward built-in workflow.",
      "B": "Manual entry is inefficient and error-prone at this record count.",
      "D": "Data Loader can import data, but it is more operationally involved than the wizard for this simple request."
    },
    "notes": "This repeats Question 60 with reordered choices. Preserve the concept rather than the letter: Data Import Wizard is B in Question 60 and C here.",
    "source": {
      "stem": [
        "A sales rep has a list of 300 accounts with contacts that they want to load at one time.",
        {
          "ask": "Which tool should a Platform Administrator utilize to import the records to Salesforce?"
        }
      ],
      "choices": [
        "Dataloader.io",
        "Manual Import",
        "Data Import Wizard",
        "Data Loader"
      ],
      "answer": "C"
    },
    "printed": "C",
    "repaired": true
  },
  {
    "id": 125,
    "section": "analytics",
    "stem": [
      {
        "ask": "How should a Platform Administrator provide users with individualized views of data on a dashboard?"
      }
    ],
    "choices": [
      "Add a Dashboard Filter to change the dashboard view.",
      "Create a Dynamic Dashboard.",
      "Set View Dashboard As to Me.",
      "Set View Dashboard As to Another person."
    ],
    "answer": "B",
    "focus": "must",
    "group": "analytics",
    "why": "A dynamic dashboard runs using the current viewer’s access, creating an individualized view without maintaining a separate dashboard for each person.",
    "wrong": {
      "A": "A filter changes displayed values but does not necessarily change the running user’s access context.",
      "C": "Running as the author fixes the data context to that author.",
      "D": "Running as another specific person is also a fixed context rather than each current viewer."
    },
    "notes": "Folder sharing still determines who can open the dashboard. Dynamic dashboards respect the viewer’s records; they are not a mechanism for bypassing Private sharing."
  },
  {
    "id": 126,
    "section": "service",
    "stem": [
      "Ursa Major Solar classifies its accounts as Silver, Gold, or Platinum Level. When a new case is created for a Silver or Gold partner, it should go to the Regular Support Queue. When an account is Platinum Level, it should automatically go to the Priority Support Queue.",
      {
        "ask": "What should a Platform Administrator use to achieve this?"
      }
    ],
    "choices": [
      "Escalation Rules",
      "Assignment Rules",
      "Case Rules",
      "Workflow Rules"
    ],
    "answer": "B",
    "focus": "high",
    "group": "service",
    "why": "Case assignment rules can select the initial queue using criteria such as the related account’s support tier.",
    "wrong": {
      "A": "Escalation rules are designed for age-based reassignment rather than initial tier-based routing.",
      "C": "Case Rules is not the specific standard configuration feature named here.",
      "D": "Workflow rules are not the direct case assignment mechanism and are a legacy automation tool."
    },
    "notes": "Ensure the relevant account/tier information is available to the rule, using supported related fields or a suitable derived field. The assignment rule must be invoked by the creation channel."
  },
  {
    "id": 127,
    "section": "security",
    "stem": [
      "A Platform Administrator at Cloud Kicks has set up a junior administrator as a delegated administrator in Salesforce.",
      {
        "ask": "What should the Platform Administrator consider regarding delegated administrators?"
      }
    ],
    "choices": [
      "Delegated administrators can unlock users but cannot reset passwords.",
      "Delegated administrators can update field-level security on standard objects.",
      "Delegated administrators cannot modify permission sets.",
      "Delegated administrators cannot assign users to profiles."
    ],
    "answer": "C",
    "focus": "high",
    "group": "users",
    "why": "Delegated administration permits scoped assignments but does not by itself permit modifying permission-set definitions.",
    "wrong": {
      "A": "Delegated administrators can reset passwords within their authorized scope.",
      "B": "Delegated administration is not a grant to edit standard-object field-level security.",
      "D": "They can assign profiles explicitly allowed by their delegated administration configuration."
    },
    "notes": [
      "Distinguish assigning a permission set from editing its permissions. Delegated administrators remain constrained by their delegated scope; additional separately granted permissions can expand their capabilities.",
      "Salesforce: https://help.salesforce.com/s/articleView?id=platform.admin_delegate.htm&language=en_US&type=5"
    ]
  },
  {
    "id": 128,
    "section": "agentforce",
    "stem": [
      "A Platform Administrator needs to create a new prompt template to automatically summarize customer cases for a sales team. The administrator wants to dynamically populate the response with data from the case record.",
      {
        "ask": "What should the administrator use to display real Salesforce data in an agent response from a prompt template?"
      }
    ],
    "choices": [
      "Flow",
      "Picklists",
      "Agent Instructions",
      "Merge Fields"
    ],
    "answer": "D",
    "focus": "must",
    "group": "agent-prompts",
    "why": "Merge fields insert actual record values into a prompt template so the generated response can use Salesforce data.",
    "wrong": {
      "A": "Flow can provide grounding resources in some designs, but a direct field insertion uses merge fields.",
      "B": "Picklists store constrained values rather than insert record data into a prompt.",
      "C": "Agent instructions guide behavior but are not the template’s record-field substitution mechanism."
    },
    "notes": "Merge fields ground the prompt at execution time; the model still generates the response. Respect access controls and avoid including unnecessary sensitive fields."
  },
  {
    "id": 129,
    "section": "sales",
    "stem": [
      "A sales rep at Ursa Major Solar has launched a series of networking events. They are hosting one event per month and want to be able to report on Campaign ROI by month and series.",
      {
        "ask": "How should a Platform Administrator set up the Campaign to simplify reporting?"
      }
    ],
    "choices": [
      "Create individual Campaigns that all have the same name.",
      "Configure Campaign Member Statuses to record which event Members attended.",
      "Use Campaign Hierarchy where the monthly events roll up to a parent Campaign.",
      "Add different record types for the monthly event types."
    ],
    "answer": "C",
    "focus": "high",
    "group": "sales",
    "why": "Campaign hierarchy groups the monthly campaigns under a parent campaign for aggregate series reporting.",
    "wrong": {
      "A": "Repeated names do not create a reliable parent-child reporting relationship.",
      "B": "Campaign Member Status tracks a person’s campaign participation rather than links campaigns into a series.",
      "D": "Record types classify campaign variations but do not supply hierarchical roll-up relationships."
    },
    "notes": "Keep campaign dates, costs, influenced opportunities, and member attribution consistent. A hierarchy supplies structure; useful ROI still depends on accurate campaign and revenue attribution data."
  },
  {
    "id": 130,
    "section": "service",
    "stem": [
      "At Cloud Kicks, cases are being assigned a default Case Owner and showing a Created By and Last Modified By that is not expected. The company wants to change this to an integration user to alleviate confusion with the business.",
      {
        "ask": "What should a Platform Administrator edit to change this in Salesforce?"
      }
    ],
    "choices": [
      "Process Automation Settings",
      "Debug Logs",
      "Support Processes",
      "Support Settings"
    ],
    "answer": "D",
    "focus": "high",
    "group": "service",
    "why": "Support Settings contains case defaults such as the default owner and Automated Case User relevant to system-created case attribution.",
    "wrong": {
      "A": "Process Automation Settings has other automation defaults, not the primary case defaults in this scenario.",
      "B": "Debug logs help investigate behavior but do not configure the default case user.",
      "C": "Support processes define available case statuses rather than the system user and fallback owner."
    },
    "notes": "Distinguish case owner, record creator, and automation-running user. Email-to-Case, assignment rules, integrations, and other automation can also affect these values; confirm the actual creation path."
  },
  {
    "id": 131,
    "section": "experience",
    "stem": [
      "A Platform Administrator wants to customize the navigation menu for users in the Salesforce mobile app. The organization has not yet implemented any Lightning apps for mobile use.",
      {
        "ask": "Which statement about the Mobile Only app navigation is correct?"
      }
    ],
    "choices": [
      "Lightning pages and Visualforce pages automatically appear in the Mobile Only navigation menu without requiring tabs to be created first.",
      "The Mobile Only app can be customized to show different navigation menus for different user profiles and permission sets.",
      "The first four items in the Mobile Only navigation menu appear both in the navigation menu and in the navigation bar at the bottom of the screen.",
      "The Mobile Only app automatically includes all standard Salesforce objects in the navigation menu based on user permissions."
    ],
    "answer": "C",
    "focus": "familiar",
    "group": "experience",
    "why": "For the Mobile Only navigation described, the first four navigation items also populate the bottom navigation bar.",
    "wrong": {
      "A": "Pages normally need the appropriate navigation item or tab configuration; they do not all appear automatically.",
      "B": "Mobile Only navigation does not provide arbitrary different menus per profile or permission set in the way claimed.",
      "D": "The menu is configured; it does not automatically include every permitted standard object."
    },
    "notes": "This question explicitly concerns Mobile Only rather than a custom Lightning mobile app. App-based navigation and supported mobile behavior can differ, so avoid applying this rule to every app navigation experience."
  },
  {
    "id": 132,
    "section": "sales",
    "stem": [
      "Universal Containers wants to implement collaborative selling where multiple roles work together on customer accounts. Sales reps need full access to their assigned accounts, while customer support reps and sales engineers need access to opportunities and cases related to specific accounts they support. The sales manager wants to streamline the process by reusing a default set of the same team members across multiple accounts.",
      {
        "ask": "Which feature should a Platform Administrator configure to meet this requirement?"
      }
    ],
    "choices": [
      "Set up default account teams with specified access levels for different team roles.",
      "Create sharing rules to grant access to opportunities and cases for support teams.",
      "Configure role hierarchy to automatically grant account access to the appropriate teams.",
      "Use permission sets to provide additional access to account-related records."
    ],
    "answer": "A",
    "focus": "must",
    "group": "security",
    "why": "Default account teams can reuse a defined set of collaborators with specified access levels across multiple accounts.",
    "wrong": {
      "B": "Sharing rules can open access but do not model named account-team roles and reusable default membership.",
      "C": "Role hierarchy follows organizational access paths rather than specific account-team membership.",
      "D": "Permission sets grant capabilities rather than define the set of accounts each collaborator supports."
    },
    "notes": [
      "Account-team access can include related contacts, opportunities, and cases subject to sharing and object access. Distinguish default account teams from opportunity teams used for individual deals.",
      "A default team is a reusable template. Use Add Default Team or supported owner/default-team settings; separate automation is needed for broader rule-driven team assignment."
    ],
    "source": {
      "stem": [
        "Universal Containers wants to implement collaborative selling where multiple roles work together on customer accounts. Sales reps need full access to their assigned accounts, while customer support reps and sales engineers need access to opportunities and cases related to specific accounts they support. The sales manager wants to streamline the process by automatically adding the same team members to multiple accounts.",
        {
          "ask": "Which feature should a Platform Administrator configure to meet this requirement?"
        }
      ],
      "choices": [
        "Set up default account teams with specified access levels for different team roles.",
        "Create sharing rules to grant access to opportunities and cases for support teams.",
        "Configure role hierarchy to automatically grant account access to the appropriate teams.",
        "Use permission sets to provide additional access to account-related records."
      ],
      "answer": "A"
    },
    "printed": "A",
    "repaired": true
  },
  {
    "id": 133,
    "section": "automation",
    "stem": [
      "The Cloud Kicks CFO requires any opportunity over $100,000 to be automatically sent to them, so they can sign off on the record before the deal closes.",
      {
        "ask": "Which feature should a Platform Administrator use to fulfill this requirement?"
      }
    ],
    "choices": [
      "Submit for Approval button",
      "Einstein Next Best Action",
      "Apex Triggers",
      "Flow Approvals"
    ],
    "answer": "D",
    "focus": "high",
    "group": "approvals",
    "why": "A record-triggered Flow Approval Process can automatically route qualifying opportunities for the CFO’s decision.",
    "wrong": {
      "A": "A Submit for Approval button requires a manual action rather than the requested automatic submission.",
      "B": "Next Best Action recommends actions rather than provides this approval engine.",
      "C": "Apex could be custom-built, but the listed declarative approval capability is the direct fit."
    },
    "notes": [
      "Flow Approval Processes are distinct from simply placing a classic approval button on a page. Define trigger conditions, approvers, actions, and duplicate-submission behavior.",
      "Salesforce: https://help.salesforce.com/s/articleView?id=platform.automate_automated_approvals_concepts_trigger.htm&language=en_US"
    ]
  },
  {
    "id": 134,
    "section": "data",
    "stem": [
      "A Platform Administrator at Cloud Kicks needs to export a file of closed won opportunities from the last 90 days. The file should include the Opportunity Name, ID, Close Date, and Amount.",
      {
        "ask": "What should the administrator use to export this file?"
      }
    ],
    "choices": [
      "Data Loader",
      "Data Import Wizard",
      "Data Cloud Connection",
      "Data Export Service"
    ],
    "answer": "A",
    "focus": "must",
    "group": "data",
    "why": "Data Loader supports selecting Opportunity fields and restricting exported records with a SOQL query.",
    "wrong": {
      "B": "Data Import Wizard imports supported data; it does not export this opportunity dataset.",
      "C": "A Data Cloud connection is unnecessary for a direct operational opportunity export.",
      "D": "Data Export Service is aimed at broader backup exports rather than this targeted field-and-date query."
    },
    "notes": "Select Id, Name, CloseDate, and Amount and filter for the required closed-won/date conditions. Confirm whether “last ninety days” includes today and whether deleted records should be excluded."
  },
  {
    "id": 135,
    "section": "service",
    "stem": [
      "Leadership at Cloud Kicks wants to go beyond knowing how long a case has been open for, to knowing how long a case has sat with different teams.",
      {
        "ask": "Which tool gives a Platform Administrator the ability to track the time a case sits and provide relevant reporting?"
      }
    ],
    "choices": [
      "Escalation Rules with Business Hours",
      "Record-Triggered Flows with Business Hours",
      "Case Assignment Rules with Business Hours",
      "Case lifecycle/history reporting on ownership changes and ownership durations"
    ],
    "answer": "D",
    "focus": "high",
    "group": "service",
    "why": "Case lifecycle and history reporting can analyze ownership changes and the time associated with those support states.",
    "wrong": {
      "A": "Escalation rules respond to case age; they do not provide a complete time-per-owner history.",
      "B": "Flow can timestamp transfers, but an accurate business-hours duration design requires additional implementation details.",
      "C": "Assignment rules route ownership without recording elapsed time per team."
    },
    "notes": [
      "Option D corrected: the source proposed milestones, which measure defined SLA steps rather than automatically measuring every team’s residence time. Use ownership-history reporting, or explicit transfer timestamps when the required duration is not exposed by the available report type.",
      "Salesforce: https://help.salesforce.com/s/articleView?id=service.reports_support_crts.htm&language=en_US&type=5"
    ],
    "printed": "D",
    "source": {
      "stem": [
        "Leadership at Cloud Kicks wants to go beyond knowing how long a case has been open for, to knowing how long a case has sat with different teams.",
        {
          "ask": "Which tool gives a Platform Administrator the ability to track the time a case sits and provide relevant reporting?"
        }
      ],
      "choices": [
        "Escalation Rules with Business Hours",
        "Record-Triggered Flows with Business Hours",
        "Case Assignment Rules with Business Hours",
        "Milestones with Business Hours"
      ],
      "answer": "D"
    },
    "repaired": true
  },
  {
    "id": 136,
    "section": "service",
    "stem": [
      "Northern Trail Outfitters wants emails received from customers to generate cases automatically.",
      {
        "ask": "How should a Platform Administrator ensure that the emails are sent to the correct queue?"
      }
    ],
    "choices": [
      "Create an escalation rule to send cases to the correct queue.",
      "Use a custom email service to set the owner of the case upon creation.",
      "Utilize a flow to identify the correct queue and assign the case.",
      "Configure Email-to-Case so emails are delivered to the correct queue."
    ],
    "answer": "D",
    "focus": "high",
    "group": "service",
    "why": "Email-to-Case routing addresses can create cases from incoming email and assign the appropriate case owner or queue.",
    "wrong": {
      "A": "An escalation rule performs later age-based handling, not the primary inbound-email setup.",
      "B": "A custom email service requires development when standard Email-to-Case meets the requirement.",
      "C": "Flow may augment routing, but standard Email-to-Case already supplies the relevant entry point."
    },
    "notes": "Verify routing-address configuration, queue membership, case assignment behavior, and email forwarding. Email-to-Case creates cases; escalation and Omni-Channel address different routing stages."
  },
  {
    "id": 137,
    "section": "service",
    "stem": [
      {
        "ask": "Which two actions should a Platform Administrator perform with Case escalation rules?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Send email notifications.",
      "Change the Case Priority.",
      "Reopen the Case.",
      "Reassign the Case."
    ],
    "answer": "A,D",
    "type": "multi",
    "focus": "high",
    "group": "service",
    "why": "Case escalation actions can reassign the case and send notification emails.",
    "wrong": {
      "B": "Changing Priority is not one of the direct case escalation actions listed by the standard escalation configuration.",
      "C": "Reopening a case is not a direct standard escalation action."
    },
    "notes": "An escalation can notify users and choose a new user or queue. Other field updates or lifecycle changes need the appropriate additional automation."
  },
  {
    "id": 138,
    "section": "data",
    "stem": [
      "Cloud Kicks wants to leverage roll-up summaries on the Account object.",
      {
        "ask": "Which standard object supports this roll-up summary natively?"
      }
    ],
    "choices": [
      "Opportunity",
      "Contact",
      "Case",
      "Campaigns"
    ],
    "answer": "A",
    "focus": "must",
    "group": "model",
    "why": "Account supports native roll-up summary fields over related opportunities, a standard-relationship capability.",
    "wrong": {
      "B": "Account-to-Contact is not generally a native custom roll-up-summary relationship.",
      "C": "Case lookup relationships do not generally provide native account roll-up fields.",
      "D": "Campaign is not the relevant account child for this native roll-up."
    },
    "notes": "Do not assume every standard lookup supports roll-ups. Native roll-ups apply to supported master-detail relationships and selected standard relationships; other cases need a suitable alternative."
  },
  {
    "id": 139,
    "section": "analytics",
    "stem": [
      "Northern Trail Outfitters has the Case object set to private. The support manager raised a concern that reps have a broader view of data than expected and can see all cases on their group's dashboards.",
      {
        "ask": "What is causing reps to have inappropriate access to data on dashboards?"
      }
    ],
    "choices": [
      "Dashboard Filters",
      "Public Dashboards",
      "Dashboard's running user",
      "Dashboard Subscriptions"
    ],
    "answer": "C",
    "focus": "high",
    "group": "analytics",
    "why": "A fixed dashboard running user can expose aggregates from records that individual viewers cannot otherwise access.",
    "wrong": {
      "A": "Filters narrow the result; they do not create a more privileged execution context.",
      "B": "A public/shared location alone does not explain which data the dashboard uses.",
      "D": "Subscriptions distribute dashboard output but are not the root running-user visibility setting."
    },
    "notes": "Review both folder sharing and running-user configuration. A dynamic dashboard uses the viewer’s access; a fixed privileged running user can intentionally reveal broader aggregate data."
  },
  {
    "id": 140,
    "section": "security",
    "stem": [
      "Cloud Kicks has implemented an Employee Agent to answer benefits questions for its employees.",
      {
        "ask": "How should a Platform Administrator prevent the agent from responding to staff members' questions about the CEO's private health plan and benefits?"
      }
    ],
    "choices": [
      "Configure assignment rules to assign the agent to employee data.",
      "Ensure the users' permissions and field-level security restrict access to the CEO's health plan.",
      "Modify the agent's instructions and guardrails to block questions related to the CEO's health plan.",
      "Train the agent on employee health plans instead of the CEO's health plan."
    ],
    "answer": "B",
    "focus": "must",
    "group": "agent-trust",
    "why": "Restrict access to sensitive records and fields through the permissions and execution context actually used by the employee agent.",
    "wrong": {
      "A": "Assignment rules route records rather than enforce field or record confidentiality.",
      "C": "Instructions are not a substitute for enforceable access controls.",
      "D": "Training or grounding on other content does not revoke access to sensitive fields."
    },
    "notes": "Confirm whether the action runs as the current user or an agent-assigned user, then enforce the appropriate sharing, object permissions, and field-level security. Also minimize sensitive data supplied to prompts."
  },
  {
    "id": 141,
    "section": "security",
    "stem": [
      "A Platform Administrator at Cloud Kicks is setting up a new Salesforce instance. The business requirements mandate that the marketers are given access to opportunities in order to maintain the campaign relationships on each opportunity. The administrator decides to assign the Marketing User profile.",
      {
        "ask": "What should the administrator do next to achieve this requirement?"
      }
    ],
    "choices": [
      "Edit the object permissions to include Opportunity.",
      "Add a custom permission set to include Opportunity.",
      "Edit the role to enable Sales access.",
      "Configure the assigned apps to include Opportunity."
    ],
    "answer": "B",
    "printed": "A",
    "corrected": true,
    "focus": "must",
    "group": "security",
    "why": "A permission set can grant needed Opportunity access because standard profile object permissions are not editable.",
    "wrong": {
      "A": "The standard Marketing User profile’s standard-object permissions cannot simply be edited.",
      "C": "A role controls record visibility and does not grant object-level Opportunity permissions.",
      "D": "Assigned apps affect navigation and access to an app, not the missing object permissions by themselves."
    },
    "notes": [
      "Corrected from source A to B. Standard-profile restrictions make a permission set the appropriate listed way to add the missing object access. License compatibility and existing record sharing must still be checked.",
      "Salesforce: https://trailhead.salesforce.com/content/learn/modules/data_security/data_security_objects"
    ],
    "source": {
      "stem": [
        "A Platform Administrator at Cloud Kicks is setting up a new Salesforce instance. The business requirements mandate that the marketers are given access to opportunities in order to maintain the campaign relationships on each opportunity. The administrator decides to assign the Marketing User profile.",
        {
          "ask": "What should the administrator do next to achieve this requirement?"
        }
      ],
      "choices": [
        "Edit the object permissions to include Opportunity.",
        "Add a custom permission set to include Opportunity.",
        "Edit the role to enable Sales access.",
        "Configure the assigned apps to include Opportunity."
      ],
      "answer": "A"
    }
  },
  {
    "id": 142,
    "section": "automation",
    "stem": [
      "At Cloud Kicks, sales reps use discounts on the opportunity record to help win sales on particular products. When an opportunity is won, they then have to manually apply the discount to the related opportunity products. The sales manager has asked if there is a way to automate this time-consuming task.",
      {
        "ask": "What should a Platform Administrator use to deliver this requirement?"
      }
    ],
    "choices": [
      "Approval Process",
      "Formula Field",
      "Flow Builder",
      "Prebuilt Macro"
    ],
    "answer": "C",
    "focus": "familiar",
    "group": "flows",
    "why": "An after-save flow can react to the Closed Won transition and update the related Opportunity Product records.",
    "wrong": {
      "A": "An approval process collects a decision rather than directly supplies this related-record update design.",
      "B": "A formula cannot persistently copy a discount into other records.",
      "D": "A macro requires supported user-driven actions rather than automatically reacts to the opportunity change."
    },
    "notes": "Specify exactly which product discount field and calculation should change. Prevent repeated discounting on later edits, and handle rounding, record volume, and failed related-record updates."
  },
  {
    "id": 143,
    "section": "automation",
    "stem": [
      "A Platform Administrator at Cloud Kicks has created a classic approval process for time-off requests.",
      {
        "ask": "Which two automated actions are available for the administrator to add as part of the approval process?"
      },
      {
        "ask": "Choose 2 answers"
      }
    ],
    "choices": [
      "Field Update",
      "Email Alert",
      "Chatter Post",
      "Autolaunched Flow"
    ],
    "answer": "A,B",
    "type": "multi",
    "focus": "high",
    "group": "approvals",
    "why": "Classic approval processes support Field Update and Email Alert actions as part of their configured outcomes.",
    "wrong": {
      "C": "A Chatter post is not a direct classic approval-process action type.",
      "D": "An autolaunched flow is not a direct classic approval-process action type in this question’s context."
    },
    "notes": "Classic approval actions include tasks, email alerts, field updates, and outbound messages. Do not mix that list with newer Flow Approval Processes or additional automation triggered by an approval field update.",
    "source": {
      "stem": [
        "A Platform Administrator at Cloud Kicks has created an approval process for time-off requests.",
        {
          "ask": "Which two automated actions are available for the administrator to add as part of the approval process?"
        },
        {
          "ask": "Choose 2 answers"
        }
      ],
      "choices": [
        "Field Update",
        "Email Alert",
        "Chatter Post",
        "Autolaunched Flow"
      ],
      "answer": "A,B"
    },
    "printed": "A,B",
    "repaired": true
  },
  {
    "id": 144,
    "section": "security",
    "stem": [
      "A VP of sales needs to report on records owned by individuals in various parts of the role hierarchy. The organization-wide default is set to Private.",
      {
        "ask": "What should a Platform Administrator configure to achieve this?"
      }
    ],
    "choices": [
      "Field-Level Security",
      "Sharing Rules",
      "Permission Sets",
      "Restriction Rules"
    ],
    "answer": "B",
    "focus": "familiar",
    "group": "security",
    "why": "Sharing rules can grant the VP access to records from different ownership groups under a Private sharing baseline.",
    "wrong": {
      "A": "Field-level security controls fields, not access to each privately owned record.",
      "C": "General permission sets do not define a selective cross-hierarchy sharing rule unless excessive all-record permissions are used.",
      "D": "Restriction rules narrow access rather than open the needed visibility."
    },
    "notes": "A report only shows accessible records. First determine the intended sharing scope, then choose owner-based or criteria-based sharing; sharing a report folder does not share the business records."
  },
  {
    "id": 145,
    "section": "experience",
    "stem": [
      {
        "ask": "How should a Platform Administrator view Currencies, Fiscal Year settings, and Business Hours in Salesforce?"
      }
    ],
    "choices": [
      "User Management Settings",
      "Company Settings",
      "Custom Settings",
      "Feature Settings"
    ],
    "answer": "B",
    "focus": "familiar",
    "group": "platform",
    "why": "Company Settings is the relevant setup area for organization-level currency, fiscal-year, and business-hour configuration.",
    "wrong": {
      "A": "User Management Settings controls user administration behavior rather than this combination of company settings.",
      "C": "Custom Settings are application data/configuration structures, not the standard company setup area.",
      "D": "Feature Settings is a broader product-configuration area rather than the best answer for these company defaults."
    },
    "notes": "Availability and impact vary: multi-currency and custom fiscal years can materially affect data and reporting. Treat viewing a setting separately from enabling or changing it."
  },
  {
    "id": 146,
    "section": "experience",
    "stem": [
      "Cloud Kicks has hired a new sales executive who wants to implement a document merge solution in Salesforce.",
      {
        "ask": "How should a Platform Administrator implement this solution?"
      }
    ],
    "choices": [
      "Download the solution from AppExchange.",
      "Install a package from the Partner Portal.",
      "Create a managed package in AppExchange.",
      "Configure the package from Salesforce Setup."
    ],
    "answer": "A",
    "focus": "familiar",
    "group": "platform",
    "why": "AppExchange provides packaged document-generation and merge solutions that can be evaluated and installed.",
    "wrong": {
      "B": "The Partner Portal is not the standard customer marketplace for selecting such a solution.",
      "C": "Creating a managed package means building a distributable product, not obtaining an existing merge solution.",
      "D": "Setup alone does not supply every required document-merge capability without an appropriate solution."
    },
    "notes": "Evaluate licensing, document-template support, record access, generated-file storage, and data handling. Test the chosen package in a sandbox before production deployment."
  },
  {
    "id": 147,
    "section": "sales",
    "stem": [
      "Northern Trail Outfitters has two different sales processes: one for business opportunities with four stages and one for partner opportunities with eight stages. Both processes will vary in page layouts and picklist value options.",
      {
        "ask": "What should a Platform Administrator configure to meet these requirements?"
      }
    ],
    "choices": [
      "Different page layouts that control the picklist values for the opportunity types",
      "Separate record types and sales processes for the different types of opportunities",
      "Validation rules that ensure that users are entering accurate sales stage information",
      "Public groups to limit record types and sales processes for opportunities"
    ],
    "answer": "B",
    "focus": "must",
    "group": "model",
    "why": "Separate opportunity record types and sales processes provide different stages and associated page-layout assignments.",
    "wrong": {
      "A": "Page layouts alone do not define separate allowed opportunity stage sets.",
      "C": "Validation rules can enforce constraints but do not replace the sales-process and record-type configuration.",
      "D": "Public groups control sharing membership rather than select layouts and sales processes."
    },
    "notes": "Sales processes define available Stage values; record types associate business-process variants with picklist subsets and layout assignments. Keep the record-type structure understandable for users and reporting."
  },
  {
    "id": 148,
    "section": "analytics",
    "stem": [
      "Cloud Kicks is concerned that not everyone on the sales team is entering key data into accounts and opportunities that they own. Also, the team is concerned that if the key information changes, it does not get updated in Salesforce. A Platform Administrator wants to get a better understanding of their data quality and record completeness.",
      {
        "ask": "What should the administrator do to accomplish this?"
      }
    ],
    "choices": [
      "Explore AppExchange for data quality and record completeness solutions.",
      "Create a report for Accounts and Opportunities highlighting missing data.",
      "Subscribe the sales reps to a monthly report for accounts and opportunities.",
      "Configure the key fields as required fields on the page layout."
    ],
    "answer": "B",
    "focus": "high",
    "group": "analytics",
    "why": "A targeted report highlights missing account and opportunity fields so the administrator can measure current completeness.",
    "wrong": {
      "A": "A marketplace package might help, but a focused native report is the direct first diagnostic.",
      "C": "A subscription distributes a report but does not define the completeness analysis.",
      "D": "Required layout fields can improve future entry but do not measure existing gaps or all API channels."
    },
    "notes": "Define the business meaning of completeness before measuring it. Required fields, validation, monitoring reports, and user ownership work together; no single report guarantees that filled values are accurate."
  },
  {
    "id": 149,
    "section": "service",
    "stem": [
      "Universal Containers wants to ensure that cases are routed to the right people at the right time, but there is a growing support organization. The business wants to be able to move people around and adjust the work they get without having to request extra assistance or rely on the administrator teams.",
      {
        "ask": "Which tool allows the business to control its own assignment of work?"
      }
    ],
    "choices": [
      "Case Assignment Rules",
      "Email-to-Case",
      "Omni-Channel",
      "Lead Assignment Rules"
    ],
    "answer": "C",
    "focus": "high",
    "group": "service",
    "why": "Omni-Channel routes eligible work according to configured availability, capacity, and routing requirements.",
    "wrong": {
      "A": "Case assignment rules depend on administrator-managed matching rules rather than dynamic capacity-based routing.",
      "B": "Email-to-Case creates cases from email and does not provide the full workload-routing capability.",
      "D": "Lead assignment rules route leads, not service cases."
    },
    "notes": "Authorized business users can manage supported queues, availability, and supervisory operations within the configured design. Omni-Channel does not remove the need for setup permissions or let every user change routing rules."
  },
  {
    "id": 150,
    "section": "analytics",
    "stem": [
      "Cloud Kicks wants a report to categorize accounts into small, medium, and large based on the dollar value found in the Contract Value field.",
      {
        "ask": "Which feature should a Platform Administrator use to meet this request?"
      }
    ],
    "choices": [
      "Group Rows",
      "Filter Logic",
      "Detail Column",
      "Bucket Column"
    ],
    "answer": "D",
    "focus": "high",
    "group": "analytics",
    "why": "A bucket column defines named numeric ranges such as small, medium, and large within a report.",
    "wrong": {
      "A": "Grouping existing numeric values does not automatically define the requested labeled ranges.",
      "B": "Filter logic controls which records appear rather than assigns range labels.",
      "C": "A detail column displays the original value rather than creates a categorical bucket."
    },
    "notes": "Define clear inclusive/exclusive boundaries and decide how blank or unusual contract values should be handled. A report bucket is local reporting logic rather than a stored account classification."
  }
];
