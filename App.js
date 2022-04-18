import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Providers from './navigation';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import OnboardingScreen from './screens/OnboardingScreen';
// import {library} from '@fortawesome/fontawesome-svg-core';
// // import {fab} from '@fortawesome/free-brands-svg-icons';
// import {
//   faUser,
//   faLock,
//   faArrowLeft,
//   faArrowRight,
// } from '@fortawesome/free-solid-svg-icons';

// library.add(faUser, faLock, faArrowLeft, faArrowRight);

export default function App() {
  return (
    <Providers/>
  );
}
