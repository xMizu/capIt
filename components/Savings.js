import React, {useState} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {connect} from 'react-redux';
import {postSavings, updateSavings} from '../actions';
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
    props.navigation.navigate('Landing');
  };
  console.log('saving', props);
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
      <View style={styles.form}>
        <TextInput
          autoCapitalize="sentences"
          style={styles.descriptionText}
          value={categoryForm}
          onChangeText={changeHandler}
          placeholder="Input Category"
          returnKeyType="next"
          autoCapitalize="none"
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
                  style={{width: 180}}
                  titleStyle={{color: 'black'}}
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
        />
        <TextInput
          autoCapitalize="none"
          style={styles.amountText}
          value={amount}
          onChangeText={setAmount}
          keyboardType={'numeric'}
          placeholder="Amount"
        />
        {props.errors ? (
          <Text style={styles.errorText}>{props.errors}</Text>
        ) : null}
        <View style={styles.datePicker}>
          <DateTimePicker
            value={end}
            is24Hour={true}
            onChange={(e, date) => setEnd(date)}
          />
        </View>
        <Button title={update} onPress={clickHandler} />
      </View>
      <View style={styles.bottom} />
    </>
  );
};

const styles = StyleSheet.create({
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
  },
  amountText: {
    marginVertical: 15,
    fontSize: 24,
    textAlign: 'center',
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
});

const mdp = dispatch => ({
  postSavings: arg => dispatch(postSavings(arg)),
  updateSavings: arg => dispatch(updateSavings(arg)),
});

export default connect(
  msp,
  mdp,
)(Savings);
