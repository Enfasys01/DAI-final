import { Button, StyleSheet, Text, View } from "react-native";
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

const ContactScreen = ({navigation}) => {
  const [contacts, setContacts] = useState([])
  useEffect(() => {
    getContacts().then(res=>{setContacts(res)})
  }, []);
  return(
    <>
      <View style={styles.container}>
        {contacts.map((e)=>{return(
          <Text>{e.name}</Text>
        )
        })}
        <Text>This is the Contacts Screen</Text>
        <Button title="Go back" onPress={()=>{navigation.goBack()}}/>
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