import Button from 'components/Button';
import { useRouter } from 'next/router';

export const AddNewProduct = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.push(`/product/add`)}>Add product</Button>
  );
};
