# How to Change Program to Generate All Survey Questions

**DISCLAIMER:** This is just a general idea and might need more refinement to fully work. Gemini processing is very slow and performance will suffer greatly. The quality of questions will also suffer due to the increase in prompt intricacy.

## Steps to Modify Question Generation

1. **In `QuestionGenerationController.js`, add a new function** that inputs the following into Gemini:
    - Research information input from the user.
    - A request to generate any number of questions that can be of the following types: 
      - MCQ (Multiple Choice Question)
      - Matrix
      - Text-input
      - Slider
    - Ensure the questions are in simplified formats for easier processing.

2. **Extract the generated questions using regular expressions (regex).**

3. **Loop through the simplified questions** and prompt Gemini to format each question into Qualtrics format:
    - Use the templates for different question types, which can be found in the `data` folder.

4. **Store all the formatted questions in an array** and send the array to the frontend.

5. **Modify the frontend** to handle the display of an array of questions, rather than a single question.