import { Alert, Text, TextInput, View } from "react-native";
import styles from '@/styles/lista'
import ButtonTitle from "./buttontitle";
import frmStyles from "@/styles/form";
import { useEffect, useState } from "react";
import SelectWithInput from "./selectwithinput";
import { useProdutosCompras } from "@/database/useProdutosCompras";

type Props = {
  setIsModalOpen: (isOpen: boolean) => void;
  listaAtualizar: () => void;
}

export default function AdicionaProduto({ setIsModalOpen, listaAtualizar }: Props) {
  const produtosDatabase = useProdutosCompras()
  const [categorias, setCategorias] = useState<string[]>([])
  const [categoria, setCategoria] = useState('')
  const [produto, setProduto] = useState('')
  const [medida, setMedida] = useState('')
  
  function Close() {
    setIsModalOpen(false)
  }

  const CaixaAlta = (valor: string) => {
    return valor.toUpperCase() 
  }

  async function ListaCategorias() {
    let arrayCategoria:string[] = []
    try {
      const response = await produtosDatabase.listarCategorias()
      if (response) {
        response.map(item => {
          arrayCategoria.push(item.categoria)
        })
      }
      setCategorias(arrayCategoria)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSave() {
    const dados = {
      categoria: categoria,
      item: produto,
      medida: medida
    }
    try {
      await produtosDatabase.criar(dados)
      Alert.alert('Produto cadastrado com sucesso!')
      setProduto('')
      setMedida('')
      listaAtualizar()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    ListaCategorias()
  },[])

  return (
    <View style={styles.modal}>
      <View style={styles.navbar}>
        <Text style={styles.titulo}>INCLUIR NOVO ITEM</Text>
        <ButtonTitle titulo="X" onPress={Close} />
      </View>

      <View style={frmStyles.container}>
        <View style={frmStyles.grupoInput}>
          <Text style={frmStyles.label}>Categoria:</Text>
          <SelectWithInput options={categorias} onSelect={setCategoria} />          
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