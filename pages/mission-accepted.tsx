import Link from "next/link";
import Centered, { CenteredMain } from "../components/Centered";
import Typer from "../components/Typer";

const Accepted = () => {
  return (
    <CenteredMain>
      <Centered>
        <Typer text="Hooray! Let's get to work then. No time to waste! \n\nMy cage has 26 locks, one for each letter of the alphabet. To open the locks, you need to help me solve a number of riddles, puzzles, and problems." />
        <br />
        <Link href="a-albatross">
          To get started on the first problem, click here!
        </Link>
      </Centered>
    </CenteredMain>
  );
};

export default Accepted;
