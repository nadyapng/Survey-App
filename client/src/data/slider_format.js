const sliderPrompt = `{
    "ChoiceOrder": ["1", "2"],
    // required, array[string]
    // Description: The order in which the choices are to be displayed.

    "Choices": {
        // required, object
        // Description: Defines the selections for the question.
        "1": {"Display": "choice 1"},
        "2": {"Display": "choice 2"}
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

    "DataExportTag": "SliderQuestion1",
    // required, string
    // Description: The tag used to identify the question in exported data.

    "Labels": {
        // required, object
        // Description: Defines the labels associated with the slider options.
        "Display": "Select your preference"
    },

    "Language": ["en"],
    // required, array[string]
    // Description: Translations of the question text.

    "NextAnswerId": 3,
    // required, integer
    // Description: The next answer ID for the slider.

    "NextChoiceId": 3,
    // required, integer
    // Description: The next choice ID for the slider.

    "QuestionDescription": "Please slide to select your preference.",
    // required, string, <= 100 characters
    // Description: The description of the question.

    "QuestionID": "QID1",
    // optional, string, match pattern: "^QID[a-zA-Z0-9]+$"
    // Description: The unique identifier for the question.

    "QuestionText": "On a scale of 1 to 5, how satisfied are you with our service?",
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

    "SubSelector": "SingleAnswer",
    // required, string, allowed values: "SingleAnswer", "DL", "GR", "DND", "Long", "Medium", "MultipleAnswer", "Columns", "NoColumns", "Short", "TX", "TXOT", "WOTXB", "WOTB", "WTB", "WTXB", "WVTB"
    // Description: Specifies the sub-selector for the question.

    "Validation": {
        // required, object
        // Description: Validation settings for the question.

        "Settings": {
            // required, object
            // Description: Settings for forced responses and custom validation.

            "ForceResponse": "true",
            // optional, string
            // Description: Indicates if a forced response is required.

            "ForceResponseType": "BooleanExpression",
            // optional, string
            // Description: Specifies the type of forced response.

            "Type": "SliderValidation",
            // optional, string
            // Description: The type of validation applied.

            "CustomValidation": {
                // optional, object
                // Description: Custom validation settings for the slider question.

                "Logic": {
                    // required, object
                    // Description: Logic to direct respondents based on their answers.

                    "Type": "BooleanExpression"
                    // required, string, allowed value is "BooleanExpression"
                    // Description: Type of branch logic.
                },

                "Message": {
                    // required, object
                    // Description: Message to display if validation fails.

                    "description": "Please select a valid option.",
                    // optional, string
                    // Description: A description for the custom validation message.

                    "libraryID": "User12345",
                    // required, User Id or Group Id
                    // Description: The unique identifier for a specific user or group.

                    "messageID": "MS_abcdefghij1",
                    // required, string, match pattern: "^MS_[a-zA-Z0-9]{11,15}$"
                    // Description: The unique identifier for the message.

                    "subMessageID": "VE_FORCE_RESPONSE"
                    // required, string, allowed values: List of validation error message codes.
                }
            }
        }
    }
}
`