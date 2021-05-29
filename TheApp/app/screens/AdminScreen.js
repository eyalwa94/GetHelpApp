//Representing the Admin screen
//Include all the functions that admin can do

//Import
import React from "react";
import { View, Text, StyleSheet,ScrollView, Alert ,Modal } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { firestore, auth } from "../api/firebase";

//Admin page and his functions
const AdminScreen = ({ route, navigation }) => {
  const [firstName, setFirstName] = React.useState(""); 
  const [lastName, setLastName] = React.useState("");
  const [city, setCity] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [helpType, setHelpType] = React.useState("");
  const [calendlyLink, setCalendlyLink] = React.useState("");
  let all_volunteers=[];
  
//Show all volunteers function
  handleClickShowAll= () => {
    all_volunteers=[];
    firestore()
    .collection("Volunteers")
    .get()
    .then((snapshot) => {
      snapshot.forEach((volunteer) => {
        all_volunteers.push(volunteer.data());
      })
    })
    .then(() => {
      navigation.navigate("AllVol", {all_volunteers: all_volunteers , wanted_sort:false }); // navigate to the AllVolunteers page, and send all_volunteers array
    })
  };

//Add new volunteer function
  handleClickAddUser= () => { 
    navigation.navigate("AddVol");
  };
  //navigation buttons
  return (
    <View style={{ marginTop:100, flex: "col", justifyContent: "center", alignItems: "center" }}>
               <Button
          style={{ width: "70%" }}
          mode="contained"
          color="rgb(202, 197, 197)"
          compact="true"
          onPress={handleClickAddUser}
        >
          <Text style={{ fontFamily: "Montserrat", fontSize: 30 }}> הוספת מתנדב</Text>
        </Button>
        <View style={styles.space} />
         <Button
          style={{ width: "70%" }}
          mode="contained"
          color="rgb(202, 197, 197)"
          compact="true"
          onPress={handleClickShowAll}
        >
          <Text style={{ fontFamily: "Montserrat", fontSize: 30 }}> רשימת המתנדבים עריכה/מחיקה</Text>
        </Button>
        <View style={styles.space} />

        <Button
          style={{ width: "70%" }}
          mode="contained"
          color="rgb(202, 197, 197)"
          compact="true"
          onPress={() => {
            auth().signOut();
            navigation.navigate("Login");
          }}
        >
          <Text style={{ fontFamily: "Montserrat", fontSize: 30 }}> התנתק</Text>
        </Button>
        
        
    </View>
  );
};

//Styling the page
const styles = StyleSheet.create({
  text: {
    fontFamily: "Montserrat",
    textAlign: "right",
    writingDirection: "rtl",
    fontSize: 20,
  },
  space: {
    width: 10, 
    height: "10%",
  },
});

export default AdminScreen;
