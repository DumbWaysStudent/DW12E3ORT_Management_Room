import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Header, Title, Fab} from 'native-base';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';

import {getData} from '../../configurations/config';
import {setHeaderAuth} from '../../configurations/api';
import {fetchAllRoom, addNewRoom, fetchEditRoom} from '../../_stores/room';
import Modal from 'react-native-modal';

class Room extends Component {
  constructor() {
    super();
    this.state = {
      isShowModal: false,
      name: '',
      idEdit: null,
      condition: '',
      placeholderName: '',
      isEditData: false,
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
      isShowModal: true,
      condition: 'Edit Room',
      placeholderName: name,
      name: name,
      idEdit: id,
      isEditData: true,
    });
  };

  handlingEditData = async () => {
    try {
      const {name, idEdit} = this.state;
      const data = await getData();
      setHeaderAuth(data.token);
      this.props.fetchEditRoom(idEdit, name);
      this.setState({name: '', isShowModal: false, placeholderName: ''});
    } catch (error) {
      console.log(error);
    }
  };

  modalScreen = () => {
    const {condition, isShowModal, placeholderName, isEditData} = this.state;
    return (
      <Modal
        isVisible={isShowModal}
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.viewModal}>
          <Text style={{fontSize: 20, marginBottom: 10}}>{condition}</Text>
          <Text style={{fontSize: 18}}>Name Room</Text>
          <TextInput
            style={{
              borderWidth: 1,
              height: 40,
              marginBottom: 30,
              fontSize: 18,
            }}
            placeholder={placeholderName}
            onChangeText={text => this.setState({name: text})}></TextInput>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              title="Save"
              type="solid"
              buttonStyle={[
                styles.button,
                {marginRight: 5, backgroundColor: '#384cae'},
              ]}
              onPress={() => this.validationAction()}
            />
            <Button
              title="Cancel"
              type="solid"
              buttonStyle={[
                styles.button,
                {marginLeft: 5, backgroundColor: 'red'},
              ]}
              onPress={() =>
                this.setState({
                  isShowModal: false,
                  placeholderName: '',
                  name: '',
                })
              }
            />
          </View>
        </View>
      </Modal>
    );
  };

  validationAction = () => {
    this.state.isEditData ? this.handlingEditData() : this.handleAddData();
  };

  handleList = (id, name) => {
    return (
      <TouchableOpacity onPress={() => this.handleEditData(id, name)}>
        <View style={styles.flexBox}>
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
      this.setState({isShowModal: false, name: '', placeholderName: ''});
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {room} = this.props;
    return (
      <View style={styles.container}>
        <Header androidStatusBarColor="#384cae" style={styles.header}>
          <Title>ROOMS</Title>
        </Header>
        {this.handleFlatlist(room.data)}
        <Fab
          active={true}
          position="bottomRight"
          onPress={() =>
            this.setState({
              isShowModal: true,
              condition: 'Add Room',
              isEditData: false,
            })
          }>
          <Icon name="plus" />
        </Fab>
        {this.modalScreen()}
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
  flexBox: {
    width: 117,
    height: 150,
    margin: 10,
    backgroundColor: '#384cae',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  button: {
    height: 35,
    width: 125,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#384cae',
    height: 50,
  },
  viewModal: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    width: 300,
  },
});
