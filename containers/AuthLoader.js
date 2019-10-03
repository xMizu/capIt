import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {getToken, fetchUser, fetchCategories} from '../actions';
import AsyncStorage from '@react-native-community/async-storage';

class AuthLoader extends React.Component {
  componentDidMount() {
    this.tokenAsync();
  }

  async tokenAsync() {
    const userToken = await AsyncStorage.getItem('id_token');
    this.props.getToken(userToken);
    userToken ? this.fetchInfo(userToken) : null;
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  }

  fetchInfo(userToken) {
    this.props.fetchUser(userToken);
    this.props.fetchCategories();
  }

  render() {
    console.log('Authloader', this.props);
    return (
      <View style={styles.page}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'rgba(0,0,0,.3)',
    flex: 1,
    justifyContent: 'center',
  },
});

const mdp = dispatch => {
  return {
    getToken: arg => dispatch(getToken(arg)),
    fetchUser: arg => dispatch(fetchUser(arg, dispatch)),
    fetchCategories: () => dispatch(fetchCategories),
  };
};

const msp = state => {
  return {
    login: state.login,
    token: state.token,
  };
};

export default connect(
  msp,
  mdp,
)(AuthLoader);
