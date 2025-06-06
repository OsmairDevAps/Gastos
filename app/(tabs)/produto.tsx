import { Alert, Text, TextInput, View, SectionList, TouchableOpacity } from "react-native";
import styles from '@/styles/lista'
import frmStyles from "@/styles/form";
import ButtonTitle from "@/components/buttontitle";
import Item from "@/components/produtocompra";
import { DProdutos } from "@/utils/database";
import { IProdutoCompra } from "@/utils/interface";

export default function Produto() {

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

  const sections = agruparPorCategoria(DProdutos);

  function teste() {
    Alert.alert('Testado')
  }

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.titulo}>ITENS A COMPRAR</Text>
        <ButtonTitle titulo="+ ITEM" onPress={teste} />
      </View>

      <View style={frmStyles.container}>
        <View style={frmStyles.grupoInput}>
          <Text style={frmStyles.label}>DIA:</Text>
          <TextInput
            style={frmStyles.input}
          />
        </View>

        <View style={{ flex: 1 }}>
          <SectionList
            sections={sections}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View style={frmStyles.grupoInput}>
                <Item produto={item} />
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={frmStyles.label}>{title}</Text>
            )}
          />
        </View>
      </View>
    </View>
  )
}