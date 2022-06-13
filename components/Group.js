import { VStack } from '@chakra-ui/react';
import Text from './Text';

export function Group({ children, caption, ...rest }) {
  return (
    <VStack
      align="left"
      spacing={5}
      borderRadius="16px"
      p={4}
      boxSizing="border-box"
      sx={{
        borderWidth: 1,
        borderColor: 'border.secondary',
      }}
      {...rest}
    >
      <Text pb={4} color="face.primary" fontWeight="bold">
        {caption}
      </Text>
      {children}
    </VStack>
  );
}
