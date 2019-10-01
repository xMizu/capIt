import React, {useState} from 'react';
import {Text, TextInput, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';

const Payment = props => {
  const [balance, setBalance] = useState('');

  const homeButton = () => {
    props.navigation.navigate('Landing');
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.statusbar}>
          <Button
            title="< Home"
            type="clear"
            onPress={homeButton}
            style={styles.homeButton}
          />
        </View>
        <Text>Payments</Text>
        <TextInput
          autoCapitalize="sentences"
          style={styles.descriptionText}
          value={balance}
          onChangeText={setBalance}
          placeholder="Add Amount"
          returnKeyType="next"
        />
        <Button title="Submit" />
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
  },
  homeButton: {
    width: 100,
    alignSelf: 'flex-start',
  },
  descriptionText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 24,
    marginVertical: 10,
  },
  bottom: {
    backgroundColor: '#41B3A3',
    height: 50,
  },
});

export default Payment;
