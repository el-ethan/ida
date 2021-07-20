import { NextRouter } from "next/router";
import { setCorrectAnswer } from "./localStorage";

export const checkAnswer = (
  letter: string,
  isCorrect: boolean,
  router: NextRouter
) => {
  if (isCorrect) {
    setCorrectAnswer(letter);
    alert(`🐵 Yay! You have unlocked the ${letter} lock! 🎉 🔓`);
    router.push("/");
  } else {
    alert("🙈");
  }
};
