import { Box, Heading, VStack } from '@chakra-ui/react';
import { HBar } from 'components/HBar';
import Product from './Product';

export const ProductList = ({ products, onRemove, ...rest }) => {
  return (
    <VStack spacing="0" align="stretch" {...rest}>
      <Heading as="h1" variant="category" px={4} mb={2}>
        Products
      </Heading>
      <Box>
        <VStack align="stretch" spacing="0">
          {Object.values(products).map((product, index) => (
            <Box key={product.id + index}>
              <HBar mx={-4} />
              <Product
                key={index}
                {...product}
                onRemove={() => onRemove({ id: product.id, index })}
              />
            </Box>
          ))}
        </VStack>
      </Box>
    </VStack>
  );
};
