import React from 'react';
import {View, TextInput, StyleSheet, TextInputProps} from 'react-native';
import {I18nManager} from 'react-native';

type InputFieldProps = TextInputProps & {
  placeholder: string;
  textInputRef?: React.RefObject<TextInput>;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
};

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  textInputRef,
  prefixIcon,
  suffixIcon,
  ...textInputProps
}) => {
  return (
    <View style={[styles.inputView]}>
      {prefixIcon}
      <TextInput
        ref={textInputRef}
        style={[
          styles.inputText,
          I18nManager.isRTL ? styles.rtlTextInput : styles.ltrTextInput,
        ]}
        placeholder={placeholder}
        placeholderTextColor="#BABABA"
        {...textInputProps}
      />
      {suffixIcon}
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#BABABA',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  inputText: {
    flex: 1,
    color: '#000000',
  },
  rtlTextInput: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  ltrTextInput: {
    textAlign: 'left',
    writingDirection: 'ltr',
  },
});

export default InputField;