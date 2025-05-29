const mcqQualtrics = `{
    "ChoiceOrder": [
        "1",
        "2"
    ],
    // required, array[string]
    // Description: The order the choices are to be displayed in.

    "Choices": {
        "1": {
            "Display": "choice 1"
        },
        "2": {
            "Display": "choice 2"
        }
    },
    // required, object
    // Description: Selections for a question.

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

    "DataExportTag": "MultipleChoiceQuestion1",
    // required, string
    // Description: The tag to identify the question in exported data.

    "Language": [],
    // required, array[string], allowed value = []
    // Description: Translations of questions.

    "NextAnswerId": <integer >= 1>,
    // optional, integer
    // Description: The next answer ID.

    "NextChoiceId": <integer >= 1>,
    // optional, integer
    // Description: The next choice ID.

    "QuestionDescription": "Please select one of the following choices.",
    // required, string, <= 100 characters
    // Description: Label to identify the question.

    "QuestionID": "QID2",
    // optional, string, match pattern: "^QID[a-zA-Z0-9]+$"
    // Description: The unique identifier for the question.

    "QuestionText": "What is your preferred choice?",
    // required, string, >= 0 characters, <= 1000 characters
    // Description: Text for the question.

    "QuestionType": "MC",
    // required, string
    // Allowed value: "MC"
    // Description: Defines the structure and purpose of the question and determines how the question is presented to respondents.

    "Randomization": "",
    // optional, string
    // Description: Randomize choices within a question.
    // Allowed values: "Advanced", "All", "None", "ScaleReversal", ""

    "RecodeValues": {},
    // optional, object
    // Description: Numeric mapping of question choices.
    // Example: {"1":"1","2":"2","3":"-1000"}

    "Selector": "SAVR",
    // required, string
    // Allowed values: "DL"(Dropdown List), "SAVR"(Single Answer Vertical Row)
    // Description: Defines the format used for collecting responses.

    "SubSelector": "TX",
    // required, string
    // Allowed values: "TX"(With Text)
    // Description: Refines the Selector by providing additional options or variations for response collection.

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
const mcqSimple = `{"QuestionText": ,"QuestionDescription": ,"Choices": }`

// Default template for MCQ
// Fill in / Change fields: Choices, DataExportTag (Optional), QuestionText, ForceResponse 
const mcqDefault = {
    "ChoiceOrder": [
        "1",
        "2"
    ],

    "Choices": {
        "1": {
            "Display": "choice 1"
        },
        "2": {
            "Display": "choice 2"
        }
    },

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

    "DataExportTag": "MultipleChoiceQuestion1",

    "Language": [],


    "QuestionDescription": "Please select one of the following choices.",

    "QuestionID": "QID2",

    "QuestionText": "What is your preferred choice?",

    "QuestionType": "MC",

    "Randomization": "",

    "RecodeValues": {},

    "Selector": "SAVR",

    "SubSelector": "TX",

    "Validation": {

        "Settings": {

            "ForceResponse": "OFF"

            }
        }
    }



module.exports = { mcqSimple, mcqQualtrics, mcqDefault }