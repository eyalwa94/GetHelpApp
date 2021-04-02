import React from 'react';
import {  View , Text } from 'react-native';

const HelpScreen = ({route, navigation }) => {
    const { help } = route.params;
    return (
        <View style={{flex:1 , justifyContent:'center' , alignItems:'center'}}>
            <Text>מה שנבחר זה {help}</Text>
        </View>
    );
}

export default HelpScreen;