import React from 'react';
import '../CSS/ActionButtonContainer.css';

function ActionButtons({
  onDonate,
  onGamble,
  onGoldClick,
  clickState,
  goldDonated,
  onOpenShop,
  gamblingsAmount,
}) {
  console.log('this is in actionButtons ', { gamblingsAmount });
  return (
    <div className='action-buttons-container'>
      {/* Main clicker button is always */}
      <button className='main-click-button' onClick={onGoldClick}>
        Collect Gold
      </button>

      {/* Donate Gold button: Shows when clickState > 20 */}
      {clickState > 19 && (
        <button className='action-donate' onClick={onDonate}>
          Donate 1 Gold
        </button>
      )}

      {/* Gamble Gold Button: Shows  when goldDonated > 50 */}
      {goldDonated > 50 && (
        <button className='action-gamble' onClick={onGamble}>
          Gamble 10 Gold
        </button>
      )}
      {/* Open Shop Button: Opens and Closes Shop */}
      {gamblingsAmount > 100 && (
        <button className='shop-button' onClick={onOpenShop}>
          Open Shop
        </button>
      )}
    </div>
  );
}

export default ActionButtons;
