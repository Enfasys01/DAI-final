import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import ContactScreen from './Screens/ContactScreen';
import AboutScreen from './Screens/AboutScreen';
import EmergencyScreen from './Screens/EmergencyScreen';
import TimeAndWeather from './Screens/TimeAndWeather';
import ChangeBackGround from './Screens/ChangeBackGround';
import { BackgroundProvider } from './Context/BackgroundContext';
export default function App() {

  const Stack = createNativeStackNavigator();
  const [bg, setBg] = React.useState('file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fdai-final-38735539-3d35-4b77-b398-e1db183b142f/Camera/54836d05-0569-4f67-a449-f08f868acb3d.jpg')
  return (
    <BackgroundProvider value={[bg, setBg]}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Contacts" component={ContactScreen}/>
        <Stack.Screen name="About" component={AboutScreen}/>
        <Stack.Screen name="Emergency Number" component={EmergencyScreen}/>
        <Stack.Screen name="Time And Weather" component={TimeAndWeather}/>
        <Stack.Screen name="Change Background" component={ChangeBackGround}/>
      </Stack.Navigator>
    </NavigationContainer>
    </BackgroundProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
