import {StyleSheet, View, Text} from 'react-native';

interface AlertMessageProps {
  icon: React.ReactNode;
  message: string;
}

const AlertMessage: React.FC<AlertMessageProps> = ({icon, message}) => {
  return (
    <View style={styles.alert}>
      {icon}
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  alert: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  message: {
    paddingHorizontal: 12,
    fontFamily: 'DMSansRegular',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
});

export default AlertMessage;
