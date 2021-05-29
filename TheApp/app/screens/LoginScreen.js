import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  Text,
  Alert,
  SafeAreaView,
  Linking,
  KeyboardAvoidingView,
} from "react-native";
import { Button } from "react-native-paper";
import { useFonts } from "expo-font";
import { TextInput } from "react-native-paper";

import { useEffect } from "react/cjs/react.production.min";
import {auth} from "../api/firebase"


const LoginScreen = ({ navigation }) => {
  const [nameText, setNameText] = React.useState("");
  const [emailText, setEmailText] = React.useState("");
  const [password, setPassword] = React.useState("1234");

  const[errorEmail,setErrorEmail]=React.useState("");
  const[errorName,setErrorName]=React.useState("");
  const[validEmail,setValidEmail]=React.useState(false);
  const[validName,setValidName]=React.useState(false);


  const [loaded] = useFonts({
    Montserrat: require("../assets/fonts/500.ttf"),
  });

  if (!loaded) {
    return null;
  }

  function handleClickEnter() {
     
      if(validEmail==true && validName==true)
      {
      navigation.navigate("ChooseHelp", {
        userName: nameText,
        userEmail: emailText,
      });
      }
      else{
        Alert.alert("שגיאה","אנא הזן שם ואימייל תקניים",[{text:"אישור"}])
      }
    
  }

  function emailValidation()
  {
    let re = /\S+@\S+\.\S+/;
    if (re.test(emailText)==false)
    {
      setErrorEmail("אנא הזן אימייל תקין");
      setValidEmail(false);
    }
    else
    {
      setErrorEmail("");
      setValidEmail(true);
    }  
  }

  function nameValidation()
  {
    if (nameText == password) 
    {
      navigation.navigate("AdminAuth");
    }
    else{
    let re = /^[\u0590-\u05FF]*$/;
    if(re.test(nameText)==false)
    {
      setErrorName("שם לא תקין (אנא הזן שם בעברית)");
      setValidName(false);
    }
    else
    {
      setErrorName("");
      setValidName(true);
    }  
  }
  }
///////////////////////////////////////////////////////////
  return (
    <SafeAreaView style={styles.container}>

      
      <View style={{flex:1 , alignItems:"stretch" , alignContent:"center"}}>
             <Button
              style={{marginTop: 20,
                width: 120,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
                backgroundColor: '#aaa',
                elevation: 10, 
                borderColor: 'red',
                borderWidth: 3,
                marginLeft: 5,
}}
              mode="contained"
              color="red"
              compact="true"
              onPress={() => {
                Linking.openURL(
                  "https://chat.whatsapp.com/G2mKnKskYP556onqPdynTc"
                );
              }}
            >
              <Text style={{ fontSize: 22,
                            lineHeight: 21,
                            fontWeight: 'bold',
                            letterSpacing: 0.25,
                            color: 'white',fontFamily: "Montserrat" }}>
                עזרה דחופה
              </Text>
              
            </Button>
            <Image style={{
                          alignSelf:"right" ,
                           alignContent:"right",
                           marginTop: 20,
                           borderRadius: 110,
                           width: 80,
                           height: 80,
                           position: 'absolute', 
                           right: 0,
                          }} 
                source={require('../assets/BatKol.jpg')} />
            </View>
            <View >
        <Text style={{fontSize: 80, textAlign:"center",
        fontFamily:"Comic Sans MS", textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 0},
        textShadowRadius: 15,color: "rgb(202, 197, 197)", 
        textShadowColor: 'black', fontWeight: '600',shadowOpacity: 0.2,
        letterSpacing:4, marginBottom: 30}}
        >
          GetHelp
        </Text>
      </View>
      
      <View style={{margin:10}}>
        <Text
          style={{
            fontFamily: "Montserrat",
            textAlign: "right",
            writingDirection: "rtl",
            fontSize: 28,position: 'absolute', 
            right: 0,
          }}
        >
          שם:
        </Text>
        <TextInput
          style={{ textAlign: "right", writingDirection: "rtl",width:'90%', height: 50, }}
          placeholder=""
          value={nameText}
          onChangeText={(text) => setNameText(text)}
          selectionColor="black"
          onEndEditing={nameValidation}
        />
        <Text style={{color:"red",textAlign: "right",writingDirection: "rtl",}}>{errorName}</Text>
        </View>
        <View>
        <Text
          style={{
            fontFamily: "Montserrat",
            textAlign: "right",
            writingDirection: "rtl",
            fontSize: 28,position: 'absolute', 
            right: 0,
          }}
        >
          אימייל:
        </Text>
        <TextInput
          style={{ textAlign: "right", writingDirection: "rtl",
        width:'82%', height: 50, marginLeft: 10}}
        placeholder="address@email.com"
          value={emailText}
          onChangeText={(text) => setEmailText(text)}
          selectionColor="black"
          onEndEditing={emailValidation}
        />
        <Text style={{color:"red",textAlign: "right",writingDirection: "rtl",}}>{errorEmail}</Text>
      
      </View>

      <View style={styles.space} />
      <View>
        <View style={{ height: 10 }} />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Button
            style={{ width: "70%" ,marginBottom:150,elevation: 10, borderColor: 'grey',
            borderWidth: 2,}}
            mode="contained"
            color="rgb(202, 197, 197)"
            compact="true"
  
            onPress={handleClickEnter}
          >
            <Text style={{ fontFamily: "Montserrat", fontSize: 30 }}>
              {" "}
              כניסה
            </Text>
          </Button>
           
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "whitesmoke",
  },
  space: {
    width: 20, // or whatever size you need
    height: "15%",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

export default LoginScreen;

//b5aab5