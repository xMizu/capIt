import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActionSheetIOS,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PieChartExample from '../components/PieChart';
import {Button} from 'react-native-elements';
import {logout, removeSavings} from '../actions';
import RNShake from 'react-native-shake';
import NotifService from '../components/NotifService';

const Landing = props => {
  const savingsChecker = () => {
    if (props.deadSavings.length > 0) {
      props.deadSavings.map(saving => {
        const save = {...saving, token: props.token};
        notif.scheduleNotif(saving);
        props.removeSavings(save);
      });
    }
  };

  const onNotif = notif => {
    console.log(notif);
    Alert.alert(notif.title, notif.message);
  };

  const notif = new NotifService(onNotif);

  useEffect(() => {
    savingsChecker();
    RNShake.addEventListener('ShakeEvent', () => {
      action();
    });
  }, []);

  const action = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Logout'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          logUserout();
          /* destructive action */
        }
      },
    );
  };

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

  console.log('landing', notif);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text
            style={styles.text}
            onPress={() => {
              console.log('click');
              notif.localNotif();
            }}>
            {props.user ? `Welcome \n ${props.user.name}` : null}
          </Text>
          <Text onPress={logUserout}>hello</Text>
        </View>
        <View style={styles.pie}>
          <PieChartExample balance={props.balance} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Purchases"
            type="outline"
            style={styles.recentTransactions}
            onPress={recentTransactions}
          />
          <Button
            title="Expense"
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
      </View>
      <View style={styles.bottom} />
    </>
  );
};

Landing.navigationOptions = ({navigation}) => ({
  //   header: null,
  headerStyle: {backgroundColor: '#41B3A3', opacity: 1},
});

const styles = StyleSheet.create({
  text: {fontSize: 24, textAlign: 'center', color: '#3C3744'},
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#EFEFEF',
  },
  textContainer: {
    justifyContent: 'center',
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
    backgroundColor: '#17BEBB',
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
    top: -20,
    width: 130,
    left: Dimensions.get('window').width / 2 + 25,
  },
  savings: {
    position: 'absolute',
    top: -20,
    width: 130,
    left: Dimensions.get('window').width / 2 - 150,
  },
  addExpense: {
    position: 'absolute',
    top: 80,
    width: 130,
    left: Dimensions.get('window').width / 2 + 25,
  },
  payment: {
    position: 'absolute',
    top: 80,
    width: 130,
    left: Dimensions.get('window').width / 2 - 150,
  },
});

const msp = state => {
  return {
    user: state.user,
    token: state.token,
    balance: state.balance,
    deadSavings: state.deadSavings,
  };
};

const mdp = dispatch => {
  return {
    logout: dispatch(logout),
    removeSavings: arg => dispatch(removeSavings(arg)),
  };
};

export default connect(
  msp,
  mdp,
)(Landing);
