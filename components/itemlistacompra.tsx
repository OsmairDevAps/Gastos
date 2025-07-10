import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, FontAwesome6, Feather } from '@expo/vector-icons';
import { TListaCompraProps } from "@/app/(tabs)/compra";
import { useState } from "react";

type Props = {
  produto: TListaCompraProps;
  onDelete: (id: number)=>void;
}

export default function ItemListaCompra({produto, onDelete}: Props) {
  const [estaSelecionado, setEstaSelecionado] = useState(false)

  function handleSelect() {
    setEstaSelecionado(!estaSelecionado)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.itemList} onPress={handleSelect}>
        {estaSelecionado ? 
          <AntDesign size={28} name="checksquare" /> :
          <FontAwesome6 size={24} name="square-full" />
        }
        <Text style={styles.titulo}>{produto.item}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onDelete(produto.id)}>
        <Feather name="trash-2" size={20} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 4,
    borderRadius: 8,
    gap: 10,
    width: '100%',
    height: 40,
  },
  itemList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 4,
    borderRadius: 8,
    gap: 10
  },
  titulo: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600'
  }
})