import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {Input, Item} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-elements';
import {URL} from '../../configurations/api';
import AsyncStorage from '@react-native-community/async-storage';
import {getData} from '../../configurations/config';

export default class login extends Component {
  constructor() {
    super();
    this.state = {
      inputEmail: '',
      inputPassword: '',
      showPass: true,
      icon: 'eye-off',
      email: false,
      password: false,
      loading: false,
    };
  }

  validationOfEmail = input => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.setState({inputEmail: input});
    if (reg.test(input) === false) {
      this.setState({email: false});
    } else {
      this.setState({email: true});
    }
  };

  validationOfPassword = input => {
    let word = input.length;
    this.setState({inputPassword: input});
    if (word < 2) {
      this.setState({password: false});
    } else {
      this.setState({password: true});
    }
  };

  btnLogin = () => {
    let {email, password} = this.state;
    if (email === true && password === true) {
      return false;
    } else {
      return true;
    }
  };

  handleSecureText = () => {
    if (this.state.showPass) {
      this.setState({showPass: false, icon: 'eye'});
    } else {
      this.setState({showPass: true, icon: 'eye-off'});
    }
  };

  handleLogin = () => {
    URL.post(`login`, {
      email: this.state.inputEmail,
      password: this.state.inputPassword,
    })
      .then(async res => {
        let data = {
          id: res.data.id,
          token: res.data.token,
        };
        await AsyncStorage.setItem('user', JSON.stringify(data));
        this.setState({loading: true});
        this.props.navigation.navigate('Private');
      })
      .catch(error => {
        console.log(error);
      });
  };

  loginForm = () => {
    return (
      <View style={[{flex: 5, marginBottom: 50}, styles.view]}>
        <Image
          style={{
            width: 200,
            height: 200,
            resizeMode: 'contain',
            marginBottom: 100,
          }}
          source={{
            uri:
              'https://www.threewayshousehotel.com/wp-content/uploads/2019/02/123tw-logo@4x.png',
          }}
        />
        <Item regular style={[styles.item, {marginBottom: 7}]}>
          <Icon style={styles.icon} name="email" />
          <Input
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgb(60,60,60)"
            onChangeText={input => this.validationOfEmail(input)}
          />
        </Item>
        <Item regular style={[styles.item, {marginBottom: 15}]}>
          <Icon style={styles.icon} name="lock" />
          <Input
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgb(60,60,60)"
            onChangeText={input => this.validationOfPassword(input)}
            secureTextEntry={this.state.showPass}
          />
          <Icon
            name={this.state.icon}
            style={{fontSize: 25, marginRight: 10}}
            onPress={() => this.handleSecureText()}
          />
        </Item>
        <Button
          title="Login"
          titleStyle={{fontSize: 20}}
          buttonStyle={{
            backgroundColor: 'grey',
            width: Dimensions.get('window').width - 39,
            height: 45,
          }}
          disabled={this.btnLogin()}
          disabledStyle={{backgroundColor: 'rgba(169,169,169,0.7)'}}
          loading={this.state.loading}
          onPress={() => this.handleLogin()}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.containter}>
        <ImageBackground
          style={styles.background}
          source={{
            uri:
              'https://i.pinimg.com/474x/e4/e4/0d/e4e40d3fd6d4a2bdf8a1d07ffc20dbd1.jpg',
          }}>
          <View style={[{flex: 1}, styles.view]}></View>
          {this.loginForm()}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
  },
  item: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    height: 45,
  },
  icon: {
    fontSize: 25,
    marginLeft: 5,
  },
  input: {
    fontSize: 20,
  },
});
