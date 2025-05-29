CREATE DATABASE IF NOT EXISTS SurveyDB;
USE SurveyDB;

CREATE TABLE User (
    User_ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    pwd VARCHAR(255)
);

CREATE TABLE Survey (
    Survey_ID INT AUTO_INCREMENT PRIMARY KEY,
    User_ID INT,
    Time TIME,
    Date DATE,
    Qualtrix_link VARCHAR(255),
    Result_file_path VARCHAR(255),
    Hypothesis TEXT,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID)
);

CREATE TABLE User_Survey (
    User_ID INT,
    Survey_ID INT,
    PRIMARY KEY (User_ID, Survey_ID),
    FOREIGN KEY (User_ID) REFERENCES User(User_ID),
    FOREIGN KEY (Survey_ID) REFERENCES Survey(Survey_ID)
);


CREATE TABLE Question (
    Question_ID INT AUTO_INCREMENT PRIMARY KEY,
    Survey_ID INT,
    Info TEXT,
    Type ENUM('multiple-choice', 'text', 'rating') NOT NULL,
    FOREIGN KEY (Survey_ID) REFERENCES Survey(Survey_ID)
);


CREATE TABLE `Option` (
    Option_ID INT AUTO_INCREMENT PRIMARY KEY,
    Question_ID INT,
    Option_Text TEXT,
    Option_Type ENUM('single', 'multiple') NOT NULL,
    FOREIGN KEY (Question_ID) REFERENCES Question(Question_ID)
);
