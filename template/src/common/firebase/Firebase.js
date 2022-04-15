import { initializeApp } from "firebase/app";
import {
  getRemoteConfig,
  fetchAndActivate,
  activate,
  fetchConfig,
  getValue,
} from "firebase/remote-config";
import {
  initializeAnalytics,
  logEvent as logFirebaseEvent,
} from "firebase/analytics";

import Cookies from "js-cookie";

import { REMOTE_CONFIG_DEFAULTS } from "Constants";

const firebaseCredentials = {
  apiKey: process.env.REACT_APP_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

let app = null;
let remoteConfig = null;
let analytics = null;

const initializeRemoteConfig = async (firebaseInstance) => {
  remoteConfig = getRemoteConfig(firebaseInstance);
  remoteConfig.settings.minimumFetchIntervalMillis = 100;
  remoteConfig.defaultConfig = REMOTE_CONFIG_DEFAULTS;

  const isAppOpenedBefore = Cookies.get("openedBefore");

  if (isAppOpenedBefore) {
    // Activate configs and then fetch new ones.
    // This way there will be no blocking experience, new values
    // will be applied next run of the application.
    return activate(remoteConfig).then((isActiveted) => {
      if (isActiveted) {
        console.log("New configs actived...");
      }
      fetchConfig(remoteConfig);
      return remoteConfig;
    });
  }

  console.log("First opening on this browser, getting remote configs first...");
  return fetchAndActivate(remoteConfig).then((isActiveted) => {
    if (isActiveted) {
      console.log("New configs actived...");
    }
    Cookies.set("openedBefore", true);
  });
};

// Initializes firebase and its services
export const initializeFirebase = async (isFirstOpen) => {
  app = initializeApp(firebaseCredentials);
  await initializeRemoteConfig(app, isFirstOpen);
  analytics = initializeAnalytics(app);

  console.log(`Firebase initialized`);
  return app;
};

export default {
  app,
  remoteConfig,
};

// Helper functions used across app
export const getConfig = (value) => getValue(remoteConfig, value);

export const logEvent = (eventName, params) => {
  if (process.env.NODE_ENV === "development") {
    console.log({ eventName, params });
  }
  logFirebaseEvent(analytics, eventName, params);
};
