import { useRouter } from 'next/router';
import { useUserContext } from '../context/user';

export default function Initializer() {
  const router = useRouter();
  const { user } = useUserContext();
  // Make sure we're in the browser
  if (typeof window !== 'undefined') {
    router.push(user?.user ? '/home' : '/signup');
  }

  return null;
}
