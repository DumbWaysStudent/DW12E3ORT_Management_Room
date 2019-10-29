import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {Header, Fab} from 'native-base';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog from 'react-native-dialog';
//import axios from 'axios';

import {getData} from '../../configurations/config';
import {setHeaderAuth} from '../../configurations/api';
import fetchAllCustomers from '../../_stores/customer';
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
      this.props.fetchAllCustomers();
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

  showData = (name, identity_number, phone, image) => {
    return (
      <View style={{margin: 20, borderWidth: 1, borderColor: '#3498db'}}>
        <View style={{flexDirection: 'row'}}>
          <Image style={{height: 100, width: 100}} source={{uri: image}} />
          <View style={{justifyContent: 'center', marginLeft: 20}}>
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.text}>{identity_number}</Text>
            <Text style={styles.text}>{phone}</Text>
          </View>
        </View>
      </View>
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

  addData = async () => {
    await URL.post(`customer`, {
      name: this.state.name,
      identity_number: this.state.identityNumber,
      phone_number: this.state.phoneNumber,
      image: '',
    })
      .then(res => {
        console.log(res.data);
        this.setState({isAddCustomer: false});
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const {customers} = this.props;
    // console.log(JSON.stringify(customers.data, null, 2));
    // console.log(this.state.name);
    return (
      <View style={{flex: 1}}>
        <Header style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20, color: 'white'}}>Customer</Text>
        </Header>
        <View>{this.handleData(customers.data)}</View>
        <Fab
          active={true}
          position="bottomRight"
          onPress={() => this.setState({isAddCustomer: true})}>
          <Icon name="plus" />
        </Fab>
        <Dialog.Container visible={this.state.isAddCustomer}>
          <Dialog.Title style={{marginBottom: 5}}>Edit Room</Dialog.Title>
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
  fetchAllCustomers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Customer);

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
});
