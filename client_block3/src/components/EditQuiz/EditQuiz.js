import React, { useState } from "react";
import { data } from '../../assets/data.js';
import { useNavigate } from "react-router-dom";
import './EditQuiz.css'

const EditQuiz = () => {
  const [questions, setQuestions] = useState(data.questions);
  const navigate = useNavigate();

  const deleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const editQuestion = (index, updatedQuestion) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    const newQuestion = {
      question: "",
      answers: [
        { answer: "", isCorrect: false },
        { answer: "", isCorrect: false },
        { answer: "", isCorrect: false },
        { answer: "", isCorrect: false }
      ]
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionChange = (index, updatedQuestion) => {
    editQuestion(index, updatedQuestion);
  };

  const saveChanges = () => {
    localStorage.setItem('quizData', JSON.stringify({ testName: data.testName, questions }));
    navigate('/quiz');
  };

  return (
    <div className="container">
      <h1>Редагування тесту</h1>
      {questions.map((question, index) => (
        <div key={index} className="question-container">
          <h2 className="mb-2">Питання {index + 1}</h2>
          <textarea
            className="question-textarea"
            value={question.question}
            onChange={(e) => handleQuestionChange(index, { ...question, question: e.target.value })}
          />
          <ul>
            {question.answers.map((answer, answerIndex) => (
              <li key={answerIndex}>
                <input
                  className="answer-input"
                  type="text"
                  value={answer.answer}
                  onChange={(e) => handleQuestionChange(index, {
                    ...question,
                    answers: question.answers.map((a, i) =>
                      i === answerIndex ? { ...a, answer: e.target.value } : a
                    )
                  })}
                />
                <input
                  className="answer-radio"
                  type="radio"
                  id={`answer-radio-${index}-${answerIndex}`}
                  name={`answer-radio-${index}`}
                  checked={answer.isCorrect}
                  onChange={(e) => handleQuestionChange(index, {
                    ...question,
                    answers: question.answers.map((a, i) =>
                      i === answerIndex ? { ...a, isCorrect: e.target.checked } : { ...a, isCorrect: false }
                    )
                  })}
                />
                <label className="answer-radio-label" htmlFor={`answer-radio-${index}-${answerIndex}`}>Правильно</label>
              </li>
            ))}
          </ul>
          <button className="btn-secondary" onClick={() => deleteQuestion(index)}>Видалити питання</button>
        </div>
      ))}
      <button className="btn-primary" onClick={addQuestion}>Додати питання</button>
      <button className="btn-primary" onClick={saveChanges}>
        Зберегти і почати
      </button>
    </div >
  );
};

export default EditQuiz;
