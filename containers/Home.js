import React, {useEffect, useState} from 'react';
import Swiper from 'react-native-swiper';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Landing from './Landing';
import SavingList from './SavingsList';
import {connect} from 'react-redux';
import {logout, fetchUser, fetchCategories} from '../actions';

const Home = props => {
  [date, setDate] = useState(new Date());
  [savings, setSavings] = useState(props.savings);

  useEffect(() => {
    props.fetchUser(props.token);
    props.fetchCategories();
  }, []);

  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      index={0}
      horizontal={true}>
      <View style={styles.slide1}>
        <Landing />
      </View>
      <View style={styles.slide2}>
        <SavingList />
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

const msp = state => {
  return {user: state.user, token: state.token, savings: state.savings};
};

const mdp = dispatch => {
  return {
    fetchUser: arg => dispatch(fetchUser(arg, dispatch)),
    logout: dispatch(logout),
    fetchCategories: () => dispatch(fetchCategories),
  };
};

export default connect(
  msp,
  mdp,
)(Home);
