export const cartSelector = (state) => {
  const { products } = state.products;
  const { cart } = state.cart;

  return cart
    .map((productId) => {
      if (products[productId]) {
        return { ...products[productId] };
      }
      return null;
    })
    .filter((item) => Boolean(item));
};
