import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GameUI from '../Components/GameUI';

function GameContainer() {
  // --- The Source of Truth ---
  const [totalGold, setTotalGold] = useState(500);
  const [clickState, setClickState] = useState(0);
  const [goldPerSecond, setGoldPerSecond] = useState(0.0);
  const [goldPerClick, setGoldPerClick] = useState(1);
  const [goldDonated, setGoldDonated] = useState(100);
  const [gamblings, setGamblings] = useState(0);
  const [gamblingsAmount, setGamblingsAmounts] = useState(100);
  const [ownedItems, setOwnedItems] = useState([]);

  // --- TEMPORARY FIX TO REMOVE UNUSED VARIABLE WARNINGS ---
  const __ignoreWarnings = () => {
    setGoldPerClick(goldPerClick);
    setGoldPerSecond(goldPerSecond);
  };

  // --- Action Handlers ---

  // Action: Gold Per Click
  const handleGoldClick = () => {
    setTotalGold((prevGold) => prevGold + goldPerClick);
    setClickState((prevClickCount) => prevClickCount + 1);
  };

  // Gold Donated (Reduces totalGold by 1)
  const handleDonateGold = () => {
    if (totalGold >= 1) {
      setTotalGold((prevGold) => prevGold - 1);
      setGoldDonated((prevCount) => prevCount + 1); // Track donations
    } else {
      // Toast for donation failure (custom config)
      toast.error(
        "You idiot. You can't donate money you do not have. Try this again and some Trolls might show you the error of your ways.",
        {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        }
      );
      console.log('Not enough gold to donate!');
    }
  };

  // Gold Gambled (Spends 10 gold, random win/loss)
  const handleGambleGold = () => {
    const cost = 10;
    if (totalGold >= 50) {
      // 50/50 chance to win or lose
      const winChance = Math.random();
      console.log(`this is the chance ${winChance} you need above 0.5 to win`);
      let netChange = 0;

      if (winChance < 0.6) {
        // Lose: Lose cost and amount spent
        const losings = Math.floor(Math.random() * 10);
        netChange = losings + cost;
        let netChange4Show = Math.abs(netChange);
        setGamblings((prevCount) => prevCount - netChange);
        setGamblingsAmounts((prev) => prev + 10);

        // Toast for loss
        toast.error(`You lost ${netChange4Show} gold. You loser.`, {
          theme: 'colored',
          autoClose: 500,
        });

        console.log(
          `You lost the gamble and ${netChange} and this is what we are ${netChange4Show}`
        );
        setTotalGold((prevGold) => prevGold - netChange);
      } else {
        // Win: Win back cost + a random amount (e.g., between 5 and 15)
        const winnings = cost + Math.floor(Math.random() * 5);
        netChange = winnings;

        // Toast for win
        toast.success(`You won ${netChange} gold. Well Done.`, {
          theme: 'colored',
          autoClose: 500,
        });

        console.log(`You won ${netChange} gold!`);
        setGamblings((prevCount) => prevCount + winnings); // Track gambling made/lost
        setGamblingsAmounts((prev) => prev + 10);
        setTotalGold((prevGold) => prevGold + netChange);
      }
    } else {
      // Toast for not enough gold
      toast.warning(
        'You need more gold you povo, I would suggest having at least 50 gold if you can afford it you poor fuck.',
        {
          theme: 'colored',
          autoClose: 2000,
        }
      );
      console.log('Not enough gold to gamble! Need 50 gold.');
    }
  };

  //purchases items from shop and stores in inventory

  const handlePurchaseItem = useCallback(
    (item) => {
      const cost = Number(item.price);

      if (totalGold < cost) {
        toast.error(
          `You need ${cost - totalGold} more gold to buy ${item.name}!`,
          { theme: 'colored' }
        );
        return;
      }

      setTotalGold((prevGold) => prevGold - cost);

      if (item.goldPerClick) {
        setGoldPerClick((prev) => prev + Number(item.goldPerClick));
      }

      if (item.goldPerSecond || item.goldPerSecond === '0') {
        setGoldPerSecond((prev) => prev + Number(item.goldPerSecond));
      }

      setOwnedItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        if (existing) {
          return prev.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [...prev, { ...item, quantity: 1 }];
      });

      toast.success(`Purchased ${item.name} for ${cost} gold!`, {
        theme: 'colored',
      });
      console.log(
        'this is in the purchase button ',
        item.goldPerClick,
        ownedItems
      );
    },
    [totalGold, ownedItems]
  );

  //purchases items from shop and stores in inventory

  const handleSellItem = useCallback(
    (item) => {
      const sellPrice = Math.floor(item.price * 0.5);

      const owned = ownedItems.find((i) => i.id === item.id);
      if (!owned || owned.quantity <= 0) {
        toast.error(`You don't own any ${item.name} to sell!`, {
          theme: 'colored',
        });
        return;
      }

      setOwnedItems((prev) => {
        return prev
          .map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0);
      });

      setTotalGold((prev) => prev + sellPrice);

      toast.success(`Sold ${item.name} for ${sellPrice} gold.`, {
        theme: 'colored',
      });

      console.log(`Sold 1x ${item.name}. New inventory:`, ownedItems);
    },
    [ownedItems]
  );

  // --- Flag Effects for certain alerts to appear ---

  // Gold Donated Flag for initial showing (Unlocks Donate Button permanently)
  useEffect(() => {
    const alertKey = 'alerted_goldDonated_upgrade';

    if (totalGold > 19 && localStorage.getItem(alertKey) === null) {
      alert(
        `Wow looks like you can Donate gold to the Troll Union. I guess even Trolls want fair pay.`
      );
      localStorage.setItem(alertKey, 'true');
    }
  }, [totalGold]);

  // Gamble Flag for initial showing (Unlocks Gamble Button permanently)
  useEffect(() => {
    const alertKey = 'alerted_Gambling_upgrade';

    if (goldDonated > 50 && localStorage.getItem(alertKey) === null) {
      alert(
        `Hey guess there are some perks of donated to the Troll Union. Looks like you can use their slots machine and Gamble some of your gold.`
      );
      localStorage.setItem(alertKey, 'true');
    }
  }, [goldDonated]);

  // Shop Flag for initial showing (Unlocks Shop Button permanently)
  useEffect(() => {
    const alertKey = 'alerted_Shop_upgrade';

    if (gamblingsAmount > 100 && localStorage.getItem(alertKey) === null) {
      alert(
        `The Pit Boss seeing that you like the slots - are shit at it - politley reminds you that you came here on an Adventure and points over to a shop where you can buy some gear. He also recomends buying the Journal...`
      );
      localStorage.setItem(alertKey, 'true');
    }
  }, [gamblingsAmount]);

  // Handles passive Gold Per Second income
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTotalGold((prevGold) => prevGold + goldPerSecond);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [goldPerSecond]);

  console.log(
    { totalGold },
    { goldPerSecond },
    { goldPerClick },
    { goldDonated },
    { gamblings },
    { gamblingsAmount }
  );

  return (
    <GameUI
      totalGold={totalGold}
      goldPerSecond={goldPerSecond}
      goldPerClick={goldPerClick}
      goldDonated={goldDonated}
      gamblings={gamblings}
      gamblingsAmount={gamblingsAmount}
      clickState={clickState}
      ownedItems={ownedItems}
      onDonate={handleDonateGold}
      onGamble={handleGambleGold}
      onGoldClick={handleGoldClick}
      onPurchaseItem={handlePurchaseItem}
      onSellItem={handleSellItem}
    />
  );
}

export default GameContainer;
