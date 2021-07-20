import { useState, ChangeEvent, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import IdaPic from "../public/ida.jpg";

import Centered from "../components/Centered";
import Typer from "../components/Typer";
import styles from "../styles/Home.module.css";

import styled from "styled-components";
import { CenteredMain } from "../components/Centered";

import alphabet from "../services/alphabet";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
  flex-wrap: wrap;
`;

const Locked = styled.div`
  &:after {
    content: "🔒";
  }

  cursor: pointer;
  width: fit-content;
  margin: 1em;
  padding: 1em;
  border: 3px solid red;
  color: red;
`;

const Unlocked = styled.div`
  &:after {
    content: "🔓";
  }

  cursor: pointer;
  width: fit-content;
  margin: 1em;
  padding: 1em;
  border: 3px solid green;
  color: green;
`;

const Disabled = styled.div`
  &:after {
    content: "🔒";
  }

  cursor: not-allowed;
  width: fit-content;
  margin: 1em;
  padding: 1em;
  border: 3px solid gray;
  color: gray;
`;

const getLetterButton = (letter: string, href: string) => {
  if (typeof window === "undefined") return;

  const unlocked = window && window.localStorage.getItem(`ida:locks:${letter}`);
  if (href === "") {
    return <Disabled>{letter}</Disabled>;
  } else if (unlocked) {
    return <Unlocked>{letter}</Unlocked>;
  }

  return <Locked>{letter}</Locked>;
};

const LockGrid = ({ playerName }: { playerName: string }) => {
  const [_, setNeedsReset] = useState(false);

  const resetGame = () => {
    window && window.localStorage.clear();
    setNeedsReset(true);
  };

  return (
    <CenteredMain>
      <Container>
        <span>{`${playerName}, I am so glad you have agreed to help me. My cage has 26 locks. You will need to solve a puzzle for each lock. Once all locks have been opened, I will be free!`}</span>
        {Object.entries(alphabet).map((entries) => {
          const [letter, href] = entries;
          return (
            <Link href={href} key={letter} passHref>
              <div>{getLetterButton(letter, href)}</div>
            </Link>
          );
        })}
        <button onClick={resetGame}>reset game?</button>
      </Container>
    </CenteredMain>
  );
};

export default function Home() {
  const [introduced, setIntroduced] = useState(false);
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    window &&
      setPlayerName(window.localStorage.getItem("ida:playerName") || "");
  }, [introduced]);

  return playerName ? (
    <LockGrid playerName={playerName} />
  ) : (
    <Intro setIntroduced={setIntroduced} />
  );
}

function Intro({ setIntroduced }: { setIntroduced: Function }) {
  const [playerName, setPlayerName] = useState("");
  const [step, setStep] = useState(1);

  const handleUserInput = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setPlayerName(target.value);
    window && window.localStorage.setItem("ida:playerName", target.value);
  };

  return (
    <div className={styles.container}>
      {step === 1 ? (
        <>
          <Typer text="Hello friend. What is your name?" />
          <br />
          <input onChange={handleUserInput} />
          <br />
          <button onClick={() => setStep(2)}> Enter </button>
        </>
      ) : (
        <Centered>
          <Image alt="monkey in cage" src={IdaPic} height="500px"></Image>
          <Typer
            onFinished={() => setStep(3)}
            text={`Hello ${playerName}. I am so glad I found you. I need your help. My name is Ida. I am a monkey. Yes, I know how to use a computer. Long story. Anyway, a mean scientist is holding me in his lab, and I need your help to escape. Can you help me, ${playerName}?`}
          />
        </Centered>
      )}
      {step === 3 && (
        <>
          <br />
          <button onClick={() => setIntroduced(true)}>Yes</button>
          <br />
          <Link href="mission-rejected">No</Link>
        </>
      )}
    </div>
  );
}
