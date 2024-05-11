import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LogIn from './com/matjarna/login';
import Splash from './com/matjarna/splashScreen';
import HomePage from './com/matjarna/homePage';
import SplashScreen from 'react-native-splash-screen';
import SignUp from './com/matjarna/signup';
import {useTranslation} from 'react-i18next';
import CustomSidebarMenu from './com/matjarna/components/customSidebarMenu';
import Profile from './com/matjarna/profilePage';
import Products from './com/matjarna/products';
import { Provider } from 'react-redux';
import { store } from './com/matjarna/stores/store';

const Drawer = createDrawerNavigator();

function DrawerMenu() {
  const {t} = useTranslation();
  return (
    <Drawer.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '100%',
        },
      }}
      backBehavior="initialRoute"
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen
        name="editProfile"
        component={Profile}
        options={{
          groupName: t('sideMenu.general'),
          drawerLabel: t('sideMenu.editProfile'),
        }}
      />
      <Drawer.Screen
        name="termsAndConditions"
        component={Profile} // Dummy component to be changed
        options={{
          groupName: t('sideMenu.legal'),
          drawerLabel: t('sideMenu.terms'),
        }}
      />
      <Drawer.Screen
        name="privacyPolicy"
        component={Profile} // Dummy component to be changed
        options={{
          groupName: t('sideMenu.legal'),
          drawerLabel: t('sideMenu.privacyPolicy'),
        }}
      />
      <Drawer.Screen
        name="logout"
        component={LogIn}
        options={{
          groupName: t('sideMenu.personal'),
          drawerLabel: t('sideMenu.logout'),
        }}
        listeners={({navigation}) => ({
          state: _ => {
            navigation.replace('login');
          },
        })}
      />
      <Drawer.Screen name="home" component={HomePage} />
    </Drawer.Navigator>
  );
}

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  const onNavigationReady = () => {
    SplashScreen.hide();
  };

  return (
    <Provider store={store}>
    <NavigationContainer onReady={onNavigationReady}>
      <Stack.Navigator initialRouteName="splash">
        <Stack.Screen
          name="splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="login"
          component={LogIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="signup"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="drawer"
          component={DrawerMenu}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="products"
          component={Products}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;
