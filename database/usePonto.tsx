import { IBatida } from "@/utils/interface";
import { supabase } from "./supabase";

export function usePonto() {
  async function criar(dadosPonto: Omit<IBatida, 'id'>) {
    try {
      const { data, error } = await supabase.from('pontoeletronico').insert({
        funcionario_id: dadosPonto.funcionario_id,
        dia: dadosPonto.dia,
        hora: dadosPonto.hora,
        latitude: dadosPonto.latitude,
        longitude: dadosPonto.longitude,
      }).select('*');
      return { data , error }
    } catch (error) {
      throw error
    }
  }

  async function excluir(id: number) {
    try {
      await supabase.from('pontoeletronico').delete().eq('id', id)
    } catch (error) {
      throw error
    }
  }

  return { criar, excluir }
}