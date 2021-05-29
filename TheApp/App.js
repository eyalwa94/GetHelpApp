//Managment navigation page
// Here we route and navigate between pages

//import
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {auth} from './app/api/firebase';
import ChooseHelpScreen from './app/screens/ChooseHelpScreen';
import HelpScreen from './app/screens/HelpScreen';
import LoginScreen from './app/screens/LoginScreen';
import AdminScreen from './app/screens/AdminScreen';
import AdminAuthentication from './app/screens/AdminAuthentication';
import AllVolunteers from './app/screens/AllVolunteers';
import AddVolunteer from './app/screens/AddVolunteer';
import UpdateVolunteer from './app/screens/UpdateVolunteer';





const Stack = createStackNavigator();

const MyStack = () => {
  const[user,setUser]=React.useState(null);

  React.useEffect(()=>{
    auth().onAuthStateChanged((u) => {
      if (u)
        setUser(u);
      else
        setUser(null);
    })
  })
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login',headerStyle:{backgroundColor:"whitesmoke"} }}
        />
        <Stack.Screen name="ChooseHelp" component={ChooseHelpScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="AdminAuth" component={user ? AdminScreen : AdminAuthentication} />
        <Stack.Screen name="AllVol" component={AllVolunteers} />
        <Stack.Screen name="AddVol" component={AddVolunteer} />
        <Stack.Screen name="UpdateVol" component={UpdateVolunteer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;