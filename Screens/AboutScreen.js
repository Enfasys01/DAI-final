import { Button, Image, StyleSheet, Text, View } from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useEffect, useState } from "react";


const AboutScreen = ({navigation}) => {
  //qr stuff
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [page, setPage] = useState(true)
  const qrData = 'hola'
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`${data}`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  //qr stuff


  return(
    <>
      <View style={styles.container}>
        <Text>This is the AboutScreen</Text>
        <Button onPress={()=>{navigation.goBack()}} title='Go Back'/>
        <Button title={page==true?'View QR':'Scan QR'} onPress={()=>{setPage(!page)}}/>
        {page==true?
          <>
          <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{width:"100%", height:500}}
          />
          {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
          </>
          :
          <>
          <Image source={require('../assets/qr.png')} style={styles.image}/>
          </>
          }

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
  },image: {
    flex: 1,
    width: '60%',
    height: null,
    resizeMode: 'contain'
}
});

export default AboutScreen;