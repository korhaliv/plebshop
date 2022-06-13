import axios from 'axios';
import localforage from 'localforage';
import { createContext, useContext, useEffect, useReducer } from 'react';

const initialState = {};

function userReducer(state, action) {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.userName };
    case 'createShop':
      return { ...state, shop: action.shopName };
    case 'logout':
      return { ...initialState };
    case 'setUserProfile':
      return { ...state, profile: action.profile };
    case 'hydrate':
      return action.state;
    default:
      throw new Error();
  }
}

export const UserContext = createContext();

const USERNAME_KEY = 'user';
const SHOP_KEY = 'shop';

export function UserProvider(props) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const login = (userName) => {
    dispatch({ type: 'login', userName });
    localforage.setItem(USERNAME_KEY, userName);
  };

  const createShop = (shopName) => {
    dispatch({ type: 'createShop', shopName });
    localforage.setItem(SHOP_KEY, shopName);
  };

  const logout = () => {
    dispatch({ type: 'logout' });
    localforage.removeItem(USERNAME_KEY);
    localforage.removeItem(SHOP_KEY);
  };

  // Restore username and shop from the DB
  useEffect(() => {
    const restoreUserInfo = async () => {
      try {
        const userName = await localforage.getItem(USERNAME_KEY);
        const shopName = await localforage.getItem(SHOP_KEY);

        dispatch({ type: 'login', userName });
        dispatch({ type: 'createShop', shopName });
      } catch (e) {
        console.log(e);
      }
    };
    restoreUserInfo();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (state.user) {
          const user = await axios.get('/api/user/getUser', {
            params: { username: state.user },
          });

          dispatch({ type: 'setUserProfile', profile: user?.data });
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchUser();
  }, [state.user]);

  return (
    <UserContext.Provider
      value={{
        user: state,
        isLoggedIn: !!state.user,
        login,
        createShop,
        logout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const state = useContext(UserContext);

  if (state === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return state;
}
