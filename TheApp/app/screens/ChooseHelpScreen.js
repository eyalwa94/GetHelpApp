import React from 'react';
import { ImageBackground , StyleSheet ,Image , View , Text , Alert, SafeAreaView} from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font';




const ChooseHelpScreen = ({route, navigation }) => {

    const { userName, userEmail } = route.params;
    let screenText=" שלום" + userName + " מה שלומך " ;
    

    const [loaded] = useFonts({
        Montserrat: require('../assets/fonts/500.ttf'),
      });
      
      if (!loaded) {
        return null;
      }

    return (
        <SafeAreaView style={styles.container} >
       
        <Text style={{textAlign: 'right', writingDirection: 'rtl', fontFamily: 'Montserrat', fontSize:30, flexDirection: "row-reverse" ,marginLeft: '5%' }}>שלום {userName} {"\n"} תוכל לקבל פה עזרה במגוון נושאים :</Text>
       
       <View style={{flex:1 , justifyContent:'center' , alignItems:'center'}}>
        <Button mode="contained" color="yellow" compact="true" onPress={() =>Alert.alert("my title" , "my message" , [{text:"yes"},{text:"no"}])} >
                <Text style={{ fontFamily: 'Montserrat', fontSize:30 }}> אז הגיע הלילה של כוכב השביט הראשון</Text>
        </Button>
        <View style={styles.space} />
        <Button mode="contained" color="green" compact="true" onPress= {() => navigation.navigate('Help')} >
                <Text style={{ fontFamily: 'Montserrat', fontSize: 30 }}> אז הגיע הלילה של כוכב השביט הראשון</Text>
        </Button>
        <View style={styles.space} />
        <Button mode="contained" color="purple" compact="true"  >
                <Text style={{ fontFamily: 'Montserrat', fontSize: 30 }}> אז הגיע הלילה של כוכב השביט הראשון</Text>
        </Button>
        <View style={styles.space} />
        <Button mode="contained" color="orange" compact="true" >
                <Text style={{ fontFamily: 'Montserrat', fontSize: 30 }}> אז הגיע הלילה של כוכב השביט הראשון</Text>
        </Button>
        </View>
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1 ,  

        backgroundColor: "#FFEBCD"
    },
    space: {
        width: 20, // or whatever size you need
        height: 20,
      },

})
export default ChooseHelpScreen;

/*
<Image style={styles.logo} 
       source={require('../assets/logo.jpg')}/>

           logo:{
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "black",
        position: 'absolute',
        top: 20
    },
    */