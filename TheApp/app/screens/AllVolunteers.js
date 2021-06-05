//Admin pannel page that show all the volunteers
//it include the functions of Update and Delete

//import
import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Linking,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { firestore } from "../api/firebase";
import RNPickerSelect from "react-native-picker-select";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

//All volunteers page and his functions
const AllVolunteers = ({ route, navigation }) => {
  let { all_volunteers } = route.params;
  const { sorted_vol } = route.params;
  const { wanted_sort } = route.params;
  const [nameSort, setNameSort] = React.useState("");
  const [lastNameSort, setLastNameSort] = React.useState("");
  const [helpTypeSort, setHelpTypeSort] = React.useState("");
  const [citySort, setCitySort] = React.useState("");
  let chosen_volunteer = [];

  //Styling
  const bg_colors = [
    "#F0F8FF",
    "#FAEBD7",
    "#5F9EA0",
    "#E9967A",
    "#F0E68C",
    "#FFB6C1",
  ];

  //Delete function of volunteer
  handleClickDelete = (firstName, lastName, key) => {
    //Pop up alert because this action delete information from the firebase
    Alert.alert(
      "אזהרה",
      "מחיקת משתמש זוהי פעולה שאיננה ניתנת לביטול הם תרצי למחוק את" +
        " " +
        firstName +
        " " +
        lastName +
        "?",
      [
        {
          text: "אישור",
          onPress: () => {
            //Delete the user by First name and last name from the firebase database
            let doc_to_del_query = firestore()
              .collection("Volunteers")
              .where("firstName", "==", firstName)
              .where("lastName", "==", lastName);
            doc_to_del_query.get().then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                doc.ref.delete();
                if (wanted_sort == false) all_volunteers.splice(key, 1);
                else
                  all_volunteers = all_volunteers.filter(
                    (vol) =>
                      vol.firstName != firstName && vol.lastName != lastName
                  );
                navigation.navigate("AllVol", {
                  all_volunteers: all_volunteers,
                  wanted_sort: false,
                });
              });
            });
          },
        },
        { text: "ביטול" },
      ]
    );
  };

  //Update function of volunteer
  handleClickUpdate = (firstName, lastName, key) => {
    //get the volunteer that need to be updated from the firebase
    chosen_volunteer = [];
    firestore()
      .collection("Volunteers")
      .where("firstName", "==", firstName)
      .where("lastName", "==", lastName)
      .get()
      .then((snapshot) => {
        snapshot.forEach((volunteer) => {
          chosen_volunteer.push(volunteer.data());
        });
      })
      .then(() => {
        //Navigates to the UpdateVol page and send there the volunteer that need to be updated
        navigation.navigate("UpdateVol", {
          chosen_volunteer: chosen_volunteer,
        }); //******* */
      });
  };

  //Sort function of whole volunteers
  handleClickSort = () => {
    let sorted_volunteers = all_volunteers.slice();
    let sort_was_made = false;

    if (nameSort != "") {
      // sort by name
      sort_was_made = true;
      sorted_volunteers = sorted_volunteers.filter(
        (vol) => vol.firstName == nameSort
      );
    }
    if (lastNameSort != "") {
      // sort by last name
      sort_was_made = true;
      sorted_volunteers = sorted_volunteers.filter(
        (vol) => vol.lastName == lastNameSort
      );
    }
    if (helpTypeSort.value != "" && helpTypeSort.value != undefined) {
      // sort by help type
      sort_was_made = true;
      sorted_volunteers = sorted_volunteers.filter(
        (vol) => vol.helpType == helpTypeSort.value
      );
    }
    if (citySort != "") {
      // sort by city
      sort_was_made = true;
      sorted_volunteers = sorted_volunteers.filter(
        (vol) => vol.city == citySort
      );
    }

    if (sorted_volunteers.length != 0 && sort_was_made) {
      // validation for sorting type
      setNameSort("");
      setLastNameSort("");
      setCitySort("");
      setHelpTypeSort("");
      navigation.navigate("AllVol", {
        all_volunteers: all_volunteers,
        sorted_vol: sorted_volunteers,
        wanted_sort: true,
      });
    } else {
      Alert.alert("שגיאה", "לא נמצא משתמש העונה על הדרישות הללו", [
        { text: "אישור" },
      ]);
    }
  };

  //Go back navigation
  handleClickGoBack = () => {
    navigation.navigate("AllVol", {
      all_volunteers: all_volunteers,
      wanted_sort: false,
    });
  };

  if (wanted_sort == false) {
    // represent the regular page without sorting
    if (all_volunteers.length != 0) {
      //if there are any volunteers in the firebase
      return (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ backgroundColor: "whitesmoke" }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={styles.image}
              source={require("../assets/BatKol.jpg")}
            />
            <Text style={styles.headline}>כל המתנדבים</Text>
          </View>
          <View style={styles.sortArea}>
            <Text style={styles.sortHeadline}>מיון המשתמשים:</Text>
            <Text style={styles.text}>שם:</Text>
            <TextInput
              style={styles.textInput}
              mode="flat"
              value={nameSort}
              onChangeText={(text) => setNameSort(text)}
            />
            <Text style={styles.text}>שם משפחה:</Text>
            <TextInput
              style={styles.textInput}
              mode="flat"
              value={lastNameSort}
              onChangeText={(text) => setLastNameSort(text)}
            />
            <Text style={styles.text}>סוג עזרה:</Text>
            <RNPickerSelect
              style={styles.textInput}
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
                setHelpTypeSort({ value });
              }}
            ></RNPickerSelect>

            <Text style={styles.text}>עיר:</Text>
            <TextInput
              style={styles.textInput}
              mode="flat"
              value={citySort}
              onChangeText={(text) => setCitySort(text)}
            />

            <Button
              style={styles.button}
              mode="contained"
              color="rgb(202, 197, 197)"
              compact="true"
              onPress={handleClickSort}
            >
              <Text style={styles.text}> מיין </Text>
              <FontAwesome name="sort" size={20} color="black" />
            </Button>
          </View>
          {all_volunteers.map((item, key) => {
            return (
              <View key={key} style={styles.volArea}>
                <Text style={styles.text}>שם: {item.firstName}</Text>
                <Text style={styles.text}>שם משפחה: {item.lastName}</Text>
                <Text style={styles.text}>עיר: {item.city}</Text>
                <Text style={styles.text}>מספר טלפון: {item.phone}</Text>
                <Text style={styles.text}>סוג עזרה: {item.helpType}</Text>
                <Button
                  style={styles.volButtonPrimary}
                  mode="contained"
                  color="rgb(202, 197, 197)"
                  onPress={() =>
                    handleClickDelete(item.firstName, item.lastName, key)
                  }
                >
                  <Text style={{ fontSize: 13 }}> מחיקה </Text>
                  <AntDesign name="deleteuser" size={20} color="black" />
                </Button>
                <Button
                  style={styles.volButtonPrimary}
                  mode="contained"
                  color="rgb(202, 197, 197)"
                  onPress={() =>
                    handleClickUpdate(item.firstName, item.lastName, key)
                  }
                >
                  <Text style={{ fontSize: 13 }}> עריכה </Text>
                  <AntDesign name="edit" size={20} color="black" />
                </Button>
              </View>
            );
          })}
        </ScrollView>
      );
    } // in case there are no volunteers
    else {
      return (
        <View>
          <Text>אין כרגע מתנדבים</Text>
        </View>
      );
    }
  } // Show the sported page
  else {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ backgroundColor: "whitesmoke" }}
      >
        <Button
          style={styles.backToListButton}
          compact="true"
          onPress={handleClickGoBack}
        >
          <Text style={{ color: "black", fontSize: 20 }}>חזרה</Text>
          <AntDesign name="enter" size={24} color="black" />
        </Button>
        {sorted_vol.map((item, key) => {
          return (
            <View key={key} style={styles.volArea}>
              <View style={{ flexDirection: "row-reverse" }}>
                <Text style={styles.text}>שם: </Text>
                <Text style={styles.details_text}>{item.firstName}</Text>
              </View>
              <View style={{ flexDirection: "row-reverse" }}>
                <Text style={styles.text}>שם משפחה: </Text>
                <Text style={styles.details_text}>{item.lastName}</Text>
              </View>
              <View style={{ flexDirection: "row-reverse" }}>
                <Text style={styles.text}>עיר: </Text>
                <Text style={styles.details_text}>{item.city}</Text>
              </View>
              <View style={{ flexDirection: "row-reverse" }}>
                <Text style={styles.text}>מספר טלפון: </Text>
                <Text style={styles.details_text}>{item.phone}</Text>
              </View>
              <Button style={styles.volButton}>
                <Text style={{ color: "black", fontSize: 13 }}> מחיקה </Text>
                <AntDesign name="deleteuser" size={20} color="black" />
              </Button>
              <Button
                style={styles.volButton}
                mode="contained"
                compact="true"
                onPress={() =>
                  handleClickUpdate(item.firstName, item.lastName, key)
                }
              >
                <Text style={{ color: "black", fontSize: 13 }}> עריכה </Text>
                <AntDesign name="edit" size={20} color="black" />
              </Button>
            </View>
          );
        })}
      </ScrollView>
    );
  }
};

//styling page
const styles = StyleSheet.create({
  backToListButton: {
    alignSelf: "flex-start",
    fontSize: 20,
    width: "23%",
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 10,
    elevation: 10,
    borderColor: "#800000",
    borderWidth: 2,
    marginEnd: 5,
    backgroundColor: "rgb(202, 197, 197)",
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
  volButton: {
    alignSelf: "flex-start",
    width: "30%",
    marginBottom: 1,
    marginTop: 4,
    marginLeft: 10,
    borderColor: "#800000",
    borderWidth: 2,
    backgroundColor: "rgb(202, 197, 197)",
  },
  volButtonPrimary: {
    alignSelf: "flex-start",
    width: "30%",
    marginBottom: 16,
    marginTop: -13,
    marginLeft: 10,
    borderColor: "#800000",
    borderWidth: 2,
    backgroundColor: "rgb(202, 197, 197)",
  },
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    height: "100%",
  },
  details_text: {
    textAlign: "right",
    fontFamily: "Montserrat",
    writingDirection: "rtl",
    fontSize: 20,
    justifyContent: "flex-start",
    right: 0,
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
  image: {
    marginTop: 5,
    marginRight: 5,
    borderRadius: 110,
    width: 60,
    height: 60,
    alignSelf: "flex-start",
    right: 0,
    position: "absolute",
  },
  space: {
    width: 20,
    height: 20,
  },
  sortArea: {
    alignSelf: "center",
    backgroundColor: "whitesmoke",
    width: "100%",
    height: 450,
    marginBottom: 50,
  },
  sortHeadline: {
    fontSize: 25,
    textAlign: "right",
    fontFamily: "Montserrat",
    color: "#800000",
    marginBottom: 10,
    fontWeight: "bold",
    marginTop: 10,
  },
  sortText: {
    fontFamily: "Montserrat",
    fontSize: 30,
    textAlign: "right",
    writingDirection: "rtl",
    marginTop: 5,
    marginBottom: 5,
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
    width: "95%",
    marginLeft: 15,
  },
  volArea: {
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1.5,
    width: "90%",
    height: 220,
    alignSelf: "center",
    marginBottom: 2,
  },
});

export default AllVolunteers;
