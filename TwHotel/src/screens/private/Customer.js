import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {Header, Fab, Title} from 'native-base';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog from 'react-native-dialog';
//import axios from 'axios';

import {getData} from '../../configurations/config';
import {setHeaderAuth} from '../../configurations/api';
import {
  getAllCustomer,
  addNewCustomer,
  EditCustomer,
} from '../../_stores/customer';
import {URL} from '../../configurations/api';

class Customer extends Component {
  constructor() {
    super();
    this.state = {
      isAddCustomer: false,
      name: '',
      identityNumber: '',
      phoneNumber: '',
      refreshing: false,
      images: '',
      isEditCustomer: false,
      placeholder_name: '',
      placeholder_IN: '',
      placeholder_PN: '',
      placeholder_Img: '',
      idEdit: null,
    };
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.handleList().then(() => {
      this.setState({refreshing: false});
    });
  }

  componentDidMount() {
    this.handleList();
  }

  handleList = async () => {
    try {
      const data = await getData();
      setHeaderAuth(data.token);
      this.props.getAllCustomer();
    } catch (error) {
      console.log(error);
    }
  };

  handleData = datas => {
    return (
      <View>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          data={datas}
          renderItem={({item}) =>
            this.showData(
              item.id,
              item.name,
              item.identity_number,
              item.phone,
              item.image,
            )
          }
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  };

  editData = async () => {
    const {idEdit, name, identityNumber, phoneNumber, images} = this.state;
    try {
      const data = await getData();
      setHeaderAuth(data.token);
      this.props.EditCustomer(
        idEdit,
        name,
        identityNumber,
        phoneNumber,
        images,
      );
      this.setState({isEditCustomer: false});
    } catch (error) {
      console.log(error);
    }
  };

  dialogEdit = () => {
    const {
      placeholder_name,
      placeholder_IN,
      placeholder_PN,
      placeholder_Img,
    } = this.state;
    return (
      <Dialog.Container visible={this.state.isEditCustomer}>
        <Dialog.Title style={{marginBottom: 5}}>Edit Customer</Dialog.Title>
        <Dialog.Input
          placeholder={placeholder_name}
          label="Name*"
          style={{borderWidth: 1}}
          onChangeText={text => this.handleName(text)}></Dialog.Input>
        <Dialog.Input
          placeholder={placeholder_IN}
          label="Identity Number*"
          style={{borderWidth: 1}}
          onChangeText={text => this.handleId(text)}></Dialog.Input>
        <Dialog.Input
          placeholder={placeholder_PN.toString()}
          label="Phone Number*"
          style={{borderWidth: 1}}
          onChangeText={text => this.handlePhone(text)}></Dialog.Input>
        <Dialog.Input
          placeholder={placeholder_Img}
          label="Image"
          style={{borderWidth: 1}}
          onChangeText={text => this.handleImage(text)}></Dialog.Input>
        <Dialog.Button
          label="Save"
          onPress={() => this.editData()}></Dialog.Button>
        <Dialog.Button
          label="Cancel"
          onPress={() =>
            this.setState({
              isEditCustomer: false,
              name: '',
              identityNumber: '',
              phoneNumber: '',
              images: '',
            })
          }></Dialog.Button>
      </Dialog.Container>
    );
  };

  handleEditCustomer = (id, name, IN, PN, Img) => {
    this.setState({
      isEditCustomer: true,
      placeholder_name: name,
      placeholder_IN: IN,
      placeholder_PN: PN,
      placeholder_Img: Img,
      idEdit: id,
      name,
      identityNumber: IN,
      phoneNumber: PN,
      images: Img,
    });
    // console.log(edit);
  };

  showData = (id, name, identity_number, phone, image) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.handleEditCustomer(id, name, identity_number, phone, image)
        }>
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 20,
            borderWidth: 1,
            borderColor: '#384cae',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image style={{height: 80, width: 100}} source={{uri: image}} />
            <View style={{justifyContent: 'center', marginLeft: 30}}>
              <Text style={styles.text}>{name}</Text>
              <Text style={styles.text}>{identity_number}</Text>
              <Text style={styles.text}>{phone}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  handleName = text => {
    const data = text;
    this.setState({name: data});
    // console.log(this.state.name);
  };
  handleId = text => {
    this.setState({identityNumber: text});
    // console.log(this.state.identityNumber);
  };

  handlePhone = text => {
    this.setState({phoneNumber: text});
  };

  handleImage = text => {
    this.setState({images: text});
  };

  // addData = async () => {
  //   await URL.post(`customer`, {
  //     name: this.state.name,
  //     identity_number: this.state.identityNumber,
  //     phone_number: this.state.phoneNumber,
  //     image: '',
  //   })
  //     .then(res => {
  //       console.log(res.data);
  //       this.setState({isAddCustomer: false});
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  addData = async () => {
    const {name, identityNumber, phoneNumber} = this.state;
    try {
      const data = await getData();
      setHeaderAuth(data.token);
      this.props.addNewCustomer(name, identityNumber, phoneNumber);
      this.setState({isAddCustomer: false});
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {customers} = this.props;
    // console.log(JSON.stringify(customers.data, null, 2));
    // console.log(this.state.name);
    return (
      <View style={{flex: 1}}>
        <Header
          androidStatusBarColor="#384cae"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#384cae',
            height: 50,
          }}>
          <Title>CUSTOMERS</Title>
        </Header>
        <View style={{flex: 1, marginBottom: 20}}>
          {this.handleData(customers.data)}
        </View>
        <Fab
          active={true}
          position="bottomRight"
          onPress={() => this.setState({isAddCustomer: true})}>
          <Icon name="plus" />
        </Fab>
        <Dialog.Container visible={this.state.isAddCustomer}>
          <Dialog.Title style={{marginBottom: 5}}>Edit Customer</Dialog.Title>
          <Dialog.Input
            label="Name*"
            style={{borderWidth: 1}}
            onChangeText={text => this.handleName(text)}></Dialog.Input>
          <Dialog.Input
            label="Identity Number*"
            style={{borderWidth: 1}}
            onChangeText={text => this.handleId(text)}></Dialog.Input>
          <Dialog.Input
            label="Phone Number*"
            style={{borderWidth: 1}}
            onChangeText={text => this.handlePhone(text)}></Dialog.Input>
          <Dialog.Button
            label="Save"
            onPress={() => this.addData()}></Dialog.Button>
          <Dialog.Button
            label="Cancel"
            onPress={() =>
              this.setState({isAddCustomer: false})
            }></Dialog.Button>
        </Dialog.Container>
        {this.dialogEdit()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    customers: state.customers,
  };
};

const mapDispatchToProps = {
  getAllCustomer,
  addNewCustomer,
  EditCustomer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Customer);

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});
