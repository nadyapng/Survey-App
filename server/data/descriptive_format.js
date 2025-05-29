const descriptiveQualtrics = `{
    "Configuration": {
        // required, object
        // Description: Configurations for how the question should be displayed.

        "QuestionDescriptionOption": "UseText",
        // optional, string
        // Description: An optional user-provided field for question descriptions.
        // Allowed values: "UseText", "SpecifyLabel"

        "TextPosition": "inline",
        // optional, string
        // Description: Text position.
        // Allowed value: "inline"

        "ChoiceColumnWidth": 25,
        // optional, integer
        // Description: Value of column width.
        // Allowed value: 25

        "RepeatHeaders": "none",
        // optional, string
        // Description: Repeating of headers.
        // Allowed value: "none"

        "WhiteSpace": "ON",
        // optional, string
        // Description: If white space is allowed.
        // Allowed values: "ON", "OFF"

        "LabelPosition": "BELOW",
        // optional, string
        // Description: Position of label.
        // Allowed values: "BELOW", "SIDE"

        "NumColumns": <integer >= 1>,
        // optional, integer
        // Description: Number of columns.

        "MobileFirst": true
        // optional, boolean
        // Description: If questions should be formatted for use on a mobile device.
    },

    "DataExportTag": "DescriptiveTextQuestion",
    // required, string
    // Description: The tag to identify the question in exported data.

    "DefaultChoices": false,
    // required, boolean
    // Description: Indicates whether default choices are used.

    "Language": [],
    // required, array[string], allowed value: []
    // Description: Translations of questions.

    "NextAnswerId": <integer >= 1>,
    // optional, integer
    // Description: The next answer ID.

    "NextChoiceId": <integer >= 1>,
    // optional, integer
    // Description: The next choice ID.

    "QuestionDescription": <string>,
    // required, string, <= 100 characters
    // Description: Label to identify the question.

    "QuestionID": "QID1",
    // required, string, match pattern: "^QID[a-zA-Z0-9]+$"
    // Description: The unique identifier for the question.

    "QuestionText": <string>,
    // required, string, >= 0 characters, <= 1000 characters
    // Description: Text for the question.

    "QuestionType": "DB",
    // required, string
    // Allowed value: "DB"
    // Description: Defines the structure and purpose of the question.

    "Selector": "TB",
    // required, string
    // Allowed value: "TB"
    // Description: Defines the format used for collecting responses.

    "Validation": {
        // required, object
        // Description: Force respondents to answer a question or request that they consider answering the question before leaving the page.

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
    }
}
`


// Simplified question format
const descriptiveSimplified = `{"QuestionText": ,"QuestionDescription": }`

// Default template for DESCRIPTIVE text block
// Fill in / Change fields: DataExportTag (Optional), QuestionText, ForceResponse, QuestionDescription
const descriptiveDefault = {
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

    "DataExportTag": "DescriptiveTextQuestion",

    "DefaultChoices": false,


    "Language": [],


    "QuestionDescription": "",

    "QuestionID": "QID1",


    "QuestionText": "Text block",

    "QuestionType": "DB",


    "Selector": "TB",

    "Validation": {

        "Settings": {

            "ForceResponse": "OFF"

            
        }
    }
}


module.exports = { descriptiveQualtrics, descriptiveSimplified, descriptiveDefault }