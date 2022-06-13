import currency from 'currency.js';
import React, { createContext, useReducer } from 'react';

const initialState = [];

function cartReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, action.productId];
    case 'reset':
      return initialState;
    case 'remove':
      const { index } = action;
      return [...state.slice(0, index), ...state.slice(index + 1)];
    default:
      throw new Error();
  }
}

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const add = (productId) => dispatch({ type: 'add', productId });
  const remove = (index) => dispatch({ type: 'remove', index });
  const reset = () => dispatch({ type: 'reset' });

  return (
    <CartContext.Provider value={{ cart: state, add, remove, reset }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const state = React.useContext(CartContext);

  if (state === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }

  return state;
}

export const cartSelector = (products, cart) => {
  return cart
    .map((productId) => {
      if (products[productId]) {
        return { ...products[productId] };
      }
      return null;
    })
    .filter((item) => Boolean(item));
};

export const cartTotalSelector = (products, cart) => {
  return cart.reduce((acc, next) => {
    const product = products[next];
    if (product) {
      acc = acc.add(product.price);
    }
    return acc;
  }, currency(0));
};

export const cartDescSelector = (products, cart) => {
  return cart
    .map((id) => {
      const product = products[id];
      return product ? product.name : '';
    })
    .join(';');
};
