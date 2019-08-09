import React, { Component } from 'react';
import { View,Image,StyleSheet,Button,Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Constants } from "expo";

class SearchScreen extends Component {
   
    
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View>
                <Text>SearchBar Screen</Text>
            </View>
        );
    }
}


export default SearchScreen;
