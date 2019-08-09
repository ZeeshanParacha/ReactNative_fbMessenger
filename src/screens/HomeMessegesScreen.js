import React, { Component } from 'react';
import { View, Image, StyleSheet, Button, Text, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Constants } from "expo";


import fbfirebase from '../config/fire';
import * as firebase from 'firebase';


import * as Facebook from 'expo-facebook';
import Expo from 'expo';


class HomeMessegesScreen extends Component {


    constructor(props) {
        super(props);
        this.state = { users: [], MyUserId: '', MyData: [], room: {}, roomKey: '' };
        this.createRoom = this.createRoom.bind(this);
    }

    componentDidMount() {
        const { users, MyData } = this.state;
        fbfirebase.database().ref("Users").once("value", (data) => {
            //console.log(data.val())
            let UsersData = data.val();
            var myuserid = firebase.auth().currentUser.uid;
            console.log('myUserIdddd ===>', myuserid)

            for (var key in UsersData) {
                if (myuserid !== UsersData[key].UserUid) {
                    console.log(UsersData[key])
                    users.push(UsersData[key])
                }
                else if (myuserid === UsersData[key].UserUid) {
                    MyData.push(UsersData[key])
                }

            }
            this.setState({ users, MyUserId: myuserid })

        })
    }


    createRoom(freindid, friendURl, friendName, currentUserId, CurrentUserData) {


        const users = { [freindid]: true, [currentUserId]: true }
        // console.log(users)

        let room = {};

        fbfirebase.database().ref("Rooms").once("value", (data) => {
            //console.log(data.val())
            


            let ChatRoom = data.val();
            // console.log("Chatroom --->", ChatRoom)
            if (ChatRoom) {
                for (let key in ChatRoom) {

                    if (`ChatRoom[key].users.${freindid} && ChatRoom[key].users.${currentUserId}`) {
                        room = ChatRoom[key];
                        room.id = key


                    }
                }
            }
            else {
                room = { users, createdAt: Date.now() }
                fbfirebase.database().ref('Rooms').push(room).then((snapshot) => {
                    console.log('snapshpt--->', snapshot)
                    console.log('snapshot.getKey()--->', snapshot.key)
                    let key = snapshot.key
                    room.id = key


                }).then(() => {

                    console.log('room-------->', room)

                    this.props.navigation.navigate('ChatScreen', {
                        FriendUid: freindid,
                        FriendProfile: friendURl,
                        FriendName: friendName,
                        MyUserId: currentUserId,
                        MyData: CurrentUserData,
                        Roomid: room.id
                    })
                })
            }


        }).then(() => {

            console.log('room-------->', room)

            this.props.navigation.navigate('ChatScreen', {
                FriendUid: freindid,
                FriendProfile: friendURl,
                FriendName: friendName,
                MyUserId: currentUserId,
                MyData: CurrentUserData,
                Roomid: room.id
            })
        })





        //   console.log('----->',freindid, friendURl , friendName , currentUserId , CurrentUserData  )

    }
    render() {
        const { users, MyUserId, MyData } = this.state;
        console.log('USERSSSSSS', users)
        return (
            <View style={styles.container}>
                <View style={styles.mainview}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
                            <TouchableOpacity style={{ alignItems: 'center', margin: 10 }}>
                                <Image source={require('../../assets/plus.png')} style={{ width: 50, height: 50, borderRadius: 30 }} />

                                <Text style={{ color: 'darkgray', fontSize: 12 }}>Your Story</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: 'center', margin: 10 }}>
                                <Image source={require('../../assets/pro.jpg')} style={{ width: 50, height: 50, borderRadius: 30 }} />

                                <Text style={{ color: 'darkgray', fontSize: 12, marginTop: 2 }}>Mark Zuker</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: 'center', margin: 10 }}>
                                <Image source={require('../../assets/cr.jpg')} style={{ width: 50, height: 50, borderRadius: 30 }} />

                                <Text style={{ color: 'darkgray', fontSize: 12, marginTop: 2 }}>C.Ronaldo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: 'center', margin: 10 }}>
                                <Image source={require('../../assets/georg.jpg')} style={{ width: 50, height: 50, borderRadius: 30 }} />

                                <Text style={{ color: 'darkgray', fontSize: 12, marginTop: 2 }}>Georgina</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: 'center', margin: 10 }}>
                                <Image source={require('../../assets/imran.jpg')} style={{ width: 50, height: 50, borderRadius: 30 }} />

                                <Text style={{ color: 'darkgray', fontSize: 12, marginTop: 2 }}>Imran Khan</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: 'center', margin: 10 }}>
                                <Image source={require('../../assets/meryam.jpg')} style={{ width: 50, height: 50, borderRadius: 30 }} />

                                <Text style={{ color: 'darkgray', fontSize: 12, marginTop: 2 }}>Meryam Saeed</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: 'center', margin: 10 }}>
                                <Image source={require('../../assets/plus.png')} style={{ width: 50, height: 50, borderRadius: 30 }} />

                                <Text style={{ color: 'darkgray', fontSize: 12, marginTop: 2 }}>Your Story</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: 'center', margin: 10 }}>
                                <Image source={require('../../assets/plus.png')} style={{ width: 50, height: 50, borderRadius: 30 }} />

                                <Text style={{ color: 'darkgray', fontSize: 12, marginTop: 2 }}>Your Story</Text>
                            </TouchableOpacity>

                        </ScrollView>


                        <View>
                            {users.map((items) => {
                                return (
                                    <TouchableOpacity key={items.UserUid} style={{ margin: 10, flexDirection: 'row' }}
                                        onPress={() => this.createRoom(items.UserUid, items.ProfileURL, items.userName, MyUserId, MyData)}>
                                        <Image source={{ uri: items.ProfileURL }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                                        <Text style={{ marginTop: 15, paddingLeft: 10, fontSize: 15 }}>{items.userName}</Text>
                                    </TouchableOpacity>
                                )
                            })}


                        </View>
                    </ScrollView>




                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',

    },
    mainview: {
        marginTop: 2,

        //   borderWidth:1,

        flexDirection: 'column',
        justifyContent: 'space-between',

        flex: 1,

    },
    profile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    }
})



export default HomeMessegesScreen;

