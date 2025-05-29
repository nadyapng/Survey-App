const sliderQualtrics = `{
    "ChoiceOrder": (e.g. ["1", "2"]),
    // required, array[string]
    // Description: The order in which the choices are to be displayed.

    "Choices": {
        // required, object
        // Description: Selections for a question. Each choice defines one slider on the question.
        "1": {"Display": "Move the slider to your answer"}
    },

    "Configuration": {
        // required, object
        // Description: Configurations for how the question should be displayed.

        "QuestionDescriptionOption": "UseText",
        // optional, string, allowed values: "UseText", "SpecifyLabel"
        // Description: An optional user-provided field for question descriptions.

        "TextPosition": "inline",
        // optional, string, allowed value: "inline"
        // Description: Specifies the text position.

        "ChoiceColumnWidth": 25,
        // optional, integer, allowed value: 25
        // Description: Specifies the column width.

        "RepeatHeaders": "none",
        // optional, string, allowed value: "none"
        // Description: Configures whether headers should be repeated.

        "WhiteSpace": "ON",
        // optional, string, allowed values: "ON", "OFF"
        // Description: Specifies if white space is allowed.

        "LabelPosition": "BELOW",
        // optional, string, allowed values: "BELOW", "SIDE"
        // Description: Specifies the position of the label.

        "NumColumns": 1,
        // optional, integer
        // Description: Number of columns in the display.

        "MobileFirst": true
        // optional, boolean
        // Description: Indicates if the question should be formatted for use on a mobile device.
    },

    "DataExportTag": "SliderQuestion",
    // required, string
    // Description: The tag used to identify the question in exported data.

    "Labels": {
        // required, object (can be empty object)
        // Description: Defines the labels associated with the slider options.
        // Format should be "<choice>": {"Display: "<label text>"} for each choice
    },

    "Language": [],
    // required, array[string]
    // Description: Translations of the question text.

    "NextAnswerId": <integer >= 1>,
    // required, integer
    // Description: The next answer ID for the slider.

    "NextChoiceId": <integer >= 1>,
    // required, integer
    // Description: The next choice ID for the slider.

    "QuestionDescription": <string>,
    // required, string, <= 100 characters
    // Description: The description of the question.

    "QuestionID": "QID1",
    // optional, string, match pattern: "^QID[a-zA-Z0-9]+$"
    // Description: The unique identifier for the question.

    "QuestionText": <string>,
    // required, string, >= 0 characters, <= 1000 characters
    // Description: The text of the question.

    "QuestionType": "Slider",
    // required, string, allowed value: "Slider"
    // Description: Specifies the type of the question.

    "RecodeValues": {
        // optional, object
        // Description: Numeric mapping of the question choices.
        "1": "1",
        "2": "2",
        "3": "-1000"
    },

    "Selector": "HSLIDER",
    // required, string, allowed values: "HBAR", "HSLIDER", "STAR"
    // Description: Specifies the slider type.

    "SubSelector": null,
    // required, string, allowed values: null
    // Description: Specifies the sub-selector for the question.

    "Validation": {
        // required, object
        // Description: Validation settings for the question.

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
`


// Simplified question format
const sliderSimple = `{"QuestionText": ,"QuestionDescription": ,"min": , "max": ,"step": }`

// Default template for MATRIX question
// Fill in / Change fields: QuestionText, DataExportTag (optional), QuestionDescription, Choices, Choice Order (optional), Answer Order (optional), Answers, ForceResponse
const sliderDefault = {
    "ChoiceOrder": ["1", "2"],

    "Choices": {
        "1": {"Display": "Move the slider to your answer"}
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

    "DataExportTag": "SliderQuestion",

    "Labels": {},

    "Language": [],

    "NextAnswerId": 1,

    "NextChoiceId": 1,

    "QuestionDescription": "",


    "QuestionText": "Slider Question Text",


    "QuestionType": "Slider",


    "RecodeValues": {},

    "Selector": "HSLIDER",

    "SubSelector": null,

    "Validation": {

        "Settings": {

            "ForceResponse": "OFF"
        }
    }
}


module.exports = { sliderQualtrics, sliderSimple, sliderDefault }