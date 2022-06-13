import { Heading, Spinner, VStack } from '@chakra-ui/react';
import Button from 'components/Button';
import { Page } from 'components/Page';
import { ProductList } from 'components/product/ProductList';
import { useUserContext } from 'context/user';
import useChangeRouteWatcher from 'hooks/useChangeRouteWatcher';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Text from '../../components/Text';
import {
  cartDescSelector,
  cartSelector,
  cartTotalSelector,
  useCartContext,
} from '../../context/cart';
import { useProductContext } from '../../context/product';

export const CartConfirm = () => {
  const router = useRouter();
  const { products } = useProductContext();
  const { cart, remove, reset } = useCartContext();
  const cartContents = cartSelector(products, cart);
  const total = cartTotalSelector(products, cart);
  const isLoading = useChangeRouteWatcher();
  const { user: userData = {} } = useUserContext();

  const {
    user,
    profile: { currencies },
  } = userData;

  const defaultCurrency = currencies.find((c) => c.isDefaultCurrency);

  const onDiscard = () => {
    reset();
    router.push('/home');
  };

  useEffect(() => {
    if (!cart.length) {
      reset();
      router.push('/home');
    }
  });

  const checkoutParams = new URLSearchParams({
    amount: total.toString(),
    currency: defaultCurrency?.currency,
    desc: cartDescSelector(products, cart),
    user,
  });

  return (
    <Page height="auto" minHeight="100%">
      <VStack align="stretch" height="100%" flex={1} mx={-4}>
        <Heading px={4} variant="headlineSmall">
          Checkout
        </Heading>

        <Text px={4}>
          Subtotal&nbsp;&nbsp;
          <Text as="span" fontWeight="bold" color="face.primary">
            {total?.format()}
          </Text>
        </Text>

        <ProductList
          products={cartContents}
          onRemove={({ index }) => remove(index)}
          flex={1}
          py="32px"
        />

        <VStack align="stretch" mt="auto" px={4}>
          {isLoading ? (
            <Spinner alignSelf="center" mb="50px" />
          ) : (
            <>
              <Button
                isLoading={isLoading}
                onClick={() =>
                  router.push(`/checkout?${checkoutParams.toString()}`)
                }
              >
                Generate Invoice
              </Button>
              <Button
                isDisabled={isLoading}
                variant="outline"
                onClick={onDiscard}
              >
                Discard
              </Button>
            </>
          )}
        </VStack>
      </VStack>
    </Page>
  );
};
