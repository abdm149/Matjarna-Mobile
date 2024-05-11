import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface primaryButtonProps {
  text: String;
  onPress?: () => void;
}
const primaryButton: React.FC<primaryButtonProps> = ({text, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: '#0ACF83',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 10,
    marginTop: 40,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default primaryButton;