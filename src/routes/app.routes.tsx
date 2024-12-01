import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {HomeScreen} from '../screens/home';
import {CameraScreen} from '../screens/camera';
import {CreateTicketScreen} from '../screens/createTicket';

const Stack = createStackNavigator();

export function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="CreateTicket" component={CreateTicketScreen} />
    </Stack.Navigator>
  );
}
