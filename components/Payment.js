import React, {useState} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {removeError, postIncome} from '../actions';
import MonthlyIncome from './MonthlyIncome';

const Payment = props => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const homeButton = () => {
    props.removeError();
    props.navigation.navigate('Landing');
  };

  const clickHandler = () => {
    const income = {
      name: name,
      amount: amount,
      token: props.token,
    };
    props.postIncome(income).then(() => {
      setAmount('');
      setName('');
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.statusbar}>
          <Text onPress={homeButton} style={styles.homeButton}>{`< Home`}</Text>
        </View>
        <KeyboardAvoidingView behavior="padding" style={{flex: 2}}>
          <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <MonthlyIncome />
                <TextInput
                  autoCapitalize="sentences"
                  style={styles.descriptionText}
                  value={name}
                  onChangeText={setName}
                  placeholder="What is it for?"
                  returnKeyType="next"
                  placeholderTextColor="#797979"
                />
                <TextInput
                  autoCapitalize="sentences"
                  style={styles.descriptionText}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="number-pad"
                  placeholder="Amount"
                  returnKeyType="done"
                  placeholderTextColor="#797979"
                />
                {props.errors ? (
                  <Text style={styles.errorText}>{props.errors}</Text>
                ) : null}
                <Button title="Submit" onPress={clickHandler} />
              </View>
            </TouchableWithoutFeedback>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
      <View style={styles.bottom} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusbar: {
    backgroundColor: '#41B3A3',
    height: 80,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    zIndex: 25,
  },
  homeButton: {
    width: 100,
    alignSelf: 'flex-start',
    color: '#EFEFEF',
    fontSize: 18,
    marginLeft: 18,
    paddingBottom: 10,
  },
  descriptionText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 24,
    marginVertical: 15,
    color: '#474747',
  },
  bottom: {
    backgroundColor: '#41B3A3',
    height: 50,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
});

const msp = state => ({
  incomes: state.incomes,
  expenses: state.expenses,
  token: state.token,
  errors: state.errors,
});
const mdp = dispatch => ({
  postIncome: arg => dispatch(postIncome(arg)),
  removeError: dispatch(removeError),
});

export default connect(
  msp,
  mdp,
)(Payment);
