import Text from './Text';

const Price = ({ price, ...rest }) => {
  return (
    <Text fontSize={13} {...rest}>
      ${price}
    </Text>
  );
};

export default Price;
