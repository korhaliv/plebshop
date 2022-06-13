import localforage from 'localforage';
import React, { createContext, useEffect, useReducer } from 'react';
import { v4 as uuid } from 'uuid';

const PRODUCT_PREFIX = 'prod-';
const initialState = {};

function productsReducer(state, action) {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        [action.id]: action.product,
      };
    case 'remove':
      if (state[action.id]) {
        const result = { ...state };
        delete result[action.id];
        return result;
      }
      return state;
    case 'reset':
      return { ...initialState };
    case 'hydrate':
      return action.state;
    default:
      throw new Error();
  }
}

export const ProductContext = createContext();

const useFetchProducts = (onComplete) => {
  useEffect(() => {
    const products = { ...initialState };
    localforage
      .iterate(function (value, key) {
        if (key.startsWith(PRODUCT_PREFIX)) {
          try {
            products[key.replace(PRODUCT_PREFIX, '')] = JSON.parse(value);
          } catch (e) {}
        }
      })
      .then(function () {
        onComplete && onComplete(products);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
};

const getKey = (productId) => `${PRODUCT_PREFIX}${productId}`;

export function ProductProvider(props) {
  const [state, dispatch] = useReducer(productsReducer, initialState);
  const addProduct = (product) => {
    const id = uuid();
    const prod = { ...product, id };
    dispatch({ type: 'add', id, product: prod });
    localforage.setItem(getKey(id), JSON.stringify(prod));
  };

  const reset = () => dispatch({ type: 'reset' });
  const hydrate = (state) => dispatch({ type: 'hydrate', state });

  const removeProduct = (id) => {
    dispatch({ type: 'remove', id });
    localforage.removeItem(getKey(id));
  };

  useFetchProducts(hydrate);

  return (
    <ProductContext.Provider
      value={{ products: state, addProduct, removeProduct, reset }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const state = React.useContext(ProductContext);

  if (state === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }

  return state;
}
