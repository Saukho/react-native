import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity} from 'react-native';
import AddBoot from './components/AddBoot';
import UpdateBoot from './components/UpdateBoot';
import {init,addBoot,updateBoot,deleteBoot} from './database/db.js';

init().then(() => {
  console.log('database loaded successfully')
}).catch((err) => {
  console.log('database error: ' + err);
})

const App = () => {
  const [bootList, addBootList] = useState([]);
  const [modalVisible, setModalVisible]=useState(false);
  const [updateModalVisible, setUpdateModalVisible]=useState(false);
  const [bootToUpdate, setBootToUpdate]=useState();
  const [bootToUpdateIndex, setBootToUpdateIndex]=useState();

  
async function saveBoot(boot){
  try {
     const saveBoot = await addBoot(boot);
     console.log('saveBoot' + saveBoot.boot.toString());
 }catch (err){
   console.log('saveBoot error: ' + err);
 }
}


  const bootDataHandler = (id, type) => {
    addBootList(bootList => [...bootList, {id:id,type:type}]);
    setModalVisible(false);
  };
  const bootUpdateHandler = (id, type) => {
    bootList[bootToUpdateIndex]={id:id, type:type};
    addBootList(bootList);
    setUpdateModalVisible(false);
  };
  const deleteBoot=(removeId)=>{
    addBootList(bootList=>bootList.filter((boot, index)=>index!=removeId));
  };
  const showInputModal=()=>{
    setModalVisible(true);
  }
  const hideInputModal=()=>{
    setModalVisible(false);
  }
  const hideUpdateModal=()=>{
    setUpdateModalVisible(false);
  }
  const updateBoot=(index)=>{
    setBootToUpdateIndex(index);
    setBootToUpdate(bootList[index]);
    setUpdateModalVisible(true);
  }
  return (
    <View style={styles.container}>
      <AddBoot visibility={modalVisible} bootDataHandler={bootDataHandler} hideInputModal={hideInputModal}/>
      <UpdateBoot visibility={updateModalVisible} bootUpdateHandler={bootUpdateHandler} bootToUpdate={bootToUpdate} hideUpdateModal={hideUpdateModal}/>
      <Button onPress={showInputModal} title="Add boot" />
      <Text>Boot list</Text>
      <ScrollView style={styles.scrollviewstyle}>
        {bootList.map((item, index) => (
          <TouchableOpacity key={index} onLongPress={()=>deleteBoot(index)} onPress={()=>updateBoot(index)}>
          <View style={styles.listitemstyle}>
            <Text>
              {item.id}: {item.type}
            </Text>
          </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textinput: {
    backgroundColor: 'lightblue',
    width: '70%',
    borderColor: 'black',
    borderWidth: 2,
  },
  inputstyle: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonstyle: {
    width: '20%',
  },
  listitemstyle: {
    backgroundColor: 'lightgreen',
    width: '90%',
    borderColor: 'red',
    borderWidth: 2,
    margin: 5,
  },
  scrollviewstyle:{
    width:'80%',
  },  
});

export default App;