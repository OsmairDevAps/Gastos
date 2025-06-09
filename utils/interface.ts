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
  quantidade: number;
  medida: string;
  marcado?: boolean;
}

//listacompras
export interface IItemCompra {
  id: number;
  categoria: string;
  idproduto: number;
  datacompra: Date;
  marcado: boolean;
  valor: number;
  adquirido: boolean;
  localadquirido: string;
}
