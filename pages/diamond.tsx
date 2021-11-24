import styled from 'styled-components';
import Cell from '../components/Cell';
import { CenteredMain } from '../components/Centered';

const BrownSquare = styled.div`
  height: 100px;
  width: 100px;
  background: #7e4e4e;
  border: 1px solid black;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
`;


const D = () => {
  const size = 16;
  const cells = Array.from ({length: size}, (x, i) => i + 1);
  const diamondCellIndex = Math.floor(Math.random() * size);
  console.log(diamondCellIndex);

  return (
    <CenteredMain>
      <h1>Dig The Diamond</h1>
      <Container>
      {cells.map((c) => {
        return <Cell key={c} cellIndex={c} diamondCellIndex={diamondCellIndex}></Cell>
      })}
      </Container>
    </CenteredMain>
  )
}

export default D;