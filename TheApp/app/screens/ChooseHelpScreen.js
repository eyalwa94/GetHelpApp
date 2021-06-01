//User help screen
//The user log in and choose the needed help

//import
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  Text,
  Alert,
  SafeAreaView,Pic
} from "react-native";
import { Button } from "react-native-paper";
import { useFonts } from "expo-font";
import { firestore } from "../api/firebase";
import { AntDesign,MaterialCommunityIcons,Ionicons   } from '@expo/vector-icons'; 

//User page and the functions it included
const ChooseHelpScreen = ({ route, navigation }) => {
  const [helpChosen, setHelpChosen] = React.useState("");

  const { userName, userEmail } = route.params;
  let screenText = " שלום" + userName + " מה שלומך ";
  let all_volunteers=[];

//Moving to the chosen help page , including taking volunteers from the firebase.
  function handleClick(route) // Gets all the volunteers into array, send it to the help screen
   {
    all_volunteers=[];
    firestore()
    .collection("Volunteers")
    .where("helpType", "==", route).get()
    .then((snapshot) => {
      snapshot.forEach((volunteer) => {
        all_volunteers.push(volunteer.data());
      })
    })
    .then(() => {
      navigation.navigate("Help", {all_volunteers: all_volunteers }); // navigate to help screen
    })
  }

  //font
  const [loaded] = useFonts({
    Montserrat: require("../assets/fonts/500.ttf"),
  });

  if (!loaded) {
    return null;
  }


  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          textAlign: "right",
          writingDirection: "rtl",
          fontFamily: "Montserrat",
          fontSize: 30,
          flexDirection: "row-reverse",
          marginLeft: "5%",
          marginTop: "10%",
        }}
      >
        שלום {userName}, {"\n"}בחרי את סוג העזרה לה את זקוקה :
      </Text>

      <View style={{marginTop:-200 ,flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button
          style={styles.button}
          mode="contained"
          color="rgb(202, 197, 197)"
          compact="true"
          onPress={() => handleClick("רב")}
        >
          <Text style={{ fontFamily: "Montserrat", fontSize: 30 }}>
            {" "}
            שיחה עם רב
            <AntDesign name="phone" size={24} color="black" />
          </Text>
        </Button>
        <View style={styles.space} />
        <Button
          style={styles.button}
          mode="contained"
          color="rgb(202, 197, 197)"
          compact="true"
          onPress={() => handleClick("מקום לינה")}
        >
          <Text style={{ fontFamily: "Montserrat", fontSize: 30 }}>
            {" "}
            מקום לינה
            <AntDesign name="home" size={24} color="black" />
          </Text>
        </Button>
        <View style={styles.space} />
        <Button
          style={styles.button}
          mode="contained"
          color="rgb(202, 197, 197)"
          compact="true"
          onPress={() => handleClick("ארוחה חמה")}
        >
          <Text style={styles.text}> ארוחה חמה</Text>
          <MaterialCommunityIcons name="food-variant" size={24} color="black" />
        </Button>
        <View style={styles.space} />
        <Button
          style={styles.button}
          mode="contained"
          color="rgb(202, 197, 197)"
          compact="true"
          onPress={() => handleClick("שיחת עידוד")}
        >
          <Text style={styles.text}>
            {" "}
            שיחת עידוד
            <Ionicons name="ios-happy-sharp" size={24} color="black" />
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

//styling page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },
  space: {
    width: 20, 
    height: 20,
  },
  text:{
    fontFamily: "Montserrat",
     fontSize: 30
  },
  button : {
  marginTop: 20,
  width: "70%",    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: "rgb(202, 197, 197)",
    elevation: 10, 
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 5,
    textAlign: 'center',
  }

});
export default ChooseHelpScreen;

