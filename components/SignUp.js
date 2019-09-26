import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const SignUp = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const clickHandler = () => {
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        username: username,
        password: password,
        balance: 0,
      }),
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => console.log(data));
  };

  return (
    <>
      <View style={styles.form}>
        <Text style={styles.logo}>Welcome</Text>
        <Text style={styles.labels}>Username</Text>
        <TextInput
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
          style={(styles.labels, styles.inputs)}
        />
        <Text style={styles.labels}>Name</Text>
        <TextInput
          placeholder="Name"
          onChangeText={setName}
          value={name}
          style={(styles.labels, styles.inputs)}
        />
        <Text style={styles.labels}>Password</Text>
        <TextInput
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          style={(styles.labels, styles.inputs)}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={clickHandler}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signUpText}>
        <Text>Already have an account?</Text>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => props.navigation.navigate('Login')}>
          <Text style={styles.signUp}>Log In</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

SignUp.navigationOptions = ({navigation}) => ({
  header: null,
});

const styles = StyleSheet.create({
  form: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  inputs: {
    textDecorationStyle: 'solid',
    marginVertical: 5,
    width: '100%',
    color: 'lightgrey',
    textAlign: 'center',
  },
  labels: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    width: '100%',
  },
  logo: {
    fontSize: 36,
    textAlign: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
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
    color: 'white',
  },
});

export default SignUp;
