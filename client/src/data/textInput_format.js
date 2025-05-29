const textInputPrompt = `{
    "QuestionText": "",  
    // required, string, >= 0 characters, <= 1000 characters
    // Description: The main text of the question, which respondents will read and respond to by entering text.

    "DataExportTag": "",  
    // required, string
    // Description: The tag used to identify the question in exported data.

    "QuestionType": "",  
    // required, string, allowed values: "MC", "Matrix", "Captcha", "CS", "DB", "DD", "Draw", "DynamicMatrix", "FileUpload", "GAP", "HeatMap", "HL", "HotSpot", "Meta", "PGR", "RO", "SBS", "Slider", "SS", "TE", "Timing", "TreeSelect"
    // Description: Defines the type of question, with "TE" being the Text Entry type for this context.

    "Selector": "",  
    // required, string, allowed values: "SL", "ML", "ESTB", "FORM", "PW"
    // Description: Specifies the format or style of text entry (e.g., single line, multi-line).

    "Configuration": {  
    // required, object
    // Description: Configurations for how the question should be displayed, including layout, labels, and mobile optimization.

        "QuestionDescriptionOption": "",  
        // optional, string, allowed values: "UseText", "SpecifyLabel"
        // Description: An optional user-provided field for additional descriptions of the question.

        "TextPosition": "",  
        // optional, string, allowed value: "inline"
        // Description: Specifies the position of the text in the question layout.

        "ChoiceColumnWidth": 25,  
        // optional, integer, allowed value: 25
        // Description: Specifies the column width for the choices in the question (if applicable).

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
        // Description: Defines the number of columns in which the choices (if any) will be displayed.

        "MobileFirst": false  
        // optional, boolean
        // Description: Indicates if the question should be formatted for optimal use on a mobile device.
    },

    "QuestionDescription": "",  
    // required, string, <= 100 characters
    // Description: A brief label or description for the question.

    "QuestionID": "",  
    // optional, string, match pattern: "^QID[a-zA-Z0-9]+$"
    // Description: A unique identifier for the question.

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

    "DefaultChoices": false,  
    // required, boolean
    // Description: Indicates if default choices (if any) should be used.

    "Language": [],  
    // required, array[string]object
    // Description: Translations of the question text for different languages.

    "NextChoiceId": 0,  
    // optional, integer
    // Description: The ID for the next choice to be added (if applicable).

    "NextAnswerId": 0  
    // optional, integer
    // Description: The ID for the next answer to be added (if applicable).
}
`