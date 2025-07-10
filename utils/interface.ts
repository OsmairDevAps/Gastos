export interface ITransaction {
  id: number;
  data: Date;
  tipo: string;
  descricao: string;
  quant: string;
  valor: number;
}

//produtoscompras
export interface IProdutoCompra {
  id: number;
  categoria: string;
  item: string;
  medida: string;
}

//listacompras
export interface IItemCompra {
  id: number;
  categoria: string;
  idproduto: number;
  datacompra: string;
  marcado: boolean;
  valor: number;
  adquirido: boolean;
  localadquirido: string;
}

//usuarios
export interface IUsuario {
  id: number;
  nome: string;
  tipo: string;
  nomeusuario: string;
  senha: string;
  foto: string;
}

export interface IBatida {
  id: number;
  funcionario_id: number;
  dia: string;
  hora: string;
  latitude: number;
  longitude: number;
}

export interface IFuncionario {
  id: number;
  nome: string;
  pin: string;
  ativo: boolean;
}