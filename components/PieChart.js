import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {PieChart} from 'react-native-svg-charts';
import {Dimensions, View, Text} from 'react-native';

const PieChartExample = props => {
  [label, setLabel] = useState('Balance');
  [value, setValue] = useState(props.balance);
  [labelWidth, setLabelWidth] = useState(0);
  const date = new Date().getMonth();
  const monthExpenses = props.expenses.filter(exp => {
    const expDate = new Date(exp.created_at);
    const hello = expDate.getMonth();
    return hello === date;
  });

  const colors = ['#600080', '#9900cc', '#c61aff', '#d966ff', '#ecb3ff'];

  const deviceWidth = Dimensions.get('window').width;

  const pieData = monthExpenses.map(exp => ({
    name: exp.name,
    value: exp.amount,
    svg: {
      fill: colors[Math.floor(Math.random() * colors.length)],
      onPress: () => {
        setLabel(exp.name);
        setValue(exp.amount);
      },
    },
    key: `pie-${exp.id}`,
  }));

  console.log('pie', props);
  return (
    <View style={{justifyContent: 'center'}}>
      <PieChart
        valueAccessor={({item}) => item.value}
        outerRadius={'95%'}
        innerRadius={'80%'}
        spacing={0}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height / 3,
          justifyContent: 'flex-start',
        }}
        data={pieData}
      />
      <Text
        onLayout={({
          nativeEvent: {
            layout: {width},
          },
        }) => {
          setLabelWidth(width);
        }}
        style={{
          fontSize: 24,
          position: 'absolute',
          left: deviceWidth / 2 - labelWidth / 2,
          textAlign: 'center',
          color: '#3C3744',
        }}>
        {`${label} \n $ ${props.balance}`}
      </Text>
    </View>
  );
};

const msp = state => {
  return {
    expenses: state.expenses,
    user: state.user,
  };
};

export default connect(msp)(PieChartExample);
