import React from "react";
import { View, Text, ActivityIndicator ,Linking ,StyleSheet,ScrollView, RefreshControl,Alert } from "react-native";
import { Button } from "react-native-paper";
import { firestore } from "../api/firebase";



const AllVolunteers = ({ route, navigation }) => {
  const  {all_volunteers}  = route.params;
  const bg_colors=["#F0F8FF","#FAEBD7","#5F9EA0","#E9967A","#F0E68C","#FFB6C1"];
  let chosen_volunteer=[];

  handleClickDelete=(firstName,lastName,key) => {
    Alert.alert(
      "אזהרה",
      "מחיקת משתמש זוהי פעולה שאיננה ניתנת לביטול הם תרצי למחוק את" + " " + firstName + " " + lastName + "?",
      [
        {
          text: "אישור", onPress: () => {
            let doc_to_del_query = firestore()
            .collection("Volunteers")
      .where("firstName", "==", firstName)
      .where("lastName", "==", lastName);
      doc_to_del_query.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
        all_volunteers.splice(key, 1);
        navigation.navigate("AllVol", {all_volunteers: all_volunteers });
      });
    });
          }
          
        },
        { text: "ביטול" }
      ],
    );      
  }

  handleClickUpdate=(firstName,lastName,key) => {
    chosen_volunteer=[];
    firestore()
    .collection("Volunteers")
    .where("firstName", "==", firstName).where("lastName","==",lastName)
    .get()
    .then((snapshot) => {
      snapshot.forEach((volunteer) => {
        chosen_volunteer.push(volunteer.data());
      })
    })
    .then(() => {
      navigation.navigate("UpdateVol", {chosen_volunteer: chosen_volunteer }); //********************* */
    })
  }

  if(all_volunteers.length!=0)
  {
  return (

    <ScrollView style={{ flex: 1 }} contentContainerStyle={{justifyContesnt: "center", alignItems: "center" , backgroundColor:"#F8F8FF"}}>
      
        <Text style={{fontSize:30}} >כל המתנדבים</Text>
        
      {all_volunteers.map((item, key) => {
        return (<View key={key} style={{flex: 1 , backgroundColor: bg_colors[Math.floor(Math.random()*bg_colors.length)] , width: "100%" ,  }}>
          <Text style={styles.text}>שם: {item.firstName}</Text>
          <Text style={styles.text} >שם משפחה: {item.lastName}</Text>
          <Text style={styles.text}>עיר: {item.city}</Text>
          <Text style={styles.text}>מספר טלפון: {item.phone}</Text>
          <Text style={styles.text}>סוג עזרה: {item.helpType}</Text>
          <Button
          color="red"
          compact="true"
          onPress={() => handleClickDelete(item.firstName,item.lastName,key)}
        >
          <Text style={{fontSize:20}}> מחיקה</Text>
        </Button>
        <Button
          color="red"
          compact="true"
          onPress={() => handleClickUpdate(item.firstName,item.lastName,key)}
        >
          <Text style={{fontSize:20}}> עריכה</Text>
        </Button>
          </View>);
      })}  
    </ScrollView>
  );
    }
    else
    {
      return (<View><Text>אין כרגע מתנדבים</Text></View>)
    }
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
    fontSize:20
  }
});

export default AllVolunteers;
