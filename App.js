/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import AuthLoader from './containers/AuthLoader';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import Payment from './components/Payment';
import Savings from './components/Savings';
import RecentTransactions from './components/RecentTransactions';
import AddExpense from './components/AddExpense';
import {StyleSheet, View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

const AppStack = createMaterialBottomTabNavigator(
  {
    Home: Home,
  },
  {
    initialRouteName: 'Home',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    labeled: false,
    activeColor: 'green',
    barStyle: {
      backgroundColor: '#41B3A3',
      height: 70,
    },
  },
);

const FirstPage = createSwitchNavigator({AuthLoader: AuthLoader});
const AuthStack = createSwitchNavigator({
  Login: Login,
  SignUp: SignUp,
});

const App = props => {
  const AppNavigator = () => {
    console.log('App');
    return createSwitchNavigator(
      {
        Payment: Payment,
        Savings: Savings,
        App: AppStack,
        Auth: AuthStack,
        AuthLoad: FirstPage,
        AddExpense: AddExpense,
        RecentTransactions: RecentTransactions,
      },
      {
        initialRouteName: 'AuthLoad',
        backBehavior: 'history',
      },
    );
  };
  const AppContainer = createAppContainer(AppNavigator());

  return (
    <View style={styles.container}>
      <AppContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});

export default App;
