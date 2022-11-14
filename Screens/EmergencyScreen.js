import { Button, FlatList, ImageBackground, StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect, useState, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundContext from "../Context/BackgroundContext";


const EmergencyScreen = ({navigation}) => {
  const [bg, setBg] = useContext(BackgroundContext)

    const [number, setNumber] = useState("");
    const[val, setVal] = useState(0)
    const[err, setErr] = useState('')
    
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
        // value previously stored
        return value
      }
    } catch(e) {
      // error reading value
    }
  }
  useEffect(()=>{
    getData().then(val=>{setVal(val)})
  },[number])

    const handleButton = ()=>{
      if(number.length>=8){
        storeData(number).then(()=>{getData().then(val=>{setVal(val)})})
        setErr('')
      }else{
        setErr('The phone number must have at least 8 digits')
      }
    }
    return(
    <>
<ImageBackground source={{uri: bg}} resizeMode='cover' style={styles.container}>
          <Text>This is the Emergency Number Screen</Text>
        <Button title="Go back" onPress={()=>{navigation.goBack()}}/>
        <TextInput
        onChangeText={setNumber} value={number} placeholder='Enter Emergency Number' keyboardType="numeric"/>
        {err!=''?<Text>{err}</Text>:''}
        <Button title="enter" onPress={handleButton}/>
        <Text>Current emergency number: {val}</Text>
      </ImageBackground>
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