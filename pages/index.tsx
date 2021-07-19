import { useState, ChangeEvent } from "react";
import Link from "next/link";

import Centered from "../components/Centered";
import Typer from "../components/Typer";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [playerName, setPlayerName] = useState("");
  const [step, setStep] = useState(1);

  const handleUserInput = (event: ChangeEvent) => {
    setPlayerName(event.target.value);
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
          <img
            src="https://i.pinimg.com/564x/9c/8b/ed/9c8bed5851760d1a7900f30e3878097b.jpg"
            height="200px"
          ></img>
          <Typer
            onFinished={() => setStep(3)}
            text={`Hello ${playerName}. I am so glad I found you. I need your help. My name is Ida. I am a monkey. Yes, I know how to use a computer. Long story. Anyway, a mean scientist is holding me in his lab, and I need your help to escape. Can you help me, ${playerName}?`}
          />
        </Centered>
      )}
      {step === 3 && (
        <>
          <Link href="mission-accepted">Yes</Link>
          <br />
          <Link href="mission-rejected">No</Link>
        </>
      )}
    </div>
  );
}
