import React from 'react';
import {SectionList, Text, StyleSheet} from 'react-native';

const ExpenseSection = props => {
  return (
    <SectionList
      sections={[
        {
          title: `${props.month} ${props.year}`,
          data: props.monthlyExpense,
        },
      ]}
      renderItem={({item}) => {
        let day = new Date(item.created_at);
        return (
          <Text style={styles.item}>{`${props.month.slice(
            0,
            3,
          )} ${day.getDate()} $${item.amount} - ${item.name}`}</Text>
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
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default ExpenseSection;
