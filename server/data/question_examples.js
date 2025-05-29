const mcq1 = {
    "QuestionText": "Do you typically go to bed before 9pm?",
    "DataExportTag": "Q1",
    "QuestionType": "MC",
    "Selector": "SAVR",
    "SubSelector": "TX",
    "Configuration": {
      "QuestionDescriptionOption": "UseText"
    },
    "QuestionDescription":   
   "Indicate your usual bedtime routine.",
    "Choices": {
      "1": {
        "Display": "Yes"
      },
      "2": {
        "Display": "No"
      }
    },
    "ChoiceOrder": [
      "1",
      "2"
    ],
    "Validation": {
      "Settings": {
        "ForceResponse": "OFF",
        "Type": "None"
      }
    },
    "Language": [],
    "NextChoiceId": 3,
    "NextAnswerId": 1
  }


const mcq2 = {
    "QuestionText": "Please rate the following statements about your sleep habits:",
    "DataExportTag": "Q1",
    "QuestionType": "MC",
    "Selector": "MACOL",
    "SubSelector": "GR",
    "Configuration": {
      "QuestionDescriptionOption": "UseText",
      "NumColumns": 4
    },
    "QuestionDescription": "Indicate your agreement or disagreement with each statement.",
    "Choices": {
      "1": {
        "Display": "I usually wake up feeling refreshed."
      },
      "2": {
        "Display": "I have trouble falling asleep."
      },
      "3": {
        "Display": "I often wake up during the night."
      },
      "4": {
        "Display": "I find it difficult to stay awake during the day."
      }
    },
    "ChoiceOrder": [
      "1",
      "2",
      "3",
      "4"
    ],
    "Validation": {
      "Settings": {
        "ForceResponse": "OFF",
        "Type": "None"
      }
    },
    "Language": [],
    "NextChoiceId": 5,
    "NextAnswerId": 1
  }


  const textInput1 = {
    "QuestionText": "Please describe your typical sleep routine.",
    "DataExportTag": "Q1",
    "QuestionType": "TE",
    "Selector": "ML",
    "Configuration": {
      "QuestionDescriptionOption": "UseText"
    },
    "QuestionDescription": "Provide details about your bedtime, sleep duration, and morning habits.",
    "Validation": {
      "Settings": {
        "ForceResponse": "OFF",
        "Type": "None"
      }
    },
    "DefaultChoices": false,
    "Language": [],
    "NextChoiceId": 2,
    "NextAnswerId": 1
  }

const matrix1 = {
    "QuestionText": "Please rate the following statements about your sleep habits:",
    "DataExportTag": "MatrixQuestion1",
    "QuestionType": "Matrix",
    "Selector": "Likert",
    "SubSelector": "SingleAnswer",
    "Configuration": {
      "QuestionDescriptionOption": "UseText",
      "NumColumns": 4
    },
    "QuestionDescription": "Indicate your agreement or disagreement with each statement.",
    "Choices": {
      "1": {
        "Display": "I usually wake up feeling refreshed."
      },
      "2": {
        "Display": "I have trouble falling asleep."
      },
      "3": {
        "Display": "I often wake up during the night."
      },
      "4": {
        "Display": "I find it difficult to stay awake during the day."
      }
    },
    "ChoiceOrder": [
      "1",
      "2",
      "3",
      "4"
    ],
    "Answers": {
      "1": {
        "Display": "Strongly Agree"
      },
      "2": {
        "Display": "Agree"
      },
      "3": {
        "Display": "Neutral"
      },
      "4": {
        "Display": "Disagree"
      },
      "5": {
        "Display": "Strongly Disagree"
      }
    },
    "AnswerOrder": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "Validation": {
      "Settings": {
        "ForceResponse": "OFF",
        "Type": "None"
      }
    },
    "Language": [],
    "NextChoiceId": 5,
    "NextAnswerId": 6
  }


  const slider1 = {
    "ChoiceOrder": [
        "1",
        "2",
        "3",
        "4",
        "5"
    ],
    "Choices": {
        "1": {
            "Display": "1"
        },
        "2": {
            "Display": "2"
        },
        "3": {
            "Display": "3"
        },
        "4": {
            "Display": "4"
        },
        "5": {
            "Display": "5"
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
    "DataExportTag": "SliderQuestion1",
    "Labels": {},
    "Language": [],
    "NextAnswerId": 6,
    "NextChoiceId": 6,
    "QuestionDescription": "Please slide to select your preference.",
    "QuestionID": "QID1",
    "QuestionText": "How much does your sleep quality impact your academic performance? (1 being not at all, 5 being very much)",
    "QuestionType": "Slider",
    "RecodeValues": {
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5"
    },
    "Selector": "HSLIDER",
    "SubSelector": null,
    "Validation": {
        "Settings": {}
    }
}