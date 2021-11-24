import { useRouter } from 'next/router';
import { useState } from "react";
import styled from 'styled-components';
import { checkAnswer } from '../services/checkAnswer';

const BrownSquare = styled.div`
  height: 100px;
  width: 100px;
  background: #7e4e4e;
  border: 1px solid black;
`;


const Cell = ({cellIndex, diamondCellIndex}: {cellIndex: number; diamondCellIndex: number}) => {
  const router = useRouter();
  const [digIndex, setDigIndex] = useState(0);
  const handleClick = () => {
    if(digIndex < 5) {
      setDigIndex((preIndex) => {
        return preIndex + 1
      })
    }
    console.log({cellIndex, digIndex});
    if(cellIndex === diamondCellIndex) {
        if(digIndex === 5) {
        checkAnswer("D", true, router)
      }
    }
  }

  return (
    <BrownSquare onClick={handleClick}>{`${cellIndex}, ${diamondCellIndex}`}</BrownSquare>
  )
}

export default Cell;