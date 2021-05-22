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

  handleClickDelete = () => {
    let doc_to_del_query = firestore()
      .collection("Volunteers")
      .where("firstName", "==", firstName)
      .where("lastName", "==", lastName);
      doc_to_del_query.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
        alert("Done");
      });
    });
  };

  handleClickUpdate = () => {
    let doc_to_update_query = firestore()
      .collection("Volunteers")
      .where("firstName", "==", firstName)
      .where("lastName", "==", lastName);
      doc_to_update_query.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({phone:phone});
        alert("Done");
      });
    });
  };

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
      navigation.navigate("AllVol", {all_volunteers: all_volunteers });
    })
  };


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
        <Button
          style={{ width: "50%" }}
          mode="contained"
          color="red"
          compact="true"
          onPress={() => {
            auth().signOut();
            navigation.navigate("Login");
          }}
        >
          <Text style={{ fontFamily: "Montserrat", fontSize: 20 }}> יציאה</Text>
        </Button>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          margin: 10,
          marginTop: 1,
        }}
      >
        <Button
          style={{ width: "50%" , marginEnd: 5 }}
          mode="contained"
          color="blue"
          compact="true"
          onPress={handleClickUpdate}
        >
          <Text style={{ fontFamily: "Montserrat", fontSize: 20 }}> עדכון</Text>
        </Button>
        <Button
          style={{ width: "50%" }}
          mode="contained"
          color="red"
          compact="true"
          onPress={handleClickDelete}
        >
          <Text style={{ fontFamily: "Montserrat", fontSize: 20 }}> מחיקה</Text>
        </Button>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          margin: 10,
          marginTop: 1,
        }}
      >
         <Button
          style={{ width: "50%" }}
          mode="contained"
          color="red"
          compact="true"
          onPress={handleClickShowAll}
        >
          <Text style={{ fontFamily: "Montserrat", fontSize: 20 }}> הצגת כל המתנדבים</Text>
        </Button>
        </View>
    </ScrollView>
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
    width: 20, // or whatever size you need
    height: "15%",
  },
});

export default AdminScreen;
