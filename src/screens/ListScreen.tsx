import React from 'react';
import {SafeAreaView, StyleSheet, ImageBackground} from 'react-native';
import List from '../components/List';

const ListScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/backgroundImage/img.jpg')}
        resizeMode="cover"
        style={styles.img}>
        <List />
      </ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    height: '100%',
  },
});
export default ListScreen;
