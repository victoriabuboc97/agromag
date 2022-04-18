import React, {createContext, useState} from 'react';
import {AuthContext} from './Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: (email, password) => {
          AsyncStorage.setItem('email', email);
          console.log('login...')
        },
        register: (email, password) => {
          AsyncStorage.setItem('email', email);
        },
        logout: async () => {
          console.log("logout");
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
