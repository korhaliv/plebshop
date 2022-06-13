import { Box } from '@chakra-ui/react';

export function HBar(props) {
  return (
    <Box
      width="100%"
      sx={{
        borderBottomWidth: 1,
        borderColor: 'border.secondary',
      }}
      {...props}
    />
  );
}
