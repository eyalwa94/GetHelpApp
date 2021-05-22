import React from "react";
import { View, Text, ActivityIndicator ,Linking ,StyleSheet,ScrollView } from "react-native";
import { Button } from "react-native-paper";



const AllVolunteers = ({ route, navigation }) => {
  const  {all_volunteers}  = route.params;
  const bg_colors=["red","green","blue","yellow","white","purple"];

  if(all_volunteers.length!=0)
  {
  return (

    <ScrollView style={{ flex: 1 }} contentContainerStyle={{justifyContesnt: "center", alignItems: "center"}}>
        <Text>כל המתנדבים</Text>
        
      {all_volunteers.map((item, key) => {
        return (<View key={key} style={{flex: 1 , backgroundColor: bg_colors[Math.floor(Math.random()*bg_colors.length)] , width: "100%" ,  }}>
          <Text style={styles.text}>שם: {item.firstName}</Text>
          <Text style={styles.text} >שם משפחה: {item.lastName}</Text>
          <Text style={styles.text}>עיר: {item.city}</Text>
          <Text style={styles.text}>מספר טלפון: {item.phone}</Text>
          <Text style={styles.text}>סוג עזרה: {item.helpType}</Text>
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
  }
});

export default AllVolunteers;
