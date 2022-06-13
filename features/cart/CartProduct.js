import { Flex, IconButton, Image } from '@chakra-ui/react';
import Price from 'components/Price';
import Text from 'components/Text';
import AddIcon from 'icons/add.svg';

const CartProduct = ({ price, name, image, ...rest }) => (
  <Flex
    p="16px"
    borderRadius="8px"
    justifyContent="space-between"
    alignItems="center"
    bg="object.secondary"
    {...rest}
  >
    <Flex alignItems="center" flex={1} minWidth="0">
      <Image
        mr="12px"
        width="40px"
        height="40px"
        src={image}
        borderRadius={5}
        alt="Product image"
      />
      <Flex direction="column" minWidth="0">
        <Text color="face.primary" fontWeight="bold" noOfLines={1}>
          {name}
        </Text>
        <Price price={price} />
      </Flex>
    </Flex>
    <IconButton
      _focus={{ boxShadow: 'none' }}
      variant="unstyled"
      pr={0}
      icon={<AddIcon />}
    />
  </Flex>
);

export default CartProduct;
