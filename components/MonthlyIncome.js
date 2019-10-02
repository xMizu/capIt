import React from 'react';
import {Dimensions, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {BarChart, Grid, XAxis, YAxis} from 'react-native-svg-charts';
import * as scale from 'd3-scale';

const MonthlyIncome = props => {
  const date = new Date();
  const year = new Date().getFullYear();
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

  const screenWidth = Dimensions.get('window').width;

  const monthExpenses = (month, year) =>
    props.expenses
      .filter(exp => {
        const expDate = new Date(exp.created_at);
        return expDate.getMonth() === month && expDate.getFullYear() === year;
      })
      .reduce((av, cv) => av + cv.amount, 0);

  const monthIncome = (month, year) =>
    props.incomes
      .filter(inc => {
        const incDate = new Date(inc.created_at);
        return incDate.getMonth() === month && incDate.getFullYear() === year;
      })
      .reduce((av, cv) => av + cv.amount, 0);

  const yearData = (months, year) => {
    const income = months.map((value, index) => monthIncome(index, year));
    const expense = months.map((value, index) => monthExpenses(index, year));
    return income.map((value, index) => value - expense[index]);
  };

  const data = yearData(months, year).map((amount, index) => ({
    amount: amount,
    month: months[index],
    svg: {
      fill: amount >= 0 ? '#3BB273' : '#DD614A',
      onPress: () => {
        alert(amount);
      },
    },
  }));
  console.log('income', data);

  const axesSvg = {fontSize: 10, fill: 'grey'};
  const xAxisHeight = 10;
  const verticalContentInset = {top: 10, bottom: 10};

  return (
    <>
      <View style={{height: 500, padding: 20, flexDirection: 'row'}}>
        <YAxis
          data={data.map(date => date.amount)}
          style={{marginBottom: xAxisHeight}}
          contentInset={verticalContentInset}
          svg={axesSvg}
        />
        <View style={{flex: 1, marginLeft: 10}}>
          <BarChart
            style={{flex: 1}}
            data={data}
            yAccessor={({item}) => item.amount}
            contentInset={{top: 10, bottom: 10}}
            spacing={0.2}
            gridMin={0}>
            <Grid belowChart={true} />
          </BarChart>
          <XAxis
            data={data}
            scale={scale.scaleBand}
            contentInset={{top: 10, bottom: 10}}
            spacing={0.2}
            formatLabel={(_, index) => data[index].month.slice(0, 3)}
            svg={{fontSize: 10, fill: 'black'}}
          />
        </View>
      </View>
    </>
  );
};

const msp = state => ({
  incomes: state.incomes,
  expenses: state.expenses,
});

export default connect(msp)(MonthlyIncome);
