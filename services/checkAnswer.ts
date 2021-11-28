import { NextRouter } from "next/router";
import { setCorrectAnswer } from "./localStorage";

export const checkAnswer = (
  letter: string,
  isCorrect: boolean,
  router: NextRouter,
  reloadPage = false
) => {
  const playerName =
    (window && window.localStorage.getItem("ida:playerName")) || "stranger";

  if (isCorrect) {
    setCorrectAnswer(letter);
    alert(
      `🐵 Yay! Good job ${playerName}, you have unlocked the ${letter} lock! 🎉 🔓`
    );
    router.push("/");
  } else {
    alert("🙈");
    if(reloadPage) {
      router.reload();
    }
  }
};
