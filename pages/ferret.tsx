import Image from "next/image";
import { useRouter } from "next/router";
import styled, { keyframes } from "styled-components";
import ferret from "../public/ferret.png";
import { checkAnswer } from "../services/checkAnswer";
import { CenteredMain } from "../components/Centered";

const OuterContainer = styled.div`
  width: 100vw;
  height: 100vh;
  cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>🧊</text></svg>")
      16 0,
    auto; /*!emojicursor.app*/
`;

const moveX = keyframes`
  100% {
    transform: translateX(calc(100vw - 100px));
  }
`;

const moveY = keyframes`
  100% {
    transform: translateY(calc(100vh - 100px));
  }
`;
const ImageContainer = styled.div`
  width: 100px;
  height: 100px;

  animation: ${moveX} 13s linear infinite alternate;

  .y {
    animation: ${moveY} 5s linear infinite alternate;
  }
`;

export default function F() {
  const router = useRouter();
  return (
    <OuterContainer>
      <h1>Freeze the Ferret!</h1>
      <ImageContainer>
        <div className="y" onClick={() => checkAnswer("F", true, router)}>
          <Image alt="flying ferret" layout="intrinsic" src={ferret} />
        </div>
      </ImageContainer>
    </OuterContainer>
  );
}
