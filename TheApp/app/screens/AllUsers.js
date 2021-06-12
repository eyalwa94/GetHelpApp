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
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";
import { firestore } from "../api/firebase";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

// help screen and his redirections
const AllUsers = ({ route, navigation }) => {
  const { all_users } = route.params;
  let number_of_users = all_users.length;

  if (all_users.length != 0) {
    return (
      <ScrollView
        style={{ justifyContesnt: "center" }}
        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
      >
        <Text style={styles.headline}>
          מספר הכניסות היום: {number_of_users}
        </Text>
        {all_users.map((item, key) => {
          return (
            <View key={key} style={styles.volArea}>
              <View style={{ flexDirection: "row-reverse" }}>
                <Text style={styles.text}>שם: </Text>
                <Text style={styles.details_text}>{item.name}</Text>
              </View>
              <View style={{ flexDirection: "row-reverse" }}>
                <Text style={styles.text}>אימייל: </Text>
                <Text style={styles.details_text}>{item.email}</Text>
              </View>
              <View style={{ flexDirection: "row-reverse" }}>
                <Text style={styles.text}>סוג עזרה אחרונה שנבחרה: </Text>
                <Text style={styles.details_text}>{item.helpSearched}</Text>
              </View>
              <View style={{ flexDirection: "row-reverse" }}>
                <Text style={styles.text}>מספר הכניסות היום: </Text>
                <Text style={styles.details_text}>{item.counter}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
  } // in case there is no volunteers
  else {
    return (
      <View style={styles.empty_page}>
        <Text style={styles.empty_text}>לא היו כניסות היום מ00:00</Text>
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
    fontFamily: "Montserrat",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 3,
  },
  details_text: {
    textAlign: "right",
    fontFamily: "Montserrat",
    writingDirection: "rtl",
    fontSize: 20,
    justifyContent: "flex-end",
    right: 0,
    flex: 1,
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
    position: "absolute",
    left: 0,
    bottom: 0,
  },
  empty_page: {
    flex: 1,
    fontFamily: "Montserrat",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
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
  empty_text: {
    fontSize: 35,
    textAlign: "center",
    fontFamily: "Montserrat",
    color: "#800000",
    fontWeight: "800",
    shadowOpacity: 0.2,
    letterSpacing: 1.5,
    marginBottom: 30,
    marginTop: -100,
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
  volArea: {
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1.5,
    width: "90%",
    height: 130,
    alignSelf: "center",
    marginBottom: 2,
  },
});

export default AllUsers;
