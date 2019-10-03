import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {signup, removeError} from '../actions';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const SignUp = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const clickHandler = () => {
    const user = {
      username: username,
      password: password,
      name: name,
      balance: 0,
    };
    props.signup(user).then(async () => {
      const token = await AsyncStorage.getItem('id_token');
      props.navigation.navigate(token ? 'App' : 'SignUp');
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.logo}>Welcome</Text>
          {props.errors ? (
            <Text style={styles.errorText}>{props.errors}</Text>
          ) : null}
          <Text style={styles.labels}>Username</Text>
          <TextInput
            placeholder="Username"
            onChangeText={setUsername}
            value={username}
            style={(styles.labels, styles.inputs)}
            placeholderTextColor="#5F5B66"
            returnKeyType="next"
          />
          <Text style={styles.labels}>Name</Text>
          <TextInput
            placeholder="Name"
            onChangeText={setName}
            value={name}
            style={(styles.labels, styles.inputs)}
            placeholderTextColor="#5F5B66"
            returnKeyType="next"
          />
          <Text style={styles.labels}>Password</Text>
          <TextInput
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            style={(styles.labels, styles.inputs)}
            secureTextEntry={true}
            placeholderTextColor="#5F5B66"
            returnKeyType="done"
          />
          <TouchableOpacity style={styles.button} onPress={clickHandler}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signUpText}>
          <Text>Already have an account?</Text>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => {
              props.removeError();
              props.navigation.navigate('Login');
            }}>
            <Text style={styles.signUp}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

SignUp.navigationOptions = ({navigation}) => ({
  header: null,
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#41B3A3',
    flex: 1,
  },

  form: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  inputs: {
    textDecorationStyle: 'solid',
    marginVertical: 5,
    width: '100%',
    color: '#3C3744',
    fontSize: 18,
    textAlign: 'center',
  },
  labels: {
    textAlign: 'center',
    color: '#E5F4E3',
    fontSize: 22,
    width: '100%',
  },
  logo: {
    fontSize: 36,
    textAlign: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: 20,
  },
  button: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  signUpText: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 40,
  },
  signUpButton: {
    marginHorizontal: 10,
  },
  signUp: {
    fontSize: 16,
    color: '#E5F4E3',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
});

const mdp = dispatch => ({
  signup: arg => dispatch(signup(arg)),
  removeError: dispatch(removeError),
});

const msp = state => ({
  errors: state.errors,
});

export default connect(
  msp,
  mdp,
)(SignUp);
