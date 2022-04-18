import React, {useContext, useState, useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './Context';

import LoginStack from './LoginStack';
import {TabNavigation} from '../components/TabNavigation';

const Stack = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const navigation = useRef();

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged();
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer ref={navigation}>
      <LoginStack />
    </NavigationContainer>
  );
};

export default Stack;
// export default Sentry.withProfiler(Stack);
