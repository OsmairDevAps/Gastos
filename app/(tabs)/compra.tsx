import { Text, TextInput, View, FlatList } from "react-native";
import styles from '@/styles/lista'
import frmStyles from "@/styles/form";
import Item from "@/components/produtocompra";
import { DProdutos } from "@/utils/database";

export default function Compra() {

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.titulo}>LISTA DE COMPRAS</Text>
      </View>

      <View style={frmStyles.container}>
        <View style={frmStyles.grupoInput}>
          <Text style={frmStyles.label}>DIA:</Text>
          <TextInput
            style={frmStyles.input}
          />
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            data={DProdutos}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View style={frmStyles.grupoInput}>
                <Item produto={item} />
              </View>
            )}
          />
        </View>
      </View>
    </View>
  )
}