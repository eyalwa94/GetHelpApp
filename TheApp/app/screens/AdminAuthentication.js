import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { set } from "react-native-reanimated";
import { firestore,auth } from "../api/firebase";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import firebase from "../api/firebase";
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';

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
  

  onButtonClick = async () =>
  {
    await firestore()
    .collection("Admins")
    .where("phoneNumber", "==", phoneNumber).get()
    .then(async (snapshot) => {
     if(snapshot.size===0)
     {
      alert("אין אישור למספר זה");
     }
     else
     {
      try {
        const phoneProvider = new auth.PhoneAuthProvider();
        const verificationId = await phoneProvider.verifyPhoneNumber(
          "+972"+phoneNumber,
          recaptchaVerifier.current
        );
        setVerificationId(verificationId);
        setModalVisible(true)
      } catch (err) {
        alert(err.message)
      }
     }
      })
    }
 

  onModalButtonClick = async () =>
  {
    try {
      const credential = auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await auth().signInWithCredential(credential);
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={attemptInvisibleVerification}
      />
      <Text style={{fontSize: 50, textAlign:"center",marginTop: -300,
        marginBottom:100,fontFamily:"Comic Sans MS", textShadowColor: 'white',
        textShadowOffset: {width: -1, height: 0},
        textShadowRadius: 15,color: "rgb(202, 197, 197)", 
        textShadowColor: 'white', fontWeight: '600',shadowOpacity: 0.8,
        letterSpacing: 10,}}
        >
          אימות טלפוני
        </Text>
      <TextInput style={{width:"85%",alignSelf:"center", textAlign: "center", writingDirection: "rtl", marginBottom:30 }}
        placeholder="מספר טלפון:"
        fontFamily= "Montserrat"
        mode="outlined"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        selectionColor="rgb(202, 197, 197)"
        keyboardType="phone-pad"
      />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Button
          style={{ width: "70%" }}
          mode="contained"
          color="rgb(202, 197, 197)"
          compact="true"
          onPress={async () => {await onButtonClick()}}
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
          <Text
            style={{
              fontFamily: "Montserrat",
              textAlign: "right",
              writingDirection: "rtl",
              fontSize: 30,
              color: "white",
            }}
          >
            אנא הקש את הקוד:
          </Text>
          <TextInput
            style={{ margin: 10 }}
            mode="outlined"
            value={verificationCode}
            onChangeText={(text) => setVerificationCode(text)}
            selectionColor="#0000FF"
            keyboardType="phone-pad"
          />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Button mode="contained" width="50%"
            onPress={async () => {await onModalButtonClick()}}
            >
              <Text>אישור</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "whitesmoke",
  },
});
export default AdminAuthentication;
