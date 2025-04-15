import React, { useState, useEffect } from 'react';
import './SimulationPage.css';
import bowlingImage from '../images/bowling.jpg';

function SimulationPage() {
  const [rounds, setRounds] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);

  
  useEffect(() => {
    fetchGameState();
  }, []);

  const fetchGameState = async () => {
    const res = await fetch('http://localhost:3001/api/gameState');
    const data = await res.json();
    setRounds(data.rounds);
    setTotalScore(data.totalScore);
    setGameOver(data.gameOver);
    setCurrentRoundIndex(data.currentRoundIndex);
  };

  const handleSimulate = async () => {
    const res = await fetch('http://localhost:3001/api/simulateRoll', {
      method: 'POST',
    });
    const data = await res.json();
    setRounds(data.rounds);
    setTotalScore(data.totalScore);
    setGameOver(data.gameOver);
    setCurrentRoundIndex(data.currentRoundIndex);
  };

  const handleSimulateGame = async () => {
    console.log('Simulating game...');
    const rest = await fetch('http://localhost:3001/api/simulateGame', {
      method: 'POST',
    });
    const data = await rest.json();
    setRounds(data.rounds);
    setTotalScore(data.totalScore);
    setGameOver(data.gameOver);
    setCurrentRoundIndex(data.currentRoundIndex);
  };

  const handleReset = async () => {
    const res = await fetch('http://localhost:3001/api/resetGame', {
      method: 'POST',
    });
    const data = await res.json();
    setRounds(data.rounds);
    setTotalScore(data.totalScore);
    setGameOver(data.gameOver);
    setCurrentRoundIndex(data.currentRoundIndex);
  };

  const handleUndo = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/undoRoll', {
        method: 'POST',
      });
      const data = await res.json();
      setRounds(data.rounds);
      setTotalScore(data.totalScore);
      setGameOver(data.gameOver);
      setCurrentRoundIndex(data.currentRoundIndex);
    } catch (error) {
      console.error("Error undoing roll:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatRoll = (round, rollNum) => {
    if (rollNum === 1) {
      if (round.roll1 === 10) {
        return 'X';
      } 
      else if (round.roll1 !== undefined) {
        return round.roll1 === 0 ? '-' : round.roll1; 
      }
      return '';
    } 
    else if (rollNum === 2) {
      if (round.roll1 === 10 && round.roll2 === 10) {
        return 'X';
      } 
      else if (round.roll1 !== undefined && round.roll2 !== undefined && round.roll1 + round.roll2 === 10) {
        return '/';
      } 
      else if (round.roll2 !== undefined) {
        return round.roll2 === 0 ? '-' : round.roll2;
      }
      return '';
    } 
    else if (rollNum === 3) {
      if (round.roll3 === 10) {
        return 'X';
      } 
      else if (round.roll2 === 10 && round.roll3 !== undefined && round.roll3 + round.roll2 === 10) {
        return '/';
      } 
      else if (round.roll3 !== undefined) {
        return round.roll3 === 0 ? '-' : round.roll3;
      }
      return '';
    }
    return '';
  };

  console.log('Rounds:', rounds);

  return (
    <div className="simulation-page">
      <div className="simulation-container">
        <table className="bowling-score-table">
          <thead>
            <tr>
              {[...Array(9)].map((_, i) => (
                <th key={i} colSpan="2">{i + 1}</th>
              ))}
              <th colSpan="3">10</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {rounds.map((round, i) => {
                if (i < 9) {
                  return (
                    <React.Fragment key={i}>
                      <td className="frame-shot">
                        {formatRoll(round, 1)}
                      </td>
                      <td className="frame-shot">
                        {formatRoll(round, 2)}
                      </td>
                    </React.Fragment>
                  );
                } 
                else {
                  return (
                    <React.Fragment key={i}>
                      <td className="frame-shot">
                        {formatRoll(round, 1)}
                      </td>
                      <td className="frame-shot">
                        {formatRoll(round, 2)}
                      </td>
                      <td className="frame-shot">
                        {formatRoll(round, 3)}
                      </td>
                    </React.Fragment>
                  );
                }
              })}
            </tr>
            <tr>
              {rounds.map((round, i) => {
                 const isRoundStarted = round.roll1 !== undefined;
                 const isPreviousRound = i < currentRoundIndex;
                 const showScore = isPreviousRound || (i === currentRoundIndex && isRoundStarted) || gameOver;

                if (i < 9) {
                  return (
                    <td
                      key={`score-${i}`}
                      colSpan="2"
                      className="frame-total"
                    >
                      {showScore && round.cumulativeScore !== undefined ? round.cumulativeScore : ''}
                    </td>
                  );
                } else {
                  return (
                    <td
                      key={`score-${i}`}
                      colSpan="3"
                      className="frame-total"
                    >
                      {showScore && round.cumulativeScore !== undefined ? round.cumulativeScore : ''}
                    </td>
                  );
                }
              })}
            </tr>
          </tbody>
        </table>
      </div>

      <img src={bowlingImage} alt="Bowling" className="bowling-image" />

      <div className="simulation-controls">
        <div className="button-row">
          <button type="button" className="play-button" onClick={handleSimulate} disabled={gameOver}>
            Simulate&nbsp;Roll
          </button>
          <button type="button" className="play-button" onClick={handleSimulateGame} disabled={gameOver}>
            Simulate&nbsp;Game
          </button>
        </div>

        <div className="button-row">
          <button type="button" className="undo-button" onClick={handleUndo} disabled={isLoading}>
            Undo&nbsp;Roll
          </button>
          <button type="button" className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default SimulationPage;
