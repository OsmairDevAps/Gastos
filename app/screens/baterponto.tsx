import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import * as Location from 'expo-location';
import { supabase } from '@/database/supabase'; 

export default function BaterPonto() {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);

  const coordenadasEmpresa = {
    latitude: -16.312633049008056,
    longitude: -48.950016490472095,
    raioPermitidoMetros: 100, // ajuste para seu local
  };

  function calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371e3; // raio da terra em metros
    const toRad = (x:number) => (x * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  const baterPonto = async () => {
    setLoading(true);
    try {
      // 1. Buscar funcionário pelo PIN
      const { data: funcionarios, error } = await supabase
        .from('funcionarios')
        .select('*')
        .eq('pin', pin)
        .single();

      if (error || !funcionarios) {
        Alert.alert('Erro', 'PIN inválido');
        setLoading(false);
        return;
      }

      // 2. Verificar localização atual
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'É necessário permitir localização');
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const distancia = calcularDistancia(
        location.coords.latitude,
        location.coords.longitude,
        coordenadasEmpresa.latitude,
        coordenadasEmpresa.longitude
      );

      if (distancia > coordenadasEmpresa.raioPermitidoMetros) {
        Alert.alert('Fora da área', 'Você está fora da área permitida para bater ponto');
        setLoading(false);
        return;
      }

      // 3. Registrar ponto
      const { error: pontoErro } = await supabase.from('pontos').insert({
        funcionario_id: funcionarios.id,
        timestamp: new Date().toISOString(),
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (pontoErro) {
        Alert.alert('Erro', 'Erro ao registrar ponto');
      } else {
        Alert.alert('Sucesso', `Ponto registrado com sucesso!`);
        setPin('');
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Digite seu PIN:</Text>
      <TextInput
        value={pin}
        onChangeText={setPin}
        keyboardType="numeric"
        secureTextEntry
        maxLength={6}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          fontSize: 18,
          marginBottom: 20,
        }}
      />
      <Button title={loading ? 'Registrando...' : 'Bater ponto'} onPress={baterPonto} disabled={loading} />
    </View>
  );
}
