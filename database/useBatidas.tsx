import { IBatida } from "@/utils/interface";
import { supabase } from "./supabase";

export function useBatida() {
  async function criar(dadosBatida: Omit<IBatida, 'id'>) {
    try {
      const insertedRow = await supabase.from('pontoeletronico').insert({
        funcionario_id: dadosBatida.funcionario_id,
        dia: dadosBatida.dia,
        hora: dadosBatida.hora,
        latitude: dadosBatida.latitude,
        longitude: dadosBatida.longitude
      })
      return { insertedRow }
    } catch (error) {
      throw error
    }
  }

  async function alterar(dadosBatida: IBatida) {
    try {
      await supabase.from('pontoeletronico').update({
        funcionario_id: dadosBatida.funcionario_id,
        dia: dadosBatida.dia,
        hora: dadosBatida.hora,
        latitude: dadosBatida.latitude,
        longitude: dadosBatida.longitude
      }).eq('id', dadosBatida.id)
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

  async function listar() {
    try {
      const { data } = await supabase
        .from('view_batidas_ponto')
        .select('*')
      return data
    } catch (error) {
      throw error
    }
  }

  async function listarBatidasPorPeriodo(diaIni: string, diaFim: string) {
    const { data, error } = await supabase
      .rpc('fn_batidas_periodo', {
        data_inicio: diaIni,
        data_fim: diaFim
      })
    return { data, error }
  }

  async function listarQuantidadeBatidasPorPeriodo(diaIni: string, diaFim: string) {
    const { data, error } = await supabase
      .rpc('fn_contagem_dias_distintos', {
        data_inicio: diaIni,
        data_fim: diaFim
      })
    return { data, error }
  }

  async function listarBatidasPorFuncionario(id_funcionario: number) {
    try {
      const { data, error } = await supabase
        .from('pontoeletronico')
        .select('*')
        .eq('funcionario_id', id_funcionario)
      return { data, error }
    } catch (error) {
      throw error
    }
  }

  async function listarBatridasPorDia(dia: string) {
    try {
      const { data, error } = await supabase
        .from('pontoeletronico')
        .select('*')
        .eq('dia', dia)
      return { data, error }
    } catch (error) {
      throw error
    }
  }

  async function listarBatridasPorDiaFuncionario(dia: string, id_funcionario: number) {
    try {
      const { data, error } = await supabase
        .from('pontoeletronico')
        .select('*')
        .eq('dia', dia)
        .eq('funcionario_id', id_funcionario)
      return { data, error }
    } catch (error) {
      throw error
    }
  }

  return {
    criar,
    alterar,
    excluir,
    listar,
    listarBatidasPorPeriodo,
    listarQuantidadeBatidasPorPeriodo,
    listarBatidasPorFuncionario,
    listarBatridasPorDia,
    listarBatridasPorDiaFuncionario
  }
}