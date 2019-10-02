import React, {useState} from 'react';
import {Text, View, StyleSheet, SectionList} from 'react-native';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';
import ExpenseSection from './ExpenseSection';

const RecentTransactions = props => {
  [recent, setRecent] = useState(props.expenses);
  const date = new Date();
  const months = [
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

  const recentThreeMonths = date => {
    return [date.getMonth(), date.getMonth() - 1, date.getMonth() - 2];
  };

  const monthExpenses = month =>
    props.expenses.filter(exp => {
      const expDate = new Date(exp.created_at);
      return expDate.getMonth() === month;
    });

  const monthIncomes = month =>
    props.incomes.filter(inc => {
      const incDate = new Date(inc.created_at);
      return incDate.getMonth() === month;
    });

  const homeButton = () => {
    props.navigation.navigate('Landing');
  };

  return (
    <>
      <View style={styles.background}>
        <View style={styles.statusbar}>
          <Text onPress={homeButton} style={styles.homeButton}>{`< Home`}</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.sectionList}>
            {recentThreeMonths(date).map(month => (
              <ExpenseSection
                key={month}
                month={months[month]}
                year={date.getFullYear()}
                monthlyExpense={monthExpenses(month)}
                monthlyIncome={monthIncomes(month)}
              />
            ))}
          </View>
        </View>
        <View style={styles.bottom} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#EFEFEF',
    flex: 1,
  },
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
  sectionList: {
    paddingTop: 22,
    width: '100%',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const msp = state => ({
  expenses: state.expenses,
  incomes: state.incomes,
});

RecentTransactions.navigationOptions = ({navigation}) => ({
  title: 'Recent Transactions',
  headerStyle: {backgroundColor: '#41B3A3', opacity: 1},
});

export default connect(msp)(RecentTransactions);
