import { useEffect } from 'react';
import Centered, { CenteredMain } from '../components/Centered';
import Typer from '../components/Typer';

const Rejected = () => {
  useEffect(() => {
    window && window.localStorage.setItem('ida:playerName', '');
  });

  return (
    <CenteredMain>
      <Centered>
        <Typer text="Okay...I understand. Goodbye then..." />
      </Centered>
    </CenteredMain>
  );
};

export default Rejected;
