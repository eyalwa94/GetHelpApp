//The main help screen for the user
//Introduce all the help options that the user have

//improt
import React from "react";
import { View, Text, ActivityIndicator ,Linking ,StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { firestore } from "../api/firebase";

// help screen and his redirections
const HelpScreen = ({ route, navigation }) => {
  const  {all_volunteers}  = route.params;
  const bg_colors=["red","green","yellow","white","purple"];

  if(all_volunteers.length!=0) // if there are volunteers
  {
    if(all_volunteers[0].helpType=='רב') // if the chosen help is Rabbi
    { 
      return (
    
    <View style={{ flex: 1, justifyContesnt: "center", alignItems: "center" }}>
      <Text style={{ fontWeight: 'bold' , fontSize:30 }}>{all_volunteers[0].helpType}</Text>
      {all_volunteers.map((item, key) => {
        return (<View key={key} style={{flex: 1 , backgroundColor: bg_colors[Math.floor(Math.random()*bg_colors.length)] , width: "100%" ,  }}>
          <Text style={styles.text}>שם: {item.firstName}</Text>
          <Text style={styles.text} >שם משפחה: {item.lastName}</Text>
          <Text style={styles.text}>עיר: {item.city}</Text>
          <Text style={styles.text}>מספר טלפון: {item.phone}</Text>
          <Button onPress={() => Linking.openURL(item.calendlyLink)}>לקביעת פגישה דרך הקאלנדרי</Button>
          </View>);
      })}  
    </View>
      );
    }
    else  // Any other help
    {
      return (
    
        <View style={{ flex: 1, justifyContesnt: "center", alignItems: "center" }}>
          <Text style={{ fontWeight: 'bold' , fontSize:30 }}>{all_volunteers[0].helpType}</Text>
          {all_volunteers.map((item, key) => {
            let whatsapp_link="https://wa.me/972"+item.phone.slice(1);
            return (<View key={key} style={{flex: 1 , backgroundColor: bg_colors[Math.floor(Math.random()*bg_colors.length)] , width: "100%" ,  }}>
              <Text style={styles.text}>שם: {item.firstName}</Text>
              <Text style={styles.text} >שם משפחה: {item.lastName}</Text>
              <Text style={styles.text}>עיר: {item.city}</Text>
              <Text style={styles.text}>מספר טלפון: {item.phone}</Text>
              <Button onPress={() => Linking.openURL(whatsapp_link)}>לפנייה דרך הווצאפ</Button>
              </View>);
          })}  
        </View>
          );
    }
  }
  else // in case there is no volunteers
  {
    return (<View style={{flex: 1,
      justifyContent: "center",
      alignItems:"center",
      backgroundColor: "#FFEBCD"}}><Text style={{fontSize:20}}>אין כרגע מתנדבים</Text></View>)
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
  text:{
    textAlign: "right",
    writingDirection: "rtl",
    fontSize:20
  }
});

export default HelpScreen;
