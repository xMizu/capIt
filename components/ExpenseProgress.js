import React from 'react';
import {ProgressCircle} from 'react-native-svg-charts';
import {connect} from 'react-redux';
import {Text, View, Dimensions} from 'react-native';

const ExpenseProgress = props => {
  const date = new Date().getMonth();

  const monthExpenses = props.expenses.filter(exp => {
    const expDate = new Date(exp.created_at);
    const hello = expDate.getMonth();
    return hello === date;
  });

  const addExpToCategories = (category, expense) => {
    return category.map(cat => {
      let match = expense.filter(expense => expense.category_id === cat.id);
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
        let total = savings.reduce((ac, cv) => ac + cv.amount, 0);
        return {...cat, savings: total};
      } else {
        return {...cat, savings: 0};
      }
    });
  };

  const monthSavingsAndExpenses = () => {
    const exp = addExpToCategories(props.categories, monthExpenses);
    const saving = addSavToCategories(exp, props.savings);
    return saving;
  };

  return (
    <>
      {monthSavingsAndExpenses()
        .filter(cat => cat.savings > 0)
        .map(exp => (
          <View key={exp.id}>
            <Text>{exp.name}</Text>
            <ProgressCircle
              style={{
                height: 200,
                backgroundColor: 'tomato',
                width: Dimensions.get('window').width,
              }}
              progress={
                exp.savings / exp.expenses < 1 ? 1 : exp.savings / exp.expenses
              }
              progressColor={'rgb(134, 65, 244)'}
              startAngle={-Math.PI}
              endAngle={Math.PI}
            />
            {/* <Text
                style={{
                  fontSize: 24,
                  position: 'absolute',
                  top: -125,
                  left: 130,
                  textAlign: 'center',
                  justifyContent: 'center',
                }}>
                {`Remaining: \n ${exp.savings - exp.expenses}`}
              </Text> */}
            {/* </ProgressCircle> */}
          </View>
        ))}
    </>
  );
};

const msp = state => ({
  savings: state.savings,
  expenses: state.expenses,
  categories: state.categories,
});

export default connect(msp)(ExpenseProgress);
