import { View, Image } from 'react-native'
import styles from '../styles/header'

export default function Header() {
  const logoTio = '@/assets/images/tc.png'
  const titulo = '@/assets/images/tit.png'
  const creditos = '@/assets/images/oa.png'

  return (
    <View style={styles.container}>
      <Image source={require(logoTio)} width={67} />
      <Image source={require(titulo)} width={100} />
      <Image source={require(creditos)} width={40} />
    </View>
  )
}