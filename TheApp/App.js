import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ChooseHelpScreen from './app/screens/ChooseHelpScreen';
import HelpScreen from './app/screens/HelpScreen';
import LoginScreen from './app/screens/LoginScreen';
import AdminScreen from './app/screens/AdminScreen';
import AdminAuthentication from './app/screens/AdminAuthentication';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login',headerStyle:{backgroundColor:"green"} }}
        />
        <Stack.Screen name="ChooseHelp" component={ChooseHelpScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="AdminAuth" component={AdminAuthentication} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;