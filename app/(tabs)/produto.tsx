import { useEffect, useState } from "react";
import { Alert, Text, View, SectionList, TouchableOpacity, Modal } from "react-native";
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import frmStyles from "@/styles/form";
import ButtonTitle from "@/components/buttontitle";
import Item from "@/components/produtocompra";
import { DProdutos } from "@/utils/database";
import { IProdutoCompra } from "@/utils/interface";
import { useListaCompras } from "@/database/useListaCompras";
import { useProdutosCompras } from "@/database/useProdutosCompras";
import styles from '@/styles/lista'
import AdicionaProduto from "@/components/adicionaProduto";

type DateTimePickerMode = 'date' | 'time';

export default function Produto() {
  const itemCompraDatabase = useListaCompras()
  const produtosDatabase = useProdutosCompras()
  const [date, setDate] = useState(new Date());
  const [produtosCompra, setProdutosCompra] = useState<IProdutoCompra[]>([])
  const [produtos, setProdutos] = useState<IProdutoCompra[]>([])
  const [isOpenModal, setIsOpenModal] = useState(false)
  const adicionarProduto = (prod: IProdutoCompra) => {
    setProdutos(prev => {
      const existe = prev.find(p => p.id === prod.id);
      if (existe) {
        return prev.filter(p => p.id !== prod.id); // remove
      } else {
        return [...prev, prod]; // adiciona
      }
    });
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      const currentDate = selectedDate;
      setDate(currentDate);
    }
  };

  const showMode = (currentMode: DateTimePickerMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const agruparPorCategoria = (produtos: IProdutoCompra[]) => {
    const categorias = {} as any;
    produtos.forEach((produto) => {
      if (!categorias[produto.categoria]) {
        categorias[produto.categoria] = [];
      }
      categorias[produto.categoria].push(produto);
    });

    return Object.keys(categorias).map((cat) => ({
      title: cat,
      data: categorias[cat],
    }));
  };

  const sections = agruparPorCategoria(produtosCompra);

  function AbreModal() {
    setIsOpenModal(true)
  }

  async function ListaProdutos() {
    try {
      const response = await produtosDatabase.listarProdutos()
      if (response) {
        setProdutosCompra(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSave() {
    produtos.map(async(item) => {
      await itemCompraDatabase.criar({
        categoria: item.categoria,
        idproduto: item.id,
        datacompra: date,
        marcado: false,
        valor: 0,
        adquirido: false,
        localadquirido: '',
      })
    })
    Alert.alert('Incluídos com sucesso!')
  }

  useEffect(()=> {
    ListaProdutos()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.titulo}>ITENS A COMPRAR</Text>
        <ButtonTitle titulo="+ ITEM" onPress={AbreModal} />
      </View>

      <View style={frmStyles.container}>
        <View style={frmStyles.grupoInput}>
          <Text style={frmStyles.label}>DIA:</Text>
          <Text style={frmStyles.label}>Data da compra:</Text>
            <TouchableOpacity 
              onPress={showDatepicker} 
              style={frmStyles.input}
            >
              <Text style={frmStyles.txtButton}>{date.toLocaleString()}</Text>
            </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <SectionList
            sections={sections}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View style={frmStyles.grupoInput}>
                <Item 
                  produto={item} 
                  adicionarProduto={adicionarProduto} 
                  produtosSelecionados={produtos}
                />
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={frmStyles.label}>{title}</Text>
            )}
          />
        </View>

        <ButtonTitle titulo="Salvar" onPress={handleSave} />
      </View>

      <Modal
        transparent={true}
        animationType='slide'
        visible={isOpenModal}
        onRequestClose={() => {
           setIsOpenModal(!isOpenModal)
      }}>
        <AdicionaProduto setIsModalOpen={setIsOpenModal} listaAtualizar={ListaProdutos} />
      </Modal>
    </View>
  )
}