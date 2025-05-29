const dotenv = require("dotenv");
// dotenv.config({ path: '../../../.env' });
const axios = require('axios')

// .ENV FILE PARAMETERS (PLEASE SET THESE UP IN YOUR LOCAL MACHINE)
// SET UP API KEY:
// 1. GET YOUR API KEY FROM YOUR QUALTRICS ACCOUNT
// 2. ADD THIS LINE IN YOUR .ENV FILE: QUALTRICS_API_KEY=<REPLACE WITH YOUR API KEY>
const apiToken = process.env.QUALTRICS_API_KEY; 
// SET UP BASE URL FOR SURVEY LINKS
// Paste this into your .env file: ANON_LINK_URL=https://sydney.au1.qualtrics.com/jfe/form/
// The url should be the same for all usyd accounts but will have to be changed if non-usyd account is running the server
const anonLinkURL = process.env.ANON_LINK_URL   

const dataCenter = "au1"; // Check if you have the same data centre (should be the same if we are all using uni accounts)



// Base url for qualtrics API endpoints
const baseUrl = `https://${dataCenter}.qualtrics.com/API/v3/survey-definitions`;
// Headers for requests
const headers = {
    "x-api-token": apiToken,
    "Content-Type": "application/json",
    "Accept": "application/json"
};

// base survey generation
const createSurvey = async (surveyName) => {
  // Data for survey creation
  const data = {
    "SurveyName": surveyName, // CHANGE THIS TO SURVEY NAME THAT YOU WANT
    "Language": "EN",
    "ProjectCategory": "CORE"
  };
  // Send request
  try {
      const response = await axios.post(baseUrl, data, { headers });
      console.log("Survey created")
      return response.data.result.SurveyID  // return surveyID
      // res.send(response.data);
  } catch (error) {
    // Request error
      console.error('Error creating survey:', error);
      return null
  }
};



// Headers for request
  const headers2 = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-API-TOKEN':apiToken
 };
 
// // CHANGE THIS TO THE SURVEY ID OF YOUR SURVEY THAT YOU WANT TO TEST WITH
// const surveyId = "SV_7R0uc1Gjf40I73M";

// // URL endpoint for new question
// const baseUrl_newQuestion = `https://${dataCenter}.qualtrics.com/API/v3/survey-definitions/${surveyId}/questions`

// Add question for survey
const createQuestion = async (surveyID, question) => {
    // Define request 
    const options = {
        method: 'POST',
        url: `https://${dataCenter}.qualtrics.com/API/v3/survey-definitions/${surveyID}/questions`, // surveyId depends on what you put on top
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-API-TOKEN': apiToken
        },
        data: question // CHANGE THIS TO A VARIABLE THAT CONTAINS THE QUESTION YOU WANT TO ADD

      };
      
      // Send request and wait for response
      try {
        const { data } = await axios.request(options);
        console.log(data);
        return data
        
      } catch (error) {
        console.error(error);
        return null
      }
      
}


// NOT SURE IF NECESSARY
// Get survey information based on survey id
const getSurvey = async (surveyId) => {
    // Define request
    const options = {
        method: 'GET',
        url: `https://${dataCenter}.qualtrics.com/API/v3/survey-definitions/${surveyId}`,
        headers: {Accept: 'application/json', 'X-API-TOKEN': apiToken}
      };
      
      try {
        const { data } = await axios.request(options);
        console.log(data);
        return data;
      } catch (error) {
        console.error(error.errorCode);
        return null;
      }
}


// Get specific question on survey based on question id
const getQuestion = async (req, res) => {
    // TODO get surveyId from request (currently hardcoded value)
    // questionId given in request
    const questionId = req.body.questionId
    const surveyId = req.body.surveyId
    // Define request
    const options = {
        method: 'GET',
        url: `https://${dataCenter}.qualtrics.com/API/v3/survey-definitions/${surveyId}/questions/${questionId}`,
        headers: {Accept: 'application/json', 'X-API-TOKEN': apiToken}
      };
      // Send request 
      try {
        const { data } = await axios.request(options);
        // console.log(data);
        // console.log(data.result.Validation.Settings.CustomValidation) // DEBUG
        // console.log(data.result.Choices) //DEBUG
        // console.log(data.result.Validation) // DEBUG
        // res.json(data.body)
        res.status(200).send(data)
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching question' })
      }

      
}


// Activate/Deactivate survey for getting responses (need to activate surveys before distribution)
const updateSurveyStatus = async (surveyId, activateSurvey) => {
  // Define payload
  const payload = {
    SurveyStatus: activateSurvey? "Active" : "Inactive"
  }

  try {
    // Send request
    const response = await axios.put(`https://${dataCenter}.qualtrics.com/API/v3/survey-definitions/${surveyId}/metadata`, payload, {
        headers: {
            'X-API-TOKEN': apiToken,
            'Content-Type': 'application/json'
        }
    });
    // Success
    return response

  } catch (error) {
      // Handle errors here
      console.error('Error updating survey metadata', error);
      return null
  }

}


// // Function to create distribution link for survey
// const createDistribution = async (surveyId) => {
//   const payload = {
//       surveyId: surveyId,  
//       linkType: "Anonymous",  // Generate anonymous survey link for distribution
//       description: `distribution ${Date()}`,
//       action: "CreateDistribution",
//       // expirationDate: , // Add expiration date if needed (default is 60 days)
//       mailingListId: mailingListId
//   };

//   console.log(payload) // DEBUG
//   try {
//       const response = await axios.post('https://env.qualtrics.com/API/v3/distributions', payload, {
//           headers: {
//               'X-API-TOKEN': apiToken,
//               'Content-Type': 'application/json'
//           }
//       });

//       return response
//   } catch (error) {
//       // Handle errors here
//       console.error('Error creating distribution:', error);
//       return null
//   }
// };


// Function to get anonymous survey link for participants to fill out
const getAnonLink = (surveyId) =>  {
  return `${anonLinkURL}${surveyId}`
}


// Function to delete a survey
const deleteSurvey = async(surveyId) => {
  const options = {
    method: 'DELETE',
    url: `https://${dataCenter}.qualtrics.com/API/v3/survey-definitions/${surveyId}`,
    headers: {Accept: 'application/json', 'X-API-TOKEN': apiToken}
  };

  try {
    const { data } = await axios.request(options);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}


// Get all questions in given survey
const getQuestions = async (surveyId) => {
  const options = {
    method: 'GET',
    url: `https://${dataCenter}.qualtrics.com/API/v3/survey-definitions/${surveyId}/questions`,
    headers: {Accept: 'application/json', 'X-API-TOKEN': apiToken}
  };
  
  try {
    const { data } = await axios.request(options);
    return data
  } catch (error) {
    console.error(error);
    return null
  }
}

//  RESULT EXPORT FUNCTIONS
// Step 1: Initilises the exprot response, this is used inside of the component for downloading the survey
const initiateResponseExport = async (req, res) => {
  const { surveyId } = req.body; //this is suppose to get the surveyIDD you sent form frontend
  console.log('API Token:', apiToken);
  console.log('Data Center:', dataCenter);
  console.log('Survey ID:', surveyId);

  const options = {
    method: 'POST',
    url: `https://${dataCenter}.qualtrics.com/API/v3/surveys/${surveyId}/export-responses`,
    headers: {
      Accept: 'application/json',
      'X-API-TOKEN': apiToken,
      'Content-Type': 'application/json'
    },
    data: {
      format: 'json', // Changed from 'csv' to 'json'
      compress: false // Added to get the file uncompressed
    }
  };
  
  console.log('Request Headers:', options.headers);

  try {
    console.log('Initiating survey export...');
    const { data } = await axios.request(options);
    const progressId = data.result.progressId;
    res.status(200).json({ progressId, surveyId });
    console.log('Export initiated with progressId:', progressId);  // Log this in Step 1

  } catch (error) {
    console.error("Error initiating survey response export:", error.response?.data || error.message);
    res.status(500).json({ message: 'Error initiating survey response export' });
  }
};


// Step 2: for checking if the survey is ready yet
const checkExportProgress = async (req, res) => {
  const { progressId, surveyId } = req.body;
  console.log('Survey ID:', surveyId);
  const url = `https://${dataCenter}.qualtrics.com/API/v3/surveys/${surveyId}/export-responses/${progressId}`;

  try {
      console.log('Checking survey export progress for progressId:', progressId);
      const progressResponse = await axios.get(url, {
          headers: {
              'X-API-TOKEN': apiToken,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
      });
      const status = progressResponse.data.result.status;
      console.log('Export progress status:', status);

      if (status === 'complete') {
          const fileId = progressResponse.data.result.fileId;
          res.status(200).json({ status, fileId , surveyId});
      } else {
          res.status(200).json({ status, surveyId });
      }
  } catch (error) {
      console.error("Error checking survey response export progress:", error.response?.data || error.message);
      res.status(500).json({ message: 'Error checking export progress' });
  }
};



// Step 3: once step 2 is confirmed downloads the survye 
const downloadSurveyResponses = async (req, res) => {
  const { fileId, surveyId } = req.query; // Changed from req.body to req.query
  const url = `https://${dataCenter}.qualtrics.com/API/v3/surveys/${surveyId}/export-responses/${fileId}/file`;

  try {
      console.log('Downloading survey responses for fileId:', fileId);
      const response = await axios.get(url, {
          headers: {
              'X-API-TOKEN': apiToken,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          responseType: 'json' // Since we're exporting in JSON format
      });

      res.json(response.data); // Send the JSON data directly to the frontend
  } catch (error) {
      console.error("Error downloading survey responses:", error.response?.data || error.message);
      res.status(500).json({ message: 'Error downloading survey responses' });
  }
};
// Step X: Get survey definition by survey ID
const getSurveyDefinition = async (req, res) => {
  const {surveyId} = req.query;
  const url = `https://${dataCenter}.qualtrics.com/API/v3/survey-definitions/${surveyId}`;

  try {
    console.log(`Fetching survey definition for surveyId: ${surveyId}`);
    
    const response = await axios.get(url, {
      headers: {
        'X-API-TOKEN': apiToken,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    console.log(`Survey definition fetched successfully for surveyId: ${surveyId}`);
    // Log the survey definition to the console (just a brief message)
    console.log(`Survey definition fetched successfully, writing output to file...`);

    res.json(response.data.result); // Send the survey definition to the frontend
  } catch (error) {
    console.error(`Error fetching survey definition for surveyId: ${surveyId}`, error.response?.data || error.message);
    res.status(500).json({ message: 'Error fetching survey definition' });
  }
};

//Get list of surveys
const getAllSurveys = async (req, res) => {
  const url = `https://${dataCenter}.qualtrics.com/API/v3/surveys`;

  try {
    const response = await axios.get(url, {
      headers: {
        'X-API-TOKEN': apiToken,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const surveys = response.data.result.elements;
    res.status(200).json(surveys);
  } catch (error) {
    console.error('Error fetching all surveys:', error);
    res.status(500).json({ message: 'Error fetching surveys' });
  }

};


module.exports = {getAllSurveys, createSurvey, createQuestion, getSurvey, getQuestion, updateSurveyStatus, getAnonLink, initiateResponseExport, checkExportProgress,downloadSurveyResponses, deleteSurvey, getQuestions,getSurveyDefinition }

