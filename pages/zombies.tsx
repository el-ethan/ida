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
  const router = useRouter();

  const zombieOptions = ['🧟‍♀️', '🧟', '🧟‍♂️'];
  const randomZombieIndex = getRandomNumber(zombieOptions.length);
  const [zapped, setZapped] = useState(false);
  const checkAllZombiesZapped = () => {
    if (typeof window === 'undefined') return;
    const remainingUnzapped =
            document && document.getElementsByClassName('unzapped').length;
    console.log('********************');
    console.log(remainingUnzapped);
    console.log('********************');
    if (remainingUnzapped === 0) {
      checkAnswer(LOCK_LETTER, true, router);
    } else if (remainingUnzapped > 55) {
      checkAnswer(LOCK_LETTER, false, router, true);
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
      <Graveyard>{zombies}</Graveyard>
    </CenteredMain>
  );
}
