import React, {useState} from 'react';
import {Text, View, Dimensions, Animated} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import styles from '../styles';

const RenderLeft = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0.5, 50],
    outputRange: [0.1, 1],
  });

  const Style = {
    transform: [
      {
        scale,
      },
    ],
  };

  return (
    <View
      style={{
        width: 80,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Animated.Text style={[Style, {color: '#fff', fontWeight: '600'}]}>
        Delete
      </Animated.Text>
    </View>
  );
};

const Item = ({item, onPress}) => (
  <Swipeable
    useNativeAnimations
    overshootLeft={false}
    onSwipeableLeftOpen={() => deleteItem(item.id)}
    renderLeftActions={RenderLeft}>
    <View style={styles.item}>
      <View style={styles.card}>
        <Text style={{fontWeight: '600'}}>{item.name}</Text>
        <Text style={{fontSize: 12}}>{item.contact}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 5,
        }}>
        <Text>{item.email}</Text>
      </View>
    </View>
  </Swipeable>
);
export default Item;
