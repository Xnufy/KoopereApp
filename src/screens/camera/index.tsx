import React, {useEffect, useState} from 'react';
import {Modal, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
  Camera as CameraComponent,
} from 'react-native-vision-camera';

import {PermissionsPage} from '../../components/PermissionsPage';
import {NoCameraDevice} from '../../components/NoCameraDevice';

const CameraScreen: React.FC<any> = ({navigation}) => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const [permissionChecked, setPermissionChecked] = useState(false);
  const [modalInfoTicketIsVisible, setModalInfoTicketIsVisible] =
    useState(false);
  const device = useCameraDevice('back', {
    physicalDevices: ['wide-angle-camera'],
  });

  const checkTicket = (code: string | undefined) => {
    if(modalInfoTicketIsVisible){
      return;
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
            <Text>Nome: João da Silva</Text>
            <Text>Data de Nascimento: 01/01/1990</Text>
            <Text>CPF: 123.456.789-00</Text>

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
