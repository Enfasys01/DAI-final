import { StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {
  return(
    <>
      <View style={styles.container}>
        <Text>This is the Homescreen</Text>
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