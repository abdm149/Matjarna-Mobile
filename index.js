import 'intl-pluralrules';
import i18n from 'i18next';
import './com/matjarna/i18n/config';
import {AppRegistry} from 'react-native';
import app from './app.tsx';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

i18n.init(); 

AppRegistry.registerComponent(appName, () => app);
