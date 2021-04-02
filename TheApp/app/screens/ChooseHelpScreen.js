import React from 'react';
import { ImageBackground , StyleSheet ,Image , View , Text , Alert, SafeAreaView} from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font';




const ChooseHelpScreen = ({route, navigation }) => {

    const [helpChosen, setHelpChosen] = React.useState('');

    const { userName, userEmail } = route.params;
    let screenText=" שלום" + userName + " מה שלומך " ;
    
    function handleClick(route) {
        navigation.navigate('Help' , {help: route});
    }

    const [loaded] = useFonts({
        Montserrat: require('../assets/fonts/500.ttf'),
      });
      
      if (!loaded) {
        return null;
      }

    return (
        <SafeAreaView style={styles.container} >
       
        <Text style={{textAlign: 'right', writingDirection: 'rtl', fontFamily: 'Montserrat', fontSize:30, flexDirection: "row-reverse" ,marginLeft: '5%' , marginTop:'5%' }}>שלום {userName} {"\n"} תוכל לקבל פה עזרה במגוון נושאים :</Text>
       
       <View style={{flex:1 , justifyContent:'center' , alignItems:'center'}}>
        <Button style={{width: '70%'}} mode="contained" color="yellow" compact="true" onPress={() => handleClick("שיחה עם רב")} >
                <Text style={{ fontFamily: 'Montserrat', fontSize:30 }}> שיחה עם רב</Text>
        </Button>
        <View style={styles.space} />
        <Button style={{width: '70%'}} mode="contained" color="green" compact="true" onPress={() => handleClick("מקום ללון")} >
                <Text style={{ fontFamily: 'Montserrat', fontSize: 30 }}> מקום ללון</Text>
        </Button>
        <View style={styles.space} />
        <Button style={{width: '70%'}} mode="contained" color="purple" compact="true" onPress={() => handleClick("אוכל")}  >
                <Text style={{ fontFamily: 'Montserrat', fontSize: 30 }}> אוכל</Text>
        </Button>
        <View style={styles.space} />
        <Button style={{width: '70%'}} mode="contained" color="orange" compact="true" onPress={() => handleClick("עוד משו")} >
                <Text style={{ fontFamily: 'Montserrat', fontSize: 30 }}> עוד משו</Text>
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