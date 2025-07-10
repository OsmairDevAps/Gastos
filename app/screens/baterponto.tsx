import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { supabase } from '@/database/supabase'; 
import { IBatida, IFuncionario } from '@/utils/interface';
import { useFuncionario } from '@/database/useFuncionario';
import { usePonto } from '@/database/usePonto';

type Props = {
  onClose: (isOpen: boolean) => void;
  funcionario: IFuncionario;
  setFuncionario: (f: IFuncionario) => void;
}

export default function BaterPonto({ onClose, funcionario, setFuncionario }: Props) {
  const agora = new Date()
  const dataAtual = agora.toLocaleDateString()
  const funcionarioDatabase = useFuncionario()
  const [batida, setBatida] = useState<IBatida[]>([])
  const pontosDatabase = usePonto()
  const [loading, setLoading] = useState(false);

  function Close() {
    onClose(false)
  }

  async function VerBatidas(funcionario_id: number) {
    try {
      if (funcionario_id > 0) {
        const { data } = await supabase
          .from('pontoeletronico')
          .select('*')
          .eq('funcionario_id', funcionario_id)
          .eq('dia', dataAtual)
          .order('hora', {ascending: true})
        if (data) {
          setBatida(data)
        }
      }
    } catch (error) {
      console.log(error)      
    }
  }

  const coordenadasEmpresa = {
    // latitude: -16.312633049008056,
    // longitude: -48.950016490472095,
    latitude: -16.331311814383426,
    longitude: -48.955823032800325,
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
      const { data: funcionarios, error } = await funcionarioDatabase.listarFuncionario(funcionario.pin)
      // const { data: funcionarios, error } = await supabase
      //   .from('funcionarios')
      //   .select('*')
      //   .eq('pin', pin)
      //   .single();

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
      const dadosPonto = {
        funcionario_id: funcionarios.id,
        dia: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString(),
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
      const { error: pontoErro } = await pontosDatabase.criar(dadosPonto)
      // const { error: pontoErro } = await supabase.from('pontoeletronico').insert({
      //   funcionario_id: funcionarios.id,
      //   dia: new Date().toLocaleDateString(),
      //   hora: new Date().toLocaleTimeString(),
      //   latitude: location.coords.latitude,
      //   longitude: location.coords.longitude,
      // });
      
      if (pontoErro) {
        Alert.alert('Erro', 'Erro ao registrar ponto: '+ pontoErro.message);
      } else {
        setFuncionario(funcionarios)
        Alert.alert('Sucesso', `Ponto registrado com sucesso!`);
        onClose(false)
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    VerBatidas(funcionario.id)
  },[funcionario])

  return (
    <View style={{ marginTop:200, padding: 10, justifyContent: 'center', backgroundColor:'#eaeaea' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ marginBottom: 0, fontSize: 20, color: '#4d4d4d', fontWeight: '700'}}>REGISTROS DE PONTO:</Text>
        <TouchableOpacity onPress={Close} style={{ justifyContent: 'center', alignItems: 'center', width: 40, height: 40, padding: 10, backgroundColor: '#ff0000'}}>
          <Text style={{color: '#ffffff', fontSize:18}}>X</Text>
        </TouchableOpacity>
      </View>

      <View style={{ padding: 10}}>
      { batida.map(item => (
        <Text key={item.id} style={{ color: '#343434' }}>Hora ponto: {item.hora}</Text>
      ))}
      </View>

      <Button 
        title={loading ? 'Registrando...' : 'Bater ponto'} 
        onPress={baterPonto} 
        disabled={loading} 
      />
    </View>
  );
}
