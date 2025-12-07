import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

// Handler para notificaciones cuando la app está en segundo plano o cerrada
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Notificación recibida en background:', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
