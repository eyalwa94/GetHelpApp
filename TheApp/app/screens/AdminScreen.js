import React from "react";
import { View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { firestore } from "../api/firebase";

const AdminScreen = ({ route, navigation }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [city, setCity] = React.useState("");
  const [phone, setPhone] = React.useState("");

  handleClickSend = () => {
    firestore()
      .collection("Volunteers")
      .add({
        firstName: firstName,
        lastName: lastName,
        city: city,
        phone: phone,
      })
      .then(() => {
        setFirstName("");
        setLastName("");
        setCity("");
        setPhone("");
        alert("done");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <View >
      <Text
        style={{
          fontFamily: "Montserrat",
          textAlign: "right",
          writingDirection: "rtl",
          fontSize: 30,
        }}
      >
        שם:
      </Text>
      <TextInput
        style={{ textAlign: "right", writingDirection: "rtl" }}
        mode="outlined"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        selectionColor="#0000FF"
      />
      <Text
        style={{
          fontFamily: "Montserrat",
          textAlign: "right",
          writingDirection: "rtl",
          fontSize: 30,
        }}
      >
        משפחה שם:
      </Text>
      <TextInput
        style={{ textAlign: "right", writingDirection: "rtl" }}
        mode="outlined"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        selectionColor="#0000FF"
      />
      <Text
        style={{
          fontFamily: "Montserrat",
          textAlign: "right",
          writingDirection: "rtl",
          fontSize: 30,
        }}
      >
        עיר:
      </Text>
      <TextInput
        style={{ textAlign: "right", writingDirection: "rtl" }}
        mode="outlined"
        value={city}
        onChangeText={(text) => setCity(text)}
        selectionColor="#0000FF"
      />
      <Text
        style={{
          fontFamily: "Montserrat",
          textAlign: "right",
          writingDirection: "rtl",
          fontSize: 30,
        }}
      >
        טלפון:
      </Text>
      <TextInput
        style={{ textAlign: "right", writingDirection: "rtl" }}
        mode="outlined"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        selectionColor="#0000FF"
        keyboardType="phone-pad"
      />
      <Button
        style={{ width: "70%" }}
        mode="contained"
        color="yellow"
        compact="true"
        onPress={handleClickSend}
      >
        <Text style={{ fontFamily: "Montserrat", fontSize: 30 }}> הוספה</Text>
      </Button>
    </View>
  );
};

export default AdminScreen;
