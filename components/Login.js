import React, {useState} from 'react';
import {connect} from 'react-redux';
import {login, removeError} from '../actions';

import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Login = props => {
  [user, setUser] = useState(props.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const logger = () => {
    const user = {
      username: username,
      password: password,
    };
    props.login(user).then(() => props.navigation.navigate('AuthLoad'));
  };

  console.log('Login', props);
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
          />
          <Text style={styles.labels}>Password</Text>
          <TextInput
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            style={(styles.labels, styles.inputs)}
            secureTextEntry={true}
            placeholderTextColor="#5F5B66"
          />
          <TouchableOpacity style={styles.button} onPress={logger}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signUpText}>
          <Text>Don't have an account yet?</Text>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => {
              props.removeError();
              props.navigation.navigate('SignUp');
            }}>
            <Text style={styles.signUp}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

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
    color: '#555E6F',
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
  login: arg => dispatch(login(arg)),
  removeError: dispatch(removeError),
});
const msp = state => {
  return {errors: state.errors, loggedin: state.login, user: state.user};
};

export default connect(
  msp,
  mdp,
)(Login);
