//Update Volunteer
//Part of the admin page

//import
import React from "react";
import { View, Text, StyleSheet, ScrollView, Alert, Modal } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { firestore, auth } from "../api/firebase";
import RNPickerSelect from 'react-native-picker-select';


//Update page and functions

//-- UpdateVolunteer --//
const UpdateVolunteer2 = ({ route, navigation }) => {
  const { chosen_volunteer } = route.params;

  const [firstName, setFirstName] = React.useState(
    chosen_volunteer[0].firstName
  );
  const [lastName, setLastName] = React.useState(chosen_volunteer[0].lastName);
  const [city, setCity] = React.useState(chosen_volunteer[0].city);
  const [phone, setPhone] = React.useState(chosen_volunteer[0].phone);
  const [helpType, setHelpType] = React.useState(chosen_volunteer[0].helpType);
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
      {/* <TextInput
        style={{ textAlign: "right", writingDirection: "rtl" }}
        mode="outlined"
        value={helpType}
        onChangeText={(text) => setHelpType(text)}
        selectionColor="#0000FF"
      /> */}
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
          onPress={handleClickUpdate1}
        >
          <Text style={{ fontFamily: "Montserrat", fontSize: 20 }}> עריכה</Text>
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
  },
});

export default UpdateVolunteer2;
