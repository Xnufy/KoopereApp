import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import {ActivityIndicator, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const myTickets: React.FC<any> = ({ navigation }) => {

  const [tickets, setTickets] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  console.log(tickets)

  async function getTickets() {
    try {
      setLoading(true);
      // Recupera os tickets existentes do AsyncStorage
      const tickets = await AsyncStorage.getItem('@tickets');
      const ticketList = tickets ? JSON.parse(tickets) : [];
      setTickets(ticketList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getTickets();
  },[])

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
        Olá, seus tickets estão listados abaixo:
      </Text>

      {loading && <ActivityIndicator size="large" color="#000" />}
      {!loading && tickets.length === 0 && <Text>Nenhum ticket encontrado</Text>}
      {!loading && tickets.map((ticket: any, index: number) => (
        <View key={index} style={{marginBottom: 20, justifyContent: "center", alignItems: "center", marginBottom: 40 }}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>ID: {ticket.ticketId}</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Data de Nascimento: {ticket.birthdate}</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>CPF: {ticket.cpf}</Text>
          <QRCode value={ticket.ticketId} size={100} />
        </View>
      ))}

  
      
    </View>
  );
};

export {myTickets};
