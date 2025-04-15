export default class BowlingGame {
  constructor() {
    this.rounds = Array.from({ length: 10 }, () => ({
      roll1: undefined,
      roll2: undefined,
      roll3: undefined,
      cumulativeScore: 0,
    }));
    this.currentRoundIndex = 0;
    this.currentRollInRound = 1;
    this.gameOver = false;
  }

  simulateRoll() {
    if (this.gameOver) {
      return;
    }

    let pinsKnocked;

    if (this.currentRollInRound === 1) {
        pinsKnocked = Math.floor(Math.random() * 11);
    }
    else if (this.currentRollInRound === 2) {
        const round = this.rounds[this.currentRoundIndex];
        if (this.currentRoundIndex === 9 && round.roll1 === 10) {
            pinsKnocked = Math.floor(Math.random() * 11);
        } 
        else {
            const remainingPins = 10 - (round.roll1 || 0);
            pinsKnocked = Math.floor(Math.random() * (remainingPins + 1));
        }
    }
    else {
        const round = this.rounds[this.currentRoundIndex];
        if (round.roll1 === 10 && round.roll2 === 10) {
            pinsKnocked = Math.floor(Math.random() * 11);
        } 
        else if (round.roll1 === 10) {
            const remainingPins = 10 - (round.roll2 || 0);
            pinsKnocked = Math.floor(Math.random() * (remainingPins + 1));
        } 
        else {
            pinsKnocked = Math.floor(Math.random() * 11);
        }
    }

    const round = this.rounds[this.currentRoundIndex];
    if (this.currentRollInRound === 1) {
        round.roll1 = pinsKnocked;
        this.currentRollInRound = 2;

        if (pinsKnocked === 10 && this.currentRoundIndex < 9) {
            this.calculateScores();
            this.nextRound();
        }
        else{
            this.calculateScores();
        }
    }
    else if (this.currentRollInRound === 2) {
        round.roll2 = pinsKnocked;

        if (this.currentRoundIndex < 9) {
            this.calculateScores();
            this.nextRound();
        }
        else {
            if (round.roll1 === 10 || round.roll1 + round.roll2 === 10) {
                this.currentRollInRound = 3;
            }
            else {
                this.calculateScores();
                this.gameOver = true;
            }
        }
    }
    else if (this.currentRollInRound === 3) {
        round.roll3 = pinsKnocked;
        this.calculateScores();
        this.gameOver = true;
    }
  }

  nextRound() {
    this.currentRoundIndex++;
    this.currentRollInRound = 1;
  }

  calculateScores() {
    let lastCompletedRoundScore = 0;
    for (let i = 0; i < 10; i++) {
        const round = this.rounds[i];
        let roundScore = 0;
        let isRoundScoreCalculable = false;

        if (round.roll1 === undefined) {
             round.cumulativeScore = lastCompletedRoundScore;
             continue;
        }

        if (round.roll1 === 10) {
             roundScore = 10;
             if (i < 9) {
                 const nextRound = this.rounds[i + 1];
                 if (nextRound && nextRound.roll1 !== undefined) {
                     roundScore += nextRound.roll1;
                     if (nextRound.roll1 === 10) {
                         if (i < 8) {
                             const roundAfterNext = this.rounds[i + 2];
                             if (roundAfterNext && roundAfterNext.roll1 !== undefined) {
                                 roundScore += roundAfterNext.roll1;
                                 isRoundScoreCalculable = true;
                             }
                         } 
                         else {
                             if (nextRound.roll2 !== undefined) {
                                 roundScore += nextRound.roll2;
                                 isRoundScoreCalculable = true;
                             }
                         }
                     } 
                     else {
                         if (nextRound.roll2 !== undefined) {
                             roundScore += nextRound.roll2;
                             isRoundScoreCalculable = true;
                         }
                     }
                 }
             } 
             else {
                 if (round.roll2 !== undefined && round.roll3 !== undefined) {
                    roundScore = 10 + round.roll2 + round.roll3;
                    isRoundScoreCalculable = true;
                 }
             }
        }
        else if (round.roll2 !== undefined && round.roll1 + round.roll2 === 10) {
             roundScore = 10;
             if (i < 9) {
                 const nextRound = this.rounds[i + 1];
                 if (nextRound && nextRound.roll1 !== undefined) {
                     roundScore += nextRound.roll1;
                     isRoundScoreCalculable = true;
                 }
             } 
             else {
                 if (round.roll3 !== undefined) {
                     roundScore += round.roll3;
                     isRoundScoreCalculable = true;
                 }
             }
        }
        else {
             if (round.roll1 !== undefined && round.roll2 !== undefined) {
                 roundScore = round.roll1 + round.roll2;
                 isRoundScoreCalculable = true;
             } 
             else if (round.roll1 !== undefined) {
                 roundScore = round.roll1;
                 isRoundScoreCalculable = true;
             }
             else {
                 isRoundScoreCalculable = false;
             }
        }

        if (isRoundScoreCalculable) {
            round.cumulativeScore = lastCompletedRoundScore + roundScore;
            lastCompletedRoundScore = round.cumulativeScore;
        } 
        else {
            round.cumulativeScore = lastCompletedRoundScore;
        }
    }
  }

  reset() {
    this.rounds = Array.from({ length: 10 }, () => ({
      roll1: undefined,
      roll2: undefined,
      roll3: undefined,
      cumulativeScore: 0,
    }));
    this.currentRoundIndex = 0;
    this.currentRollInRound = 1;
    this.gameOver = false;
  }

  getGameState() {
    return {
      rounds: this.rounds,
      totalScore: this.rounds[9].cumulativeScore || 0,
      gameOver: this.gameOver,
      currentRoundIndex: this.currentRoundIndex
    };
  }

  simulateGame() {
    while (!this.gameOver) {
      this.simulateRoll();
    }
  }

  undoRoll() {
    if (this.currentRoundIndex === 0 && this.currentRollInRound === 1 && this.rounds[0].roll1 === undefined) {
        return;
    }

    this.gameOver = false;

    const roundBeforeUndo = this.rounds[this.currentRoundIndex];
    let targetRoundIndex = this.currentRoundIndex;
    let targetRollInRound = this.currentRollInRound;
    let rollToClear = 0;

    if (targetRoundIndex === 9) {
        const round10 = roundBeforeUndo;
        if (targetRollInRound === 3 && round10.roll3 !== undefined) {
            rollToClear = 3;
            targetRollInRound = 3;
        } else if (round10.roll2 !== undefined && (targetRollInRound === 3 || (targetRollInRound === 2 && this.gameOver))) {
            rollToClear = 2;
            targetRollInRound = 2;
        } else if (round10.roll1 !== undefined && targetRollInRound === 2) {
            rollToClear = 1;
            targetRollInRound = 1;
        } else if (round10.roll1 === undefined && targetRollInRound === 1 && targetRoundIndex > 0) {
             targetRoundIndex = 8;
             const round9 = this.rounds[targetRoundIndex];
             if (round9.roll1 === 10) {
                 rollToClear = 1;
                 targetRollInRound = 1;
             } else {
                 rollToClear = 2;
                 targetRollInRound = 2;
             }
        } else {
             return;
        }
    } else {
        if (targetRollInRound === 1) {
            if (targetRoundIndex === 0) return;
            targetRoundIndex = this.currentRoundIndex - 1;
            const prevRound = this.rounds[targetRoundIndex];
            if (prevRound.roll1 === 10 && prevRound.roll2 === undefined) {
                rollToClear = 1;
                targetRollInRound = 1;
            } else if (prevRound.roll2 !== undefined) {
                rollToClear = 2;
                targetRollInRound = 2;
            } else {
                 return;
            }
        } else if (targetRollInRound === 2) {
            rollToClear = 1;
            targetRollInRound = 1;
        } else {
            return;
        }
    }

    const roundToModify = this.rounds[targetRoundIndex];
    if (rollToClear === 1) roundToModify.roll1 = undefined;
    else if (rollToClear === 2) roundToModify.roll2 = undefined;
    else if (rollToClear === 3) roundToModify.roll3 = undefined;

    this.currentRoundIndex = targetRoundIndex;
    this.currentRollInRound = targetRollInRound;

    for (let i = targetRoundIndex; i < 10; i++) {
        this.rounds[i].cumulativeScore = 0;
        const round = this.rounds[i];
        if (i > targetRoundIndex) {
            round.roll1 = undefined;
            round.roll2 = undefined;
            round.roll3 = undefined;
        } 
        else {
            if (rollToClear === 1) {
                round.roll2 = undefined;
                round.roll3 = undefined;
            }
            if (rollToClear === 2) {
                round.roll3 = undefined;
            }
        }
    }

    this.calculateScores();
  }
}
