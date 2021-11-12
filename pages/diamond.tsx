
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { CenteredMain } from '../components/Centered';
import { checkAnswer } from '../services/checkAnswer';

const BrownSquare = styled.div`
  height: 100px;
  width: 100px;
  background: #5a2f2f;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
`;


const D = () => {
  const router = useRouter();
  const size = 16;
  const cells = Array.from ({length: size}, (x, i) => i + 1);
  const diamondIndex = Math.floor(Math.random() * size);
  console.log(diamondIndex);

  return (
    <CenteredMain>
      <h1>Dig The Diamond</h1>
      <Container>
      {cells.map((c) => {
        return <BrownSquare onClick={() => checkAnswer("D", c === diamondIndex, router)}>{c}</BrownSquare>
      })}
      </Container>
    </CenteredMain>
  )
}

export default D;