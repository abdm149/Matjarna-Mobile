import {View, TouchableOpacity} from 'react-native';
import {I18nManager} from 'react-native';

interface IconButtonProps {
  icon: React.ReactNode;
  onPress?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({icon, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={
          I18nManager.isRTL
            ? {transform: [{scaleX: -1}]}
            : {transform: [{scaleX: 1}]}
        }>
        {icon}
      </View>
    </TouchableOpacity>
  );
};

export default IconButton;
