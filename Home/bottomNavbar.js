// Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from './index';
import Explore from '../Explore/index';


const Tab = createBottomTabNavigator();

const Bottom = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Other1') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            } else if (route.name === 'Other2') {
              iconName = focused ? 'ios-options' : 'ios-options-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Other1" component={Explore} />
       
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Bottom;
