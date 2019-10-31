import React, {Component} from 'react';
import {Container, Header, Title} from 'native-base';
import {View, Image, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';

import fetchDataUser from '../../_stores/setting';
import {getData} from '../../configurations/config';
import {setHeaderAuth} from '../../configurations/api';

class Setting extends Component {
  // componentDidMount() {
  //   this.handleGetUser();
  // }

  constructor() {
    super();
    this.state = {
      isShowModal: false,
    };
  }

  handleGetUser = async () => {
    try {
      const data = await getData();
      setHeaderAuth(data.token);
      const id = data.id;
      this.props.fetchDataUser(id);
    } catch (error) {
      console.log(error);
    }
  };

  IdentityUser = users => {
    return (
      <View style={styles.horizontal}>
        <Image style={styles.Image} source={{uri: users.avatar}} />
        <View style={styles.vertikal}>
          <Text style={styles.Text1}>{users.email}</Text>
          <Text style={styles.Text2}>{users.name}</Text>
        </View>
      </View>
    );
  };

  handleLogout = async () => {
    setHeaderAuth('');
    const data = '';
    await AsyncStorage.setItem('user', data);
    this.props.navigation.navigate('Public');
  };

  validationLogout = () => {
    return (
      <Modal
        isVisible={this.state.isShowModal}
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            width: 300,
          }}>
          <Text style={{fontSize: 18, marginBottom: 10}}>
            Confirmation Logout
          </Text>
          <Text style={{fontSize: 15}}> Are you sure you want to logout?</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 50,
            }}>
            <Button
              title="Yes"
              type="solid"
              buttonStyle={[
                styles.button,
                {marginRight: 5, backgroundColor: '#384cae'},
              ]}
              onPress={() => this.handleLogout()}
            />
            <Button
              title="Cancel"
              type="solid"
              buttonStyle={[
                styles.button,
                {marginLeft: 5, backgroundColor: 'silver'},
              ]}
              onPress={() => this.setState({isShowModal: false})}
            />
          </View>
        </View>
      </Modal>
    );
  };

  logout = () => {
    return (
      <View>
        <Button
          title="Log Out"
          titleStyle={{fontSize: 18}}
          buttonStyle={{
            height: 35,
            width: 100,
            marginLeft: 15,
            backgroundColor: '#cf1111',
          }}
          onPress={() => this.setState({isShowModal: true})}
        />
      </View>
    );
  };

  render() {
    const {users} = this.props;
    // console.log(JSON.stringify(users, null, 2));

    return (
      <Container style={styles.Container}>
        <Header androidStatusBarColor="#384cae" style={styles.Header}>
          <Title>SETTING</Title>
        </Header>
        {this.IdentityUser(users.data)}
        {this.logout()}
        {this.validationLogout()}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = {
  fetchDataUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Setting);

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  horizontal: {
    flexDirection: 'row',
    margin: 20,
  },
  vertikal: {
    justifyContent: 'center',
    marginLeft: 25,
    flex: 1,
  },
  Text1: {
    fontSize: 22,
  },
  Text2: {
    fontSize: 18,
  },
  Image: {
    width: 90,
    height: 90,
    borderRadius: 100,
  },
  Header: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#384cae',
    height: 50,
  },
  button: {
    height: 35,
    width: 125,
  },
});
