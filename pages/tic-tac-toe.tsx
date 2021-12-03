import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import { CenteredMain } from '../components/Centered';
import { checkAnswer } from '../services/checkAnswer';

const LOCK_LETTER = 'T';
const Container = styled.div`
    display: grid;
    grid-template-columns: 200px 200px 200px;
    grid-template-rows: 200px 200px 200px;
`;

const Cell = styled.div`
    border: 1px solid black;
    text-align: center;
    vertical-align: middle;
    font-size: 12em;
    user-select: none;
    cursor: pointer;
`;

const XCell = styled(Cell)`
    color: blue;
`;
const OCell = styled(Cell)`
    color: Purple;
`;

const ClickedXCell = () => {
  return <XCell>X</XCell>;
};

const ClickedOCell = () => {
  return <OCell>O</OCell>;
};

const winningPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
  [6, 7, 8],
  [3, 4, 5]
];

export const checkWinner = (choices: number[]) => {
  return winningPatterns.some(pattern => {
    return pattern.filter(num => choices.includes(num)).length === 3;
  });
};

export const findMoveForRobot = (
  playerChoices: number[],
  robotChoices: number[]
): number | null => {

  for (let i = 0; i < winningPatterns.length; i++) {
    const movesNotChosenByPlayer = winningPatterns[i].filter(num => !playerChoices.includes(num))

    const isPlayerOneMoveAway = movesNotChosenByPlayer.length === 1
    if (!isPlayerOneMoveAway) {
      continue
    }

    const lastMoveInPattern = movesNotChosenByPlayer[0]
    const isLastMoveAvailable = !robotChoices.includes(lastMoveInPattern)

    // console.log('********************');
    // console.log(`last move: ${lastMoveInPattern}\nmovesNotChosenByPlayer: ${movesNotChosenByPlayer}\nplayer choices: ${playerChoices}\nrobot choices${robotChoices}`);
    // console.log('********************');

    if (isLastMoveAvailable) {
      return lastMoveInPattern
    } else {
      continue
    }
  }

  return null
};

export default function T() {
  const router = useRouter();
  const cells = Array.from({ length: 9 }, (_, i) => i);

  const [remainingChoices, setRemainingChoices] = useState(cells);

  const [playerChoiceIndexes, setPlayerChoiceIndexes] = useState<number[]>([]);
  const [robotChoiceIndexes, setRobotChoiceIndexes] = useState<number[]>([]);
  const [PlayerTurn, setPlayerTurn] = useState(true);

  const switchTurn = (index: number) => {
    if (!PlayerTurn) {
      return;
    }
    const allMyChoices = [index, ...robotChoiceIndexes];
    setRobotChoiceIndexes(allMyChoices);
    setPlayerTurn(false);

    const youWon = checkWinner(allMyChoices);

    if (youWon) {
      checkAnswer(LOCK_LETTER, true, router);
      return;
    }

    const choicesMinusMine = remainingChoices.filter(
      item => item !== index
    );
    if (choicesMinusMine.length === 0) {
      checkAnswer(LOCK_LETTER, false, router);
      router.reload();
    }

    setRemainingChoices(choicesMinusMine);

    setTimeout(() => {
      const randomIndex = Math.floor(
        Math.random() * choicesMinusMine.length
      );
      const randomChoice = choicesMinusMine[randomIndex];
      const bestChoice = findMoveForRobot(allMyChoices, playerChoiceIndexes);
      const choice = bestChoice ?? randomChoice;
      const allRobotsChoices = [choice, ...playerChoiceIndexes];
      setPlayerChoiceIndexes(allRobotsChoices);
      const robotWon = checkWinner(allRobotsChoices);

      if (robotWon) {
        checkAnswer(LOCK_LETTER, false, router);
        router.reload();
      }

      setRemainingChoices(
        choicesMinusMine.filter(item => item !== choice)
      );

      setPlayerTurn(true);
    }, 1000);
  };

  return (
    <CenteredMain>
      <h1>Beat the robot 🤖</h1>
      <Container>
        {cells.map((_, i) => {
          if (playerChoiceIndexes.includes(i)) {
            return <ClickedOCell key={i} />;
          } else if (robotChoiceIndexes.includes(i)) {
            return <ClickedXCell key={i} />;
          } else {
            return <Cell key={i} onClick={() => switchTurn(i)} />;
          }
        })}
      </Container>
      <h1>{PlayerTurn ? '💪 Your Turn' : "🦾 Robot's Turn"}</h1>
    </CenteredMain>
  );
}
