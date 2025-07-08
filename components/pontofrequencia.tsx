import { supabase } from "@/database/supabase";
import frmStyles from "@/styles/form";
import { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  onClose: (isOpen: boolean) => void;
  listaAtualizar: (nome: string) => void;
}

export default function PontoFrequencia({onClose, listaAtualizar}: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [funcionario, setFuncionario] = useState('')

  function Close() {
    onClose(false)
  }

  async function RegistrarPonto() {
    setIsLoading(true)
    const agora = new Date()
    const dataBatida = agora.toLocaleDateString(); // ex: 08/07/2025
    const horaBatida = agora.toLocaleTimeString(); // ex: 14:35:02
    const dadosPonto = {
      nome_funcionario: funcionario,
      data_batida: dataBatida,
      hora_batida: horaBatida,
      latitude: 0,
      longitude: 0,
    }
    try {
      await supabase.from('batidas').insert(dadosPonto)
      setIsLoading(false)
      Alert.alert('Ponto batido com sucesso para ', funcionario)
      listaAtualizar(funcionario)
      Close()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={{ marginTop: 100, padding: 4, borderWidth: 1, backgroundColor: '#c5c5c5', borderColor: '#ffffff', marginLeft: 4, marginRight: 4 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#5e5e5e',}}>
        <Text style={{ padding: 10, color: '#ffffff', fontWeight: '700'}}>REGISTRO DE PONTO</Text>
        <TouchableOpacity onPress={Close} style={{ justifyContent: 'center', alignItems: 'center', width: 40, height: 40, padding: 10, backgroundColor: '#ff0000'}}>
          <Text style={{color: '#ffffff', fontSize:18}}>X</Text>
        </TouchableOpacity>
      </View>

      <View style={{padding: 16}}>
        <Text style={frmStyles.txtsubmitLogin}>Entre com o nome do Funcionario</Text>
        <TextInput 
          style={frmStyles.input}
          placeholder='Nome de usuário'
          value={funcionario}
          onChangeText={value => setFuncionario(value)}
        />
        
        <TouchableOpacity onPress={RegistrarPonto} style={frmStyles.btnsubmitLogin}>
          {isLoading ? <ActivityIndicator color='#ffffff' /> : <Text style={frmStyles.txtsubmitLogin}>Registrar</Text>}
        </TouchableOpacity>
      </View>
    </View>
  )
}