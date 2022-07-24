/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component, useState, useCallback } from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ListItem from './ListItem';

const SwipeableList = props => {
  const [data, setData] = useState();
  const [enable, setEnable] = useState();
  const renderSeparator = useCallback(() => {
    return <View style={styles.separatorViewStyle}>
        <View style={styles.separatorStyle} />
      </View>;
  });
  const success = useCallback(() => {
    const data = data.filter(item => item.key !== key);
    setData(data);
  });
  const setScrollEnabled = useCallback(() => {
    setEnable(enable);
  });
  const renderItem = useCallback(() => {
    return <ListItem text={item.key} success={success} setScrollEnabled={enable => setScrollEnabled(enable)} />;
  });
  return <FlatList style={props.style} data={data} ItemSeparatorComponent={renderSeparator} renderItem={({
    item
  }) => renderItem(item)} scrollEnabled={enable} />;
};

export default SwipeableList;

const styles = StyleSheet.create({
  separatorViewStyle: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  separatorStyle: {
    height: 1,
    backgroundColor: '#000',
  },
});
