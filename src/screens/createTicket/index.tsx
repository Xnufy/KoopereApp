import React from "react";
import { Alert, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleCreateTicketService } from "../../services/services";
import { TextInputMask } from 'react-native-masked-text'; // Importando o TextInputMask

const CreateTicketScreen: React.FC<any> = ({ navigation, route }) => {
  const [name, setName] = React.useState('');
  const [birthDate, setBirthDate] = React.useState('');
  const [cpf, setCpf] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleCreateTicket = async () => {
    try {
      if (!name || !birthDate || !cpf) {
        Alert.alert('Preencha todos os campos!');
        return;
      }
  
      // Remover pontos, hífens e qualquer outro caractere não numérico do CPF
      const cleanCpf = cpf.replace(/[^\d]+/g, ''); // Remove tudo que não for número
  
      // Verifica se o CPF tem 11 caracteres após a limpeza
      if (cleanCpf.length !== 11) {
        Alert.alert('CPF inválido');
        return;
      }
  
      const ticket = {
        name,
        birthdate: birthDate,
        cpf: cleanCpf, // Envia o CPF limpo para o backend
      };
  
      // Chama o serviço para criar o ticket
      const response = await handleCreateTicketService(ticket);
  
      // Recupera os tickets existentes do AsyncStorage
      const tickets = await AsyncStorage.getItem('@tickets');
      const ticketList = tickets ? JSON.parse(tickets) : [];
  
      // Adiciona o novo ticket na lista
      await AsyncStorage.setItem('@tickets', JSON.stringify([...ticketList, { ...ticket, ticketId: response.data.ticketId }]));
  
      Alert.alert('Ticket gerado com sucesso!');
      setName('');
      setBirthDate('');
      setCpf('');
  
    } catch (error) {
      console.error(error.response.data);
      Alert.alert('Erro ao gerar ticket!');
    }
  };
  

  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 40 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 20 }}>
        Insira os dados do ticket:
      </Text>

      <TextInput
        style={{
          backgroundColor: '#f9f9f9',
          padding: 10,
          borderRadius: 8,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: '#ccc',
          color: "#000",
        }}
        placeholder="Nome do usuario"
        placeholderTextColor="#000"
        value={name}
        onChangeText={setName}
      />

      {/* Usando TextInputMask para formatar a data */}
      <TextInputMask
        type={'datetime'}
        options={{
          format: 'DD/MM/YYYY', // Formato desejado
        }}
        style={{
          backgroundColor: '#f9f9f9',
          padding: 10,
          borderRadius: 8,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: '#ccc',
          color: "#000",
        }}
        placeholder="Data de nascimento"
        placeholderTextColor="#000"
        value={birthDate}
        onChangeText={setBirthDate}
      />

      {/* Usando TextInputMask para formatar o CPF */}
      <TextInputMask
        type={'cpf'}  // Definindo o tipo como CPF
        style={{
          backgroundColor: '#f9f9f9',
          padding: 10,
          borderRadius: 8,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: '#ccc',
          color: "#000",
        }}
        placeholder="CPF"
        placeholderTextColor="#000"
        value={cpf}
        onChangeText={setCpf}
      />

      <TouchableOpacity onPress={handleCreateTicket} disabled={loading}>
        <Text
          style={{
            backgroundColor: '#000',
            padding: 20,
            borderRadius: 8,
            color: '#fff',
            textAlign: 'center',
          }}
        >
          {loading ? <ActivityIndicator color="#fff" /> : 'Gerar Ticket'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export { CreateTicketScreen };
