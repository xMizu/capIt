import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

const Loader = props => {
  console.log('loader');
  return (
    <View style={styles.page}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'rgba(0,0,0,.4)',
    zIndex: 0,
    flex: 1,
    justifyContent: 'center',
  },
});
export default Loader;
