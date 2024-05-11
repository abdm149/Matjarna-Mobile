import React from 'react';
import {View, Text} from 'react-native';
import ChevronLeftIcon from '../assets/icons/chevronLeftIcon';
import IconButton from '../sharedComponents/iconButton';

function Profile({navigation}: any) {
  return (
    <View
      style={{
        margin: 12,
      }}>
      <View>
        <IconButton
          icon={<ChevronLeftIcon />}
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
}

export default Profile;
