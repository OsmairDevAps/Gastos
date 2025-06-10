import { Text, TextInput, View } from "react-native";
import styles from '@/styles/lista'
import ButtonTitle from "./buttontitle";
import frmStyles from "@/styles/form";
import { useState } from "react";
import SelectWithInput from "./selectwithinput";

type Props = {
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function AdicionaProduto({ setIsModalOpen }: Props) {
  const [categoria, setCategoria] = useState('')
  const [produto, setProduto] = useState('')
  const [medida, setMedida] = useState('')
  
  function Close() {
    setIsModalOpen(false)
  }

  const CaixaAlta = (valor: string) => {
    return valor.toUpperCase() 
  }

  function handleSave() {
    const dados = {
      categoria: categoria,
      item: produto,
      medida: medida,
    }
    console.log(dados)
    setIsModalOpen(false)
  }

  return (
    <View style={styles.modal}>
      <View style={styles.navbar}>
        <Text style={styles.titulo}>INCLUIR NOVO ITEM</Text>
        <ButtonTitle titulo="X" onPress={Close} />
      </View>

      <View style={frmStyles.container}>
        <View style={frmStyles.grupoInput}>
          <Text style={frmStyles.label}>Categoria:</Text>
          <SelectWithInput options={['BEBIDAS','CARNES']} onSelect={setCategoria} />          
        </View>

        <View style={frmStyles.grupoInput}>
          <Text style={frmStyles.label}>Produto:</Text>
          <TextInput 
            style={frmStyles.input}
            value={produto}
            onChangeText={(text)=>setProduto(CaixaAlta(text))}
          />
        </View>

        <View style={frmStyles.grupoInput}>
          <Text style={frmStyles.label}>Unidade de medida:</Text>
          <TextInput 
            style={frmStyles.input}
            value={medida}
            placeholder="metros, litros, kg, un"
            onChangeText={(text)=>setMedida(CaixaAlta(text))}
          />
        </View>

        <ButtonTitle titulo="Salvar" onPress={handleSave} />
      </View>
    </View>
  )
}