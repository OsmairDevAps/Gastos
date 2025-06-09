import { Text, View } from "react-native";
import styles from '@/styles/lista'
import ButtonTitle from "./buttontitle";

type Props = {
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function AdicionaProduto({ setIsModalOpen }: Props) {
  function Close() {
    setIsModalOpen(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.titulo}>INCLUIR NOVO ITEM</Text>
        <ButtonTitle titulo="X" onPress={Close} />
      </View>
    </View>
  )
}