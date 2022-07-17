import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from '../styles';

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.name}</Text>
    <Text style={[styles.title, textColor]}>{item.contact}</Text>
  </TouchableOpacity>
);

export default Item;
