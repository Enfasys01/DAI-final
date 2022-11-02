import { Button, StyleSheet, Text, View } from "react-native";

const HomeScreen = ({navigation}) => {
  return(
    <>
      <View style={styles.container}>
        <Text>This is the Homescreen</Text>
        <Button onPress={()=>{navigation.navigate('Contacts')}} title='Go to contacts'/>
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

export default HomeScreen;