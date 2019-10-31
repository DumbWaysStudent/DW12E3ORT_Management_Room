import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Header, Title, Input, Item, Picker} from 'native-base';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';

import {setHeaderAuth} from '../../configurations/api';
import {getData} from '../../configurations/config';
import {fetchDataCheckin} from '../../_stores/checkin';
import {getAllCustomer} from '../../_stores/customer';
import fetchDataUser from '../../_stores/setting';

class Checkin extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      roomId: null,
      roomName: '',
      customerId: null,
      customerName: '',
      duration: null,
    };
  }

  componentDidMount = () => {
    this.handleGetData();
  };

  handleGetData = async () => {
    try {
      const data = await getData();
      const id = data.id;
      setHeaderAuth(data.token);
      this.props.getAllCustomer();
      this.props.fetchDataCheckin();
      this.props.fetchDataUser(id);
    } catch (error) {
      console.log(error);
    }
  };

  // handleGetUser = async () => {
  //   try {
  //     const data = await getData();
  //     setHeaderAuth(data.token);
  //     const id = data.id;

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  handlePress = item => {
    this.setState({
      modal: true,
      roomId: item.id,
      roomName: item.name,
      customerName: item.customer ? item.customer.name : '',
      customerId: item.customer ? item.customer.id : null,
    });
  };

  handleRenderData = item => {
    const roomStyle = [
      styles.roomCont,
      item.order && item.order.is_booked
        ? styles.roomUnavailable
        : styles.roomAvailable,
    ];
    return (
      <TouchableOpacity onPress={() => this.handlePress(item)}>
        <View style={roomStyle}>
          <Text style={{fontSize: 25, fontWeight: '700', color: 'white'}}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderData = data => {
    return (
      <FlatList
        data={data}
        numColumns={3}
        renderItem={({item}) => this.handleRenderData(item)}
        keyExtractor={Item => Item.id.toString()}
        onRefresh={() => this.handleGetData()}
        refreshing={false}
      />
    );
  };

  handleModalCheckin = item => {
    const name = 'Checkin';
    const {customers} = this.props;
    const {roomId, roomName, customerName, customerId} = this.state;
    return (
      <Modal
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        isVisible={this.state.modal}>
        <View
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 20,
            paddingVertical: 30,
            borderRadius: 10,
            width: 300,
          }}>
          <Text style={{fontSize: 22, marginBottom: 12}}>{name}</Text>
          <Text style={{fontSize: 17, marginBottom: 5}}>Room name</Text>
          <Item regular style={{marginBottom: 10}}>
            <Input style={{height: 40}} value={roomName} disabled />
          </Item>
          <Text style={{fontSize: 17, marginBottom: 5}}>Customer</Text>
          <Item picker style={{marginBottom: 15}}>
            <Picker mode="dropdown" selectedValue={customerId}>
              {customers.data.map(customer => {
                return (
                  <Picker.Item
                    key={customer.id.toString()}
                    label={customer.name}
                    value={customer.id}
                  />
                );
              })}
            </Picker>
          </Item>
          <Text style={{fontSize: 17, marginBottom: 5}}>
            Duration (minutes)
          </Text>
          <Item regular style={{marginBottom: 10}}>
            <Input style={{height: 40}} />
          </Item>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Button
              buttonStyle={[
                {marginRight: 15, backgroundColor: 'red'},
                styles.button,
              ]}
              title="cancel"
              onPress={() => this.setState({modal: false})}
            />
            <Button
              buttonStyle={[
                {marginLeft: 15, backgroundColor: '#384cae'},
                styles.button,
              ]}
              title="checkin"
            />
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    const {checkins} = this.props;
    // console.log(JSON.stringify(checkins.data, null, 2));
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
          <Title>CHECKIN</Title>
        </Header>
        <View style={[styles.headView, {justifyContent: 'center'}]}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <View style={[styles.square, {backgroundColor: '#384cae'}]}></View>
            <Text style={[styles.textHead, {marginRight: 30}]}>Available</Text>
            <View style={[styles.square, {backgroundColor: 'grey'}]}></View>
            <Text style={[styles.textHead]}>Not Available</Text>
          </View>
        </View>
        <View style={styles.mainView}>{this.renderData(checkins.data)}</View>
        <View>{this.handleModalCheckin(checkins.data)}</View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  checkins: state.checkins,
  customers: state.customers,
});

const mapDispatchToProps = {
  fetchDataCheckin,
  getAllCustomer,
  fetchDataUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Checkin);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headView: {
    flex: 1,
  },
  mainView: {
    flex: 10,
  },
  square: {
    height: 20,
    width: 20,
  },
  textHead: {
    marginLeft: 10,
    fontSize: 17,
  },
  roomCont: {
    width: 117,
    height: 150,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  roomAvailable: {
    backgroundColor: '#384cae',
  },
  roomUnavailable: {
    backgroundColor: 'silver',
  },
  button: {
    height: 35,
    width: 100,
  },
});
