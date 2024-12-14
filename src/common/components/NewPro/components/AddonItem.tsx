import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2 } from 'lucide-react';
import '../styles/AddonItem.css';
import { IAddon } from 'src/common/types';

interface AddonItemProps {
  addon: IAddon;
  inCart: boolean;
  onAdd: () => void;
}

export function AddonItem({ addon, inCart, onAdd }: AddonItemProps) {
  const { removeAddon, incrementAddon, decrementAddon, cartItem } = useCart();

  const addonInCart = cartItem?.addons.find((item) => item.addon._id === addon._id);

  return (
    <div className="addon-item">
      <img src={addon.imageUrl} alt={addon.imageUrl} className="addon-image" />
      <div className="addon-info">
        <h4>{addon.name}</h4>
        <p>{addon.description}</p>
        <p className="addon-price">₹{addon.cost}</p>
      </div>
      {inCart ? (
        <div className="addon-actions">
          <button onClick={() => decrementAddon(addon._id)}>-</button>
          <span>{addonInCart?.quantity || 0}</span>
          <button onClick={() => incrementAddon(addon._id)}>+</button>
          <button onClick={() => removeAddon(addon._id)} className="remove-addon">
            <Trash2 size={16} />
          </button>
        </div>
      ) : (
        <button onClick={onAdd} className="add-addon" disabled={!cartItem}>
          Add
        </button>
      )}
    </div>
  );
}

