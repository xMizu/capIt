import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import ExpenseProgress from '../components/ExpenseProgress';

const SavingList = props => {
  [date, setDate] = useState(new Date());
  [savings, setSavings] = useState(props.savings);

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
    const findDate = new Date(created_at);
    return `${month[findDate.getMonth()]} ${findDate.getFullYear()}`;
  };

  const timeLeft = (start, end) => {
    const begin = new Date(start);
    const finish = new Date(end);
    const utc1 = Date.UTC(
      begin.getFullYear(),
      begin.getMonth(),
      begin.getDate(),
    );
    const utc2 = Date.UTC(
      finish.getFullYear(),
      finish.getMonth(),
      finish.getDate(),
    );
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  };

  return (
    <ScrollView>
      <ExpenseProgress />
    </ScrollView>
  );
};

const msp = state => ({
  savings: state.savings,
  categories: state.categories,
});

export default connect(msp)(SavingList);
