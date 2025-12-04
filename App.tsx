import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Pantallas.
import Inicio from './android/app/src/screens/inicio';
import Detalle from './android/app/src/screens/detalle';
import Media from './android/app/src/screens/reproductor';

const Stack = createNativeStackNavigator();

export default function App() {
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