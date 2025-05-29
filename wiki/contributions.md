# Individual Contributions

## Week 2

### Leon Lee
**General Contributions**
- Setup the Bitbucket
- Wrote 20240806-Tutor and 20240811-Group meeting minutes

**Doomsayer**
- Pointed out potential issues of the project such as:
  - If we split into 3 groups (frontend, backend, AI), there may be issues with integration since none of us have full stack experience
  

### Rueien Tan
**General Contributions**
- Hosted Week 2 zoom meeting
- Hosted Week 3 zoom meeting 
- Created Scope page for slides
- Created meeting minutes for 20240818-Group meeting minutes

**Customer Liason**
- Helped write draft to help comminicate with client


### Nadya Ee Png
**General Contributions**
- Meeting minutes for client meeting (20240809)
- Learning required tech stack
**Tracker**
- Added user stories and tasks to JIRA kanban
- Ensured kanban was up to date according to group progress

### Frank(Qiufei) Lai
**General Contributions**
- Figma prototype design for the project
**Manager**
- Determine frontend frameworks and templates
- Ensure sequence aligns with the client needs

### Changxu Liu
**General Contributions**

**Tester**

### Rui Wang
**General Contributions**
- 

**Programmer**

## Week 3

### Leon Lee

**General Contributions**
- Wrote the 20240813-Tutor, 20240813-Tutorial and 20240816-Client minutes
- In the process of learning the required frameworks/programming languages
- Created some of the initial user stories

**Tracker**
- Made sure everyone knew the stuff that we hand to hand in this week, and made sure everything was submitted on time
- Updated Jira backlog and ensured team velocity was good

### Nadya Ee Png
**General Contributions**
- Created user stories and tasks
- Created sequence diagram for program flow

**Programmer**
- Learning required tech stack
- Practiced making react app and backend servers

### Frank(Qiufei) Lai
**General Contributions**
- Created React prototype for the project
**Customer Liason**
- Confirmed with the client about fucntion reqcuirements
- Contacted Customer for UI improvements

## Week 4

### Leon Lee

**General Contributions**
- Wrote 20240821-Tutor, 20240821-Tutorial and 20240823-Client minutes
- Tested the Gemini LLM API to ensure it'll work for question generation
- Trained the Gemini LLM so that we don't need to tell it to follow the Qualtrics API format every time

**Tracker**
- Made sure everyone knew the stuff that we hand to hand in this week, and made sure everything was submitted on time
- Updated Jira backlog and ensured team velocity was good

### Nadya Ee Png
**General Contributions**
- Created user stories and tasks
- Created sequence diagram for program flow

**Doomsayer**
- Pointed out and discussed potential issues:
  - Database schema issues with qualtrics integration
  - Issues with using Gemini with Nodejs instead of Python (solved)
  - Risk with sharing API key on git (solved)

### Frank(Qiufei) Lai
**General Contributions**
- 
**Programmer**
- Confirmed with the client about fucntion reqcuirements
- Contacted Customer for UI improvements

## Week 5

### Leon Lee

**General Contributions**
- Wrote 20240830-Client meeting minutes
- Continued tuning the Gemini LLM so that we don't need to tell it to follow the Qualtrics API format every time and to reduce the risk of invalid formatting
- Refactored the frontend code to be more modular and changed to Vite
- Created input boxes for the research question and additional context, and sends them as a JSON to the backend
- Created the functionality to display the generated questions and their answers/choices on the home page
- Helped code review pull requests made by other team members

**Manager**
- Gave deadlines for the group report to ensure that team members are doing work
- We ran into an issue with the Bitbucket repository disappearing, and I fixed the issue while ensuring that our tutor was aware of this issue


## Week 6

### Leon Lee

**General Contributions**
- Wrote 20240903-Tutor meeting minutes

**Customer Liason**
- Replied to the client's email to provide him with the info he needs to submit to the unit coordinator

### Nadya Ee Png 

**General Contributions**
- Prepared for client demo

**Programmer**
- Continued fixing formatting issues with question generation and general debugging


## Week 7

### Leon Lee
**General Contributions**
- Created Jira board for next phase of the development process
- Demo'ed the code during the client demo
- Implemented the edit, adding, delete for all the question types
- Implemented the frontend for publishing questions
- Created buttons for saving and creating manual questions (actual functionality hasn't been implemented yet)
- Identified and fixed the issue of Gemini generating low quality questions

**Tester**
- Started learning testing frameworks for frontend using an online course (fullstackopen.com)

## Week 8
### Leon Lee
**General Contributions**

**Doomsayer**
- Pointed out issues with the schema having a userID and username, which is redundant as username needs to be unique anways, so we can just make that the primary key
- Pointed out issues with losing the generated questions after changing pages
  - Will be fixed using cookies and/or localstorage

