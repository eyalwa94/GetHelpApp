//Add volunteer page  - Admin Screen
// Import
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
import RNPickerSelect from "react-native-picker-select";

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
        helpType: helpType.value,
        calendlyLink: calendlyLink,
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
    <ScrollView
      style={{
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
      }}
    >
      <View style={{ margin: 25, flexDirection: "row" }}>
        <Image style={styles.image} source={require("../assets/BatKol.jpg")} />
        <Text
          style={{
            fontSize: 35,
            textAlign: "center",
            fontFamily: "Montserrat",
            color: "#800000",
            fontWeight: "800",
            shadowOpacity: 0.2,
            letterSpacing: 2,
            marginBottom: 30,
            marginLeft: 50,
          }}
        >
          הוספת מתנדב
        </Text>
      </View>

      <Text style={styles.text}>שם:</Text>
      <TextInput
        style={styles.textInput}
        mode="flat"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <Text style={styles.text}>משפחה שם:</Text>
      <TextInput
        style={styles.textInput}
        mode="flat"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <Text style={styles.text}>עיר:</Text>
      <TextInput
        style={styles.textInput}
        mode="flat"
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <Text style={styles.text}>טלפון:</Text>
      <TextInput
        style={styles.textInput}
        placeholder=""
        mode="flat"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        keyboardType="phone-pad"
      />

      <Text style={styles.text}>סוג עזרה:</Text>
      <RNPickerSelect
        placeholder={{
          label: "Select a type...",
          value: null,
        }}
        items={[
          { label: "שיחה עם רב", value: "שיחה עם רב" },
          { label: "מקום לינה", value: "מקום לינה" },
          { label: "ארוחה חמה", value: "ארוחה חמה" },
          { label: "שיחת עידוד", value: "שיחת עידוד" },
        ]}
        onValueChange={(value) => {
          setHelpType({ value });
        }}
      ></RNPickerSelect>

      <Text style={styles.text}>קישור לקלנדלי:</Text>
      <TextInput
        placeholder=""
        style={styles.textInput}
        mode="flat"
        value={calendlyLink}
        onChangeText={(text) => setCalendlyLink(text)}
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
          style={styles.button}
          mode="contained"
          compact="true"
          onPress={handleClickSend}
        >
          <Text style={styles.text}> הוסף מתנדב +</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

//Styling for the various components
const styles = StyleSheet.create({
  button: {
    width: "70%",
    marginBottom: 170,
    marginTop: 50,
    elevation: 10,
    borderColor: "#800000",
    borderWidth: 2,
    marginEnd: 5,
    backgroundColor: "rgb(202, 197, 197)",
  },
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },
  image: {
    marginTop: -25,
    marginBottom: -10,
    marginRight: -25,
    borderRadius: 110,
    width: 80,
    height: 80,
    alignSelf: "flex-start",
    right: 0,
    position: "absolute",
  },
  space: {
    width: 20,
    height: 20,
  },
  text: {
    textAlign: "right",
    writingDirection: "rtl",
    fontFamily: "Montserrat",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 3,
  },
  textInput: {
    textAlign: "right",
    writingDirection: "rtl",
    marginBottom: 12,
    height: 40,
  },
});

export default AddVolunteer;
