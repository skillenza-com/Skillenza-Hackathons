import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Theme, withTheme, Text} from 'react-native-paper';
import SignedInStack from './ProfileStack'
import {StyleSheet, View} from 'react-native';
import { createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import TripsApp from '../Trips/Trips'
import HomeScreen from './HomeScreen'
import React, {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RewardScreen from './RewardScreen'
function tempApp(){
    return(
        <View style={{flex:1,alignItems:'center'}}
        ><Text style={{backgroundColor:'#34535'}} >temporary</Text></View>
    )
}





  
const TabNav =  createBottomTabNavigator({
  Trips : { screen: withTheme(TripsApp) },
  Home: { screen: HomeScreen },
  Wallet: { screen: RewardScreen },
}, {
  initialRouteName: 'Home',

    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let FontistoComponent = Fontisto;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'ios-home';
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          return <IconComponent name={iconName} size={25} color={tintColor} />;

        } else if (routeName === 'Wallet') {
          iconName = `ios-wallet`;
          return <IconComponent name={iconName} size={25} color={tintColor} />;

        }
        else if (routeName === 'Trips') {
            iconName = `navigate`;
          return <FontistoComponent name={iconName} size={25} color={tintColor}/>;

          }

        // You can return any component that you like here!
      },
    }),
    tabBarOptions: {
      activeTintColor: '#006494',
      inactiveTintColor: '#22181C',
    },
  });



  
export default createAppContainer(TabNav);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
   
  });