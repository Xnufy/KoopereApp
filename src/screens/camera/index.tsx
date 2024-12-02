import React, {useEffect, useState} from 'react';
import {Alert, Modal, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
  Camera as CameraComponent,
} from 'react-native-vision-camera';

import {PermissionsPage} from '../../components/PermissionsPage';
import {NoCameraDevice} from '../../components/NoCameraDevice';
import { handleGetTicketsService } from '../../services/services';

const CameraScreen: React.FC<any> = ({navigation}) => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const [permissionChecked, setPermissionChecked] = useState(false);
  const [modalInfoTicketIsVisible, setModalInfoTicketIsVisible] =
    useState(false);
  const device = useCameraDevice('back', {
    physicalDevices: ['wide-angle-camera'],
  });
  const [ticket, setTicket] = useState<any>();

  const checkTicket = async (code: string | undefined) => {
    if(modalInfoTicketIsVisible){
      return;
    }
    try {
      const response = await handleGetTicketsService('8c2891939f14a7d484561f5559799cf7');
      setTicket(response.data);
    } catch (error) {
      if (error.status === 404) {
        console.error('Ticket não encontrado');
        Alert.alert('Ticket não encontrado');
        return;
      }
      console.error(error.status);
    }
  }

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'code-39', 'ean-13', 'codabar', 'itf', 'upc-a', 'upc-e'],
    onCodeScanned: codes => {
      if (codes.length > 0) {
        checkTicket(codes[0].value);
      }
    },
  });

  const QRCodeRef = React.useRef(null);

  useEffect(() => {
    const checkPermission = async () => {
      if (!hasPermission) {
        await requestPermission();
      }
      setPermissionChecked(true);
    };

    checkPermission();

    return () => {
      QRCodeRef.current = null;
    };
  }, []);

  if (!permissionChecked) return null;

  if (!hasPermission) return <PermissionsPage />;

  if (!device) return <NoCameraDevice />;

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <CameraComponent
        style={{flex: 1}}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalInfoTicketIsVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 8,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 20,
              }}>
              Informações do Ticket
            </Text>
            <Text>Nome: {ticket.name}</Text>
            <Text>Data de Nascimento: {ticket.birthdate}</Text>
            <Text>CPF: {ticket.cpf}</Text>

            <TouchableOpacity
              onPress={() => setModalInfoTicketIsVisible(false)}
              style={{
                backgroundColor: '#000',
                padding: 10,
                borderRadius: 8,
                marginTop: 20,
              }}>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                }}>
                Fechar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export {CameraScreen};
