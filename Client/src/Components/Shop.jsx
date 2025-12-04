import shopItems from '../../public/Lib/ShopData.json';
import React, { useState } from 'react';
import '../CSS/shop.css';

export default function Shop({ onClose, onPurchaseItem, onSellItem }) {
  const [expandedItemId, setExpandedItemId] = useState(null);

  const handleItemClick = (itemId) => {
    setExpandedItemId((prevId) => (prevId === itemId ? null : itemId));
  };

  return (
    <div className='modal-backdrop' onClick={onClose}>
      <div className='modal-content-box' onClick={(e) => e.stopPropagation()}>
        <button className='modal-close-btn' onClick={onClose}>
          &times;
        </button>
        <h2 className='ShopTitle'>Shop </h2>
        <div className='shop-container'>
          {shopItems.map((item) => {
            const isExpanded = expandedItemId === item.id;

            return (
              <div
                key={item.id}
                className={`shop-item-card ${isExpanded ? 'expanded' : ''}`}
              >
                <h3
                  className='item-name-toggle'
                  onClick={() => handleItemClick(item.id)}
                >
                  {item.name}
                </h3>

                {isExpanded && (
                  <div className='item-details'>
                    <p className='item-description'>{item.description}</p>
                    <p>
                      <span className='item-label'>Price:</span> {item.price}
                    </p>
                    <p>
                      <span className='item-label'>Gold Per Second:</span>
                      {item.goldPerSecond}
                    </p>
                    <p>
                      <span className='item-label'>Gold Per Click:</span>
                      {item.goldPerClick}
                    </p>
                    <p>
                      <span className='item-label'>Attack:</span> {item.attack}
                    </p>
                    <p>
                      <span className='item-label'>Health:</span> {item.health}
                    </p>
                    <button onClick={() => onPurchaseItem(item)}>Buy</button>
                    <button onClick={() => onSellItem(item)}>Sell</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
