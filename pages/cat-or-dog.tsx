import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { CenteredMain } from "../components/Centered";
import { checkAnswer } from "../services/checkAnswer";
import Image from "next/image";

interface HidableCell {
  opacity: string;
}

const Cell = styled("div")<HidableCell>`
  height: 100px;
  width: 100px;
  background: white;
  opacity: ${(props) => props.opacity};
`;

const DisappearingCell = ({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: Function;
}) => {
  const [opacity, setOpacity] = useState("100%");

  const handleClick = () => {
    onClick();
    if (disabled) {
      return;
    }
    setOpacity("0");
  };

  return <Cell onClick={handleClick} opacity={opacity} />;
};

const ButtonLeft = styled.button`
  float: left;
  font-size: 5em;
`;

const ButtonRight = styled.button`
  float: right;
  font-size: 5em;
`;

const Hider = styled.div`
  height: 1000px;
  width: 1000px;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  cursor: pointer;
`;

const C = ({ animal, isCat }: { animal: string; isCat: boolean }) => {
  const router = useRouter();
  const [clicks, setClicks] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const isDog = !isCat;

  const handleClick = () => {
    if (clicks + 1 === 5) {
      setDisabled(true);
    } else {
      setClicks(clicks + 1);
    }
  };

  const handleSubmit = (type: "cat" | "dog") => {
    if (clicks < 1) {
      return;
    }
    setSubmitting(true);
    const catGuessedCorrectly = type === "cat" && isCat;
    const dogGuessedCorrectly = type === "dog" && isDog;
    const guessedCorrectly = catGuessedCorrectly || dogGuessedCorrectly;

    setTimeout(() => {
      checkAnswer("C", catGuessedCorrectly || dogGuessedCorrectly, router);
    });
    if (!guessedCorrectly) {
      router.reload();
    }
  };

  return (
    <>
      <ButtonLeft onClick={() => handleSubmit("cat")}>Cat?</ButtonLeft>
      <ButtonRight onClick={() => handleSubmit("dog")}>Dog?</ButtonRight>
      <CenteredMain>
        <Hider>
          <Image
            src={animal}
            alt="pic of dog or cat"
            height="1000px"
            width="1000px"
          />
        </Hider>
        <Hider>
          {!submitting &&
            Array.from({ length: 100 }).map((_, index) => {
              return (
                <DisappearingCell
                  onClick={handleClick}
                  disabled={disabled}
                  key={index}
                />
              );
            })}
        </Hider>
      </CenteredMain>
    </>
  );
};

export async function getServerSideProps() {
  let animal;
  let isCat = false;
  if (Math.random() >= 0.5) {
    const catResponse = await fetch(
      `https://api.thecatapi.com/v1/images/search`
    );
    const cat = await catResponse.json();
    animal = cat[0].url;
    isCat = true;
  } else {
    const dogResponse = await fetch("https://dog.ceo/api/breeds/image/random");
    const dog = await dogResponse.json();
    animal = dog.message;
  }

  return {
    props: { animal, isCat }, // will be passed to the page component as props
  };
}

export default C;
