import { useEffect, useState } from "react";
import { useFuncionario } from "@/database/useFuncionario";
import { IFuncionario } from "@/utils/interface";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  closeModal: (onClose: boolean) => void;
}
export default function Funcionario({ closeModal }: Props) {
  const funcionarioDatabase = useFuncionario()
  const [funcionarios, setFuncionarios] = useState<IFuncionario[]>([])

  function Close() {
    closeModal(false)
  }

  async function loadFuncionarios() {
    const response = await funcionarioDatabase.listar()
    if (response) {
      setFuncionarios(response)
    }
  }

  useEffect(() => {
    loadFuncionarios()
  }, [])

  return (
    <View style={{
      flexDirection: 'column',
      marginTop: 160,
      marginHorizontal: 8,
      paddingHorizontal: 8,
      borderWidth: 1,
      borderColor: '#000000',
    }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50 }}>
        <Text style={{ fontWeight: 'bold' }}>FUNCIONÁRIOS:</Text>
        <TouchableOpacity
          onPress={Close}
          style={{ width: 40, padding: 2, alignItems: 'center', backgroundColor: '#ff0000' }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>X</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 16,
          padding: 4,
          backgroundColor: '#c3c3c3ff'
        }}
      >
        <Text style={{ fontWeight: '600', width: 150, textAlign: 'left' }}>NOME</Text>
        <Text style={{ fontWeight: '600', width: 50, textAlign: 'center' }}>PIN</Text>
        <Text style={{ fontWeight: '600', width: 50, textAlign: 'center' }}>ATIVO</Text>
      </View>

      {
        funcionarios.map(item => (
          <View
            key={item.id}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 16,
              padding: 4,
              borderBottomWidth: 1,
              borderBottomColor: '#e2e2e2'
            }}
          >
            <Text style={{ width: 150, textAlign: 'left' }}>{item.nome}</Text>
            <Text style={{ width: 50, textAlign: 'center' }}>{item.pin}</Text>
            <Text style={{ width: 50, textAlign: 'center' }}>{item.ativo ? 'SIM' : 'NÃO'}</Text>
          </View>
        ))
      }

    </View>
  )
}