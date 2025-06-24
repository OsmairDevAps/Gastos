import { IUsuario } from '@/utils/interface';
import bcrypt from 'bcryptjs'
import { supabase } from './supabase';

export function useUsuario() {
  async function criaUsuario(data: Omit<IUsuario, 'id'>) {
    const salt = bcrypt.genSaltSync(8);
    const passwordHash = bcrypt.hashSync(data.senha, salt);
    const { data: insertedRow, error } = await supabase.from('usuarios').insert({
      nome: data.nome,
      nomeusuario: data.nomeusuario,
      senha: passwordHash,
      tipo: data.tipo,
      foto: data.foto
    });

    if (error) console.error(error);
    return insertedRow;
  }

  async function logaUsuario(nomeusuario: string, senha: string) {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('nomeusuario', nomeusuario)
      .single();

    if (!data) {
      return { usuario: null, message: 'Usuário não encontrado' };
    }

    const senhaCorreta = bcrypt.compareSync(senha, data.senha);
    if (!senhaCorreta) {
      return { usuario: null, message: 'Senha incorreta' };
    }

    return {usuario: data.nomeusuario}
  }
  
  return { criaUsuario, logaUsuario };
}