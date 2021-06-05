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
  ScrollView,
  SafeAreaView,
  Linking,
  KeyboardAvoidingView,
} from "react-native";
import { Button } from "react-native-paper";
import { useFonts } from "expo-font";
import { TextInput } from "react-native-paper";

import { useEffect } from "react/cjs/react.production.min";
import { auth } from "../api/firebase";
import { AntDesign } from "@expo/vector-icons";

//Login screen and functions
const LoginScreen = ({ navigation }) => {
  const [nameText, setNameText] = React.useState("");
  const [emailText, setEmailText] = React.useState("");
  const [password, setPassword] = React.useState("1234");
  const [errorEmail, setErrorEmail] = React.useState("");
  const [errorName, setErrorName] = React.useState("");
  const [validEmail, setValidEmail] = React.useState(false);
  const [validName, setValidName] = React.useState(false);

  let [fontsLoaded] = useFonts({
    "Inter-SemiBoldItalic":
      "https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12",
  });

  const [loaded] = useFonts({
    Montserrat: require("../assets/fonts/500.ttf"),
  });

  if (!loaded) {
    return null;
  }

  //Check if the validation functions were ok, if so go to the next page.
  function handleClickEnter() {
    if (validEmail == true && validName == true) {
      //navigate into ChooseHelp screen
      navigation.navigate("ChooseHelp", {
        userName: nameText,
        userEmail: emailText,
      });
    } // in case the validation fail we pop up alert
    else {
      Alert.alert("שגיאה", "אנא הזן שם ואימייל תקניים", [{ text: "אישור" }]);
    }
  }

  //check for valid mail
  function emailValidation() {
    let re = /\S+@\S+\.\S+/;
    if (re.test(emailText) == false) {
      setErrorEmail("אנא הזן אימייל תקין");
      setValidEmail(false);
    } else {
      setErrorEmail("");
      setValidEmail(true);
    }
  }

  //check for valid name
  function nameValidation() {
    if (nameText == password) {
      navigation.navigate("AdminAuth");
    } else {
      let re = /^[\u0590-\u05FF]*$/;
      if (re.test(nameText) == false) {
        setErrorName("שם לא תקין (אנא הזן שם בעברית)");
        setValidName(false);
      } else {
        setErrorName("");
        setValidName(true);
      }
    }
  }
  ///////////////////////////////////////////////////////////
  return (
    <ScrollView style={{ backgroundColor: "whitesmoke" }}>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1,
            alignItems: "stretch",
            alignContent: "center",
            flexDirection: "row",
          }}
        >
          <Button
            style={styles.helpButton}
            mode="contained"
            color="red"
            compact="true"
            onPress={() => {
              Linking.openURL(
                "https://chat.whatsapp.com/G2mKnKskYP556onqPdynTc"
              );
            }}
          >
            <Text
              style={{
                fontSize: 15,
                lineHeight: 21,
                fontWeight: "bold",
                letterSpacing: 0.25,
                color: "white",
                fontFamily: "Montserrat",
              }}
            >
              עזרה דחופה
            </Text>
            <AntDesign name="phone" size={20} color="white" />
          </Button>
          <Image
            style={styles.image}
            source={require("../assets/BatKol.jpg")}
          />
        </View>
        <View style={{ margin: 25 }}>
          <Text style={styles.headline}>GetHelp</Text>
        </View>

        <View style={{ margin: 10 }}>
          <Text
            style={{
              fontFamily: "Montserrat",
              textAlign: "right",
              writingDirection: "rtl",
              fontSize: 23,
              position: "absolute",
              right: 0,
            }}
          >
            שם:
          </Text>
          <TextInput
            style={{
              textAlign: "right",
              writingDirection: "rtl",
              width: "90%",
              height: 40,
            }}
            placeholder=""
            value={nameText}
            onChangeText={(text) => setNameText(text)}
            selectionColor="black"
            onEndEditing={nameValidation}
          />

          <Text
            style={{
              color: "red",
              textAlign: "right",
              writingDirection: "rtl",
            }}
          >
            {errorName}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "Montserrat",
              textAlign: "right",
              writingDirection: "rtl",
              fontSize: 23,
              position: "absolute",
              right: 0,
            }}
          >
            אימייל:
          </Text>
          <TextInput
            style={{
              textAlign: "right",
              writingDirection: "rtl",
              width: "82%",
              height: 40,
              marginLeft: 10,
            }}
            placeholder="address@email.com"
            value={emailText}
            onChangeText={(text) => setEmailText(text)}
            selectionColor="black"
            onEndEditing={emailValidation}
          />
          <Text
            style={{
              color: "red",
              textAlign: "right",
              writingDirection: "rtl",
            }}
          >
            {errorEmail}
          </Text>
        </View>

        <View style={styles.space} />
        <View>
          <View style={{ height: 10 }} />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 50,
              marginTop: -40,
            }}
          >
            <Button
              style={styles.button}
              mode="contained"
              color="rgb(202, 197, 197)"
              compact="true"
              onPress={handleClickEnter}
            >
              <Text style={{ fontFamily: "Montserrat", fontSize: 24 }}>
                <AntDesign name="enter" size={24} color="black" /> כניסה
              </Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

//Styling
const styles = StyleSheet.create({
  button: {
    width: "70%",
    marginBottom: 170,
    marginTop: -30,
    elevation: 10,
    borderColor: "#800000",
    borderWidth: 2,
  },
  container: {
    marginTop: 70,
    height: "100%",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "whitesmoke",
  },
  headline: {
    fontSize: 80,
    textAlign: "center",
    fontFamily: "Comic Sans MS",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
    color: "rgb(202, 197, 197)",
    textShadowColor: "#800000",
    fontWeight: "600",
    shadowOpacity: 0,
    letterSpacing: 2,
    marginBottom: 30,
    marginTop: 30,
  },
  helpButton: {
    marginTop: 20,
    width: 120,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#800000",
    elevation: 0,
    borderColor: "#aaa",
    borderWidth: 3,
    marginLeft: 5,
    position: "absolute",
    right: 0,
  },
  image: {
    borderRadius: 110,
    marginTop: -5,
    width: 100,
    height: 100,
    position: "relative",
    right: 0,
    justifyContent: "flex-end",
  },
  space: {
    width: 20,
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
