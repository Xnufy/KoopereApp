import React from 'react';
import {StatusBar, Text, TouchableOpacity, View} from 'react-native';

const HomeScreen: React.FC<any> = ({navigation}) => {
  return (
    <View style={{paddingHorizontal: 20, paddingVertical: 40}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
        Olá, selecione uma das opções abaixo para continuar:
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Camera')}
        style={{
          backgroundColor: '#000',
          padding: 20,
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
          }}
        >
          Escanear Ticket
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateTicket')}
        style={{
          backgroundColor: '#000',
          padding: 20,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
          }}
        >
          Gerar Ticket
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export {HomeScreen};
