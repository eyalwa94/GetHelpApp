import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { set } from "react-native-reanimated";
import { firestore } from "../api/firebase";
import Modal from "react-native-modal";
import { AntDesign } from '@expo/vector-icons';

const AdminAuthentication = ({ route, navigation }) => {
  const [PhoneNumber, setPhoneNumber] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [code, setCode] = React.useState("");

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: "Montserrat",
          textAlign: "right",
          writingDirection: "rtl",
          fontSize: 30,
          margin: 10,
        }}
      >
        מספר טלפון:
      </Text>
      <TextInput
        style={{ margin: 10 }}
        mode="outlined"
        value={PhoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        selectionColor="#0000FF"
        keyboardType="phone-pad"
      />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Button
          style={{ width: "70%" }}
          mode="contained"
          color="yellow"
          compact="true"
          onPress={() => {
            setModalVisible(true);
            
          }}
        >
          <Text style={{ fontFamily: "Montserrat", fontSize: 30 }}> בדיקה</Text>
        </Button>
      </View>
      <Modal isVisible={modalVisible}>
        <View style={{ flex: 0.7 }}>
            <View style={{justifyContent: "center"}}>
        <AntDesign name="closecircleo" size={24} color="white" onPress={() => {
            setModalVisible(false);
            setCode("");
          }} />
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
            value={code}
            onChangeText={(text) => setCode(text)}
            selectionColor="#0000FF"
            keyboardType="phone-pad"
          />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Button mode="contained" width="50%">
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
    backgroundColor: "#FFEBCD",
  },
});
export default AdminAuthentication;
