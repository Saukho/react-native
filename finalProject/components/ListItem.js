import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';

export default function ListItem({item, handLeft, handRight}) {
  function LeftActions(progress, dragX) {
    const scale = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.LeftAction}>
        <Animated.Text style={[styles.LeftActionText, {transform: [{scale}]}]}>
          Remove user
        </Animated.Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderLeftActions={LeftActions}
        onSwipeableLeftOpen={handLeft}
        onSwipeableOpen={handRight}>
        <View style={styles.container}>
          <Text style={styles.text}>{item.name}</Text>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#FFF',
  },
  text: {
    fontSize: 17,
    color: '#222',
  },
  LeftAction: {
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: '100%',
  },
  LeftActionText: {
    color: '#FFF',
    padding: 10,
    fontWeight: 'bold',
    fontSize: 25,
  },
});
