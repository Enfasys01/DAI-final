import { useContext } from "react";
import { Button, Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import BackgroundContext from "../Context/BackgroundContext";

const HomeScreen = ({navigation}) => {
  const [bg, setBg] = useContext(BackgroundContext)
  return(
    <>
        <ImageBackground source={{uri: bg}} resizeMode='cover' style={styles.container}>

        <Text>This is the Homescreen</Text>
        <Button onPress={()=>{navigation.navigate('Contacts')}} title='Go to contacts'/>
        <Button onPress={()=>{navigation.navigate('About')}} title='Go to about'/>
        <Button onPress={()=>{navigation.navigate('Emergency Number')}} title='Go to Emergency Number Settings'/>
        <Button onPress={()=>{navigation.navigate('Time And Weather')}} title='Go to Time And Weather'/>
        <Button onPress={()=>{navigation.navigate('Change Background')}} title='Go to Background Settings'/>

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

export default HomeScreen;