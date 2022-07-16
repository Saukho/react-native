/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {init,addStudent,updateStudent,deleteStudent} from './database/db.js';

init().then(() => {
  console.log('database loaded successfully')
}).catch((err) => {
  console.log('database error: ' + err);
})




const App= () => {

const [students, setStudents] = useState([])
const [updateModalVisible, setUpdateModalVisible]=useState(false);
const [studentUpdate, setStudentUpdate]=useState();
const [studentUpdateIndex, setStudentUpdateIndex]=useState();

const updateStudent = () => {
console.log('====================================');
console.log('updateStudent');
console.log('====================================');
}
const deleteStudent = () => {
  console.log('deleteStudent');
}
  return (
    <View style={styles.container}>
    <Text style={styles.sectionTitle}>Collect partisipants students</Text>
    <ScrollView style={styles.flexRow}>
        <View >
        <TouchableOpacity onLongPress={()=>deleteStudent()} onPress={()=>updateStudent()}><Text>TOUCH</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </View>

      );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  flexRow: {
    flexDirection: "row"
  },
  input: {
    borderColor: "#4630eb",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8
  },
});

export default App;
