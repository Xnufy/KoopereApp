import React from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateTicketScreen: React.FC<any> = ({ navigation, route }) => {

  const [name, setName] = React.useState('');
  const [birthDate, setBirthDate] = React.useState('');
  const [cpf, setCpf] = React.useState('');

  const handleCreateTicket = () => {
    if (!name || !birthDate || !cpf) {
      Alert.alert('Preencha todos os campos!');
      return;
    }


    const ticket = {
      name,
      birthDate,
      cpf,
    };

    AsyncStorage.getItem('@tickets')
      .then((response) => {
        const tickets = response ? JSON.parse(response) : [];

        AsyncStorage.setItem('@tickets', JSON.stringify([...tickets, ticket]))
          .then(() => {
            Alert.alert('Ticket gerado com sucesso!');
            setName('');
            setBirthDate('');
            setCpf('');
          })
          .catch(() => {
            Alert.alert('Erro ao gerar ticket!');
          });
      })
      .catch(() => {
        Alert.alert('Erro ao gerar ticket!');
      });
    

  }

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 40,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
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
        placeholder="Data de nascimento"
        placeholderTextColor="#000"
        value={birthDate}
        onChangeText={setBirthDate}
      />

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
        placeholder="CPF"
        placeholderTextColor="#000"
        value={cpf}
        onChangeText={setCpf}
      />

      <TouchableOpacity
        onPress={handleCreateTicket}
      >
        <Text
          style={{
            backgroundColor: '#000',
            padding: 20,
            borderRadius: 8,
            color: '#fff',
            textAlign: 'center',
          }}
        >
          Gerar Ticket
        </Text>
      </TouchableOpacity>

    </View>
  );
}

export { CreateTicketScreen };