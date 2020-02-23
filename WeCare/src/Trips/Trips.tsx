import  React,{Component, PureComponent, useState} from 'react';
import { Text, View, StyleSheet,ScrollView,Image, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Theme, withTheme, Button,} from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationNativeContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ListItem,Header } from 'react-native-elements'
import { navigate } from '@react-navigation/core/lib/typescript/CommonActions';
import { NavigationActions, SafeAreaView, } from 'react-navigation';
import {
    AppleHeader,
    ModernHeader,
    ClassicHeader
  } from "@freakycoder/react-native-header-view";
import { createAppContainer } from 'react-navigation';
import { RNCamera, FaceDetector } from 'react-native-camera';
import { RNS3 } from 'react-native-s3-upload';
import { useEffect } from 'react';
import axios from 'axios';

const optionss3 = {
  keyPrefix: "uploads/",
  bucket: "mshack2020",
  region: "us-east-1",
  accessKey: "AKIAXNIJRZLYFV575QRF",
  secretKey: "1q4sWkCkNxa+DnWSZ7zdmAY5fcZ8juYK849dY+w1",
  successActionStatus: 201
}

class ExampleApp extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: false };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      RNS3.put({
        uri: data.uri,
        name: "image.jpg",
        type: "image/jpg"
      
      }, optionss3).then(response => {
        if (response.status !== 201)
          throw new Error("Failed to upload image to S3");
        console.log(response.body);
        axios
        .post(
          "https://do1cn64pti.execute-api.us-east-1.amazonaws.com/v0/get-ocr-data",{
            'type':'ocr',
            'path' : 'https://mshack2020.s3.amazonaws.com/uploads/image.jpg'

        })
        .then(({ data }) => {
          console.log(data)
        });
    }, []);
      
    }
  };
}


interface Props {
  theme: Theme;
}

  
  
interface TripsComponentProps {
    theme: Theme;
}

    

function TripsAPI({navigation}){
  const [list, setlist] = useState([]);

useEffect(() => {

  axios
      .post(
        "https://do1cn64pti.execute-api.us-east-1.amazonaws.com/v0/get-trips"
      )
      .then(({ data }) => {
        console.log(data)
        setlist(data.trips);
      });
  }, []);


    return(
        <View style={{flex:1}}>
      <SafeAreaView>
      

      {
              <AppleHeader
              dateTitle='23rd February 2020'
              largeTitle="Your Trips"
              source= {{ uri: 'https://scontent-sin6-2.xx.fbcdn.net/v/t1.0-9/45502846_10217189090815384_3923962682327171072_n.jpg?_nc_cat=108&_nc_ohc=YAJPDAX9Rv8AX8gJIlo&_nc_ht=scontent-sin6-2.xx&oh=e89b63287d99f98d214723e5bb965f12&oe=5EBF6FF4'}}        />
      
      }
            </SafeAreaView>
      
<Button onPress={() => {navigation.navigate('Camera')}}> Add Bus trip </Button>
        <ScrollView>
        {
          list.map((l, i) => (
            
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.Image }}}
              title={l.Date.substring(0,16)}
              subtitle={l.Start.substring(0,30) + '... ->' +l.End.substring(0,30) + '...' }
              rightSubtitle={<Text style={{ color: 'green'}} >Rs. {l.Cost}</Text>}
              bottomDivider
            />
          ))
        }
    </ScrollView>
      </View>
    )
};
const Stack = createStackNavigator();
function TripsApp1({theme}: Props) {
  return (
    <NavigationNativeContainer>
      <Stack.Navigator initialRouteName="TripsHome">
        <Stack.Screen options={{header: null}} name="TripsHome" component={TripsAPI} />
      
        <Stack.Screen name="Camera" component={ExampleApp}  />
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
}


export default withTheme(TripsApp1);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  capture:{
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,

  }
 
})