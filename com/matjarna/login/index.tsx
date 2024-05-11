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
  ToastAndroid,
  ImageBackground,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';
import InputField from '../sharedComponents/inputField';
import EmailIcon from '../assets/icons/emailIcon';
import PrimaryButton from '../sharedComponents/primaryButton';
import PasswordInputField from '../sharedComponents/passwordInputField';
import {getCountryCode} from '../commons/api';
import {useDispatch} from 'react-redux';
import {setLocation} from '../stores/locationSlice';

type LoginScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

const Login = ({navigation}: LoginScreenProps) => {
  const {t, i18n} = useTranslation();
  const passwordInputRef = useRef<TextInput>(null);
  const dispatch = useDispatch();

  const changeLanguage = (lng: string) => {
    const isRtl = I18nManager.isRTL;

    if (lng == i18n.language) {
      return;
    }
    i18n.changeLanguage(lng).then(() => {
      const isNewRtl = i18n.dir() === 'rtl';
      I18nManager.forceRTL(isNewRtl);

      if (isNewRtl != isRtl) {
        RNRestart.Restart();
      }
    });
  };

  const onPressLogin = async () => {
    const countryCode: any = await getCountryCode();
    dispatch(setLocation(countryCode));
    navigation.reset({
      index: 0,
      routes: [{name: 'drawer'}],
    });
  };

  const onPressSignUp = () => {
    navigation.navigate('signup');
  };

  const onPressForgotPassword = () => {
    ToastAndroid.show('Under Construction', ToastAndroid.SHORT);
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
          <View style={styles.space}></View>
          <InputField
            prefixIcon={<EmailIcon />}
            placeholder={t('global.email')}
            returnKeyType="next"
            textInputRef={undefined}
            onSubmitEditing={() => {
              passwordInputRef.current?.focus();
            }}
          />

          <PasswordInputField
            placeholder={t('global.password')}
            textInputRef={passwordInputRef}
            returnKeyType="done"
            onSubmitEditing={onPressLogin}
          />

          <TouchableOpacity onPress={onPressForgotPassword}>
            <Text style={styles.forgotText}>
              {t('login.forgotPasswordBtn')}
            </Text>
          </TouchableOpacity>

          <PrimaryButton text={t('login.loginBtn')} onPress={onPressLogin} />

          <View style={styles.signUpContainer}>
            <Text style={styles.dontHaveAccountText}>
              {t('login.dontHaveAccount')}
            </Text>

            <TouchableOpacity onPress={onPressSignUp}>
              <Text style={styles.signUpText}>{t('login.signUpBtn')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.languageView}>
            <TouchableOpacity onPress={() => changeLanguage('en')}>
              <Text style={styles.language}>{t('language.english')}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => changeLanguage('ar')}>
              <Text style={styles.language}>{t('language.arabic')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};
export default Login;

const styles = StyleSheet.create({
  language: {
    color: '#FFFFFF',
    paddingHorizontal: 10,
  },
  languageView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  space: {
    height: 225,
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
  signUpText: {
    color: '#0ACF83',
    fontFamily: 'DMSansBold',
    textDecorationLine: 'underline',
  },
  forgotText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'DMSansBold',
  },
  backgroundImage: {
    flexGrow: 1,
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  dontHaveAccountText: {
    fontFamily: 'DMSansBold',
    color: '#FFFFFF',
    marginHorizontal: 10,
    fontSize: 14,
  },
});
