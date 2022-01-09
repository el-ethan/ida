import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CenteredMain } from '../components/Centered';
import { useRouter } from 'next/router';
import { checkAnswer } from '../services/checkAnswer';
import getRandomNumber from '../services/getRandomNumber';

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

const Graveyard = styled.div`
    position: relative;
    // background: brown;
    height: 500px;
    width: 500px;
`;

const Zombie = () => {
  const router = useRouter();
  const zombieOptions = ['🧟‍♀️', '🧟', '🧟‍♂️'];
  const randomZombieIndex = getRandomNumber(zombieOptions.length);
  const [zapped, setZapped] = useState(false);
  const checkAllZombiesZapped = () => {
    const remainingUnzapped = document.getElementsByClassName('unzapped')
      .length;
    if (remainingUnzapped === 0) {
      checkAnswer(LOCK_LETTER, true, router);
    }
  };

  const handleZap = () => {
    setTimeout(checkAllZombiesZapped);
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

  const [zombies, setZombies] = useState(getZombies(initialZombieCount));

  useEffect(
    () => {
      setTimeout(() => {
        setZombies([...zombies, ...getZombies(1)]);
      }, 1000);
    },
    [zombies]
  );

  return (
    <CenteredMain>
      <h1>Zap the zombies!</h1>
      <Graveyard>{zombies}</Graveyard>
    </CenteredMain>
  );
}
