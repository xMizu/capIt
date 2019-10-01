import React from 'react';
import {ScrollView} from 'react-native';
import ExpenseProgress from '../components/ExpenseProgress';
import {connect} from 'react-redux';

const SavingList = props => {
  const addExpToCategories = (category, expense) => {
    return category.map(cat => {
      let match = expense.filter(
        expense =>
          expense.category_id === cat.id &&
          new Date(expense.created_at) > new Date(cat.savingStart),
      );
      if (match.length > 0) {
        let total = match.reduce((ac, cv) => ac + cv.amount, 0);
        return {
          ...cat,
          expenses: total,
        };
      } else {
        return {...cat, expenses: 0};
      }
    });
  };

  const addSavToCategories = (category, savings) => {
    return category.map(cat => {
      let match = savings.filter(savings => savings.category_id === cat.id);
      if (match.length > 0) {
        let total = match.reduce((ac, cv) => ac + cv.amount, 0);
        return {
          ...cat,
          savings: total,
          savingID: match[0].id,
          savingStart: match[0].created_at,
        };
      } else {
        return {...cat, savings: 0};
      }
    });
  };

  const monthSavingsAndExpenses = () => {
    const saving = addSavToCategories(props.categories, props.savings);
    const exp = addExpToCategories(saving, props.expenses);
    return exp;
  };

  console.log('savinglist');

  return (
    <ScrollView>
      {monthSavingsAndExpenses()
        ? monthSavingsAndExpenses()
            .filter(cat => cat.savings > 0)
            .map(savings => (
              <ExpenseProgress savings={savings} key={savings.id} />
            ))
        : null}
    </ScrollView>
  );
};

const msp = state => ({
  savings: state.savings,
  categories: state.categories,
  expenses: state.expenses,
});

export default connect(msp)(SavingList);
