import { render, screen } from "@testing-library/react";
import QuestionDisplay from "client/src/components/QuestionDisplay.jsx";
import MCQuestion from "client/src/components/QuestionTypes/MCQuestion.jsx";
import MatrixQuestion from "client/src/components/QuestionTypes/MatrixQuestion.jsx";
import SliderQuestion from "client/src/components/QuestionTypes/SliderQuestion.jsx";
import TextEntryQuestion from "client/src/components/QuestionTypes/TextEntryQuestion.jsx";
import DescriptiveQuestion from "client/src/components/QuestionTypes/DescriptiveQuestion.jsx";
import React from 'react';

// Mock the individual question components
jest.mock("client/src/components/QuestionTypes/MCQuestion.jsx", () => jest.fn(() => <div>MC Question Component</div>));
jest.mock("client/src/components/QuestionTypes/MatrixQuestion.jsx", () => jest.fn(() => <div>Matrix Question Component</div>));
jest.mock("client/src/components/QuestionTypes/SliderQuestion.jsx", () => jest.fn(() => <div>Slider Question Component</div>));
jest.mock("client/src/components/QuestionTypes/TextEntryQuestion.jsx", () => jest.fn(() => <div>Text Entry Question Component</div>));
jest.mock("client/src/components/QuestionTypes/DescriptiveQuestion.jsx", () => jest.fn(() => <div>Descriptive Question Component</div>));

describe('QuestionDisplay component', () => {

    const defaultProps = {
        onUpdate: jest.fn(),
        onDelete: jest.fn(),
        onMove: jest.fn(),
        index: 0,
        totalQuestions: 5,
        isEditable: true
    };

    it('renders MCQuestion component for mc question type', () => {
        const question = { QuestionType: 'mc', QuestionID: '1' };
        render(<QuestionDisplay {...defaultProps} question={question} />);

        expect(screen.getByText('MCQuestion Component')).toBeInTheDocument();
    });

    it('renders MatrixQuestion component for matrix question type', () => {
        const question = { QuestionType: 'matrix', QuestionID: '2' };
        render(<QuestionDisplay {...defaultProps} question={question} />);

        expect(screen.getByText('MatrixQuestion Component')).toBeInTheDocument();
    });

    it('renders SliderQuestion component for slider question type', () => {
        const question = { QuestionType: 'slider', QuestionID: '3' };
        render(<QuestionDisplay {...defaultProps} question={question} />);

        expect(screen.getByText('SliderQuestion Component')).toBeInTheDocument();
    });

    it('renders TextEntryQuestion component for te question type', () => {
        const question = { QuestionType: 'te', QuestionID: '4' };
        render(<QuestionDisplay {...defaultProps} question={question} />);

        expect(screen.getByText('TextEntryQuestion Component')).toBeInTheDocument();
    });

    it('renders DescriptiveQuestion component for db question type', () => {
        const question = { QuestionType: 'db', QuestionID: '5' };
        render(<QuestionDisplay {...defaultProps} question={question} />);

        expect(screen.getByText('DescriptiveQuestion Component')).toBeInTheDocument();
    });

    it('renders "Question Type Not Recognized" for unrecognized question type', () => {
        const question = { QuestionType: 'unknown', QuestionID: '6' };
        render(<QuestionDisplay {...defaultProps} question={question} />);

        expect(screen.getByText('Question Type Not Recognized')).toBeInTheDocument();
    });
});
