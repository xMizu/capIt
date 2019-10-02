import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {connect} from 'react-redux';
import {postSavings, updateSavings, removeError} from '../actions';
import {Button} from 'react-native-elements';

const Savings = props => {
  [categoryForm, setCategoryForm] = useState('');
  [name, setName] = useState('');
  [description, setDescription] = useState('');
  [amount, setAmount] = useState('');
  [update, setUpdate] = useState('Submit');
  [end, setEnd] = useState(new Date());
  [show, setShow] = useState(true);

  const clickHandler = () => {
    const today = new Date();
    if (update === 'Update') {
      savings = {
        savings_id: props.savings.find(
          saving =>
            saving.category_id ===
            props.categories.find(c => c.name === categoryForm).id,
        ).id,
        amount,
        name,
        end,
        user_id: props.user.id,
        token: props.token,
      };
      props.updateSavings(savings).then(() => {
        setEnd(new Date());
        setAmount('');
        setName('');
        setCategoryForm('');
        alert('Posted');
      });
    } else {
      if (end > today) {
        savings = {
          category_id: props.categories.find(c => c.name === categoryForm).id,
          amount,
          name,
          end,
          user_id: props.user.id,
          token: props.token,
        };
        props.postSavings(savings).then(() => {
          setEnd(new Date());
          setAmount('');
          setName('');
          setCategoryForm('');
          alert('Posted');
        });
      } else {
        alert('Date is invalid');
      }
    }
  };

  const changeHandler = e => {
    setCategoryForm(e);
    let found = props.categories.find(
      c => c.name.toLowerCase() === e.toLowerCase(),
    );
    if (
      found &&
      props.savings.find(saving => saving.category_id === found.id)
    ) {
      let saving = props.savings.find(sav => sav.category_id === found.id);
      setAmount(saving.amount.toString());
      setName(saving.name);
      setEnd(new Date(saving.end));
      setUpdate('Update');
    } else {
      update === 'Submit' ? null : setUpdate('Submit');
    }
  };

  const homeButton = () => {
    props.removeError();
    props.navigation.navigate('Landing');
  };
  console.log('saving', props);
  return (
    <>
      <View style={styles.statusbar}>
        <Text onPress={homeButton} style={styles.homeButton}>{`< Home`}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            autoCapitalize="sentences"
            style={styles.descriptionText}
            value={categoryForm}
            onChangeText={changeHandler}
            placeholder="Input Category"
            returnKeyType="next"
            autoCapitalize="none"
            placeholderTextColor="#797979"
            clearButtonMode="while-editing"
          />
          <View style={styles.categoryList}>
            {props.categories
              .filter(c =>
                c.name.toLowerCase().includes(categoryForm.toLowerCase()),
              )
              .map(c => (
                <View key={c.id} style={styles.button}>
                  <Button
                    title={c.name}
                    type="clear"
                    titleStyle={{color: '#3C3744'}}
                    onPress={(e, value) => changeHandler(c.name)}></Button>
                </View>
              ))}
          </View>
          <TextInput
            autoCapitalize="sentences"
            style={styles.descriptionText}
            value={name}
            onChangeText={setName}
            placeholder="Give your goal a name"
            placeholderTextColor="#797979"
          />
          <TextInput
            autoCapitalize="none"
            style={styles.amountText}
            value={amount}
            onChangeText={setAmount}
            keyboardType="number-pad"
            returnKeyType="done"
            placeholder="Amount"
            placeholderTextColor="#797979"
          />
          {props.errors ? (
            <Text style={styles.errorText}>{props.errors}</Text>
          ) : null}
          <KeyboardAvoidingView enabled>
            <DateTimePicker
              value={end}
              onChange={(e, date) => setEnd(date)}
              display="default"
              mode="date"
            />
            <Button title={update} onPress={clickHandler} />
          </KeyboardAvoidingView>
        </View>
      </View>
      <View style={styles.bottom} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFEF',
    flex: 1,
  },
  form: {
    flex: 1,
  },
  bottom: {
    backgroundColor: '#41B3A3',
    height: 50,
  },
  descriptionText: {
    marginVertical: 10,
    fontSize: 24,
    textAlign: 'center',
    color: '#474747',
  },
  amountText: {
    marginVertical: 15,
    fontSize: 24,
    textAlign: 'center',
    color: '#474747',
  },
  categoryList: {
    flexWrap: 'wrap',
    height: 160,
    width: '100%',
  },
  button: {
    width: '50%',
  },
  datePicker: {
    marginVertical: 10,
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
    color: '#EFEFEF',
    fontSize: 18,
    marginLeft: 18,
    paddingBottom: 10,
  },
});

Savings.navigationOptions = ({navigation}) => ({
  title: 'Savings',
  headerStyle: {backgroundColor: '#41B3A3', opacity: 1},
});

const msp = state => ({
  categories: state.allCategories,
  user: state.user,
  savings: state.savings,
  token: state.token,
});

const mdp = dispatch => ({
  postSavings: arg => dispatch(postSavings(arg)),
  updateSavings: arg => dispatch(updateSavings(arg)),
  removeError: dispatch(removeError),
});

export default connect(
  msp,
  mdp,
)(Savings);
