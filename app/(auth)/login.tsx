import { useContext, useState } from 'react';
import { useRouter } from 'expo-router';
import { AuthContext } from '@/context/AuthContext';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import frmStyles from '@/styles/form';
import { Feather } from '@expo/vector-icons';
import { useFuncionario } from '@/database/useFuncionario';

export default function LoginScreen() {
  const imgTC = '@/assets/images/logoTC.png'
  const imgOA = '@/assets/images/logoOA.png'
  const router = useRouter();
  const funcionarioDatabase = useFuncionario()
  const { setFuncionario } = useContext(AuthContext);
  const [isUnVisiblePin, setIsUnVisiblePin] = useState(true)
  const [nomeFuncionario, setNomeFuncionario] = useState('');
  const [pinFuncionario, setPinFuncionario] = useState('');

  async function handleLogin() {
    try {
      const { data, error } = await funcionarioDatabase.logar(nomeFuncionario, pinFuncionario)
      if (data) {
        setFuncionario(data[0])
        router.replace('/(tabs)');
      }
      if (error) {
        Alert.alert('Ocorreu um erro ao logar: '+ error)
      }
    } catch (error) {
      Alert.alert('Ocorreu um erro ao logar: '+ error)
    }
    // const userFake = { id: 1, nome: 'João', pin:'1234', ativo: true };
    // setFuncionario(userFake);
  }

  return (
    <View style={frmStyles.containerLogin}>
      <Image source={require(imgTC)} width={32} />
      
      <View style={frmStyles.grupoInputLogin}>
        <Text style={frmStyles.label}>Nome do Funcionário:</Text>
        <TextInput
          placeholder="Funcionário"
          value={nomeFuncionario}
          onChangeText={setNomeFuncionario}
          style={frmStyles.input}
        />
      </View>
      <View style={frmStyles.grupoInputLogin}>
        <Text style={frmStyles.label}>Pin:</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 8}}>
          <TextInput
            placeholder="****"
            keyboardType='numeric'
            value={pinFuncionario}
            secureTextEntry={isUnVisiblePin}
            onChangeText={setPinFuncionario}
            style={frmStyles.inputPassword}
          />
          <TouchableOpacity onPress={() => setIsUnVisiblePin(!isUnVisiblePin)}>
            <Feather name={isUnVisiblePin ? 'eye-off' : 'eye'} size={20} />
          </TouchableOpacity>
        </View>
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