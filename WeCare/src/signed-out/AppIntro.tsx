/*This is an example of React Native App Intro Slider */
import React from 'react';
//import react in project 

import { StyleSheet, View, Text,ActivityIndicator } from 'react-native';
//import all the required component

import AppIntroSlider from 'react-native-app-intro-slider';
//import AppIntroSlider to use it
import {NavigationParams} from 'react-navigation';
import {Button, Theme, withTheme} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import SignedOutStack from './Stack'


interface Props {
    theme: Theme;
  }

  


 class AppIntro extends React.Component<Props,Theme> {
  constructor(props:Props) {
    super(props);
    this.state = {
      showRealApp: false,
      loading: true,
      //To show the main page of the app
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('first_time').then((value) => {
      this.setState({ showRealApp: !!value, loading: false });
    });
  }
  _onDone = () => {
    // After user finished the intro slides. Show real app through
    // navigation or simply by controlling state
    AsyncStorage.setItem('first_time', 'true').then(() => {
      this.setState({ showRealApp: true });
    });
  };

  _onSkip = () => {
    // After user skip the intro slides. Show real app through
    // navigation or simply by controlling state
    AsyncStorage.setItem('first_time', 'true').then(() => {
      this.setState({ showRealApp: true });
    });
  };
  render() {
    //If false show the Intro Slides
    if (this.state.loading) return <ActivityIndicator size="large" />

 //If false show the Intro Slides
 if (this.state.showRealApp) {
    //Real Application
    return (
        <SignedOutStack />
        );
  } else {
      return (
    //Intro slides      return (
        <AppIntroSlider 
          style = {styles.container}
          slides={slides}
          //comming from the JsonArray below
          onDone={this._onDone}
          //Handler for the done On last slide
          showSkipButton={true}
          onSkip={this._onSkip}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
        flex: 1,

      },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: 16,
  },
});

const slides = [
  {
    key: 's1',
    text: 'Best Recharge offers',
    title: 'Mobile Recharge',
    titleStyle: styles.title,
    textStyle: styles.text,
    image: {
      uri:
        'http://aboutreact.com/wp-content/uploads/2018/08/mobile_recharge.png',
    },
    imageStyle: styles.image,
    backgroundColor: '#20d2bb',
  },
  {
    key: 's2',
    title: 'Flight Booking',
    titleStyle: styles.title,
    text: 'Upto 25% off on Domestic Flights',
    image: {
      uri:
        'http://aboutreact.com/wp-content/uploads/2018/08/flight_ticket_booking.png',
    },
    imageStyle: styles.image,
    backgroundColor: '#febe29',
  },
  {
    key: 's3',
    title: 'Great Offers',
    titleStyle: styles.title,
    text: 'Enjoy Great offers on our all services',
    image: {
      uri: 'http://aboutreact.com/wp-content/uploads/2018/08/discount1.png',
    },
    imageStyle: styles.image,
    backgroundColor: '#22bcb5',
  },
  {
    key: 's4',
    title: 'Best Deals',
    titleStyle: styles.title,
    text: ' Best Deals on all our services',
    image: {
      uri: 'http://aboutreact.com/wp-content/uploads/2018/08/best_deals1.png',
    },
    imageStyle: styles.image,
    backgroundColor: '#3395ff',
  },
  {
    key: 's5',
    title: 'Bus Booking',
    titleStyle: styles.title,
    text: 'Enjoy Travelling on Bus with flat 100% off',
    image: {
      uri:
        'http://aboutreact.com/wp-content/uploads/2018/08/bus_ticket_booking.png',
    },
    imageStyle: styles.image,
    backgroundColor: '#f6437b',
  },
  {
    key: 's6',
    title: 'Train Booking',
    titleStyle: styles.title,
    text: ' 10% off on first Train booking',
    image: {
      uri:
        'http://aboutreact.com/wp-content/uploads/2018/08/train_ticket_booking.png',
    },
    imageStyle: styles.image,
    backgroundColor: '#febe29',
  },
];

export default withTheme(AppIntro);