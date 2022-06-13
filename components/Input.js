import { Input as BaseInput } from '@chakra-ui/react';

export default function Input(props) {
  return <BaseInput variant="filled" height={14} {...props} />;
}
