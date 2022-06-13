import { Heading, VStack } from '@chakra-ui/react';
import Text from 'components/Text';

export const Empty = () => (
  <VStack align="left">
    <Heading variant="headlineBig">Your product inventory is empty</Heading>
    <Text>Go to the Home page and add your first product to get started.</Text>
  </VStack>
);
