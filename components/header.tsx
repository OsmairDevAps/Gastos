import { View, Image, TouchableOpacity, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import styles from '../styles/header'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { IFuncionario } from '@/utils/interface'
import { useRouter } from 'expo-router'

export default function Header() {
  const router = useRouter()
  const { funcionario, setFuncionario } = useContext(AuthContext)
  const logoTio = '@/assets/images/tc.png'
  const titulo = '@/assets/images/tit.png'
  const creditos = '@/assets/images/oa.png'

  function Menu() {
    if (funcionario?.nome === 'WANESSA' || funcionario?.nome === 'OSMAIR') {
      router.replace('/screens/menu');
    }
  }

  function Sair() {
    setFuncionario({} as IFuncionario)
    router.replace('/(auth)/login');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={Menu}>
        <Image source={require(logoTio)} width={67} />
      </TouchableOpacity>

      <Text style={{ fontSize: 16, color: '#FFFFFF' }}>TIO GERENTE</Text>

      <TouchableOpacity onPress={Sair}>
        <Feather name='x' size={24} color='#FFFFFF' />
      </TouchableOpacity>
    </View>
  )
}