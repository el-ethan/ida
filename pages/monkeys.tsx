import { useRouter } from "next/router";
import styled from "styled-components";
import { CenteredMain } from "../components/Centered";
import { checkAnswer } from "../services/checkAnswer";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 500px;
  cursor: help;
`;

const MonkeyDiv = styled.div`
  font-size: 1.5em;
`;

export default function B() {
  const router = useRouter();
  const size = 500;
  const cells = Array.from({ length: size }, (_, i) => i + 1);
  const seeNoEvilIndex = Math.floor(Math.random() * 500);

  return (
    <CenteredMain>
      <h1>Can you find me? 🙈</h1>
      <Container>
        {cells.map((c) => {
          return c === seeNoEvilIndex ? (
            <div onClick={() => checkAnswer("M", true, router)}>
              <MonkeyDiv>🙈</MonkeyDiv>
            </div>
          ) : (
            <div>
              <MonkeyDiv>🙉</MonkeyDiv>
            </div>
          );
        })}
      </Container>
    </CenteredMain>
  );
}
