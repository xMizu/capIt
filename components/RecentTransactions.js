import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';

const RecentTransactions = props => {
  [recent, setRecent] = useState(props.expenses);
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dateConverter = created_at => {
    const date = new Date(created_at);
    return `${month[date.getMonth()].slice(
      0,
      3,
    )} ${date.getDate()} ${date.getFullYear()}`;
  };

  const homeButton = () => {
    props.navigation.navigate('Home');
  };

  return (
    <>
      <View style={styles.statusbar}>
        <Button
          title="Home"
          type="clear"
          onPress={homeButton}
          style={styles.homeButton}
        />
      </View>
      <View style={styles.container}>
        <ScrollView>
          {recent.map(exp => (
            <View key={exp.id} style={styles.listItem}>
              <Text style={styles.listText}>{`${dateConverter(
                exp.created_at,
              )} - ${exp.name}`}</Text>
              <Text style={styles.listDescription}>{exp.description}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      {/* <View style={styles.bottom} /> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  bottom: {
    backgroundColor: '#41B3A3',
    height: 50,
    // justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  listItem: {
    marginVertical: 35,
  },
  listText: {
    fontSize: 24,
  },
  listDescription: {
    fontSize: 12,
    textAlign: 'center',
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

const msp = state => ({
  expenses: state.expenses,
});

RecentTransactions.navigationOptions = ({navigation}) => ({
  //   header: null,
  title: 'Recent Transactions',
  headerStyle: {backgroundColor: '#41B3A3', opacity: 1},
});

export default connect(msp)(RecentTransactions);
