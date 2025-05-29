import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Modal from "react-modal";
import QuestionDisplay from "../components/QuestionDisplay";
import "../App.css"

const History = () => {
  const { username } = useAuth(); // Get the username from AuthContext
  const [surveys, setSurveys] = useState([]);
  const [selectedSurveyQuestions, setSelectedSurveyQuestions] = useState([]); // To hold the array of questions
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal state

  const [loadingSurveys, setLoadingSurveys] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  // Fetch all surveys by the current user when the component mounts
  useEffect(() => {
    const fetchSurveys = async () => {
      setLoadingSurveys(true);
      try {
        const response = await axios.get(
          `http://localhost:5003/view-surveys/surveys/${username}`
        );
        // Reverse the surveys array to display the latest surveys first
        setSurveys(response.data.reverse());
      } catch (err) {
        setError("Failed to load survey history");
        console.error(err);
      } finally {
        setLoadingSurveys(false);
      }
    };
  
    fetchSurveys();
  }, [username]);

  // Handle fetching the survey details based on survey ID
  const handleViewSurvey = async (surveyId) => {
    setLoadingQuestions(true);
    try {
      const response = await axios.get(
        `http://localhost:5003/view-surveys/surveys/${surveyId}/questions`
      );
      setSelectedSurveyQuestions(response.data);
      setModalIsOpen(true);
    } catch (err) {
      setError("Failed to load survey details");
      console.error(err);
    } finally {
      setLoadingQuestions(false);
    }
  };

  // Handle closing the modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedSurveyQuestions([]); // Clear selected survey questions when closing modal
  };

  // Handle toggling the survey status
  const toggleSurveyStatus = async (surveyId, currentStatus) => {
    setLoading(true);
    let activateStatus = currentStatus === "Inactive"; // Toggle based on current status
    try {
      await axios.post("http://localhost:5003/view-surveys/toggle-status", {
        surveyId: surveyId,
        activate: activateStatus,
      });

      // Update the survey list with the new status
      setSurveys(
        surveys.map((survey) =>
          survey.Qualtrics_Survey_ID === surveyId
            ? {
                ...survey,
                SurveyStatus: activateStatus ? "Active" : "Inactive",
              }
            : survey
        )
      );
    } catch (err) {
      setError("Failed to toggle survey status");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting the survey
  const deleteSurvey = async (surveyId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this survey?"
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      await axios.delete(
        `http://localhost:5003/view-surveys/delete-survey/${surveyId}`
      );

      // Remove the deleted survey from the list
      setSurveys(
        surveys.filter((survey) => survey.Qualtrics_Survey_ID !== surveyId)
      );
    } catch (err) {
      setError("Failed to delete the survey");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Your Survey History</h1>
      {(loadingSurveys || loadingQuestions) && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loadingSurveys && (
        <div>
          {surveys.length === 0 ? (
            <p>No surveys found</p>
          ) : (
            <ul>
              {surveys.map((survey) => (
                <li key={survey.Survey_ID} className="question-box">
                  {/* Survey details */}
                  <h2>{survey.Survey_Name}</h2>

                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(survey.Date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Time:</strong> {survey.Time}
                  </p>
                  <p>
                    <strong>Link:</strong>{" "}
                    <a
                      href={survey.Qualtrix_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Qualtrics Survey
                    </a>
                  </p>
                  <p>
                    <strong>Status:</strong> {survey.SurveyStatus}
                  </p>

                  <button
                    onClick={() => handleViewSurvey(survey.Qualtrics_Survey_ID)}
                  >
                    View
                  </button>
                  {/* Other buttons */}
                  <button
                    onClick={() =>
                      toggleSurveyStatus(
                        survey.Qualtrics_Survey_ID,
                        survey.SurveyStatus
                      )
                    }
                  >
                    {survey.SurveyStatus === "Active"
                      ? "Deactivate"
                      : "Activate"}
                  </button>
                  <button
                    onClick={() => deleteSurvey(survey.Qualtrics_Survey_ID)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Modal for displaying selected survey details */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Survey Details"
        className="modal"
        overlayClassName="modal-overlay"
      >
        {loadingQuestions ? (
          <p>Loading survey questions...</p>
        ) : (
          <>
            <h2>Survey Questions</h2>
            <ul>
              {selectedSurveyQuestions.length === 0 ? (
                <p>No questions found for this survey</p>
              ) : (
                selectedSurveyQuestions.map((question, index) => (
                  <li key={index}>
                    <QuestionDisplay
                      question={question}
                      questions={selectedSurveyQuestions}
                      index={index}
                      onUpdate={() => {}}
                      onDelete={() => {}}
                      totalQuestions={selectedSurveyQuestions.length}
                      isEditable={false}
                    />
                  </li>
                ))
              )}
            </ul>
            <button onClick={closeModal}>Close</button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default History;

/*
<p><strong>Survey ID:</strong> {survey.Survey_ID}</p>
<p><strong>Survey Name:</strong> {survey.Survey_Name}</p>
<p><strong>Date:</strong> {new Date(survey.Date).toLocaleDateString()}</p>
<p><strong>Time:</strong> {survey.Time}</p>
<p><strong>Link:</strong> <a href={survey.Qualtrix_link} target="_blank" rel="noopener noreferrer">Qualtrics Survey</a></p>
<p><strong>Status:</strong> {survey.SurveyStatus}</p>
<button onClick={() => handleViewSurvey(survey.Qualtrics_Survey_ID)}>View Survey</button>
<button onClick={() => toggleSurveyStatus(survey.Qualtrics_Survey_ID, survey.SurveyStatus)}>
    {survey.SurveyStatus === "Active" ? "Deactivate" : "Activate"}
</button>
<button onClick={() => deleteSurvey(survey.Qualtrics_Survey_ID)}>
    Delete
</button>
*/
