import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import PostScreen from '../screens/PostScreen';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { TabNavigation } from '../components/TabNavigation';
import SignupScreen from '../screens/SignupScreen';

const Stack = createStackNavigator();

function LoginStack(props) {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    routeName = 'Onboarding';
  } else {
    routeName = 'Login';
  }
  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="Onboarding"
        options={{header: () => null}}
        component={OnboardingScreen}
      />
      <Stack.Screen
        name="Login"
        options={{header: () => null}}
        component={LoginScreen}
      />
      <Stack.Screen
        name="Signup"
        options={{header: () => null}}
        component={SignupScreen}
      />
      <Stack.Screen
        name="Home"
        options={{header: () => null}}
        component={TabNavigation}
      />
      <Stack.Screen
        name="Cont"
        options={{header: () => null}}
        component={TabNavigation}
      />
      {/* <Stack.Screen
        name="PostScreen"
        component={PostScreen}
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Text onPress={() => navigation.navigate('Home')}>Inapoi</Text>
            </View>
          ),
        })}
      /> */}
    </Stack.Navigator>
  );
}

export default LoginStack;
