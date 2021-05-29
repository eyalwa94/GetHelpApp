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


const ChooseHelpScreen = ({ route, navigation }) => {
  const [helpChosen, setHelpChosen] = React.useState("");

  const { userName, userEmail } = route.params;
  let screenText = " שלום" + userName + " מה שלומך ";
  let all_volunteers=[];


  function handleClick(route) {
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
      //console.log(all_volunteers[0]);
      navigation.navigate("Help", {all_volunteers: all_volunteers }); //********************* */
    })
  }

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
        שלום {userName}, {"\n"}תוכלי לקבל פה עזרה במגוון נושאים לבחירתך :
      </Text>

      <View style={{marginTop:-200 ,flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button
          style={{ width: "70%" }}
          mode="contained"
          color="rgb(202, 197, 197)"
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
          color="rgb(202, 197, 197)"
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
          color="rgb(202, 197, 197)"
          compact="true"
          onPress={() => handleClick("אוכל")}
        >
          <Text style={{ fontFamily: "Montserrat", fontSize: 30 }}> אוכל</Text>
        </Button>
        <View style={styles.space} />
        <Button
          style={{ width: "70%" }}
          mode="contained"
          color="rgb(202, 197, 197)"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
});
export default ChooseHelpScreen;

/*
<Image style={styles.logo} 
       source={require('../assets/logo.jpg')}/>

           logo:{
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "black",
        position: 'absolute',
        top: 20
    },
    */
