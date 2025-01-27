import type React from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import type { IAddon } from "src/common/types";
import { useCart } from "../context/CartContext";
import EmptyCart from "src/assets/icons/EmptyCart";

interface CartItemsProps {
  cartItem: any; // Replace 'any' with the actual type of cartItem
  removeFromCart: () => void;
}

export const CartItems: React.FC<CartItemsProps> = ({
  cartItem,
  removeFromCart,
}) => {
  const { incrementAddon, decrementAddon, removeAddon } = useCart();

  return (
    <>
      <div className="flex flex-row justify-between mb-2">
        <div>
          <div className="text-lg sm:text-xl font-bold sm:font-normal">
            Service:-
          </div>
        </div>
        <div>
          <button
            className="header-button border-solid border-2 hover:border-red-800 hover:text-red-800"
            onClick={removeFromCart}
          >
            <span>Clear Cart</span>{" "}
            <EmptyCart className="w-6 h-6 inline mb-1.5" />
          </button>
        </div>
      </div>

      <div className="service-info">
        <div className="service-card-cart">
          <div>
            <img
              src={cartItem.service.image[0] || "/placeholder.svg"}
              alt="service-image"
              className="h-14 w-16 sm:h-16"
            />
          </div>
          <div className="text-md sm:text-lg">{cartItem.service.name}</div>
          <div className="ml-auto text-xl sm:text-3xl text-colorA font-bold sm:font-bold">
            ₹{cartItem.service.cost}
          </div>
        </div>
      </div>

      {cartItem.addons.length > 0 && (
        <section>
          <div className="text-lg sm:text-xl font-bold sm:font-normal my-2">
            Addons :-
          </div>
          <div className="addonsSectionCart">
            {cartItem.addons.map(
              ({ addon, quantity }: { addon: IAddon; quantity: number }) => (
                <div key={addon._id} className="addon-card">
                  <img
                    src={addon.imageUrl || "/placeholder.svg"}
                    alt={addon.name}
                    className="h-14 w-16 sm:h-16"
                  />
                  <div className="addon-info">
                    <h4 style={{ fontSize: "1rem" }}>{addon.name}</h4>
                    <p style={{ fontSize: "1rem", marginBottom: "0" }}>
                      ₹{addon.cost} x {quantity}
                    </p>
                  </div>
                  <div className="quantity-controls">
                    <button
                      onClick={() => decrementAddon(addon._id)}
                      className="decrementAddon"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => incrementAddon(addon._id)}
                      className="incrementAddon"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    className="delete-button"
                    onClick={() => removeAddon(addon._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <span className="price">₹{addon.cost * quantity}</span>
                </div>
              )
            )}
          </div>
        </section>
      )}
    </>
  );
};
