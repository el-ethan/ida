import { setCorrectAnswer } from "./localStorage";

export const checkAnswer = (letter, isCorrect, router) => {
  if (isCorrect) {
    setCorrectAnswer(letter);
    alert(`🐵 Yay! You have unlocked the ${letter} lock! 🎉 🔓`);
    router.push("/locks");
  } else {
    alert("🙈");
  }
};
