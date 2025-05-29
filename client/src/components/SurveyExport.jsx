import { useState, useEffect } from 'react';
import axios from 'axios';

const SurveyExport = ({ surveyId, onSurveyDataLoaded }) => {
    const [loading, setLoading] = useState(false);
    const [progressId, setProgressId] = useState(null);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    //Note qualtrics api makes it very complicated to export the data so you need like a 3 step process which are below, they are all required to get the data
    
    // Step 1: STart the survey export
    const initiateExport = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log("Initiating export with survey ID:", surveyId);  // Add a log for debugging

            // const response = await axios.post('http://localhost:5003/api/qualtrics/export-survey');
         
            const response = await axios.post('http://localhost:5003/api/qualtrics/export-survey', { surveyId }); // Added the surveyID should work? 
            setProgressId(response.data.progressId);
            setStatus('inProgress');
        } catch (error) {
            console.error('Error initiating survey export:', error);
            setLoading(false);
            setError('Error initiating export');
        }
    };

    // Step 2: ChEck if it is done by polling the survey export
    const checkProgress = async () => {
        if (!progressId) return;
        try {
            const response = await axios.post('http://localhost:5003/api/qualtrics/check-progress', { progressId, surveyId });
            const { status, fileId } = response.data;
            setStatus(status);

            if (status === 'complete') {
                // Download the file once the status is complete
                await downloadFile(fileId, surveyId); 
            } else if (status === 'failed') {
                setLoading(false);
                setError('Export failed');
            } else {
                // Check every 5 seconds to see if the polling is complete
                setTimeout(checkProgress, 5000);
            }
        } catch (error) {
            console.error('Error checking export progress:', error);
            setLoading(false);
            setError('Error checking progress');
        }
    };

   // Step 3: Fetch the JSON content, pass it to the parent component for processing
    const downloadFile = async (fileId) => {
        try {
            const response = await axios.get('http://localhost:5003/api/qualtrics/download-survey', {
                params: { fileId , surveyId}
            });

            const jsonData = response.data; // This will be the JSON data
            onSurveyDataLoaded(jsonData); // Pass the data back to the parent
            setLoading(false);
        } catch (error) {
            console.error('Error downloading survey data:', error);
            setLoading(false);
            setError('Error downloading survey data');
        }
    };

    //Below are the calling of the 3 steps of intitiate progress, because of how qualitrics manages things, you need useEffect to keep calling checkProgress
    const handleExport = async () => {
        await initiateExport();
    };
    useEffect(() => {
        if (progressId) {
            checkProgress();
        }
    }, [progressId]);

    return (
        <div>
            <h1>View Visualisation</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading ? <p>Display in progress...</p> : <button  onClick={handleExport}>Display</button>}
        </div>
    );
};

export default SurveyExport;
