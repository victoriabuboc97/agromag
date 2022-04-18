import * as React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppStack from '../navigation/AppStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NewPost from '../screens/NewPost';
import Profile from '../screens/Profile';
import Categories from '../screens/Categories';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import colors from '../constants/colors';
import { faHome, faPlus, faUser } from '@fortawesome/free-solid-svg-icons'


const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName=faHome;
          if (route.name === 'Acasa') {
            iconName = focused ? faHome : faHome;
            color = focused ? colors.green : 'gray';
          } else if (route.name === 'Anunt nou') {
            iconName = focused ? faPlus :faPlus;
            color = focused ? colors.green : 'gray';
          } else if (route.name === 'Cont') {
            iconName = focused ? faUser : faUser;
            color = focused ? colors.green : 'gray';
          } 
          return (
            <FontAwesomeIcon icon={iconName} color={color} size={size}/>
          );
        },
      })}
      >
      <Tab.Screen name="Acasa" component={AppStack}/>
      <Tab.Screen name="Anunt nou" component={NewPost} />
      <Tab.Screen name="Cont" component={Profile}/>
    </Tab.Navigator>
  );
};
