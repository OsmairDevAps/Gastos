import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import { IProdutoCompra } from "@/utils/interface";

type Props = {
  produto: IProdutoCompra;
  adicionarProduto: (prod: IProdutoCompra) => void;
  produtosSelecionados: IProdutoCompra[]; // ou string[] se for só IDs
}

export default function ProdutoCompra({produto, adicionarProduto, produtosSelecionados}: Props) {
  const estaSelecionado = produtosSelecionados.some(p => p.id === produto.id);
  function handleChange(prod: IProdutoCompra) {
    adicionarProduto(prod)
  }

  return (
    <TouchableOpacity style={styles.container} onPress={()=>handleChange(produto)}>
      {estaSelecionado ? 
        <AntDesign size={28} name="checksquare" /> :
        <FontAwesome6 size={24} name="square-full" />
      }
      <Text style={styles.titulo}>{produto.item}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 4,
    borderRadius: 8,
    gap: 10,
    width: 200,
    height: 40,
  },
  titulo: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600'
  }
})