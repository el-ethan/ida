import { useState, useEffect } from "react";

const Typer = ({
  text,
  onFinished,
}: {
  text: string;
  onFinished?: Function;
}) => {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    text.split("").forEach((char, index) => {
      setTimeout(() => {
        setTypedText(text.substr(0, index) + char);
        if (index + 1 === text.length) {
          onFinished && onFinished();
        }
      }, 100 * (index + 1));
    });
  }, [text]);

  return <span>{typedText}</span>;
};

export default Typer;
