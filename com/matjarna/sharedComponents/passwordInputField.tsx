import React, {useState} from 'react';
import {TextInput, StyleSheet, TextInputProps} from 'react-native';
import IconButton from './iconButton';
import ShowPasswordIcon from '../assets/icons/showPassword';
import HidePasswordIcon from '../assets/icons/hidePassword';
import LockIcon from '../assets/icons/lockIcon';
import InputField from './inputField';

type PasswordInputFieldProps = TextInputProps & {
  placeholder: string;
  textInputRef?: React.RefObject<TextInput>;
};

const PasswordInputField: React.FC<PasswordInputFieldProps> = ({
  placeholder,
  textInputRef,
  secureTextEntry,
  ...textInputProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <InputField
      placeholder={placeholder}
      textInputRef={textInputRef}
      prefixIcon={<LockIcon />}
      secureTextEntry={!showPassword}
      suffixIcon={
        <IconButton
          icon={!showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
          onPress={toggleShowPassword}
        />
      }
      {...textInputProps}
    />
  );
};
export default PasswordInputField;