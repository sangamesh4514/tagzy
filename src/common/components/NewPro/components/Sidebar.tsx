import React from 'react';
import { Cart } from './Cart';
import '../styles/Sidebar.css';

export function Sidebar() {
  return (
    <div className="sidebar">
      <div className="donate-section">
        <h2>Donate</h2>
        <div className="amount-input">
          <span className="currency">$</span>
          <input type="number" defaultValue="3.00" step="0.50" min="0" />
        </div>
        <input type="text" placeholder="Your name" className="text-input" />
        <textarea placeholder="Add message" className="text-input"></textarea>
        <button className="donate-button">Donate $3.00</button>
      </div>


      <div className="subscription-section">
        <h2>Subscription tiers</h2>
        <div className="tier-card">
          <div className="tier-header">
            <h3>Basic</h3>
            <span className="tier-price">$4<span>/mth</span></span>
          </div>
          <div className="tier-features">
            <p>What's included:</p>
            <ul>
              <li>Access to premium posts</li>
              <li>One free course</li>
            </ul>
          </div>
        </div>
        <div className="tier-card premium">
          <div className="tier-header">
            <h3>Advanced</h3>
            <span className="tier-price">$8<span>/mth</span></span>
          </div>
          <div className="tier-features">
            <p>What's included:</p>
            <ul>
              <li>Access to premium posts</li>
              <li>All free courses</li>
            </ul>
          </div>
          <button className="subscribe-button">Subscribe</button>
        </div>
      </div>
    </div>
  );
}

