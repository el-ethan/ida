export const setCorrectAnswer = (letter: string) => {
  window && window.localStorage.setItem(`ida:locks:${letter}`, "true");
};
