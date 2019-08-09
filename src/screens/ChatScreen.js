import React, { Component } from 'react';
import { View, Image, StyleSheet, Button, Text, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { GiftedChat } from 'react-native-gifted-chat'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { KeyboardAvoidingView } from 'react-native';

import fbfirebase from '../config/fire';
import * as firebase from 'firebase';

class ChatScreen extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: (<View style={{ flexDirection: 'row' }}>
            <Image source={{ uri: navigation.state.params.FriendProfile }} style={{ width: 40, height: 40, borderRadius: 30 }} />
            <Text style={{ marginTop: 12, paddingLeft: 10, fontSize: 15, color: '#222222' }}>{navigation.state.params.FriendName}</Text>
        </View>),
        headerForceInset: { top: 'never', bottom: 'never' }

    });



    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            MyProfileURL: '', MyUserName: '', MyUserId: '',
            FriendUid: '', FriendProfile: '', FriendName: '',
            user: '', _id: '', text: '', createdAt: ''


        };
        this.fetchmsg = this.fetchmsg.bind(this)
    }

    componentWillMount() {

        const { navigation } = this.props;
        const FriendUid = navigation.getParam('FriendUid', 'NO-ID');
        const FriendProfile = navigation.getParam('FriendProfile', 'NO-UserProfile');
        const FriendName = navigation.getParam('FriendName', 'NO-UserName');
        const MyUserId = navigation.getParam('MyUserId', 'NO-MyUserId');
        const Mydaata = navigation.getParam('MyData', 'NO-MyUserId');
        const Roomid = navigation.getParam('Roomid', 'NO-MyUserId');


        for (let key in Mydaata) {
            const MyProfileURL = Mydaata[key].ProfileURL;
            const MyUserName = Mydaata[key].userName

            this.setState({
                FriendUid, FriendProfile, FriendName, MyUserId, MyProfileURL, MyUserName, Roomid
            })
        }


        firebase.database().ref(`Rooms/${Roomid}/messages/`).orderByChild('createdAt').once("value", (data) => {
            const ChatData = data.val();
            // console.log("ChatData",ChatData)
            var messages = []
            for (let key in ChatData) {
                // console.log("ChatData[key]",ChatData[key])
                console.log("ChatData[key].createdAt", ChatData[key].createdAt)
                console.log("ChatData[key].text", ChatData[key].text)
                console.log("ChatData[key][key2].user", ChatData[key].user)
                console.log("ChatData[key][key2].user._id", ChatData[key]._id)

                const user = ChatData[key].user;
                const createdAt = ChatData[key].createdAt;
                const _id = ChatData[key]._id;
                const text = ChatData[key].text;


                messages.push({ _id, createdAt, text, user })
            }
            var new_arr = messages.reverse();
            this.setState({ messages: new_arr })

        })

    }




    onSend(messages = []) {
        const { FriendUid, FriendProfile, FriendName, MyUserId, MyProfileURL, MyUserName, Roomid } = this.state;
        console.log("FriendUid", FriendUid)
        console.log("FriendProfile", FriendProfile)
        console.log("FriendName", FriendName)
        console.log("MyUserId", MyUserId)
        console.log("MyProfileURL", MyProfileURL)
        console.log("MyUserName", MyUserName)

        console.log("Roomid", Roomid)

            console.log('messages------->',messages)

        for (let key in messages) {
           

            const ChatObj = {

                createdAt: firebase.database.ServerValue.TIMESTAMP,
                text: messages[key].text,
                user: {
                    _id: MyUserId,
                    avatar: MyProfileURL,
                    name: MyUserName


                }
            }


            const ref = firebase.database().ref(`Rooms/${Roomid}/messages/`);
            ref.push(ChatObj)
                .then((snapshot) => {
                    ref.child(snapshot.key).update({ "_id": snapshot.key }).then(()=>{
                      console.log("Msg has been stored")
                       
                    }).then(()=>{
                        this.fetchmsg(Roomid)
                    })
                   
                })

            // firebase.database().ref(`Rooms/${Roomid}/messages/`).push(ChatObj)
            //     .then(() => {
            //         console.log("Successfull delivered Msg")

            //     })
            //     .catch(() => {
            //         console.log("Msg not delivered")
            //     })
        }
       
       
    }
 async fetchmsg(Roomid){
    try {
        let message = {}
        var refvalue = await firebase.database().ref(`Rooms/${Roomid}/messages`);
        refvalue.limitToLast(1).once('child_added', function(snapshot) {
            console.log('chadataval====>', snapshot.val())
            console.log('chadata2====>', snapshot.val()._id)
            console.log('chadata3====>', snapshot.val().user.avatar)

            message = {
                _id: snapshot.val()._id,// user id from user object.
                text: snapshot.val().text,// text from object.
                createdAt: snapshot.val().createdAt,
                user: snapshot.val().user,// user object from object


            }

            this.setState(previousState => ({
                messages: GiftedChat.append(
                    previousState.messages, message
                ),
            })
            )
        }.bind(this));
    }
    catch (e) {
        console.log(e ,'eee')
    }   
 }
    render() {
        const { MyUserId , MyProfileURL , MyUserName } = this.state;

        return (

            <View style={{ flex: 1 }}>
                <GiftedChat
                    keyboardShouldPersistTaps={'handled'}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: MyUserId,
                        
                       
                        // myFriendId: FriendUid,
                        // id: MyUserId,
                        // name: Mydaata.userName,
                        // avatar : Mydaata.ProfileURL
                    }}
                />

                {Platform.OS === 'android' ? <KeyboardSpacer /> : null}
            </View>

        );
    }
}


export default ChatScreen;

