import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CenteredMain } from '../components/Centered';
import { useRouter } from 'next/router';
import { checkAnswer } from '../services/checkAnswer';
import Countdown, { zeroPad } from 'react-countdown';
import timebomb from '../public/timebomb.png';
import Image from 'next/image';

type MainColor = 'red' | 'green' | 'blue';
type ExtendedColor = MainColor | 'gray';

interface ICountdownRenderer {
    minutes: number;
    seconds: number;
    milliseconds: number;
    completed: boolean;
}

interface IColorButton {
    originalColor: MainColor;
    onClick: () => void;
}

interface IBomb {
    onCountdownComplete: () => void;
    start: boolean;
    endTime: number | null;
}

const LOCK_LETTER = 'T';

const RED = 'red';
const GREEN = 'green';
const BLUE = 'blue';

const ControlPanelGrid = styled.div`
    background: gray;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
    column-gap: 10px;
    row-gap: 10px;
    height: 600px;
    width: 600px;
    border: 5px solid black;
`;

const ColorSquare = styled.div`
    background: ${({ color }) => color};
    border: 1px solid black;
`;

const ColorButton: React.FC<IColorButton> = ({ originalColor, onClick }) => {
  const [color, setColor] = useState<ExtendedColor>(originalColor);

  const handleClick = () => {
    onClick();
    setColor('gray');
  };

  return <ColorSquare onClick={handleClick} color={color} />;
};

function getRandomColor(): MainColor {
  const colors: MainColor[] = [RED, GREEN, BLUE];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getButtonColors() {
  return Array.from({ length: 36 }, () => getRandomColor());
}

const Boom = styled.span`
    font-size: 20em;
`;

const BombContainer = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
`;

const Dynamite = styled.div`
    width: 500px;
    height: 50px;
    background: red;
    border-radius: 10px;
    border: 1px solid black;
`;

const TimerContainer = styled.div`
    width: 5.5em;
    height: 2em;
    background: black;
    display: flex;
    align-items: center;
    font-size: 1.7em;
    color: red;
    font-family: monospace;
    position: relative;
    z-index: 1;
    top: 4.7em;
    left: 9.3em;
`;

const countdownRenderer = ({
  minutes,
  seconds,
  milliseconds,
  completed
}: ICountdownRenderer) => {
  if (completed) {
    return '00:00:000';
  } else {
    return (
      <span>
        {zeroPad(minutes)}:{zeroPad(seconds)}:{zeroPad(milliseconds)}
      </span>
    );
  }
};

const RelativeDiv = styled.div`
    position: relative;
    margin-top: -5em;
    width: 500px;
`;

const Bomb: React.FC<IBomb> = ({ onCountdownComplete, start, endTime }) => {
  return (
    <BombContainer>
      <RelativeDiv>
        <TimerContainer>
          {start ? (
            <Countdown
              onComplete={onCountdownComplete}
              precision={3}
              intervalDelay={0}
              zeroPadTime={2}
              renderer={countdownRenderer}
              date={endTime || Date.now()}
            />
          ) : (
            '--:--:---'
          )}
        </TimerContainer>
        <Image src={timebomb} layout="responsive" />
      </RelativeDiv>
    </BombContainer>
  );
};

export default function W() {
  const router = useRouter();
  const [mainColor, setMainColor] = useState<MainColor>();
  const [buttonColors, setButtonColors] = useState<MainColor[]>([]);
  const [mainColorCount, setMainColorCount] = useState<number>(0);
  const [boom, setBoom] = useState(false);
  const [endTime, setEndTime] = useState<null | number>(null);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    const buttonColors = getButtonColors();
    const main = getRandomColor();
    setButtonColors(buttonColors);
    setMainColor(main);
    setMainColorCount(buttonColors.filter(c => c === main).length);
  }, []);

  const handleClick = (color: MainColor) => {
    if (!timerStarted) {
      setTimerStarted(true);
      setEndTime(Date.now() + 10000);
    }

    if (mainColorCount - 1 === 0) {
      setTimerStarted(false);
      setTimeout(() => checkAnswer(LOCK_LETTER, true, router), 500);
    }

    if (color === mainColor) {
      setMainColorCount(oldCount => oldCount - 1);
    } else {
      setBoom(true);
      setTimeout(
        () => checkAnswer(LOCK_LETTER, false, router, true),
        500
      );
    }
  };

  const onCountdownComplete = () => {
    setBoom(true);
    setTimeout(() => checkAnswer(LOCK_LETTER, false, router, true), 500);
  };

  return (
    <CenteredMain>
      <h1>{`Press the ${mainColor} buttons to disarm the bomb!`}</h1>
      {boom ? (
        <Boom>💥</Boom>
      ) : (
        <Bomb
          onCountdownComplete={onCountdownComplete}
          endTime={endTime}
          start={timerStarted}
        />
      )}
      <ControlPanelGrid>
        {buttonColors.map((color, i) => (
          <ColorButton
            onClick={() => handleClick(color)}
            originalColor={color}
            key={color + i}
          />
        ))}
      </ControlPanelGrid>
    </CenteredMain>
  );
}
