import { IProdutoCompra } from "@/utils/interface"
import { supabase } from "./supabase"

export function useProdutosCompras() {
  async function create(dadosProdutoCompra: Omit<IProdutoCompra, 'id'>) {
    try {
      const insertetRow = await supabase.from('produtoscompras').insert({
        categoria: dadosProdutoCompra.categoria,
        item: dadosProdutoCompra.item,
        quantidade: dadosProdutoCompra.quantidade,
        medida: dadosProdutoCompra.medida,
      })
      return { insertetRow }
    } catch (error) {
      throw error
    }
  }

return { create }
}