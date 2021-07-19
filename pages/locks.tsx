import { useState } from "react";
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

const LockGrid = () => {
  const [needsReset, setNeedsReset] = useState(false);

  const resetGame = () => {
    window && window.localStorage.clear();
    setNeedsReset(true);
  };

  return (
    <CenteredMain>
      <Container>
        {Object.entries(alphabet).map((entries) => {
          const [letter, href] = entries;
          return getLetterButton(letter, href);
        })}
        <button onClick={resetGame}>reset game?</button>
      </Container>
    </CenteredMain>
  );
};

export default LockGrid;
