import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

const UserInfo = (props: any) => {
  return (
    <View style={styles.userInfoBody}>
      <Image
        source={require('../assets/images/background.png')}
        style={styles.userInfoImage}
      />
      <View style={styles.userInfoNameEmail}>
        <Text style={styles.userInfoName}>Andrea Hirata</Text>
        <Text style={styles.userInfoEmail}>hirata@gmail.com</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoBody: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 20,
    alignItems: 'center',
  },
  userInfoImage: {
    aspectRatio: 1,
    width: 65,
    height: 65,
    borderRadius: 50,
  },
  userInfoName: {
    fontSize: 15,
    fontFamily: 'DMSansRegular',
    color: '#000000',
  },
  userInfoEmail: {
    fontSize: 13,
    fontFamily: 'DMSansRegular',
    color: '#7F7F7F',
  },
  userInfoNameEmail: {
    display: 'flex',
    rowGap: 6,
  },
});

export default UserInfo;
