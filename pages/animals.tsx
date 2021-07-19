import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { CenteredMain } from "../components/Centered";
import { checkAnswer } from "../services/checkAnswer";
import Image from "next/image";

const LOCK_LETTER = "A";

const Grabable = styled.div`
  cursor: grabbing;
`;

function shuffle(array: []) {
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback && savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const A = ({ animals }) => {
  const router = useRouter();
  const [catUrl, setCatUrl] = useState(animals[0].url);
  const [animalIndex, setAnimalIndex] = useState(0);
  const [isDog, setIsDog] = useState(
    animals[0].url.startsWith("https://images.dog.ceo")
  );

  useInterval(() => {
    let animal;
    if (animalIndex <= animals.length - 1) {
      animal = animals[animalIndex];
      setCatUrl(animal.url);
      setIsDog(animal.url.startsWith("https://images.dog.ceo"));
      setAnimalIndex(animalIndex + 1);
    } else {
      animal = animals[0];
      setCatUrl(animal.url);
      setIsDog(animal.url.startsWith("https://images.dog.ceo"));
      setAnimalIndex(1);
    }
  }, 1000);

  const handleSubmit = () => {
    checkAnswer(LOCK_LETTER, isDog, router);
  };

  return (
    <CenteredMain>
      <h1>Catch the dog!</h1>
      {catUrl && (
        <Grabable>
          <Image
            alt="cat-pic"
            src={catUrl}
            height="500px"
            width="500px"
            onClick={handleSubmit}
          />
        </Grabable>
      )}
    </CenteredMain>
  );
};

export async function getServerSideProps() {
  const catResponse = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=10`
  );
  const cats = await catResponse.json();
  const dogResponse = await fetch("https://dog.ceo/api/breeds/image/random");
  const dog = await dogResponse.json();
  const animals = shuffle([...cats, { url: dog.message }]);

  return {
    props: { animals }, // will be passed to the page component as props
  };
}

export default A;
