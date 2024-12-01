import React from "react";
import { Text, View } from "react-native";

export function PermissionsPage(){
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
        Permissões necessárias:
      </Text>
      <Text>Camera</Text>
      
    </View>
  );
}