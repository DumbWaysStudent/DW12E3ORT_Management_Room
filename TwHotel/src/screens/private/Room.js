import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import {Header, Title} from 'native-base';

const myData = [
  {
    id: 1,
    title: 'A',
  },
  {
    id: 2,
    title: 'B',
  },
  {
    id: 3,
    title: 'C',
  },
  {
    id: 4,
    title: 'D',
  },
  {
    id: 5,
    title: 'E',
  },
];

export default class ForYou extends Component {
  handleList = () => {};

  render() {
    return (
      <View>
        <Header
          androidStatusBarColor="rgb(169,169,169)"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgb(169,169,169)',
            height: 50,
          }}>
          <Title>ROOM</Title>
        </Header>
        <FlatList
          data={myData}
          renderItem={({item}) => this.handleList(item.id, item.title)}
          keyExtractor={item => item.id.toString()}
        />
        <Text> Room </Text>
      </View>
    );
  }
}
