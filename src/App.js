import React, { useState, useEffect } from 'react';
import './App.css';

const generateProblem = () => {
  let num1, num2, correctAnswer;

  do {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    correctAnswer = num1 + num2;
  } while (correctAnswer < 10);

  const answers = [correctAnswer, correctAnswer + 1, correctAnswer - 1].sort(() => Math.random() - 0.5);
  return { num1, num2, correctAnswer, answers };
};

const App = () => {
  const [problem, setProblem] = useState(generateProblem());
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [showResult, setShowResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30); // 2 Minuten = 120 Sekunden
  const [gameOver, setGameOver] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setGameOver(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (!gameOver) {
      setProblem(generateProblem());
    }
  }, [score.correct, score.incorrect, gameOver]);

  const checkAnswer = (answer) => {
    if (answer === problem.correctAnswer) {
      setScore((prevScore) => ({ ...prevScore, correct: prevScore.correct + 1 }));
      setShowResult('Richtig!');
    } else {
      setScore((prevScore) => ({ ...prevScore, incorrect: prevScore.incorrect + 1 }));
      setWrongAnswers(prevWrongAnswers => [...prevWrongAnswers, `${problem.num1} + ${problem.num2} = ${problem.correctAnswer}`]);
      setShowResult(`Falsch! ${problem.num1} + ${problem.num2} = ${problem.correctAnswer}`);
    }
  };

  const resetGame = () => {
    setScore({ correct: 0, incorrect: 0 });
    setTimeLeft(120);
    setGameOver(false);
    setShowResult(null);
    setWrongAnswers([]);
  };

  return (
    <div className="App">
      <h1>Zehnerübergang üben</h1>
      {!gameOver ? (
        <>
          <div className="question">
            <span>{problem.num1} + {problem.num2} = ?</span>
          </div>
          <div className="answers">
            {problem.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => checkAnswer(answer)}
                disabled={gameOver}
                style={{
                  fontSize: '24px',
                  padding: '20px',
                  margin: '10px',
                  minWidth: '100px',
                }}
              >
                {answer}
              </button>
            ))}
          </div>
          {showResult && <div className="result">{showResult}</div>}
          <div className="score">
            <p>Richtig: {score.correct}</p>
            <p>Falsch: {score.incorrect}</p>
          </div>
          <div className="timer">
            <p>Verbleibende Zeit: {timeLeft} Sekunden</p>
          </div>
        </>
      ) : (
        <div className="game-over">
          <h2>Spiel vorbei!</h2>
          <p>Richtige Antworten: {score.correct}</p>
          <p>Falsche Antworten: {score.incorrect}</p>
          {wrongAnswers.length > 0 && (
            <div className="wrong-answers">
              <h3>Falsche Aufgaben:</h3>
              <ul>
                {wrongAnswers.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          <button onClick={resetGame}>Nochmals spielen</button>
        </div>
      )}
    </div>
  );
}

export default App;
