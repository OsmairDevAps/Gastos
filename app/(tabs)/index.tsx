import { useState, useCallback, useEffect } from 'react'
import { View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  Modal, 
  TextInput, 
  ImageBackground, 
  Image,
  ActivityIndicator
} from 'react-native'
import { useTransaction } from '@/database/useTransaction'
import { IBatida, IFuncionario, ITransaction } from '@/utils/interface'
import ViewTransaction from '../viewtransaction'
import styles from '@/styles/home'
import { useFocusEffect } from '@react-navigation/native'
import frmStyles from '@/styles/form'
import { useUsuario } from '@/database/useUsuario'
import { supabase } from '@/database/supabase'
import BaterPonto from '../screens/baterponto'

export default function Home() {
  const imgBaguete = '@/assets/images/imgbaguete.png'
  const creditos = '@/assets/images/logoOA.png'
  const relogio = '@/assets/images/relogio.png'
  const agora = new Date()
  const dataAtual = agora.toLocaleDateString()
  const transactionDatabase = useTransaction()
  const usuarioDatabase = useUsuario()
  const [logged, setLogged] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalLoginVisible, setIsModalLoginVisible] = useState(false)
  const [isModalPontoVisible, setIsModalPontoVisible] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null);
  const [batida, setBatida] = useState<IBatida[]>([])
  const [usuario, setUsuario] = useState('')
  const [funcionario, setFuncionario] = useState<IFuncionario>()
  const [senha, setSenha] = useState('')
  const [mes, setMes] = useState('5')
  const [ano, setAno] = useState('2025')
  const [totalDesp, setTotalDesp] = useState(0)
  const [totalRec, setTotalRec] = useState(0)
  const [despesas, setDespesas] = useState<ITransaction[]>([])
  const [receitas, setReceitas] = useState<ITransaction[]>([])

  async function SignToViewTransaction() {
    try {
      setIsLoading(true)
      const response = await usuarioDatabase.logaUsuario(usuario, senha)
      if (response.usuario !== null) {
        setLogged(true)
      }
      setIsLoading(false)
      setIsModalLoginVisible(false)
    } catch (error) {
      console.log(error)
    }
  }

  async function VerBatidas(funcionario_id: number) {
    try {
      if (funcionario_id > 0) {
        const { data } = await supabase
          .from('pontoeletronico')
          .select('*')
          .eq('funcionario_id', funcionario_id)
          .eq('dia', dataAtual)
          .order('hora', {ascending: true})
        if (data) {
          setBatida(data)
        }
      }
    } catch (error) {
      console.log(error)      
    }
  }

  function gerarIntervaloMensal(mes: number, ano: number) {
    if (mes < 1 || mes > 12) {
      throw new Error("Mês inválido");
    }
    // Cria a data inicial no primeiro dia do mês
    const inicio = new Date(ano, mes - 1, 1); // mês no JS vai de 0 a 11
    // Cria a data final no último milissegundo do mês
    const fim = new Date(ano, mes, 0, 23, 59, 59, 999); // 0º dia do próximo mês = último do mês atual
    // Converte para string ISO no formato UTC (timestampz)
    const inicioISO = inicio.toISOString(); // Ex: '2025-05-01T00:00:00.000Z'
    const fimISO = fim.toISOString();       // Ex: '2025-05-31T23:59:59.999Z'
    return { inicioISO, fimISO };
  }

  async function loadTransaction(tipo: string) {
    const { inicioISO, fimISO } = gerarIntervaloMensal(Number(mes), Number(ano));
    const response = await transactionDatabase.list(tipo, inicioISO, fimISO)
    if (response) {
      if (tipo === 'D') {
        const somaTotal = response.reduce((total, item) => total + item.valor, 0);
        setTotalDesp(somaTotal)
        setDespesas(response)
      }
      if (tipo === 'R') {
        const somaTotal = response.reduce((total, item) => total + item.valor, 0);
        setTotalRec(somaTotal)
        setReceitas(response)
      }
    }
  }

  function loadTransactions() {
    loadTransaction('D')
    loadTransaction('R')
  }

  const handleOpenModal = (transaction: ITransaction) => {
    setSelectedTransaction(transaction);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleOpenModalLogin = () =>{
    setIsModalLoginVisible(true);
  }
  
  const handleCloseModalLogin = () => {
    setIsModalLoginVisible(false);
  };
  
  const handleOpenModalPonto = () =>{
    setIsModalPontoVisible(true);
  }
  
  const handleCloseModalPonto = () => {
    setIsModalPontoVisible(false);
  };

  useEffect(() => {
    VerBatidas(Number(2))
  },[funcionario])

  useFocusEffect(
    useCallback(() => {
      loadTransaction('D')
      loadTransaction('R')
    }, [])
  );

  return (
    <View style={styles.container}>
      {logged ?
        <View style={{ padding: 16}}>
          <View style={styles.titleHome}>
            <Text style={styles.titulo}>LANÇAMENTOS</Text>
            <View style={styles.grupoFilter}>
              <TextInput
                style={frmStyles.inputMini}
                value={mes}
                onChangeText={(text) => setMes(text)}
                keyboardType='numeric'
              />
              <Text>/</Text>
              <TextInput
                style={frmStyles.inputMini}
                value={ano}
                onChangeText={(text) => setAno(text)}
                keyboardType='numeric'
              />
              <TouchableOpacity
                onPress={loadTransactions}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderColor: '#121212',
                  backgroundColor: '#aeaeae',
                  marginLeft: 4,
                  borderRadius: 8
                }}>
                <Text style={{ fontSize: 20 }}>Filtrar</Text>
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            style={styles.styleFlat}
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
            style={styles.styleFlat}
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
            <Text style={styles.textResumo}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalDesp)}</Text>
          </View>

          <View style={styles.resumo}>
            <Text style={styles.textResumo}>Total de receitas:</Text>
            <Text style={styles.textResumo}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalRec)}</Text>
          </View>

          <View style={styles.resumo}>
            <Text style={styles.textResumo}>SALDO FINAL: </Text>
            <Text style={styles.textResumo}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalRec - totalDesp)}</Text>
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
                  updateListTransactions={() => loadTransaction(selectedTransaction.tipo)}
                />
              )}
            </View>
          </Modal>
        </View> 
        :
        <ImageBackground 
          source={require(imgBaguete)} 
          resizeMode="cover" 
          style={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            gap: 20
          }}
        >
            <View style={{ width:'90%', backgroundColor: '#474747d2', borderRadius: 10, padding: 10, marginLeft: 20, marginRight: 20, marginTop: 50 }}>
              <Text style={{ color: '#cdcdcd', marginBottom: 10 }}>BATIDAS DE PONTO {dataAtual}:</Text>
              { batida.map(item => (
                <Text key={item.id} style={{ color: '#cdcdcd' }}>Hora ponto: {item.hora}</Text>
              ))}
            </View>

          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 30 }}>
            <TouchableOpacity onPress={handleOpenModalLogin} style={{ marginBottom: 16 }}>
              <Image source={require(creditos)} />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleOpenModalPonto} style={{ marginBottom: 16 }}>
              <Image source={require(relogio)} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      }

      <Modal
        visible={isModalLoginVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModalLogin}
      >
        <View style={{backgroundColor:'#000000', marginTop: 100, padding: 4, borderWidth: 1, borderColor: '#ffffff', marginLeft: 4, marginRight: 4 }}>
          <View style={{padding: 16}}>
            <Text style={frmStyles.txtsubmitLogin}>Entre com o Usuário e Senha</Text>
            <TextInput 
              style={frmStyles.input}
              placeholder='Nome de usuário'
              value={usuario}
              onChangeText={value => setUsuario(value)}
            />
            <TextInput 
              style={frmStyles.input}
              placeholder='******'
              value={senha}
              secureTextEntry={true}
              onChangeText={value => setSenha(value)}
            />
            <TouchableOpacity onPress={SignToViewTransaction} style={frmStyles.btnsubmitLogin}>
              {isLoading ? <ActivityIndicator color='#ffffff' /> : <Text style={frmStyles.txtsubmitLogin}>Acessar</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isModalPontoVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModalPonto}
      >
        <BaterPonto onClose={setIsModalPontoVisible} setFuncionario={setFuncionario} />
      </Modal>
    </View>
  );
}

