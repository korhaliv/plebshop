import { useUserContext } from 'context/user';
import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';

export const useRequireLogin = () => {
  const { isLoggedIn } = useUserContext();
  const router = useRouter();
  useLayoutEffect(() => {
    if (isLoggedIn === false) {
      router.replace('/signup');
    }
  });
};
