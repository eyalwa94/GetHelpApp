import React from "react";
import { View, Text, ActivityIndicator ,Linking } from "react-native";
import { firestore } from "../api/firebase";


const HelpScreen = ({ route, navigation }) => {
  const { help } = route.params;
  const [Volunteers, setVolunteers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const items = [];

  if(loading) {
  firestore()
    .collection("Volunteers")
    .where("city", "==", "חיפה").get()
    .then((snapshot) => {
      snapshot.forEach((volunteer) => {
        items.push(volunteer.data());
      })
    })
    .then(() => {
        setVolunteers(items);
        setLoading(false);
    })
}

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large'/>
      </View>
    );
  }
  
  return (
    <View style={{ flex: 1, justifyContesnt: "center", alignItems: "center" }}>
      <Text>מה שנבחר זה {help}</Text>
      <Text onPress={() => {
            Linking.openURL(
              "https://calendly.com/ziv-birer/rabbi"
            );
          }}>שיחה עם קבקי</Text>
      {Volunteers.map((item, key) => {
        return <Text key={key}>{item.firstName}</Text>;
      })}
    </View>
  );
};

export default HelpScreen;
