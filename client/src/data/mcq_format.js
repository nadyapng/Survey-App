const promptMCQ = `{
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

        "NumColumns": 1,
        // optional, integer
        // Description: Number of columns.

        "MobileFirst": true
        // optional, boolean
        // Description: If questions should be formatted for use on a mobile device.
    },

    "DataExportTag": "MultipleChoiceQuestion1",
    // required, string
    // Description: The tag to identify the question in exported data.

    "Language": ["en"],
    // required, array[string]
    // Description: Translations of questions.

    "NextAnswerId": 3,
    // optional, integer
    // Description: The next answer ID.

    "NextChoiceId": 3,
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

    "Randomization": "DL",
    // optional, string
    // Description: Randomize choices within a question.
    // Allowed values: "DL", etc.

    "RecodeValues": {
        "1": "1",
        "2": "2",
        "3": "-1000"
    },
    // optional, object
    // Description: Numeric mapping of question choices.

    "Selector": "DL",
    // required, string
    // Allowed values: "DL", "GRB", "MACOL", "MAHR", etc.
    // Description: Defines the format used for collecting responses.

    "SubSelector": "GR",
    // required, string
    // Allowed values: "GR", "TX", etc.
    // Description: Refines the Selector by providing additional options or variations for response collection.

    "Validation": {
        // required, object
        // Description: Force respondents to answer a question or request that they consider answering the question before leaving the page.

        "Settings": {
            // required, object
            // Description: Settings for forced responses and custom validation.

            "ForceResponse": "true",
            // optional, string
            // Description: The forced response.

            "ForceResponseType": "BooleanExpression",
            // optional, string
            // Description: The type of forced response.

            "Type": "SliderValidation",
            // optional, string
            // Description: Settings type.

            "CustomValidation": {
                // optional, object
                // Description: Additional validation to direct respondents to answer questions in a certain way.

                "Logic": {
                    // required, object
                    // Description: Send respondents down different paths in the survey.

                    "Type": "BooleanExpression"
                    // required, string
                    // Allowed value: "BooleanExpression"
                    // Description: Type of branch logic.
                },

                "Message": {
                    // required, object
                    // Description: Message to display when respondents don't fulfill the validation.

                    "description": "Please ensure you select an option.",
                    // optional, string
                    // Description: A user-provided description of the custom validation.

                    "libraryID": "User67890",
                    // required, User Id or Group Id
                    // Description: The unique identifier for a specific user.

                    "messageID": "MS_klmnopqrst2",
                    // required, string, match pattern: "^MS_[a-zA-Z0-9]{11,15}$"
                    // Description: The unique identifier for the message.

                    "subMessageID": "VE_FORCE_RESPONSE"
                    // required, string
                    // Allowed values: A list of validation error message codes.
                }
            }
        }
    }
}
`

module.exports = promptMCQ