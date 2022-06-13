import { Flex } from '@chakra-ui/react';
import { ForkMeButton } from './ForkMeButton';
import { Logo } from './Logo';

export function Header({ shouldShowFork = false }) {
  return (
    <Flex
      py={2}
      sx={{ borderBottom: '1px', borderColor: '#333' }}
      justify="space-between"
      align="center"
      pr={3}
    >
      <Logo width={150} />
      {shouldShowFork && <ForkMeButton />}
    </Flex>
  );
}
