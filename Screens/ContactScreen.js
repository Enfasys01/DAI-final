import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import * as Contacts from 'expo-contacts'
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

const Contact = (props)=>{
  console.log(props)
  return (
    <Text>{props.data.item.name}</Text>
  )
}

const ContactScreen = ({navigation}) => {
  const [contacts, setContacts] = useState([])
  useEffect(() => {
    getContacts().then(res=>{setContacts(res)})
  }, []);

  const render = (data)=>(
    <Contact data={data}/>
  )

  return(
    <>
      <View style={styles.container}>
        <Text>This is the Contacts Screen</Text>
        <Button title="Go back" onPress={()=>{navigation.goBack()}}/>
        <FlatList data={contacts} renderItem={render} keyExtractor={item=>item.id}/>
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

export default ContactScreen;