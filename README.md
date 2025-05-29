# Handover Documentation

## Link to the Repository
https://bitbucket.org/soft3888-tu12-04-h04154/survey-app/src/main/

## File Structure Explanation

**client:** contains the code for the frontend

**coverage:** contains the coverage report for the tests

**docs:** contains relevant diagrams for the program

**handover:** contains documentation for the client handover process

**minutes:** contains meeting minutes for all client/group meetings

**server:** contains the code for the backend. The .env file with API keys is in this folder

**wiki:** contains admin documents required by the university

**.gitignore:** gitignore file 

**package-lock.json:** ensures the same dependencies are installed across different environments

**package.json:** contains the required packages and start scripts for the program

**README.md:** contains some basic information about the team and project

**start_database.sql:** the database schema

**start.py:** script to start the program


## Program Setup
### Introduction
- Please make sure you are on/download the `main` branch, as that contains the latest program code

### API Keys
- In the `server` folder, you will need to create an `.env` file, which will contain the relevant API keys. The file must follow this format:

```
GOOGLE_API_KEY=YOUR_API_KEY_HERE
QUALTRICS_API_KEY=YOUR_API_KEY_HERE
ANON_LINK_URL=https://sydney.au1.qualtrics.com/jfe/form/
```

- The GOOGLE_API_KEY will be your Gemini API key
    - You can get a Gemini API key via this link: https://ai.google.dev/gemini-api/docs/api-key
- The QUALTRICS_API_KEY will be your Qualtrics API key
    - You can get your Qualtrics API key via this link: https://www.qualtrics.com/support/integrations/api-integration/overview/#GeneratingAnAPIToken
- The ANON_LINK_URL will be the URL for your qualtrics. The example link is the USYD link. You will have to change this if your Qualtrics API key is not tied to USYD. The subdomain ('sydney' for USYD) will be different. The daata centre ('au1' for Australia) might be different depending on region.

### Installing Node.js
- Please follow the instructions in this link to install Node.js (npm will also be installed)
    - https://nodejs.org/en/download/package-manager/

### Installing Python 3
- Please follow the instructions in this link to install Python 3
    - https://www.python.org/downloads/


## Running the Program
- Once you have the `.env` file set and Node.js installed, you can start the program
- Ensure you are in the root directory of the project (`survey-app`)
- Run the command `python3 start.py`
    - This will install all dependencies and start the frontend/backend
- To access the program, go to `http://localhost:4173/`

