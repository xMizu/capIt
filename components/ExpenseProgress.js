import React from 'react';
import {ProgressCircle} from 'react-native-svg-charts';
import {Text, View, Dimensions, ActionSheetIOS} from 'react-native';

const ExpenseProgress = props => {
  console.log('expenseCircle');

  return (
    <>
      <View key={props.savings.id} style={{marginVertical: 10}}>
        <Text style={{fontSize: 24, textAlign: 'center', marginVertical: 5}}>
          {props.savings.name}
        </Text>
        <ProgressCircle
          style={{
            height: 200,
            width: Dimensions.get('window').width,
          }}
          progress={
            props.savings.expenses === 0
              ? 0
              : props.savings.expenses / props.savings.savings < 1
              ? props.savings.expenses / props.savings.savings
              : 1
          }
          progressColor={'rgb(134, 65, 244)'}
          startAngle={-Math.PI}
          endAngle={Math.PI}
        />
        <Text
          style={{
            fontSize: 24,
            position: 'absolute',
            textAlign: 'center',
            width: '100%',
            top: 115,
            color:
              props.savings.savings - props.savings.expenses > 0
                ? 'green'
                : 'red',
          }}>
          {`$ ${props.savings.savings - props.savings.expenses}`}
        </Text>
      </View>
    </>
  );
};

export default ExpenseProgress;
