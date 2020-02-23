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
  import CreditCard from 'react-native-credit-card';
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


function RewardScreen({navigation}){
    
    const [list,setlist] = useState([])
    const [clist,setclist] = useState([])

    useEffect(()=>{
        axios
        .post(
          "https://do1cn64pti.execute-api.us-east-1.amazonaws.com/v0/get-rewards"
        )
        .then(({ data }) => {
          console.log(data)
          setlist(data.rewards);
        });
    }, []);
    useEffect(()=>{

     axios
        .post(
          "https://do1cn64pti.execute-api.us-east-1.amazonaws.com/v0/get-claimed"
        )
        .then(({ data }) => {
          console.log(data)
          setlist(data.claimed);
        });
    }, []);
  

    return(
        <View style={{flex:1}}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
      

{
        <AppleHeader
        dateTitle='23rd February 2020'
        largeTitle="Vissa's Card"
        source= {{ uri: 'https://scontent-sin6-2.xx.fbcdn.net/v/t1.0-9/45502846_10217189090815384_3923962682327171072_n.jpg?_nc_cat=108&_nc_ohc=YAJPDAX9Rv8AX8gJIlo&_nc_ht=scontent-sin6-2.xx&oh=e89b63287d99f98d214723e5bb965f12&oe=5EBF6FF4'}}        />

}
      </SafeAreaView>

      <CreditCard
 style={{marginVertical: 10, marginHorizontal: 10, marginBottom: 0, elevation: 3, alignSelf: 'center'}}

    type={'visa'}
    imageFront={require('../images/card-front.png')}
    imageBack={require('../images/card-back.png')}

    shiny={false}
    bar={true}    
    number={'7897783733787338'}
    name='Prashant Vissa'
    expiry={'05/24'}
    cvc='***'
    />
 <Text style={{ alignSelf:'center',paddingTop:120 ,fontSize:20}}> 7897  7837  3378  7338  </Text>
 <Text style={{ alignSelf:'flex-end',paddingTop:10,paddingRight:100}}>    06/2022</Text>
  <Text style={{ alignSelf:'flex-end',paddingTop:10,paddingRight:100}}>  </Text>

<Card title="Your Reward Transactions">
<ScrollView style={{ height:430}}>
        {
          list.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.Image }}}
              title={l.Date.substring(0,16)}
              subtitle={l.Start.substring(0,30) + '... ->' +l.End.substring(0,30) + '...' }
              rightSubtitle={<Text style={{ color: 'green'}} >Rs. {l.Reward_value}</Text>}
              bottomDivider
            />
          ))
        }
        {
          clist.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.Image }}}
              title={'Claims'}
              subtitle={l.Product_description.substring(0,30)  }
              rightSubtitle={<Text style={{ color: 'red'}} >Rs. {l.Claimed_value}</Text>}
              bottomDivider
            />
          ))
        }
    </ScrollView>
    </Card>
          </View>

    )
};

export default withTheme(RewardScreen);

const styles = StyleSheet.create({
  container: {}
});
