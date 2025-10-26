import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, Modal } from "react-native";
import { Feather } from '@expo/vector-icons'
import { useState } from "react";
import Funcionario from "./funcionarios";
import ListaBatidas from "./listabatidas";

export default function Menu() {
  const router = useRouter()
  const [isModalBatidaVisible, setIsModalBatidaVisible] = useState(false)
  const [isModalFuncionarioVisible, setIsModalFuncionarioVisible] = useState(false)

  function handleOpenModalBatida() {
    setIsModalBatidaVisible(true)
  }

  function handleCloseModalBatida() {
    setIsModalBatidaVisible(false)
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
          onPress={handleOpenModalFuncionario}
          style={{ paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#c4c4c4ff', borderRadius: 8 }}
        >
          <Text>Funcionários</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleOpenModalBatida}
          style={{ paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#c4c4c4ff', borderRadius: 8 }}
        >
          <Text>Batidas de ponto</Text>
        </TouchableOpacity>

      </View>

      <Modal
        visible={isModalBatidaVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModalBatida}
      >
        <ListaBatidas closeModal={setIsModalBatidaVisible} />
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