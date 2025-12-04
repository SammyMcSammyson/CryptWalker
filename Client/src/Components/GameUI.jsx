import React, { useState } from 'react';
import Stats from './Stats';
import ActionButtons from './ActionButtons';
import { ToastContainer } from 'react-toastify';
import Shop from './Shop';

// This is only responsible for rendering the UI elements.
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
  gamblingsAmount,
  onPurchaseItem,
  onSellItem,
  ownedItems,
}) {
  // --- Shop Modal State Management ---
  const [isShopOpen, setIsShopOpen] = useState(false);
  const openShop = () => setIsShopOpen(true);
  const closeShop = () => setIsShopOpen(false);

  return (
    <div className='game-container'>
      <Stats
        totalGold={totalGold}
        goldPerSecond={goldPerSecond}
        goldPerClick={goldPerClick}
        goldDonated={goldDonated}
        gamblings={gamblings}
        gamblingsAmount={gamblingsAmount}
      />

      <ActionButtons
        onDonate={onDonate}
        onGamble={onGamble}
        onGoldClick={onGoldClick}
        goldDonated={goldDonated}
        clickState={clickState}
        onOpenShop={openShop}
        gamblings={gamblings}
        gamblingsAmount={gamblingsAmount}
      />

      {isShopOpen && (
        <Shop
          onClose={closeShop}
          onPurchaseItem={onPurchaseItem}
          onSellItem={onSellItem}
          ownedItems={ownedItems}
        />
      )}

      <ToastContainer limit={3} />
    </div>
  );
}

export default GameUI;
