import React, { useRef, useState, useEffect } from "react";
import './Quiz.css';
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const navigate = useNavigate();

  const optionRefs = useRef([]);

  useEffect(() => {
    const storedData = localStorage.getItem('quizData');
    if (storedData) {
      setQuizData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (quizData && index === quizData.questions.length) {
      setResult(true);
    }
  }, [index, quizData]);

  const checkAnswer = (answerIndex) => {
    console.log(lock);
    if (!lock) {
      console.log(answerIndex);
      const selectedAnswer = quizData.questions[index].answers[answerIndex];
      const isCorrect = selectedAnswer.isCorrect;
      if (isCorrect) {
        setScore(score + 1);
      }
      setLock(true);
      optionRefs.current.forEach((ref, idx) => {
        if (idx === answerIndex) {
          ref.classList.add(isCorrect ? 'correct' : 'incorrect');
        } else if (quizData.questions[index].answers[idx].isCorrect) {
          ref.classList.add('correct');
        }
      });
    }
  }

  const nextQuestion = () => {
    if (index < quizData.questions.length) {
      setIndex(index + 1);
      setLock(false);
      optionRefs.current.forEach(ref => {
        ref.classList.remove('correct', 'incorrect');
      });
    }
  }

  const backToEdit = () => {
    navigate('/');
  }

  return (
    <div className="container">
      <h1>{quizData && quizData.testName}</h1>
      <hr />
      {result ? (
        <>
          <h2>Кількість правильних відповідей {score} з {quizData.questions.length}</h2>
          <button className="btn-primary" onClick={backToEdit}>Повернутись до редагування</button>
        </>
      ) : (
        <>
          {quizData && (
            <>
              <h2>{index + 1}. {quizData.questions[index]?.question}</h2>
              <div className="answer-choice">
                <ul>
                  {quizData.questions[index]?.answers.map((answer, idx) => (
                    <li key={idx} ref={(ref) => optionRefs.current[idx] = ref} onClick={() => checkAnswer(idx)}>
                      {answer.answer}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="btn-primary" onClick={nextQuestion}>Наступне</button>
              <div className="index">
                {index + 1}/{quizData.questions.length} питань
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;
