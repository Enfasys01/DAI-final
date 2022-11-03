import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as Contacts from 'expo-contacts'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";

const getContacts = async () => {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status === 'granted') {
    const {data} = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Emails],
    })
    return data
  }
}


const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      // saving error
    }
  }


const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
        return(value)
        // value previously stored
      }
    } catch(e) {
        return('shit')
      // error reading value
    }
  }

  
const EmergencyScreen = ({navigation}) => {
    const [contacts, setContacts] = useState([])
    useEffect(() => {
        getContacts().then(res=>{setContacts(res)})
    }, []);
    
    const [number, setNumber] = useState("");
    const[val, setVal] = useState(0)
    useEffect(()=>{getData().then(res=>setVal(res))},[])
    const setNewNumber = () =>{
        storeData(number)
    }
  return(
    <>
      <View style={styles.container}>
        <Text>This is the Emergncy Number Screen</Text>
        <Button title="Go back" onPress={()=>{navigation.goBack()}}/>
        <TextInput
        onChangeText={setNumber} value={number} placeholder='Enter Emergency Number' keyboardType="numeric"/>
        <Button title="enter" onPress={setNewNumber}/>
        <Text>{number}</Text>
        <Text>{val}</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop:10,
    paddingHorizontal:5,
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
  },
});

export default EmergencyScreen;