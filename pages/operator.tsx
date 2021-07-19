import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { CenteredMain } from "../components/Centered";
import { checkAnswer } from "../services/checkAnswer";

const LOCK_LETTER = "O";

const Operator = styled.div`
  border: 5px dashed green;
  color: green;
  display: inline-block;
  cursor: pointer;
`;

const Container = styled.div`
  font-size: 3em;
`;

const OperatorToggle = ({ selectOperator }) => {
  const [index, setIndex] = useState(0);
  const operators = ["-", "*", "%", "+", "=", "/"];
  const nextIndex = () => {
    const newIndex = index + 1 === operators.length ? 0 : index + 1;
    selectOperator(operators[newIndex]);
    setIndex(newIndex);
  };

  return <Operator onClick={nextIndex}>{operators[index]}</Operator>;
};

const O = () => {
  const [selectedOperator, selectOperator] = useState();
  const router = useRouter();

  const handleSubmit = () => {
    checkAnswer(LOCK_LETTER, selectedOperator === "+", router);
  };

  return (
    <CenteredMain>
      <Container>
        15 <OperatorToggle selectOperator={selectOperator} /> 5 = 20
      </Container>
      <br />
      <button onClick={handleSubmit}>This looks right ¯\_(ツ)_/¯</button>
    </CenteredMain>
  );
};

export default O;
