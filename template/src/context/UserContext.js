import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import PropTypes from "prop-types";

import {
  login,
  createUser,
  resetPassword,
  onAuthStateChange,
  socialSignIn,
  logout,
} from "common/firebase/auth/AuthService";

const UserContext = createContext({
  user: null,
});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set auth state change listener.
  useEffect(() => {
    const listener = onAuthStateChange({
      onLogin: (authenticatedUser) => {
        setUser(authenticatedUser);
        setLoading(false);
      },
      onLogout: () => {
        setUser(null);
        setLoading(false);
      },
    });
    return listener; // unsubsribe on unmount
  }, [setUser, setLoading]);

  const contextValues = useMemo(
    () => ({
      user,
      loading,
      createUser: async ({ email, password }) => {
        setLoading(true);
        return createUser({ email, password }).finally(() => setLoading(false));
      },
      emailPasswordLogin: async ({ email, password }) => {
        setLoading(true);
        return login({ email, password }).finally(() => setLoading(false));
      },
      resetPassword: async ({ email }) => {
        setLoading(true);
        return resetPassword({ email }).finally(() => setLoading(false));
      },
      socialSignIn: async (provider) => {
        setLoading(true);
        return socialSignIn(provider).finally(() => setLoading(false));
      },
      logout: async () => {
        setLoading(true);
        return logout().finally(() => setLoading(false));
      },
    }),
    [loading, user?.uid]
  );

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
}

UserContextProvider.defaultProps = {
  children: null,
};

UserContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export const useUser = () => useContext(UserContext);
