import React, { Component } from 'react';

import { View, Image, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';


import fbfirebase from '../config/fire';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import Expo from 'expo';



import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

class AuthWithFB extends Component {

    constructor(props) {
        super(props);
        this.state = { userName: '', UserUid: '', ProfileURL: '' };
    }



    componentDidMount() {
        fbfirebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                console.log('User ==>', user);
                console.log('User display ==>', user.displayName);
                console.log('User UID ==>', user.uid);
                console.log('User Photo ==>', user.photoURL);
                console.log('User providerData ==>', user.providerData.uid);

                const userName = user.displayName;
                const UserUid = user.uid ;
                const ProfileURL = user.photoURL;

                fbfirebase.database().ref('Users/' + UserUid).set({
                    userName,
                    UserUid,
                    ProfileURL
                   
                  })
                    .then(() => {
                        console.log("Your profile has been created");
                    })
                    .catch(function (error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorMessage);
                        // ...
                    });

                this.setState({ userName: user.displayName, UserUid: user.uid, ProfileURL: user.photoURL })
              

            }

           

            
          
            // Do other things
        });
    }

    async loginWithFacebook() {
        const { userName , UserUid , ProfileURL} = this.state;

        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            '510422783039703',
            { permissions: ['public_profile'] }
        );

        if (type === 'success') {
            // Build Firebase credential with the Facebook access token.
            const credential = firebase.auth.FacebookAuthProvider.credential(token);

            // Sign in with credential from the Facebook user.
            firebase.auth().signInWithCredential(credential).then(() => {
                this.props.navigation.navigate('MainScreen')

            }).catch((error) => {
                // Handle Errors here.
            });
            console.log(userName , UserUid , ProfileURL)
            console.log('************************************')
        }

        // this.props.navigation.navigate('MainScreen')
    }


    render() {
        return (
            <View style={styles.container}>

                <Image source={require('../../assets/mess.png')} style={{ width: 150, height: 150 }} />
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>

                <Button
                    title="SignIn With Facebook"
                    onPress={() => this.loginWithFacebook()}

                //   

                />


                {/* <TouchableOpacity>
            <Text style={styles.text}>
            Note:If You Already Have An Account..
            </Text>
            <Text onPress={()=>this.props.navigation.navigate('ChatList')} style={styles.button}>
                Click Here..
            </Text>
        </TouchableOpacity> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    text: {

        color: 'red',
        fontSize: 15,
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginTop: 60,
        textAlign: 'center'
    },
    button: {
        color: 'white',
        backgroundColor: 'green',
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginTop: 30,
        textAlign: 'center',
        borderRadius: 5,
        padding: 10
    }

});

export default AuthWithFB;

