const matrixPrompt = `{
    "QuestionText": "",  
    // required, string, >= 0 characters, <= 1000 characters
    // Description: The main text of the question, which respondents will read and answer.

    "DataExportTag": "",  
    // required, string
    // Description: The tag used to identify the question in exported data.

    "QuestionType": "Matrix",  
    // required, string, allowed value: "Matrix"
    // Description: Defines the question type as a Matrix question.

    "Selector": "",  
    // required, string, allowed values: "Bipolar", "Likert", "TE", "Profile", "CS", "RO", "MaxDiff"
    // Description: Defines the format used for collecting responses within the Matrix question type.

    "SubSelector": "",  
    // required, string, allowed values: "DL", "DND", "Long", "Medium", "MultipleAnswer", "Short", "SingleAnswer", "WOTB", "WTB", "WVTB", "WTXB", "Essay"
    // Description: Refines the Selector by providing additional options or variations for response collection.

    "Configuration": {  
    // required, object
    // Description: Configurations for how the question should be displayed, including various options for layout, labels, and mobile optimization.

        "QuestionDescriptionOption": "",  
        // optional, string, allowed values: "UseText", "SpecifyLabel"
        // Description: An optional user-provided field for question descriptions.

        "TextPosition": "",  
        // optional, string, allowed value: "inline"
        // Description: Specifies the position of the text in the question layout.

        "ChoiceColumnWidth": 25,  
        // optional, integer, allowed value: 25
        // Description: Specifies the column width for the choices in the question.

        "RepeatHeaders": "",  
        // optional, string, allowed value: "none"
        // Description: Configures whether headers should be repeated in the display of the question.

        "WhiteSpace": "",  
        // optional, string, allowed values: "ON", "OFF"
        // Description: Determines if white space is allowed in the question layout.

        "LabelPosition": "",  
        // optional, string, allowed values: "BELOW", "SIDE"
        // Description: Specifies the position of the label relative to the question.

        "NumColumns": 0,  
        // optional, integer
        // Description: Defines the number of columns in which the choices will be displayed.

        "MobileFirst": false  
        // optional, boolean
        // Description: Indicates if the question should be formatted for optimal use on a mobile device.
    },

    "QuestionDescription": "",  
    // required, string, <= 100 characters
    // Description: A label or description to identify the question.

    "QuestionID": "",  
    // optional, string, match pattern: "^QID[a-zA-Z0-9]+$"
    // Description: The unique identifier for the question.

    "Choices": {  
    // required, object
    // Description: Selections for the question, where each choice is mapped to a display text.

        "1": {
            "Display": ""  
            // required, string
            // Description: The display text for choice 1.
        },
        "2": {
            "Display": ""  
            // required, string
            // Description: The display text for choice 2.
        }
    },

    "ChoiceOrder": [  
    // required, array[string]
    // Description: The order in which the choices should be displayed.

        "1",
        "2"
    ],

    "AnswerOrder": [  
    // required, array[string]
    // Description: The order in which the answers should be displayed.

        "1",
        "2"
    ],

    "Answers": {  
    // required, object
    // Description: Selections for the answers, where each answer is mapped to a display text.

        "1": {
            "Display": ""  
            // required, string
            // Description: The display text for answer 1.
        },
        "2": {
            "Display": ""  
            // required, string
            // Description: The display text for answer 2.
        }
    },

    "Validation": {  
    // required, object
    // Description: Settings that enforce or request that respondents answer the question before proceeding.

        "Settings": {  
        // required, object
        // Description: Contains settings for forced response and validation type.

            "ForceResponse": "",  
            // optional, string
            // Description: Indicates whether respondents are required to answer the question.

            "ForceResponseType": "",  
            // optional, string
            // Description: Specifies the type of forced response (e.g., mandatory).

            "Type": ""  
            // optional, string
            // Description: The type of validation applied to the question.
        },

        "CustomValidation": {  
        // optional, object
        // Description: Additional custom validation rules that can guide how respondents answer the question.
            // Additional fields can be added here.
        }
    },

    "Randomization": "",  
    // optional, string or object
    // Description: Configures whether and how the choices or answers are randomized when presented to respondents.

    "RecodeValues": {  
    // optional, object
    // Description: Numeric mapping of question choices, allowing for recoding of responses for analysis.

        "1": "",  
        // optional, string (numeric mapping)
        // Description: Recode value for choice 1.

        "2": ""   
        // optional, string (numeric mapping)
        // Description: Recode value for choice 2.
    },

    "ChoiceDataExportTags": false,  
    // required, boolean
    // Description: Determines if export tags should be applied to choices.

    "DefaultChoices": false,  
    // required, boolean
    // Description: Indicates if default choices should be used.

    "Language": [],  
    // required, array[string]object
    // Description: Translations of the question text for different languages.

    "NextChoiceId": 0,  
    // optional, integer
    // Description: The ID of the next choice that will be added.

    "NextAnswerId": 0  
    // optional, integer
    // Description: The ID of the next answer that will be added.
}
`