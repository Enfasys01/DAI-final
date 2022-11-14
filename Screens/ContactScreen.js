import { Button, FlatList, ImageBackground, StyleSheet, Text, View } from "react-native";
import * as Contacts from 'expo-contacts'
import { useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundContext from "../Context/BackgroundContext";


const getContacts = async () => {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status === 'granted') {
    const {data} = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    })
    return data
  }
}


const Contact = (props)=>{
  const [emergency, setEmergency] = useState(false)
  useEffect(()=>{
    if(props.data.item.phoneNumbers!=undefined){
      console.log(props.data.item.phoneNumbers.length)
      props.data.item.phoneNumbers.map(e=>{if(e.number.includes(props.emergency, 3)){setEmergency(true)}})
    }
  },[])
  return (
    <View>
      <Text>{props.data.item.name}
      <Text style={{color:'red'}}>{emergency==true?' (Emergency number)':''}</Text>
      </Text>
    </View>
    )
  }
  
  const ContactScreen = ({navigation}) => {
    const [bg, setBg] = useContext(BackgroundContext)

    const [contacts, setContacts] = useState([])
    const [emergency, setEmergency] = useState('')
    useEffect(() => {
      getContacts().then(res=>{setContacts(res)})
    }, []);
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
    useEffect(()=>{getData().then(val=>{setEmergency(val)})},[])
    const render = (data)=>(
      <Contact data={data} emergency={emergency}/>
      )
      
      return(
        <>
<ImageBackground source={{uri: bg}} resizeMode='cover' style={styles.container}>
        <Text>This is the Contacts Screen</Text>
        <Text>{emergency}</Text>
        <Button title="Go back" onPress={()=>{navigation.goBack()}}/>
        <FlatList data={contacts} renderItem={render} keyExtractor={item=>item.id}/>
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

export default ContactScreen;