import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, Modal } from "react-native";
import { Feather } from '@expo/vector-icons'
import { useState } from "react";
import Funcionario from "./funcionarios";

export default function Menu() {
  const router = useRouter()
  const [isModalCardapioVisible, setIsModalCardapioVisible] = useState(false)
  const [isModalFuncionarioVisible, setIsModalFuncionarioVisible] = useState(false)

  function handleOpenModalCardapio() {
    setIsModalCardapioVisible(true)
  }

  function handleCloseModalCardapio() {
    setIsModalCardapioVisible(false)
  }

  function handleOpenModalFuncionario() {
    setIsModalFuncionarioVisible(true)
  }

  function handleCloseModalFuncionario() {
    setIsModalFuncionarioVisible(false)
  }

  function Voltar() {
    router.replace('/(tabs)')
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontWeight: '700' }}>CADASTROS</Text>
        <TouchableOpacity onPress={Voltar}>
          <Feather name="arrow-left-circle" size={32} color='#000000' />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', gap: 16 }}>
        <TouchableOpacity
          onPress={handleOpenModalCardapio}
          style={{ paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#c4c4c4ff', borderRadius: 8 }}
        >
          <Text>Cardápio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleOpenModalFuncionario}
          style={{ paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#c4c4c4ff', borderRadius: 8 }}
        >
          <Text>Funcionários</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalCardapioVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModalCardapio}
      >
      </Modal>

      <Modal
        visible={isModalFuncionarioVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModalFuncionario}
      >
        <Funcionario closeModal={setIsModalFuncionarioVisible} />
      </Modal>

    </View>
  )
}