import React, { Component }  from 'react';
import {  View, StyleSheet } from 'react-native';



import {Theme, withTheme, Text} from 'react-native-paper';
import TripsComponent from '../Explore/Tips'
import Swiper from 'react-native-swiper'


interface tripsAPIProps {
  theme:Theme;
}


const TripsAPI = ({theme}: tripsAPIProps) => {
  return (
    <View style={styles.container}>
      <Swiper style={styles.wrapper} showsButtons={false} horizontal={false} showsPagination={false} loop={false}
>
        <View style={[styles.slide1,{backgroundColor:theme.colors.primary}]}>
          <TripsComponent/>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </Swiper>
    </View>
  );
};

export default TripsAPI;

const styles = StyleSheet.create({
  container: {
      flex:1,
  },
  wrapper:{},
  
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});
