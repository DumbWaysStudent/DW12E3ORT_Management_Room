import React, {Component} from 'react';
import {Container, Header, Button, Icon, Fab, Title} from 'native-base';
import {View, Image, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import fetchDataUser from '../../_stores/setting';
import {getData} from '../../configurations/config';
import {setHeaderAuth} from '../../configurations/api';

class Setting extends Component {
  componentDidMount() {
    this.handleGetUser();
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
        <Image
          style={{width: 90, height: 90, borderRadius: 100}}
          source={{uri: users.avatar}}
        />
        <View style={styles.vertikal}>
          <Text style={styles.Text1}>{users.email}</Text>
          <Text style={styles.Text2}>{users.name}</Text>
        </View>
      </View>
    );
  };

  render() {
    const {users} = this.props;
    console.log(JSON.stringify(users, null, 2));

    return (
      <Container style={styles.Container}>
        <Header
          androidStatusBarColor="#384cae"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#384cae',
            height: 50,
          }}>
          <Title>SETTING</Title>
        </Header>
        {this.IdentityUser(users.data)}
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
});
