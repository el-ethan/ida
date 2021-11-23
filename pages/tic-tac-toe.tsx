import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { CenteredMain } from "../components/Centered";
import { checkAnswer } from "../services/checkAnswer";

const LOCK_LETTER = 'T'
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
`

const XCell = styled(Cell)`color: blue`;
const OCell = styled(Cell)`color: Purple`;

const ClickedXCell = () => {
    return <XCell>X</XCell>
}

const ClickedOCell = () => {
    return <OCell>O</OCell>
}

export default function T() {
  const router = useRouter();
  const cells = Array.from({ length: 9 }, (_, i) => i);

  const [remainingChoices, setRemainingChoices] = useState(cells);  
  const [oIndexes, setOIndexes] = useState([]);
  const [xIndexes, setXIndexes] = useState([]);
  const [yourTurn, setYourTurn] = useState(true)

  const findMoveForRobot = (yourChoices: [number]): number | undefined => {
    const winningPatterns = [
        [0,1,2],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
        [6,7,8],
        [3,4,5],
    ]

    for (let i = 0; i < winningPatterns.length; i++) {
        const commonNumbers = winningPatterns[i].filter(num => yourChoices.includes(num))
        let choice;
        if (commonNumbers.length === 2) {
            choice = winningPatterns[i].find((num) => !yourChoices.includes(num))
        }

        if (choice && !oIndexes.includes(choice)) {
            return choice
        } else {
            continue
        }
    }
  }

  const checkWinner = (choices: [number]) => {
    const choicesString = choices.sort().toString()
    const winningPatterns = [
        '0,1,2',
        '0,3,6',
        '1,4,7',
        '2,5,8',
        '0,4,8',
        '2,4,6',
        '6,7,8',
        '3,4,5',
    ]

    return winningPatterns.some(pattern => {
        return choicesString.match(pattern)
    })
  }

  const switchTurn = (index) => {
      if (!yourTurn) {
          return;
      }
      const allMyChoices = [index, ...xIndexes]
      setXIndexes([index, ...xIndexes])
      setYourTurn(false)

      const youWon = checkWinner([index, ...xIndexes])

      if (youWon) {
        checkAnswer(LOCK_LETTER, true, router)
      }

      const choicesMinusMine = remainingChoices.filter(item => item !== index)
      if (choicesMinusMine.length === 0) {
        checkAnswer(LOCK_LETTER, false, router)
        router.reload();
      }

      setRemainingChoices(choicesMinusMine)

      setTimeout(() => {
          const robotChoice = Math.floor(Math.random() * choicesMinusMine.length)
          const choice = findMoveForRobot([index, ...xIndexes]) || choicesMinusMine[robotChoice]
          setOIndexes([choice, ...oIndexes])
          const robotWon = checkWinner([choice, ...oIndexes])

          if (robotWon) {
            checkAnswer(LOCK_LETTER, false, router)
            router.reload();
          }

          setRemainingChoices(choicesMinusMine.filter(item => item !== choice))

          setYourTurn(true)
      }, 2000)
  }

  return (
    <CenteredMain>
      <h1>Beat the robot 🤖</h1>
      <Container>
          {cells.map((_, i) => {
              if (oIndexes.includes(i)) {
                return <ClickedOCell key={i}/>
              } else if (xIndexes.includes(i)) {
                return <ClickedXCell key={i}/>
              } else {
                return <Cell key={i} onClick={() => switchTurn(i)}></Cell>
              }
          })}          
      </Container>
      <h1>{yourTurn ? '💪 Your Turn' : '🦾 Robot\'s Turn'}</h1>
    </CenteredMain>
  );
}
