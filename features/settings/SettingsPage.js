import { Flex, Heading, Image, VStack } from '@chakra-ui/react';
import Button from 'components/Button';
import Text from 'components/Text';
import { useUserContext } from 'context/user';
import { useLogout } from 'hooks/useLogout';
import { useRouter } from 'next/router';

const LogoutButton = (props) => {
  return (
    <Button color="face.negative" variant="unstyled" {...props}>
      Logout
    </Button>
  );
};

const SettingsPage = () => {
  const {
    user: { user, profile },
  } = useUserContext();

  const logout = useLogout();

  const router = useRouter();

  const onLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <VStack align="start">
      <Heading as="h1" variant="headlineSmall" mb={3}>
        Settings
      </Heading>
      <Heading as="h1" variant="category" mb={2}>
        Account
      </Heading>
      <Flex
        alignSelf="stretch"
        alignItems="center"
        borderRadius="16px"
        p={0}
        px={4}
        mt={3}
        sx={{
          borderWidth: 1,
          borderColor: 'border.secondary',
        }}
      >
        {profile?.avatarUrl && (
          <Image
            borderRadius="50%"
            width="20px"
            height="20px"
            src={profile.avatarUrl}
            alt="avatar image"
            mr={2}
          />
        )}
        <Text fontWeight="bold" color="brand">
          {profile?.handle ?? user}
        </Text>
        <LogoutButton ml="auto" marginStart="auto" onClick={onLogout} />
      </Flex>
    </VStack>
  );
};

export default SettingsPage;
