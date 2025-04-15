import express from 'express';
import cors from 'cors';
import BowlingGame from './src/components/BowlingGame.js';

const app = express();
app.use(cors());
app.use(express.json());

const port = 3001;
const game = new BowlingGame();

app.post('/api/simulateRoll', (req, res) => {
  game.simulateRoll();
  res.json(game.getGameState()); 
});

app.post('/api/simulateGame', (req, res) => {
  game.simulateGame();
  res.json(game.getGameState());
});

app.post('/api/resetGame', (req, res) => {
  game.reset();
  res.json(game.getGameState());
});

app.post('/api/undoRoll', (req, res) => {
  game.undoRoll();
  res.json(game.getGameState());
});  

app.get('/api/gameState', (req, res) => {
  res.json(game.getGameState());
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
