import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image,TouchableOpacity, Alert } from 'react-native';
import { useContext, useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

import { CameraType } from 'expo-camera/build/Camera.types';
import BackgroundContext from '../Context/BackgroundContext';

export default function ChangeBackGround() {
  const [bg, setBg] = useContext(BackgroundContext)
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [type,setType]=useState(Camera.Constants.Type.back)
  const [flash,setFlash] = useState(Camera.Constants.FlashMode.off)

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        Alert.alert("Background updated")
        console.log(photo.uri)
        setBg(photo.uri)
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <TouchableOpacity style={styles.share} onPress={sharePic} ><Text>Share</Text></TouchableOpacity>
        {hasMediaLibraryPermission ? 
        <TouchableOpacity style={styles.boton2} onPress={savePhoto} ><Text style={{fontSize:30}}>Guardar</Text></TouchableOpacity> : undefined}
        <TouchableOpacity style={styles.atras} onPress={() => setPhoto(undefined)} ><Text>Go back</Text></TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <Camera flashMode={flash} type={type} style={styles.container} ref={cameraRef}>
      <View>
        <TouchableOpacity style={styles.boton} onPress={takePic}></TouchableOpacity>
        <TouchableOpacity style={styles.boton3} onPress={()=>{
          setType(type===CameraType.back? CameraType.front : CameraType.back)
        }}><Text>Change camera</Text></TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  atras:{
    padding:20,
    borderRadius:3,
    position:"absolute",
    bottom:85+"%",
    right:80+"%"
  },
  share:{
    padding:20,
    borderRadius:3,
    position:"absolute",
    bottom:85+"%",
    right:0,
  },
  boton:{
    backgroundColor:"#fff",
    padding:40,
    borderRadius:100,
    position:"absolute",
    top:240,
    left:-40
    
  },
  boton3:{
    padding:40,
    borderRadius:100,
    position:"absolute",
    top:223,
    right:25+"%"
  },
  boton4:{
    padding:40,
    borderRadius:100,
    position:"absolute",
    top:223,
    left:25+"%"
  },
  boton2:{
    backgroundColor:"#fff",
    paddingTop:10,
    paddingBottom:10,
    padding:25,
    borderRadius:10,
    position:"absolute",
    top:90+"%",
    
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  }
});
