import React from 'react';
import '/home/sammysammyson/Tech Educators/Projects/Crypt Walker/Client/src/CSS/Stats.css';

function Stats({
  totalGold,
  goldPerSecond,
  goldPerClick,
  goldDonated,
  gamblings,
  gamblingsAmount,
}) {
  return (
    <div className='stats-container'>
      {/* ALWAYS SHOW (The primary resource) */}
      <p className='stats-totalGold'>
        <span className='stat-label'>Total Gold</span>
        <span className='stat-value'>{totalGold}</span>
      </p>

      {/* Gold Per Second: Show if goldPerSecond > 0 */}
      {goldPerSecond > 0 && (
        <p className='stats-GoldPerSecond'>
          <span className='stat-label'>Gold Per Second</span>
          <span className='stat-value'>{goldPerSecond}</span>
        </p>
      )}

      {/* Gold Per Click: Show if goldPerClick > 1 */}
      {goldPerClick > 1 && (
        <p className='stats-GoldPerClick'>
          <span className='stat-label'>Gold Per Click</span>
          <span className='stat-value'>{goldPerClick}</span>
        </p>
      )}

      {/* 4. Health & Attack: Show if you start passing these props and they are > 0 */}
      <p className='stats-Health'>
        <span className='stat-label'>Health</span>
        <span className='stat-value'>0</span>
      </p>
      <p className='stats-Attack'>
        <span className='stat-label'>Attack</span>
        <span className='stat-value'>0</span>
      </p>

      {goldDonated > 0 && (
        <p className='stats-GoldDonated'>
          <span className='stat-label'>Gold Donated</span>
          <span className='stat-value'>{goldDonated}</span>
        </p>
      )}

      {/* Gambling (Net Winnings/Losses): Show if the value is NOT 0 */}
      {gamblingsAmount !== 0 && (
        <p className='stats-Gamblings'>
          <span className='stat-label'>Gambling Winnings</span>
          <span className='stat-value'>{gamblings}</span>
        </p>
      )}
    </div>
  );
}

export default Stats;
