import React from "react"
import { View, Text } from "react-native";

export function NoCameraDevice(){
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
        Dispositivo sem câmera
      </Text>
    </View>
  );
}