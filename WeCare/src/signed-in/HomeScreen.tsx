import * as React from 'react';
import { Text, View, StyleSheet,ScrollView,Image, StatusBar, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Theme, withTheme,} from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ListItem,Header, Icon,Card } from 'react-native-elements'
import { navigate } from '@react-navigation/core/lib/typescript/CommonActions';
import { NavigationActions, SafeAreaView } from 'react-navigation';
import {
    AppleHeader,
    ModernHeader,
    ClassicHeader
  } from "@freakycoder/react-native-header-view";
  import { Col, Row, Grid } from "react-native-easy-grid";
import { useEffect, useState } from 'react';
import axios from 'axios'
interface HomeComponentProps {
    theme: Theme;
}
function renderitem() {
    return (
        <View >
            <Text >randome text</Text>
        </View>
    );
}
const ENTRIES1 = [
    {
        title: 'Avail 50% discount on your first 3 rides',
        illustration: 'https://images.unsplash.com/photo-1490650404312-a2175773bbf5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80'
    },
    {
        title: 'We recommend you take a bus to the Harlur bus stop, save 40%',
        illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
    },
    {
        title: 'Invite your friends, win a trip to Italy',
        illustration: 'https://i.imgur.com/MABUbpDl.jpg'
    },
    {
        title: 'Netflix releases a new show, arthos, Watch now!',
        illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
    }
];

    
function renderItem(item, index) {
    return (
        <View >
            <Card style={{ height:100}} image={{uri:item.illustration}}>
            <Text >{ item.title }</Text>
            <Image source={{ uri : item.illustration}}></Image>


            </Card>
        </View>
    );
}

function HomeScreen({navigation}){

    const [data,setdata] = useState({})
    
    useEffect(()=>{
        axios
        .post(
          "https://do1cn64pti.execute-api.us-east-1.amazonaws.com/v0/dashboard"
        )
        .then(({ data }) => {
          console.log(data)
          setdata(data);
        });
    }, []);
  
  

    return(
        <View style={{flex:1}}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
      

{
        <AppleHeader
        dateTitle='23rd February 2020'
        largeTitle="Vissa's Runs"
        source= {{ uri: 'https://scontent-sin6-2.xx.fbcdn.net/v/t1.0-9/45502846_10217189090815384_3923962682327171072_n.jpg?_nc_cat=108&_nc_ohc=YAJPDAX9Rv8AX8gJIlo&_nc_ht=scontent-sin6-2.xx&oh=e89b63287d99f98d214723e5bb965f12&oe=5EBF6FF4'}}        />

}
      </SafeAreaView>

<Grid style={{height:650}}>
    <Row style={{height:170}}>
         <Col size={60}>
    <Card title="Spends"  titleStyle={{ alignSelf:'flex-start'}}>
        <Text style={{alignSelf:'center',fontSize:25,color:'#006494'}}> {data.trips}</Text>
   </Card>
    </Col>
    <Col size={40}>
    <Card title="Trips" titleStyle={{ alignSelf:'flex-start'}}>
        <Text style={{alignSelf:'center',fontSize:25,color:'#006494'}}>{data.total}</Text>
    </Card>
    </Col>
    

    
</Row>

<Row style={{height:170}}>
     <Col size={40}>
    <Card title="Rewards"  titleStyle={{ alignSelf:'flex-start'}}>
    <Text style={{alignSelf:'center',fontSize:25,color:'#006494'}}>{data.rewards}</Text>

    </Card>
    </Col>
    <Col size={60}>
    <Card title="Ecoscore" titleStyle={{ alignSelf:'flex-start'}}>
    <Text style={{alignSelf:'center',fontSize:25,color:'#006494'}}> 670/780</Text>

    </Card>
    </Col>
</Row>

<Row style={{height:250}}>

<Carousel layout={'stack'} sliderHeight={250} sliderWidth={400} itemWidth={400} renderItem={({item, index}) => renderItem(item,index)}
 data={ENTRIES1}
 />

</Row>

    
</Grid>


          </View>

    )
};

export default withTheme(HomeScreen);

const styles = StyleSheet.create({
  container: {}
});
