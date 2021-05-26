//Add volunteer page  - Admin Screen
// Import
import React from "react";
import { View, Text, StyleSheet,ScrollView, Alert ,Modal } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { firestore, auth } from "../api/firebase";


// Page and functions
const AddVolunteer = ({ route, navigation }) => {
    const [firstName, setFirstName] = React.useState(""); 
    const [lastName, setLastName] = React.useState("");
    const [city, setCity] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [helpType, setHelpType] = React.useState("");
    const [calendlyLink, setCalendlyLink] = React.useState("");
  
  //Add new volunteer to firebase
    handleClickSend = () => { 
      firestore()
        .collection("Volunteers")
        .add({
          firstName: firstName,
          lastName: lastName,
          city: city,
          phone: phone,
          helpType: helpType,
          calendlyLink:calendlyLink,
        })
        .then(() => { 
          setFirstName("");
          setLastName("");
          setCity("");
          setPhone("");
          setHelpType("");
          setCalendlyLink("");
          alert("done");
        })
        .catch((err) => {
          alert(err);
        });
    };
 
 // Page view , Init data into the variables
 //Including all paramteres that needed to the firebase.
    return (
      <ScrollView style={{ margin: 10 }}>
        <Text style={styles.text}>שם:</Text> 
        <TextInput
          style={{ textAlign: "right", writingDirection: "rtl" }}
          mode="outlined"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          selectionColor="#0000FF"
        />
        <Text style={styles.text}>משפחה שם:</Text>
        <TextInput
          style={{ textAlign: "right", writingDirection: "rtl" }}
          mode="outlined"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          selectionColor="#0000FF"
        />
        <Text style={styles.text}>עיר:</Text>
        <TextInput
          style={{ textAlign: "right", writingDirection: "rtl" }}
          mode="outlined"
          value={city}
          onChangeText={(text) => setCity(text)}
          selectionColor="#0000FF"
        />
        <Text style={styles.text}>טלפון:</Text>
        <TextInput
          style={{ textAlign: "right", writingDirection: "rtl" }}
          mode="outlined"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          selectionColor="#0000FF"
          keyboardType="phone-pad"
        />
        <Text style={styles.text}>סוג עזרה:</Text>
        <TextInput
          style={{ textAlign: "right", writingDirection: "rtl" }}
          mode="outlined"
          value={helpType}
          onChangeText={(text) => setHelpType(text)}
          selectionColor="#0000FF"
        />
        <Text style={styles.text}>קישור לקלנדלי:</Text>
        <TextInput
          style={{ textAlign: "right", writingDirection: "rtl" }}
          mode="outlined"
          value={calendlyLink}
          onChangeText={(text) => setCalendlyLink(text)}
          selectionColor="#0000FF"
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            margin: 10,
          }}
        >
          <Button
            style={{ width: "50%", marginEnd: 5 }}
            mode="contained"
            color="green"
            compact="true"
            onPress={handleClickSend}
          >
            <Text style={{ fontFamily: "Montserrat", fontSize: 20 }}> הוספה</Text>
          </Button>
         </View>
      </ScrollView>
    );
  };

//Styling for the various components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFEBCD",
  },
  space: {
    width: 20, 
    height: 20,
  },
  text:{
    textAlign: "right",
    writingDirection: "rtl",
  }
});

export default AddVolunteer;
