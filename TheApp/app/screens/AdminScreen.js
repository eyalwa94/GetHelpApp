import React from "react";
import { View, Text, StyleSheet,ScrollView, Alert ,Modal } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { firestore, auth } from "../api/firebase";

const AdminScreen = ({ route, navigation }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [city, setCity] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [helpType, setHelpType] = React.useState("");
  const [calendlyLink, setCalendlyLink] = React.useState("");



  //const[allVolunteers,setAllVolunteers]=React.useState([]);
  let all_volunteers=[];
  

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
      navigation.navigate("AllVol", {all_volunteers: all_volunteers , wanted_sort:false });
    })
  };

  handleClickAddUser= () => {
    navigation.navigate("AddVol");
  };
  
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
               <Button
          style={{ width: "70%" }}
          mode="contained"
          color="green"
          compact="true"
          onPress={handleClickAddUser}
        >
          <Text style={{ fontFamily: "Montserrat", fontSize: 30 }}> הוספת מתנדב</Text>
        </Button>
        <View style={styles.space} />
         <Button
          style={{ width: "70%" }}
          mode="contained"
          color="blue"
          compact="true"
          onPress={handleClickShowAll}
        >
          <Text style={{ fontFamily: "Montserrat", fontSize: 30 }}> רשימת המתנדבים עריכה/מחיקה</Text>
        </Button>
        <View style={styles.space} />

        <Button
          style={{ width: "70%" }}
          mode="contained"
          color="red"
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

const styles = StyleSheet.create({
  text: {
    fontFamily: "Montserrat",
    textAlign: "right",
    writingDirection: "rtl",
    fontSize: 20,
  },
  space: {
    width: 10, // or whatever size you need
    height: "10%",
  },
});

export default AdminScreen;
