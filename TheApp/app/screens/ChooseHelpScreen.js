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
          marginTop: "5%",
        }}
      >
        שלום {userName} {"\n"} תוכל לקבל פה עזרה במגוון נושאים :
      </Text>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button
          style={{ width: "70%" }}
          mode="contained"
          color="yellow"
          compact="true"
          onPress={() => handleClick("רב")}
        >
          <Text style={{ fontFamily: "Montserrat", fontSize: 30 }}>
            {" "}
            שיחה עם רב
          </Text>
        </Button>
        <View style={styles.space} />
        <Button
          style={{ width: "70%" }}
          mode="contained"
          color="green"
          compact="true"
          onPress={() => handleClick("מקום ללון")}
        >
          <Text style={{ fontFamily: "Montserrat", fontSize: 30 }}>
            {" "}
            מקום ללון
          </Text>
        </Button>
        <View style={styles.space} />
        <Button
          style={{ width: "70%" }}
          mode="contained"
          color="purple"
          compact="true"
          onPress={() => handleClick("אוכל")}
        >
          <Text style={{ fontFamily: "Montserrat", fontSize: 30 }}> אוכל</Text>
        </Button>
        <View style={styles.space} />
        <Button
          style={{ width: "70%" }}
          mode="contained"
          color="orange"
          compact="true"
          onPress={() => handleClick("עוד משו")}
        >
          <Text style={{ fontFamily: "Montserrat", fontSize: 30 }}>
            {" "}
            עוד משו
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
    backgroundColor: "#FFEBCD",
  },
  space: {
    width: 20, 
    height: 20,
  },
});

export default ChooseHelpScreen;

