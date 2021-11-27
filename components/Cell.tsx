import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { checkAnswer } from '../services/checkAnswer';

interface IBrownSquare {
    opacity: number;
}

const BrownSquare =
    styled.div <
    IBrownSquare >
    `
  height: 100px;
  width: 100px;
  background: #640f0f;
  opacity: ${props => props.opacity};
  text-align: center;
`;

const Diamond = styled.p`
    font-size: 2rem;
    opacity: 1;
`;
type CellProps = {
    cellIndex: number;
    diamondCellIndex: number;
    ghostCellIndex: number;
};

const Cell = ({ cellIndex, diamondCellIndex, ghostCellIndex }: CellProps) => {
    const router = useRouter();
    const [digIndex, setDigIndex] = useState(0);
    const [squareOpacity, setSquareOpacity] = useState(0.8);
    useEffect(() => {
        if (getDiamond()) {
            checkAnswer('D', true, router);
        }
        if (getGhost()) {
            checkAnswer('D', false, router, true);
        }
    });

    const handleClick = () => {
        if (digIndex < 5) {
            setDigIndex(preIndex => preIndex + 1);
            setSquareOpacity(preOpacity => preOpacity + 0.04);
        }
        // console.log({ cellIndex, digIndex });
    };

    const getDiamond = () => {
        return cellIndex === diamondCellIndex && digIndex === 5;
    };
    const getGhost = () => {
        return cellIndex === ghostCellIndex && digIndex === 5;
    };

    return (
        <BrownSquare opacity={squareOpacity} onClick={handleClick}>
            {getDiamond() && <Diamond>{`💎`}</Diamond>}
            {getGhost() && <Diamond>{`👻`}</Diamond>}
        </BrownSquare>
    );
};

export default Cell;
