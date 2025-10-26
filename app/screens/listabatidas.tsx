import { useEffect, useState } from "react";
import { IBatida, IFuncionario } from "@/utils/interface";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useFuncionario } from "@/database/useFuncionario";
import { useBatida } from "@/database/useBatidas";

type Props = {
  closeModal: (onClose: boolean) => void;
}
type DateTimePickerMode = 'date' | 'time';

export default function ListaBatidas({ closeModal }: Props) {
  const funcionarioDatabase = useFuncionario()
  const batidasDatabase = useBatida()
  const [funcionarios, setFuncionarios] = useState<IFuncionario[]>([])
  const [batidas, setBatidas] = useState<IBatida[]>([])
  const [diaPonto, setDiaPonto] = useState(new Date());
  const [idFuncionario, setIdFuncionario] = useState(0);
  const [isListaFuncionarioAberta, setIsListaFuncionarioAberta] = useState(false)

  const showNomeFuncionario = () => {
    setIsListaFuncionarioAberta(true)
  }

  function MudaFuncionario(idfun: number) {
    setIdFuncionario(idfun)
    setIsListaFuncionarioAberta(false)
  }

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      const currentDate = selectedDate;
      setDiaPonto(currentDate);
    }
  };

  const showMode = (currentMode: DateTimePickerMode) => {
    DateTimePickerAndroid.open({
      value: diaPonto,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  function Close() {
    closeModal(false)
  }

  async function loadFuncionarios() {
    const response = await funcionarioDatabase.listar()
    if (response) {
      setFuncionarios(response)
    }
  }

  async function loadBatidas() {
    const response = await batidasDatabase.listar()
    if (response) {
      setBatidas(response)
    }
  }

  async function loadBatidasFiltro(dia: string, id_funcionario: number) {
    // const dia = diaPonto.toLocaleDateString()
    const { data, error } = await batidasDatabase.listarBatridasPorDiaFuncionario(dia, id_funcionario)
    if (data) {
      setBatidas(data)
    }
  }
  useEffect(() => {
    loadFuncionarios()
    loadBatidas()
  }, [diaPonto, idFuncionario])

  return (
    <View style={{
      flexDirection: 'column',
      marginTop: 160,
      marginHorizontal: 8,
      paddingHorizontal: 8,
      borderWidth: 1,
      borderColor: '#000000',
    }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50 }}>
        <Text style={{ fontWeight: 'bold' }}>BATIDAS DE PONTO:</Text>
        <TouchableOpacity
          onPress={Close}
          style={{ width: 40, padding: 2, alignItems: 'center', backgroundColor: '#ff0000' }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>X</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 16,
          padding: 4,
          backgroundColor: '#c3c3c3ff'
        }}
      >
        <TouchableOpacity
          onPress={showNomeFuncionario}
          style={{ width: 100 }}
        >
          <Text style={{ fontWeight: '600', textAlign: 'left' }}>NOME</Text>
        </TouchableOpacity>

        {isListaFuncionarioAberta &&
          <View style={{
            position: 'absolute',
            top: 30,
            zIndex: 10,
            gap: 8,
            padding: 8,
            backgroundColor: '#ffffff',
            borderWidth: 1,
            borderColor: '#a1a1a1',
            width: 150,
          }}
          >
            {
              funcionarios.map(item => (
                <TouchableOpacity key={item.id} onPress={() => MudaFuncionario(item.id)}>
                  <Text>{item.nome}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
        }

        <TouchableOpacity
          onPress={showDatepicker}
          style={{ width: 150 }}
        >
          <Text style={{ fontWeight: '600', textAlign: 'center' }}>DIA</Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: '600', width: 100, textAlign: 'center' }}>HORA</Text>
      </View>

      <FlatList
        data={batidas}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) =>
          <View
            key={item.id}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 16,
              padding: 4,
              borderBottomWidth: 1,
              borderBottomColor: '#e2e2e2'
            }}
          >
            <Text style={{ width: 100, textAlign: 'left' }}>{item.nome}</Text>
            <Text style={{ width: 150, textAlign: 'center' }}>{item.dia}</Text>
            <Text style={{ width: 100, textAlign: 'center' }}>{item.hora}</Text>
          </View>
        }
      />

    </View>
  )
}