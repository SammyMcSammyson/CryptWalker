import React, { useState, useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GameUI from '../Components/GameUI';

function GameContainer() {
  // --- The Source of Truth ---
  const [totalGold, setTotalGold] = useState(0);
  const [clickState, setClickState] = useState(0);
  const [goldPerSecond, setGoldPerSecond] = useState(0.0);
  const [goldPerClick, setGoldPerClick] = useState(1);
  const [goldDonated, setGoldDonated] = useState(0);
  const [gamblings, setGamblings] = useState(0);

  // --- TEMPORARY FIX TO REMOVE UNUSED VARIABLE WARNINGS ---
  const __ignoreWarnings = () => {
    setGoldPerClick(goldPerClick);
    setGoldPerSecond(goldPerSecond);
  };

  // --- 2. Action Handlers ---

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
        setTotalGold((prevGold) => prevGold + netChange);
      }
    } else {
      // Toast for not enough gold
      toast.warning(
        'You need more gold you povo, I would suggest having at least 50 gold if you can afford it you poor fuck.',
        {
          theme: 'colored',
          autoClose: 1000,
        }
      );
      console.log('Not enough gold to gamble! Need 50 gold.');
    }
  };

  // --- Flag Effects for certain alerts to appear ---

  // Gold Donated Flag for initial showing (Unlocks Donate Button permanently)
  useEffect(() => {
    const alertKey = 'alerted_goldDonated_upgrade';

    if (totalGold > 19 && localStorage.getItem(alertKey) === null) {
      toast.info(
        `Wow looks like you can Donate gold to the Troll Union. I guess even Trolls want fair pay.`,
        {
          position: 'top-center',
          autoClose: 5000,
          theme: 'colored',
          transition: Bounce,
        }
      );
      localStorage.setItem(alertKey, 'true');
    }
  }, [totalGold]);

  // Gamble Flag for initial showing (Unlocks Gamble Button permanently)
  useEffect(() => {
    const alertKey = 'alerted_Gambling_upgrade';

    if (goldDonated > 50 && localStorage.getItem(alertKey) === null) {
      // Toast for feature unlock
      toast.info(
        `Hey guess there are some perks of donated to the Troll Union. Looks like you can use their slots machine and Gamble some of your gold.`,
        { theme: 'colored', transition: Bounce, autoClose: 5000 }
      );
      localStorage.setItem(alertKey, 'true');
    }
  }, [goldDonated]);

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
    { gamblings }
  );

  return (
    <GameUI
      totalGold={totalGold}
      goldPerSecond={goldPerSecond}
      goldPerClick={goldPerClick}
      goldDonated={goldDonated}
      gamblings={gamblings}
      clickState={clickState}
      onDonate={handleDonateGold}
      onGamble={handleGambleGold}
      onGoldClick={handleGoldClick}
    />
  );
}

export default GameContainer;
