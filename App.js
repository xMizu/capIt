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
import Payment from './components/Payment';
import Savings from './components/Savings';
import SavingsList from './containers/SavingsList';
import Landing from './containers/Landing';
import RecentTransactions from './components/RecentTransactions';
import AddExpense from './components/AddExpense';
import {StyleSheet, View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

const AppStack = createMaterialTopTabNavigator(
  {
    Landing: Landing,
    SavingsList: SavingsList,
  },
  {
    tabBarOptions: {
      showLabel: false,
      tabStyle: {
        height: 80,
        backgroundColor: '#17BEBB',
      },
      indicatorStyle: {
        backgroundColor: '#17BEBB',
      },
    },
  },
);

const Authload = createSwitchNavigator({AuthLoader: AuthLoader});
const AuthStack = createSwitchNavigator({
  Login: Login,
  SignUp: SignUp,
  Payment: Payment,
  Savings: Savings,
  AddExpense: AddExpense,
  RecentTransactions: RecentTransactions,
});

const App = props => {
  const AppNavigator = () => {
    console.log('App');
    return createSwitchNavigator(
      {
        App: AppStack,
        Auth: AuthStack,
        AuthLoad: Authload,
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
    // backgroundColor: '#41B3A3',
    justifyContent: 'center',
  },
});

export default App;
