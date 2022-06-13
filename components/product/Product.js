import { Flex, Image } from '@chakra-ui/react';
import Button from 'components/Button';
import Price from 'components/Price';
import Text from 'components/Text';

const DeleteButton = (props) => {
  return (
    <Button color="face.negative" variant="secondary" pr={0} {...props}>
      Delete
    </Button>
  );
};

const Product = ({ price, name, image, onRemove }) => {
  return (
    <Flex
      py="13px"
      px={4}
      width="100%"
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex flex={1} minWidth="0">
        <Image
          borderRadius={5}
          width={45}
          height={45}
          src={image}
          alt="product image"
        />
        <Flex direction="column" ml={3} minWidth="0">
          <Text color="face.primary" fontWeight="bold" noOfLines={1}>
            {name}
          </Text>
          <Price price={price} />
        </Flex>
      </Flex>

      <DeleteButton flexShrink={0} onClick={onRemove} />
    </Flex>
  );
};

export default Product;
