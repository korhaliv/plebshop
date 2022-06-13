import { Flex, VStack } from '@chakra-ui/react';
import { Header } from './Header';

export function Page({ children, shouldShowFork, ...rest }) {
  return (
    <VStack height="100%" spacing={0} align="stretch" {...rest}>
      <Header shouldShowFork={shouldShowFork} />
      <Flex p={4} flex={1} direction="column" overflowY="hidden">
        {children}
      </Flex>
    </VStack>
  );
}
