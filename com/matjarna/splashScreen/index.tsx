import React, {useEffect} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {ImageBackground, StyleSheet, StatusBar} from 'react-native';

type SplashScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

const Splash = ({navigation}: SplashScreenProps) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'login'}],
      });
    });
  }, [navigation]);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('./splashScreen.png')}
        style={styles.backgroundImage}
      />
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
