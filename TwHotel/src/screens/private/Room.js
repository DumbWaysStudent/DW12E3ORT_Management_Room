import React, {Component} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import {Header, Title, Fab} from 'native-base';
import {connect} from 'react-redux';
import {Icon} from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-elements';

import {getData} from '../../configurations/config';
import {setHeaderAuth} from '../../configurations/api';
import fetchAllRoom from '../../_stores/room';

class Room extends Component {
  componentDidMount() {
    this.handleGetData();
  }

  handleGetData = async () => {
    try {
      const data = await getData();
      setHeaderAuth(data.token);
      this.props.fetchAllRoom();
    } catch (error) {
      console.log(error);
    }
  };

  handleList = (id, name) => {
    return (
      <View
        style={{
          width: 117.5,
          height: 117.5,
          borderWidth: 5,
          borderColor: 'black',
          margin: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 20, fontWeight: '700'}}>{name}</Text>
      </View>
    );
  };

  hanldeFlatlist = room => {
    return (
      <FlatList
        numColumns={3}
        data={room}
        renderItem={({item}) => this.handleList(item.id, item.name)}
        keyExtractor={item => item.id.toString()}
      />
    );
  };

  render() {
    const {room} = this.props;
    // console.log(JSON.stringify(room.data, null, 2));
    return (
      <View style={styles.container}>
        <Header
          androidStatusBarColor="#384cae"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#384cae',
            height: 50,
          }}>
          <Title>ROOM</Title>
        </Header>
        {this.hanldeFlatlist(room.data)}
        <Button title="ADD" buttonStyle={{marginBottom: 2}} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    room: state.rooms,
  };
};

const mapDispatchToProps = {
  fetchAllRoom,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Room);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
