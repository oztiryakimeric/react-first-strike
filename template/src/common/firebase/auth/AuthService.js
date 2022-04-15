import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import AppError from "common/AppError";
import { logEvent } from "../Firebase";

const handleFirebaseErrors = (err) => {
  if (process.env.NODE_ENV === "development") {
    console.error(err);
  }

  // These are the errors that users can faced it.
  const publicErrors = [
    "auth/user-not-found",
    "auth/wrong-password",
    "auth/account-exists-with-different-credential",
    "auth/email-already-in-use",
  ];

  // These are the errors that no impact to application.
  const dismissibleErrors = ["auth/popup-closed-by-user"];

  if (publicErrors.includes(err.code)) {
    throw new AppError(err.message, `authErrors.${err.code}`, err);
  } else if (dismissibleErrors.includes(err.code)) {
    throw new AppError(err.message, `show-nothing`, err);
  } else {
    throw new AppError(err.message, "authErrors.auth/unkown-exception", err);
  }
};

export const createUser = async ({ email, password }) =>
  createUserWithEmailAndPassword(getAuth(), email, password)
    .then(({ user }) => logEvent("REGISTER", { email: user?.email }))
    .catch(handleFirebaseErrors);

export const login = async ({ email, password }) =>
  signInWithEmailAndPassword(getAuth(), email, password)
    .then(({ user }) => logEvent("LOGIN", { email: user?.email }))
    .catch(handleFirebaseErrors);

export const logout = () =>
  signOut(getAuth())
    .then(() => logEvent("LOGOUT", {}))
    .catch(handleFirebaseErrors);

export const resetPassword = async ({ email }) =>
  sendPasswordResetEmail(getAuth(), email)
    .then(() => logEvent("RESET_PASSWORD", { email }))
    .catch(handleFirebaseErrors);

export const getIdToken = () => {
  const user = getAuth().currentUser;

  if (user) {
    return user.getIdToken();
  }
  return null;
};

export const onAuthStateChange = ({ onLogin, onLogout }) =>
  onAuthStateChanged(getAuth(), async (user) => {
    if (user) {
      const idToken = await user.getIdToken();
      const { claims } = await user.getIdTokenResult();

      onLogin({
        idToken,
        claims,
        ...user,
      });
    } else {
      onLogout();
    }
  });

export const socialSignIn = async (provider) => {
  const providers = {
    google: new GoogleAuthProvider(),
    facebook: new FacebookAuthProvider(),
    github: new GithubAuthProvider(),
  };

  return signInWithPopup(getAuth(), providers[provider])
    .then(({ user }) =>
      logEvent("SOCIAL_SIGN_IN", { provider, email: user?.email })
    )
    .catch(handleFirebaseErrors);
};
