import React from "react";
import { View, Text, StyleSheet,ScrollView, Alert ,Modal } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { firestore, auth } from "../api/firebase";



const AddVolunteer = ({ route, navigation }) => {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [city, setCity] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [helpType, setHelpType] = React.useState("");
    const [calendlyLink, setCalendlyLink] = React.useState("");
  
  
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
  
 
    return (
      <ScrollView style={{ margin: 10 }}>
        <Text style={styles.text}>שם:</Text>
        <TextInput
          style={{ textAlign: "right", writingDirection: "rtl" }}
          mode="outlined"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          backgroundColor="rgb(202, 197, 197)"
        />
        <Text style={styles.text}>משפחה שם:</Text>
        <TextInput
          style={{ textAlign: "right", writingDirection: "rtl" }}
          mode="outlined"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          backgroundColor="rgb(202, 197, 197)"
        />
        <Text style={styles.text}>עיר:</Text>
        <TextInput
          style={{ textAlign: "right", writingDirection: "rtl" }}
          mode="outlined"
          value={city}
          onChangeText={(text) => setCity(text)}
          backgroundColor="rgb(202, 197, 197)"
        />
        <Text style={styles.text}>טלפון:</Text>
        <TextInput
          style={{ textAlign: "right", writingDirection: "rtl" }}
          mode="outlined"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          backgroundColor="rgb(202, 197, 197)"
          keyboardType="phone-pad"
        />
        <Text style={styles.text}>סוג עזרה:</Text>
        <TextInput
          style={{ textAlign: "right", writingDirection: "rtl" }}
          mode="outlined"
          value={helpType}
          onChangeText={(text) => setHelpType(text)}
          backgroundColor="rgb(202, 197, 197)"
        />
        <Text style={styles.text}>קישור לקלנדלי:</Text>
        <TextInput
          style={{ textAlign: "right", writingDirection: "rtl" }}
          mode="outlined"
          value={calendlyLink}
          onChangeText={(text) => setCalendlyLink(text)}
          backgroundColor="rgb(202, 197, 197)"
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
            style={{ marginTop:30, width: "50%", marginEnd: 5 }}
            mode="contained"
            color="rgb(202, 197, 197)"
            compact="true"
            onPress={handleClickSend}
          >
            <Text style={{ fontFamily: "Montserrat",textAlign:"center", fontSize: 23 }}> הוספה</Text>
          </Button>
         </View>
      </ScrollView>
    );
  };
//https://calendly.com/ziv-birer/rabbi
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  text:{
    textAlign: "right",
    writingDirection: "rtl",
    fontFamily: "Montserrat",
    fontSize:23,
    fontWeight: 'bold'
  }
});

export default AddVolunteer;
