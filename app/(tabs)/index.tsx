import { useEffect, useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, FlatList, Modal } from 'react-native'
import { useTransaction } from '@/database/useTransaction'
import { ITransaction } from '@/utils/interface'
import ViewTransaction from '../viewtransaction'
import styles from '@/styles/home'
import { useFocusEffect } from '@react-navigation/native'

export default function Home() {
  const transactionDatabase = useTransaction()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null);
  const [totalDesp, setTotalDesp] = useState(0)
  const [totalRec, setTotalRec] = useState(0)
  const [despesas, setDespesas] = useState<ITransaction[]>([])
  const [receitas, setReceitas] = useState<ITransaction[]>([])

  async function loadTransaction(tipo: string) {
    const response = await transactionDatabase.list(tipo)
    if (response) {
      if(tipo==='D') {
        const somaTotal = response.reduce((total, item) => total + item.valor, 0);
        setTotalDesp(somaTotal)
        setDespesas(response)
      }
      if(tipo==='R') {
        const somaTotal = response.reduce((total, item) => total + item.valor, 0);
        setTotalRec(somaTotal)
        setReceitas(response)
      }
    }
  }

  const handleOpenModal = (transaction: ITransaction) => {
    setSelectedTransaction(transaction);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadTransaction('D')
      loadTransaction('R')
    }, [])
  );

  // useEffect(() => {
  //   loadTransaction('D')
  //   loadTransaction('R')
  // },[])

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>LANÇAMENTOS</Text>

      <FlatList 
        style= { styles.styleFlat }
        data={despesas}
        ListHeaderComponent={() => (
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Despesas</Text>
        )}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleOpenModal(item)}>
            <View style={[styles.grupoDespesas, index % 2 === 0 ? styles.fundoImpar : styles.fundoPar]}>
              <Text>
                {Intl.DateTimeFormat('pt-BR', { 
                  day: '2-digit', 
                  month: '2-digit', 
                  year: 'numeric' 
                }).format(new Date(item.data))}
              </Text>
              <Text>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency', 
                  currency: 'BRL'
                }).format(item.valor)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <FlatList 
        style= { styles.styleFlat }
        data={receitas}
        ListHeaderComponent={() => (
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Receitas</Text>
        )}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleOpenModal(item)}>
            <View style={[styles.grupoReceitas, index % 2 === 0 ? styles.fundoImpar : styles.fundoPar]}>
              <Text>
                {Intl.DateTimeFormat('pt-BR', { 
                  day: '2-digit', 
                  month: '2-digit', 
                  year: 'numeric' 
                }).format(new Date(item.data))}
              </Text>
              <Text>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency', 
                  currency: 'BRL'
                }).format(item.valor)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.resumo}>
        <Text style={styles.textResumo}>Total de despesas:</Text>
        <Text style={styles.textResumo}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(totalDesp)}</Text>
      </View>

      <View style={styles.resumo}>
        <Text style={styles.textResumo}>Total de receitas:</Text>
        <Text style={styles.textResumo}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(totalRec)}</Text>
      </View>

      <View style={styles.resumo}>
        <Text style={styles.textResumo}>SALDO FINAL: </Text>
        <Text style={styles.textResumo}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(totalRec - totalDesp)}</Text>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={{ padding: 4 }}>
          {selectedTransaction && (
            <ViewTransaction
              transaction={selectedTransaction}
              setCloseModal={setIsModalVisible}
              updateListTransactions={()=>loadTransaction(selectedTransaction.tipo)}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

