import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import frmStyles from '@/styles/form';

export default function LoginScreen() {
  const imgTC = '@/assets/images/logoTC.png'
  const imgOA = '@/assets/images/logoOA.png'
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  function handleLogin() {
    if (nomeUsuario) {
      router.replace('./(tabs)');
    }
  };

  return (
    <View style={frmStyles.containerLogin}>
      <Image source={require(imgTC)} width={32} />
      
      <View style={frmStyles.grupoInputLogin}>
        <Text style={frmStyles.label}>Usuario:</Text>
        <TextInput
          placeholder="Usuário"
          value={nomeUsuario}
          onChangeText={setNomeUsuario}
          style={frmStyles.input}
        />
      </View>
      <View style={frmStyles.grupoInputLogin}>
        <Text style={frmStyles.label}>Senha:</Text>
        <TextInput
          placeholder="******"
          value={senha}
          onChangeText={setSenha}
          style={frmStyles.input}
        />
      </View>

      <TouchableOpacity 
        onPress={handleLogin} 
        style={frmStyles.btnsubmitLogin}
      >
        <Text style={frmStyles.txtsubmitLogin}>Entrar</Text>
      </TouchableOpacity>

      <Image source={require(imgOA)} width={32} />
    </View>
  );
}