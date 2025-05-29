import { useState, useEffect } from 'react';
import SurveyExport from '../components/SurveyExport';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from 'axios';
import styles from '../styles/DataVisualization.module.css';

import { useAuth } from '../context/AuthContext'; 
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);



const DataVisualization = () => {
  const [tableData, setTableData] = useState({ columns: [], rows: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [chartsData, setChartsData] = useState([]); 
  const [textResponses, setTextResponses] = useState([]); // For text-based responses
  const [currentTextPage, setCurrentTextPage] = useState(1); // Pagination for text responses
  const [dataLoaded, setDataLoaded] = useState(false);

  //Below handles the retrieval of surveys, this is for user to choose a list of survey
  const [surveys, setSurveys] = useState([]);
  const [selectedSurveyId, setSelectedSurveyId] = useState('');

  const { username } = useAuth();
  const [showTable, setShowTable] = useState(false);

  const createSliderChart = (sliderValues, questionText, charts) => {
    // Define the full slider range
    const minSliderValue = 0;
    const maxSliderValue = 100;
    const numBins = 10;
  
    // Calculate bin width
    const binWidth = (maxSliderValue - minSliderValue) / numBins;
  

    const bins = Array(numBins).fill(0);
    const binLabels = [];

    const binEdges = [];
    for (let i = 0; i <= numBins; i++) {
      binEdges.push(minSliderValue + i * binWidth);
    }

    sliderValues.forEach((value) => {

      if (value < minSliderValue || value > maxSliderValue) {
        return;
      }
  

      let binIndex = Math.floor((value - minSliderValue) / binWidth);
      if (binIndex >= numBins) {
        binIndex = numBins - 1; 
      }
      bins[binIndex]++;
    });
  

    for (let i = 0; i < numBins; i++) {
      const binStart = binEdges[i];
      const binEnd = binEdges[i + 1];
      binLabels.push(`${binStart.toFixed(0)} - ${binEnd.toFixed(0)}`);
    }
  
    const chartData = {
      labels: binLabels,
      datasets: [
        {
          label: 'Number of Responses',
          data: bins,
          backgroundColor: '#36A2EB',
          borderColor: 'black',
          borderWidth: 1,
        },
      ],
    };
  
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 2.0,
      scales: {
        x: {
          min: minSliderValue,
          max: maxSliderValue,
          title: {
            display: true,
            text: questionText,
          },
          ticks: {
            autoSkip: false,
            maxRotation: 90,
            minRotation: 45,
            callback: function (value, index, values) {
              return binLabels[index];
            },
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Responses',
          },
          ticks: {
            stepSize: 1,
            callback: function (value) {
              return Number.isInteger(value) ? value : null;
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };
  
    charts.push({
      type: 'bar',
      questionText: questionText,
      data: chartData,
      options: chartOptions,
    });
  };
  

  
  //rtan6748- changed the fetch survey to get from database instead of qualitrics
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get(`http://localhost:5003/view-surveys/surveys/${username}`);
        console.log('Fetched Surveys:', response.data); // Debugging output
  
        // Extract QualtricsSurveyId 
        const extractQualtricsSurveyId = (link) => {
          const regex = /SV_[a-zA-Z0-9]+/;  
          const match = link.match(regex);
          return match ? match[0] : null;  
        };
  
        // Format the surveys da
        const formattedSurveys = response.data.map(survey => ({
          id: survey.Survey_ID,  
          name: survey.Survey_Name,  
          qualtricsSurveyId: extractQualtricsSurveyId(survey.Qualtrix_link), 
        }));
  
        setSurveys(formattedSurveys);  // Set the formatted surveys for the dropdown
      } catch (error) {
        console.error('Error fetching surveys:', error);
      }
    };
  
    if (username) {
      fetchSurveys();
    }
  }, [username]);
  

  const handleSurveySelect = (event) => {
    const selectedSurvey = surveys.find(survey => survey.id === parseInt(event.target.value, 10)); 
    setSelectedSurveyId(selectedSurvey.qualtricsSurveyId); 
  };
  

  //Below handles survey data loaded, includes cleaning of the json file 
  const handleSurveyDataLoaded = (jsonData) => {
    //below is for loading the data into variables
    const responses = jsonData.responses;
    const questionIds = new Set();


    // console.log('GET SURVEY DEFINITION SURVEYID', {surveyId: selectedSurveyId});
    //below is to get the data of matrix and multiple choice questions
    responses.forEach((response) => {
        const labels = response.labels;
        const values = response.values;
        // console.log('Response Labels:', labels);
        // console.log('Response Values:', values);

        Object.keys(labels).forEach((key) => {
          if (![
              'status', 'finished', 'ipAddress', 'startDate', 'endDate', 'progress', 
              'duration', 'recordedDate', '_recordId', 'distributionChannel', 'userLanguage', 
              'locationLatitude', 'locationLongitude',
            ].includes(key)) {
            questionIds.add(key);
          }
        });

        // Now process the values for text or slider responses
        Object.keys(values).forEach((key) => {
          if (key.includes('TEXT') || key.includes('QID4_1')) {  // Handle text and slider questions
              questionIds.add(key);
          }
      });
    });
    const questionIdsArray = Array.from(questionIds);
    axios.get('http://localhost:5003/api/qualtrics/getSurveyDefinition', {
      params: {surveyId: selectedSurveyId}}
    )
      .then((response) => {
        const definitionData = response.data;
        const questionMapping = {};
        const questions = definitionData.Questions;
        
      // Debugging: Log the questions and response data
      // console.log("Survey Definition Questions:", questions);

        for (let qid in questions) {
          questionMapping[qid] = questions[qid];
          // console.log(`QID: ${qid}, Question Type: ${questions[qid].QuestionType}`); // Log Question Type
        }

         // Debugging: Log the question mapping created
        // console.log("Question Mapping:", questionMapping);

    // Modified column mapping
const columns = ['Date', ...questionIdsArray.map((qid) => {
  const baseQid = qid.split('_')[0];
  const question = questionMapping[baseQid];

  if (!question) {
      console.log(`Question not found for QID: ${qid}`);
      return qid;  // Fallback
  }

  const questionType = question.QuestionType.Type;

  if (questionType === 'Matrix') {
      const choiceId = qid.split('_')[1];
      return question.SubQuestions?.[choiceId]?.QuestionText || qid;
  } else if (questionType === 'TE') {
      return question.QuestionText || qid;
  } else if (questionType === 'Slider') {
      return question.QuestionText || qid;
  } else {
      return question.QuestionText || qid;
  }
})];

// Modified row mapping
const rows = responses.map((response) => {
  const row = {};
  row['Date'] = new Date(response.values.recordedDate || response.values.startDate).toLocaleString();

  questionIdsArray.forEach((qid) => {
      const baseQid = qid.split('_')[0];
      const question = questionMapping[baseQid];

      if (!question) {
          console.log(`Question not found for QID: ${qid}`);
          row[qid] = response.values[qid] || response.labels[qid] || '';
          return;
      }

      const questionType = question.QuestionType.Type;

      if (questionType === 'Matrix') {
          const choiceId = qid.split('_')[1];
          const columnName = question.SubQuestions?.[choiceId]?.QuestionText || qid;
          row[columnName] = response.labels[qid] || response.values[qid] || '';
      } else if (questionType === 'TE') {
          const columnName = question.QuestionText || qid;
          row[columnName] = response.values[qid] || response.values[`${qid}_TEXT`] || '';
      } else if (questionType === 'Slider') {
          const columnName = question.QuestionText || qid;
          row[columnName] = response.values[qid] || '';
      } else {
          const columnName = question.QuestionText || qid;
          row[columnName] = response.labels[qid] || response.values[qid] || '';
      }
  });

  return row;
});

        setDataLoaded(true);
        setTableData({ columns, rows });
        generateCharts(questions, responses);
      })
      .catch((error) => {
        console.error('Error fetching survey definition:', error);
      });
  };

  const generateCharts = (questions, responses) => {
    const charts = [];
    const textResponseData = []; // Store text responses for 'TE' type questions

    Object.keys(questions).forEach((qid) => {
      const question = questions[qid];
      const data = {};

      // Handle multiple choice questions
      if (question.QuestionType === 'MC') {
        const counts = {};
        question.Choices && Object.keys(question.Choices).forEach((choiceId) => {
          counts[question.Choices[choiceId].Display] = 0;
        });

        responses.forEach((response) => {
          const answer = response.labels[qid];
          if (counts[answer] !== undefined) {
            counts[answer]++;
          }
        });

        const chartType = Object.keys(counts).length > 5 ? 'bar' : 'pie';
        const chartData = {
          labels: Object.keys(counts),
          datasets: [{
            label: question.QuestionText,
            data: Object.values(counts),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          }],
        };

        const chartOptions = {
          maintainAspectRatio: true,
          aspectRatio: 1.5,
        };

        charts.push({
          type: chartType,
          questionText: question.QuestionText,
          data: chartData,
          options: chartOptions,
        });
      } 
      // Handle text-entry questions
      else if (question.QuestionType === 'TE') {
        // Ensure we are fetching text responses from the right place
        const textResponses = responses.map((response) => {
          const value = response.values[qid] || response.values[`${qid}_TEXT`] || '';
          return value;
        });
      
        const answeredCount = textResponses.filter(Boolean).length;
        const totalCount = textResponses.length;
      
        console.log(`Text Responses for QID: ${qid}, Question: ${question.QuestionText}`);
        console.log("Text Responses:", textResponses); // Debugging to ensure we're fetching the right data
      
        const percentageAnswered = ((answeredCount / totalCount) * 100).toFixed(2);
      
        textResponseData.push({
          questionText: question.QuestionText,
          textResponses,
          answeredCount,
          totalCount,
          percentageAnswered,
        });
      } // Handle matrix questions
      else if (question.QuestionType === 'Matrix') {
        console.log('Matrix question:', question);
  
        const choices = question.Choices; // Rows in the matrix
        const answers = question.Answers; // Columns in the matrix
  
        if (choices && answers) {
          const datasets = [];
          const answerLabels = Object.values(answers).map((answer) => answer.Display);
  
          Object.keys(choices).forEach((choiceId, idx) => {
            const choice = choices[choiceId];
            const counts = {};
  
            // Initialize counts for each possible answer
            answerLabels.forEach((label) => {
              counts[label] = 0;
            });
  
            const qidWithChoice = `${qid}_${choiceId}`;
  
            // Count responses
            responses.forEach((response) => {
              const answer = response.labels[qidWithChoice];
              if (counts[answer] !== undefined) {
                counts[answer]++;
              }
            });
  
            const data = answerLabels.map((label) => counts[label]);
  
            datasets.push({
              label: choice.Display,
              data,
              backgroundColor: `hsl(${(idx * 60) % 360}, 70%, 50%)`,
            });
          });
  
          const chartData = {
            labels: answerLabels,
            datasets,
          };
  
          const chartOptions = {
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Number of Responses',
                },
              },
            },
            plugins: {
              title: {
                display: true,
                text: question.QuestionText || question.QuestionDescription || qid,
              },
            },
          };
  
          charts.push({
            type: 'bar',
            questionText: question.QuestionText || question.QuestionDescription || qid,
            data: chartData,
            options: chartOptions,
          });
        } else {
          console.log(`Choices or Answers not found for Matrix question QID: ${qid}`);
        }
      } else if (question.QuestionType === 'Slider') {
        // Process slider question
        const responseKeys = new Set();
      
        responses.forEach((response) => {
          Object.keys(response.values).forEach((key) => {
            if (key === qid || key.startsWith(`${qid}_`)) {
              responseKeys.add(key);
            }
          });
        });
      
        if (responseKeys.size === 1 && responseKeys.has(qid)) {
          // Single slider question
          const sliderValues = [];
      
          responses.forEach((response) => {
            const value = response.values[qid];
            if (value !== undefined) {
              sliderValues.push(Number(value));
            }
          });
      
          if (sliderValues.length > 0) {
            const questionText =
              question.QuestionText ||
              question.QuestionDescription ||
              question.DataExportTag ||
              qid;
      
            createSliderChart(sliderValues, questionText, charts);
          }
        } else {
          // Slider with sub-questions
          const mainQuestionText =
            question.QuestionText ||
            question.QuestionDescription ||
            question.DataExportTag ||
            '';
      
          responseKeys.forEach((key) => {
            const subQid = key.split('_')[1];
            const subQuestionDisplay =
              question.Choices?.[subQid]?.Display ||
              `Sub-question ${subQid}`;
      
            const subQuestionText = `${mainQuestionText} - ${subQuestionDisplay}`;
      
            const sliderValues = [];
      
            responses.forEach((response) => {
              const value = response.values[key];
              if (value !== undefined) {
                sliderValues.push(Number(value));
              }
            });
      
            if (sliderValues.length > 0) {
              createSliderChart(sliderValues, subQuestionText, charts);
            }
          });
        }
      }



      // Handle other question types if any
      else {
        console.log(`Unhandled question type for QID: ${qid}`);
      }
    });

    setChartsData(charts);
    setTextResponses(textResponseData); // Set text responses
  };

  // Pagination for text responses
  const textRowsPerPage = 5;
  const indexOfLastTextRow = currentTextPage * textRowsPerPage;
  const indexOfFirstTextRow = indexOfLastTextRow - textRowsPerPage;
  const currentTextResponses = textResponses.slice(indexOfFirstTextRow, indexOfLastTextRow);
  const totalTextPages = Math.ceil(textResponses.length / textRowsPerPage);

  const paginateText = (pageNumber) => setCurrentTextPage(pageNumber);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.rows.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(tableData.rows.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const downloadCSV = () => {
    const { columns, rows } = tableData;
    let csvContent = columns.join(',') + '\n';
    rows.forEach((row) => {
      const rowData = columns.map((col) => `"${(row[col] || '').replace(/"/g, '""')}"`);
      csvContent += rowData.join(',') + '\n';
    });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'survey_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.dataVisualizationContainer}>
      <h1>Select a Survey</h1>
  
      {/* Survey selection is moved to the top */}
      <div className={styles.dataVisualizationSelectSurvey}>
        <select onChange={handleSurveySelect} value={selectedSurveyId}>
          <option value="">--Select a survey--</option>
          {surveys.map((survey) => (
            <option key={survey.id} value={survey.id}>
              {survey.name}
            </option>
          ))}
        </select>
      </div>
      
      <button className={styles.button} onClick={downloadCSV} disabled={!selectedSurveyId}>Download CSV</button>  {/* Disabled until a survey is selected */}

  
      {/* Hide export button until a survey is selected */}
      {selectedSurveyId && (
        <SurveyExport surveyId={selectedSurveyId} onSurveyDataLoaded={handleSurveyDataLoaded} />
      )}
     
         
          {dataLoaded && (
              <button className={styles.button} onClick={() => setShowTable(!showTable)}>
                {showTable ? 'Hide Data' : 'View Data'}
              </button>
            )}
            { tableData.rows.length > 0 ? (
              <div className={styles.dataVisualizationTableContainer}>
              {showTable && (
          <>
            <h2>Survey Results:</h2>
            <table>
              <thead>
                <tr>
                  {tableData.columns.map((column, index) => (
                    <th key={index}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {tableData.columns.map((column, colIndex) => (
                      <td key={`${rowIndex}-${colIndex}`}>{row[column]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i + 1} onClick={() => paginate(i + 1)} disabled={currentPage === i + 1}>
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
        
  
          {/* Text Response Section */}
          {textResponses.length > 0 && (
            <div className={styles.textResponseContainer}>
              <h2>Text Responses:</h2>
              {textResponses.map((textData, index) => (
                <div key={index} className={styles.textQuestionSection}>
                  <h3>{textData.questionText}</h3>
                  <p>
                    {textData.answeredCount}/{textData.totalCount} (
                    {textData.percentageAnswered}%) of respondents answered.
                  </p>
                  <table className={styles.textResponseTable}>
                    <thead>
                      <tr>
                        <th>Responses</th>
                      </tr>
                    </thead>
                    <tbody>
                      {textData.textResponses.map((response, idx) => (
                        <tr key={idx}>
                          <td>{response || '(No response)'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}
  
          {/* Charts Section */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {chartsData.map((chart, index) => (
              <div key={index} style={{ marginBottom: '40px' }}>
                <h3>{chart.questionText}</h3>
                {chart.type === 'bar' && <Bar data={chart.data} options={chart.options} />}
                {chart.type === 'pie' && <Pie data={chart.data} options={chart.options} />}
              </div>
            ))}
          </div>
        </div>
      ) : (
        null 
      )}
  
    </div>
  );
  
};

export default DataVisualization;
