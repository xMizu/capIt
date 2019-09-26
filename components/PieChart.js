import React, {useState} from 'react';
import {connect} from 'react-redux';
import {PieChart} from 'react-native-svg-charts';
import {Dimensions, View, Text} from 'react-native';

const PieChartExample = props => {
  [label, setLabel] = useState('Balance');
  [value, setValue] = useState(props.balance);
  [labelWidth, setLabelWidth] = useState(0);
  // state = {
  //   selectedSlice: {
  //     label: 'Balance',
  //     value: this.props.user.balance,
  //   },
  //   labelWidth: 0,
  // };

  // useEffect(() => {
  //   if (!props.balance === null) {
  //     setValue(props.balance);
  //   }
  // }, []);

  // const {labelWidth, selectedSlice} = this.state;
  // const {label, value} = selectedSlice;
  const newData = props.expenses;
  const colors = ['#600080', '#9900cc', '#c61aff', '#d966ff', '#ecb3ff'];

  const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
      0,
      7,
    );

  const deviceWidth = Dimensions.get('window').width;

  const pieData = newData.map(exp => ({
    name: exp.name,
    value: exp.amount,
    svg: {
      fill: colors[Math.floor(Math.random() * colors.length)],
      onPress: () => {
        setLabel(exp.name);
        setValue(exp.amount);
        // this.setState({selectedSlice: {label: exp.name, value: exp.amount}}),
      },
    },
    key: `pie-${exp.id}`,
  }));
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
          // this.setState({labelWidth: width});
        }}
        style={{
          fontSize: 24,
          position: 'absolute',
          left: deviceWidth / 2 - labelWidth / 2,
          textAlign: 'center',
        }}>
        {`${label} \n ${value}`}
      </Text>
    </View>
  );
};

const msp = state => {
  return {
    expenses: state.expenses,
    user: state.user,
    balance: state.balance,
  };
};

export default connect(msp)(PieChartExample);
