import { useRouter } from 'next/router';
import styled from 'styled-components';
import { CenteredMain } from '../components/Centered';
import { checkAnswer } from '../services/checkAnswer';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 500px;
`;

const Blue = styled.div`
  width: 50px;
  height: 50px;
  background: blue;
`;

const LessBlue = styled.div`
  width: 50px;
  height: 50px;
  opacity: 92%;
  background: blue;
`;

export default function B() {
  const router = useRouter();
  const size = 100;
  const cells = Array.from({ length: size }, (x, i) => i + 1);
  const bluestIndex = Math.floor(Math.random() * 100);

  return (
    <CenteredMain>
      <h1>
        Which is <em>bluest?</em>
      </h1>
      <Container>
        {cells.map((c) => {
          return c === bluestIndex ? (
            <div onClick={() => checkAnswer('B', true, router)}>
              <Blue />
            </div>
          ) : (
            <LessBlue />
          );
        })}
      </Container>
    </CenteredMain>
  );
}
