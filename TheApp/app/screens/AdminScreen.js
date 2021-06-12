//Representing the Admin screen
//Include all the functions that admin can do

//Import
import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { firestore, auth } from "../api/firebase";
import {
  AntDesign,
  Feather,
  FontAwesome,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";


//Admin page and his functions
const AdminScreen = ({ route, navigation }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [city, setCity] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [helpType, setHelpType] = React.useState("");
  const [calendlyLink, setCalendlyLink] = React.useState("");
  let all_volunteers = [];
  let all_users = [];

  //Show all volunteers function
  handleClickShowAll = () => {
    all_volunteers = [];
    firestore()
      .collection("Volunteers")
      .get()
      .then((snapshot) => {
        snapshot.forEach((volunteer) => {
          all_volunteers.push(volunteer.data());
        });
      })
      .then(() => {
        navigation.navigate("AllVol", {
          all_volunteers: all_volunteers,
          wanted_sort: false,
        }); // navigate to the AllVolunteers page, and send all_volunteers array
      });
  };

  //Add new volunteer function
  handleClickAddUser = () => {
    navigation.navigate("AddVol");
  };

  //Show statisics
  handleClickShowStatistic = () => {
    all_users = [];
    firestore()
      .collection("Users")
      .get()
      .then((snapshot) => {
        snapshot.forEach((user) => {
          all_users.push(user.data());
        });
      })
      .then(() => {
        all_users.forEach((user, index) => {
          let userDate = new Date(user.dateMade);
          let currDate = new Date(getCurrentDate());
          if (userDate < currDate) {
            let doc_to_del_query = firestore()
              .collection("Users")
              .where("name", "==", user.name)
              .where("email", "==", user.email);
            doc_to_del_query.get().then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                doc.ref.delete();
              });
            });
          }
        });
      })
      .then(() => {
        for(let i=0 ; i<all_users.length ;)
        {
          let userDate = new Date(all_users[i].dateMade);
          let currDate = new Date(getCurrentDate());
          if (userDate < currDate)
          {
            if(all_users.length==1)
              all_users=[];
            else  
              all_users.splice(i,1);
          }
          else
            i++;
        }
        navigation.navigate("AllUsers", {
          all_users: all_users,
        }); // navigate to the AllUsers page, and send all_users array
      });
  };

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + "/" + month + "/" + year; //format: dd-mm-yyyy;
  };

  return (
    <View style={{justifyContent: "center",
    alignItems: "center",height: "30%", marginTop: 100,}}>
      <Image style={styles.image} source={require("../assets/BatKol.jpg")} />

      <Button
        style={styles.Button}
        mode="contained"
        color="rgb(202, 197, 197)"
        compact="true"
        onPress={handleClickAddUser}
      >
        <Text style={{ fontFamily: "Montserrat", fontSize: 20 }}>
          {" "}
          הוספת מתנדב {"\t"}
        </Text>
        <AntDesign name="adduser" size={20} color="black" />
      </Button>
      <View style={styles.space} />
      <Button
        style={styles.Button}
        mode="contained"
        color="rgb(202, 197, 197)"
        compact="true"
        onPress={handleClickShowAll}
      >
        <Text style={{ fontFamily: "Montserrat", fontSize: 19 }}>  
          {" "}
          רשימת המתנדבים עריכה/מחיקה {"\t"}
        </Text>
        <Feather name="list" size={20} color="black" />
      </Button>
      <View style={styles.space} />
      <Button
        style={styles.Button}
        mode="contained"
        color="rgb(202, 197, 197)"
        compact="true"
        onPress={handleClickShowStatistic}
      >
        <Text style={{ fontFamily: "Montserrat", fontSize: 20 }}>
          {" "}
          סטטיסטיקות {"\t"}
        </Text>
        <Entypo name="bar-graph" size={20} color="black" />
      </Button>
      <View style={styles.space} />

      <Button
        style={styles.Button}
        mode="contained"
        color="rgb(202, 197, 197)"
        compact="true"
        onPress={() => {
          auth().signOut();
          navigation.navigate("Login");
        }}
      >
        <Text style={{ fontFamily: "Montserrat", fontSize: 20 }}>
          {" "}
          התנתק {"\t"}
        </Text>
        <MaterialIcons name="logout" size={20} color="black" />
      </Button>
    </View>
  );
/*
  //navigation buttons
  return (
    <View
      style={{
        marginTop: 100,
        flex: "col",
        justifyContent: "center",
        alignItems: "center",
        height: "30%",
      }}
    >
      <Image style={styles.image} source={require("../assets/BatKol.jpg")} />

      <Button
        style={styles.Button}
        mode="contained"
        color="rgb(202, 197, 197)"
        compact="true"
        onPress={handleClickAddUser}
      >
        <Text style={{ fontFamily: "Montserrat", fontSize: 20 }}>
          {" "}
          הוספת מתנדב {"\t"}
        </Text>
        <AntDesign name="adduser" size={20} color="black" />
      </Button>
      <View style={styles.space} />
      <Button
        style={styles.Button}
        mode="contained"
        color="rgb(202, 197, 197)"
        compact="true"
        onPress={handleClickShowAll}
      >
        <Text style={{ fontFamily: "Montserrat", fontSize: 20 }}>
          {" "}
          רשימת המתנדבים עריכה/מחיקה {"\t"}
        </Text>
        <Feather name="list" size={20} color="black" />
      </Button>
      <View style={styles.space} />
      <Button
        style={styles.Button}
        mode="contained"
        color="rgb(202, 197, 197)"
        compact="true"
        onPress={handleClickShowStatistic}
      >
        <Text style={{ fontFamily: "Montserrat", fontSize: 20 }}>
          {" "}
          סטטיסטיקות {"\t"}
        </Text>
        <Entypo name="bar-graph" size={20} color="black" />
      </Button>
      <View style={styles.space} />

      <Button
        style={styles.Button}
        mode="contained"
        color="rgb(202, 197, 197)"
        compact="true"
        onPress={() => {
          auth().signOut();
          navigation.navigate("Login");
        }}
      >
        <Text style={{ fontFamily: "Montserrat", fontSize: 20 }}>
          {" "}
          התנתק {"\t"}
        </Text>
        <MaterialIcons name="logout" size={20} color="black" />
      </Button>
    </View>
  );*/
};

//Styling the page
const styles = StyleSheet.create({
  image: {
    marginTop: 50,
    marginBottom: 120,
    marginRight: 10,
    borderRadius: 110,
    width: 80,
    height: 80,
    alignSelf: "flex-end",
    right: 0,
  },
  text: {
    fontFamily: "Montserrat",
    textAlign: "right",
    writingDirection: "rtl",
    fontSize: 20,
  },
  space: {
    width: 10,
    height: "10%",
  },
  Button: {
    width: "90%",
    elevation: 10,
    borderColor: "#800000",
    borderWidth: 2,
  },
});

export default AdminScreen;
