import { IProdutoCompra } from "@/utils/interface"
import { supabase } from "./supabase"

export function useProdutosCompras() {
  async function criar(dadosProdutoCompra: Omit<IProdutoCompra, 'id'>) {
    try {
      const insertetRow = await supabase.from('produtoscompras').insert({
        categoria: dadosProdutoCompra.categoria,
        item: dadosProdutoCompra.item,
        medida: dadosProdutoCompra.medida,
      })
      return { insertetRow }
    } catch (error) {
      throw error
    }
  }

  async function listarCategorias() {
    try {
      const { data } = await supabase.from('view_nomes_categorias').select('*')
      return data
    } catch (error) {
      throw error
    }
  }

  async function listarProdutos(nome?: string) {
    try {
      let query = supabase
        .from('produtoscompras')
        .select('*')
        .order('categoria', { ascending: true })
        .order('item', { ascending: true });

      if (nome && nome.trim() !== '') {
        query = query.like('item', `%${nome}%`); // usa curingas
      }

      const { data, error } = await query;

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      throw error;
    }
  }

  return { criar, listarCategorias, listarProdutos }
}