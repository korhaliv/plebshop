import { AddNewProduct } from 'features/product/AddNew';
import { useRequireLogin } from 'hooks/useRequireLogin';

export default function AddProductPage(props) {
  useRequireLogin();
  return <AddNewProduct {...props} />;
}
