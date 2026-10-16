window.QUIZ_QUESTIONS = [
  {
    "id": 1,
    "section": "content",
    "focus": "must",
    "group": "content",
    "stem": [
      "Northern Trail Outfitters wants to pass the email address of a subscriber to a landing page through a URL parameter from a promotional email. Which Marketing Cloud capability allows for secure transmission of the email address?"
    ],
    "choices": [
      "CloudPagesURL AMPscript function",
      "Web Analytics Connector",
      "Link Wrapping"
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "why": "CloudPagesURL creates a CloudPage link with encrypted parameters, so the email address is not exposed as a readable query value.",
    "wrong": {
      "B": "Web Analytics Connector adds analytics parameters; it does not encrypt subscriber data.",
      "C": "Link wrapping supports tracking and branding, not confidential parameter transport."
    },
    "notes": [
      "Use a CloudPage destination and retrieve its parameters there. Encryption does not replace consent, destination authorization, or care when forwarding links.",
      "Reference: https://developer.salesforce.com/docs/marketing/marketing-cloud-ampscript/references/mc-ampscript-sites/mc-ampscript-reference-sites-cloud-pages-url.html"
    ]
  },
  {
    "id": 2,
    "section": "integrations",
    "focus": "must",
    "group": "distributed",
    "stem": [
      "Northern Trail Outfitters wants to expand their use of Marketing Cloud to business users who spend their day in Sales Cloud, without granting access to Marketing Cloud directly. What feature should be used?"
    ],
    "choices": [
      "Distributed Sending",
      "Distributed Marketing",
      "Marketing Cloud Connect"
    ],
    "answer": "B",
    "type": "single",
    "printed": "C",
    "why": "Distributed Marketing lets CRM business users personalize and send marketer-approved content from Salesforce without a separate Engagement login.",
    "wrong": {
      "A": "Distributed Sending is not the product that provides this governed CRM-user experience.",
      "C": "Marketing Cloud Connect supplies the integration, but the requested business-user experience is Distributed Marketing."
    },
    "notes": [
      "Separate the integration plumbing from the product experience: Connect integrates the clouds; Distributed Marketing exposes approved campaigns to CRM business users."
    ],
    "source": {
      "stem": [
        "Northern Trail Outfitters wants to expand their use of Marketing Cloud to business users who spend their day in Sales Cloud, without granting access to Marketing Cloud directly. What feature should be used?"
      ],
      "choices": [
        "Distributed Sending",
        "Distributed Marketing",
        "Marketing Cloud Connect"
      ],
      "answer": "C"
    },
    "corrected": true
  },
  {
    "id": 3,
    "section": "analytics",
    "focus": "must",
    "group": "analytics",
    "stem": [
      "A marketing manager requests to receive an email, once a week, with high-level metrics in a standardized format. Specifically, the manager wants to know how many emails were sent in the last week. What location and activity would allow the Marketing Cloud admin to complete this request? Use the standard report catalog and its built-in scheduling, rather than building a custom automation."
    ],
    "choices": [
      "Email Studio: Select the 'Account Send Summary' in Tracking Reports and schedule a weekly report to be sent.",
      "Analytics Builder: Select the 'Account Send Summary' in Reports and schedule a weekly report to be sent.",
      "Automation Studio: Create a Query Activity to query data from the 'Sent' Data View, then use an Email activity to automate the sending of the data."
    ],
    "answer": "B",
    "type": "single",
    "printed": "A",
    "why": "Account Send Summary is a standard report in Analytics Builder. Schedule its weekly delivery instead of building a custom tracking-data pipeline.",
    "wrong": {
      "A": "The current report catalog is in Analytics Builder; this option gives the legacy/wrong navigation.",
      "C": "SQL can retrieve send events, but querying does not itself format and email the requested standard report."
    },
    "notes": [
      "Set the report’s date range and recurrence consistently. A seven-day lookback and a previous calendar week are different reporting windows.",
      "Reference: https://help.salesforce.com/s/articleView?id=sf.mc_re_email_studio_reports.htm&language=en_US&type=5"
    ],
    "source": {
      "stem": [
        "A marketing manager requests to receive an email, once a week, with high-level metrics in a standardized format. Specifically, the manager wants to know how many emails were sent in the last week. What location and activity would allow the Marketing Cloud admin to complete this request?"
      ],
      "choices": [
        "Email Studio: Select the 'Account Send Summary*' in Tracking Reports and schedule a weekly report to be sent.",
        "Analytics Builder: Select the 'Account Send Summary' in Reports and schedule a weekly report to be sent.",
        "Automation Studio: Create a Query Activity to query data from the 'Sent' Data View, then use an Email activity to automate the sending of the data."
      ],
      "answer": "A"
    },
    "corrected": true
  },
  {
    "id": 4,
    "section": "security",
    "focus": "must",
    "group": "access",
    "stem": [
      "A new marketing analyst needs Email Studio tracking access and read-only visibility of cross-channel marketing activity, with no sending permissions. Which listed pair of default roles is the least-privileged fit?"
    ],
    "choices": [
      "Content Creator and Marketing Cloud Viewer",
      "Analyst and Marketing Cloud Viewer",
      "Data Manager and Analyst"
    ],
    "answer": "B",
    "type": "single",
    "printed": "C",
    "source": {
      "stem": [
        "A new employee is hired into the role of marketing analyst. This user should have access to all tracking data in Marketing Cloud, but no access to any send activities. Which two default User Roles should be applied to this new user which provides this access to all channels, keeping the principle of least privilege in mind?"
      ],
      "choices": [
        "Content Creator and Marketing Cloud Viewer",
        "Analyst and Marketing Cloud Viewer",
        "Data Manager and Analyst"
      ],
      "answer": "C"
    },
    "why": "Analyst targets Email Studio tracking, while Marketing Cloud Viewer supplies view-only cross-channel activity visibility. The other pairs grant unnecessary authoring or data-management access.",
    "wrong": {
      "A": "Content Creator adds content creation, which this analyst does not need.",
      "C": "Data Manager grants broad Email Studio access beyond tracking and is unsuitable for this least-privilege request."
    },
    "notes": [
      "The original phrase “all tracking data” was too broad. Viewer is restrictive and does not mean every report can be run or exported; verify effective permissions for the actual screens required.",
      "Reference: https://help.salesforce.com/s/articleView?id=sf.mc_overview_roles.htm&language=en_US&type=5"
    ],
    "corrected": true
  },
  {
    "id": 5,
    "section": "security",
    "focus": "must",
    "group": "security",
    "stem": [
      "A Marketing Cloud admin at a bank is asked to avoid storing sensitive data in the cloud. This data will only be sent to Marketing cloud to execute a send. Which feature would the admin use to meet this requirement?"
    ],
    "choices": [
      "Tokenized Sending",
      "List Sending",
      "Field Level Encryption.",
      "Distributed Marketing Sends."
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "why": "Tokenized Sending resolves sensitive recipient/content data at send time rather than retaining it in the Engagement account database.",
    "wrong": {
      "B": "List sending stores subscriber data and does not provide token exchange.",
      "C": "Field-level encryption protects stored values; the data is still stored.",
      "D": "Distributed Marketing governs CRM-based sends rather than eliminating sensitive data storage."
    },
    "notes": [
      "Tokenized Sending requires an enabled, designed integration and token service. Check supported channels and configuration with Salesforce before implementation.",
      "Reference: https://help.salesforce.com/s/articleView?id=mktg.mc_overview_tokenized_sending1.htm&language=en_US&type=5"
    ]
  },
  {
    "id": 6,
    "section": "delivery",
    "focus": "must",
    "group": "subscriptions",
    "stem": [
      "A Marketing Cloud admin wants to automatically unsubscribe customers who respond to marketing emails asking to be removed from the mailing list. Which two steps should the admin take to enable this functionality? Choose 2 answers"
    ],
    "choices": [
      "Ensure a Custom response is enabled for Automated Response in Reply mail Management",
      "Verify Reply Mail Management has been enabled in the account",
      "Select Unsubscribe Manual requests in Reply Mail Management",
      "Select Delete Auto-Replies and Out-of-Office mail Management"
    ],
    "answer": "B,C",
    "type": "multi",
    "printed": "A,B",
    "why": "Reply Mail Management must be enabled, and its Unsubscribe Manual Requests setting must process replies recognized as unsubscribe requests.",
    "wrong": {
      "A": "A custom automated reply changes response content; it is not required to unsubscribe the sender.",
      "D": "Deleting out-of-office replies handles automated messages, not unsubscribe requests."
    },
    "notes": [
      "RMM uses recognized unsubscribe terms. Route other replies for appropriate handling instead of assuming that every free-text reply will be interpreted correctly.",
      "Reference: https://help.salesforce.com/s/articleView?id=000383658&language=en_US&type=1"
    ],
    "choose": 2,
    "source": {
      "stem": [
        "A Marketing Cloud admin wants to automatically unsubscribe customers who respond to marketing emails asking to be removed from the mailing list. Which two steps should the admin take to enable this functionality? Choose 2 answers"
      ],
      "choices": [
        "Ensure a Custom response is enabled for Automated Response in Reply mail Management",
        "Verify Reply Mail Management has been enabled in the account",
        "Select Unsubscribe Manual requests in Reply Mail Management",
        "Select Delete Auto-Replies and Out-of-Office mail Management"
      ],
      "answer": "A,B"
    },
    "corrected": true
  },
  {
    "id": 7,
    "section": "integrations",
    "focus": "must",
    "group": "connect",
    "stem": [
      "A Marketing Cloud admin has been asked to include Sales Cloud data in their queries. Which feature would allow this functionality?"
    ],
    "choices": [
      "Query Studio",
      "Journey Builder",
      "CloudPages",
      "Synchronized Data Sources."
    ],
    "answer": "D",
    "type": "single",
    "printed": "D",
    "source": {
      "stem": [
        "A Marketing Cloud admin has been asked to include Sales Cloud data in their queries. Which future would allow this functionality?"
      ],
      "choices": [
        "Query Studio",
        "Journey Builder",
        "CloudPages",
        "Synchronized Data Sources."
      ],
      "answer": "D"
    },
    "why": "Synchronized Data Sources bring selected Sales Cloud object fields into Engagement data extensions where SQL activities can query them.",
    "wrong": {
      "A": "Query Studio executes queries against available Engagement data; it does not synchronize CRM objects.",
      "B": "Journey Builder orchestrates journeys rather than importing CRM objects for SQL.",
      "C": "CloudPages hosts web experiences, not the CRM object synchronization service."
    },
    "notes": [
      "Configure Marketing Cloud Connect first, then select objects, fields, filters, and polling. Build send audiences separately instead of treating a synchronized DE as a directly editable audience."
    ],
    "repaired": true
  },
  {
    "id": 8,
    "section": "integrations",
    "focus": "high",
    "group": "connect",
    "type": "single",
    "stem": [
      "A Salesforce Contact is synchronized through Marketing Cloud Connect. Which identifier should an administrator search as its Subscriber Key in All Subscribers?"
    ],
    "choices": [
      "15-character CRM Contact ID",
      "System-generated numeric subscriber number",
      "18-character CRM Contact ID",
      "Recipient email address"
    ],
    "answer": "C",
    "printed": "C",
    "why": "Marketing Cloud Connect uses the 18-character Salesforce Contact ID as the Subscriber Key for a CRM Contact.",
    "wrong": {
      "A": "The Connect identity is the case-safe 18-character form, rather than the shorter case-sensitive ID.",
      "B": "Subscriber ID is an Engagement-generated numeric identifier, not this CRM Contact’s Subscriber Key.",
      "D": "An address is not the Connect key and can be shared or changed."
    },
    "notes": [
      "This question is absent from the DOCX. Its concept and choice order were recovered from the same-numbered online bank and paraphrased; the key was independently checked.",
      "Recovered source: https://www.certsteps.com/exams/salesforce/marketing-cloud-administrator/test/",
      "Reference: https://help.salesforce.com/s/articleView?id=mktg.mc_co_subscriber_key.htm&language=en_US&type=5"
    ]
  },
  {
    "id": 9,
    "section": "automation",
    "focus": "familiar",
    "group": "files",
    "type": "single",
    "stem": [
      "Which Setup area contains the FTP Accounts controls used to change an Engagement SFTP user’s password?"
    ],
    "choices": [
      "Data Management",
      "Security",
      "Feature Settings",
      "Company Settings"
    ],
    "answer": "A",
    "printed": "A",
    "why": "FTP Accounts belongs to Data Management in Setup. Use that account-management area to maintain the SFTP user’s credentials.",
    "wrong": {
      "B": "General account Security settings are not the FTP Accounts user editor.",
      "C": "Feature Settings is not the documented SFTP account-management location.",
      "D": "Company Settings manages other account information rather than SFTP users."
    },
    "notes": [
      "Recovered from the online question bank because Q9 is absent from the DOCX. SFTP credentials are separate from UI credentials; do not assume a UI password change updates SFTP.",
      "Recovered source: https://www.certsteps.com/exams/salesforce/marketing-cloud-administrator/test/",
      "Reference: https://help.salesforce.com/s/articleView?id=mktg.mc_overview_add_ftp_accounts.htm&language=en_US&type=5"
    ]
  },
  {
    "id": 10,
    "section": "security",
    "focus": "high",
    "group": "business-units",
    "type": "single",
    "stem": [
      "Which command assigns existing Engagement users to additional business units?"
    ],
    "choices": [
      "Let users assign their own access.",
      "Select users and choose Manage Business Units.",
      "Use an Edit Business Units command.",
      "Re-import the user records."
    ],
    "answer": "B",
    "printed": "D",
    "corrected": true,
    "why": "Select the user in Setup > Users, open Manage Business Units, choose the default and associated units, and save. Re-importing users is not the documented membership-assignment procedure.",
    "wrong": {
      "A": "Ordinary users do not grant themselves business-unit access; an authorized administrator manages it.",
      "C": "The documented command is Manage Business Units, not this proposed command name.",
      "D": "Replacing/importing user records is not the supported action for assigning existing users to BUs."
    },
    "notes": [
      "Q10 is missing from the DOCX and was recovered from the matching-numbered online bank in paraphrased form. Its recovered source key D is wrong; B follows Salesforce’s user-management instructions. The Corrected badge refers to that external source key.",
      "Recovered source: https://www.certsteps.com/exams/salesforce/marketing-cloud-administrator/test/",
      "Reference: https://help.salesforce.com/s/articleView?id=mktg.mc_overview_manage_bu_users.htm&language=en_US&type=5"
    ],
    "source": {
      "stem": [
        "Which command assigns existing Engagement users to additional business units?"
      ],
      "choices": [
        "Let users assign their own access.",
        "Select users and choose Manage Business Units.",
        "Use an Edit Business Units command.",
        "Re-import the user records."
      ],
      "answer": "D"
    }
  },
  {
    "id": 11,
    "section": "integrations",
    "focus": "high",
    "group": "connect",
    "stem": [
      "While setting up marketing Cloud Connect, a marketing cloud admin navigates to the Marketing Cloud tab in Sales Cloud to complete the integration. The admin then receives the following error message: Insufficient User Permissions. You have not been designated as an integrated Marketing Cloud User. Contact your system administrator. The admin notices the Marketing cloud for AppExchange Admin option is selected when looking for the user settings. What action should correct the issue?"
    ],
    "choices": [
      "Apply the appropriate user mappings in the CRM configuration.",
      "Apply the Administrator and Marketing Cloud Administrator permission sets to user.",
      "Reset all user passwords to force new tokens",
      "Apply the marketing Cloud for AppExchange User option as well"
    ],
    "answer": "D",
    "type": "single",
    "printed": "A",
    "why": "This specific configuration error occurs when AppExchange Admin is selected without AppExchange User on the Salesforce user. Enable the User option as well.",
    "wrong": {
      "A": "User mapping is important, but it does not fix the missing Salesforce user flag identified by this error.",
      "B": "Broad administrator roles do not replace the AppExchange User option.",
      "C": "Resetting passwords does not grant the missing designation."
    },
    "notes": [
      "The CRM system user, Engagement API user, and individually integrated user have different responsibilities. Diagnose the particular user and error.",
      "Reference: https://help.salesforce.com/s/articleView?id=sf.mc_co_troubleshoot_user_access_and_permissions.htm&language=en_US&type=5"
    ],
    "source": {
      "stem": [
        "While setting up marketing Cloud Connect, a marketing cloud admin navigates to the Marketing Cloud tab in Sales Cloud to complete the integration. The admin then receives the following error message: Insufficient User Permissions. You have not been designated as an integrated Marketing Cloud User. Contact your system administrator. The admin notices the Marketing cloud for AppExchange Admin option is selected when looking for the user settings. What action should correct the issue?"
      ],
      "choices": [
        "Apply the appropriate user mappings in the CRM configuration.",
        "Apply the Administrator and Marketing Cloud Administrator permission sets to user.",
        "Reset all user passwords to force new tokens",
        "Apply the marketing Cloud for AppExchange User option as well"
      ],
      "answer": "A"
    },
    "corrected": true
  },
  {
    "id": 12,
    "section": "data",
    "focus": "must",
    "group": "retention",
    "stem": [
      "NTO wants each newly inserted data-extension row automatically deleted 12 months after creation while keeping the data extension. Which retention configuration should be applied when creating each data extension?"
    ],
    "choices": [
      "Configure the business unit data retention setting to 12 months",
      "Configure the Enterprise wide default retention to one year",
      "Set inactive date to be automatically cleared after one year, but is recoverable",
      "Apply a row based retention to each data extension as it is created, set to 12 months"
    ],
    "answer": "D",
    "type": "single",
    "printed": "D",
    "source": {
      "stem": [
        "To prevent retention of stagnant data, Northern Trail Outfitters (NTO) wants any inactive data stored in data extensions to be cleared after 12 months. What action should NTO take?"
      ],
      "choices": [
        "Configure the business unit data retention setting to 12 months",
        "Configure the Enterprise wide default retention to one year",
        "Set inactive date to be automatically cleared after one year, but is recoverable",
        "Apply a row based retention to each data extension as it is created, set to 12 months"
      ],
      "answer": "D"
    },
    "why": "Individual-record retention on each data extension deletes rows according to their creation age while retaining the data-extension structure.",
    "wrong": {
      "A": "This is configured per data extension, not by one business-unit inactivity setting.",
      "B": "There is no enterprise-wide default that satisfies this specific per-row policy.",
      "C": "A recoverable inactive flag is not the requested automatic deletion policy."
    },
    "notes": [
      "Row age is not time since last engagement. A real inactivity requirement needs an explicit last-activity field and a separate filtering/deletion design.",
      "Reference: https://help.salesforce.com/s/articleView?id=mktg.mc_cab_data_extensions_manage.htm&language=en_US&type=5"
    ],
    "repaired": true
  },
  {
    "id": 13,
    "section": "data",
    "focus": "high",
    "group": "identity",
    "stem": [
      "NTO is designing data-extension fields. Which two field types do not require choosing a text maximum length or decimal precision and scale? Choose 2 answers."
    ],
    "choices": [
      "Number",
      "Text",
      "Boolean",
      "Decimal"
    ],
    "answer": "A,C",
    "type": "multi",
    "printed": "A,B",
    "source": {
      "stem": [
        "Northern Trail Outfitters to bring subscriber data from its data warehouse into Marketing Cloud. Which two fields would need minimal consideration, for size/scalability related reasons,when creating a data extension to house this data? Choose 2 answers"
      ],
      "choices": [
        "Number",
        "Text",
        "Boolean",
        "Decimal"
      ],
      "answer": "A,B"
    },
    "why": "Number and Boolean do not ask the designer to allocate a text maximum length or decimal precision/scale. Text and Decimal require those sizing decisions.",
    "wrong": {
      "B": "Text requires a maximum length, which affects schema design.",
      "D": "Decimal requires total digits and fractional scale."
    },
    "notes": [
      "The appended review claims Number plus Text, contradicting the equivalent Q120. The reviewed prompt defines the sizing criterion explicitly; validate real data ranges even for Number and Boolean.",
      "Reference: https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/ssjs_dataExtensionFieldsAdd"
    ],
    "choose": 2,
    "corrected": true
  },
  {
    "id": 14,
    "section": "analytics",
    "focus": "familiar",
    "group": "analytics",
    "stem": [
      "A Marketing manager requests to receive an email, once a week, with high-level metrics in a standard format. Specifically the manager wants to know how many emails were sent in the last week. What location and activity would allow the Marketing Cloud admin to complete the request? Use the standard report catalog and its built-in scheduling, without creating an Automation Studio workflow."
    ],
    "choices": [
      "Automation Studio: Create a Report Activity to run every seven days.",
      "Email Studio: Select ''Account Send Summary'' in Tracking Reports and schedule a weekly report to be sent.",
      "Automation studio: Create a Query Activity to query data from the ''Sent'' Data view, then use an Email activity to activate the sending of the data.",
      "Analytics Builder: Select the ''Account Send Summary'' in Reports and schedule a weekly report to be sent."
    ],
    "answer": "D",
    "type": "single",
    "printed": "B",
    "why": "The standard Account Send Summary report is available in Analytics Builder and can be scheduled for weekly email delivery.",
    "wrong": {
      "A": "A Report activity can automate supported reports, but this question specifically requests the report catalog's built-in schedule rather than an Automation Studio workflow.",
      "B": "The current standard-report location is Analytics Builder, not the proposed Email Studio path.",
      "C": "A _Sent query is a custom dataset, not the complete standard-report delivery workflow."
    },
    "notes": [
      "Check date filters, timezone, recipient permissions, and recurrence. Do not confuse a sent event with delivery or an open."
    ],
    "source": {
      "stem": [
        "A Marketing manager requests to receive an email, once a week, with high-level metrics in a standard format. Specifically the manager wants to know how many emails were sent in the last week. What location and activity would allow the Marketing Cloud admin to complete the request?"
      ],
      "choices": [
        "Automation Studio: Create a Report Activity to run every seven days.",
        "Email Studio: Select ''Account Send Summary'' in Tracking Reports and schedule a weekly report to be sent.",
        "Automation studio: Create a Query Activity to query data from the ''Sent'' Data view, then use an Email activity to activate the sending of the data.",
        "Analytics Builder: Select the ''Account Send Summary'' in Reports and schedule a weekly report to be sent."
      ],
      "answer": "B"
    },
    "corrected": true
  },
  {
    "id": 15,
    "section": "data",
    "focus": "must",
    "group": "relationships",
    "stem": [
      "NTO adds purchase data extensions to Data Designer. Each purchase has its own Order ID primary key and a Customer ID matching existing Contact Keys. Which value should relate purchases to the existing contacts?"
    ],
    "choices": [
      "Unique contact identifier (Customer ID matching Contact Key)",
      "Primary key",
      "Unique Contact email address",
      "Subscriber ID"
    ],
    "answer": "A",
    "type": "single",
    "printed": "B",
    "source": {
      "stem": [
        "Northern Trail Outfitters wants to add new data extensions containing customer purchases to their Marketing Cloud account Which value should link these new data extensions in Data Designer to the existing contact records?"
      ],
      "choices": [
        "Unique Contact Identifier",
        "Primary key",
        "Unique Contact email address",
        "Subscriber ID"
      ],
      "answer": "B"
    },
    "why": "The purchase Customer ID must match the contact identity used by Contact Key. Order ID identifies the purchase, not the customer.",
    "wrong": {
      "B": "A purchase primary key such as Order ID is not automatically the key relating purchases to contacts.",
      "C": "Email addresses can change or be shared and are not the specified stable customer identifier.",
      "D": "Subscriber ID is a system-assigned value, not the external customer relationship key in this model."
    },
    "notes": [
      "Data Designer relationships connect matching fields. A child table’s relationship field can repeat even when its own row primary key is unique. The inline review incorrectly treats every relationship field as a primary key."
    ],
    "corrected": true
  },
  {
    "id": 16,
    "section": "journeys",
    "focus": "must",
    "group": "splits",
    "stem": [
      "A journey must route each contact using the attributes captured when that contact entered, even if the current contact record later changes. What should be confirmed for its Decision Split?"
    ],
    "choices": [
      "Journey Data is used for the Decision Split.",
      "Entry Source attributes are available in Journey Settings.",
      "Contact Data is used for the Decision Split.",
      "Filter Contacts are enabled to refine the audience."
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "source": {
      "stem": [
        "What should be confirmed to ensure Journey Builder directs the subscribers correctly?"
      ],
      "choices": [
        "Journey Data is used for the Decision Split.",
        "Entry Source attributes are available in Journey Settings.",
        "Contract Data is used for the Decision Split.",
        "Filter Contacts are enabled to refine the audience."
      ],
      "answer": "A"
    },
    "why": "Journey Data preserves the values captured for that journey entry, matching the requirement to route on entry-time attributes.",
    "wrong": {
      "B": "Making attributes available does not choose which data timing the split uses.",
      "C": "Contact Data is evaluated from the current contact model rather than the entry snapshot.",
      "D": "Entry filtering controls admission to the journey, not the data source of this Decision Split."
    },
    "notes": [
      "Use Journey Data for the entry snapshot and Contact Data for current related values. The original question omitted this timing requirement; neither source is universally correct."
    ],
    "repaired": true
  },
  {
    "id": 17,
    "section": "analytics",
    "focus": "high",
    "group": "analytics",
    "stem": [
      "An administrator finds that an A/B test email send did not create Send Log rows, although other recent sends did. Which setting should be checked so this A/B send records its send-time data?"
    ],
    "choices": [
      "Send logging is enabled for the send",
      "Correct Send Log template is selected",
      "Send Logging is available for A/B tests",
      "Data retention settings is specified"
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "source": {
      "stem": [
        "A Marketing Cloud admin notices out of the last several sends, Send log data for a recent How could the admin ensure send data is recorded?"
      ],
      "choices": [
        "Send logging is enabled for the send",
        "Correct Send Log template is selected",
        "Send Logging is available for A/B tests",
        "Data retention settings is specified"
      ],
      "answer": "A"
    },
    "why": "A/B test sends support Send Logging, but it is not selected by default. Enable logging for the A/B send so its send-time data is written.",
    "wrong": {
      "B": "A valid template does not enable logging for the individual A/B send.",
      "C": "A/B sends already support logging; availability alone is not the missing configuration action.",
      "D": "Retention controls how long logged rows remain, not whether this send writes rows."
    },
    "notes": [
      "The document cuts off before identifying the missing A/B send. A more complete online version supplied that context; the original answer A remains correct.",
      "Reference: https://help.salesforce.com/s/articleView?id=000386631&language=en_US&type=1",
      "Recovered context: https://www.examtopics.com/discussions/salesforce/view/236774-exam-certified-marketing-cloud-administrator-topic-1/"
    ],
    "repaired": true
  },
  {
    "id": 18,
    "section": "delivery",
    "focus": "must",
    "group": "reputation",
    "stem": [
      "Northern trail Outfitters (NTO) is warming a new Dedicated IP address, and theyneed to monitor their deliverability across major ISPs. Which bounce type would be indicative of the ISPs view of NTO's sending reputation?"
    ],
    "choices": [
      "Soft",
      "Technical",
      "Block",
      "Hard"
    ],
    "answer": "C",
    "type": "single",
    "printed": "C",
    "why": "Block bounces identify rejection related to filtering, policy, or reputation and are a useful signal while warming a dedicated IP.",
    "wrong": {
      "A": "Soft bounces usually represent temporary mailbox or delivery conditions.",
      "B": "Technical bounces indicate technical problems rather than the clearest reputation signal here.",
      "D": "Hard bounces commonly indicate invalid or permanently undeliverable addresses and point to list quality."
    },
    "notes": [
      "Inspect the SMTP response and patterns by mailbox provider before diagnosing a reputation problem from category alone."
    ]
  },
  {
    "id": 19,
    "section": "delivery",
    "focus": "high",
    "group": "subscriptions",
    "stem": [
      "Which two data structures could be configured to appear in the out-of-the-box Subscription center? Choose 2 answers"
    ],
    "choices": [
      "Publication Lists",
      "Data Extensions",
      "Lists",
      "Groups"
    ],
    "answer": "A,C",
    "type": "multi",
    "printed": "B",
    "source": {
      "stem": [
        "Which two data structures could be configured to appear in the out-of-the-box Subscription center? Choose 2 answers"
      ],
      "choices": [
        "Publication Lists",
        "Data Extensions",
        "Lists",
        "Groups"
      ],
      "answer": "B"
    },
    "why": "Public publication lists and public subscriber lists can appear as selectable subscriptions in the standard Subscription Center.",
    "wrong": {
      "B": "A data extension is not itself a standard Subscription Center subscription option.",
      "D": "Groups are segmented list subsets rather than independently published subscription choices."
    },
    "notes": [
      "Choose 2 is intentional despite the source Single Choice label. Publication lists let DE-based sends respect category-level preferences."
    ],
    "choose": 2,
    "corrected": true
  },
  {
    "id": 20,
    "section": "automation",
    "focus": "must",
    "group": "files",
    "stem": [
      "A Marketing Cloud Admin has noticed a File Drop Automation has been failing on the import File activity. The automation is configured with a filename pattern, so the filename is expected to begin with customer_import_. The import is configured to look for a file named customer_import_%%Year%%%%Month%%%%Day%%.csv, however, the admin notices the filenames include seconds and milliseconds. How should the admin fix the issue?"
    ],
    "choices": [
      "Use the exact filename used for the trigger in the import File Activity",
      "Make sure the file is placed on the correct subfolder within the SFTP",
      "Make sure the filename has a date stamp to avoid duplication",
      "Use %%FILENAME_FROM_TRIGGER%% in the import File Activity"
    ],
    "answer": "D",
    "type": "single",
    "printed": "D",
    "why": "%%FILENAME_FROM_TRIGGER%% passes the actual file-drop trigger filename to the Import File activity, including its varying timestamp.",
    "wrong": {
      "A": "Hard-coding one observed filename breaks on the next differently timestamped file.",
      "B": "The problem is a mismatched filename, not an incorrectly identified folder.",
      "C": "The file already contains a timestamp; adding one does not make the import pattern match."
    },
    "notes": [
      "Use this substitution in the supported file-drop context and keep the trigger and import locations aligned. It is not a general filename value for a scheduled automation."
    ]
  },
  {
    "id": 21,
    "section": "data",
    "focus": "high",
    "group": "retention",
    "stem": [
      "In this scenario the non-sendable data extensions are not part of a population in Data Designer.",
      "A completed Contact Delete request removes some previously emailed contacts, while other contacts remain in the account. For the deleted contacts, which two kinds of information can remain? Choose 2 answers."
    ],
    "choices": [
      "Contact data in sendable data extensions",
      "Contact data in non-sendable extensions",
      "Contact-specific data at the job level",
      "General tracking data at the job level"
    ],
    "answer": "B,D",
    "type": "multi",
    "printed": "B,D",
    "source": {
      "stem": [
        "A Contact Delete request has been processed for subscribers who have been sent to previously in a Northern Trail Outfitters account, the action did NOT target all contacts in their account and significant number of contacts which have been sent to remain, Which two data would still exist in the account? Choose 2 answers"
      ],
      "choices": [
        "Contact data in sendable data extensions",
        "Contact data in non-sendable extensions",
        "Contact-specific data at the job level",
        "General tracking data at the job level"
      ],
      "answer": "B,D"
    },
    "why": "Contact Delete does not automatically purge non-sendable data extensions outside populations, and aggregate job tracking can remain after contact-level details are removed.",
    "wrong": {
      "A": "Contact Delete targets the deleted contact’s records in sendable data extensions.",
      "C": "The deleted contact’s individual tracking is removed rather than remaining as identifiable job-level details."
    },
    "notes": [
      "Other contacts’ data remains because this is a subset deletion. Plan separate cleanup for non-sendable stores and prevent deleted contacts from being reintroduced.",
      "Reference: https://trailhead.salesforce.com/content/learn/modules/marketing-cloud-contact-management/manage-contact-data",
      "Contact Delete documentation excludes non-sendable data extensions that are not included in a population. Inventory populations as well as sendable/non-sendable flags when defining cleanup. Reference: https://help.salesforce.com/s/articleView?id=mktg.mc_cab_contact_deletion.htm&language=en_US&type=5"
    ],
    "choose": 2,
    "repaired": true
  },
  {
    "id": 22,
    "section": "delivery",
    "focus": "high",
    "group": "reputation",
    "stem": [
      "A Northern Trail Outfitter' (NTO) subscriber clicks a link in an NTO email. Prior to the clicking, the subscriber had a bounces status in Marketing Cloud. What are the effects of the click to the subscriber's status?"
    ],
    "choices": [
      "Status is changed to Active and the bounce count is unchanged",
      "Status is changed to Held for 72 hours and the bounce count is set to Zero",
      "Status remains as Bounced the bounce count is unchanged",
      "Status is changed to Active and the bounce count is set to Zero"
    ],
    "answer": "D",
    "type": "single",
    "printed": "D",
    "why": "An image render or tracked click for a Bounced subscriber reactivates the address and resets its bounce count to zero.",
    "wrong": {
      "A": "The count is reset rather than preserved.",
      "B": "A successful engagement does not put the subscriber into Held.",
      "C": "The engagement changes Bounced to Active under this rule."
    },
    "notes": [
      "This is bounce-state recovery, not permission to override an unsubscribe. Treat deliverability and consent as separate states.",
      "Reference: https://help.salesforce.com/s/articleView?id=mktg.mc_es_bounce_mail_management.htm&language=en_US&type=5"
    ]
  },
  {
    "id": 23,
    "section": "security",
    "focus": "high",
    "group": "security",
    "stem": [
      "A Marketing Cloud admin wants to ensure no one could access the API with their Marketing Cloud user credentials. Which security setting would control this behavior?"
    ],
    "choices": [
      "Select 'Identity Verification'",
      "Select 'Enable Audit Trail Data Collection'",
      "Deselect 'Exclude API Users From Password Expiration'",
      "Deselect 'Enable Username and Password for Web Services'"
    ],
    "answer": "D",
    "type": "single",
    "printed": "D",
    "why": "Disabling username/password Web Services authentication prevents that legacy credential-based API access.",
    "wrong": {
      "A": "Identity verification concerns interactive access and does not directly disable this API authentication method.",
      "B": "Audit collection records activity rather than blocking this authentication method.",
      "C": "Password expiration policy does not prohibit username/password API authentication."
    },
    "notes": [
      "Use scoped OAuth integrations in Installed Packages for supported API workflows. This setting does not mean every OAuth API integration is disabled."
    ]
  },
  {
    "id": 24,
    "section": "analytics",
    "focus": "high",
    "group": "einstein",
    "stem": [
      "Einstein Recommendations uses data extensions to store user-facing information How is this data passed to Marketing Cloud?"
    ],
    "choices": [
      "Google Analytics 360",
      "Collect Tracking code",
      "Conversion Tracking",
      "Web & Mobile Analytics"
    ],
    "answer": "B",
    "type": "single",
    "printed": "B",
    "why": "Collect tracking code captures website behavior used by Einstein Recommendations and its related data extensions.",
    "wrong": {
      "A": "GA360 is a separate analytics integration, not the Recommendations collection mechanism.",
      "C": "Conversion tracking alone is not the full visitor-behavior collection framework.",
      "D": "This generic analytics label is not the required tracking-code mechanism."
    },
    "notes": [
      "Catalog ingestion, behavioral collection, and recommendation display are separate implementation pieces. Collect.js does not by itself render recommendation content."
    ]
  },
  {
    "id": 25,
    "section": "channels",
    "focus": "must",
    "group": "mobile",
    "stem": [
      "Northern Trail Outfitters (NTO) rolled out a global SMS initiative three months ago, as their customers have shown great interest in receiving promotions via text. However, NTO was notified they are already at 75% utilization for their annual Super Messages. Why could this be the case?"
    ],
    "choices": [
      "MobilePush was enabled by mistake, which consumes Super Messages when not in use.",
      "Each email consumes five super messages when sending below a certain threshold.",
      "The majority of NTO's subscriber base is in the United States.",
      "A multiplier is applied to each SMS message based on the destination country"
    ],
    "answer": "D",
    "type": "single",
    "printed": "B",
    "why": "SMS consumption uses message multipliers that vary by destination and contract/product, so a global program can consume its allowance quickly.",
    "wrong": {
      "A": "Enabling an unused push feature is not the stated SMS usage mechanism.",
      "B": "There is no general rule that each low-volume email costs five Super Messages.",
      "C": "A country mix alone is not the explanation without applying the relevant multipliers."
    },
    "notes": [
      "Use the multiplier table for the subscription start date and message type. Do not memorize a single worldwide SMS-to-unit ratio.",
      "Reference: https://www.salesforce.com/marketing/sms-ratio-updates/"
    ],
    "source": {
      "stem": [
        "Northern Trail Outfitters (NTO) rolled out a global SMS initiative three months ago, as their customers have shown great interest in receiving promotions via text. However, NTO was notified they are already at 75% utilization for their annual Super Messages. Why could this be the case?"
      ],
      "choices": [
        "MobilePush was enabled by mistake, which consumes Super Messages when not in use.",
        "Each email consumes five super messages when sending below a certain threshold.",
        "The majority of NTO's subscriber base is in the United States.",
        "A multiplier is applied to each SMS message based on the destination country"
      ],
      "answer": "B"
    },
    "corrected": true
  },
  {
    "id": 26,
    "section": "journeys",
    "focus": "high",
    "group": "splits",
    "stem": [
      "Which activity should be used for multivariate content testing within Journey Builder?"
    ],
    "choices": [
      "Engagement Split",
      "Random Split",
      "Content Split",
      "Decision Split"
    ],
    "answer": "B",
    "type": "single",
    "printed": "B",
    "why": "A Random Split allocates contacts randomly among paths, allowing separate creative versions to be tested.",
    "wrong": {
      "A": "An Engagement Split routes on observed email behavior rather than random assignment.",
      "C": "Content Split is not the relevant standard Journey Builder activity.",
      "D": "A Decision Split routes by attribute criteria instead of random assignment."
    },
    "notes": [
      "Keep other variables controlled when comparing creative. Use Path Optimizer when the requirement includes choosing and routing future contacts to a winner."
    ]
  },
  {
    "id": 27,
    "section": "analytics",
    "focus": "high",
    "group": "einstein",
    "stem": [
      "Which Product enables a Marketing Cloud admin to observe customer behavior, build performance profiles and deliver the next best content?"
    ],
    "choices": [
      "Content Builder",
      "Einstein Send Time Optimization",
      "Audience Builder",
      "Einstein Email Recommendations"
    ],
    "answer": "D",
    "type": "single",
    "printed": "D",
    "why": "Einstein Email Recommendations uses customer behavior and preference profiles to select relevant products or content.",
    "wrong": {
      "A": "Content Builder manages content assets rather than generating behavior-based recommendations.",
      "B": "Send Time Optimization chooses timing, not the next-best content.",
      "C": "Audience Builder segments audiences rather than selecting personalized recommendations."
    },
    "notes": [
      "Distinguish what to show (Recommendations), when to send (STO), and predicted engagement (Scoring)."
    ]
  },
  {
    "id": 28,
    "section": "security",
    "focus": "high",
    "group": "access",
    "stem": [
      "Northern Trail Outfitters wants to business analyst to import contact lists. The analyst has the following Marketing Cloud roles: Marketing Cloud Channel Manager and Marketing Cloud Viewer. The analyst logged in but is unable to import contact lists. How should the user be updated to allow the analyst the appropriate access?"
    ],
    "choices": [
      "Remove Marketing Cloud Viewer",
      "Add Marketing Cloud Security Administrator",
      "Remove Marketing Cloud Channel manager",
      "Add Distributed Sending user"
    ],
    "answer": "A",
    "type": "single",
    "printed": "C",
    "why": "The Viewer role explicitly denies the import permission that Channel Manager grants. Removing the conflicting Viewer role resolves that role-level conflict.",
    "wrong": {
      "B": "Adding security administration does not remove the existing deny and grants unrelated powers.",
      "C": "Removing Channel Manager removes the needed grant while leaving the restrictive role.",
      "D": "Distributed Sending does not remove the conflicting import restriction."
    },
    "notes": [
      "An explicit deny takes precedence over a grant. Review effective permissions instead of accumulating more roles.",
      "Reference: https://help.salesforce.com/s/articleView?id=sf.mc_overview_marketing_cloud_roles.htm&language=en_US&type=5"
    ],
    "source": {
      "stem": [
        "Northern Trail Outfitters wants to business analyst to import contact lists. The analyst has the following Marketing Cloud roles: Marketing Cloud Channel Manager and Marketing Cloud Viewer. The analyst logged in but is unable to import contact lists. How should the user be updated to allow the analyst the appropriate access?"
      ],
      "choices": [
        "Remove Marketing Cloud Viewer",
        "Add Marketing Cloud Security Administrator",
        "Remove Marketing Cloud Channel manager",
        "Add Distributed Sending user"
      ],
      "answer": "C"
    },
    "corrected": true
  },
  {
    "id": 29,
    "section": "delivery",
    "focus": "high",
    "group": "branding",
    "stem": [
      "Northern Trail Outfitters (NTO) uses Sender Authentication Package (SAP) for branding purposes. Their German business unit is configured with the SAP domain de.ntomarketing .com. The German NTO team is preparing for a campaign and wants to use customized CloudPages with the domain de-special.ntomarketing.com. How could the Marketing Cloud admin meet this requirement?"
    ],
    "choices": [
      "Purchase a new SAP for de-special.ntmarketing.com",
      "Purchase a new private Domain for use in CloudPages",
      "CloudPages must use the SAP domain",
      "CloudPages must use pages.ntmarketing.com"
    ],
    "answer": "B",
    "type": "single",
    "printed": "B",
    "why": "An additional CloudPages private domain provides the requested distinct branded page hostname without requiring another complete SAP.",
    "wrong": {
      "A": "A full additional SAP is unnecessary solely for an extra CloudPages hostname.",
      "C": "CloudPages can use additional properly licensed and configured private domains.",
      "D": "The page hostname is not permanently limited to this suggested default."
    },
    "notes": [
      "Check Private Domain and SSL entitlements and configure DNS and certificates. Domain authentication and link/image branding are related but distinct capabilities.",
      "Reference: https://help.salesforce.com/s/articleView?id=mktg.considerations_sap_and_private_domain.htm&language=en_US&type=5"
    ]
  },
  {
    "id": 30,
    "section": "security",
    "focus": "high",
    "group": "business-units",
    "stem": [
      "Northern Trail Outfitters wants to have specific permission restrictions applied to all users in a business unit. How should they accomplish this?"
    ],
    "choices": [
      "Assign a role to all users in the business unit.",
      "Set default permissions with the restrictions on the business unit",
      "Apply a permission set to the business unit",
      "Disable the permissions directly within the business unit"
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "source": {
      "stem": [
        "Northern Trail Outfitters wants to have specific permission restrictions applied to all users in a business unit. How should they accomplish this?"
      ],
      "choices": [
        "A Assign a role to the business unit",
        "Set default permissions with the restrictions on the business unit",
        "Apply a permission set to the business unit",
        "Disable the permissions directly within the business unit"
      ],
      "answer": "A"
    },
    "why": "A role assigned to all business-unit users applies the chosen permission restrictions consistently to that unit’s users.",
    "wrong": {
      "B": "The described default-permissions switch is not the role assignment mechanism.",
      "C": "Salesforce CRM permission sets are not assigned to Engagement business units this way.",
      "D": "A business unit is not itself a granular user-permission editor."
    },
    "notes": [
      "Use roles for user capabilities and business-unit membership/subscriber filters for scope; review explicit denies carefully."
    ]
  },
  {
    "id": 31,
    "section": "automation",
    "focus": "high",
    "group": "files",
    "stem": [
      "Northern Trail Outfitters requires all subscriber files placed on the SFTP for import be encrypted. Which activity in Automation Studio could be used to decrypt the file to prepare for Importing?"
    ],
    "choices": [
      "Import Activity",
      "Data Extract Activity",
      "File Transfer Activity",
      "Decryption Activity"
    ],
    "answer": "C",
    "type": "single",
    "printed": "C",
    "why": "A File Transfer activity can decrypt an encrypted file before the subsequent Import File activity reads the resulting data.",
    "wrong": {
      "A": "Import File parses data into a target; it is not the file-decryption activity.",
      "B": "Data Extract exports data rather than decrypting the incoming file.",
      "D": "Decryption Activity is not the standard activity name."
    },
    "notes": [
      "Load the appropriate private key into Key Management and configure the intended file location. For the safehouse import flow, decrypt first and import second."
    ]
  },
  {
    "id": 32,
    "section": "journeys",
    "focus": "must",
    "group": "orchestration",
    "stem": [
      "Northern Trail Outfitters (NTO) Is building a Journey which randomly sends five different versions of an initial welcome email to new subscribers; however, subscribers receive the same follow-up email two weeks later. To improve maintainability of their email content, NTO wants to use five completely different emails, rather than having one email with dynamic content. Which activity would allow them to build the journey with the fewest activities possible?"
    ],
    "choices": [
      "Join",
      "Einstein STO",
      "Engagement Split",
      "Wait Until Date"
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "why": "Join merges the five welcome branches so a single wait and follow-up email can serve all contacts.",
    "wrong": {
      "B": "STO optimizes send time rather than merging paths.",
      "C": "Engagement Split adds behavior-based branching instead of consolidation.",
      "D": "Wait Until Date delays contacts but does not join branches."
    },
    "notes": [
      "A Join reduces duplicated downstream activities. It does not deduplicate separate entries or combine multiple people into one contact."
    ]
  },
  {
    "id": 33,
    "section": "delivery",
    "focus": "high",
    "group": "branding",
    "stem": [
      "A Marketing Cloud admin is asked by the marketing team to ensure a default Header and Footer be added to emails. Where under Setup could this be created?"
    ],
    "choices": [
      "Content Builder Settings",
      "Emails Studio Settings",
      "Account Settings",
      "Campaign Settings"
    ],
    "answer": "C",
    "type": "single",
    "printed": "C",
    "why": "Default account email headers and footers are managed in Account Settings.",
    "wrong": {
      "A": "Content Builder settings govern content behavior, not this account default location.",
      "B": "The proposed Email Studio settings label is not the specified Account Settings configuration.",
      "D": "Campaign settings do not define the account’s default header/footer."
    },
    "notes": [
      "Check the final rendered email and send classification; defaults do not remove the need for an appropriate address and unsubscribe mechanism."
    ]
  },
  {
    "id": 34,
    "section": "security",
    "focus": "high",
    "group": "security",
    "stem": [
      "Governance permits users to view customer data but requires emailed subscriber and tracking exports to go only to preapproved recipients. Which feature, when enforced, restricts those export recipients?"
    ],
    "choices": [
      "Export Email Allowlist",
      "IP Allowlist",
      "Identity Verification",
      "Audit Trail"
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "source": {
      "stem": [
        "Northern Trail Outfitters was given a set of requirements from their governance team to protect against misuse of customer dat a. One item mandated Marketing Cloud users should NOT be able to export data without approval from the governance team, however, users should still be able to view data within the system. Which feature would allow compliance with this requirement?"
      ],
      "choices": [
        "Export Email Allowlist",
        "IP Allowlist",
        "Identity Verification",
        "Audit Trail"
      ],
      "answer": "A"
    },
    "why": "An enforced Export Email Allowlist restricts emailed exports to approved addresses or domains.",
    "wrong": {
      "B": "An IP allowlist controls access origins, not export email recipients.",
      "C": "Identity verification checks a user’s identity rather than export destinations.",
      "D": "Audit Trail records events rather than enforcing approved export recipients."
    },
    "notes": [
      "This is a destination control, not an approval engine or a blanket block on all downloads and SFTP exports.",
      "Reference: https://help.salesforce.com/s/articleView?id=mktg.mc_overview_export_email_allowlist.htm&language=en_US&type=5"
    ],
    "repaired": true
  },
  {
    "id": 35,
    "section": "delivery",
    "focus": "familiar",
    "group": "subscriptions",
    "stem": [
      "Which two data structures could be configured to appear In the out-of-the-box Subscription Center? Choose 2 answers"
    ],
    "choices": [
      "Data Extensions",
      "Publication Lists",
      "Lists",
      "Groups"
    ],
    "answer": "B,C",
    "type": "multi",
    "printed": "B,C",
    "why": "Public publication lists and public subscriber lists can appear in the standard Subscription Center.",
    "wrong": {
      "A": "Data extensions are not automatically rendered as subscription categories in the standard center.",
      "D": "Groups are list segmentation constructs rather than public subscription choices."
    },
    "notes": [
      "Mark the intended lists public. For a DE audience, use the correct publication list to manage topic-level opt-outs."
    ],
    "choose": 2
  },
  {
    "id": 36,
    "section": "data",
    "focus": "must",
    "group": "identity",
    "stem": [
      "Northern Trail Outfitters wants a data model in Marketing Cloud which will prevent them from duplicating, or even triplicating, records. How should the unique identifier of the data model be setup if the MobilePush and Email channels are used within the same account?"
    ],
    "choices": [
      "Use the auto-generated keys supplied by Marketing Cloud at time of record creation for each channel used.",
      "Use a third-party system to identify and delete duplicate Contact Keys.",
      "Strategically control the Contact Key values and tie records together across channels using this key.",
      "Strategically control the Contact Key values in Email, but let Marketing Cloud automatically tie records as needed from MobilePush."
    ],
    "answer": "C",
    "type": "single",
    "printed": "C",
    "why": "A stable, consistently assigned Contact Key ties one person’s email and push records together instead of creating separate channel identities.",
    "wrong": {
      "A": "Independent automatically generated keys can make one person appear as several contacts.",
      "B": "Deleting duplicates later is not a reliable identity design.",
      "D": "Engagement cannot infer the desired identity mapping from unrelated channel keys."
    },
    "notes": [
      "Do not use a device token as the permanent person identity. Plan key assignment before collection and preserve consent separately per channel."
    ]
  },
  {
    "id": 37,
    "section": "integrations",
    "focus": "high",
    "group": "connect",
    "stem": [
      "Northern Trail Outfitters wants to use Synchronized Data Sources to sync Contact data from Salesforce CRM. However, they only want to sync records they would be able to send to reducing the amount of data being brought over. Which two filtering options could be used when configuring the Contact synced object? Choose 2 answers"
    ],
    "choices": [
      "Select all records which have opened an email in the past six months",
      "Select all records with an email address",
      "Select all records which are active in All Subscribers",
      "Select all records where HasOptedOutofEmail is FALSE"
    ],
    "answer": "B,D",
    "type": "multi",
    "printed": "B,C",
    "why": "Sync filtering can restrict records to those with email addresses or to those meeting a Boolean condition such as HasOptedOutOfEmail = false.",
    "wrong": {
      "A": "Recent email opens are Engagement tracking data, not a native CRM object-sync filter.",
      "C": "All Subscribers status is not one of the CRM source filter options."
    },
    "notes": [
      "These are available filtering approaches, not a guarantee of send consent. If several conditions must apply together, maintain a source Boolean eligibility field and sync on it.",
      "Reference: https://help.salesforce.com/s/articleView?id=sf.mc_cab_creating_and_interacting_with_synchronized_data_sources.htm&language=en_US&type=5"
    ],
    "choose": 2,
    "source": {
      "stem": [
        "Northern Trail Outfitters wants to use Synchronized Data Sources to sync Contact data from Salesforce CRM. However, they only want to sync records they would be able to send to reducing the amount of data being brought over. Which two filtering options could be used when configuring the Contact synced object? Choose 2 answers"
      ],
      "choices": [
        "Select all records which have opened an email in the past six months",
        "Select all records with an email address",
        "Select all records which are active in All Subscribers",
        "Select all records where HasOptedOutofEmail is FALSE"
      ],
      "answer": "B,C"
    },
    "corrected": true
  },
  {
    "id": 38,
    "section": "channels",
    "focus": "low",
    "group": "legacy",
    "stem": [
      "For the Advertising Studio feature described in this legacy mock, which listed network supported creating lookalike audiences directly within Marketing Cloud Advertising?"
    ],
    "choices": [
      "Facebook and Twitter",
      "Facebook",
      "Google and Facebook",
      "Twitter"
    ],
    "answer": "B",
    "type": "single",
    "printed": "A",
    "source": {
      "stem": [
        "The Marketing Cloud admin for Northern Trails Outfitters wants to build an audience with Advertising Studio which mimics the traits of their most valuable customers. Which network(s) support lookalike audiences directly from Advertising Studio?"
      ],
      "choices": [
        "Facebook and Twitter",
        "Facebook",
        "Google and Facebook",
        "Twitter"
      ],
      "answer": "A"
    },
    "why": "The documented legacy Advertising Audiences workflow supported creating lookalikes directly for Facebook.",
    "wrong": {
      "A": "Twitter targeting support did not imply this same built-in lookalike creation capability.",
      "C": "Other platforms’ similar-audience tools are not the same as this direct Advertising Studio workflow.",
      "D": "Twitter is not the supported answer for this specific historical feature."
    },
    "notes": [
      "This is a legacy product question; review present product availability before planning an advertising deployment.",
      "Reference: https://trailhead.salesforce.com/content/learn/modules/advertising-studio-implementation/use-advertising-audiences"
    ],
    "corrected": true
  },
  {
    "id": 39,
    "section": "content",
    "focus": "high",
    "group": "content",
    "stem": [
      "NTO uses [PREVIEW] in draft email subjects. The administrator wants a warning before an Email Studio live send if that marker remains, so the marketer can remove it. What should the administrator configure?"
    ],
    "choices": [
      "Use Proof instead of [PREVIEW]",
      "Add [PREVIEW] to the subject line validation list",
      "Require several campaign approvals",
      "Wrap the subject line with AMPscript"
    ],
    "answer": "B",
    "type": "single",
    "printed": "B",
    "source": {
      "stem": [
        "A Marketing Cloud admin wants to ensure email sends exclude their testing prefix of [PREVIEW] in the subject line when deploying from Email Studio. What should the admin do to prevent the prefix from deploying in live sends?"
      ],
      "choices": [
        "Use Proof instead of [PREVIEW]",
        "Add [PREVIEW] to the subject line validation list",
        "Require several campaign approvals",
        "Wrap the subject line with AMPscript"
      ],
      "answer": "B"
    },
    "why": "Subject/Preheader Validation can warn a marketer when configured test words such as [PREVIEW] remain before sending.",
    "wrong": {
      "A": "Proof is already a test-related word; renaming the marker does not configure the requested guardrail.",
      "C": "Approvals add review but do not implement the specific test-word notification.",
      "D": "Custom AMPscript is unnecessary for this administrative warning requirement."
    },
    "notes": [
      "Validation displays a warning; it does not automatically strip the marker or guarantee an unbypassable send block. The appended review’s proposed switch to D was not adopted.",
      "Reference: https://help.salesforce.com/s/articleView?id=mktg.mc_es_subject_preheader_validation.htm&language=en_US&type=5"
    ],
    "repaired": true
  },
  {
    "id": 40,
    "section": "delivery",
    "focus": "must",
    "group": "branding",
    "stem": [
      "Northern Trail Outfitters (NTO) purchased one Sender Authentication Package (SAP) to ensure their branding is on every marketing communication. What would be achieved with SAP?"
    ],
    "choices": [
      "Image URLS are wrapped with the appropriate brand URL",
      "The out-of-the-box profile center will display NTO branding",
      "A different click domain can be used for each brand",
      "A Dedicated IP is automatically warmed up"
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "why": "SAP account branding wraps tracked links and image URLs using the authenticated branded domain.",
    "wrong": {
      "B": "URL branding does not automatically redesign the standard profile center with the company’s visual brand.",
      "C": "One SAP does not supply an independently branded click domain for every brand.",
      "D": "A new dedicated IP still requires warming."
    },
    "notes": [
      "Separate domain authentication, account URL branding, and IP reputation. Branded links do not guarantee inbox placement.",
      "Reference: https://help.salesforce.com/s/articleView?id=sf.mc_es_sender_authentication_package.htm&language=en_US&type=5"
    ]
  },
  {
    "id": 42,
    "section": "security",
    "focus": "high",
    "group": "business-units",
    "stem": [
      "Northern Trail Outfitters just purchased Marketing Cloud. Which three tasks would the Marketing Cloud admin be guided through in Setup Assistant? Choose 3 answers"
    ],
    "choices": [
      "Creating users and assigning roles which meet their job functions",
      "Creating a SMS message and sending a mobile campaign",
      "Classifying sends and defining parameters for email sends",
      "Building the data structure used to store audience information",
      "Importing data into contacts using the Data Loader"
    ],
    "answer": "A,C,D",
    "type": "multi",
    "printed": "A,C,D",
    "why": "Setup Assistant guides core account setup, including users/roles, email sending configuration, and audience data structure.",
    "wrong": {
      "B": "Creating a full SMS campaign is not one of these core setup checklist tasks.",
      "E": "Salesforce Data Loader is not the Engagement contact-import workflow described here."
    },
    "notes": [
      "Setup Assistant is guidance and a checklist; it does not automatically implement an entire marketing program."
    ],
    "choose": 3
  },
  {
    "id": 43,
    "section": "analytics",
    "focus": "high",
    "group": "analytics",
    "stem": [
      "Northern Trails Outfitters uses Doubleclick Bid Manager, Facebook Ads, and Google Analytics to manage advertising spend. They want to combine these data sources with Marketing Cloud's API to identify their most effective campaigns. What feature should be recommended?"
    ],
    "choices": [
      "Einstein AI",
      "Interaction Studio",
      "Datorama",
      "Google Marketing Platform"
    ],
    "answer": "C",
    "type": "single",
    "printed": "C",
    "why": "Datorama, now Marketing Cloud Intelligence, unifies marketing performance data from advertising and analytics sources for cross-channel analysis.",
    "wrong": {
      "A": "Einstein AI is too broad and is not this marketing-data integration and reporting product.",
      "B": "Interaction Studio focuses on real-time personalization, not advertising-spend data consolidation.",
      "D": "Google Marketing Platform is not Salesforce’s cross-source marketing-intelligence product."
    },
    "notes": [
      "Legacy names in the mock are preserved where helpful: Datorama is Marketing Cloud Intelligence; Interaction Studio became Marketing Cloud Personalization."
    ]
  },
  {
    "id": 44,
    "section": "analytics",
    "focus": "low",
    "group": "analytics",
    "stem": [
      "Historical Discover Reporting question. The source does not define the two analyses its mobile-adoption strategy requires.",
      "Northern Trail Outfitters has the Discover Reporting Tool. Which two report types could help them drive mobile adoption strategy? Choose 2 answers"
    ],
    "choices": [
      "Time Between Send and Engagement",
      "Email Performance by Device",
      "Email Sending Performance Report",
      "Deliverability Complaint Rate"
    ],
    "answer": "",
    "type": "multi",
    "printed": "B,C",
    "source": {
      "stem": [
        "Northern Trail Outfitters has the Discover Reporting Tool. Which two report types could help them drive mobile adoption strategy? Choose 2 answers"
      ],
      "choices": [
        "Time Between Send and Engagement",
        "Email Performance by Device",
        "Email Sending Performance Report",
        "Deliverability Complaint Rate"
      ],
      "answer": "B,C"
    },
    "why": "Not scored. Email Performance by Device directly supports comparing mobile and desktop engagement. The broad mobile-adoption goal does not uniquely establish the second report: general sending performance and engagement-delay analysis can both be useful for different strategies.",
    "wrong": {},
    "notes": [
      "The previous repair added a specific send-to-engagement-lag requirement to select a different pair. That supplied requirement makes a coherent study example, but does not establish that the original report pair was wrong. The Corrected badge is withdrawn.",
      "Discover Reporting is retired. Specify the exact historical report outputs required, or replace this with a separately identified current reporting question, before assigning a unique answer set.",
      "Device report: https://help.salesforce.com/s/articleView?id=sf.mc_re_single_email_performance_by_device_report.htm&language=en_US&type=5",
      "Retirement: https://help.salesforce.com/s/articleView?id=000356878&language=en_US&type=1",
      "Compared online variant: https://www.actual4test.com/discussions/Salesforce/exam-marketing-cloud-administrator-topic-4-question-5-discussion-p1158738.html"
    ],
    "choose": 2,
    "ungraded": true
  },
  {
    "id": 45,
    "section": "content",
    "focus": "must",
    "group": "content",
    "stem": [
      "Northern Trail Outfitters wants to send a custom survey to customers asking about their experience following a recent purchase. Which feature should be used to create a survey form?"
    ],
    "choices": [
      "MobileConnect",
      "Content Builder",
      "Smart Capture",
      "Profile Center"
    ],
    "answer": "C",
    "type": "single",
    "printed": "C",
    "why": "Smart Capture builds a web form and records submitted survey answers in the configured data destination.",
    "wrong": {
      "A": "MobileConnect sends SMS/MMS rather than hosting the survey form.",
      "B": "Content Builder can manage page assets, but Smart Capture is the form-capture feature being requested.",
      "D": "Profile Center manages subscriber profile/preferences rather than a general custom purchase survey."
    },
    "notes": [
      "Place the form on a CloudPage and choose a suitable key, fields, validation, and consent handling. A form alone does not enforce a complete survey or double opt-in workflow."
    ]
  },
  {
    "id": 46,
    "section": "delivery",
    "focus": "high",
    "group": "reputation",
    "stem": [
      "A Marketing Cloud admin needs to warm their accounts Dedicated IP. What option for segmentation aligns with the IP Warming process?"
    ],
    "choices": [
      "Segment to those recipients receiving text email versions first",
      "Segment subscribers with soft bounces in their own dedicated send",
      "Segment by domain to limit number of sends to each email provider",
      "Segment by geographic region as after-hours sends will be marked as spam"
    ],
    "answer": "C",
    "type": "single",
    "printed": "C",
    "why": "Segmenting by mailbox domain lets NTO control the ramp-up seen by each provider and observe provider-specific deliverability.",
    "wrong": {
      "A": "Plain-text recipients are not a meaningful warming priority by themselves.",
      "B": "Starting with soft-bouncing addresses does not build a healthy reputation.",
      "D": "Geography and after-hours timing do not by themselves cause spam classification."
    },
    "notes": [
      "Begin with engaged, permissioned recipients, ramp volume gradually, and slow down when blocks or complaints increase."
    ]
  },
  {
    "id": 47,
    "section": "channels",
    "focus": "low",
    "group": "legacy",
    "stem": [
      "What are entry source types for Journey Builder?"
    ],
    "choices": [
      "Data Extension, CloudPages, Email List, API Event",
      "Data Extension, Audience Studio, API Event, Date Based Event",
      "Data Extension, Email List, API Event, Date Based Event",
      "Data Extension, Salesforce Community, GA360, Email List"
    ],
    "answer": "B",
    "type": "single",
    "printed": "B",
    "why": "B is the legacy entry-source combination intended by this mock: data extension, Audience Studio audience, API event, and date-based event.",
    "wrong": {
      "A": "A plain Email List is not one of these standard Journey Builder entry sources.",
      "C": "Including Email List makes this combination unsuitable.",
      "D": "Email List and the proposed Salesforce Community entry type do not form the listed standard combination."
    },
    "notes": [
      "Audience Studio retired in 2024. This historical option list is not a current setup checklist; use supported present-day entry sources for a new journey.",
      "Reference: https://help.salesforce.com/s/articleView?id=005132112&language=en_US&type=1"
    ]
  },
  {
    "id": 48,
    "section": "automation",
    "focus": "must",
    "group": "files",
    "stem": [
      "A Marketing Cloud admin has been asked to update their Marketing Cloud SFTP password Where in Setup could they accomplish this task?"
    ],
    "choices": [
      "Company Settings",
      "Feature Settings",
      "Data Management",
      "Security"
    ],
    "answer": "C",
    "type": "single",
    "printed": "C",
    "why": "FTP Accounts is under Setup’s Data Management area and manages Engagement SFTP users and credentials.",
    "wrong": {
      "A": "Company Settings is not the SFTP account-management location.",
      "B": "Feature Settings is not the FTP Accounts location.",
      "D": "General Security settings do not replace the dedicated FTP account editor."
    },
    "notes": [
      "SFTP credentials are separate from UI-user passwords. Current accounts also support suitable SSH-key authentication."
    ]
  },
  {
    "id": 49,
    "section": "channels",
    "focus": "high",
    "group": "mobile",
    "stem": [
      "Northern Trail Outfitters has a mobile app. Which two products would allow them to send push notifications to customers with their mobile app? Choose 2 answers"
    ],
    "choices": [
      "Journey Builder",
      "Contact Builder",
      "MobileConnect",
      "MobilePush"
    ],
    "answer": "A,D",
    "type": "multi",
    "printed": "A,D",
    "why": "MobilePush provides app push messaging, and Journey Builder can orchestrate push activities for integrated mobile apps.",
    "wrong": {
      "B": "Contact Builder models contacts but does not send app notifications.",
      "C": "MobileConnect is for SMS/MMS rather than app push."
    },
    "notes": [
      "The app must integrate the supported SDK and register devices, contact identities, and notification permissions. Installing Journey Builder alone does not enable app messaging."
    ],
    "choose": 2
  },
  {
    "id": 50,
    "section": "security",
    "focus": "must",
    "group": "access",
    "stem": [
      "A Marketing Cloud admin has been asked to grant full administrator permissions to a new user. Which two standard roles should be selected for the new user? Choose 2 answers"
    ],
    "choices": [
      "Marketing Cloud Security Administrator",
      "Administrator",
      "Data Manager",
      "Marketing Cloud Administrator"
    ],
    "answer": "B,D",
    "type": "multi",
    "printed": "B,D",
    "why": "Administrator covers Email Studio administration; Marketing Cloud Administrator covers broad platform and cross-channel administration.",
    "wrong": {
      "A": "Security Administrator is focused on security and access rather than all platform operations.",
      "C": "Data Manager does not grant all Email Studio and cross-channel administration."
    },
    "notes": [
      "Use these broad roles only for people who need full administration. Ordinary marketers should receive narrower roles.",
      "Reference: https://help.salesforce.com/s/articleView?id=sf.mc_overview_roles.htm&language=en_US&type=5"
    ],
    "choose": 2
  },
  {
    "id": 51,
    "section": "security",
    "focus": "high",
    "group": "security",
    "stem": [
      "Northern Trail Outfitters' security team has password policies they want enforced within Marketing Cloud. Which policies could the Marketing Cloud admin configure in Setup?"
    ],
    "choices": [
      "Minimum Password Length, Password Complexity, Password History, Expiration Period",
      "Minimum Password Length, Use Strong Passphrases, Password History, Number of Security Questions",
      "Minimum Password Length, Use Strong Passphrases, Unique Password, Number of Security Questions",
      "Maximum Password Length, Password Complexity, Unique Password, Expiration Period"
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "why": "The listed configurable controls include minimum password length, complexity, history, and expiry period.",
    "wrong": {
      "B": "Strong passphrases and a number of security questions are not the listed configuration set.",
      "C": "Unique Password and security-question count are not the described standard controls.",
      "D": "The control is minimum length rather than the suggested maximum-length policy."
    },
    "notes": [
      "Password controls complement MFA/SSO and session restrictions. Scope the policy to the actual authentication method rather than assuming it governs an external identity provider."
    ],
    "source": {
      "stem": [
        "Northern Trail Outfitters' security team has password policies they want enforced within Marketing Cloud. Which policies could the Marketing Cloud admin configure in Setup7"
      ],
      "choices": [
        "Minimum Password Length, Password Complexity, Password History, Expiration Period",
        "Minimum Password Length, Use Strong Passphrases, Password History, Number of Security Questions",
        "Minimum Password Length, Use Strong Passphrases, Unique Password, Number of Security Questions",
        "Maximum Password Length, Password Complexity, Unique Password, Expiration Period"
      ],
      "answer": "A"
    }
  },
  {
    "id": 52,
    "section": "integrations",
    "focus": "familiar",
    "group": "connect",
    "stem": [
      "A Marketing Cloud admin has been asked to Include Sales Cloud data in their queries. Which feature would allow this functionality?"
    ],
    "choices": [
      "Journey Builder",
      "Synchronized Data Sources",
      "CloudPages",
      "Query Studio"
    ],
    "answer": "B",
    "type": "single",
    "printed": "B",
    "why": "Synchronized Data Sources make selected Sales Cloud object data available in Engagement for querying.",
    "wrong": {
      "A": "Journey Builder orchestrates contacts rather than performing source synchronization for queries.",
      "C": "CloudPages is a web publishing feature.",
      "D": "Query Studio uses data already available; it does not sync CRM objects."
    },
    "notes": [
      "Check source polling and fields in Contact Builder, and build a separate sendable segmentation result when needed."
    ]
  },
  {
    "id": 53,
    "section": "automation",
    "focus": "familiar",
    "group": "files",
    "stem": [
      "A Marketing Cloud admin wants to create an SFTP User for the first time. Which two considerations should be taken when configuring an SFTP User? Choose 2 answers"
    ],
    "choices": [
      "By default, the username is the MID for the current Marketing Cloud MID.",
      "Minimum password length is 12 characters.",
      "By default, the password will be the password of the logged-in user.",
      "Once created, the user will need to be activated in order to use the SFTP."
    ],
    "answer": "",
    "type": "multi",
    "printed": "B,D",
    "source": {
      "stem": [
        "A Marketing Cloud admin wants to create an SFTP User for the first time. Which two considerations should be taken when configuring an SFTP User7 Choose 2 answers"
      ],
      "choices": [
        "By default, the username is the MID for the current Marketing Cloud MID.",
        "Minimum password length is 12 characters.",
        "By default, the password will be the password of the logged-in user.",
        "Once created, the user will need to be activated in order to use the SFTP."
      ],
      "answer": "B,D"
    },
    "why": "Not scored. The question does not identify the SFTP account-creation interface or release. Current primary instructions and the Trailhead MID-based example do not establish the source's exact 12-character minimum and separate-activation claim together, so no two-option key is verified for its original choices.",
    "wrong": {},
    "notes": [
      "The previous repair replaced the password-length option with a separate-password statement and selected a different documented setup workflow. Those are useful setup facts, but they did not prove the source's B,D key wrong in its unspecified historical interface. The Corrected badge is withdrawn.",
      "SFTP credentials are separate from the Engagement UI login. Follow the documented user/account workflow and password or SSH-key requirements for the actual tenant, rather than memorizing an unverified numeric password rule.",
      "Current setup: https://help.salesforce.com/s/articleView?id=mktg.mc_overview_add_ftp_accounts.htm&language=en_US&type=5",
      "MID-based example: https://trailhead.salesforce.com/content/learn/modules/marketing-cloud-data-management/move-your-data"
    ],
    "choose": 2,
    "ungraded": true
  },
  {
    "id": 54,
    "section": "automation",
    "focus": "high",
    "group": "imports",
    "stem": [
      "Northern Trail Outfitters runs a nightly automation consisting of a File Transfer and a File Import. Following an update from the engineering team, the automation began failing. The Marketing Cloud admin suspects the CSV file now has an invalid format. How could the admin receive a file of the bad data rows to confirm this theory?"
    ],
    "choices": [
      "Move the File Transfer to its own automation and include a notification email address",
      "Move the Import definition to its own automation and include a notification email address",
      "Configure the Import definition's notification email and enable Bad Data Behavior to include invalid rows.",
      "Update the automation to include a notification email address for Runtime Errors"
    ],
    "answer": "C",
    "type": "single",
    "printed": "C",
    "why": "Configure import notifications and the Bad Data Behavior option to request a file of invalid rows. A notification address alone reports results but does not by itself specify that the bad-data file should be produced.",
    "wrong": {
      "A": "Moving File Transfer does not add the needed Import File result details.",
      "B": "The import can be configured in its existing automation; separating it is unnecessary.",
      "D": "Automation runtime alerts signal failure but are not the import’s detailed result-file configuration."
    },
    "notes": [
      "Compare the file delimiter, header handling, column count, field mappings, encoding, and data types with the target schema.",
      "The documented file is emailed when within the supported size; files over 25 MB are placed in FTP. Reference: https://help.salesforce.com/s/articleView?id=sf.mc_as_update_a_list_or_data_extension_using_an_external_file.htm&language=en_US&type=5"
    ],
    "source": {
      "stem": [
        "Northern Trail Outfitters runs a nightly automation consisting of a File Transfer and a File Import. Following an update from the engineering team, the automation began failing. The Marketing Cloud admin suspects the CSV file now has an invalid format. How could the admin receive a file of the bad data rows to confirm this theory?"
      ],
      "choices": [
        "Move the File Transfer to its own automation and include a notification email address",
        "Move the Import definition to its own automation and include a notification email address",
        "Update the Import definition to include a notification email address",
        "Update the automation to include a notification email address for Runtime Errors"
      ],
      "answer": "C"
    },
    "repaired": true
  },
  {
    "id": 55,
    "section": "automation",
    "focus": "high",
    "group": "imports",
    "stem": [
      "Northern Trail Outfitters has Imported a file Into All Subscribers. They then received a results file stating admin@example.com could NOT be imported. Which error code would the file contain for this record?"
    ],
    "choices": [
      "Restricted Values",
      "List Detective",
      "Invalid Email Address",
      "Skipped Records"
    ],
    "answer": "B",
    "type": "single",
    "printed": "B",
    "why": "List Detective can reject prohibited or problematic role-based addresses such as admin@ during subscriber import.",
    "wrong": {
      "A": "Restricted Values is not the relevant address-screening rejection here.",
      "C": "The address is syntactically shaped like an email; role-based screening is a different check.",
      "D": "Skipped Records is a general outcome, not the requested specific screening error."
    },
    "notes": [
      "Inspect the actual row error rather than assuming every rejected address has invalid syntax. The example domain also should not be used as a real deliverable audience."
    ]
  },
  {
    "id": 56,
    "section": "security",
    "focus": "must",
    "group": "security",
    "stem": [
      "Northern Trail Outfitters wants to leverage the REST API for an external application they plan to build. Where should their Marketing Cloud admin set up permissions to allow REST authentication?"
    ],
    "choices": [
      "Installed Packages",
      "Data Management",
      "Security Settings",
      "Salesforce Integration"
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "why": "An Installed Package API Integration defines OAuth credentials and allowed API scopes for an external application.",
    "wrong": {
      "B": "Data Management does not issue the OAuth integration credentials.",
      "C": "Security Settings contains broader account security rather than this API Integration setup.",
      "D": "Salesforce Integration is for CRM connectivity, not every REST client."
    },
    "notes": [
      "Choose the appropriate integration type and only the required scopes. Store secrets securely and use the tenant-specific authentication and REST endpoints."
    ]
  },
  {
    "id": 57,
    "section": "security",
    "focus": "high",
    "group": "business-units",
    "stem": [
      "Northern Trail Outfitters (NTO) Is a global brand which Includes many subsidiary brands under the parent umbrell a. NTO is the Enterprise business unit and also has a child business unit used for sending promotional email. How should the rest of the business units be organized? Each brand requires separate access and branding, and each of its geographic teams requires a further independently scoped unit within that brand."
    ],
    "choices": [
      "Create child business units for each brand and nest another level of child business units for GEOs.",
      "Create and apply folders with naming conventions in the current account to keep track of brand assets.",
      "Create new Enterprise business units for each brand and child business units for each of the brand's GEOs.",
      "Create one child business unit for the other brands to share but apply folders and naming conventions."
    ],
    "answer": "A",
    "type": "single",
    "printed": "B",
    "why": "Separate brand business units, with geographic children where appropriate, support the required organizational hierarchy and scoped operations.",
    "wrong": {
      "B": "Folders organize assets but do not create independent brand/geographic business-unit scope.",
      "C": "Creating unrelated enterprise accounts is not the stated hierarchy within the existing enterprise.",
      "D": "One shared child with folders does not provide the requested brand/geographic separation."
    },
    "notes": [
      "The heading is absent in the document; 57 is inferred between 56 and 58. Base BU design on access, branding, data, consent, and operating needs rather than hierarchy alone."
    ],
    "source": {
      "stem": [
        "Northern Trail Outfitters (NTO) Is a global brand which Includes many subsidiary brands under the parent umbrell a. NTO is the Enterprise business unit and also has a child business unit used for sending promotional email. How should the rest of the business units be organized?"
      ],
      "choices": [
        "Create child business units for each brand and nest another level of child business units for GEOs.",
        "Create and apply folders with naming conventions in the current account to keep track of brand assets.",
        "Create new Enterprise business units for each brand and child business units for each of the brand's GEOs.",
        "Create one child business unit for the other brands to share but apply folders and naming conventions."
      ],
      "answer": "B"
    },
    "corrected": true
  },
  {
    "id": 58,
    "section": "data",
    "focus": "familiar",
    "group": "retention",
    "stem": [
      "NTO wants each newly inserted data-extension row automatically deleted 12 months after creation while keeping the data extension. Which retention configuration should be applied when creating each data extension?"
    ],
    "choices": [
      "Configure the business unit data retention setting to 12 months",
      "Configure the Enterprise wide default retention to one year",
      "Set inactive data to be automatically cleared after one year, but is recoverable",
      "Apply a Row Based Retention to each data extension as it is created, set to 12 months"
    ],
    "answer": "D",
    "type": "single",
    "printed": "D",
    "source": {
      "stem": [
        "To prevent retention of stagnant data, Northern Trail Outfitters wants any inactive data stored in data extensions to be cleared after 12 months. What action should be taken?"
      ],
      "choices": [
        "Configure the business unit data retention setting to 12 months",
        "Configure the Enterprise wide default retention to one year",
        "Set inactive data to be automatically cleared after one year, but is recoverable",
        "Apply a Row Based Retention to each data extension as it is created, set to 12 months"
      ],
      "answer": "D"
    },
    "why": "Individual-record retention on each data extension deletes rows according to their creation age while retaining the data-extension structure.",
    "wrong": {
      "A": "This is configured per data extension, not by one business-unit inactivity setting.",
      "B": "There is no enterprise-wide default that satisfies this specific per-row policy.",
      "C": "A recoverable inactive flag is not the requested automatic deletion policy."
    },
    "notes": [
      "Row age is not time since last engagement. A real inactivity requirement needs an explicit last-activity field and a separate filtering/deletion design.",
      "Reference: https://help.salesforce.com/s/articleView?id=mktg.mc_cab_data_extensions_manage.htm&language=en_US&type=5"
    ],
    "repaired": true
  },
  {
    "id": 59,
    "section": "automation",
    "focus": "high",
    "group": "files",
    "stem": [
      "A Tracking Extract contains accented subscriber names that appear corrupted in the receiving tool. Which two listed settings concern Unicode-compatible output, rather than delimiters or file structure? Choose 2 answers; these identify encoding controls, not a requirement to apply two encodings simultaneously."
    ],
    "choices": [
      "Change the column delimiter to a pipe (|).",
      "Change Character Encoding to UTF-8",
      "Select Unicode Output",
      "Change Format to xml"
    ],
    "answer": "B,C",
    "type": "multi",
    "printed": "B,C",
    "source": {
      "stem": [
        "A Marketing Cloud admin has configured a Tracking Extract which includes all subscriber attributes for their global regions. However, the admin notices accented characters in the customers' names appear jumbled in the extracted file. Which two settings could solve this issue? Choose 2 answers"
      ],
      "choices": [
        "Change Column Delimiter to",
        "Change Character Encoding to UTF-8",
        "Select Unicode Output",
        "Change Format to xml"
      ],
      "answer": "B,C"
    },
    "why": "Character Encoding set to UTF-8 is a Unicode encoding choice. The documented UnicodeOutput option saves a tracking extract as UTF-16 instead of ASCII. These are different output encodings; configure a supported mode and make the reader decode that actual encoding.",
    "wrong": {
      "A": "Changing a column delimiter does not repair character encoding.",
      "D": "XML output does not by itself fix an encoding mismatch."
    },
    "notes": [
      "Configure the extract’s supported Unicode/encoding options and ensure the receiving tool reads the same encoding. The source’s empty delimiter option was completed as a distractor.",
      "An online version preserves the missing pipe delimiter; changing a delimiter does not repair encoding.",
      "Recovered option: https://www.itexams.com/exam/Certified-Marketing-Cloud-Administrator/2",
      "UnicodeOutput is not a synonym for UTF-8. The existing source key B,C identifies the two encoding-related controls. Reference: https://help.salesforce.com/s/articleView?id=mktg.mc_as_tracking_extract_config.htm&language=en_US&type=5"
    ],
    "choose": 2,
    "repaired": true
  },
  {
    "id": 60,
    "section": "data",
    "focus": "high",
    "group": "identity",
    "stem": [
      "A Marketing Cloud admin runs the Contacts Counts report and sees there are currently 500,000 contacts in their account. They have a total of 300,000 email subscribers, 200,000 synchronized contacts, and 75,000 mobile subscribers. Why would the total contact count be less than the total number of contacts from all data sources?"
    ],
    "choices": [
      "Synchronized contacts are only counted after sending",
      "Only active email subscriber are counted.",
      "Mobile subscribers are not counted as contacts.",
      "There are overlapping contacts in each of the channel"
    ],
    "answer": "D",
    "type": "single",
    "printed": "B",
    "why": "Distinct contacts are counted by Contact Key, so one person represented with the same key in several sources is counted once.",
    "wrong": {
      "A": "CRM-synchronized contacts are not counted only after a send.",
      "B": "The contact count is not limited to active email subscribers.",
      "C": "Mobile contacts participate in contact counting."
    },
    "notes": [
      "Identical email addresses with different Contact Keys can still count as different contacts. Cross-channel identity design affects both accuracy and usage.",
      "Reference: https://help.salesforce.com/s/articleView?id=000232653&language=en_US&type=1"
    ],
    "source": {
      "stem": [
        "A Marketing Cloud admin runs the Contacts Counts report and sees there are currently 500,000 contacts in their account. They have a total of 300,000 email subscribers, 200,000 synchronized contacts, and 75,000 mobile subscribers. Why would the total contact count be less than the total number of contacts from all data sources?"
      ],
      "choices": [
        "Synchronized contacts are only counted after sending",
        "Only active email subscriber are counted.",
        "Mobile subscribers are not counted as contacts.",
        "There are overlapping contacts in each of the channel"
      ],
      "answer": "B"
    },
    "corrected": true
  },
  {
    "id": 61,
    "section": "content",
    "focus": "high",
    "group": "content",
    "stem": [
      "Northern Trail Outfitters wants to optimize their eCommerce site by sending a follow-up Email to a customer alter an online purchase is made. What feature could be used to solicit website feedback without navigating away from the email?"
    ],
    "choices": [
      "CloudPage forms Content Block",
      "Email Form Content Block",
      "Dynamic Content Block",
      "Reference Content Block"
    ],
    "answer": "B",
    "type": "single",
    "printed": "B",
    "why": "The Email Form block supports collecting feedback within compatible email clients without requiring a separate webpage visit.",
    "wrong": {
      "A": "A CloudPage form requires navigating to the hosted page.",
      "C": "Dynamic Content chooses content variations rather than capturing submitted feedback.",
      "D": "A Reference block reuses content rather than providing form behavior."
    },
    "notes": [
      "Interactive-email support varies by client. Provide a working fallback experience for clients that cannot submit the form in the inbox.",
      "Reference: https://help.salesforce.com/s/articleView?id=sf.mc_ceb_interactive_email_display_faq.htm&language=en_US&type=5"
    ]
  },
  {
    "id": 62,
    "section": "analytics",
    "focus": "high",
    "group": "analytics",
    "stem": [
      "A Marketing Cloud admin is asked to understand how a certain content area within a Triggered Send Email is performing. Which report should be used?"
    ],
    "choices": [
      "Dynamic Content for Triggered Sends",
      "Sends Account Send Summary",
      "Impression Tracking for Triggered Sends",
      "Email Performance by Attribute"
    ],
    "answer": "C",
    "type": "single",
    "printed": "C",
    "why": "Impression Tracking for Triggered Sends measures the instrumented content regions in triggered emails.",
    "wrong": {
      "A": "Dynamic Content for Triggered Sends is not the named impression-region report.",
      "B": "Account Send Summary provides broader account/send metrics.",
      "D": "Email Performance by Attribute groups on subscriber attributes rather than the specific content region."
    },
    "notes": [
      "Content-region reporting needs suitable impression tracking/instrumentation. A report cannot retroactively recover region detail that was never captured."
    ]
  },
  {
    "id": 63,
    "section": "analytics",
    "focus": "high",
    "group": "analytics",
    "stem": [
      "A Marketing Cloud admin has been asked to get the last 30 days of Bounce data from their account. What should the admin use to get granular bounce data in bulk in a pre-defined format?"
    ],
    "choices": [
      "CSV download of bounce data in My Tracking",
      "Automation Studio Tracking Extract",
      "Automation Studio Query Activity",
      "Discover Deliverability Complaint Rate Report"
    ],
    "answer": "B",
    "type": "single",
    "printed": "B",
    "why": "A Tracking Extract produces bulk event files such as bounce records in a predefined extract format.",
    "wrong": {
      "A": "A manual tracking download is not the scheduled bulk extract workflow requested.",
      "C": "SQL can prepare bounce data but does not itself create the predefined extract files.",
      "D": "A complaint report is neither the requested bounce-event detail nor its bulk export."
    },
    "notes": [
      "Specify the date interval, desired extract files, and a File Transfer step where needed to deliver the output. _Bounce is useful when custom SQL output is required."
    ]
  },
  {
    "id": 64,
    "section": "journeys",
    "focus": "high",
    "group": "splits",
    "stem": [
      "A Marketing Cloud admin is configuring a journey using Path Optimizer. they want to hold back 60% of the contacts until a winner has been selected. Which two settings should be selected before the admin can configure the Holdback percentage? Choose 2 answers"
    ],
    "choices": [
      "Data Extension entry source",
      "Journey re-entry settings",
      "Run Once schedule type",
      "Winner evaluation"
    ],
    "answer": "C,D",
    "type": "multi",
    "printed": "C,D",
    "why": "Configure winner evaluation and use the Run Once entry schedule before setting up the Path Optimizer holdback group.",
    "wrong": {
      "A": "A data-extension source alone does not configure the winner or required schedule.",
      "B": "Re-entry policy is distinct from the holdback prerequisites."
    },
    "notes": [
      "Holdback waits until a winning path is chosen. It is unavailable with the Recurring entry schedule.",
      "Reference: https://help.salesforce.com/s/articleView?id=sf.mc_jb_path_optimizer_test_activity.htm&language=en_US&type=5",
      "The configuration sequence sets winner evaluation before Holdback; Holdback is available only with the Run Once entry schedule. Reference: https://help.salesforce.com/s/articleView?id=sf.mc_jb_path_optimizer_test_activity.htm&language=en_US&type=5"
    ],
    "choose": 2,
    "source": {
      "stem": [
        "A Marketing Cloud admin is configuring a journey using Path Optimizer. they want to hold back 60% of the contacts until a winner has been selected. Which two settings should be selected before the admin can configure the Holdback percentage? Choose 2 answers"
      ],
      "choices": [
        "Data Extension entry source",
        "Journey re-entry settings",
        "Run Once schedule type",
        "Winner evaluation"
      ],
      "answer": "C,D"
    }
  },
  {
    "id": 65,
    "section": "delivery",
    "focus": "high",
    "group": "subscriptions",
    "stem": [
      "When customers use the Marketing Cloud default Profile Center link to unsubscribe it causes users to not receive emails from any other business unit. What could explain this behavior?"
    ],
    "choices": [
      "The user gets Added to a blocklist that causes an Enterprise level unsubscribe",
      "The subscriber is deleted from All Subscribers.",
      "Data extensions automatically propagate every unsubscribe across the enterprise.",
      "Business-unit unsubscribe settings apply the unsubscribe to the entire enterprise."
    ],
    "answer": "D",
    "type": "single",
    "printed": "B",
    "source": {
      "stem": [
        "When customers use the Marketing Cloud default Profile Center link to unsubscribe it causes users to not receive emails from any other business unit. What could explain this behavior?"
      ],
      "choices": [
        "The user gets Added to a blocklist that causes an Enterprise level unsubscribe",
        "The user Is getting deleted from the AN Subscribers list",
        "Data in data extensions corresponding to the customer",
        "Is removed Business unit unsubscribe setting causes an Enterprise level unsubscribe"
      ],
      "answer": "B"
    },
    "why": "Business-unit unsubscribe settings can apply an unsubscribe across the enterprise, which explains the loss of mail from other business units.",
    "wrong": {
      "A": "A global blocklist is not required to explain the configured enterprise unsubscribe scope.",
      "B": "Unsubscribe changes status; it does not mean the subscriber was deleted from All Subscribers.",
      "C": "Data extensions do not automatically determine enterprise unsubscribe scope."
    },
    "notes": [
      "Inspect unsubscribe scope and the implementation of preference links. A category-level publication-list unsubscribe differs from an enterprise-wide unsubscribe."
    ],
    "corrected": true
  },
  {
    "id": 66,
    "section": "security",
    "focus": "high",
    "group": "access",
    "stem": [
      "A Marketing Cloud admin to create custom roles for their business process. What should be taken into consideration to accomplish this?"
    ],
    "choices": [
      "Custom roles can only be edited by the user who created the role initially.",
      "Custom roles are only available within the business in which they were created.",
      "Custom roles are available on their Marketing Cloud account.",
      "Custom roles override an individual user's granular permission assignments."
    ],
    "answer": "C",
    "type": "single",
    "printed": "D",
    "why": "Custom roles can be used in the account’s top-level tenant and business units after creation.",
    "wrong": {
      "A": "A role is not editable only by its original creator.",
      "B": "A custom role is not inherently confined to its creation business unit.",
      "D": "A role does not simply override every individual permission; effective grant/deny rules still apply."
    },
    "notes": [
      "Use a custom role to match job functions, then review effective permissions and business-unit access rather than relying on the role’s name."
    ],
    "source": {
      "stem": [
        "A Marketing Cloud admin to create custom roles for their business process. What should be taken into consideration to accomplish this?"
      ],
      "choices": [
        "Custom roles can only be edited by the user who created the role initially.",
        "Custom roles are only available within the business in which they were created.",
        "Custom roles are available on their Marketing Cloud account.",
        "Custom roles override an individual user's granular permission assignments."
      ],
      "answer": "D"
    },
    "corrected": true
  },
  {
    "id": 67,
    "section": "analytics",
    "focus": "high",
    "group": "analytics",
    "stem": [
      "Northern Trail Outfitters uses Parameter Manager to automatically tag links, They want to include a Campaign Identifier to the links within a specific campaign message. At which level should the utm_campaign value be configured?"
    ],
    "choices": [
      "Subscriber",
      "Link",
      "Email",
      "Account"
    ],
    "answer": "C",
    "type": "single",
    "printed": "C",
    "why": "An email-level utm_campaign value identifies that campaign message consistently across its links.",
    "wrong": {
      "A": "Subscriber-level values identify a person’s attributes rather than a shared campaign identifier.",
      "B": "A link-level value distinguishes individual links when needed.",
      "D": "An account-wide value would reuse one identifier across unrelated messages."
    },
    "notes": [
      "Parameter Manager is the administrative configuration experience for link tagging. Use utm_content or another approved parameter to distinguish placements.",
      "Reference: https://help.salesforce.com/s/articleView?id=000380187&language=en_US&type=1"
    ]
  },
  {
    "id": 68,
    "section": "analytics",
    "focus": "must",
    "group": "analytics",
    "stem": [
      "A Marketing Cloud admin is asked to add a set of four tracking parameters automatically to all the links in an email sent via email studio. Which solution should the admin suggest?"
    ],
    "choices": [
      "AMPscript for Marketing Cloud",
      "Parameter Manager",
      "Google Analytics 360",
      "Marketing Cloud Connect"
    ],
    "answer": "B",
    "type": "single",
    "printed": "B",
    "why": "Parameter Manager configures automatically appended link parameters centrally, including common UTM tags.",
    "wrong": {
      "A": "Hand-written AMPscript is unnecessary for a standard centrally configured tagging requirement.",
      "C": "GA360 consumes tagged traffic but is not the account’s parameter configuration tool.",
      "D": "Marketing Cloud Connect integrates CRM rather than adding generic web tracking tags."
    },
    "notes": [
      "Web Analytics Connector is the broader link-tagging capability; Parameter Manager configures its parameters. Avoid putting sensitive subscriber fields into URLs.",
      "Reference: https://help.salesforce.com/s/articleView?id=000380187&language=en_US&type=1"
    ]
  },
  {
    "id": 69,
    "section": "security",
    "focus": "high",
    "group": "security",
    "stem": [
      "Northern Trail Outfitters (NTO) is concerned about unauthorized API access to their Marketing Cloud account. Which feature would NTO enable to assist in reducing threats from malicious API attacks?"
    ],
    "choices": [
      "IP Allowlist",
      "Field Level Encryption",
      "Advanced Audit Trail",
      "Single Sign on Authentication"
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "why": "An enforced Login IP Allowlist can restrict API access to approved network origins.",
    "wrong": {
      "B": "Field-level encryption protects stored fields rather than API source networks.",
      "C": "Audit Trail provides records for investigation, not this preventative network restriction.",
      "D": "UI SSO does not by itself restrict API traffic to trusted IPs."
    },
    "notes": [
      "Select API or Any as the applicable login source and enable enforcement. This complements OAuth credentials and scopes rather than replacing them.",
      "Reference: https://help.salesforce.com/s/articleView?id=sf.mc_overview_ip_allowlist.htm&language=en_US&type=5"
    ]
  },
  {
    "id": 70,
    "section": "analytics",
    "focus": "familiar",
    "group": "analytics",
    "stem": [
      "A Marketing Cloud admin wants to append an Urchin Tracking Module (UTM) variable String to links in emails. Which functionality would allow this?"
    ],
    "choices": [
      "Parameter Manager",
      "Web and Mobile Analytics",
      "Advertising Studio",
      "Personalization Builder"
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "why": "Parameter Manager configures the UTM parameter strings appended to email links.",
    "wrong": {
      "B": "Web and Mobile Analytics is not the configuration function named in these options.",
      "C": "Advertising Studio manages advertising audiences rather than universal email link tagging.",
      "D": "Personalization Builder is not the centralized parameter configuration tool."
    },
    "notes": [
      "Use consistent campaign naming and encode parameter values correctly. Do not duplicate the same UTM keys manually and through account tagging."
    ]
  },
  {
    "id": 71,
    "section": "analytics",
    "focus": "high",
    "group": "einstein",
    "stem": [
      "NTO wants to enable Einstein Engagement Scoring and populate its dashboard with the predictive scores derived from supported engagement history. Which activation action should the administrator take?"
    ],
    "choices": [
      "Select one of the Predictive Algorithms then click Deploy",
      "Click Deploy and results are available immediately",
      "Select the channels (Emails, Push, SMS) to report on then click Activate",
      "Click Activate and wait for an email notification"
    ],
    "answer": "D",
    "type": "single",
    "printed": "A",
    "why": "Activation starts Einstein Engagement Scoring’s processing; results are not immediate and do not require choosing a predictive algorithm manually.",
    "wrong": {
      "A": "The user does not select and deploy a predictive algorithm for this feature.",
      "B": "Scores require processing after activation.",
      "C": "The proposed Email/Push/SMS selector is not the activation flow described by these options."
    },
    "notes": [
      "D is the best activation-and-wait option; an email notification is not a timing guarantee. Typical initial processing is 24–48 hours, but availability and sufficient historical data affect it.",
      "Reference: https://help.salesforce.com/s/articleView?id=mc_anb_activate_einstein_engagement_scoring.htm&language=en_US&type=5",
      "Engagement Scoring is a predictive scoring dashboard, not a complete one-year event-history report. Use the appropriate report or retained event data for an annual historical analysis."
    ],
    "source": {
      "stem": [
        "Northern Trail Outfitters wants to know how customers are engaging with marketing communications they have sent over the last year. What action should be taken to populate the Einstein Engagement Scoring Dashboard?"
      ],
      "choices": [
        "Select one of the Predictive Algorithms then click Deploy",
        "Click Deploy and results are available immediately",
        "Select the channels (Emails, Push, SMS) to report on then click Activate",
        "Click Activate and wait for an email notification"
      ],
      "answer": "A"
    },
    "corrected": true
  },
  {
    "id": 72,
    "section": "security",
    "focus": "high",
    "group": "access",
    "stem": [
      "Northern Trail Outfitters has Marketing Cloud users who need data extension View and Update permissions for campaigns related to B3C sales, but not any permissions for campaigns related to B2B sales. How should they accomplish this?"
    ],
    "choices": [
      "Create separate folders and add permissions",
      "Create a shared data extension",
      "Update data extension object level permissions",
      "Create a new business unit"
    ],
    "answer": "A",
    "type": "single",
    "printed": "C",
    "why": "Separating the data extensions into appropriately permissioned folders scopes access to B2C versus B2B data without changing every DE capability globally.",
    "wrong": {
      "B": "A shared DE alone does not distinguish which campaign data this user may access.",
      "C": "Object-level DE permissions affect the capability broadly rather than the required folder-specific scope.",
      "D": "A new BU is a larger isolation design; the scoped folder option directly fits this request."
    },
    "notes": [
      "Verify effective permissions with the actual users. Folder location alone is organization, not access control, unless the appropriate permissions are configured.",
      "Reference: https://help.salesforce.com/s/articleView?id=mktg.mc_cab_data_extensions_manage.htm&language=en_US&type=5"
    ],
    "source": {
      "stem": [
        "Northern Trail Outfitters has Marketing Cloud users who need data extension View and Update permissions for campaigns related to B3C sales, out not any permissions for campaigns related to B2B sales. How should they accomplish this?"
      ],
      "choices": [
        "Create separate folders and add permissions",
        "Create a shared data extension",
        "Update data extension object level permissions",
        "Create a new business unit"
      ],
      "answer": "C"
    },
    "corrected": true
  },
  {
    "id": 73,
    "section": "security",
    "focus": "high",
    "group": "access",
    "stem": [
      "NTO assigns a user access only to its North American business units. Which two listed standard Marketing Cloud roles could separately provide broad cross-channel operational access in those assigned units? Choose 2 answers."
    ],
    "choices": [
      "Marketing Cloud Channel Manager",
      "Marketing Cloud Email Marketing Manager",
      "Marketing Cloud Regional or Local Administrator",
      "Marketing Cloud Administrator"
    ],
    "answer": "A,D",
    "type": "multi",
    "printed": "B,C",
    "source": {
      "stem": [
        "Northern Trail Outfitters is setting up new hires on its instance of Marketing Cloud, which includes Email Studio, Mobile Connect, and Social Studio. One of the hires needs to manage the operations of all of the North American Business Units. What two roles, custom or standard, could be assigned to this user to meet the requirement? Choose 2 answers"
      ],
      "choices": [
        "Marketing Cloud Channel Manager",
        "Marketing Cloud Email Marketing Manager",
        "Marketing Cloud Regional or Local Administrator",
        "Marketing Cloud Administrator"
      ],
      "answer": "B,C"
    },
    "why": "Channel Manager provides cross-channel campaign operations; Marketing Cloud Administrator also has broad platform and channel administration in assigned business units.",
    "wrong": {
      "B": "Marketing Cloud Email Marketing Manager is not a standard cross-channel role in this list.",
      "C": "Marketing Cloud Regional or Local Administrator is not a standard role; a custom role would require defined permissions."
    },
    "notes": [
      "These are alternative role options, not a recommendation to assign both. Limit BU membership to the region and add a suitable Email Studio role when that access is needed."
    ],
    "choose": 2,
    "corrected": true
  },
  {
    "id": 74,
    "section": "analytics",
    "focus": "high",
    "group": "analytics",
    "stem": [
      "A marketing analyst needs account-level email KPIs for each business unit: sends, delivery rate, overall and block bounce rates, opens, clicks, complaints, and unsubscribes. Which report summarizes these metrics?"
    ],
    "choices": [
      "Campaign Email Tracking Report",
      "Email Performance Over Time Report",
      "Email Send Report",
      "Account Send Summary Report"
    ],
    "answer": "D",
    "type": "single",
    "printed": "D",
    "source": {
      "stem": [
        "Analyst of The Northern Trail Outfitters (NTO) marketing team needs to pull email metrics for an upcoming quarterly company meeting. These metrics need to be reported per email campaign for each of NTO's Business Units: * Number of Sends * Delivery Rate * Overall Bounce Rate * Block Bounce Rate * Open Rate * Click Rate * Complaint Rate * Unsubscribe Rate Which email report should NTO's Marketing Analyst pull from Marketing Cloud to get this information?"
      ],
      "choices": [
        "Campaign Email Tracking Report",
        "Email Performance Over Time Report",
        "Email Send Report",
        "Account Send Summary Report"
      ],
      "answer": "D"
    },
    "why": "Account Send Summary combines the account/BU-level delivery and engagement KPIs specified in this repaired prompt.",
    "wrong": {
      "A": "Campaign Email Tracking groups by a campaign rather than the requested account/BU summary.",
      "B": "Performance Over Time emphasizes trends rather than this summary KPI set.",
      "C": "Email Send is useful for account/send-volume analysis but is not the specified detailed summary."
    },
    "notes": [
      "The source mixed per-campaign wording with account-summary metrics. The reviewed prompt makes the reporting grain explicit; choose a campaign report when campaign-level detail is the actual requirement."
    ],
    "repaired": true
  },
  {
    "id": 75,
    "section": "data",
    "focus": "high",
    "group": "identity",
    "stem": [
      "A financial services customer states that families often share email addresses across multiple checking, savings, loan, and credit accounts. The customer needs to allow individual accounts to use the same email address in Marketing Cloud but maintain separate subscriber attributes. Which component should be discussed with the customer to allow for this use case?"
    ],
    "choices": [
      "Subscriber Key",
      "Contact ID",
      "Member Record",
      "Data Extensions"
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "why": "Subscriber Key identifies each subscriber independently of Email Address, allowing distinct subscriber attributes for records sharing an address.",
    "wrong": {
      "B": "A CRM Contact ID can be chosen as a key, but it is not the general Engagement capability being asked about.",
      "C": "Member Record is not the subscriber identity feature.",
      "D": "DEs store records, but Subscriber Key supplies the distinct subscriber identity."
    },
    "notes": [
      "Choose the identity grain deliberately: person, account, or household. Shared inboxes can create unexpected preference behavior if keys are not designed consistently."
    ]
  },
  {
    "id": 76,
    "section": "data",
    "focus": "high",
    "group": "segmentation",
    "stem": [
      "A customer team wants to retarget subscribers who click on links of key items promoted across email campaigns. The customer has indicated the following: * Emails will be built using a custom dynamic template for these messages. * Links will vary over time and across campaigns. * Click activity will be cross-referenced with subscribers' regional markets on a master subscriber data extension. * Retargeting messages will dynamically populate content based on regional market. Which skill is needed to join click-tracking records across campaigns to the regional master subscriber data extension and build the retargeting audience?"
    ],
    "choices": [
      "AMPscript",
      "SSJS",
      "SQL",
      "HTML"
    ],
    "answer": "C",
    "type": "single",
    "printed": "A",
    "source": {
      "stem": [
        "A customer team wants to retarget subscribers who click on links of key items promoted across email campaigns. The customer has indicated the following: * Emails will be built using a custom dynamic template for these messages. * Links will vary over time and across campaigns. * Click activity will be cross-referenced with subscribers' regional markets on a master subscriber data extension. * Retargeting messages will dynamically populate content based on regional market. In order for this solution to be viable, which skill set does the customer team need to possess?"
      ],
      "choices": [
        "AMPscript",
        "SSJS",
        "SQL",
        "HTML"
      ],
      "answer": "A"
    },
    "why": "SQL can join click-tracking data to the master subscriber table and write the regional retargeting audience.",
    "wrong": {
      "A": "AMPscript personalizes individual email rendering; it is not the best bulk audience join tool.",
      "B": "SSJS can implement custom processing but is unnecessary for this relational segmentation requirement.",
      "D": "HTML controls presentation rather than joining tracking and customer records."
    },
    "notes": [
      "Use stable subscriber keys and job/link identifiers so changing URLs do not accidentally mix campaigns. Apply the appropriate consent and suppression rules to the output.",
      "Reference: https://help.salesforce.com/s/articleView?id=sf.mc_as_using_the_query_activity.htm&language=en_US&type=5"
    ],
    "corrected": true
  },
  {
    "id": 77,
    "section": "data",
    "focus": "high",
    "group": "relationships",
    "stem": [
      "During discovery, the customer outlines data requirements and the anticipated use of Marketing Cloud with the following criteria: * Customer data will be fully refreshed every night via Import activity from the customer's data warehouse. * Contact records will be augmented by relational data tables via Contact Builder. * The customer data file will contain 5M records with 40+ attributes. * One attribute will house HTML code, 1000 characters max, that will be used to populate Account Access content areas in emails. * A customer ID will be used as the unique identifier for each contact. Which statement differentiates the use of data extensions over lists?"
    ],
    "choices": [
      "Data extensions allow for add/update Import activity.",
      "Data extensions can store HTML code as an attribute.",
      "Data extensions support Customer ID to be used as Subscriber Key.",
      "Data extensions are necessary for Contact Builder"
    ],
    "answer": "D",
    "type": "single",
    "printed": "D",
    "why": "The relational data model used in Contact Builder is built from linked data extensions, which is the differentiating requirement here.",
    "wrong": {
      "A": "Import add/update behavior is not an exclusive reason to choose DEs over lists.",
      "B": "HTML as a stored text value is not the defining distinction.",
      "C": "Subscriber Key is not exclusive to a DE-based audience."
    },
    "notes": [
      "Five million records and relational purchases also favor DEs. Define text lengths and keys carefully rather than treating a large HTML field as unlimited storage."
    ]
  },
  {
    "id": 78,
    "section": "journeys",
    "focus": "high",
    "group": "orchestration",
    "stem": [
      "A publishing company has presented the following: * A need to send renewal reminders to customers whose subscriptions expire in 15 days and 7 days. * A campaign needs to be created and managed by a general marketing user who will not have administrative rights and who is not technical. * The customer's expiration date is included in the data file. What component should the customer's solution include? Choose 3 answers"
    ],
    "choices": [
      "Suppression list",
      "Data Filter",
      "Triggered Send",
      "Template-based emails",
      "Automation Studio"
    ],
    "answer": "B,D,E",
    "type": "multi",
    "printed": "B,D,E",
    "source": {
      "stem": [
        "A publishing company has presented the following: * A need to send renewal reminders to customers whose subscriptions expire in 15 days and 7 days. * A campaign needs to be created and managed by a general marketing user who will not have administrative rights and who is not technical. * The customer's expiration date is included in the data file. What component should the customer's solution include? Choose 3 answers"
      ],
      "choices": [
        "Suppression list",
        "Data Filter",
        "Triggered Send",
        "Template-based emails",
        "Automation StudioTerm"
      ],
      "answer": "B,D,E"
    },
    "why": "Data filters identify the relative expiry-date audiences, template-based emails support nontechnical maintenance, and Automation Studio schedules filtering and sending.",
    "wrong": {
      "A": "A suppression list excludes recipients but does not select the date-based renewal cohorts.",
      "C": "A triggered send is unnecessary for this scheduled relative-date batch design."
    },
    "notes": [
      "Run filters on the required cadence, then send to their refreshed results. Grant only the activities and data access that the marketing operator needs."
    ],
    "choose": 3
  },
  {
    "id": 79,
    "section": "delivery",
    "focus": "must",
    "group": "subscriptions",
    "stem": [
      "A customer is interested in designing a solution to ensure that subscribers only receive categories of emails that they want to receive. The built-in subscription center will be used as part of the solution. Which feature should be utilized to make this happen?"
    ],
    "choices": [
      "Publication Lists",
      "Subscriber Keys",
      "Profile Center",
      "Send Logging"
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "why": "Publication lists represent message categories, allowing a subscriber to opt out of one category without opting out of all communications.",
    "wrong": {
      "B": "Subscriber Key identifies the subscriber rather than the subscription category.",
      "C": "A Profile Center is an interface; publication lists model the category preferences.",
      "D": "Send Logging records send-time data, not preference categories."
    },
    "notes": [
      "Associate each send with the intended publication list. Category-level preferences do not override a broader unsubscribe status."
    ]
  },
  {
    "id": 80,
    "section": "content",
    "focus": "high",
    "group": "content",
    "stem": [
      "As part of their brand guidelines, Northern Trail Outfitters (NTO) uses a custom brand font for all print marketing materials. NTO wants to use their custom brand font in email as well. What is the recommended best practice for font usage in email?"
    ],
    "choices": [
      "Use a web-safe font for text that closely matches the brand's custom font.",
      "Build an email as one image, with all text saved in the brand font.",
      "Edit an email's HTML to list the custom brand font in the style tag's font-family property.",
      "Build an email using multiple images, with all text saved in the brand font."
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "why": "A close web-safe font provides a reliable readable fallback across email clients with inconsistent custom-font support.",
    "wrong": {
      "B": "An image-only email loses accessible/selectable text and can be blank when images are blocked.",
      "C": "Naming a custom font does not guarantee it is available or supported in the recipient’s client.",
      "D": "Splitting text into several images retains the same accessibility and image-blocking problems."
    },
    "notes": [
      "Use live text, a deliberate font stack, contrast, and readable sizing. Test the actual client mix rather than assuming a web-font result in a browser matches email."
    ]
  },
  {
    "id": 81,
    "section": "content",
    "focus": "high",
    "group": "content",
    "stem": [
      "A customer is building an eCommerce experience and will use CloudPages forms to capture customer input into data extensions, then relate that input to purchase records for journeys. Which two features support the form capture and relational contact-model requirements? Choose 2 answers."
    ],
    "choices": [
      "Data Designer",
      "Cloud Pages",
      "Web Analytics Connector",
      "Content Builder"
    ],
    "answer": "A,B",
    "type": "multi",
    "printed": "B",
    "source": {
      "stem": [
        "A customer is developing a new eCommerce section of their website and plans to leverage transactional data in customer journeys. Which two Marketing Cloud features will support this effort? Choose 2 answers"
      ],
      "choices": [
        "Data Designer",
        "Cloud Pages",
        "Web Analytics Connector",
        "Content Builder"
      ],
      "answer": "B"
    },
    "why": "Data Designer links the captured input to the contact model, while CloudPages provides the hosted form experience specified in the repaired scenario.",
    "wrong": {
      "C": "Web Analytics Connector adds analytics tags rather than creating the contact data relationships or form.",
      "D": "Content Builder manages content but is not the named hosted-page and relational-model pair."
    },
    "notes": [
      "The original Choose 2 prompt supplied only B and did not explain the website capture requirement. The supplied requirement makes the two responsibilities explicit."
    ],
    "choose": 2,
    "corrected": true
  },
  {
    "id": 82,
    "section": "data",
    "focus": "high",
    "group": "relationships",
    "stem": [
      "A demographic data extension contains exactly one row per contact, keyed by the same stable customer identifier as Contact Key. Which Contact Builder relationship should connect it to Contacts?"
    ],
    "choices": [
      "One -to -Many Relationship",
      "Many -to -Many Relationship",
      "One -to -One Relationship",
      "Many -to -One Relationship"
    ],
    "answer": "C",
    "type": "single",
    "printed": "A",
    "source": {
      "stem": [
        "A customer needs to link demographic information to its contact model in Contact Builder. What type of relationship should be used?"
      ],
      "choices": [
        "One -to -Many Relationship",
        "Many -to -Many Relationship",
        "One -to -One Relationship",
        "Many -to -One Relationship"
      ],
      "answer": "A"
    },
    "why": "One demographic row per contact establishes a one-to-one relationship between Contacts and that demographic table.",
    "wrong": {
      "A": "One-to-many is for several demographic/history rows per contact, which this prompt excludes.",
      "B": "Many-to-many would require a different model with multiple matching records on both sides.",
      "D": "Many-to-one reverses the stated one-row-per-contact mapping."
    },
    "notes": [
      "Cardinality follows the actual uniqueness of the join fields; the word demographic by itself does not prove a 1:1 relationship."
    ],
    "corrected": true
  },
  {
    "id": 83,
    "section": "analytics",
    "focus": "high",
    "group": "analytics",
    "stem": [
      "Which two statements are correct about Send Logging? Choose 2 answers"
    ],
    "choices": [
      "Send Log data extensions are archived automatically based on retention settings.",
      "AMPscript can be used to pull data from Send Logs for use within emails.",
      "SQL Query Activities can reference Send Logs in combination with system data views.",
      "A business unit can support up to three Send Logs."
    ],
    "answer": "B,C",
    "type": "multi",
    "printed": "B,C",
    "why": "A Send Log is a DE that AMPscript can look up and SQL can join to system tracking views using suitable identifiers.",
    "wrong": {
      "A": "Retention deletes data; it does not automatically archive Send Log rows.",
      "D": "The stated three-Send-Log allowance is not the general rule for this setup."
    },
    "notes": [
      "Avoid expensive send-time lookups and retaining unnecessary personal data. Distinguish send-time attribute logging from event history in system views."
    ],
    "choose": 2
  },
  {
    "id": 84,
    "section": "delivery",
    "focus": "high",
    "group": "reputation",
    "stem": [
      "A large retail company has selected Marketing Cloud and has asked to be fully migrated from their existing platform in three weeks. They have communicated the following: They currently have 3 million customers. They email customers twice a week with no known deliverability issues. Their contract includes one Sender Authentication Package (SAP). Which two responses articulate proper IP warming? Choose 2 answers"
    ],
    "choices": [
      "Plan for an IP ramp-up lasting several weeks (often around four to six), adjusting volume to deliverability and engagement.",
      "IP ramp -up can be accelerated by migrating to pre -warmed IP addresses.",
      "IP ramp -up can be bypassed, given their historical lack of deliverability issues.",
      "IP ramp -up is important to establish a positive sender reputation."
    ],
    "answer": "A,D",
    "type": "multi",
    "printed": "A,D",
    "source": {
      "stem": [
        "A large retail company has selected Marketing Cloud and has asked to be fully migrated from their existing platform in three weeks. They have communicated the following: They currently have 3 million customers. They email customers twice a week with no known deliverability issues. Their contract includes one Sender Authentication Package (SAP). Which two responses articulate proper IP warming? Choose 2 answers"
      ],
      "choices": [
        "IP ramp -up takes four to six weeks to be able to fully send to all 3 million customers.",
        "IP ramp -up can be accelerated by migrating to pre -warmed IP addresses.",
        "IP ramp -up can be bypassed, given their historical lack of deliverability issues.",
        "IP ramp -up is important to establish a positive sender reputation."
      ],
      "answer": "A,D"
    },
    "why": "A new dedicated IP needs a gradual volume ramp to establish positive sending reputation; a multi-million-recipient migration should allow several weeks and respond to actual results.",
    "wrong": {
      "B": "Buying a supposedly pre-warmed IP is not a substitute for establishing this sender’s reputation.",
      "C": "The old platform’s history does not remove the new IP’s warming requirement."
    },
    "notes": [
      "Four to six weeks is a planning example, not a guaranteed completion date. Coordinate volume by provider and prioritize recent engagement."
    ],
    "choose": 2,
    "repaired": true
  },
  {
    "id": 85,
    "section": "data",
    "focus": "high",
    "group": "segmentation",
    "stem": [
      "Northern Trail Outfitters (NTO) wants to implement a drip campaign to its highest -value outdoor sports customers. NTO is including a deep product discount and wants to limit the audience to not only its best customers, but also those customers most likely to respond. Which three criteria should the customer use to create an audience for this campaign? Choose 3 answers"
    ],
    "choices": [
      "Proximity to Store",
      "Ages in Household",
      "Lifetime Purchase Value",
      "Conversion Rate",
      "Last Purchase Date"
    ],
    "answer": "C,D,E",
    "type": "multi",
    "printed": "C,D,E",
    "why": "Lifetime value identifies valuable customers, conversion rate indicates response propensity, and last purchase date provides recency.",
    "wrong": {
      "A": "Store proximity is not a stated requirement for this online offer.",
      "B": "Household ages are not the most direct evidence of customer value or purchase response."
    },
    "notes": [
      "This is a heuristic audience design, not a promise of response. Use available measures consistently and validate campaign results against an appropriate comparison group."
    ],
    "choose": 3
  },
  {
    "id": 86,
    "section": "journeys",
    "focus": "high",
    "group": "orchestration",
    "stem": [
      "A customer wants to automate a series of three emails as part of a Membership Renewal drip campaign. Email #1 will be sent one month prior to the member's renewal date. Email #2 will be sent one week prior to the member's renewal date. Email #3 will be sent on the member's renewal date. A master audience is updated in real time via the API. Which steps should be included in the customer's automation?"
    ],
    "choices": [
      "Import File Activity > three Send Activities to the master data extension.",
      "Three Send Activities to the master data extension.",
      "Import File Activity > three Filter Activities > three Send Activities to the filtered audiences.",
      "Three Filter Activities > three Send Activities to the filtered audiences."
    ],
    "answer": "D",
    "type": "single",
    "printed": "D",
    "why": "The API already refreshes the master audience. Three filters create the three renewal-date cohorts, followed by three matching send activities.",
    "wrong": {
      "A": "Reimporting data is unnecessary and sending to the full master audience ignores renewal timing.",
      "B": "Sending three messages to the entire master audience does not select the right renewal cohorts.",
      "C": "The filtering is appropriate, but the extra import duplicates the existing API update path."
    },
    "notes": [
      "Refresh date-based filtered audiences before each send. Add controls to prevent duplicate reminders if an automation reruns."
    ]
  },
  {
    "id": 87,
    "section": "integrations",
    "focus": "high",
    "group": "connect",
    "stem": [
      "What functionality is contained in Journey Builder that does not exist in Automation Studio?"
    ],
    "choices": [
      "Native execution of a Server-side JavaScript activity.",
      "The option to convert a qualified Lead to a Contact.",
      "Flexibility to wait based on duration or a specific time.",
      "The ability to send an email to a Salesforce audience."
    ],
    "answer": "B",
    "type": "single",
    "printed": "B",
    "why": "Journey Builder has Salesforce activities that can convert a qualified Lead within a connected CRM process.",
    "wrong": {
      "A": "Automation Studio has a native Script activity for SSJS.",
      "C": "Waiting is not exclusive to Journey Builder; Automation Studio also has timing/wait capabilities.",
      "D": "Salesforce audience sends are not the unique Lead-conversion capability being tested."
    },
    "notes": [
      "CRM activities require Marketing Cloud Connect, valid record identifiers, appropriate user permissions, and a journey design suited to the CRM operation."
    ]
  },
  {
    "id": 88,
    "section": "content",
    "focus": "high",
    "group": "content",
    "stem": [
      "For an HTML email sent as Multipart MIME, which two statements describe possible sources of the accompanying plain-text version? Choose 2 answers."
    ],
    "choices": [
      "Open and click activity are tracked in either version.",
      "The email will avoid detection by various SPAM filters.",
      "An auto-generated text version will be sent with your HTML email.",
      "A custom text version will be sent with your HTML email."
    ],
    "answer": "C,D",
    "type": "multi",
    "printed": "A,C",
    "source": {
      "stem": [
        "What are two possible outcomes when 'Send as Multipart MIME' is selected during the send process? Choose 2 answers"
      ],
      "choices": [
        "Open and click activity are tracked in either version.",
        "The email will avoid detection by various SPAM filters.",
        "An auto-generated text version will be sent with your HTML email.",
        "A custom text version will be sent with your HTML email."
      ],
      "answer": "A,C"
    },
    "why": "Multipart MIME carries an HTML part and a text part. The text part can be system-generated or a version the marketer has customized.",
    "wrong": {
      "A": "Plain-text email cannot carry the HTML tracking pixel, so open tracking does not work in both versions.",
      "B": "Multipart MIME does not guarantee spam-filter avoidance."
    },
    "notes": [
      "C and D are alternative ways to prepare the text version, not two separate text copies sent together. Preview both versions; text links can be tracked when appropriately wrapped.",
      "Reference: https://help.salesforce.com/s/articleView?id=mktg.mc_es_send_to_list_enhanced.htm&language=en_US&type=5"
    ],
    "choose": 2,
    "corrected": true
  },
  {
    "id": 89,
    "section": "automation",
    "focus": "must",
    "group": "imports",
    "stem": [
      "A Consultant has a data extension that contains all current product information. The customer wants to refresh data each morning by importing a CSV containing today's product catalog. The product catalog is never the same; products can be added and removed. Which import type should be used?"
    ],
    "choices": [
      "Overwrite",
      "Add Only",
      "Add/Update",
      "Update Only"
    ],
    "answer": "A",
    "type": "single",
    "printed": "C",
    "why": "Overwrite replaces the target with today’s complete catalog, so products absent from the new file do not remain from yesterday.",
    "wrong": {
      "B": "Add Only leaves stale products and does not update existing rows.",
      "C": "Add/Update retains products missing from the new snapshot.",
      "D": "Update Only neither inserts new products nor removes missing ones."
    },
    "notes": [
      "Use Overwrite only when the file is a trusted complete snapshot. Validate availability and contents before replacing production data."
    ],
    "source": {
      "stem": [
        "A Consultant has a data extension that contains all current product information. The customer wants to refresh data each morning by importing a CSV containing today's product catalog. The product catalog is never the same; products can be added and removed. Which import type should be used?"
      ],
      "choices": [
        "Overwrite",
        "Add Only",
        "Add/Update",
        "Update Only"
      ],
      "answer": "C"
    },
    "corrected": true
  },
  {
    "id": 90,
    "section": "journeys",
    "focus": "must",
    "group": "orchestration",
    "stem": [
      "Northern Trail Outfitters needs to reduce the amount of work when managing messages to customers, but cannot add any more personnel due to budget constraints. There has been an increased number of customer purchases on their website, and the team currently sends batch order confirmations. What solution will decrease manual workloads on the team and will improve their customers experience?"
    ],
    "choices": [
      "A file drop automation to send emails to customers who have made a purchase.",
      "A user -initiated message to send an email to customers who made a purchase daily.",
      "A scheduled automation to send emails to customers who made a purchase daily.",
      "A triggered message to send an email as soon as a customer completes a purchase."
    ],
    "answer": "D",
    "type": "single",
    "printed": "D",
    "why": "An event-triggered order confirmation sends when the purchase completes, reducing batch work and giving the customer timely confirmation.",
    "wrong": {
      "A": "A file-drop batch adds file latency compared with the immediate transaction event.",
      "B": "A user-initiated daily send still requires manual work and delays confirmation.",
      "C": "A daily schedule still delays a transactional confirmation."
    },
    "notes": [
      "Use an idempotent order/event identifier and monitor failures so retries do not generate duplicate confirmations."
    ]
  },
  {
    "id": 91,
    "section": "delivery",
    "focus": "familiar",
    "group": "subscriptions",
    "stem": [
      "How are publication lists used in the Marketing Cloud?"
    ],
    "choices": [
      "To send communication to all subscribers, regardless of opt -in status.",
      "To manage subscribers in guided and triggered email sends.",
      "To build dynamic content rules by subscriber type.",
      "To allow subscribers to opt-down/out instead of unsubscribing from all."
    ],
    "answer": "D",
    "type": "single",
    "printed": "D",
    "why": "Publication lists support opting down to selected communication categories rather than forcing an all-or-nothing unsubscribe.",
    "wrong": {
      "A": "Publication lists do not authorize sending regardless of consent.",
      "B": "They are not the complete audience management mechanism for every guided or triggered send.",
      "C": "They store category subscription state rather than defining dynamic-content rules."
    },
    "notes": [
      "Retain a usable broad unsubscribe path alongside granular preferences and apply the intended publication list to each relevant send."
    ]
  },
  {
    "id": 92,
    "section": "data",
    "focus": "high",
    "group": "segmentation",
    "stem": [
      "A customer frequently holds seminars and other events to interface with their customers. They plan to do the following: - Use SmartCapture forms to write data into event registration data extensions. - Cross-reference the records in each registration data extension with corresponding invitation email sends. - Send a follow-up email to customers who click on the registration link in the invitation email, but do not complete registration. Which skill is needed to build an efficient solution?"
    ],
    "choices": [
      "AMPscript",
      "SQL",
      "HTML",
      "CSS"
    ],
    "answer": "B",
    "type": "single",
    "printed": "A",
    "why": "SQL can find invitation-link clickers and exclude matching registration rows, producing the unregistered follow-up audience.",
    "wrong": {
      "A": "AMPscript renders personalized content but is not the best bulk cross-table audience tool.",
      "C": "HTML formats the form or message rather than performing this audience exclusion.",
      "D": "CSS styles presentation rather than joining tracking and registration records."
    },
    "notes": [
      "Use a stable event/contact combination, not just email address, and handle duplicate click events. A LEFT JOIN with a missing-registration test or NOT EXISTS expresses the exclusion.",
      "Reference: https://help.salesforce.com/s/articleView?id=sf.mc_as_using_the_query_activity.htm&language=en_US&type=5"
    ],
    "source": {
      "stem": [
        "A customer frequently holds seminars and other events to interface with their customers. They plan to do the following: - Use SmartCapture forms to write data into event registration data extensions. - Cross-reference the records in each registration data extension with corresponding invitation email sends. - Send a follow-up email to customers who click on the registration link in the invitation email, but do not complete registration. Which skill is needed to build an efficient solution?"
      ],
      "choices": [
        "AMPscript",
        "SQL",
        "HTML",
        "CSS"
      ],
      "answer": "A"
    },
    "corrected": true
  },
  {
    "id": 93,
    "section": "content",
    "focus": "high",
    "group": "content",
    "stem": [
      "The Northern Trail Outfitters (NTO) marketing team is launching a new email campaign. NTO's Email Specialist wants to perform quality assurance checks on the email prior to send and has asked about using the Validate functionality for this effort. Which three items will Validate check in an email message? Choose 3 answers"
    ],
    "choices": [
      "Each content area specified in a dynamic content rule exists.",
      "Words or phrases used may trigger spam filters.",
      "Grammar and spelling in the email text is correct.",
      "Correct syntax is used on any AMPScript in the email's code.",
      "Personalization strings map to attributes or data extension fields"
    ],
    "answer": "A,D,E",
    "type": "multi",
    "printed": "A,D,E",
    "why": "Validate checks technical references and syntax, including dynamic-content references, AMPscript syntax, and personalization fields.",
    "wrong": {
      "B": "Content that might trigger spam filters is not a guaranteed Validate syntax/reference check.",
      "C": "Grammar and spelling are not the technical validation covered by this feature."
    },
    "notes": [
      "Validation does not prove every subscriber path renders correctly. Preview and test with representative records, missing values, and fallback content."
    ],
    "choose": 3
  },
  {
    "id": 94,
    "section": "integrations",
    "focus": "high",
    "group": "connect",
    "stem": [
      "A customer wants individually integrated Sales Cloud users to initiate Marketing Cloud email sends and access Marketing Cloud email creation through deep links. Which two configuration recommendations support this? Choose 2 answers."
    ],
    "choices": [
      "Each user should have a one-to-one relationship between the Marketing Cloud user and the Sales Cloud user.",
      "The consultant should enable deep linking in Marketing Cloud Connect configuration.",
      "The consultant should enable the Create Email feature on the user Profile in the Sales Cloud.",
      "Each Sales Cloud user should have a System Administrator Profile and a Role at the top of the Role Hierarchy."
    ],
    "answer": "A,B",
    "type": "multi",
    "printed": "A,B",
    "source": {
      "stem": [
        "A customer wants Sales Cloud users to create and send Marketing Cloud emails. Which two recommendations should the consultant make? Choose 2 answers"
      ],
      "choices": [
        "Each user should have a one-to-one relationship between the Marketing Cloud user and the Sales Cloud user.",
        "The consultant should enable deep linking in Marketing Cloud Connect configuration.",
        "The consultant should enable the Create Email feature on the user Profile in the Sales Cloud.",
        "Each Sales Cloud user should have a System Administrator Profile and a Role at the top of the Role Hierarchy."
      ],
      "answer": "A,B"
    },
    "why": "Individually mapped users and deep linking support the requested connected send workflow and access to Engagement email creation.",
    "wrong": {
      "C": "There is no general Create Email Salesforce-profile toggle replacing the required integration setup.",
      "D": "System Administrator and top-of-hierarchy placement are excessive and not required for every sender."
    },
    "notes": [
      "Grant the documented Connect permissions and Email Studio capabilities to each user. Deep linking is a navigation/integration setting rather than a substitute for authorization."
    ],
    "choose": 2,
    "repaired": true
  },
  {
    "id": 95,
    "section": "automation",
    "focus": "high",
    "group": "files",
    "stem": [
      "A customer will provide a single daily file on the Marketing Cloud SFTP at 3 AM and needs an alert if the file is not present on time. The file needs to be: Imported into a staging data extension. Separated into two different data extensions. Which workflow should meet these requirements? The file is unencrypted in the Enhanced SFTP Import folder, and runtime-error email notifications will be enabled. No decryption or file movement is required."
    ],
    "choices": [
      "Scheduled Automation: File Transfer Activity > Import File Activity > SQL Query Activity 1 > SQL Query Activity 2",
      "Scheduled Automation: Import File Activity > SQL Query Activity 1 > SQL Query Activity 2",
      "File Drop Automation: Import File Activity > SQL Query Activity 1 > SQL Query Activity 2",
      "File Drop Automation: File Transfer Activity > Import File Activity > Filter Activity > SQL Query Activity 1"
    ],
    "answer": "B",
    "type": "single",
    "printed": "B",
    "source": {
      "stem": [
        "A customer will provide a single daily file on the Marketing Cloud SFTP at 3 AM and needs an alert if the file is not present on time. The file needs to be: Imported into a staging data extension. Separated into two different data extensions. Which workflow should meet these requirements?"
      ],
      "choices": [
        "Scheduled Automation: File Transfer Activity > Import File Activity > SQL Query Activity 1 > SQL Query Activity 2",
        "Scheduled Automation: Import File Activity > SQL Query Activity 1 > SQL Query Activity 2",
        "File Drop Automation: Import File Activity > SQL Query Activity 1 > SQL Query Activity 2",
        "File Drop Automation: File Transfer Activity > Import File Activity > Filter Activity > SQL Query Activity 1"
      ],
      "answer": "B"
    },
    "why": "A scheduled import can fail and alert when the expected 3 AM file is missing; subsequent SQL activities split the staging data into the two targets.",
    "wrong": {
      "A": "No transfer or decryption is needed for the stated import-folder plaintext file.",
      "C": "A file-drop automation does not start when no file arrives, so it cannot detect absence at the deadline by itself.",
      "D": "This file-drop design has the same missing-file detection problem and adds an unnecessary transfer."
    },
    "notes": [
      "Enable runtime-error notifications explicitly. Configure filename and valid-file-age checks so yesterday’s file is not mistaken for today’s arrival."
    ],
    "repaired": true
  },
  {
    "id": 96,
    "section": "data",
    "focus": "high",
    "group": "relationships",
    "stem": [
      "A university plans to use Journey Builder to improve their 1:1 marketing to potential students, current students, and alumni. The university currently has student data in the Sales Cloud. Other data, such as course catalog, student demographics, and alumni information, is stored in external systems. Which two actions should the implementation Consultant recommend? Choose 2 answers."
    ],
    "choices": [
      "Use Data Designer to link student and alumni data to the contact record.",
      "Create an Import Activity to import alumni data into Salesforce Report.",
      "Create list attributes to store student data from the Sales Cloud.",
      "Use Synchronized Data Sources to data from the Sales Cloud."
    ],
    "answer": "A,D",
    "type": "multi",
    "printed": "A,D",
    "why": "Data Designer relates external student/alumni data to contacts, while Synchronized Data Sources brings the CRM student records into Engagement.",
    "wrong": {
      "B": "An Engagement Import activity does not import external alumni records into a Salesforce report.",
      "C": "Flat list attributes do not provide the required relational CRM and external-data model."
    },
    "notes": [
      "Use consistent student/contact identifiers across systems and model one-to-many course or enrollment records explicitly."
    ],
    "choose": 2
  },
  {
    "id": 97,
    "section": "data",
    "focus": "high",
    "group": "relationships",
    "stem": [
      "Northern Trail Outfitters wants to set up a welcome journey that leverages customer data across three data extensions: Customers, Orders, and Products. What is the best way to facilitate this within Contact Builder? In this simplified model, each order contains exactly one product and Orders includes its ProductID; real multi-product orders require an order-line table."
    ],
    "choices": [
      "Create three distinct Attribute Groups that link Customers to Contacts, Orders to Customers, and Products to Orders.",
      "Create a single Attribute Group that links Contacts to Customers, Orders to Products, and Products to Customers.",
      "Create three distinct Attribute Groups that link each data extension directly to Contacts.",
      "Create a single Attribute Group that links Customers to Contacts, Orders to Customers, and Products to Orders."
    ],
    "answer": "D",
    "type": "single",
    "printed": "D",
    "why": "A single attribute group can express the connected Customers–Orders–Products model and relate Customers to Contacts.",
    "wrong": {
      "A": "Splitting this one connected model across three groups is unnecessary.",
      "B": "This ordering skips the stated customer-to-order relationship.",
      "C": "Linking every table directly to Contacts loses the natural order/product relationships."
    },
    "notes": [
      "Validate actual cardinalities and keys. A realistic multi-product order normally needs an Order Details junction table; the simplified mock omits that table."
    ],
    "source": {
      "stem": [
        "Northern Trail Outfitters wants to set up a welcome journey that leverages customer data across three data extensions: Customers, Orders, and Products. What is the best way to facilitate this within Contact Builder?"
      ],
      "choices": [
        "Create three distinct Attribute Groups that link Customers to Contacts, Orders to Customers, and Products to Orders.",
        "Create a single Attribute Group that links Contacts to Customers, Orders to Products, and Products to Customers.",
        "Create three distinct Attribute Groups that link each data extension directly to Contacts.",
        "Create a single Attribute Group that links Customers to Contacts, Orders to Customers, and Products to Orders."
      ],
      "answer": "D"
    },
    "repaired": true
  },
  {
    "id": 98,
    "section": "data",
    "focus": "high",
    "group": "relationships",
    "stem": [
      "A customer has an eCommerce site and imports data into three data extensions daily: Orders, Order_Details, and 'Products. The data extensions contain the following information: - Orders: OrderId, CustomerID, OrderNumber, OrderDate, OrderTotal, GrandTotal - Order_Details: ProductId, OrderID, Qty, UnitPrice, ExtendedPrice, Discount - Products: ProductId, SKU, Name, Description, Cost, Price Which two actions should be taken in Data Designer? Choose 2 answers"
    ],
    "choices": [
      "Create a one-to-one relationship between the contact record and Order Details.",
      "Create a one -to -many relationship between Orders and Order_Details.",
      "Create a one-to-one relationship between Orders and Order_Details.",
      "Create a many-to-one relationship from Order_Details to Products (many order lines can reference one product)."
    ],
    "answer": "B,D",
    "type": "multi",
    "printed": "B,D",
    "source": {
      "stem": [
        "A customer has an eCommerce site and imports data into three data extensions daily: Orders, Order_Details, and 'Products. The data extensions contain the following information: - Orders: OrderId, CustomerID, OrderNumber, OrderDate, OrderTotal, GrandTotal - Order_Details: ProductId, OrderID, Qty, UnitPrice, ExtendedPrice, Discount - Products: ProductId, SKU, Name, Description, Cost, Price Which two actions should be taken in Data Designer? Choose 2 answers"
      ],
      "choices": [
        "Create a one-to-one relationship between the contact record and Order Details.",
        "Create a one -to -many relationship between Orders and Order_Details.",
        "Create a one-to-one relationship between Orders and Order_Details.",
        "Create a one-to-one relationship between Order_Details and Products."
      ],
      "answer": "B,D"
    },
    "why": "One order has many order-detail rows, while many order-detail rows can reference one product. The repaired D expresses the latter many-to-one direction.",
    "wrong": {
      "A": "A contact can have many order lines across orders, not exactly one.",
      "C": "An order can contain multiple order lines, so Orders to Order_Details is not one-to-one."
    },
    "notes": [
      "The document has no separate Answer field here; B,D comes from appended commentary. D was technically false as written and was repaired without changing its answer letter. Relate each join on the actual OrderID or ProductID."
    ],
    "choose": 2,
    "repaired": true
  },
  {
    "id": 99,
    "section": "journeys",
    "focus": "high",
    "group": "orchestration",
    "stem": [
      "Northern Trail Outfitters (NTO) experienced a 24-hour website outage beginning on a peak shopping day. As a result, a number of logged-in customers' shopping sessions were disrupted. When the site is back online, the retailer would like to encourage those shoppers to return to the site and continue their shopping. What action should NTO take?"
    ],
    "choices": [
      "Import a file of logged-in customers into NTO's existing Abandoned Cart journey in Journey Builder.",
      "Create a user-initiated message to logged-in customers to send once the website is restored.",
      "Do not send an email, as outage may have increased negative sentiment, resulting in unsubscribes.",
      "Create and send an apology email that includes a discount for a future purchase to all customers"
    ],
    "answer": "B",
    "type": "single",
    "printed": "B",
    "why": "A one-time user-initiated send can target the logged-in customers affected by the outage as soon as service is restored.",
    "wrong": {
      "A": "Adding contacts to an existing cart journey can trigger unrelated or duplicate cart messaging.",
      "C": "Silence is not inherently the best customer-service response to a resolved outage.",
      "D": "Sending a discount to all customers ignores the requirement to target affected shoppers."
    },
    "notes": [
      "Confirm service recovery before sending, target the affected cohort, and use a helpful recovery message consistent with their communication permissions."
    ]
  },
  {
    "id": 100,
    "section": "content",
    "focus": "high",
    "group": "content",
    "stem": [
      "A restaurant supply company captures email subscribers and leads through trade shows. They hold a giveaway at each trade show to entice booth visitors to leave their contact information. In the past, they have used a fishbowl to capture business cards, but need to update this to an online sweepstakes entry vehicle displayed on a mounted tablet. Individuals should only be allowed to enter once, and the winner will be selected randomly. All entrants receive a follow-up email after the trade show asking them to confirm their opt-in for a monthly newsletter. Which two components are appropriate for this solution? Choose 2 answers"
    ],
    "choices": [
      "Microsite with Web Collect to store entrants on a data extension.",
      "Microsite with Smart Capture to store entrants on a data extension.",
      "Send Email Activity with a link to a subscription center.",
      "A data extension with a stable unique entrant key and a custom confirmation-status field, used by a double opt-in workflow."
    ],
    "answer": "B,D",
    "type": "multi",
    "printed": "B,D",
    "source": {
      "stem": [
        "A restaurant supply company captures email subscribers and leads through trade shows. They hold a giveaway at each trade show to entice booth visitors to leave their contact information. In the past, they have used a fishbowl to capture business cards, but need to update this to an online sweepstakes entry vehicle displayed on a mounted tablet. Individuals should only be allowed to enter once, and the winner will be selected randomly. All entrants receive a follow-up email after the trade show asking them to confirm their opt-in for a monthly newsletter. Which two components are appropriate for this solution? Choose 2 answers"
      ],
      "choices": [
        "Microsite with Web Collect to store entrants on a data extension.",
        "Microsite with Smart Capture to store entrants on a data extension.",
        "Send Email Activity with a link to a subscription center.",
        "Data Extension with double opt-in status defined."
      ],
      "answer": "B,D"
    },
    "why": "Smart Capture collects entries into a DE; a unique entrant key and an explicit confirmation workflow track and enforce newsletter double opt-in.",
    "wrong": {
      "A": "Web Collect is not the DE Smart Capture form workflow specified here.",
      "C": "A subscription-center link alone does not implement the requested unique-entry and confirmation-state model."
    },
    "notes": [
      "A status field alone does not send or validate confirmation. Build the confirmation-token/update process and exclude unconfirmed entrants from the newsletter audience.",
      "A primary key alone may cause a repeated form submission to update an existing row rather than prevent another attempt. Implement and test an appropriate duplicate-entry check and server-side validation; the schema and confirmation-status field are only components of that workflow."
    ],
    "choose": 2,
    "repaired": true
  },
  {
    "id": 101,
    "section": "data",
    "focus": "high",
    "group": "relationships",
    "stem": [
      "For this scenario, the Contact Data model exposes exactly one current event-registration row per contact; separate history is not used in this split.",
      "An entertainment company is hosting events across the country in different venues. They want to use Contact Builder to feed Journey Builder. Contact who enter a journey will go through a decision split based on the current registered event type from Contact Data. The journey will send a series of emails and one of them will contain the venue details dynamically populated with AMP script. The Company collects the following information: - Customer data (email address, first name, last name...). - Event registration (email address, event ID, event name, event type, venue ID...). - Venue details (venue ID, venue name, venue address...). - Payment details (email address, event ID, total paid...). The Company does not want to link everything in Contact Builder. Which are the two data sources that must be incorporated inside Contact Builder? Choose 2 answers."
    ],
    "choices": [
      "Customer Data",
      "Event Registration",
      "Venue Details",
      "Payment Details"
    ],
    "answer": "A,B",
    "type": "multi",
    "printed": "A,C",
    "source": {
      "stem": [
        "An entertainment company is hosting events across the country in different venues. They want to use Contact Builder to feed Journey Builder. Contact who enter a journey will go through a decision split based on the type of event. The journey will send a series of emails and one of them will contain the venue details dynamically populated with AMP script. The Company collects the following information: - Customer data (email address, first name, last name...). - Event registration (email address, event ID, event name, event type, venue ID...). - Venue details (venue ID, venue name, venue address...). - Payment details (email address, event ID, total paid...). The Company does not want to link everything in Contact Builder. Which are the two data sources that must be incorporated inside Contact Builder? Choose 2 answers."
      ],
      "choices": [
        "Customer Data",
        "Event Registration",
        "Venue Details",
        "Payment Details"
      ],
      "answer": "A,C"
    },
    "why": "Customer identity and current event registration/type must be related to Contacts for the stated Contact Data Decision Split. Venue fields can be retrieved separately with AMPscript.",
    "wrong": {
      "C": "Venue data used only for send-time AMPscript lookup need not be part of the split’s contact model.",
      "D": "Payment details are not required for the described split or venue content."
    },
    "notes": [
      "Journey Data could support another design. The repaired prompt explicitly chooses current Contact Data so the minimum required tables are clear."
    ],
    "choose": 2,
    "corrected": true
  },
  {
    "id": 102,
    "section": "delivery",
    "focus": "must",
    "group": "branding",
    "stem": [
      "Northern Trail Outfitters (NTO) has a requirement to create a distinction between marketing and transactional emails in terms of From Name and IP Address for reputation purposes. Which two actions should NTO take in order to create Send Classifications? Choose 2 answers"
    ],
    "choices": [
      "Define a Sender Profile.",
      "Define a Subscriber -specific From Name.",
      "Define custom Reply Mail Management.",
      "Define a Delivery Profile."
    ],
    "answer": "A,D",
    "type": "multi",
    "printed": "A,D",
    "why": "Sender Profile defines From identity; Delivery Profile defines delivery settings such as IP. Send Classification combines these with the send’s commercial/transactional classification.",
    "wrong": {
      "B": "A subscriber-specific From Name is optional personalization, not the required profile component.",
      "C": "Custom RMM is not required merely to define the classification."
    },
    "notes": [
      "A transactional label does not make promotional content transactional. Review the real message purpose and the intended preference behavior."
    ],
    "choose": 2
  },
  {
    "id": 103,
    "section": "content",
    "focus": "high",
    "group": "content",
    "stem": [
      "A customer with limited technical resources has requested assistance in setting up a small email deployment that the customer will maintain long term. The email will display men's shoes to males in the audience and women's shoes to females in the audience. The sendable data extension contains a field with a value of Male or Female. Which method should a consultant recommended to ensure content is displayed properly within the email."
    ],
    "choices": [
      "AMPscript conditional against the Gender field",
      "AMPscriptlookupRows functions",
      "A/B Test content type",
      "Dynamic Content Wizard"
    ],
    "answer": "D",
    "type": "single",
    "printed": "D",
    "why": "The Dynamic Content Wizard lets a nontechnical marketer choose content based on the existing Gender field without writing AMPscript.",
    "wrong": {
      "A": "AMPscript conditions can work, but add coding maintenance for this simple rule.",
      "B": "A lookup is unnecessary when the value is already in the send context.",
      "C": "An A/B test compares variants instead of selecting the correct variant per recipient attribute."
    },
    "notes": [
      "Configure default content for empty or unexpected values and preview sample recipients. A real campaign need not use binary gender assumptions."
    ]
  },
  {
    "id": 104,
    "section": "data",
    "focus": "high",
    "group": "segmentation",
    "stem": [
      "Northern Trail Outfitters (NTO) has decided to use Journey Builder to launch event-driven lifecycle marketing programs. This includes personalized interactions with customers with the goal of increasing purchase frequency. Which two pieces of information would help NTO achieve this objective? Choose 2 answers"
    ],
    "choices": [
      "Products purchased from a competitor.",
      "Number of items per order.",
      "Channel preference of customers.",
      "Last purchase date"
    ],
    "answer": "C,D",
    "type": "multi",
    "printed": "C,D",
    "why": "Channel preference supports relevant delivery choices, and last purchase date supports lifecycle timing for the next interaction.",
    "wrong": {
      "A": "Competitor-purchase data is not a stated available or necessary signal for this lifecycle program.",
      "B": "Items per order measures basket size rather than directly addressing channel choice and purchase recency."
    },
    "notes": [
      "These are the best fits among the listed options, not a claim that basket-size data is never useful. Respect channel consent separately from preference."
    ],
    "choose": 2
  },
  {
    "id": 105,
    "section": "data",
    "focus": "must",
    "group": "relationships",
    "stem": [
      "What storage model should be used if a subscriber has more than one value for an attribute?"
    ],
    "choices": [
      "Profile Attribute",
      "Data Extensions",
      "Publication Lists",
      "Lists"
    ],
    "answer": "B",
    "type": "single",
    "printed": "B",
    "why": "A related data extension can hold several rows for a subscriber, representing a genuine one-to-many attribute or event collection.",
    "wrong": {
      "A": "A profile attribute stores one value per subscriber rather than normalized related rows.",
      "C": "Publication lists hold subscription categories rather than arbitrary repeated attribute records.",
      "D": "Lists do not provide the requested relational multivalue model."
    },
    "notes": [
      "Examples include purchases, registrations, or interests. Use a child-row key and a contact relationship field rather than concatenating an unlimited list into one text cell."
    ]
  },
  {
    "id": 106,
    "section": "content",
    "focus": "high",
    "group": "content",
    "stem": [
      "Northern Trail Outfitters (NTO) has a franchise model which allows locally-owned stores to operate under the corporate umbrell a. They are required by corporate policy to email each franchisee a monthly statement, but the statement cannot be publicly accessible Which Marketing Cloud product should NTO purchase as a solution?"
    ],
    "choices": [
      "Email Attachments",
      "Distributed Sending",
      "Content Syndication",
      "Analytics Builder"
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "source": {
      "stem": [
        "Northern Trail Outfitters (NTO) has a franchise model which allows locally-owned stores to operate under the corporate umbrell a. They are required by corporate policy to email each franchisee a monthly statement, but the statement cannot be publicly accessible Which Marketing Cloud product should NTO purchase as a solution?"
      ],
      "choices": [
        "Email Rachments",
        "Distributed Sending",
        "Content Syndication",
        "Analytics Builder"
      ],
      "answer": "A"
    },
    "why": "Email Attachments can deliver the monthly statement as an attachment without requiring a publicly accessible document link.",
    "wrong": {
      "B": "Distributed Sending is not a document-attachment capability.",
      "C": "Content Syndication is not the required private statement delivery feature.",
      "D": "Analytics Builder reports on performance rather than attaching customer statements."
    },
    "notes": [
      "Enable the supported attachment capability and use a suitable source such as SFTP. Attachment delivery alone does not encrypt the document or prevent forwarding.",
      "Reference: https://developer.salesforce.com/docs/marketing/marketing-cloud-ampscript/references/mc-ampscript-content/mc-ampscript-reference-content-attach-file.html"
    ],
    "repaired": true
  },
  {
    "id": 107,
    "section": "journeys",
    "focus": "must",
    "group": "orchestration",
    "stem": [
      "Which three options determine when a contact could enter a journey? Choose 3 answers."
    ],
    "choices": [
      "Re-entry at any time",
      "Re-entry by attribute",
      "Re-entry by date",
      "No re-entry",
      "Re-entry only after exiting"
    ],
    "answer": "A,D,E",
    "type": "multi",
    "printed": "A,D,E",
    "why": "Journey re-entry settings support no re-entry, re-entry at any time, and re-entry only after exiting.",
    "wrong": {
      "B": "Re-entry by attribute is not one of the three standard re-entry modes.",
      "C": "Re-entry by date is not one of those modes; date eligibility belongs elsewhere in the entry design."
    },
    "notes": [
      "Re-entry is evaluated per contact identity and journey configuration. Entry-source eligibility and filtering still control which events or rows qualify."
    ],
    "choose": 3
  },
  {
    "id": 108,
    "section": "delivery",
    "focus": "high",
    "group": "reputation",
    "stem": [
      "A Marketing Cloud admin discovers large sends are not meeting send speed goals set by the organization. What functionality would get messages out the door faster?"
    ],
    "choices": [
      "Burst Sending",
      "Journey Builder Triggered Sends",
      "Send Throttling",
      "Marketing Cloud Connect"
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "why": "Burst Sending is the capability intended to increase throughput for large batch sends.",
    "wrong": {
      "B": "Triggered sends address event-driven messaging, not the requested large-batch throughput capability.",
      "C": "Throttling deliberately limits send rate rather than speeding it up.",
      "D": "Marketing Cloud Connect integrates CRM and does not provide this throughput entitlement."
    },
    "notes": [
      "Confirm availability with Salesforce and investigate content complexity, audience preparation, and queue constraints. Higher speed must remain compatible with the IP-warming plan."
    ]
  },
  {
    "id": 109,
    "section": "data",
    "focus": "high",
    "group": "identity",
    "stem": [
      "A Marketing Cloud admin is tasked with overhauling the data model for Enterprise. While the current data model is isolated to the email channel and there are plans to expand to both SMS and Push channels in the near future. Which three data preparations should be made to retain high data quality in the new mode? Choose 3 answers."
    ],
    "choices": [
      "Remove nonessential data for marketing purposes.",
      "Identify and assign appropriate keys to tie records together.",
      "Normalize data and fields to prevent redundancy.",
      "Ensure all available data is included.",
      "Ensure every data source has a sendable field."
    ],
    "answer": "A,B,C",
    "type": "multi",
    "printed": "A,B,C",
    "why": "Data minimization, stable cross-source keys, and normalization reduce unnecessary storage, duplicate identities, and redundant attributes.",
    "wrong": {
      "D": "Importing everything increases maintenance and privacy exposure without ensuring marketing value.",
      "E": "Not every relational reference table needs to be sendable or contain an address."
    },
    "notes": [
      "Design one contact identity across email, SMS, and push while keeping channel addresses and consent states appropriately separate."
    ],
    "choose": 3
  },
  {
    "id": 110,
    "section": "journeys",
    "focus": "familiar",
    "group": "orchestration",
    "stem": [
      "Northern Trail Outfitters (NTO) is building a journey which randomly sends five different versions of an initial welcome email to new subscriber however, subscribers receive the same follow-up email two weeks later. To improve maintainability of their email content, NTO want to use five completely different emails, rather than having one email with dynamic content. Which activity would allow NTO to build the journey with the fewest activities possible?"
    ],
    "choices": [
      "Einstein STO",
      "Engagement Split",
      "Wait Until Date",
      "Join"
    ],
    "answer": "D",
    "type": "single",
    "printed": "D",
    "source": {
      "stem": [
        "Northern Trail Outfitters (NTO) is building a journey which randomly sends five different versions of an initial welcome email to new subscriber however, subscribers receive the same follow-up email two weeks later. To improve maintainability of their email content, NTO want to use 3 completely different emails, rather than having one email with dynamic content. Which activity would allow NTO to build the journey with the fewest activities possible?"
      ],
      "choices": [
        "Einstein STO",
        "Engagement Split",
        "Wait Until Date",
        "Join"
      ],
      "answer": "D"
    },
    "why": "A Join consolidates the five welcome paths into one shared wait and follow-up sequence.",
    "wrong": {
      "A": "STO changes timing rather than merging branches.",
      "B": "An Engagement Split creates behavior-based paths.",
      "C": "A date wait delays a path but does not consolidate the shared downstream work."
    },
    "notes": [
      "The source inconsistently said both five and three welcome emails. The repaired version uses five consistently; the Join answer is unchanged."
    ],
    "repaired": true
  },
  {
    "id": 111,
    "section": "security",
    "focus": "must",
    "group": "business-units",
    "stem": [
      "What is Setup Assistant?"
    ],
    "choices": [
      "Support service allowing the outsourcing of repetitive admin tasks",
      "A prioritized account configuration checklist",
      "A search within Help and Training limited to configuration documents",
      "A dashboard containing key metrics for the business unit"
    ],
    "answer": "B",
    "type": "single",
    "printed": "B",
    "why": "Setup Assistant presents a prioritized checklist for configuring a new account.",
    "wrong": {
      "A": "It is not an outsourcing service for routine administration.",
      "C": "It is more than a filtered documentation search.",
      "D": "It is not the business-unit metrics dashboard."
    },
    "notes": [
      "Use it to identify setup tasks and resources; implementation still requires choices about data, permissions, sending, and integrations."
    ]
  },
  {
    "id": 112,
    "section": "security",
    "focus": "high",
    "group": "security",
    "stem": [
      "Northern Trail Outfitters (NTO) wants to limit who can receive Marketing Cloud tracking data via email from their Account to any email associated with their domain (ntoretail.com). Which steps should be taken to implement this? Choose 2 answers"
    ],
    "choices": [
      "Edit the entity Verification Settings",
      "Enable IP Whitelisting",
      "Add a Domain to the Export Email Whitelist",
      "Enforce Export Email Whitelist"
    ],
    "answer": "C,D",
    "type": "multi",
    "printed": "C,D",
    "why": "Add the trusted recipient domain to the export email allowlist and enable enforcement so exports cannot be emailed elsewhere.",
    "wrong": {
      "A": "Identity verification does not restrict export email destinations.",
      "B": "IP allowlisting restricts login origins rather than export recipients."
    },
    "notes": [
      "Enter ntoretail.com as a domain, then verify enterprise versus BU scope. This control covers supported emailed exports, not every possible way to extract data.",
      "Reference: https://help.salesforce.com/s/articleView?id=mktg.mc_overview_enable_export_email_allowlisting.htm&language=en_US&type=5"
    ],
    "choose": 2
  },
  {
    "id": 113,
    "section": "data",
    "focus": "high",
    "group": "relationships",
    "stem": [
      "NTO has Customers (CustomerID, EmailAddress, FirstName, LastName) and Orders (OrderID, CustomerID). CustomerID is the stable Contact Key. A customer can have many orders, each belonging to one customer. Which two Data Designer configurations make the related data available to journeys? Choose 2 answers."
    ],
    "choices": [
      "Link the Customers data extension to the data model using Customer ID",
      "Link the Orders data extension to the Customers data extension using a Many-to-Many relationship",
      "Link Customers to Orders using a one-to-many relationship.",
      "Link the Customers data extension to the data model using Email Address"
    ],
    "answer": "A,C",
    "type": "multi",
    "printed": "A,C",
    "source": {
      "stem": [
        "A Marketing Cloud admin is configuring the Marketing Cloud data model for the first time. Journey Builder with of messages being sent to customers, based on if there has been an order or not. There are two existing data model Orders: - Customers contains information about subscribers including Email Address, First Name, Last name. - Orders contains information about the orders and includes the unique identifier of the customer In which two ways should the admin configure Data Designer to allow this data to be used within a Journey? Choose 2 answers"
      ],
      "choices": [
        "Link the Customers data extension to the data model using Customer ID",
        "Link the Orders data extension to the Customers data extension using a Many-to-Many relationship",
        "Link the Orders data extension to the Customers data extension using a One-to-Many relationship",
        "Link the Customers data extension to the data model using Email Address"
      ],
      "answer": "A,C"
    },
    "why": "CustomerID links Customers to Contact Key; the Customers-to-Orders relationship is one-to-many because a customer can place many orders.",
    "wrong": {
      "B": "The model does not require a many-to-many relationship between Customers and Orders.",
      "D": "Email Address is not the specified stable identity in this design."
    },
    "notes": [
      "Keep OrderID as the order-row primary key and CustomerID as the repeating customer reference. Direction matters when describing cardinality."
    ],
    "choose": 2,
    "repaired": true
  },
  {
    "id": 114,
    "section": "security",
    "focus": "familiar",
    "group": "access",
    "stem": [
      "Northern Trail Outfitters (NTO) wants a business analyst to import contact lists. The analyst has the following roles: Marketing Cloud Channel Manager and Marketing Cloud Viewer. The Analyst logged in but is unable to import contacts. How should NTO update the user to allow the analyst the appropriate access?"
    ],
    "choices": [
      "Add Marketing Cloud Security Administrator",
      "Add Distributed Sending User",
      "Remove Marketing Cloud Channel Manager",
      "Remove Marketing Cloud Viewer"
    ],
    "answer": "D",
    "type": "single",
    "printed": "D",
    "source": {
      "stem": [
        "Northern Trail Outfitters (NTO) wants a business analyst to import contact lists. The analyst has the followCloud Channel Manager and Marketing Cloud Viewer. The Analyst logged in but is unable to import contacts. How should NTO update the user to allow the analyst the appropriate access?"
      ],
      "choices": [
        "Add Marketing Cloud Security Administrator",
        "Add Distributed Sending User",
        "Remove Marketing Cloud Channel Manager",
        "Remove Marketing Cloud Viewer"
      ],
      "answer": "D"
    },
    "why": "Removing Viewer removes its import deny while preserving Channel Manager’s import capability.",
    "wrong": {
      "A": "Adding a security role does not remove the conflicting deny.",
      "B": "Distributed Sending User does not resolve contact-import permissions.",
      "C": "Removing Channel Manager removes the required grant rather than the restrictive role."
    },
    "notes": [
      "Use effective permission inspection to find explicit denies. Assign only the roles that match the actual job.",
      "Reference: https://help.salesforce.com/s/articleView?id=sf.mc_overview_marketing_cloud_roles.htm&language=en_US&type=5"
    ],
    "repaired": true
  },
  {
    "id": 115,
    "section": "delivery",
    "focus": "high",
    "group": "branding",
    "stem": [
      "Where would a Marketing Cloud admin view all verified email addresses?"
    ],
    "choices": [
      "Identity Verification Log",
      "From Address Management",
      "Reply Mail Management",
      "Sender Profiles"
    ],
    "answer": "B",
    "type": "single",
    "printed": "B",
    "why": "From Address Management is the central place to review verified sending addresses and domains.",
    "wrong": {
      "A": "An identity verification log is about access verification rather than the sending-address catalog.",
      "C": "RMM controls reply processing, not the complete verified-address list.",
      "D": "Sender Profiles reference addresses but are not the centralized verification inventory."
    },
    "notes": [
      "Verify the From address or domain before using it and distinguish address verification from SAP branding and IP reputation."
    ]
  },
  {
    "id": 116,
    "section": "analytics",
    "focus": "high",
    "group": "analytics",
    "stem": [
      "Marketing Cloud admin is asked to determine the total number of emails sent across all of their business units in the last calendar year Where would the admin retrieve this information?"
    ],
    "choices": [
      "Contact Builder > All Contacts > Email",
      "Analytics Builder > Reports > Email Send Report",
      "Email Studio > Email > Tracking > Sends",
      "Studio > Email > Subscribers > All Subscribers"
    ],
    "answer": "B",
    "type": "single",
    "printed": "B",
    "why": "The Email Send report in Analytics Builder supports account activity and send-volume reporting across the relevant enterprise scope.",
    "wrong": {
      "A": "All Contacts counts identities, not the number of messages sent.",
      "C": "A single tracking view is not the requested cross-BU annual report.",
      "D": "All Subscribers is an audience list rather than a message-volume report."
    },
    "notes": [
      "Choose the enterprise/member-account scope and date range deliberately. Verify historical data availability for the year; do not assume a short-retention data view holds all annual history."
    ]
  },
  {
    "id": 117,
    "section": "security",
    "focus": "high",
    "group": "business-units",
    "stem": [
      "EMEA and AMER marketers must see different subscriber populations. Which approach separates regional teams and scopes their subscriber visibility, with additional permissions configured separately for shared data and enterprise-level access?"
    ],
    "choices": [
      "Deploy Multi-Org with a single Marketing Cloud Account",
      "Deploy separate Publication Lists for each region within one account",
      "Filter data view permissions at the subscriber level",
      "Separate regions into business units and apply Subscriber Filters"
    ],
    "answer": "D",
    "type": "single",
    "printed": "D",
    "source": {
      "stem": [
        "Security and legal teams determine subscriber data available to EMEA teams should NOT be available to AMER teams. How could the Marketing Cloud admin ensure distinct data integrity across the regions?"
      ],
      "choices": [
        "Deploy Multi-Org with a single Marketing Cloud Account",
        "Deploy separate Publication Lists for each region within one account",
        "Filter data view permissions at the subscriber level",
        "Separate regions into business units and apply Subscriber Filters"
      ],
      "answer": "D"
    },
    "why": "Regional business units plus Subscriber Filters scope subscriber visibility for the assigned regional teams.",
    "wrong": {
      "A": "Multi-Org connects CRM orgs and is not by itself the requested regional subscriber restriction.",
      "B": "Publication lists model preferences rather than isolating staff access.",
      "C": "There is no general subscriber-level data-view permission switch implementing this design."
    },
    "notes": [
      "Also limit All Subscribers, shared DEs, enterprise data views, and administrator access. BU subscriber filters alone are not a complete data-isolation or residency guarantee."
    ],
    "repaired": true
  },
  {
    "id": 118,
    "section": "analytics",
    "focus": "high",
    "group": "analytics",
    "stem": [
      "For Google Analytics policy terminology, NTO’s Product Code identifies only a product, Application ID identifies only an application, and Subscriber ID is an opaque pseudonymous number that cannot identify a person on its own. Which three values avoid directly identifying the recipient in these analytics parameters? Choose 3 answers."
    ],
    "choices": [
      "Product Code",
      "Application ID",
      "Subscriber ID",
      "Email Address",
      "Name"
    ],
    "answer": "A,B,C",
    "type": "multi",
    "printed": "A,B,C",
    "source": {
      "stem": [
        "NTO wants to format links for consumption by Google Analytics 360. NTO wants to make sure they do not have any data which could be considered Personally Identifiable information (PII) within their links. Which three values could be used as personalization strings in query string parameters? Choose 3 answers"
      ],
      "choices": [
        "Product Code",
        "Application ID",
        "Subscriber ID",
        "Email Address",
        "Name"
      ],
      "answer": "A,B,C"
    },
    "why": "Under the stated assumptions, product and application identifiers contain no recipient identity, and the opaque Subscriber ID is a pseudonymous identifier. Email Address and Name directly identify or contact the recipient.",
    "wrong": {
      "D": "An email address directly contacts/identifies a person and is PII under Google’s policy definition.",
      "E": "A person’s name is directly identifying information in this context."
    },
    "notes": [
      "The broad original wording was incomplete. Google’s policy definition of PII excludes suitable pseudonymous identifiers; that does not make them anonymous or exempt from every privacy rule.",
      "Actual identifier contents, the supported Analytics feature, required disclosures, and consent still matter. Do not substitute email addresses, names, or identifying text into an allegedly opaque ID.",
      "Reference: https://support.google.com/adsense/answer/7686480?hl=en",
      "Analytics implementation requirements: https://support.google.com/analytics/answer/9213390?hl=en"
    ],
    "choose": 3,
    "repaired": true
  },
  {
    "id": 166,
    "section": "analytics",
    "focus": "familiar",
    "group": "analytics",
    "stem": [
      "Source question 118 — second occurrence (retained from the document).",
      "For Google Analytics policy terminology, NTO’s Product Code identifies only a product, Application ID identifies only an application, and Subscriber ID is an opaque pseudonymous number that cannot identify a person on its own. Which three values avoid directly identifying the recipient in these analytics parameters? Choose 3 answers."
    ],
    "choices": [
      "Product Code",
      "Application ID",
      "Subscriber ID",
      "Email Address",
      "Name"
    ],
    "answer": "A,B,C",
    "type": "multi",
    "printed": "A,B,C",
    "source": {
      "stem": [
        "NTO wants to format links for consumption by Google Analytics 360. NTO wants to make sure they do not have any data which could be considered Personally Identifiable information (PII) within their links. Which three values could be used as personalization strings in query string parameters? Choose 3 answers"
      ],
      "choices": [
        "Product Code",
        "Application ID",
        "Subscriber ID",
        "Email Address",
        "Name"
      ],
      "answer": "A,B,C"
    },
    "why": "Under the stated assumptions, product and application identifiers contain no recipient identity, and the opaque Subscriber ID is a pseudonymous identifier. Email Address and Name directly identify or contact the recipient.",
    "wrong": {
      "D": "An email address directly contacts/identifies a person and is PII under Google’s policy definition.",
      "E": "A person’s name is directly identifying information in this context."
    },
    "notes": [
      "The broad original wording was incomplete. Google’s policy definition of PII excludes suitable pseudonymous identifiers; that does not make them anonymous or exempt from every privacy rule.",
      "Actual identifier contents, the supported Analytics feature, required disclosures, and consent still matter. Do not substitute email addresses, names, or identifying text into an allegedly opaque ID.",
      "Reference: https://support.google.com/adsense/answer/7686480?hl=en",
      "Analytics implementation requirements: https://support.google.com/analytics/answer/9213390?hl=en"
    ],
    "choose": 3,
    "repaired": true
  },
  {
    "id": 119,
    "section": "delivery",
    "focus": "high",
    "group": "reputation",
    "stem": [
      "NTO has been noting reduced deliverability when they do large sends. Which part of deliverability is tied to hitting Spam Traps during a send?"
    ],
    "choices": [
      "List Hygiene",
      "Authentication",
      "Content",
      "Engagement"
    ],
    "answer": "A",
    "type": "single",
    "printed": "B",
    "why": "Spam-trap hits point primarily to list acquisition and hygiene problems, such as stale or poorly sourced addresses.",
    "wrong": {
      "B": "Authentication proves sending-domain authorization; it does not remove spam traps from a list.",
      "C": "Changing content does not clean trap addresses from the audience.",
      "D": "Engagement relates to reputation, but trap addresses primarily identify list-quality issues."
    },
    "notes": [
      "Use permission-based acquisition, suppress invalid/stale recipients, and investigate acquisition sources. Do not purchase a list or repeatedly mail unengaged addresses to solve a volume problem."
    ],
    "source": {
      "stem": [
        "NTO has been noting reduced deliverability when they do large sends. Which part of deliverability is tied to hitting Spam Traps during a send?"
      ],
      "choices": [
        "List Hygiene",
        "Authentication",
        "Content",
        "Engagement"
      ],
      "answer": "B"
    },
    "corrected": true
  },
  {
    "id": 120,
    "section": "data",
    "focus": "familiar",
    "group": "identity",
    "stem": [
      "NTO is designing data-extension fields. Which two field types do not require choosing a text maximum length or decimal precision and scale? Choose 2 answers."
    ],
    "choices": [
      "Text",
      "Decimal",
      "Number",
      "Boolean"
    ],
    "answer": "C,D",
    "type": "multi",
    "printed": "A,B",
    "why": "Number and Boolean avoid the configurable maximum text length and decimal precision/scale sizing decisions.",
    "wrong": {
      "A": "Text length must be planned for the expected data.",
      "B": "Decimal requires precision and fractional-scale choices."
    },
    "notes": [
      "This repeats Q13 with reordered options. The inline explanations conflict; use the actual field properties rather than memorizing their inconsistent keys.",
      "Reference: https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/ssjs_dataExtensionFieldsAdd"
    ],
    "choose": 2,
    "source": {
      "stem": [
        "Northern Trail Outfitters wants to bring subscriber data from its data warehouse into Marketing Cloud. Which 2 fields would need minimal consideration, for size/scalability related reasons, when creating a data extension to house the data? Choose 2 answers"
      ],
      "choices": [
        "Text",
        "Decimal",
        "Number",
        "Boolean"
      ],
      "answer": "A,B"
    },
    "corrected": true
  },
  {
    "id": 121,
    "section": "channels",
    "focus": "low",
    "group": "legacy",
    "stem": [
      "In a historical Social Studio implementation before retirement, NTO planned to connect its social accounts and use Bitly for shortened links. Which two prerequisites would that specific implementation require? Choose 2 answers."
    ],
    "choices": [
      "Bitly URL Shortener",
      "Facebook ad manager",
      "Login detail for each social media account",
      "Google URL shortner"
    ],
    "answer": "A,C",
    "type": "multi",
    "printed": "A,C",
    "source": {
      "stem": [
        "A Marketing Cloud admin is configuring Social Studio to manage Northern Trail Outfitters social media accounts. Which 2 prerequisites for configuring Social Studio should the admin consider? Choose 2 answers"
      ],
      "choices": [
        "Bitly URL Shortener",
        "Facebook ad manager",
        "Login detail for each social media account",
        "Google URL shortner"
      ],
      "answer": "A,C"
    },
    "why": "The historical implementation needs social-account credentials to authorize connections and a Bitly account for its explicitly chosen Bitly integration.",
    "wrong": {
      "B": "Facebook Ads Manager is not a universal prerequisite for connecting every Social Studio social account.",
      "D": "Google URL Shortener is not the selected shortening integration."
    },
    "notes": [
      "Social Studio retired in November 2024. Bitly was optional unless that integration was chosen; this item is historical study rather than current implementation guidance.",
      "Reference: https://help.salesforce.com/s/articleView?id=005132112&language=en_US&type=1"
    ],
    "choose": 2,
    "repaired": true
  },
  {
    "id": 122,
    "section": "channels",
    "focus": "high",
    "group": "mobile",
    "stem": [
      "NTO uses a MobileConnect code shared across business units. CELEBRATION is already assigned on that code in another business unit and shows as unavailable when an admin tries to add it. What explains this?"
    ],
    "choices": [
      "The keyword is already used by another business unit on the same code.",
      "Keyword is a reserved word",
      "Keyword has too many characters",
      "Keyword fails to meet content standards"
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "source": {
      "stem": [
        "A Marketing Cloud admin wants to configure a new keyword for an upcoming SMS campaign. After entering the desired keyword CELEBRATION, the admin notices the keyword is unavailable. What issue could the admin be facing?"
      ],
      "choices": [
        "Keyword is used within another business unit",
        "Keyword is a reserved word",
        "Keyword has too many characters",
        "Keyword fails to meet content standards"
      ],
      "answer": "A"
    },
    "why": "The prompt explicitly identifies an existing assignment on the same code. That explains unavailability; CELEBRATION is not one of the documented reserved confirmation keywords.",
    "wrong": {
      "B": "Reserved words such as YES/NO serve confirmation handling; the stated conflict is an existing assignment.",
      "C": "CELEBRATION is within the documented two-to-25-character length.",
      "D": "No content-standard violation is given."
    },
    "notes": [
      "Keywords are scoped to code/business-unit configuration. The appended review’s proposed change to B is not supported by the reserved-word list and was rejected.",
      "Reference: https://help.salesforce.com/s/articleView?id=mktg.mc_moc_create_a_new_keyword.htm&language=en_US&type=5"
    ],
    "repaired": true
  },
  {
    "id": 123,
    "section": "security",
    "focus": "high",
    "group": "access",
    "stem": [
      "Northern Trail Outfitters (NTO) only has enough licenses for their staff. A campaign manager is out on parental leave How should NTO create a new user to fill in?"
    ],
    "choices": [
      "Delete the campaign manager's user and create a new user",
      "Disable the campaign manager's user and create a new user",
      "Transfer the campaign manager's permissions to a new user",
      "Deactivate the campaign manager's license and assign it to the new user"
    ],
    "answer": "B",
    "type": "single",
    "printed": "B",
    "why": "Disable the absent employee’s user so a separate temporary staff account can use the available seat without deleting the original user.",
    "wrong": {
      "A": "Deleting the original user is unnecessary for a temporary absence and loses the intended reversible account handling.",
      "C": "Copying permissions does not free the required seat or create a distinct account.",
      "D": "The described license-deactivation/reassignment action is not the user-disable workflow."
    },
    "notes": [
      "Create an individually attributable account rather than sharing the absent person’s credentials. Confirm the account’s actual license entitlements and restore access when appropriate."
    ]
  },
  {
    "id": 124,
    "section": "delivery",
    "focus": "high",
    "group": "reputation",
    "stem": [
      "Northern Trail Outfitters' employees are NOT receiving emails because the messages are being blocked by Spam filters. How could the Marketing Cloud admin address this issue?"
    ],
    "choices": [
      "Import employee email addresses into All Subscribers with an 'Active status",
      "Ensure employees have opted in to the test email list or data extension",
      "Ask employees to use personal email addresses instead of corporate email addresses",
      "Provide the IT team a list of relevant IP Addresses to whitelist in their spam filter"
    ],
    "answer": "D",
    "type": "single",
    "printed": "D",
    "why": "The corporate mail gateway is blocking delivery, so IT should review and allow the relevant Salesforce sending IPs or domains under its mail-security policy.",
    "wrong": {
      "A": "Active subscriber status cannot bypass the corporate gateway.",
      "B": "Opt-in does not change the gateway’s filtering decision.",
      "C": "Personal addresses avoid the organization’s policy rather than addressing the actual delivery problem."
    },
    "notes": [
      "Provide current official sending IP/domain information and message evidence. Allowlisting does not replace diagnosing authentication failures or unsafe content."
    ]
  },
  {
    "id": 125,
    "section": "automation",
    "focus": "high",
    "group": "files",
    "stem": [
      "An encrypted file is uploaded to Enhanced SFTP. The account uses Safehouse as the default import location, and a File Transfer activity decrypts it with a private key for the following Import File activity. Where is the decrypted file stored?"
    ],
    "choices": [
      "Selected SFTP folder",
      "Original SFTP folder",
      "Target Data Extension",
      "Safehouse"
    ],
    "answer": "D",
    "type": "single",
    "printed": "A",
    "source": {
      "stem": [
        "Northern Trail Outfitters placed an encrypted file on their Marketing Cloud SFTP for import into a data extension. They are using a file transfer Activity to decrypt the file. What would the decrypted data be after the File Transfer Activity completes?"
      ],
      "choices": [
        "Selected SFTP folder",
        "Original SFTP folder",
        "Target Data Extension",
        "Safehouse"
      ],
      "answer": "A"
    },
    "why": "In the specified encrypted-import flow, File Transfer decrypts to Safehouse and the following Import File activity reads from Safehouse.",
    "wrong": {
      "A": "This configured flow targets Safehouse rather than an arbitrary selected SFTP folder.",
      "B": "The encrypted input folder is not the resulting safehouse location.",
      "C": "File Transfer produces a file; Import File loads the target DE afterward."
    },
    "notes": [
      "The appended review claimed A, but Salesforce documents this safehouse flow explicitly. File Transfer and Import File are different steps.",
      "Reference: https://help.salesforce.com/s/articleView?id=mktg.mc_overview_perform_file_transfer_to_safehouse_location.htm&language=en_US&type=5"
    ],
    "corrected": true
  },
  {
    "id": 126,
    "section": "security",
    "focus": "familiar",
    "group": "business-units",
    "stem": [
      "Setup Assistant provides information and resources for configuring a new Marketing Cloud account. Which two topics does Setup Assistant cover? Choose 2 answers"
    ],
    "choices": [
      "Enabling Mobile Connect",
      "Managing the Enhanced SFTP",
      "Configuring Journey Builder",
      "Setting up the Data Structure"
    ],
    "answer": "B,D",
    "type": "multi",
    "printed": "D",
    "source": {
      "stem": [
        "Setup Assistant provides information and resources for configuring a new Marketing Cloud account. Which two topics does Setup Assistant cover? Choose 2 answers"
      ],
      "choices": [
        "Enabling Mobile Connect",
        "Managing the Enhanced SFTP",
        "Configuring Journey Builder",
        "Setting up the Data Structure"
      ],
      "answer": "D"
    },
    "why": "Setup Assistant covers foundational file-transfer setup and the audience data structure.",
    "wrong": {
      "A": "Enabling a full MobileConnect implementation is not one of the two core checklist topics intended here.",
      "C": "Configuring an entire journey is not the foundational data/file setup pair."
    },
    "notes": [
      "The document labels this Single Choice but asks for two answers and prints only D. The reviewed key includes both Enhanced SFTP and data structure."
    ],
    "choose": 2,
    "corrected": true
  },
  {
    "id": 127,
    "section": "analytics",
    "focus": "familiar",
    "group": "analytics",
    "stem": [
      "A Marketing Cloud admin is asked to append an Urchin Tracking Module (UTM) variable string to links in emails. What functionality would allow this?"
    ],
    "choices": [
      "Advertising Studio",
      "Personalization Builder",
      "Web and Mobile Analytics",
      "Web Analytics Connector"
    ],
    "answer": "D",
    "type": "single",
    "printed": "D",
    "why": "Web Analytics Connector automatically appends configured analytics parameters to email links.",
    "wrong": {
      "A": "Advertising Studio manages advertising activation rather than email-link query tagging.",
      "B": "Personalization Builder is not the web-analytics tagging feature.",
      "C": "The generic Web and Mobile Analytics label is not the named connector in these choices."
    },
    "notes": [
      "Parameter Manager configures the tags for this capability. Keep campaign labels consistent and avoid sensitive values in parameters."
    ]
  },
  {
    "id": 128,
    "section": "integrations",
    "focus": "high",
    "group": "connect",
    "stem": [
      "Northern Trail Outfitters uses Marketing Cloud Connect to leverage Sales Cloud data in their journeys. a user recently reported the data coming from Sales Cloud is NOT up to date. Where should the Marketing Cloud admin begin troubleshooting?"
    ],
    "choices": [
      "Contact Builder > Synchronized Data Extensions",
      "Automation Studio > File Transfers",
      "Contact Builder > Data Sources",
      "Email Studio > Synchronized Data Extensions"
    ],
    "answer": "C",
    "type": "single",
    "printed": "C",
    "why": "Contact Builder’s Data Sources area shows the synchronized source configuration and status, making it the right starting point for stale CRM data.",
    "wrong": {
      "A": "Inspecting output DE rows alone does not show all synchronization configuration and status.",
      "B": "File Transfer does not run CRM object synchronization.",
      "D": "Email Studio is not the synchronized data-source administration location."
    },
    "notes": [
      "Check selected fields, filters, polling, CRM changes, and recent sync errors. Some source-derived values may update differently from ordinary stored fields."
    ]
  },
  {
    "id": 129,
    "section": "delivery",
    "focus": "high",
    "group": "branding",
    "stem": [
      "A Marketing Cloud admin at Northern Trail Outfitters (NTO) is exploring whether they need to separate their brands into separate business units. When should the admin create separate business units for each of NTO's brands?"
    ],
    "choices": [
      "NTO requires SSL certificate configurations for Content Builder and Portfolio images",
      "Each brand requires its own SAP account-branding domain for wrapped email links and images.",
      "Multiple brand logos must be accommodated in an email header",
      "A new sender profile needs to be leveraged for sending transactional emails"
    ],
    "answer": "B",
    "type": "single",
    "printed": "B",
    "why": "Independent brand link/image wrapping requirements can justify separate business units with their own supported SAP branding configuration.",
    "wrong": {
      "A": "An SSL requirement alone does not require a separate BU.",
      "C": "Different logos can be used in content within one BU.",
      "D": "Different Sender Profiles can exist without separating BUs."
    },
    "notes": [
      "A private sending domain alone is not equivalent to a full separately branded click/image domain. Confirm tenant, SAP, private-domain, and SSL entitlements before choosing the architecture.",
      "Reference: https://help.salesforce.com/s/articleView?id=sf.mc_es_sender_authentication_package.htm&language=en_US&type=5"
    ],
    "source": {
      "stem": [
        "A Marketing Cloud admin at Northern Trail Outfitters (NTO) is exploring whether they need to separate their brands into separate business units. When should the admin create separate business units for each of NTO's brands?"
      ],
      "choices": [
        "NTO requires SSL certificate configurations for Content Builder and Portfolio images",
        "Brand-specific private domains need to be leveraged when wrapping images and links in email campaigns",
        "Multiple brand logos must be accommodated in an email header",
        "A new sender profile needs to be leveraged for sending transactional emails"
      ],
      "answer": "B"
    },
    "repaired": true
  },
  {
    "id": 130,
    "section": "analytics",
    "focus": "familiar",
    "group": "analytics",
    "stem": [
      "A Marketing Cloud admin is asked to add a set of four tracking parameters automatically to all the links in an email sent via email studio. Which solution should the admin suggest?"
    ],
    "choices": [
      "AMPscript for Marketing Cloud",
      "Web Analytics Connector",
      "Google Analytics 360",
      "Marketing Cloud Connect"
    ],
    "answer": "B",
    "type": "single",
    "printed": "B",
    "why": "Web Analytics Connector centrally appends the configured tracking parameters to email links.",
    "wrong": {
      "A": "Custom AMPscript is not needed for standard account link tagging.",
      "C": "GA360 receives analytics data but is not the link-tagging configuration mechanism.",
      "D": "Marketing Cloud Connect handles CRM integration rather than generic link parameters."
    },
    "notes": [
      "Use Parameter Manager to maintain parameters, and test the final redirected URL so tags are not duplicated or stripped."
    ]
  },
  {
    "id": 131,
    "section": "security",
    "focus": "high",
    "group": "access",
    "stem": [
      "A user asks a Marketing Cloud admin to review their permissions since they are unable to send an email. The admin reviews the user profile and notices the user has three roles assigned: Content Creator, Data Manager, and Marketing Cloud Viewer. What should the admin do to resolve the issue so the user can send an email? The send restriction comes from the Viewer role; there is no separate explicit deny on the user record."
    ],
    "choices": [
      "Edit permissions and Grant permissions to Send",
      "Edit permissions and deselect Deny for Email Sending",
      "Add the Role Marketing Cloud Channel Manager",
      "Remove the Marketing Cloud Viewer Role"
    ],
    "answer": "D",
    "type": "single",
    "printed": "A",
    "source": {
      "stem": [
        "A user asks a Marketing Cloud admin to review their permissions since they are unable to send an email. The admin reviews the user profile and notices the user has three roles assigned: Content Creator, Data Manager, and Marketing Cloud Viewer. What should the admin do to resolve the issue so the user can send an email?"
      ],
      "choices": [
        "Edit permissions and Grant permissions to Send",
        "Edit permissions and deselect Deny for Email Sending",
        "Add the Role Marketing Cloud Channel Manager",
        "Remove the Marketing Cloud Viewer Role"
      ],
      "answer": "A"
    },
    "why": "The role-level Viewer deny overrides sending grants. Removing Viewer resolves that stated conflict.",
    "wrong": {
      "A": "Another grant does not defeat an existing explicit role deny.",
      "B": "The prompt specifies a role-level restriction, so changing a separate user-level deny does not remove it.",
      "C": "Adding another sending role leaves Viewer’s deny in effect."
    },
    "notes": [
      "Keep Content Creator/Data Manager permissions under review after removing Viewer. If a different user has an individual deny, diagnose that separately.",
      "Reference: https://help.salesforce.com/s/articleView?id=sf.mc_overview_marketing_cloud_roles.htm&language=en_US&type=5"
    ],
    "corrected": true
  },
  {
    "id": 132,
    "section": "data",
    "focus": "familiar",
    "group": "identity",
    "stem": [
      "An email marketing manager is planning to send a promotional email to one million subscribers. Which data structure should be used?"
    ],
    "choices": [
      "Data Extension",
      "Publication List",
      "Group",
      "List"
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "why": "Data extensions are suited to a large sendable audience and flexible relational fields.",
    "wrong": {
      "B": "A publication list manages topic preferences rather than acting as the primary million-record audience store.",
      "C": "A group is a list subset rather than the scalable relational storage choice here.",
      "D": "Lists suit simpler list-based models and are not the recommended structure for this scale."
    },
    "notes": [
      "Define sendability, Email Address, Subscriber Key mapping, primary keys, and retention. Data-extension storage alone does not establish subscription consent."
    ]
  },
  {
    "id": 133,
    "section": "journeys",
    "focus": "high",
    "group": "orchestration",
    "stem": [
      "With exit-on-goal configured for a multi-step journey, which three statements about Goals are correct? Choose 3 answers."
    ],
    "choices": [
      "Goal target statistics are stored in a data extension.",
      "Goals are created to evaluate journey performance.",
      "Goals can act as exit criteria.",
      "Contacts are evaluated against the goal after a wait activity.",
      "Each contact is assigned an individual goal."
    ],
    "answer": "B,C,D",
    "type": "multi",
    "printed": "B,C,D",
    "why": "Goals measure journey outcomes and can act as exit criteria. With exit-on-goal configured, contacts are evaluated against the goal at the end of wait activities.",
    "wrong": {
      "A": "Goal statistics are not automatically a custom goal-target DE.",
      "E": "A journey has a defined goal; each contact is not assigned a separately authored individual goal."
    },
    "notes": [
      "Goal evaluation depends on whether exit-on-goal is enabled; other goal checks can run on a daily cycle. A goal measures a marketing outcome, while a Decision Split routes contacts at a specific point.",
      "Reference: https://help.salesforce.com/s/articleView?id=mktg.mc_jb_goals.htm&language=en_US&type=5"
    ],
    "choose": 3,
    "source": {
      "stem": [
        "Which three statements should be considered before using Goals in Journey Builder? Choose 3 answers"
      ],
      "choices": [
        "Goal target statistics are stored in a data extension.",
        "Goals are created to evaluate journey performance.",
        "Goals can act as exit criteria.",
        "Contacts are evaluated against the goal after a wait activity.",
        "Each contact is assigned an individual goal."
      ],
      "answer": "B,C,D"
    },
    "repaired": true
  },
  {
    "id": 134,
    "section": "integrations",
    "focus": "familiar",
    "group": "connect",
    "stem": [
      "Northern Trail Outfitters wants to segment audiences based on Sales Cloud data. Where would their Marketing Cloud admin configure Sales Cloud Objects to be synced and leveraged in Marketing Cloud."
    ],
    "choices": [
      "Setup >Data Management > Synchronized Data Extensions",
      "Contact Builder > Data Extensions > Synchronized Data Extensions",
      "Contact Builder > Data Sources",
      "Setup > Apps > Salesforce Integration"
    ],
    "answer": "C",
    "type": "single",
    "printed": "C",
    "why": "Contact Builder > Data Sources is where the administrator selects and configures synchronized Salesforce objects.",
    "wrong": {
      "A": "Setup Data Management is not the object selection screen.",
      "B": "The output DE folder is not the synchronization-source configuration screen.",
      "D": "Salesforce Integration setup does not replace the Contact Builder object/field selection."
    },
    "notes": [
      "Sync only required fields and records. Use a maintained CRM Boolean eligibility flag when selection logic needs multiple source conditions."
    ]
  },
  {
    "id": 135,
    "section": "integrations",
    "focus": "familiar",
    "group": "connect",
    "stem": [
      "While setting up Marketing Cloud Connect, a Marketing Cloud admin navigates to the Marketing Cloud tab in Sales Cloud to complete the integration. The admin then receives the following error message: - Insufficient User Permissions. You have not been designated as an integrated Marketing Cloud user. Contact your system administrator The admin notices the Marketing Cloud for AppExchange Admin option is selected when looking at the user settings What action should correct the issue?"
    ],
    "choices": [
      "Apply the Marketing Cloud for AppExchange User option as well",
      "Reset all passwords to force new tokens.",
      "Apply the appropriate user mappings in the CRM configuration",
      "Apply the Administrator and Marketing Cloud Administrator roles to the user."
    ],
    "answer": "A",
    "type": "single",
    "printed": "D",
    "source": {
      "stem": [
        "While setting up Marketing Cloud Connect, a Marketing Cloud admin navigates to the Marketing Cloud tab in Sales Cloud to complete the integration. The admin then receives the following error message: - Insufficient User Permissions. You have not been designated as an integrated Marketing Cloud user. Contact your system administrator The admin notices the Marketing Cloud for AppExchange Admin option is selected when looking at the user settings What action should correct the issue?"
      ],
      "choices": [
        "Apply the Marketing Cloud for AppExchange User option as well",
        "Reset al passwords to force new tokens",
        "Apply the appropriate user mappings in the CRM configuration",
        "Apply the administrator and Marketing Cloud Administrator permission sets to user"
      ],
      "answer": "D"
    },
    "why": "Selecting Marketing Cloud for AppExchange User as well as Admin fixes the missing integrated-user designation described by this exact error.",
    "wrong": {
      "B": "Password resets do not set the missing CRM user option.",
      "C": "Mapping is separate from this missing user designation.",
      "D": "Broad administrator roles are not a replacement for the AppExchange User checkbox."
    },
    "notes": [
      "This repeats Q11 with reordered choices. Troubleshoot the configuration user rather than resetting every account.",
      "Reference: https://help.salesforce.com/s/articleView?id=sf.mc_co_troubleshoot_user_access_and_permissions.htm&language=en_US&type=5"
    ],
    "corrected": true
  },
  {
    "id": 136,
    "section": "channels",
    "focus": "low",
    "group": "legacy",
    "stem": [
      "In the legacy Marketing Cloud tooling referenced by this mock, which tool packaged supported journey structure for deployment across business units or accounts?"
    ],
    "choices": [
      "Journey Templates",
      "Deployment Manager",
      "Journey Extracts",
      "Copy activities"
    ],
    "answer": "B",
    "type": "single",
    "printed": "B",
    "source": {
      "stem": [
        "NTO wants to copy journeys across business units. What could be used to replicate journey structure so it can be easily recreated in another account?"
      ],
      "choices": [
        "Journey Templates",
        "Deployment Manager",
        "Journey Extracts",
        "Copy activities"
      ],
      "answer": "B"
    },
    "why": "Deployment Manager was the legacy tool for packaging supported Marketing Cloud assets, including journey structure, for another account or BU.",
    "wrong": {
      "A": "Journey Templates are not the general cross-account asset deployment tool.",
      "C": "Journey Extracts are not the named deployment tool.",
      "D": "Copying individual activities does not package the full supported structure for another account."
    },
    "notes": [
      "For current work, evaluate the supported Package Manager workflow and its asset/dependency limits. Deployment does not automatically recreate every integration, secret, or live configuration."
    ],
    "repaired": true
  },
  {
    "id": 137,
    "section": "security",
    "focus": "high",
    "group": "security",
    "stem": [
      "Before increasing an account session timeout, which three statements describe the documented baseline recommendation, security risk, and configuration scope? Choose 3 answers."
    ],
    "choices": [
      "Frustration of users upon timeouts",
      "Best practice suggests a 20-minute timeout setting",
      "Security risk of unauthorized users for longer timeout settings",
      "Change impacts all users",
      "Typical length of time users spend in Marketing Cloud"
    ],
    "answer": "B,C,D",
    "type": "multi",
    "printed": "B,C,D",
    "source": {
      "stem": [
        "A user asks a Marketing Cloud admin to update and increase their session timeout setting. Which three considerations should the admin review before making this update? Choose 3 answers"
      ],
      "choices": [
        "Frustration of users upon timeouts",
        "Best practice suggests a 20-minute timeout setting",
        "Security risk of unauthorized users for longer timeout settings",
        "Change impacts all users",
        "Typical length of time users spend in Marketing Cloud"
      ],
      "answer": "B,C,D"
    },
    "why": "The documented baseline recommends a short timeout, such as 20 minutes; longer sessions raise unattended-access risk, and the account setting affects users collectively.",
    "wrong": {
      "A": "Frustration is a usability consideration, but it is not one of the specified baseline/risk/scope statements.",
      "E": "Typical usage duration is also useful context but does not answer the repaired three-category prompt."
    },
    "notes": [
      "The broad original question allowed additional sensible considerations. The repaired prompt states the three categories being tested; choose a real policy with security and user workflow in mind.",
      "Reference: https://help.salesforce.com/s/articleView?id=sf.mc_overview_security_settings.htm&language=en_US&type=5"
    ],
    "choose": 3,
    "repaired": true
  },
  {
    "id": 138,
    "section": "security",
    "focus": "familiar",
    "group": "security",
    "stem": [
      "Northern Trail Outfitters (NTO) is concerned about unauthorized API access to their Marketing Cloud account. Which feature would NTO enable to assist in reducing threats from malicious API attacks?"
    ],
    "choices": [
      "IP Whitelisting",
      "Field Level Encryption",
      "Advanced Audit Trail",
      "Single Sign on Authentication"
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "why": "IP allowlisting, called whitelisting in the legacy option, limits API authentication attempts to trusted network origins when enforced.",
    "wrong": {
      "B": "Field-level encryption does not restrict API request source IPs.",
      "C": "Audit logs record activity rather than blocking an untrusted source.",
      "D": "SSO is not the API-source allowlist control."
    },
    "notes": [
      "Use the correct API login-source scope and enforcement setting. Also maintain least-privilege integration credentials."
    ]
  },
  {
    "id": 139,
    "section": "security",
    "focus": "familiar",
    "group": "security",
    "stem": [
      "Northern Trail Outfitters does NOT want to store email addresses or phone numbers within Marketing Cloud. Which feature should they use?"
    ],
    "choices": [
      "Tokenized Sending",
      "Field Level Encryption",
      "Lookup reference to Contact Object",
      "Master-detail relationship to Contacts"
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "why": "Tokenized Sending resolves sensitive contact data for sending without persisting the resolved values in the account database.",
    "wrong": {
      "B": "Encrypted fields are still stored fields.",
      "C": "A lookup relationship does not provide the tokenized no-storage sending architecture.",
      "D": "CRM master-detail relationships do not solve Engagement’s sensitive-data storage requirement."
    },
    "notes": [
      "Check supported channel and environment limitations with Salesforce. This architecture requires token exchange and is more than an ordinary send option."
    ]
  },
  {
    "id": 140,
    "section": "delivery",
    "focus": "high",
    "group": "subscriptions",
    "stem": [
      "What elements of CAN-SPAM should the Marketing Cloud admin ensure are present for each Commercial send?"
    ],
    "choices": [
      "A working unsubscribe/preference-center link and the sender’s valid physical mailing address.",
      "Business name and a link to the business website",
      "Business name and physical mailing address",
      "Preference Center link and a link to the business website"
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "source": {
      "stem": [
        "What elements of CAN-SPAM should the Marketing Cloud admin ensure are present for each Commercial send?"
      ],
      "choices": [
        "Preference Center link and physical mailing address",
        "Business name and a link to the business website",
        "Business name and physical mailing address",
        "Preference Center link and a link to the business website"
      ],
      "answer": "A"
    },
    "why": "Commercial messages need a functional opt-out mechanism and a valid physical mailing address; repaired A includes both.",
    "wrong": {
      "B": "A business website link is not an unsubscribe mechanism or mailing address.",
      "C": "The company name and address omit the working opt-out mechanism.",
      "D": "A website link does not replace a valid physical mailing address."
    },
    "notes": [
      "A generic preference-page link is insufficient unless it actually provides the required opt-out. This question covers two message elements, not every compliance requirement."
    ],
    "repaired": true
  },
  {
    "id": 141,
    "section": "security",
    "focus": "high",
    "group": "access",
    "stem": [
      "Northern Trail Outfitters installed Query Studio for Marketing Cloud, however, users are reporting they do NOT have access How should the Marketing Cloud admin ensure users have access?"
    ],
    "choices": [
      "Choose Public App Integration during the installation",
      "Install App-appropriate business units for expanded access",
      "License all appropriate users within the installed package",
      "Configure the API Integration to allow all users access"
    ],
    "answer": "C",
    "type": "single",
    "printed": "C",
    "why": "Access to an installed app such as Query Studio can require assigning the appropriate users package/app licenses in the Installed Package.",
    "wrong": {
      "A": "Public App Integration is not the per-user access assignment required here.",
      "B": "Installing for a BU does not necessarily grant each user the required app access.",
      "D": "Granting broad API integration access does not replace the app’s user access assignment."
    },
    "notes": [
      "Also verify the user’s effective permissions and assigned business units. App access does not grant unrestricted rights to every DE."
    ]
  },
  {
    "id": 142,
    "section": "journeys",
    "focus": "high",
    "group": "orchestration",
    "stem": [
      "A Marketing Cloud admin has scheduled a query on a daily basis. They notice the query sometimes fails to execute. How would the admin ensure a notification is received when the query fails?"
    ],
    "choices": [
      "Add their Email Address in the automation 'Runtime Error or Skipped Run Notification Settings",
      "Install the Marketing Cloud App on phone to receive Push Messages",
      "Add their Email Address in the Query Activity Notifications Field",
      "Configure the 'Event Notification Service' in Setup with their Email Address"
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "why": "Automation-level Runtime Error or Skipped Run notifications can alert the admin when a scheduled query activity fails.",
    "wrong": {
      "B": "A mobile app push is not the automation’s supported failure-notification configuration.",
      "C": "The proposed Query Activity Notifications field is not the automation error setting.",
      "D": "Event Notification Service is not configured merely by entering an alert email for this purpose."
    },
    "notes": [
      "Set notifications on the automation and investigate the activity error details. An automation completion message and a skipped-run/runtime error alert serve different purposes."
    ]
  },
  {
    "id": 143,
    "section": "integrations",
    "focus": "high",
    "group": "connect",
    "stem": [
      "For a supported Marketing Cloud Connect email send using valid Salesforce Contact or Lead IDs as Subscriber Keys, Individual Email Results are not returning to Sales Cloud. The integration otherwise works. Which data-extension location should the administrator check?"
    ],
    "choices": [
      "The send relationship maps Subscriber Key to Subscribers on Email Address.",
      "The data extension is located in the Synchronized Data Extensions folder.",
      "The data extension is located in the Salesforce Data Extensions folder.",
      "The triggeredSendDataExtension data extension template was used."
    ],
    "answer": "C",
    "type": "single",
    "printed": "C",
    "source": {
      "stem": [
        "A Marketing Cloud admin notices Individual Email Results are NOT being pushed back into Sales Cloud for a particular end. The admin of Marketing Cloud Connect is functioning properly. What should the admin confirm about the data extension?"
      ],
      "choices": [
        "The wind relationship links SubscriberKey to Subscribers on Email Address",
        "The data extension is located in the Synchronized Data Extensions folder.",
        "The data extension is located in the Salesforce Data Extensions folder.",
        "The triggeredSendDataExtension data extension template was used."
      ],
      "answer": "C"
    },
    "why": "For the specified Connect workflow, the Salesforce Data Extensions location marks the send audience for the CRM tracking-return process.",
    "wrong": {
      "A": "Mapping identity to Email Address is inconsistent with the stated CRM-ID Subscriber Keys.",
      "B": "Synchronized DEs are CRM sync outputs rather than the supported send audience location here.",
      "D": "A triggered-send template is not the folder/configuration required for this case."
    },
    "notes": [
      "Folder location alone is not sufficient: verify valid Contact/Lead IDs, tracking settings, integration users, supported send method, and backfill/processing behavior.",
      "Reference: https://help.salesforce.com/s/articleView?id=mktg.mc_co_salesforce_data_extensions.htm&language=en_US&type=5"
    ],
    "repaired": true
  },
  {
    "id": 144,
    "section": "analytics",
    "focus": "high",
    "group": "analytics",
    "stem": [
      "Northern Trail Outfitters wants to set up their Send Log data extension Which three considerations should be made for long term success? Choose 3 answers"
    ],
    "choices": [
      "Apply an appropriately-scoped Data Retention period",
      "Add custom fields not included in the Send Log Template",
      "Log attribute data necessary for auditing communications",
      "Log all variable data captured in emails at send time",
      "Set the period to a fixed date in the Data Retention Policy"
    ],
    "answer": "A,B,C",
    "type": "multi",
    "printed": "A,B,C",
    "why": "A suitable retention period controls growth, custom fields record required send-time values, and selecting necessary audit attributes preserves useful evidence.",
    "wrong": {
      "D": "Logging every variable creates needless volume and can retain unnecessary sensitive data.",
      "E": "A fixed one-time deletion date is usually less suitable than a rolling retention policy for an ongoing Send Log."
    },
    "notes": [
      "Use consistent field names and data types and plan joins to JobID, BatchID, and subscriber identifiers. Review retention against actual audit needs."
    ],
    "choose": 3
  },
  {
    "id": 145,
    "section": "automation",
    "focus": "familiar",
    "group": "imports",
    "stem": [
      "Northern Trail Outfitters (NTO) keeps their subscribers in sync with their external database via the import of a CSV file which is dropped to the of Marketing Cloud SFTP each day. However, NTO has realized the number of subscribers being sent emails is considerably lower than the number they were expecting based on records in their database. Which feature would allow NTO to monitor whether all records were added to the target data structure each day?"
    ],
    "choices": [
      "External Key within the Import File Activity",
      "Run Completion within the File Drop Automation",
      "RuntimeError within the File Drop Automation",
      "Notification Settings within the Import File activity"
    ],
    "answer": "D",
    "type": "single",
    "printed": "D",
    "source": {
      "stem": [
        "Northern Trail Outfitters (NTO) keeps their subscribers in sync with their external database via the import of a CSV file which is dropped to the of Marketing Cloud SFTP each day. However, NTO has realized the number of subscribers being sent emails is considerably lower than the number they were expecting based on records in their database. Which feature would allow NTO to monitor whether all records were added to the target data structure each day?"
      ],
      "choices": [
        "External Key within the Import File Activity",
        "Run Completion within the File Drop Automation",
        "RuntimeError within the File Drop Automation",
        "Notation Settings within the Import File Activity"
      ],
      "answer": "D"
    },
    "why": "Import File Notification Settings report row-level import outcomes so the administrator can compare expected and successful records.",
    "wrong": {
      "A": "External Key identifies the definition rather than reporting import success counts.",
      "B": "Automation completion does not prove every source row was successfully loaded.",
      "C": "Runtime errors do not necessarily identify nonfatal rejected rows in a completed import."
    },
    "notes": [
      "The source says Notation Settings; the reviewed option restores Notification Settings. Monitor skipped/rejected rows even when the automation itself succeeds."
    ],
    "repaired": true
  },
  {
    "id": 146,
    "section": "data",
    "focus": "high",
    "group": "identity",
    "stem": [
      "A promotional audience is in a data extension but is missing from live-send audience selection. Which minimum send-eligibility flag must be enabled?"
    ],
    "choices": [
      "The data extension is marked as Sendable",
      "The data extension contains a Salesforce ID",
      "The Data extension is marked as Sendable and Testable",
      "The data extension is linked using the Contact Key"
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "why": "The DE must be configured as sendable to appear as an eligible live-send audience.",
    "wrong": {
      "B": "Salesforce IDs are not required for an ordinary Engagement send.",
      "C": "Testable is useful for test audiences, but is not required for this live-send eligibility.",
      "D": "A Contact Builder relationship alone does not make a DE sendable."
    },
    "notes": [
      "Also define the correct send relationship and usable email address field. Distinguish “sendable” from merely storing contact-related data."
    ],
    "source": {
      "stem": [
        "Northern Trail Outfitters is preparing to send a promotional email. The audience file was loaded into a data extension but does not display for Marketing Cloud admin scheduling the send. What should the admin confirm to resolve the issue?"
      ],
      "choices": [
        "The data extension is marked as Sendable",
        "The data extension contains a Salesforce ID",
        "The Data extension is marked as Sendable and Testable",
        "The data extension is linked using the Contact Key"
      ],
      "answer": "A"
    },
    "repaired": true
  },
  {
    "id": 147,
    "section": "security",
    "focus": "familiar",
    "group": "security",
    "stem": [
      "A marketing Cloud admin wants to ensure sensitive information needed for email sends is NOT imported and stored in Marketing cloud. What solution should they implement?"
    ],
    "choices": [
      "Tokenized Sending",
      "Transparent Data Encryption",
      "Key Management",
      "Field level Encryption"
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "why": "Tokenized Sending uses sensitive values at send time rather than importing and retaining them as normal account data.",
    "wrong": {
      "B": "Transparent data-at-rest encryption protects stored data rather than avoiding storage.",
      "C": "Key Management manages cryptographic keys, not the full no-storage send architecture.",
      "D": "Field-level encryption still stores protected values."
    },
    "notes": [
      "Confirm enablement, token-service availability, supported data fields, and failure handling with the implementation team."
    ]
  },
  {
    "id": 148,
    "section": "automation",
    "focus": "high",
    "group": "imports",
    "stem": [
      "A Marketing Cloud admin is using the Import Wizard to import data into a non-sendable data extension, but receives an error indicating the import type being used requires a primary key. Which import type could the admin use instead?"
    ],
    "choices": [
      "Add Only",
      "Overwrite",
      "Add and Update",
      "Update Only"
    ],
    "answer": "B",
    "type": "single",
    "printed": "B",
    "why": "For the documented file-import workflow, a data extension without a primary key supports Overwrite. It replaces the contents without matching existing rows by a key.",
    "wrong": {
      "A": "Add Only is not the supported keyless data-extension update type in this documented file-import workflow.",
      "C": "Add and Update requires a primary key to match existing records.",
      "D": "Update Only requires a primary key to identify existing matching records."
    },
    "notes": [
      "Overwrite replaces the current contents, so verify that the file is a complete, valid dataset before importing. Do not generalize append behavior from SQL or API row operations to the Import Wizard.",
      "Reference: https://help.salesforce.com/s/articleView?id=mktg.mc_es_import_activity.htm&language=en_US&type=5",
      "Current file-import documentation says Overwrite is the data-extension import action that does not require a primary key. Reference: https://help.salesforce.com/s/articleView?id=sf.mc_as_update_a_list_or_data_extension_using_an_external_file.htm&language=en_US&type=5"
    ],
    "source": {
      "stem": [
        "A Marketing Cloud admin is using the Import Wizard to import data into a non-sendable data extension, but receives an error indicating the import type being used requires a primary key. Which import type could the admin use instead?"
      ],
      "choices": [
        "Add Only",
        "Overwrite",
        "Add and Update",
        "Update Only"
      ],
      "answer": "B"
    }
  },
  {
    "id": 149,
    "section": "analytics",
    "focus": "low",
    "group": "analytics",
    "stem": [
      "Historical Discover Reporting question. The source does not define the two analyses its mobile-adoption strategy requires.",
      "Northern Trail Outfitters (NTO) has the Discover Reporting Tool. Which two report types could help NTO drive their mobile adoption strategy? Choose 2 answers"
    ],
    "choices": [
      "Email Performance by Device",
      "Time Between Send and Engagement",
      "Deliverability Complaint Rate",
      "Email Sending Performance Report"
    ],
    "answer": "",
    "type": "multi",
    "printed": "A,D",
    "source": {
      "stem": [
        "Northern Trail Outfitters (NTO) has the Discover Reporting Tool. Which two report types could help NTO drive their mobile adoption strategy? Choose 2 answers"
      ],
      "choices": [
        "Email Performance by Device",
        "Time Between Send and Engagement",
        "Deliverability Complaint Rate",
        "Email Sending Performance Report"
      ],
      "answer": "A,D"
    },
    "why": "Not scored. Email Performance by Device directly supports comparing mobile and desktop engagement. The broad mobile-adoption goal does not uniquely establish the second report: general sending performance and engagement-delay analysis can both be useful for different strategies.",
    "wrong": {},
    "notes": [
      "The previous repair added a specific send-to-engagement-lag requirement to select a different pair. That supplied requirement makes a coherent study example, but does not establish that the original report pair was wrong. The Corrected badge is withdrawn.",
      "Discover Reporting is retired. Specify the exact historical report outputs required, or replace this with a separately identified current reporting question, before assigning a unique answer set.",
      "Device report: https://help.salesforce.com/s/articleView?id=sf.mc_re_single_email_performance_by_device_report.htm&language=en_US&type=5",
      "Retirement: https://help.salesforce.com/s/articleView?id=000356878&language=en_US&type=1",
      "Compared online variant: https://www.actual4test.com/discussions/Salesforce/exam-marketing-cloud-administrator-topic-4-question-5-discussion-p1158738.html"
    ],
    "choose": 2,
    "ungraded": true
  },
  {
    "id": 150,
    "section": "delivery",
    "focus": "high",
    "group": "reputation",
    "stem": [
      "An administrator wants to populate a suppression data extension automatically with SQL using individual hard-bounce events and subscriber identifiers. Which listed source should the query use?"
    ],
    "choices": [
      "Run a Bounce Email Report",
      "Query the Bounce Data View",
      "Query the Send Log",
      "Run an Account Send Summary Report"
    ],
    "answer": "B",
    "type": "single",
    "printed": "B",
    "why": "The _Bounce data view supplies subscriber identifiers, bounce category, and event detail that SQL can use to select hard-bounced recipients.",
    "wrong": {
      "A": "A bounce report can support investigation, but it is not the SQL-queryable event source requested for this automated audience.",
      "C": "Send Log records send-time data rather than authoritative bounce events.",
      "D": "Account Send Summary aggregates results instead of identifying individual bounced addresses."
    },
    "notes": [
      "Join SubscriberKey to the appropriate address source where required and filter the correct bounce category. Review event dates and status changes before applying a permanent suppression."
    ],
    "source": {
      "stem": [
        "A Marketing Cloud admin wants to create a suppression list for hard-bounced email addresses Where could the details be found?"
      ],
      "choices": [
        "Run a Bounce Email Report",
        "Query the Bounce Data View",
        "Query the Send Log",
        "Run an Account Send Summary Report"
      ],
      "answer": "B"
    },
    "repaired": true
  },
  {
    "id": 151,
    "section": "automation",
    "focus": "high",
    "group": "files",
    "stem": [
      "Northern Trail Outfitters has five business units in their Marketing Cloud account. All business units should be configured to use the same SFTP directory How should this setup be achieved?"
    ],
    "choices": [
      "Child business unit SFTP user should be created",
      "Ask Salesforce Support to configure the child business units to use the parent business unit’s SFTP directory; manage users in the original directory-owning business unit.",
      "Each business unit should have multiple SFTP users",
      "All child business units should have an individual SFTP user"
    ],
    "answer": "B",
    "type": "single",
    "printed": "D",
    "source": {
      "stem": [
        "Northern Trail Outfitters has five business units in their Marketing Cloud account. All business units should be configured to use the same SFTP directory How should this setup be achieved?"
      ],
      "choices": [
        "Child business unit SFTP user should be created",
        "Copy the parent SFTP user into each child business unit",
        "Each business unit should have multiple SFTP users",
        "All child business units should have an individual SFTP user"
      ],
      "answer": "D"
    },
    "why": "Salesforce Support can point the child MIDs at the parent’s SFTP directory; user management then remains with the original directory-owning BU.",
    "wrong": {
      "A": "Creating a new child SFTP user does not establish shared directory configuration.",
      "C": "Multiple users per BU do not make separate directories identical.",
      "D": "Independent child users do not configure every BU to use one shared directory."
    },
    "notes": [
      "B was rewritten: copying credentials is not the documented solution. Review affected automations and do not recreate child SFTP users in ways that reset the directory-sharing setup.",
      "Reference: https://help.salesforce.com/s/articleView?id=005384678&language=en_US&type=1"
    ],
    "corrected": true
  },
  {
    "id": 152,
    "section": "delivery",
    "focus": "high",
    "group": "branding",
    "stem": [
      "Northern Trail Outfitters (NTO) hired a new Marketing Cloud admin, who was told all emails come from info@email.nto.com. the previous admin did not leave any documentation. Which aspects would confirm a Sender Authentication Package (SAP) has been set up on the account? 2 answers"
    ],
    "choices": [
      "Upon receiving an email, all tracked links start with click.email.nto.com",
      "The login page for Marketing Cloud Users is login.email.nto.com and is branded with NTO colors",
      "Cloudpages personalized URLs are served from cloud.email.nto.com",
      "Users receive Marketing Cloud password reset emails from help@email nto.com"
    ],
    "answer": "A,C",
    "type": "multi",
    "printed": "A,C",
    "why": "Branded tracked links and the SAP-specific CloudPages hostname are evidence of configured SAP domain branding.",
    "wrong": {
      "B": "SAP does not turn the Engagement login page into a customer-branded hostname.",
      "D": "User password reset email branding is not proof of this sending-domain SAP setup."
    },
    "notes": [
      "These are indicators, not a complete configuration audit. Confirm domains, DNS, SSL, and entitlements in the account."
    ],
    "choose": 2
  },
  {
    "id": 153,
    "section": "delivery",
    "focus": "high",
    "group": "reputation",
    "stem": [
      "Northern Trail Outfitters is migrating from a small, in-house email solution to Marketing Cloud. What should the Marketing Cloud admin consider when sending from the new IP Address?"
    ],
    "choices": [
      "The IP address is on reserve, is already in use, and has an email sending history.",
      "Building desirable sending history and data will be variable based on list size and engagement.",
      "Sending in large volumes will alert ISPs the new IP Address is now in use.",
      "Migration of larger marketing campaigns is necessary prior to bringing on smaller, triggered campaigns."
    ],
    "answer": "B",
    "type": "single",
    "printed": "C",
    "why": "A new sending IP needs a desirable history built through a controlled volume ramp; timing depends on audience size and engagement.",
    "wrong": {
      "A": "An unused new IP does not inherit an established sending history by assumption.",
      "C": "Immediately sending large volumes can damage deliverability rather than establish trust.",
      "D": "Large campaigns should not automatically precede smaller, engaged or transactional traffic."
    },
    "notes": [
      "Measure results by provider and slow the ramp if blocks or complaints rise. The old platform’s reputation is not simply transferred to the new IP."
    ],
    "source": {
      "stem": [
        "Northern Trail Outfitters is migrating from a small, in-house email solution to Marketing Cloud. What should the Marketing Cloud admin consider when sending from the new IP Address?"
      ],
      "choices": [
        "The IP address is on reserve, is already in use, and has an email sending history.",
        "Building desirable sending history and data will be variable based on list size and engagement.",
        "Sending in large volumes will alert ISPs the new IP Address is now in use.",
        "Migration of larger marketing campaigns is necessary prior to bringing on smaller, triggered campaigns."
      ],
      "answer": "C"
    },
    "corrected": true
  },
  {
    "id": 154,
    "section": "security",
    "focus": "high",
    "group": "security",
    "stem": [
      "An account enforces its Login IP Allowlist for the user interface. Which additional network condition is checked when a user attempts to sign in?"
    ],
    "choices": [
      "If the user is assigned a role in the parent business unit",
      "If the user is logging in from a whitelisted IP address",
      "If the user is an API User on their record",
      "If the user has login hours enabled on their profile"
    ],
    "answer": "B",
    "type": "single",
    "printed": "B",
    "source": {
      "stem": [
        "What does Marketing Cloud authenticate when a user logs in through the user interface?"
      ],
      "choices": [
        "If the user is assigned a role in the parent business unit",
        "If the user is logging in from a whitelisted IP address",
        "If the user is an API User on their record",
        "If the user has login hours enabled on their profile"
      ],
      "answer": "B"
    },
    "why": "With UI IP enforcement enabled, the login source must fall within an allowed UI or Any IP range.",
    "wrong": {
      "A": "A parent-BU role assignment is not the specified network access check.",
      "C": "The API User flag is not required merely for this interactive UI login.",
      "D": "CRM profile login hours are not the Engagement allowlist condition being tested."
    },
    "notes": [
      "This check is conditional on enforcement. Login still requires the configured credentials, MFA/SSO, and an enabled user.",
      "Reference: https://help.salesforce.com/s/articleView?id=sf.mc_overview_ip_allowlist.htm&language=en_US&type=5"
    ],
    "repaired": true
  },
  {
    "id": 155,
    "section": "delivery",
    "focus": "high",
    "group": "reputation",
    "stem": [
      "NTO is evaluating dedicated email IPs and sharing a dedicated IP across eligible Marketing Cloud accounts. Which two considerations apply? Choose 2 answers."
    ],
    "choices": [
      "All of NTO's accounts should be on the same stack",
      "Send volume is large enough to maintain a positive or neutral reputation",
      "Length of time needed to pause sending is greater than one month",
      "Pre-warmed IP address can be purchased from Salesforce"
    ],
    "answer": "A,B",
    "type": "multi",
    "printed": "B",
    "source": {
      "stem": [
        "Northern Trail Outfitters (NTO) has expanded its marketing efforts globally and wants to implement a dedicated Sender Authentication Package. They plan to share it across each of their Marketing Cloud accounts Which two considerations would help NTO determine if a Dedicated IP is the right choice? Choose 2 answers"
      ],
      "choices": [
        "All of NTO's accounts should be on the same stack",
        "Send volume is large enough to maintain a positive or neutral reputation",
        "Length of time needed to pause sending is greater than one month",
        "Pre-warmed IP address can be purchased from Salesforce"
      ],
      "answer": "B"
    },
    "why": "Sharing a dedicated IP requires compatible accounts on the same stack, and a dedicated IP needs enough regular sending volume to sustain its reputation.",
    "wrong": {
      "C": "Long pauses undermine rather than establish a stable dedicated-IP sending history.",
      "D": "Buying a pre-warmed Salesforce IP is not the supported basis for bypassing warming."
    },
    "notes": [
      "The source conflated sharing an IP with sharing the full SAP. Confirm the actual account/tenant eligibility and IP provisioning with Salesforce.",
      "Reference: https://help.salesforce.com/s/articleView?id=sf.mc_es_dedicated_ip.htm&language=en_US&type=5"
    ],
    "choose": 2,
    "corrected": true
  },
  {
    "id": 156,
    "section": "data",
    "focus": "familiar",
    "group": "retention",
    "stem": [
      "In this scenario the non-sendable data extensions are not part of a population in Data Designer.",
      "After Contact Delete completes for a subset of previously emailed contacts, which two categories of information about the deletion scenario can remain in the account? Choose 2 answers."
    ],
    "choices": [
      "Contact-specific data at the job level",
      "Contact data in non-sendable data extensions",
      "General tracking data at the job level",
      "Contact data in sendable data extensions"
    ],
    "answer": "B,C",
    "type": "multi",
    "printed": "B,C",
    "source": {
      "stem": [
        "A Contact Delete request has been processed for subscribers who have been sent an email. to previously in a northern action did NOT target all contacts in their account and a significant number of contacts which are still remaining. Which two data would still exist in the account? Choose 2 answers"
      ],
      "choices": [
        "Contact-specific data at the job level",
        "Contact data in non-sendable data extensions",
        "General tracking data at the job level",
        "Contact data in sendable data extensions"
      ],
      "answer": "B,C"
    },
    "why": "Non-sendable DE data outside populations requires separate cleanup, while general job-level aggregates can remain after contact-specific deletion.",
    "wrong": {
      "A": "Contact-specific tracking for the deleted contacts is removed.",
      "D": "Contact Delete targets those contacts in sendable DEs."
    },
    "notes": [
      "The original did not distinguish deleted-contact data from unaffected contacts. Scope the cleanup inventory across all data stores and prevent reintroduction.",
      "Contact Delete documentation excludes non-sendable data extensions that are not included in a population. Inventory populations as well as sendable/non-sendable flags when defining cleanup. Reference: https://help.salesforce.com/s/articleView?id=mktg.mc_cab_contact_deletion.htm&language=en_US&type=5"
    ],
    "choose": 2,
    "repaired": true
  },
  {
    "id": 157,
    "section": "data",
    "focus": "high",
    "group": "identity",
    "stem": [
      "NTO updates an active subscriber’s email address in a standard sendable data extension. A regular Email Studio send to that same existing Subscriber Key still reaches the old address in All Subscribers. This is not a Salesforce Data Extension send or a Journey Builder send. Which consideration explains the destination address?"
    ],
    "choices": [
      "Data retention settings were incorrect in the data extension.",
      "The email address in All Subscribers is prioritized.",
      "Contact Builder was not configured properly.",
      "The data extension was not configured as sendable."
    ],
    "answer": "B",
    "type": "single",
    "printed": "B",
    "source": {
      "stem": [
        "Northern Trail Outfitters (NTO) uses data extensions for all of their email audiences. A customer reports they unsubscribed several week-end ago, but continue to receive NTO's daily digest at their old address. NTO's Marketing cloud Admin has confidently deleted them from present in the appropriate data extension. What consideration could account for this behavior?"
      ],
      "choices": [
        "Data retention settings were incorrect in the data extension.",
        "The email address in All Subscribers is prioritized.",
        "Contact Builder was not configured properly.",
        "The data extension was not configured as sendable."
      ],
      "answer": "B"
    },
    "why": "For the existing Subscriber Key in this DE-send scenario, the Email Address stored in All Subscribers takes precedence over a changed DE address.",
    "wrong": {
      "A": "Retention changes row lifetime rather than the address selected for an existing subscriber.",
      "C": "An unrelated Contact Builder model issue does not explain the described address precedence.",
      "D": "A non-sendable DE would not be the stated sending audience at all."
    },
    "notes": [
      "The source mixed an unsubscribe with deletion and an old address. This repair tests address precedence only: it never claims an active send can legitimately ignore a real unsubscribe.",
      "Salesforce DE sends prioritize their DE email address; Journey Builder has its own send-time address/update behavior. Do not apply the standard-DE rule universally.",
      "Reference: https://help.salesforce.com/s/articleView?id=000388210&language=en_US&type=1"
    ],
    "repaired": true
  },
  {
    "id": 158,
    "section": "security",
    "focus": "familiar",
    "group": "business-units",
    "stem": [
      "Northern Trail Outfitters has noticed an issue with their sends today. Which two links in Setup Home could be used to troubleshoot the issue?! Choose 2 answers"
    ],
    "choices": [
      "Create Support Case",
      "Failed Sends",
      "Help and Training",
      "System Status"
    ],
    "answer": "C,D",
    "type": "multi",
    "printed": "C,D",
    "why": "Help and Training provides troubleshooting resources; System Status identifies known platform incidents or degradation.",
    "wrong": {
      "A": "The mock’s setup-home links are not a Create Support Case control.",
      "B": "Failed Sends is not one of the named Setup Home resource links."
    },
    "notes": [
      "Use service status to distinguish a platform issue from an account configuration or activity failure, then inspect specific send errors."
    ],
    "choose": 2
  },
  {
    "id": 159,
    "section": "integrations",
    "focus": "high",
    "group": "distributed",
    "stem": [
      "Which three considerations should be made when setting up Distributed Marketing? Choose 3 answers"
    ],
    "choices": [
      "Business users can select any email at time of send.",
      "Default options can be set up for the greeting in the email.",
      "A journey can be connected to one or more Campaigns.",
      "The DM administrator Profile is required to access Distributed Marketing.",
      "Messages can be sent to Contacts, Leads, and Person Accounts."
    ],
    "answer": "B,C,E",
    "type": "multi",
    "printed": "A,C,E",
    "source": {
      "stem": [
        "Which three considerations should be made when setting up Distributed Marketing? Choose 3 answers"
      ],
      "choices": [
        "Business users can select any email at time of send.",
        "Default options can be set up for the greeting in the email.",
        "A journey can be connected to one or more Campaigns.",
        "The DM administrator Profile is required to access Distributed Marketing.",
        "Messages can be sent to Contacts, Leads, and Person Accounts."
      ],
      "answer": "A,C,E"
    },
    "why": "Distributed Marketing supports configured default greetings, connecting a journey to campaigns, and sending to supported CRM recipient types such as Contacts, Leads, and Person Accounts.",
    "wrong": {
      "A": "Business users select from marketer-approved available content, not arbitrary account emails.",
      "D": "Access is granted with the appropriate Distributed Marketing licensing/permissions; a profile called DM administrator is not universally required."
    },
    "notes": [
      "Use supported content/journey setup and grant only the relevant business-user permissions. Some CRM objects and message experiences have additional setup requirements.",
      "Reference: https://help.salesforce.com/s/articleView?id=mktg.mc_dm_set_default_greeting.htm&language=en_US&type=5",
      "Reference: https://help.salesforce.com/s/articleView?id=mktg.mc_dm_guided_gs_campaign_send.htm&language=en_US&type=5"
    ],
    "choose": 3,
    "corrected": true
  },
  {
    "id": 160,
    "section": "integrations",
    "focus": "high",
    "group": "connect",
    "stem": [
      "A MC admin wants to sync Contacts from Sales Cloud, but is concerned about the number of Contacts since not all the contacts will be sent an email. What should the admin do to ensure only specific Contacts are synced?"
    ],
    "choices": [
      "Filter records on a formula field",
      "Filter existing records in All Subscribers",
      "Filter records created after a specified date",
      "Filter records on a Boolean field"
    ],
    "answer": "D",
    "type": "single",
    "printed": "D",
    "why": "A maintained CRM Boolean eligibility field lets the sync include only contacts meeting the business criteria.",
    "wrong": {
      "A": "Formula-field changes have synchronization limitations; use a maintained stored eligibility flag for this control.",
      "B": "All Subscribers is not the CRM source filter mechanism.",
      "C": "Creation date can filter by age but does not express the stated marketable-contact criteria."
    },
    "notes": [
      "Keep the Boolean updated when consent or eligibility changes. Reducing synchronized records does not automatically remove previously synced contacts from every Engagement store."
    ]
  },
  {
    "id": 161,
    "section": "data",
    "focus": "high",
    "group": "segmentation",
    "stem": [
      "NTO needs an audience of subscribers who opened or clicked an email in the last 30 days and live within 10 miles of a store. Engagement is in system data views; precomputed subscriber-to-store distances are in a separate data extension. Which tool can join these sources and write the final audience?"
    ],
    "choices": [
      "Measures",
      "SQL Queries",
      "Data Filters",
      "Journey"
    ],
    "answer": "B",
    "type": "single",
    "printed": "A",
    "source": {
      "stem": [
        "(NTO) wants to use complex criteria to identify subscribers for a special promotional email. Especially they want to target subscribers who opened or engaged with an email within the last 30 days and live within 10 miles of an NTO store. What should NTO do to create this audience?"
      ],
      "choices": [
        "Measures",
        "SQL Queries",
        "Data Filters",
        "Journey"
      ],
      "answer": "A"
    },
    "why": "SQL joins recent engagement data to the precomputed proximity table and writes the combined qualifying audience.",
    "wrong": {
      "A": "A Measure alone describes behavior; it does not implement this multi-source audience join.",
      "C": "A simple Data Filter is not the appropriate tool for the specified independent-source join.",
      "D": "A journey orchestrates an admitted audience rather than constructing this SQL result."
    },
    "notes": [
      "The source key A and appended explanation omit the final audience-building step. Use the precomputed distance field instead of assuming unsupported spatial SQL functions."
    ],
    "corrected": true
  },
  {
    "id": 162,
    "section": "integrations",
    "focus": "high",
    "group": "connect",
    "stem": [
      "A Marketing Cloud admin is tasked with requesting Marketing Cloud Connect Multi-Org enablement. What consideration should be given to the preference profile centers for this integration?"
    ],
    "choices": [
      "Branding for each business units' profile centers will be inherited from the default business unit setup.",
      "Profile/Preference centers are automatically created for each business unit connected through Multi-org",
      "Multi org does not support the standard profile preference center for the business units.",
      "Profile/Preference centers for Multi-Org accounts are configured in the Salesforce CRM settings."
    ],
    "answer": "C",
    "type": "single",
    "printed": "C",
    "why": "Marketing Cloud Connect Multi-Org requires custom profile centers rather than relying on the standard profile/preference-center setup.",
    "wrong": {
      "A": "The default BU does not automatically provide the required customized centers for each connection.",
      "B": "Centers are not automatically created for every connected BU.",
      "D": "The custom centers are not merely a CRM-settings configuration."
    },
    "notes": [
      "Plan contact/subscriber visibility, dedicated integration users, and each BU’s CRM connection before enablement.",
      "Reference: https://help.salesforce.com/s/articleView?id=sf.mc_co_multi_org_account_configuration.htm&type=5"
    ]
  },
  {
    "id": 163,
    "section": "analytics",
    "focus": "familiar",
    "group": "analytics",
    "stem": [
      "An email manager was anticipating a test email to arrive in their inbox. Where in Email Studio should the Marketing Cloud admin look to determine if the test deployed?"
    ],
    "choices": [
      "My Tracking > Test Send Emails",
      "My Reports > Administrator Reports > Email Send Report",
      "My Reports > Administrator Reports > Email Sends By User",
      "My Tracking > A/B Testing"
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "why": "Test Send Emails tracking is the appropriate view to check whether the test was deployed.",
    "wrong": {
      "B": "The Email Send report is not the direct test-send tracking folder.",
      "C": "Email Sends by User is not the specific test-send deployment record.",
      "D": "A/B Testing tracks a different workflow."
    },
    "notes": [
      "A successful send record does not prove inbox placement. If deployed, investigate recipient status, List Detective, bounce events, and the recipient gateway."
    ]
  },
  {
    "id": 164,
    "section": "analytics",
    "focus": "high",
    "group": "einstein",
    "stem": [
      "Northern Trail Outfitters wants to drive additional online sales. They are interested in using Einstein to recommend similar items to customers during the checkout process. Which two terms would they add to their website to accomplish this? Choose 2 answers"
    ],
    "choices": [
      "Collect Code",
      "Recommendation Code",
      "Conversion/Cart Code",
      "Email Conversion Code"
    ],
    "answer": "A,B",
    "type": "multi",
    "printed": "B",
    "source": {
      "stem": [
        "Northern Trail Outfitters wants to drive additional online sales. They are interested in using Einstein to recommend similar items to customers during the checkout process. Which two terms would they add to their website to accomplish this? Choose 2 answers"
      ],
      "choices": [
        "Collect Code",
        "Recommendation Code",
        "Conversion/Cart Code",
        "Email Conversion Code"
      ],
      "answer": "B"
    },
    "why": "Collect Code records behavior, while Recommendation Code displays the recommended products on the website.",
    "wrong": {
      "C": "Cart/conversion calls enrich behavioral events but are not a replacement for the collection-plus-display pair.",
      "D": "Email Conversion Code measures email-driven conversion rather than rendering web recommendations."
    },
    "notes": [
      "Implement a product catalog and the appropriate behavioral events as well. The source asks for two but prints only B; collection and display have separate jobs."
    ],
    "choose": 2,
    "corrected": true
  },
  {
    "id": 165,
    "section": "automation",
    "focus": "familiar",
    "group": "files",
    "stem": [
      "A file-drop automation triggers on customer_import_. Its Import File activity expects customer_import_%%Year%%%%Month%%%%Day%%.csv, but real filenames also contain seconds and milliseconds. How should the import use the actual triggering filename?"
    ],
    "choices": [
      "Use %%FILENAME_FROM_TRIGGER%% in the Import File activity.",
      "Make sure the team has a date stamp to avoid duplication",
      "Make sure the files placed on the correct subfolder within the SFTP",
      "Use the exact file name used for the trigger in the Import File Activity"
    ],
    "answer": "A",
    "type": "single",
    "printed": "A",
    "source": {
      "stem": [
        "A Marketing Cloud Administrator noticed a File Drop Automation has been falling on the Import File activity. The automation is configured with a filename pattern, so the filename is expected to begin with customer import_. The import is configured to look for a file named Customer import %%Year%%%% Month%%%%Day%%.csv, however, the admin notices the filenames Include seconds and milliseconds what should the admin do to fix the issue?"
      ],
      "choices": [
        "use %%FILENAME_FROM_TRIGGER%% in the Import File Activity",
        "Make sure the team has a date stamp to avoid duplication",
        "Make sure the files placed on the correct subfolder within the SFTP",
        "Use the exact file name used for the trigger in the Import File Activity"
      ],
      "answer": "A"
    },
    "why": "%%FILENAME_FROM_TRIGGER%% supplies the exact dynamically timestamped filename that started the file-drop automation.",
    "wrong": {
      "B": "The file already has a timestamp; that does not fix the import mismatch.",
      "C": "Changing folders does not address the identified name-pattern mismatch.",
      "D": "Hard-coding one actual filename fails when the next timestamp changes."
    },
    "notes": [
      "The heading is absent; 165 is inferred after 164. Verify the trigger and import use the intended location and this supported substitution."
    ],
    "repaired": true
  }
];
