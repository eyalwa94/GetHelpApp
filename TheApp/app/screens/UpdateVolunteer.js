//Update Volunteer
//Part of the admin page

//import
import React from "react";
import { View, Text, StyleSheet, ScrollView, Alert, Modal } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { firestore, auth } from "../api/firebase";
import RNPickerSelect from 'react-native-picker-select';


//Update page and functions
const UpdateVolunteer = ({ route, navigation }) => {
  const { chosen_volunteer } = route.params;

  const [firstName, setFirstName] = React.useState(
    chosen_volunteer[0].firstName
  );
  const [lastName, setLastName] = React.useState(chosen_volunteer[0].lastName);
  const [city, setCity] = React.useState(chosen_volunteer[0].city);
  const [phone, setPhone] = React.useState(chosen_volunteer[0].phone);
  const [moreInfo,setMoreInfo] = React.useState(chosen_volunteer[0].moreInfo);
  const [calendlyLink, setCalendlyLink] = React.useState(
    chosen_volunteer[0].calendlyLink
  );
  
  //Update the volunteer
  handleClickUpdate1 = () => {
    let doc_to_update_query = firestore()
      .collection("Volunteers")
      .where("firstName", "==", chosen_volunteer[0].firstName)
      .where("lastName", "==", chosen_volunteer[0].lastName);
    doc_to_update_query.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref
          .update({
            firstName: firstName,
            lastName: lastName,
            city: city,
            phone: phone,
            calendlyLink: calendlyLink,
            moreInfo: moreInfo,
          })
          .then(() => {
            setFirstName("");
            setLastName("");
            setCity("");
            setPhone("");
            setCalendlyLink("");
            setMoreInfo("");
            Alert.alert(
              "הצלחה",
              chosen_volunteer[0].firstName +
                " " +
                chosen_volunteer[0].lastName +
                " " +
                "עודכן בהצלחה",
              [
                {
                  test: "אישור",
                  onPress: () => {
                    let all_volunteers = [];
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
                          wanted_sort:false
                        });
                      });
                  },
                },
              ]
            );
          });
      });
    });
  };

  return (
    <ScrollView style={{ margin: 10 }} style={{ flex: 1 }}
    contentContainerStyle={{ backgroundColor: "whitesmoke" }}>
      <Text style={styles.headline}>עריכה</Text>
      <Text style={styles.text}>שם:</Text>
      <TextInput
       style={styles.textInput}
       mode="flat"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        selectionColor="#0000FF"
      />
      <Text style={styles.text}>שם משפחה:</Text>
      <TextInput
        style={styles.textInput}
        mode="flat"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        selectionColor="#0000FF"
      />
      <Text style={styles.text}>עיר:</Text>
      <TextInput
        style={styles.textInput}
        mode="flat"
        value={city}
        onChangeText={(text) => setCity(text)}
        selectionColor="#0000FF"
      />
      <Text style={styles.text}>טלפון:</Text>
      <TextInput
       style={styles.textInput}
       mode="flat"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        selectionColor="#0000FF"
        keyboardType="phone-pad"
      />
      {/* <TextInput
        style={{ textAlign: "right", writingDirection: "rtl" }}
        mode="outlined"
        value={helpType}
        onChangeText={(text) => setHelpType(text)}
        selectionColor="#0000FF"
      /> */}
      <Text style={styles.text}>קישור לקלנדלי:</Text>
      <TextInput
       style={styles.textInput}
       mode="flat"
        value={calendlyLink}
        onChangeText={(text) => setCalendlyLink(text)}
        selectionColor="#0000FF"
      />
      <Text style={styles.text}>מידע נוסף:</Text>
      <TextInput
       style={styles.textInput}
       mode="flat"
        value={moreInfo}
        onChangeText={(text) => setMoreInfo(text)}
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
          style={styles.button}
          mode="contained"
          color="green"
          compact="true"
          onPress={handleClickUpdate1}
        >
          <Text style={styles.text}> עריכה</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

//styling the page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFEBCD",
  },
  space: {
    width: 20, // or whatever size you need
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
    margin: 5
  },
  headline: {
    fontSize: 35,
    textAlign: "center",
    fontFamily: "Montserrat",
    color: "#800000",
    fontWeight: "800",
    shadowOpacity: 0.2,
    letterSpacing: 1.5,
    marginBottom: 40,
    marginTop: 30,
  },
  textInput: {
    textAlign: "right",
    writingDirection: "rtl",
    marginBottom: 12,
    height: 40,
    width: "95%",
    marginLeft: 15,
  },
  button: {
    alignSelf: "center",
    fontSize: 20,
    width: "70%",
    marginBottom: 20,
    marginTop: 30,
    elevation: 10,
    borderColor: "#800000",
    borderWidth: 2,
    marginEnd: 5,
    backgroundColor: "rgb(202, 197, 197)",
  },
});

export default UpdateVolunteer;
