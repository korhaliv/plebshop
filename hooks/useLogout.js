import { useUserContext } from 'context/user';

export const useLogout = () => {
  const { logout } = useUserContext();
  // Only clear user and persist user catalogue
  return () => {
    logout();
  };
};
