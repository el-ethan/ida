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
  const diamondCellIndex = Math.ceil(Math.random() * size);
  const getGhostCellIndex = () => {
    let ghostIndex = Math.ceil(Math.random() * size);
    if (ghostIndex === diamondCellIndex) {
      return ghostIndex === 1 ? ghostIndex += 1 : ghostIndex -= 1;
    }
    return ghostIndex;
  }

  const ghostCellIndex = getGhostCellIndex();
  console.log({diamondCellIndex, ghostCellIndex});

  return (
    <CenteredMain>
      <h1>Dig The 💎</h1>
      <Container>
      {cells.map((c) => {
        return <Cell key={c} cellIndex={c} diamondCellIndex={diamondCellIndex} ghostCellIndex={ghostCellIndex}></Cell>
      })}
      </Container>
    </CenteredMain>
  )
}

export default D;