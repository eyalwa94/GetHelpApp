//Add volunteer page  - Admin Screen
// Import
import React from "react";
import { View, Text, StyleSheet, ScrollView, Alert ,Modal } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { firestore, auth } from "../api/firebase";
import RNPickerSelect from 'react-native-picker-select';

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
        <RNPickerSelect 
          placeholder={{
            label: 'Select a type...',
            value: null,            
          }}
          items={[
            {label:"שיחה עם רב", value:"שיחה עם רב"},
            {label:"מקום לינה", value:"מקום לינה"},
            {label:"ארוחה חמה", value:"ארוחה חמה"},
            {label:"שיחת עידוד", value:"שיחת עידוד"},

          ]}
          onValueChange={(value) => {setHelpType({value});}}
          >
          
        </RNPickerSelect>
        
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

//Styling for the various components
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
    textAlign: "right",
    writingDirection: "rtl",
    fontFamily: "Montserrat",
    fontSize:23,
    fontWeight: 'bold'
  }
});

export default AddVolunteer;
