import React from "react";
import { View, Text, ActivityIndicator ,Linking ,StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { firestore } from "../api/firebase";


const HelpScreen = ({ route, navigation }) => {
  const  {all_volunteers}  = route.params;
  if(all_volunteers.length!=0)
  {
    if(all_volunteers[0].helpType=='רב')
    { 
      return (
    
    <View style={{ justifyContesnt: "center", alignItems: "center" }}>
    

      <Text style={styles.title}>{all_volunteers[0].helpType}</Text>
      {all_volunteers.map((item, key) => {
        return (
        
        <View key={key} style={{ backgroundColor: "white", borderColor: 'gray',
        borderWidth: 3 , width: "90%" ,height : 200, }}>
          <View style={{flexDirection:"row-reverse"}}> 
            <Text style={styles.text}>שם: </Text>
            <Text style={styles.details_text}>{item.firstName}</Text>
          </View>
          <View style={{flexDirection:"row-reverse"}}>
          <Text style={styles.text}>שם משפחה:  </Text>
          <Text style={styles.details_text}>{item.lastName}</Text>
          </View>
          <View style={{flexDirection:"row-reverse"}}>
          <Text style={styles.text}>עיר: </Text>
          <Text style={styles.details_text}>{item.city}</Text>
          </View>
          <View style={{flexDirection:"row-reverse"}}>
          <Text style={styles.text}>מספר טלפון: </Text>
          <Text style={styles.details_text}>{item.phone}</Text>
          </View>
          <Button style={styles.Button} onPress={() => Linking.openURL(item.calendlyLink)}>קביעת פגישה</Button>
          </View>);
      })}  
    </View>
      );
    }
    else  
    {
      return (
    
        <View style={{ flex: 1, justifyContesnt: "center", alignItems: "center" }}>
          <Text style={styles.title}>{all_volunteers[0].helpType}</Text>
          {all_volunteers.map((item, key) => {
            let whatsapp_link="https://wa.me/972"+item.phone.slice(1);
            
            return (
              <View key={key} style={{ backgroundColor: "white", borderColor: 'gray',
              borderWidth: 3 , width: "90%" ,height : 200, }}>
              <View style={{flexDirection:"row-reverse"}}> 
            <Text style={styles.text}>שם: </Text>
            <Text style={styles.details_text}>{item.firstName}</Text>
          </View>
          <View style={{flexDirection:"row-reverse"}}>
          <Text style={styles.text}>שם משפחה:  </Text>
          <Text style={styles.details_text}>{item.lastName}</Text>
          </View>
          <View style={{flexDirection:"row-reverse"}}>
          <Text style={styles.text}>עיר: </Text>
          <Text style={styles.details_text}>{item.city}</Text>
          </View>
          <View style={{flexDirection:"row-reverse"}}>
          <Text style={styles.text}>מספר טלפון: </Text>
          <Text style={styles.details_text}>{item.phone}</Text>
          </View>
              <Button style={styles.Button2} onPress={() => Linking.openURL(whatsapp_link)}>יצירת קשר (WhatsApp)</Button>
              </View>);
          })}  
        </View>
          );
    }
  }
  else
  {
    return (<View style={styles.empty_page}>
        <Text style={styles.empty_text}>אין כרגע מתנדבים
        </Text>
        </View>)
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
    fontWeight: 'bold',
    fontSize:20,
    justifyContent: 'flex-start',    
    right: 0,

  },
  details_text: {
    textAlign: "right",
    fontFamily: "Montserrat",
    writingDirection: "rtl",
    fontSize:22  ,  
    justifyContent: 'flex-end',
    right: 0,
    

  },
  Button : {marginTop: 20,
    width: 160,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#aaa',
    elevation: 10, 
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 5,
    textAlign: 'center',
},
Button2 : {marginTop: 20,
  width: 240,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 100,
  backgroundColor: '#aaa',
  elevation: 10, 
  borderColor: 'black',
  borderWidth: 1,
  marginLeft: 5,
  textAlign: 'center',
},

empty_page : {flex: 1,
  fontFamily: "Montserrat",
  justifyContent: "center",
  alignItems:"center",
  backgroundColor: '#aaa',
},

empty_text : {
  textAlign: "right",
    fontFamily: "Montserrat",
    writingDirection: "rtl",
    fontSize:40  ,  
    justifyContent: 'flex-end',
    right: 0,
},
  title: {fontSize: 40,
    textAlign:"center",
    fontFamily:"Comic Sans MS",
    textShadowColor: 'red',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
    color: "gray", 
    textShadowColor: 'rosybrown', 
    fontWeight: '600',
    margin: 10}

});



export default HelpScreen;
