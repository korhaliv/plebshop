import { Heading, VStack } from '@chakra-ui/react';
import Text from 'components/Text';

export const Empty = () => (
  <VStack align="left">
    <Heading variant="headlineBig">Add your first product</Heading>
    <Text>
      Add physical items, services, or anything else you plan to sell.
    </Text>
  </VStack>
);
