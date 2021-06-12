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
import AllUsers from './app/screens/AllUsers';

import { I18nManager } from "react-native";
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

I18nManager.forceRTL(false);
I18nManager.allowRTL(false);




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
          options={{ title: 'כניסה',headerStyle:{backgroundColor:"whitesmoke"} }}
        />
        <Stack.Screen name="ChooseHelp" component={ChooseHelpScreen} 
        options={{ title: 'בחירת עזרה',headerStyle:{backgroundColor:"whitesmoke"} }}/>
        <Stack.Screen name="Help" component={HelpScreen} 
        options={{ title: 'קביעת פגישה',headerStyle:{backgroundColor:"whitesmoke"} }}/>
        <Stack.Screen name="AdminAuth" component={user ? AdminScreen : AdminAuthentication}
        options={{ title: 'מנהל',headerStyle:{backgroundColor:"whitesmoke"} }} />
        <Stack.Screen name="AllVol" component={AllVolunteers} 
        options={{ title: 'רשימת המתנדבים',headerStyle:{backgroundColor:"whitesmoke"} }}/>
        <Stack.Screen name="AddVol" component={AddVolunteer} 
        options={{ title: 'הוספת מתנדב',headerStyle:{backgroundColor:"whitesmoke"} }}/>
        <Stack.Screen name="UpdateVol" component={UpdateVolunteer} 
        options={{ title: 'עדכון מתנדב',headerStyle:{backgroundColor:"whitesmoke"} }}/>
        <Stack.Screen name="AllUsers" component={AllUsers} 
        options={{ title: 'סטטיסטיקות',headerStyle:{backgroundColor:"whitesmoke"} }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;