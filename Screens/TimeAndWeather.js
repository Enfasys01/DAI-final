import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import * as Location from 'expo-location';
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import BackgroundContext from "../Context/BackgroundContext";


const TimeAndWeather = ({navigation}) =>{
  const [bg, setBg] = useContext(BackgroundContext)

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [response, setResponse] = useState(null);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location.coords.latitude)
      let lat= location.coords.latitude
      let lon = location.coords.longitude
      const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&APPID=467eb2e2a1738c82e813a30610d7c354')
      console.log(data)
      setResponse(data)
    })();
  }, []);
  useEffect(()=>{
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    setCurrentDate(
      hours + ':' + min
    );
  },[])

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return(
    <>
<ImageBackground source={{uri: bg}} resizeMode='cover' style={styles.container}>
          <Text>This is the Time And Weather Screen</Text>
        <Button title="Go back" onPress={()=>{navigation.goBack()}}/>
        <Text>{currentDate}</Text>
        {response!==null?
        <View>
          <Text>{response.name}</Text>
          <Text>{Math.round(response.main.temp-273.15)}</Text>
        </View>
        :<Text>Loading...</Text>}
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

export default TimeAndWeather