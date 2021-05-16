import React from "react";
import { View, Text, StyleSheet,TouchableOpacity  } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { firestore, auth } from "../api/firebase";
import AwesomeAlert from 'react-native-awesome-alerts';

const AdminScreen = ({ route, navigation }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [city, setCity] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [helpType, setHelpType] = React.useState("");
  const [calendlyLink, setCalendlyLink] = React.useState("");
  // const [sendValidation, setSendValidation] = React.useState(true);
  // const [errorSend,setErrorSend] = React.useState("hello");
  
  handleClickSend = () => {
    let isValid = true;
    let errorMessage = "השדות הבאים אינם תקינים : \n";
    // if(firstName == null || lastName == null || city == null || phone == null || helpType == null || calendlyLink == null)
    //   alert("אחד או יותר מהשדות");
    
   if (!/([א-ת]+)/.test(firstName))
    {
      isValid = false;
      errorMessage = errorMessage + "שם לא תקין, הכנס שם בעברית";
      //alert("שם לא תקין, אנא הכנס שם בעברית");
      // setSendValidation(false);
      // setErrorSend(errorSend + "שם לא תקין, אנא הכנס רק תווים בעברית");
      // alert(errorSend);
      // setErrorSend("");
    }
   if(!/([א-ת]+)/.test(lastName))
    {
      isValid = false;
      errorMessage = errorMessage + "\n" + "שם משפחה לא תקין, הכנס שם בעברית";
    }
    if(isValid == false)
    {
      alert(errorMessage);
      //errorMessage="";
    }
    else
     {
    firestore()
      .collection("Volunteers")
      .add({
        firstName: firstName,
        lastName: lastName,
        city: city,
        phone: phone,
        helpType: helpType,
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
    }
    
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
        if(phone.length != 10)
        alert("מספר פלאפון לא תקין");
        else
          {
            doc.ref.update({phone:phone});
            alert("Done");
          }
      });
    });
  };

  return (
    <View style={{ margin: 10 }}>
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
    width: 20, // or whatever size you need
    height: "15%",
  },
});

export default AdminScreen;
