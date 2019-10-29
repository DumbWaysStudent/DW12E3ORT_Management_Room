import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Header} from 'native-base';
export default class Customer extends Component {
  render() {
    return (
      <View>
        <Header>
          <Text>Room</Text>
        </Header>
        <Text> Customer </Text>
      </View>
    );
  }
}
