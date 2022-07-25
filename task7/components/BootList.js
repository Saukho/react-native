import React from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';

const listViewItemSeparator = () => {
  return (
    <View
      style={{
        display: 'flex',
        height: 1,
        backgroundColor: '#666',
      }}
    />
  );
};

const BootList = props => {
  return (
    <FlatList
      data={props.bootList}
      ItemSeparatorComponent={listViewItemSeparator}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <TouchableOpacity
          key={item.id}
          onLongPress={() => removeBoot(item.id)}
          onPress={() => updateBoot(item.id)}>
          <View style={styles.buttonsContainer}>
            <Text>{item.id}</Text>
            <Text>{item.type}</Text>
            <Text>{item.size}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default BootList;
