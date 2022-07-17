import React from 'react';
import {View, Text, Animated, Dimensions} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
const {width, height} = Dimensions.get('screen');
import styles from '../styles';

const RenderRight = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [-50, 0.5],
    outputRange: [1, 0.1],
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
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Animated.Text style={[Style, {color: '#fff', fontWeight: '600'}]}>
        Delete
      </Animated.Text>
    </View>
  );
};

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
        Like
      </Animated.Text>
    </View>
  );
};

const Item = ({item, onPress}) => (
  <Swipeable
    useNativeAnimations
    overshootLeft={false}
    renderLeftActions={RenderLeft}
    overshootRight={false}
    onSwipeableRightOpen={() => deleteItem(item.id)}
    renderRightActions={RenderRight}>
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
