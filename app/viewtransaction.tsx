import { useEffect, useState } from "react"
import { Alert, Text, TouchableOpacity, View } from "react-native"
import { ITransaction } from "../utils/interface"
import { useTransaction } from "../database/useTransaction"
import viewStyle from "../styles/view"

type Props = {
  transaction: ITransaction;
  setCloseModal: (isOpen:boolean) => void;
  updateListTransactions: () => void;
}

export default function ViewTransaction({transaction, setCloseModal, updateListTransactions}: Props) {
  const transactionDatabase = useTransaction()
  const [nameTransaction, setNameTransaction] = useState('')

  function handleDelete(id: number) {
    Alert.alert(
      'Confirmar exclusão',
      'Você tem certeza que deseja excluir este registro?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            deleteRegister(id)
          },
        },
      ],
      { cancelable: true }
    );
    
  }

  async function deleteRegister(id: number ) {
    await transactionDatabase.remove(id)
    updateListTransactions()
    setCloseModal(false)
  }

  useEffect(() => {
    if(transaction.tipo === 'D') {
      setNameTransaction('DESPESA')
    }
    if(transaction.tipo === 'R') {
      setNameTransaction('RECEITA')
    }
  }, [transaction])

  return (
    <View style={viewStyle.container}>
      <Text style={viewStyle.title}>{nameTransaction}</Text>
      <View style={viewStyle.content}>
        <Text>Data: {Intl.DateTimeFormat('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric'}).format(new Date(transaction.data))}</Text>
        <Text>Descrição: {transaction.descricao ? transaction.descricao : '-'}</Text>
        <Text>Quantidade: {transaction.quant ? transaction.quant : '-'}</Text>
        <Text>Valor: {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(transaction.valor)}</Text>

        <View style={viewStyle.buttons}>
          <TouchableOpacity style={viewStyle.btnBack} onPress={() => setCloseModal(false)}>
            <Text style={viewStyle.txtButton}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={viewStyle.btnRemove} onPress={() => handleDelete(transaction.id)}>
            <Text style={viewStyle.txtButton}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}