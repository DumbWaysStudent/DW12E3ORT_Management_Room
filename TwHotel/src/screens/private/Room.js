import React, {Component} from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Header, Title, Fab} from 'native-base';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog from 'react-native-dialog';

import {getData} from '../../configurations/config';
import {setHeaderAuth} from '../../configurations/api';
import {fetchAllRoom, addNewRoom, fetchEditRoom} from '../../_stores/room';

class Room extends Component {
  constructor() {
    super();
    this.state = {
      isAddRoom: false,
      name: '',
      isEditRoom: false,
      chooseRoom: '',
      idEdit: null,
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
  handleEditData = (id, name) => {
    return this.setState({
      isEditRoom: true,
      name: name,
      chooseRoom: name,
      idEdit: id,
    });
  };

  handlingEditData = async () => {
    try {
      const {name, idEdit} = this.state;
      const data = await getData();
      setHeaderAuth(data.token);
      this.props.fetchEditRoom(idEdit, name);
      this.setState({name: '', isEditRoom: false, chooseRoom: ''});
    } catch (error) {
      console.log(error);
    }
  };

  editData = () => {
    return (
      <Dialog.Container visible={this.state.isEditRoom}>
        <Dialog.Title style={{marginBottom: 5}}>Edit Room</Dialog.Title>
        <Dialog.Input
          placeholder={this.state.chooseRoom}
          label="Name*"
          style={{borderWidth: 1}}
          onChangeText={text => this.handleName(text)}></Dialog.Input>
        <Dialog.Button
          label="Save"
          onPress={() => this.handlingEditData()}></Dialog.Button>
        <Dialog.Button
          label="Cancel"
          onPress={() =>
            this.setState({isEditRoom: false, name: ''})
          }></Dialog.Button>
      </Dialog.Container>
    );
  };

  // test = (id, name) => {
  //   console.log(name);
  //   console.log(id);
  // };

  handleList = (id, name) => {
    return (
      <TouchableOpacity onPress={() => this.handleEditData(id, name)}>
        <View
          style={{
            width: 117,
            height: 150,
            margin: 10,
            backgroundColor: '#384cae',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 25, fontWeight: '700', color: 'white'}}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  handleFlatlist = room => {
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

  handleDialogGetData = () => {
    return (
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
    );
  };

  render() {
    const {room} = this.props;
    console.log(JSON.stringify(room.data, null, 2));
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
        {this.handleFlatlist(room.data)}
        <Fab
          active={true}
          position="bottomRight"
          onPress={() => this.setState({isAddRoom: true})}>
          <Icon name="plus" />
        </Fab>
        {this.handleDialogGetData()}
        {this.editData()}
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
  fetchEditRoom,
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
