//The main help screen for the user
//Introduce all the help options that the user have

//improt
import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Linking,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-paper";
import { firestore } from "../api/firebase";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

// help screen and his redirections
const HelpScreen = ({ route, navigation }) => {
  const { all_volunteers } = route.params;

  if (all_volunteers.length != 0) {
    // if there are volunteers
    if (all_volunteers[0].helpType == "רב") {
      // if the chosen help is Rabbi
      return (
        <View style={{ justifyContesnt: "center", alignItems: "center" }}>
          <Text style={styles.title}>{all_volunteers[0].helpType}</Text>
          {all_volunteers.map((item, key) => {
            return (
              <View
                key={key}
                style={{
                  backgroundColor: "white",
                  borderColor: "gray",
                  borderWidth: 3,
                  width: "90%",
                  height: 200,
                }}
              >
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
                <Button
                  style={styles.Button}
                  onPress={() => Linking.openURL(item.calendlyLink)}
                >
                  <Text style={{ color: "black" }}>קביעת פגישה</Text>
                </Button>
              </View>
            );
          })}
        </View>
      );
    } // Any other help
    else {
      return (
        <View
          style={{ flex: 1, justifyContesnt: "center", alignItems: "center" }}
        >
          <Text style={styles.headline}>{all_volunteers[0].helpType}</Text>
          {all_volunteers.map((item, key) => {
            let whatsapp_link = "https://wa.me/972" + item.phone.slice(1);

            return (
              <View
                key={key}
                style={{
                  backgroundColor: "white",
                  borderColor: "gray",
                  borderWidth: 3,
                  width: "90%",
                  height: 200,
                }}
              >
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
                <Button
                  style={styles.Button}
                  onPress={() => Linking.openURL(whatsapp_link)}
                >
                  <Text style={{ color: "black" }}>יצירת קשר (WhatsApp) </Text>
                  <AntDesign name="phone" size={24} color="black" />
                </Button>
              </View>
            );
          })}
        </View>
      );
    }
  } // in case there is no volunteers
  else {
    return (
      <View style={styles.empty_page}>
        <Text style={styles.empty_text}>אין כרגע מתנדבים</Text>
      </View>
    );
  }
};

//styling the page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFEBCD",
  },
  space: {
    width: 20,
    height: 20,
  },
  text: {
    textAlign: "right",
    writingDirection: "rtl",
    fontSize: 20,
    justifyContent: "flex-start",
    fontFamily: "Montserrat",
    right: 0,
  },
  details_text: {
    textAlign: "right",
    fontFamily: "Montserrat",
    writingDirection: "rtl",
    fontSize: 20,
    justifyContent: "flex-end",
    right: 0,
  },
  Button: {
    fontSize: 20,
    width: "66%",
    marginBottom: 20,
    marginTop: 30,
    elevation: 10,
    borderColor: "#800000",
    borderWidth: 2,
    marginEnd: 5,
    backgroundColor: "rgb(202, 197, 197)",
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  empty_page: {
    flex: 1,
    fontFamily: "Montserrat",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#aaa",
  },
  headline: {
    fontSize: 35,
    textAlign: "center",
    fontFamily: "Montserrat",
    color: "#800000",
    fontWeight: "800",
    shadowOpacity: 0.2,
    letterSpacing: 1.5,
    marginBottom: 30,
    marginTop: 20,
  },
  empty_text: {
    textAlign: "right",
    fontFamily: "Montserrat",
    writingDirection: "rtl",
    fontSize: 40,
    justifyContent: "flex-end",
    right: 0,
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    fontFamily: "Comic Sans MS",
    textShadowColor: "red",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    color: "gray",
    textShadowColor: "rosybrown",
    fontWeight: "600",
    margin: 10,
  },
});

export default HelpScreen;
