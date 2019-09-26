import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {logout, fetchUser, fetchCategories} from '../actions';
import PieChartExample from './PieChart';
import {Button} from 'react-native-elements';

const Home = props => {
  useEffect(() => {
    props.fetchUser(props.token);
    props.fetchCategories();
  }, []);

  const logUserout = () => {
    props.logout();
    AsyncStorage.removeItem('id_token');
    props.navigation.navigate('AuthLoad');
  };

  const addExpense = () => {
    props.navigation.navigate('AddExpense');
  };

  const recentTransactions = () => {
    props.navigation.navigate('RecentTransactions');
  };
  const savings = () => {
    props.navigation.navigate('Savings');
  };
  const payment = () => {
    props.navigation.navigate('Payment');
  };

  console.log('Home');

  return (
    <>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {props.user ? `Welcome \n ${props.user.name}` : null}
          </Text>
        </View>
        {/* <TouchableOpacity onPress={() => logUserout(props)}>
            <Text>Log Out</Text>
          </TouchableOpacity> */}
        <View style={styles.pie}>
          <PieChartExample />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="recent"
            type="outline"
            style={styles.recentTransactions}
            onPress={recentTransactions}
          />
          <Button
            title="Expenses"
            type="outline"
            style={styles.addExpense}
            onPress={addExpense}
          />
          <Button
            title="Payments"
            type="outline"
            style={styles.payment}
            onPress={payment}
          />
          <Button
            title="Savings"
            type="outline"
            style={styles.savings}
            onPress={savings}
          />
        </View>
        {/* <Text style={styles.text}>Home</Text> */}
        {/* <View style={styles.optionsList}>
            <View style={styles.options}>
              <TouchableOpacity
                style={styles.button}
                onPress={recentTransactions}>
                <Text style={styles.optionText}>Recent Transactions</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.options}>
              <TouchableOpacity style={styles.button} onPress={addExpense}>
                <Text style={styles.optionText}>Add Expense</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.options}>
              <TouchableOpacity style={styles.button} onPress={savings}>
                <Text style={styles.optionText}>Create Savings Goal</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.options}>
              <TouchableOpacity style={styles.button} onPress={payment}>
                <Text style={styles.optionText}>Payment</Text>
              </TouchableOpacity>
            </View> */}
      </View>

      {/* </View> */}
      {/* <View style={styles.bottom} /> */}
    </>
  );
};

Home.navigationOptions = ({navigation}) => ({
  //   header: null,
  title: 'Home',
  headerStyle: {backgroundColor: '#41B3A3', opacity: 1},
});

const styles = StyleSheet.create({
  text: {fontSize: 24, textAlign: 'center'},
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    justifyContent: 'flex-end',
    flexGrow: 2,
  },
  optionsList: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    flex: 1,
    width: Dimensions.get('window').width,
  },
  options: {
    width: Dimensions.get('window').width / 2,
    height: '50%',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 0.2,
    margin: 0,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 24,
  },
  bottom: {
    backgroundColor: '#41B3A3',
    height: 50,
  },
  pie: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    // backgroundColor: 'salmon',
    flexGrow: 3,
  },
  recentTransactions: {
    position: 'absolute',
    width: 130,
    left: Dimensions.get('window').width / 2 + 25,
  },
  savings: {
    position: 'absolute',
    width: 130,
    left: Dimensions.get('window').width / 2 - 150,
  },
  addExpense: {
    position: 'absolute',
    top: 120,
    width: 130,
    left: Dimensions.get('window').width / 2 + 25,
  },
  payment: {
    position: 'absolute',
    top: 120,
    width: 130,
    left: Dimensions.get('window').width / 2 - 150,
  },
});

const msp = state => {
  return {user: state.user, token: state.token};
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
