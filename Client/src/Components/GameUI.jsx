import React from 'react';
import Stats from './Stats';
import ActionButtons from './ActionButtons';
import { ToastContainer } from 'react-toastify';

// This w is only responsible for rendering the UI elements.
function GameUI({
  totalGold,
  goldPerSecond,
  goldPerClick,
  goldDonated,
  gamblings,
  onDonate,
  onGamble,
  onGoldClick,
  clickState,
}) {
  return (
    <div className='game-container'>
      <Stats
        totalGold={totalGold}
        goldPerSecond={goldPerSecond}
        goldPerClick={goldPerClick}
        goldDonated={goldDonated}
        gamblings={gamblings}
      />

      <ActionButtons
        onDonate={onDonate}
        onGamble={onGamble}
        onGoldClick={onGoldClick}
        goldDonated={goldDonated}
        clickState={clickState}
      />

      <ToastContainer limit={3} />
    </div>
  );
}

export default GameUI;
