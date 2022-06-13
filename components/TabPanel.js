import { Flex, TabPanel as BaseTabPanel } from '@chakra-ui/react';

export function TabPanel({ children, ...rest }) {
  return (
    <BaseTabPanel height="100%" {...rest}>
      <Flex direction="column" height="100%" justifyContent="space-between">
        {children}
      </Flex>
    </BaseTabPanel>
  );
}
