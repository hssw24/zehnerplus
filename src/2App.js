import React, { useState, useEffect } from 'react';
import './App.css';

const generateProblem = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const correctAnswer = num1 + num2;
  const answers = [correctAnswer, correctAnswer + 1, correctAnswer - 1].sort(() => Math.random() - 0.5);
  return { num1, num2, correctAnswer, answers };
};

const App = () => {
  const [problem, setProblem] = useState(generateProblem());
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [showResult, setShowResult] = useState(null);

  useEffect(() => {
    setProblem(generateProblem());
  }, [score.correct, score.incorrect]);

  const checkAnswer = (answer) => {
    if (answer === problem.correctAnswer) {
      setScore((prevScore) => ({ ...prevScore, correct: prevScore.correct + 1 }));
      setShowResult('Richtig!');
    } else {
      setScore((prevScore) => ({ ...prevScore, incorrect: prevScore.incorrect + 1 }));
      setShowResult(`Falsch! ${problem.num1} + ${problem.num2} = ${problem.correctAnswer}`);
    }
  };

  return (
    <div className="App">
      <h1>Zehnerübergang üben</h1>
      <div className="question">
        <span>{problem.num1} + {problem.num2} = ?</span>
      </div>
      <div className="answers">
        {problem.answers.map((answer, index) => (
          <button key={index} onClick={() => checkAnswer(answer)}>
            {answer}
          </button>
        ))}
      </div>
      {showResult && <div className="result">{showResult}</div>}
      <div className="score">
        <p>Richtig: {score.correct}</p>
        <p>Falsch: {score.incorrect}</p>
      </div>
    </div>
  );
}

export default App;
