import React, { useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Pantallas
import Inicio from './android/app/src/screens/inicio';
import Detalle from './android/app/src/screens/detalle';
import Media from './android/app/src/screens/reproductor';

const Stack = createNativeStackNavigator();

export default function App() {

  // -------------------------------
  // Inicialización de Firebase Messaging
  // -------------------------------
  useEffect(() => {
    async function setupNotifications() {
      try {
        // 1. Solicitar permisos (Android 13+)
        const authStatus = await messaging().requestPermission();
        
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log('Permisos de notificación concedidos:', authStatus);

          // 2. Obtener token FCM del dispositivo
          const token = await messaging().getToken();
          console.log('Token FCM del dispositivo:', token);
        }

        // 3. Listener de notificaciones en foreground
        const unsubscribe = messaging().onMessage(async remoteMessage => {
          Alert.alert(
            'Notificación recibida',
            remoteMessage.notification?.title || 'Sin título'
          );
        });

        return unsubscribe;

      } catch (error) {
        console.error("Error inicializando Firebase Messaging:", error);
      }
    }

    setupNotifications();
  }, []);

  // -------------------------------
  // Navegación de la app
  // -------------------------------
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#D9792B' },
            headerTintColor: 'white',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen
            name="Inicio"
            component={Inicio}
            options={{ title: 'Equipo Basket' }}
          />

          <Stack.Screen
            name="Detalle"
            component={Detalle}
            options={{ title: 'Detalle del jugador' }}
          />

          <Stack.Screen
            name="Media"
            component={Media}
            options={{ title: 'Reproductor' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
