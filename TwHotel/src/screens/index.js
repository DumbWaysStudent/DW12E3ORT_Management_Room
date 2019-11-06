import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import StartScreen from './StartScreen';
import Login from './public/Login';
import CheckinScreen from './private/Checkin';
import RoomScreen from './private/Room';
import CustomerScreen from './private/Customer';
import SettingScreen from './private/Setting';
import Register from './public/Register';

const PrivateTab = createMaterialBottomTabNavigator(
  {
    Checkin: {
      screen: CheckinScreen,
      navigationOptions: {
        // header: null,
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon
              style={[{color: tintColor}]}
              size={21}
              name={'check-circle'}
            />
          </View>
        ),
      },
    },
    Room: {
      screen: RoomScreen,
      navigationOptions: {
        // header: ,
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={21} name={'bed'} />
          </View>
        ),
      },
    },
    Customer: {
      screen: CustomerScreen,
      navigationOptions: {
        // header: 'Customer',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={21} name={'id-card'} />
          </View>
        ),
      },
    },
    Setting: {
      screen: SettingScreen,
      navigationOptions: {
        // header: 'Setting',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={21} name={'cogs'} />
          </View>
        ),
      },
    },
  },
  {
    shifting: false,
    activeColor: 'rgb(240, 98, 193)',
    inactiveColor: 'silver',
    barStyle: {
      backgroundColor: '#f5f5f5',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderStyle: 'solid',
      borderColor: '#d0cfd0',
    },
  },
);
const LoginScreenTab = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
});

LoginScreenTab.navigationOptions = () => {
  return {
    header: null,
  };
};

const RegisterScreenTab = createStackNavigator({
  Register: {
    screen: Register,
    navigationOptions: {
      header: null,
    },
  },
});

RegisterScreenTab.navigationOptions = () => {
  return {
    header: null,
  };
};

const PublicScreen = createStackNavigator({
  Login: LoginScreenTab,
  Register: RegisterScreenTab,
});

const AppContainer = createSwitchNavigator(
  {
    Start: StartScreen,
    Public: PublicScreen,
    Private: PrivateTab,
  },
  {
    initialRouteName: 'Start',
  },
);

export default createAppContainer(AppContainer);
