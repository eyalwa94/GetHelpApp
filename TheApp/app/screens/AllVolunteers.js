//Admin pannel page that show all the volunteers
//it include the functions of Update and Delete

//import
import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Linking,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
  
} from "react-native";
import { Button ,TextInput } from "react-native-paper";
import { firestore } from "../api/firebase";

//All volunteers page and his functions
const AllVolunteers = ({ route, navigation }) => {
  let { all_volunteers } = route.params;
  const { sorted_vol } = route.params;
  const { wanted_sort } = route.params;
  const[nameSort,setNameSort]=React.useState("");
  const[lastNameSort,setLastNameSort]=React.useState("");
  const[helpTypeSort,setHelpTypeSort]=React.useState("");
  const[citySort,setCitySort]=React.useState("");
  let chosen_volunteer = [];

//Styling
  const bg_colors = [
    "#F0F8FF",
    "#FAEBD7",
    "#5F9EA0",
    "#E9967A",
    "#F0E68C",
    "#FFB6C1",
  ];
  
//Delete function of volunteer
  handleClickDelete = (firstName, lastName, key) => {
    //Pop up alert because this action delete information from the firebase
    Alert.alert(
      "אזהרה",
      "מחיקת משתמש זוהי פעולה שאיננה ניתנת לביטול הם תרצי למחוק את" +
        " " +
        firstName +
        " " +
        lastName +
        "?",
      [
        {
          text: "אישור",
          onPress: () => {
            //Delete the user by First name and last name from the firebase database
            let doc_to_del_query = firestore()
              .collection("Volunteers")
              .where("firstName", "==", firstName)
              .where("lastName", "==", lastName);
            doc_to_del_query.get().then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                doc.ref.delete();
                if(wanted_sort==false)
                  all_volunteers.splice(key, 1);
                else  
                  all_volunteers = all_volunteers.filter(vol => vol.firstName!=firstName && vol.lastName!=lastName);
                navigation.navigate("AllVol", {
                  all_volunteers: all_volunteers,
                  wanted_sort:false
                });
              });
            });
          },
        },
        { text: "ביטול" },
      ]
    );
  };

  //Update function of volunteer
  handleClickUpdate = (firstName, lastName, key) => {
    //get the volunteer that need to be updated from the firebase
    chosen_volunteer = [];
    firestore()
      .collection("Volunteers")
      .where("firstName", "==", firstName)
      .where("lastName", "==", lastName)
      .get()
      .then((snapshot) => {
        snapshot.forEach((volunteer) => {
          chosen_volunteer.push(volunteer.data());
        });
      })
      .then(() => {
        //Navigates to the UpdateVol page and send there the volunteer that need to be updated
        navigation.navigate("UpdateVol", {
          chosen_volunteer: chosen_volunteer,
        }); 
      });
  };

  //Sort function of whole volunteers
  handleClickSort = () => {
    let sorted_volunteers = all_volunteers.slice();
    let sort_was_made=false;
    if(nameSort!="") // sort by name
    {
      sort_was_made=true;
      sorted_volunteers = sorted_volunteers.filter(vol => vol.firstName==nameSort);
    }
    if(lastNameSort!="") // sort by last name
    {
      sort_was_made=true;
      sorted_volunteers = sorted_volunteers.filter(vol => vol.lastName==lastNameSort);
    }
    if(helpTypeSort!="") // sort by help type
    {
      sort_was_made=true;
      sorted_volunteers = sorted_volunteers.filter(vol => vol.helpType==helpTypeSort);
    }
    if(citySort!="") // sort by city
    {
      sort_was_made=true;
      sorted_volunteers = sorted_volunteers.filter(vol => vol.city==citySort);
    }

  
    if(sorted_volunteers.length!=0 && sort_was_made) // validation for sorting type
    {
      setNameSort("");
      setLastNameSort("");
      setCitySort("");
      setHelpTypeSort("");
      navigation.navigate("AllVol", {
      all_volunteers: all_volunteers,
      sorted_vol: sorted_volunteers,
      wanted_sort:true
    });
  }
  else
  {
    Alert.alert("שגיאה","לא נמצא משתמש העונה על הדרישות הללו",[{text:"אישור"}]);
  }
  }

  //Go back navigation
  handleClickGoBack = () => {
    navigation.navigate("AllVol", {
      all_volunteers: all_volunteers,
      wanted_sort:false
    });
  }

  if(wanted_sort==false) // represent the regular page without sorting 
  {
  if (all_volunteers.length != 0) //if there are any volunteers in the firebase
  {
    return (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ backgroundColor: "#F8F8FF" }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 30 }}>כל המתנדבים</Text>
        </View>
        <View>
          <Text style={{ textAlign: "right", writingDirection: "rtl" }}>
            מיון המשתמשים
          </Text>
          <Text style={{ textAlign: "right", writingDirection: "rtl" }}>שם:</Text>
          <TextInput
            style={{ textAlign: "right", writingDirection: "rtl" }}
            mode="outlined"
            value={nameSort}
            onChangeText={(text) => setNameSort(text)}
            selectionColor="#0000FF"
          />
          <Text style={{ textAlign: "right", writingDirection: "rtl" }}>שם משפחה:</Text>
          <TextInput
            style={{ textAlign: "right", writingDirection: "rtl" }}
            mode="outlined"
            value={lastNameSort}
            onChangeText={(text) => setLastNameSort(text)}
            selectionColor="#0000FF"
          />
          <Text style={{ textAlign: "right", writingDirection: "rtl" }}>סוג עזרה:</Text>
          <TextInput
            style={{ textAlign: "right", writingDirection: "rtl" }}
            mode="outlined"
            value={helpTypeSort}
            onChangeText={(text) => setHelpTypeSort(text)}
            selectionColor="#0000FF"
          />
          <Text style={{ textAlign: "right", writingDirection: "rtl" }}>עיר:</Text>
          <TextInput
            style={{ textAlign: "right", writingDirection: "rtl" }}
            mode="outlined"
            value={citySort}
            onChangeText={(text) => setCitySort(text)}
            selectionColor="#0000FF"
          />
          <Button
                color="red"
                compact="true"
                onPress={handleClickSort}
              >
                <Text style={{ fontSize: 20 }}> מיין</Text>
              </Button>
        </View>
        {all_volunteers.map((item, key) => {
          return (
            <View
              key={key}
              style={{
                flex: 1,
                backgroundColor:
                  bg_colors[Math.floor(Math.random() * bg_colors.length)],
                width: "100%",
              }}
            >
              <Text style={styles.text}>שם: {item.firstName}</Text>
              <Text style={styles.text}>שם משפחה: {item.lastName}</Text>
              <Text style={styles.text}>עיר: {item.city}</Text>
              <Text style={styles.text}>מספר טלפון: {item.phone}</Text>
              <Text style={styles.text}>סוג עזרה: {item.helpType}</Text>
              <Button
                color="red"
                compact="true"
                onPress={() =>
                  handleClickDelete(item.firstName, item.lastName, key)
                }
              >
                <Text style={{ fontSize: 20 }}> מחיקה</Text>
              </Button>
              <Button
                color="red"
                compact="true"
                onPress={() =>
                  handleClickUpdate(item.firstName, item.lastName, key)
                }
              >
                <Text style={{ fontSize: 20 }}> עריכה</Text>
              </Button>
            </View>
          );
        })}
      </ScrollView>
    );
  } 
  else // in case there are no volunteers
  {
    return (
      <View>
        <Text>אין כרגע מתנדבים</Text>
      </View>
    );
  }
  }
  else // Show the sported page
  {
    return( 
      <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ backgroundColor: "#F8F8FF" }}
    >
                    <Button
                color="red"
                compact="true"
                onPress={handleClickGoBack}
              >
                <Text style={{ fontSize: 20 }}> חזרה לרשימה המלאה</Text>
              </Button>
      {sorted_vol.map((item, key) => {
      return (
        <View
          key={key}
          style={{
            flex: 1,
            backgroundColor:
              bg_colors[Math.floor(Math.random() * bg_colors.length)],
            width: "100%",
          }}
        >
          <Text style={styles.text}>שם: {item.firstName}</Text>
          <Text style={styles.text}>שם משפחה: {item.lastName}</Text>
          <Text style={styles.text}>עיר: {item.city}</Text>
          <Text style={styles.text}>מספר טלפון: {item.phone}</Text>
          <Text style={styles.text}>סוג עזרה: {item.helpType}</Text>
          <Button
            color="red"
            compact="true"
            onPress={() =>
              handleClickDelete(item.firstName, item.lastName, key)
            }
          >
            <Text style={{ fontSize: 20 }}> מחיקה</Text>
          </Button>
          <Button
            color="red"
            compact="true"
            onPress={() =>
              handleClickUpdate(item.firstName, item.lastName, key)
            }
          >
            <Text style={{ fontSize: 20 }}> עריכה</Text>
          </Button>
        </View>
      );
    })}
    </ScrollView>
    );
  }

};

//styling page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFEBCD",
  },
  space: {
    width: 20, 
    height: 20,
  },
  text: {
    textAlign: "right",
    writingDirection: "rtl",
    fontSize: 20,
  },
});

export default AllVolunteers;
