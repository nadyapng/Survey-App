import MCQuestion from "./QuestionTypes/MCQuestion"
import MatrixQuestion from "./QuestionTypes/MatrixQuestion"
import SliderQuestion from "./QuestionTypes/SliderQuestion"
import TextEntryQuestion from "./QuestionTypes/TextEntryQuestion"
import DescriptiveQuestion from "./QuestionTypes/DescriptiveQuestion"
import React from 'react';

const QuestionDisplay = ({
    questions,
    index,
    onUpdate,
    onDelete,
    question,
    onMove,
    totalQuestions,
    isEditable
}) => {
    
    const questionType = question.QuestionType?.toLowerCase() || question.questiontype?.toLowerCase() || question.questionType?.toLowerCase();

    switch (questionType) {
        case 'mc':
            return <MCQuestion question={question} key={question.QuestionID} onUpdate={onUpdate} index={index} onDelete={onDelete} onMove={onMove} totalQuestions={totalQuestions} isEditable={isEditable}/>;
        case 'matrix':
            return <MatrixQuestion question={question} key={question.QuestionID} onUpdate={onUpdate} index={index} onDelete={onDelete} onMove={onMove} totalQuestions={totalQuestions} isEditable={isEditable}/>;
        case 'slider':
            return <SliderQuestion question={question} key={question.QuestionID} onUpdate={onUpdate} index={index} onDelete={onDelete} onMove={onMove} totalQuestions={totalQuestions} isEditable={isEditable}/>;
        case 'te':
            return <TextEntryQuestion question={question} key={question.QuestionID} onUpdate={onUpdate} index={index} onDelete={onDelete} onMove={onMove} totalQuestions={totalQuestions} isEditable={isEditable}/>;
        case 'db':
            return <DescriptiveQuestion question={question} key={question.QuestionID} onUpdate={onUpdate} index={index} onDelete={onDelete} onMove={onMove} totalQuestions={totalQuestions} isEditable={isEditable}/>;
        default:
            return <div key={question.QuestionID}>Question Type Not Recognized</div>;
    }
}

export default QuestionDisplay;
