import React from 'react';
import {Text} from 'react-native';
import {createContext, ReactNode, useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Provider} from 'react-native-paper';

import theme from './theme';
import SignedInStack from './signed-in/ProfileStack';
import SignedOutStack from './signed-out/Stack';
import AppIntro from './signed-out/AppIntro'
import TabNav from './signed-in/TabStack'
/**
 * Types
 */
type User = FirebaseAuthTypes.User | null;

/**-
 * Context
 */
export const UserContext = createContext<User>(null);




function App() {
  const [initializing, setInitializing] = useState(true);
  const [listenUser, setListenUser] = useState(false);
  const [user, setUser] = useState<User>(null);

  /** Listen for auth state changes */
  useEffect(() => {
    const authListener = auth().onAuthStateChanged(result => {
      setUser(result);
      if (initializing && !listenUser) {
        setInitializing(false);
        setListenUser(true);
      }
    });

    return () => {
      if (authListener) {
        authListener();
      }
    };
  }, [initializing, listenUser]);

  /** Listen for user changes */
  useEffect(() => {
    let userListener: () => void;

    if (listenUser) {
      userListener = auth().onUserChanged(result => {
        setUser(result);
      });
    }

    return () => {
      if (userListener) {
        userListener();
      }
    };
  }, [listenUser]);

  if (initializing) {
    return <Text>Loading...</Text>;
  }

  function container(children: ReactNode | ReactNode[]) {
    return <Provider theme={theme}>{children}</Provider>;
  }

  return container(
    user ? (
      <UserContext.Provider value={user}>
          <TabNav/>
      </UserContext.Provider>
    ) : (
      <AppIntro/>
    ),
  );
}

export default App;
