import { View, Image, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import styles from '../styles/header'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

export default function Header() {
  const { setFuncionario } = useContext(AuthContext)
  const logoTio = '@/assets/images/tc.png'
  const titulo = '@/assets/images/tit.png'
  const creditos = '@/assets/images/oa.png'

  function Sair() {
    setFuncionario(null)
  }

  return (
    <View style={styles.container}>
      <Image source={require(logoTio)} width={67} />
      <Image source={require(titulo)} width={100} />
      <TouchableOpacity onPress={Sair}>
        <Feather name='x' size={24} color='#FFFFFF' />
      </TouchableOpacity>
    </View>
  )
}