import { IFuncionario } from "@/utils/interface";
import { supabase } from "./supabase";

export function useFuncionario() {
  async function criar(dadosFuncionario: Omit<IFuncionario, 'id'>) {
    try {
      const insertedRow = await supabase.from('funcionarios').insert({
        nome: dadosFuncionario.nome,
        pin: dadosFuncionario.pin,
        ativo: dadosFuncionario.ativo
      })
      return { insertedRow }
    } catch (error) {
      throw error
    }
  }

  async function alterar(dadosFuncionario: IFuncionario) {
    try {
      await supabase.from('funcionarios').update({
        nome: dadosFuncionario.nome,
        pin: dadosFuncionario.pin,
        ativo: dadosFuncionario.ativo
      }).eq('id', dadosFuncionario.id)
    } catch (error) {
      throw error
    }
  }

  async function excluir(id: number) {
    try {
      await supabase.from('funcionarios').delete().eq('id', id)
    } catch (error) {
      throw error
    }
  }

  async function logar(nome: string, pin: string) {
    try {
      const { data, error } = await supabase
        .from('funcionarios')
        .select('*')
        .eq('nome', nome)
        .eq('pin', pin)
      return { data, error }
    } catch (error) {
      throw error
    }
  }

  async function listar() {
    try {
      const { data } = await supabase
        .from('funcionarios')
        .select('*')
      return data
    } catch (error) {
      throw error
    }
  }

  async function listarFuncionario(pin: string) {
    try {
      const { data, error } = await supabase
        .from('funcionarios')
        .select('*')
        .eq('pin', pin)
        .single()
      return { data, error }
    } catch (error) {
      throw error
    }
  }

  return { criar, alterar, excluir, logar, listar, listarFuncionario }
}