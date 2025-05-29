const textQualtrics = `{
    "QuestionText": "",  
    // required, string, >= 0 characters, <= 1000 characters
    // Description: The main text of the question, which respondents will read and respond to by entering text.

    "DataExportTag": "",  
    // required, string
    // Description: The tag used to identify the question in exported data.

    "QuestionType": "TE",  
    // required, string
    // Description: Defines the type of question

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

        "NumColumns": <integer>,  
        // optional, integer
        // Description: Defines the number of columns in which the choices (if any) will be displayed.

        "MobileFirst": true  
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
            // Description: Settings for forced responses and custom validation.

            "ForceResponse": "<Allowed value>",
            // optional, string
            // Allowed values = "OFF", "ON", "RequestResponse", "$option.ForceResponseType"
            // Description: The forced response.

            "ForceResponseType": ,
            // optional, string, allowed values: "OFF", "ON", "RequestResponse"
            // Description: The type of forced response.

            "Type": 
            // optional, string
            // allowed values: "CharRange", "ChoiceRange", "ChoicesTotal", "Consecutive", "ConsecutiveNumberRange", "ContentType", "CustomValidation", "ForceResponse", "GroupChoiceRange", "MinChar", "MinChoices", "None", "TotalChar", "AITextAnalysis", ""
            // Description: Settings type.

            }
        }
    },

    "DefaultChoices": false,  
    // required, boolean
    // Description: Indicates if default choices (if any) should be used.

    "Language": [],  
    // required, array[string]object, allowed value = []
    // Description: Translations of the question text for different languages.

    "NextChoiceId": <integer >= 1>,  
    // optional, integer
    // Description: The ID for the next choice to be added (if applicable).

    "NextAnswerId": <integer >= 1>  
    // optional, integer
    // Description: The ID for the next answer to be added (if applicable).
}
`

// Simplified question format
const textSimple = `{"QuestionText": ,"QuestionDescription": }`

// Default template for MATRIX question
// Fill in / Change fields: QuestionText, DataExportTag (optional), Selector (SL for single line, ML for multi line), QuestionDescription, Choices, Choice Order (optional), ForceResponse
const textDefault = {
    "QuestionText": "",  

    "DataExportTag": "",  

    "QuestionType": "TE",  

    "Selector": "SL",  

    "Configuration": {  

        "QuestionDescriptionOption": "UseText",  

        "TextPosition": "inline",  

        "ChoiceColumnWidth": 25,  

        "RepeatHeaders": "none",  

        "WhiteSpace": "ON",  

        "LabelPosition": "BELOW",  

        "NumColumns": 1,  

        "MobileFirst": true  
    },

    "QuestionDescription": "",  


    "Validation": {  

        "Settings": {

            "ForceResponse": "OFF"
            }
        },

    "DefaultChoices": false,  

    "Language": []
}


module.exports = { textQualtrics, textSimple, textDefault }