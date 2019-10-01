import React, {useState} from 'react';
import {
  Text,
  Picker,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  ActionSheetIOS,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchCategories, postExpense, removeExpense} from '../actions';
import {Button} from 'react-native-elements';

const AddExpense = props => {
  const [item, setItem] = useState(1);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');

  filteredExpenses = () => {
    return props.expenses.filter(exp => exp.category_id === item);
  };

  clickHandler = () => {
    expense = {
      user_id: props.user.id,
      name: name,
      description: description,
      amount: amount,
      category_id: item,
    };
    props.postExpense(expense).then(() => {
      setAmount('');
      setDescription('');
      setName('');
    });
  };

  const action = exp => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Remove'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          props.removeExpense(exp);
          /* destructive action */
        }
      },
    );
  };

  const homeButton = () => {
    props.navigation.navigate('Landing');
  };

  return (
    <>
      <View style={styles.statusbar}>
        <Button
          title="< Home"
          type="clear"
          onPress={homeButton}
          style={styles.homeButton}
        />
      </View>
      <View style={styles.expenseContainer}>
        <View style={styles.expenseList}>
          <ScrollView>
            {filteredExpenses().map(exp => (
              <Text
                style={styles.text}
                key={`expense-${exp.id}`}
                onPress={() =>
                  action(exp)
                }>{`${exp.name} - ${exp.amount}`}</Text>
            ))}
          </ScrollView>
        </View>
        <View>
          <Text style={styles.text}>Categories</Text>
        </View>
        <Picker
          selectedValue={item}
          onValueChange={item => setItem(item)}
          style={styles.picker}>
          {props.categories.map(c => (
            <Picker.Item
              label={c.name}
              value={c.id}
              key={`category -${c.id}`}
            />
          ))}
        </Picker>
        <View style={styles.form}>
          <TextInput
            autoCapitalize="sentences"
            style={styles.descriptionText}
            value={name}
            onChangeText={setName}
            placeholder="add name"
            returnKeyType="next"
          />
          <TextInput
            autoCapitalize="sentences"
            style={styles.descriptionText}
            value={amount}
            onChangeText={setAmount}
            keyboardType={'numeric'}
            placeholder="add amount"
          />
          {props.errors ? (
            <Text style={styles.errorText}>{props.errors}</Text>
          ) : null}
          <Button title="Submit" onPress={clickHandler} />
        </View>
        <View style={styles.bottom} />
      </View>
    </>
  );
};

const msp = state => ({
  categories: state.allCategories,
  token: state.token,
  expenses: state.expenses,
  user: state.user,
  errors: state.errors,
});

const mdp = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories),
  postExpense: arg => dispatch(postExpense(arg)),
  removeExpense: arg => dispatch(removeExpense(arg)),
});

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    textAlign: 'center',
  },
  picker: {
    width: '100%',
    // backgroundColor: 'green',
    justifyContent: 'center',
    flex: 2,
  },
  expenseList: {
    flex: 2,
  },
  expenseContainer: {
    flex: 1,
  },
  descriptionText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 24,
    marginVertical: 10,
  },
  form: {
    marginTop: 10,
    flex: 2,
  },
  bottom: {
    backgroundColor: '#41B3A3',
    height: 50,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
  statusbar: {
    backgroundColor: '#41B3A3',
    height: 80,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  homeButton: {
    width: 100,
    alignSelf: 'flex-start',
  },
});

AddExpense.navigationOptions = ({navigation}) => ({
  //   header: null,
  title: 'Add Expense',
  headerStyle: {backgroundColor: '#41B3A3', opacity: 1},
});

export default connect(
  msp,
  mdp,
)(AddExpense);
