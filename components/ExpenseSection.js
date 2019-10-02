import React from 'react';
import {SectionList, Text, StyleSheet, ActionSheetIOS} from 'react-native';
import {removeExpense, removeIncome} from '../actions';
import {connect} from 'react-redux';

const ExpenseSection = props => {
  console.log('expse', props);

  const action = exp => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Remove'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          let user = {...exp, token: props.token};
          exp.name ? props.removeExpense(user) : props.removeIncome(user);
          /* destructive action */
        }
      },
    );
  };

  return (
    <SectionList
      sections={[
        {
          title: `${props.month} ${props.year}`,
          data: [...props.monthlyExpense, ...props.monthlyIncome].reverse(),
        },
      ]}
      renderItem={({item}) => {
        let day = new Date(item.created_at);
        return (
          <Text style={styles.item} onPress={() => action(item)}>
            {`${props.month.slice(0, 3)} ${day.getDate()} $${
              item.name ? ` (${item.amount})` : item.amount
            } - ${item.name ? item.name : item.title}`}
          </Text>
        );
      }}
      renderSectionHeader={({section}) => (
        <Text style={styles.sectionHeader}>{section.title}</Text>
      )}
      keyExtractor={(item, index) => index}
    />
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#49C6E5',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
});

const mdp = dispatch => ({
  removeExpense: arg => dispatch(removeExpense(arg)),
  removeIncome: arg => dispatch(removeIncome(arg)),
});

const msp = state => ({
  token: state.token,
});

export default connect(
  msp,
  mdp,
)(ExpenseSection);
