import React, {useState} from 'react';
import {ProgressCircle} from 'react-native-svg-charts';
import {
  Text,
  View,
  Dimensions,
  Button,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';

const ExpenseProgress = props => {
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
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const [modal, setModal] = useState(false);
  const endDate = new Date(props.savings.end);
  const today = new Date();

  const dateDiffInDays = (a, b) => {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  };

  const startDate = start => {
    const a = new Date(start);
    return `${months[a.getMonth()]} ${a.getDate()}, ${a.getFullYear()}`;
  };

  const toggleModal = () => setModal(!modal);
  console.log('exp', props);
  return (
    <>
      <View key={props.savings.id} style={{marginVertical: 10}}>
        <Text
          style={{
            fontSize: 24,
            textAlign: 'center',
            marginVertical: 5,
            color: '#3C3744',
          }}>
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
          progressColor={
            props.savings.savings - props.savings.expenses > 0
              ? '#A5FFD6'
              : '#FFA69E'
          }
          startAngle={-Math.PI}
          endAngle={Math.PI}
        />
        <Text
          style={{
            zIndex: 30,
            fontSize: 24,
            position: 'absolute',
            textAlign: 'center',
            alignSelf: 'center',
            width: 180,
            top: 125,
            color:
              props.savings.savings - props.savings.expenses > 0
                ? '#84DCC6'
                : '#FF686B',
          }}
          onPress={toggleModal}>
          {`$ ${props.savings.savings - props.savings.expenses}`}
        </Text>
        <TouchableWithoutFeedback onPress={toggleModal}>
          <Modal
            isVisible={modal}
            animationIn="wobble"
            animationOut="slideOutDown">
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                backgroundColor: '#EFEFEF',
                height: 200,
                width: 300,
                borderRadius: 5,
                paddingHorizontal: 10,
              }}>
              <Text
                style={{textAlign: 'center', fontSize: 24, marginVertical: 5}}>
                {props.savings.name}
              </Text>
              <Text
                style={
                  styles.modalText
                }>{`Saving Limit: $${props.savings.savings}`}</Text>
              <Text
                style={
                  styles.modalText
                }>{`Total Spending: $${props.savings.expenses}`}</Text>
              <Text style={styles.modalText}>{`Start Date: ${startDate(
                props.savings.savingStart,
              )}`}</Text>
              <Text style={styles.modalText}>{`Days left: ${dateDiffInDays(
                today,
                endDate,
              )}`}</Text>
            </View>
          </Modal>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modalText: {
    fontSize: 18,
    marginVertical: 5,
    color: '#3C3744',
  },
});

export default ExpenseProgress;
