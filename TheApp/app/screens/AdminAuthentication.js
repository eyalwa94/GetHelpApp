//Authentication the admin user to the application
// Working with Firebase Authentication tools.

//imports
import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { set } from "react-native-reanimated";
import { firestore, auth } from "../api/firebase";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import firebase from "../api/firebase";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";

//Page and functions
const AdminAuthentication = ({ route, navigation }) => {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);
  const recaptchaVerifier = React.useRef(null);
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;
  const attemptInvisibleVerification = false;

  //Phone number authentication function working with firebase
  onButtonClick = async () => {
    await firestore()
      .collection("Admins")
      .where("phoneNumber", "==", phoneNumber)
      .get()
      .then(async (snapshot) => {
        if (snapshot.size === 0) {
          alert("אין אישור למספר זה");
        } else {
          try {
            const phoneProvider = new auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
              "+972" + phoneNumber,
              recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            setModalVisible(true);
          } catch (err) {
            alert(err.message);
          }
        }
      });
  };

  //Password modal, enter password through it
  onModalButtonClick = async () => {
    try {
      const credential = auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await auth().signInWithCredential(credential);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={attemptInvisibleVerification}
      />
      <Text style={styles.headline}>אימות טלפוני</Text>
      <TextInput
        style={styles.textInput}
        placeholder="מספר טלפון:"
        fontFamily="Montserrat"
        mode="outlined"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        selectionColor="rgb(202, 197, 197)"
        keyboardType="phone-pad"
      />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Button
          style={styles.primaryButton}
          mode="contained"
          color="rgb(202, 197, 197)"
          compact="true"
          onPress={async () => {
            await onButtonClick();
          }}
        >
          <Text style={{ fontFamily: "Montserrat", fontSize: 30 }}> בדיקה</Text>
        </Button>
      </View>
      <Modal isVisible={modalVisible}>
        <View style={{ flex: 0.7 }}>
          <View style={{ justifyContent: "center" }}>
            <AntDesign
              name="closecircleo"
              size={24}
              color="white"
              onPress={() => {
                setModalVisible(false);
                setVerificationCode("");
              }}
            />
          </View>
          <Text style={styles.title}>אנא הקש את הקוד:</Text>
          <TextInput
            style={styles.textInput}
            mode="outlined"
            value={verificationCode}
            onChangeText={(text) => setVerificationCode(text)}
            selectionColor="#0000FF"
            keyboardType="phone-pad"
          />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Button
              mode="contained"
              width="50%"
              onPress={async () => {
                await onModalButtonClick();
              }}
              style={styles.button}
            >
              <Text style={{ color: "black", fontSize: 20 }}>אישור</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

//Styling for the various components.
const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    fontSize: 20,
    width: "40%",
    height: 42,
    marginBottom: 20,
    marginTop: -5,
    elevation: 10,
    borderColor: "#800000",
    borderWidth: 2,
    marginEnd: 5,
    backgroundColor: "rgb(202, 197, 197)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
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
    marginBottom: 30,
    marginTop: -300,
  },
  textInput: {
    height: 50,
    marginLeft: 15,
    width: "85%",
    alignSelf: "center",
    textAlign: "center",
    writingDirection: "rtl",
    marginBottom: 30,
  },
  title: {
    textAlign: "center",
    fontFamily: "Montserrat",
    fontWeight: "800",
    shadowOpacity: 0.2,
    letterSpacing: 1.5,
    marginBottom: 30,
    marginTop: -18,
    writingDirection: "rtl",
    fontSize: 30,
    color: "white",
  },
  primaryButton: {
    alignSelf: "center",
    fontSize: 20,
    width: "70%",
    marginBottom: 20,
    marginTop: 10,
    elevation: 10,
    borderColor: "#800000",
    borderWidth: 2,
    marginEnd: 5,
    backgroundColor: "rgb(202, 197, 197)",
  },
});
export default AdminAuthentication;
