import React, {useState} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {connect} from 'react-redux';
import {postSavings} from '../actions';
import {Button} from 'react-native-elements';

const Savings = props => {
  [categoryForm, setCategoryForm] = useState('');
  [name, setName] = useState('');
  [description, setDescription] = useState('');
  [amount, setAmount] = useState('');
  [end, setEnd] = useState(new Date());
  [show, setShow] = useState(true);

  const clickHandler = () => {
    const today = new Date();
    if (
      end.getMonth() >= today.getMonth() &&
      end.getDate() >= today.getDate()
    ) {
      savings = {
        category_id: props.categories.find(c => c.name === categoryForm).id,
        amount,
        name,
        description,
        end,
        user_id: props.user.id,
      };
      props.postSavings(savings).then(() => {
        alert('Posted');
        setEnd(new Date());
        setAmount('');
        setName('');
        setDescription('');
        setCategoryForm('');
      });
    } else {
      alert('Date is invalid');
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
          onChangeText={setCategoryForm}
          placeholder="Category"
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
                  onPress={() => setCategoryForm(c.name)}></Button>
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
          autoCapitalize="sentences"
          style={styles.descriptionText}
          value={description}
          onChangeText={setDescription}
          placeholder="Motto"
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
        <Button title="Submit" onPress={clickHandler} />
      </View>
      {/* <View style={styles.bottom} /> */}
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
    backgroundColor: 'tomato',
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
  categories: state.categories,
  user: state.user,
});

const mdp = dispatch => ({
  postSavings: arg => dispatch(postSavings(arg)),
});

export default connect(
  msp,
  mdp,
)(Savings);
