import React from 'react';
import { ImageBackground , StyleSheet ,Image , View , Text , Alert} from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font';
import {} from 'react-navigation'


function LoginScreen(props) {

    const [loaded] = useFonts({
        Montserrat: require('../assets/fonts/500.ttf'),
      });
      
      if (!loaded) {
        return null;
      }

    return (
        <ImageBackground
        style={styles.background} 
        source={require('../assets/bg1.jpg')}>
       <Image style={styles.logo} 
       source={require('../assets/logo.jpg')}/>

       
          <Button mode="contained" color="yellow" compact="true" onPress={() =>Alert.alert("my title" , "my message" , [{text:"yes"},{text:"no"}])} >
                <Text style={{ fontFamily: 'Montserrat', fontSize:30 }}> אז הגיע הלילה של כוכב השביט הראשון</Text>
        </Button>
        <View style={styles.space} />
        <Button mode="contained" color="green" compact="true" >
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
        </ImageBackground>
        
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1 ,  
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'column',

    },
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
    space: {
        width: 20, // or whatever size you need
        height: 20,
      },

})
export default LoginScreen;