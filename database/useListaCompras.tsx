import { IItemCompra } from "@/utils/interface"
import { supabase } from "./supabase"

export function useListaCompras() {
  async function criar(dadosListaCompra: Omit<IItemCompra, 'id'>) {
    try {
      const insertetRow = await supabase.from('listacompras').insert({
        categoria: dadosListaCompra.categoria,
        idproduto: dadosListaCompra.idproduto,
        datacompra: dadosListaCompra.datacompra,
        marcado: dadosListaCompra.marcado,
        valor: dadosListaCompra.valor,
        adquirido: dadosListaCompra.adquirido,
        localadquirido: dadosListaCompra.localadquirido,
      })
      return { insertetRow }
    } catch (error) {
      throw error
    }
  }

  async function atualizar(dadosListaCompra: IItemCompra) {
    try {
      await supabase.from('listacompras').insert({
        categoria: dadosListaCompra.categoria,
        idproduto: dadosListaCompra.idproduto,
        datacompra: dadosListaCompra.datacompra,
        marcado: dadosListaCompra.marcado,
        valor: dadosListaCompra.valor,
        adquirido: dadosListaCompra.adquirido,
        localadquirido: dadosListaCompra.localadquirido,
      }).eq('id', dadosListaCompra.id)
      return 
    } catch (error) {
      throw error
    }
  }

  async function listar() {
    try {
      const { data } = await supabase
        .from('view_itens_compra')
        .select('*')
      return data
    } catch (error) {
      throw error
    }
  }

  async function listarPorData(dataCompra: string) {
    try {
      const { data } = await supabase
        .from('view_itens_compra')
        .select('*')
        .eq('datacompra', dataCompra)
        .order('item', { ascending: true })
      return data
    } catch (error) {
      throw error
    }
  }

return { criar, atualizar, listar, listarPorData }
}