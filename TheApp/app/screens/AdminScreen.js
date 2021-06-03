//Representing the Admin screen
//Include all the functions that admin can do

//Import
import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { firestore, auth } from "../api/firebase";
import {
  AntDesign,
  Feather,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";

//Admin page and his functions
const AdminScreen = ({ route, navigation }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [city, setCity] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [helpType, setHelpType] = React.useState("");
  const [calendlyLink, setCalendlyLink] = React.useState("");
  let all_volunteers = [];

  //Show all volunteers function
  handleClickShowAll = () => {
    all_volunteers = [];
    firestore()
      .collection("Volunteers")
      .get()
      .then((snapshot) => {
        snapshot.forEach((volunteer) => {
          all_volunteers.push(volunteer.data());
        });
      })
      .then(() => {
        navigation.navigate("AllVol", {
          all_volunteers: all_volunteers,
          wanted_sort: false,
        }); // navigate to the AllVolunteers page, and send all_volunteers array
      });
  };

  //Add new volunteer function
  handleClickAddUser = () => {
    navigation.navigate("AddVol");
  };
  //navigation buttons
  return (
    <View
      style={{
        marginTop: 100,
        flex: "col",
        justifyContent: "center",
        alignItems: "center",
        height: "30%",
      }}
    >
      <Image style={styles.image} source={require("../assets/BatKol.jpg")} />

      <Button
        style={styles.Button}
        mode="contained"
        color="rgb(202, 197, 197)"
        compact="true"
        onPress={handleClickAddUser}
      >
        <Text style={{ fontFamily: "Montserrat", fontSize: 20 }}>
          {" "}
          הוספת מתנדב {"\t"}
        </Text>
        <AntDesign name="adduser" size={20} color="black" />
      </Button>
      <View style={styles.space} />
      <Button
        style={styles.Button}
        mode="contained"
        color="rgb(202, 197, 197)"
        compact="true"
        onPress={handleClickShowAll}
      >
        <Text style={{ fontFamily: "Montserrat", fontSize: 20 }}>
          {" "}
          רשימת המתנדבים עריכה/מחיקה {"\t"}
        </Text>
        <Feather name="list" size={20} color="black" />
      </Button>
      <View style={styles.space} />

      <Button
        style={styles.Button}
        mode="contained"
        color="rgb(202, 197, 197)"
        compact="true"
        onPress={() => {
          auth().signOut();
          navigation.navigate("Login");
        }}
      >
        <Text style={{ fontFamily: "Montserrat", fontSize: 20 }}>
          {" "}
          התנתק {"\t"}
        </Text>
        <MaterialIcons name="logout" size={20} color="black" />
      </Button>
    </View>
  );
};

//Styling the page
const styles = StyleSheet.create({
  image: {
    marginTop: -10,
    marginBottom: 120,
    marginRight: 10,
    borderRadius: 110,
    width: 80,
    height: 80,
    alignSelf: "flex-end",
    right: 0,
  },
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
  Button: {
    width: "90%",
    elevation: 10,
    borderColor: "#800000",
    borderWidth: 2,
  },
});

export default AdminScreen;
