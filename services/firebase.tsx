import React, { FC, createContext } from "react";
import { useContext, useEffect, useMemo, useState } from "react";

import isEmpty from "lodash/isEmpty";
import type firebase from "firebase/app";

export type FirebaseModule = typeof firebase;
export type FirebaseApp = firebase.app.App;

export const initFirebase = async (): Promise<FirebaseModule> => {
  const { default: firebase } = await import("firebase/app");
  await import("firebase/auth");
  if (isEmpty(firebase.apps)) {
    firebase.initializeApp({
      apiKey: "AIzaSyBL8ER2Bxe-7q-lsKy89zqlw6Dbf0F-qnU",
      authDomain: "chalmers-api.firebaseapp.com",
      projectId: "chalmers-api",
      storageBucket: "chalmers-api.appspot.com",
      messagingSenderId: "742171849394",
      appId: "1:742171849394:web:038f6ed01ebf0617b14fab",
      measurementId: "G-CP7M9JJF7D",
    });
  }
  return firebase;
};

const FirebaseContext = createContext<FirebaseModule | null>(null);

export const FirebaseProvider: FC = ({ children }) => {
  const [module, setModule] = useState<FirebaseModule | null>(null);
  useEffect(() => {
    initFirebase().then(setModule);
  }, []);
  return (
    <FirebaseContext.Provider value={module}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = (): FirebaseModule | null =>
  useContext(FirebaseContext);

export const useFirebaseApp = (): FirebaseApp | null => {
  const firebase = useFirebase();
  return firebase?.app() ?? null;
};

export type FirebaseUser = firebase.User;

export const useFirebaseUser = (): FirebaseUser | null | undefined => {
  const app = useFirebaseApp();
  const initialUser = useMemo(() => app?.auth()?.currentUser, []);
  const [user, setUser] = useState<FirebaseUser | null | undefined>(
    initialUser,
  );

  useEffect(() => {
    if (!app) return;
    return app.auth().onAuthStateChanged(nextUser => {
      if (nextUser && user) {
        if (nextUser.uid === user.uid) {
          return;
        }
      } else if (nextUser === user) {
        return;
      }
      setUser(nextUser ?? null);
    });
  }, [app]);
  return user;
};

export const useFirebaseToken = (): string | null | undefined => {
  const [token, setToken] = useState<string | null | undefined>();
  const app = useFirebaseApp();
  useEffect(() => {
    if (!app) return;
    return app.auth().onIdTokenChanged(async user => {
      if (user) {
        const token = await user.getIdToken();
        setToken(token);
      } else {
        setToken(null);
      }
    });
  }, [app]);
  return token;
};

export type FirebaseUserCredential = firebase.auth.UserCredential;

export const useFirebaseLogin = ():
  | (() => Promise<FirebaseUserCredential>)
  | null => {
  const firebase = useFirebase();
  const provider = useMemo(() => {
    if (!firebase) return null;
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/userinfo.email");
    provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
    return provider;
  }, [firebase]);
  return firebase && provider
    ? () => firebase.auth().signInWithPopup(provider)
    : null;
};

export const useFirebaseLogout = (): (() => Promise<void>) | null => {
  const firebase = useFirebase();
  return firebase ? () => firebase.auth().signOut() : null;
};
