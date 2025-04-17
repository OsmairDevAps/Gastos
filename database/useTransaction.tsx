import { supabase } from "./supabase";
import { ITransaction } from "../utils/interface"; 

export function useTransaction() {
  async function create(dataTransaction: Omit<ITransaction, "id">) {
    try {
      const insertedRow = await supabase
      .from('transacoes')
      .insert({
        data: dataTransaction.data,
        tipo: dataTransaction.tipo,
        descricao: dataTransaction.descricao,
        quant: dataTransaction.quant,
        valor: dataTransaction.valor
      })
      return { insertedRow }
    } catch (error) {
      throw error
    }
  }

  async function update(dataTransaction: ITransaction) {
    try {
      await supabase
      .from('transacoes')
      .update({
        data: dataTransaction.data,
        tipo: dataTransaction.tipo,
        descricao: dataTransaction.descricao,
        quant: dataTransaction.quant,
        valor: dataTransaction.valor
      })
      .eq('id', dataTransaction.id)
    } catch (error) {
      throw error
    }
  }

  async function remove(id: Number) {
    try {
      await supabase.from('transacoes').delete().eq('id', id)
    } catch (error) {
      throw error
    }
  }

  async function list(tipo: string) {
    try {
      const { data } = await supabase
        .from('transacoes')
        .select('*')
        .eq('tipo', tipo)
        .order('data', {ascending: true})
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async function searchById(id: number) {
    try {
      const { data } = await supabase.from('transacoes').select('*').eq('id', id)
      return data
    } catch (error) {
      console.log(error)
    }
  }
  
  return { create, update, remove, list, searchById }
}