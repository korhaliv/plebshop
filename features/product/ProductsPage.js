import { Heading, VStack } from '@chakra-ui/react';
import { ProductList } from 'components/product/ProductList';
import { useProductContext } from 'context/product';
import { AddNewProduct } from './AddNewButton';
import { Empty } from './Empty';

export function ProductsPage(props) {
  const { products, removeProduct } = useProductContext();
  const hasProducts = Object.keys(products)?.length;
  return (
    <VStack align="stretch" justify="space-between" {...props}>
      {hasProducts ? (
        <VStack align="stretch" mx={-4}>
          <Heading px={4} mb={3} variant="headlineSmall">
            Home
          </Heading>
          <ProductList
            flex={1}
            pb={5}
            products={products}
            onRemove={({ id }) => removeProduct(id)}
          />
        </VStack>
      ) : (
        <Empty />
      )}
      <AddNewProduct />
    </VStack>
  );
}
