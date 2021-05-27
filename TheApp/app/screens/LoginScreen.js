//Login screen
//For the admin and also the user

//import
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
} from "react-native";
import { Button } from "react-native-paper";
import { useFonts } from "expo-font";
import { TextInput } from "react-native-paper";
import { useEffect } from "react/cjs/react.production.min";
import {auth} from "../api/firebase"
import { AntDesign,Ionicons,FontAwesome5 } from '@expo/vector-icons'; 

//Login screen and functions
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

  //Check if the validation functions were ok, if so go to the next page.
  function handleClickEnter() {
     
      if(validEmail==true && validName==true)
      {
        //navigate into ChooseHelp screen
      navigation.navigate("ChooseHelp", {
        userName: nameText,
        userEmail: emailText,
      });
      }
      else // in case the validation fail we pop up alert
      {
        Alert.alert("שגיאה","אנא הזן שם ואימייל תקניים",[{text:"אישור"}])
      }
    
  }

  //check for valid mail
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

  //check for valid name
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex:0.3 , alignItems:"center" , alignContent:"center"}}>
             <Button
              style={{ width: "50%", borderRadius: 70 }}
              mode="contained"
              color="red"
              compact="true"
              onPress={() => {
                Linking.openURL(
                  "https://chat.whatsapp.com/G2mKnKskYP556onqPdynTc"
                );
              }}
            >
              <Text style={{ fontFamily: "Montserrat", fontSize: 30 }}>
                {" "}
                לעזרה דחופה
                <FontAwesome5 name="hands-helping" size={24} color="black" />
              </Text>
            </Button>
            </View>
      <View style={{margin:10}}>
        <Text
          style={{
            fontFamily: "Montserrat",
            textAlign: "right",
            writingDirection: "rtl",
            fontSize: 30,
          }}
        >
          שם:
        </Text>
        <TextInput placeholder="אנא הזן את שמך בעברית"
          style={{ textAlign: "right", writingDirection: "rtl" }}
          mode="outlined"
          value={nameText}
          onChangeText={(text) => setNameText(text)}
          selectionColor="#0000FF"
          onEndEditing={nameValidation}
        />
        <Text style={{color:"red",textAlign: "right",writingDirection: "rtl",}}>{errorName}</Text>
        <Text
          style={{
            fontFamily: "Montserrat",
            textAlign: "right",
            writingDirection: "rtl",
            fontSize: 30,
          }}
        >
          אימייל:
        </Text>
        <TextInput placeholder="אנא הזן את כתובת המייל שלך"
          style={{ textAlign: "right", writingDirection: "rtl" }}
          mode="outlined"
          value={emailText}
          onChangeText={(text) => setEmailText(text)}
          selectionColor="#0000FF"
          onEndEditing={emailValidation}
        />
        <Text style={{color:"red",textAlign: "right",writingDirection: "rtl",}}>{errorEmail}</Text>
      </View>
      <View style={styles.space} />
      <View>
        <View style={{ height: 10 }} />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Button
            style={{ width: "70%" }}
            mode="contained"
            color="yellow"
            compact="true"
            onPress={handleClickEnter}
          >
            <Text style={{ fontFamily: "Montserrat", fontSize: 30 }}>
              {" "}
              <Ionicons name="md-enter-sharp" size={24} color="black" />
              כניסה
            </Text>
          </Button>
           
        </View>
      </View>
    </SafeAreaView>
  );
};

//Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFEBCD",
    
  },
  input: {
    margin: 15,
    borderColor: 'black',
    borderWidth: 1,
    writingDirection: "rtl",
    textAlign: "right",
  },
  space: {
    width: 20, 
    height: "15%",
  },
});
export default LoginScreen;
