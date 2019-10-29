import React, {Component} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import {Header, Title, Fab, Left, Right} from 'native-base';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-elements';
import Dialog from 'react-native-dialog';

import {getData} from '../../configurations/config';
import {setHeaderAuth} from '../../configurations/api';
import {fetchAllRoom, addNewRoom} from '../../_stores/room';

class Room extends Component {
  constructor() {
    super();
    this.state = {
      isAddRoom: false,
      name: '',
    };
  }

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
          height: 80,
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

  handleAddData = () => {
    if (this.state.name) {
      return this.addData();
    } else {
      return alert('Name cannot be empty!');
    }
  };

  addData = async () => {
    try {
      const data = await getData();
      setHeaderAuth(data.token);
      this.props.addNewRoom(this.state.name);
      this.setState({isAddRoom: false});
    } catch (error) {
      console.log(error);
    }
  };

  handleName = text => {
    this.setState({name: text});
  };

  render() {
    const {room} = this.props;
    console.log(JSON.stringify(room.data, null, 2));
    // console.log(this.state.name);
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
        <Icon
          name="plus-circle"
          style={{marginLeft: '85%', fontSize: 60, color: '#384cae'}}
          onPress={() => this.setState({isAddRoom: true})}
        />
        <Dialog.Container visible={this.state.isAddRoom}>
          <Dialog.Title style={{marginBottom: 5}}>Add Room</Dialog.Title>
          <Dialog.Input
            label="Name*"
            style={{borderWidth: 1}}
            onChangeText={text => this.handleName(text)}></Dialog.Input>
          <Dialog.Button
            label="Save"
            onPress={() => this.handleAddData()}></Dialog.Button>
          <Dialog.Button
            label="Cancel"
            onPress={() =>
              this.setState({isAddRoom: false, name: ''})
            }></Dialog.Button>
        </Dialog.Container>
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
  addNewRoom,
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
