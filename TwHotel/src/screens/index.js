import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Login from './public/Login';
import CheckinScreen from './private/Checkin';
import RoomScreen from './private/Room';
import CustomerScreen from './private/Customer';
import SettingScreen from './private/Setting';

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
    activeColor: 'white',
    inactiveColor: 'rgb(130,130,130)',
    barStyle: {
      backgroundColor: '#384cae',
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

const AppContainer = createSwitchNavigator({
  Public: LoginScreenTab,
  Private: PrivateTab,
});

export default createAppContainer(AppContainer);
