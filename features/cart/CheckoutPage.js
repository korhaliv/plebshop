import { Heading, VStack } from '@chakra-ui/react';
import Button from 'components/Button';
import { useCartContext } from 'context/cart';
import { useProductContext } from 'context/product';
import { useUserContext } from 'context/user';
import { useRouter } from 'next/router';
import CartProduct from './CartProduct';
import { Empty } from './Empty';

const Checkout = (props) => {
  const { products } = useProductContext();
  const { cart, add } = useCartContext();
  const router = useRouter();
  const {
    user: { shop },
  } = useUserContext();
  return (
    <VStack alignItems="stretch" {...props}>
      <Heading variant="headlineSmall" mb="32px">
        {shop}
      </Heading>
      <VStack align="stretch" flex={1} spacing={3} width="100%">
        {Object.values(products).map((product, index) => (
          <CartProduct
            key={index}
            {...product}
            onClick={() => add(product.id)}
          />
        ))}
      </VStack>
      <Button
        isDisabled={!cart.length}
        onClick={() => router.push('/checkout/confirm')}
      >
        Checkout ({cart.length})
      </Button>
    </VStack>
  );
};

const CheckoutPage = (props) => {
  const { products } = useProductContext();
  const hasProducts = Object.keys(products)?.length;
  return hasProducts ? <Checkout {...props} /> : <Empty {...props} />;
};

export default CheckoutPage;
