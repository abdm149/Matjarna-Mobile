import React, {useRef} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import InputField from '../sharedComponents/inputField';
import EmailIcon from '../assets/icons/emailIcon';
import PersonIcon from '../assets/icons/personIcon';
import PrimaryButton from '../sharedComponents/primaryButton';
import PasswordInputField from '../sharedComponents/passwordInputField';

type SignUpScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

const Signup = ({navigation}: SignUpScreenProps) => {
  const {t} = useTranslation();
  const lastNameInputRef = useRef<TextInput>(null);
  const email = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const onPressSignup = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'drawer'}],
    });
  };

  const onPressSignIn = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../assets/images/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <View style={styles.container}>
          <Text style={styles.title}>Audio</Text>
          <Text style={styles.subtitle}>{t('global.subtitle')}</Text>
          <View style={styles.vSpace}></View>
          <View style={styles.inputRow}>
            <InputField
              prefixIcon={<PersonIcon />}
              placeholder={t('signup.firstName')}
              returnKeyType="next"
              onSubmitEditing={() => {
                lastNameInputRef.current?.focus();
              }}
            />
            <View style={styles.hSpace}></View>
            <InputField
              prefixIcon={<PersonIcon />}
              placeholder={t('signup.lastName')}
              returnKeyType="next"
              textInputRef={lastNameInputRef}
              onSubmitEditing={() => {
                email.current?.focus();
              }}
            />
          </View>

          <InputField
            prefixIcon={<EmailIcon />}
            placeholder={t('global.email')}
            returnKeyType="next"
            textInputRef={email}
            onSubmitEditing={() => {
              passwordInputRef.current?.focus();
            }}
          />

          <PasswordInputField
            placeholder={t('global.password')}
            textInputRef={passwordInputRef}
            returnKeyType="next"
            onSubmitEditing={() => {
              confirmPasswordInputRef.current?.focus();
            }}
          />

          <PasswordInputField
            placeholder={t('signup.confirmPassword')}
            textInputRef={confirmPasswordInputRef}
            returnKeyType="done"
            onSubmitEditing={onPressSignup}
          />
          {/* TODO: make sure passwords match */}
          <PrimaryButton text={t('signup.signUpBtn')} onPress={onPressSignup} />

          <View style={styles.signinContainer}>
            <Text style={styles.haveAccountText}>
              {t('signup.haveAccount')}
            </Text>

            <TouchableOpacity onPress={onPressSignIn}>
              <Text style={styles.signInText}>{t('signup.signinTextBtn')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    marginHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'DMSansBold',
    fontSize: 50,
    color: '#FFFFFF',
    marginTop: 60,
    marginBottom: 15,
  },
  subtitle: {
    fontFamily: 'DMSansBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  signInText: {
    color: '#0ACF83',
    fontFamily: 'DMSansBold',
    textDecorationLine: 'underline',
  },
  backgroundImage: {
    flexGrow: 1,
  },
  signinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  haveAccountText: {
    color: '#FFFFFF',
    marginHorizontal: 10,
    fontSize: 14,
    fontFamily: 'DMSansBold',
  },
  vSpace: {
    height: 90,
  },
  inputRow: {
    width: '100%',
    flexDirection: 'row',
  },
  hSpace: {width: 10},
});

export default Signup;
