import React from 'react';
import { ImageBackground , StyleSheet ,Image , View , Text , Alert, SafeAreaView} from 'react-native';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { TextInput } from 'react-native-paper';


const LoginScreen = ({ navigation }) => {

    const [nameText, setNameText] = React.useState('');
    const [emailText, setEmailText] = React.useState('');


    const [loaded] = useFonts({
        Montserrat: require('../assets/fonts/500.ttf'),
      });
      
      if (!loaded) {
        return null;
      }

    return (
       <SafeAreaView style={styles.container}>
            <View>
            <Text style={{ fontFamily: 'Montserrat' , textAlign: 'right', writingDirection: 'rtl' , fontSize: 30}}>שם:</Text>
            <TextInput
            style={{textAlign: 'right', writingDirection: 'rtl' }}
            mode='outlined'
            value={nameText}
            onChangeText={text => setNameText(text)}
            selectionColor='#0000FF'
            />
            <Text style={{ fontFamily: 'Montserrat' , textAlign: 'right', writingDirection: 'rtl' , fontSize: 30}}>אימייל:</Text>
            <TextInput
            style={{textAlign: 'right', writingDirection: 'rtl' }}
            mode='outlined'
            value={emailText}
            onChangeText={text => setEmailText(text)}
            selectionColor='#0000FF'
            />
            </View>
            <View style={styles.space} />
            <View>

            <View style={{height:10}} />
            <View style={{justifyContent:'center' , alignItems:'center'}}>
            <Button style={{width: '70%'}} mode="contained" color="yellow" compact="true" onPress= {() => navigation.navigate('ChooseHelp' , {userName: nameText , userEmail: emailText})} >
                <Text style={{ fontFamily: 'Montserrat', fontSize:30 }}> כניסה</Text>
            </Button>
            </View>
            </View>
       </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1 ,  
        justifyContent:'center',
        backgroundColor: "#FFEBCD",
    },
    space: {
        width: 20, // or whatever size you need
        height: '15%',
      },
})
export default LoginScreen;