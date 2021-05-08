import React from "react";
import { View, Text, ActivityIndicator ,Linking ,StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { firestore } from "../api/firebase";


const HelpScreen = ({ route, navigation }) => {
  const  {all_volunteers}  = route.params;
  const bg_colors=["red","green","blue","yellow","white","purple"];



  /*
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
  */
  return (
   /* <View style={{ flex: 1, justifyContesnt: "center", alignItems: "center" }}>
      <Text>מה שנבחר זה {help}</Text>
      <Text onPress={() => {
            Linking.openURL(
              "https://calendly.com/ziv-birer/rabbi"
            );
          }}>שיחה עם קבקי</Text>
      {Volunteers.map((item, key) => {
        return <Text key={key}>{item.firstName}</Text>;
      })}
    </View>*/
    <View style={{ flex: 1, justifyContesnt: "center", alignItems: "center" }}>
      <Text style={{ fontWeight: 'bold' , fontSize:30 }}>{all_volunteers[0].helpType}</Text>
      {all_volunteers.map((item, key) => {
        return (<View key={key} style={{flex: 1 , backgroundColor: bg_colors[Math.floor(Math.random()*bg_colors.length)] , width: "100%" ,  }}>
          <Text style={styles.text}>שם: {item.firstName}</Text>
          <Text style={styles.text} >שם משפחה: {item.lastName}</Text>
          <Text style={styles.text}>עיר: {item.city}</Text>
          <Text style={styles.text}>מספר טלפון: {item.phone}</Text>
          <Button onPress={() => Linking.openURL(item.calendlyLink)}>link for calendly</Button>
          </View>);
      })}  
    </View>
  );
};
//https://calendly.com/ziv-birer/rabbi
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFEBCD",
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  text:{
    textAlign: "right",
    writingDirection: "rtl",
  }
});

export default HelpScreen;
