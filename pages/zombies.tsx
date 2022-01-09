import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CenteredMain } from '../components/Centered';
import { useRouter } from 'next/router';
import { checkAnswer } from '../services/checkAnswer';

const LOCK_LETTER = 'Z';

interface ZombieContainerProps {
    left: number;
    top: number;
    zapped: boolean;
}

const ZombieContainer =
    styled.span <
    ZombieContainerProps >
    `
    position: absolute;
    user-select: none;
    cursor: pointer;
    font-size: 10em;
    left: ${props => props.left}px;
    top: ${props => props.top}px;

    &.zapped {
      display: none;
    }
`;

const getRandomNumber = (limit: number) => Math.floor(Math.random() * limit);

const Graveyard = styled.div`
    position: relative;
    // background: brown;
    height: 500px;
    width: 500px;
`;

const Zombie = () => {
  const zombieOptions = ['🧟‍♀️', '🧟', '🧟‍♂️'];
  const randomZombieIndex = getRandomNumber(zombieOptions.length);
  const [zapped, setZapped] = useState(false);
  const handleZap = () => {
    setZapped(true);
  };

  return (
    <ZombieContainer
      left={getRandomNumber(500)}
      top={getRandomNumber(500)}
      zapped={zapped}
      onClick={handleZap}
      className={zapped ? 'zapped' : 'unzapped'}
    >
      {zombieOptions[randomZombieIndex]}
    </ZombieContainer>
  );
};

const getZombies = (numZombies: number) => {
  return Array.from({ length: numZombies }, (i: number) => (
    <Zombie key={i} />
  ));
};

export default function Z() {
  const initialZombieCount = 50;
  const router = useRouter();

  /**
     * First version can just be this:
     *
     * Every visible zombie has a certain id
     * we count how many visible zombies there are
     * if the count is 0 then you win
     * if it is > a certain number then you have been overrun by zombies
     * */

  return (
    <CenteredMain>
      <h1>Zap the zombies!</h1>
      <Graveyard>{getZombies(initialZombieCount)}</Graveyard>
    </CenteredMain>
  );
}
