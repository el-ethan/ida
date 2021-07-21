import { CenteredMain } from "../components/Centered";
import styled from "styled-components";
import { checkAnswer } from "../services/checkAnswer";

import { useInterval } from "../services/useInterval";
import { useState } from "react";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 500px;
  height: 500px;
`;

interface ICell {
  background: string;
}

const Cell = styled("div")<ICell>`
  background: ${(props) => props.background};
  height: 50px;
  width: 50px;
  display: flex;
  padding: 15px;
  cursor: pointer;
`;

export default function P() {
  const router = useRouter();
  const [pigIndex, setPigIndex] = useState(Math.floor(Math.random() * 100));
  useInterval(() => setPigIndex(Math.floor(Math.random() * 100)), 700);
  return (
    <CenteredMain>
      <h1>Poke the pig!</h1>
      <Container>
        {Array.from({ length: 100 }).map((_, index) =>
          index + 1 === pigIndex ? (
            <Cell
              onClick={() => checkAnswer("P", true, router)}
              key={index}
              background="green"
            >
              🐖
            </Cell>
          ) : (
            <Cell key={index} background="brown">
              🌳
            </Cell>
          )
        )}
      </Container>
    </CenteredMain>
  );
}
