import React, { Component } from 'react';
import {StatusBar, View} from 'react-native'
import { createStackNavigator, createMaterialTopTabNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";
import { Platform } from 'react-native';
import AppStyles from '../config/styles';

import AuthWithFB from '../screens/AuthWithFB'
import HomeMessegesScreen from '../screens/HomeMessegesScreen';
import TopActiveScreen from '../screens/TopActiveScreen';
import PeopleScreen from '../screens/PeopleScreen';
import CameraScreen from '../screens/CameraScreen';
import ChatScreen from '../screens/ChatScreen';
import SearchScreen from '../screens/SearchbarScreen';


import TabIcon from '../components/Tabicon';
import SearchBar from '../components/SearchBar';







const HomeTabIcon = ({ tintColor }) => (
  <TabIcon name="home" tintColor={tintColor} />
);
const PeopleTabIcon = ({ tintColor }) => (
  <TabIcon name="people" tintColor={tintColor} />
);
const CameraTabIcon = ({ tintColor }) => (
  <TabIcon name="camera-alt" tintColor={tintColor} />
);
// const stack=createStackNavigator({
//   ChatList:{
//     screen:ChatList
// },
// ChatScreen:{
//     screen:ChatScreen
// }

// })



// const AppNavigator = createSwitchNavigator({
//     AuthWithFB: {
//       screen: AuthWithFB
//     },
//     stacks:{
//       screen:stack
//     }

//   });



const HomeTabNavigation = createMaterialTopTabNavigator(
  {
    MessagesScreen: {
      screen: HomeMessegesScreen,
      navigationOptions: { header: null, title: 'Messages' }
    },

    TopActiveScreen: {
      screen: TopActiveScreen,
      navigationOptions: { header: null, title: 'Active' }
    },
    // GroupsScreen: {
    //     screen: GroupsScreen,
    //     navigationOptions: { header: null, title: 'Groups' }
    // },
    // CallsScreen: {
    //     screen: CallsScreen,
    //     navigationOptions: { header: null, title: 'Calls' }
    // }
  },
  {
    tabBarPosition: 'top',
    tabBarOptions: {
      activeTintColor: AppStyles.colors.accentColor,
      inactiveTintColor: AppStyles.colors.inactiveGreyColor,
      pressColor: AppStyles.colors.lightGreyCOlor,
      labelStyle: {
        fontWeight: 'bold',
        fontSize: Platform.OS === 'ios' ? 11 : 12,
        // fontFamily: AppStyles.fonts.FONT_MEDIUM
      },
      indicatorStyle: {
        backgroundColor: AppStyles.colors.accentColor
      },
      style: {
        backgroundColor : '#fff'
      }
      
    }
  }
);




const BottomTabNavigation = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: HomeTabNavigation,
      navigationOptions: {
        header: null,
        tabBarIcon: HomeTabIcon
        // tabBarIcon: ({ tintColor }) => (
        //   <Icon name="md-home" color={tintColor} size={25} />
        // )

      }
    },


    PeopleScreen: {
      screen: PeopleScreen,
      navigationOptions: {
        header: null,
        tabBarIcon: PeopleTabIcon
      //   tabBarIcon: ({tintColor}) => (
         
      //     <Icon name="ios-person" color={tintColor} size={25} />
          
      // )

      }
    },

    //     CameraTabScreen: {
    //         screen: CameraScreen,
    //         navigationOptions: ({ navigation }) => ({
    //             header: null,
    //             tabBarIcon: CameraTabIcon,
    //             tabBarOnPress: ({ navigation }) => {
    //                 navigation.navigate('CameraScreen');
    //             }
    //         })
    //     },
    //     GamesScreen: {
    //         screen: GamesScreen,
    //         navigationOptions: {
    //             header: null,
    //             tabBarIcon: GamesTabIcon
    //         }
    //     },
    //     PopularScreen: {
    //         screen: PopularScreen,
    //         navigationOptions: {
    //             header: null,
    //             tabBarIcon: PopularTabIcon
    //         }
    //     }
    // },
  
  CameraTabScreen : {
          screen : CameraScreen,
          navigationOptions : ({navigation }) => ({
            header : null ,
            tabBarIcon : CameraTabIcon,
            tabBarOnPress  : ({ navigation}) => {
                navigation.navigate('CameraScreen');
            }
          })
          }
  },

  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#0084ff',
      inactiveTintColor: AppStyles.colors.inactiveGreyColor,
      pressColor: '#7f8c8d'
    }
  }
);



const SearchStack = createStackNavigator(
  {
      BottomTabNavigation: {
          screen: BottomTabNavigation,
          navigationOptions: {
              gesturesEnabled: false
          }
      },
      SearchScreen: {
          screen: SearchScreen,
          navigationOptions: { gesturesEnabled: false }
      }
  },
  {
      mode: 'modal',
      headerMode: 'none'
  }
);

const ModalStack = createStackNavigator(
  {
      SearchStack: {
          screen: SearchStack,
          navigationOptions: ({ navigation }) => ({
              gesturesEnabled: false,
              header: <SearchBar navigation={navigation} />
          })
      },
      CameraScreen: {
          screen: CameraScreen,
          navigationOptions: { gesturesEnabled: false, header: null }
      }
  },
  {
      mode: 'modal'
  }
);

const MessengerApp = createStackNavigator({
  SplashScreen: {
      screen: AuthWithFB,
      navigationOptions: { gesturesEnabled: false, header: null }
  },
  MainScreen: {
      screen: ModalStack,
      navigationOptions: {
          gesturesEnabled: false,
          header: null
      }
  },
  ChatScreen: {
      screen: ChatScreen,
      navigationOptions: { gesturesEnabled: false, }
  }
});


export default createAppContainer(MessengerApp);