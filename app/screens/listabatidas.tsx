import { useEffect, useState, useRef } from "react";
import { IBatida, IFuncionario } from "@/utils/interface";
import { Button, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useFuncionario } from "@/database/useFuncionario";
import { useBatida } from "@/database/useBatidas";

type Props = {
  closeModal: (onClose: boolean) => void;
}
type DateTimePickerMode = 'date' | 'time';

type TBatidas = {
  id: number;
  funcionario_id?: number;
  nome: string;
  dia: string;
  hora?: string;
  latitude?: number;
  longitude?: number;
}

type TQuantBatidas = {
  nome: string;
  funcionario_id: number;
  dias_com_batidas: number;
}

export default function ListaBatidas({ closeModal }: Props) {
  const [dIni, setDIni] = useState('')
  const [mIni, setMIni] = useState('')
  const [aIni, setAIni] = useState('')
  const [dFim, setDFim] = useState('')
  const [mFim, setMFim] = useState('')
  const [aFim, setAFim] = useState('')
  // Refs para controlar o foco
  const mIniRef = useRef<TextInput>(null);
  const aIniRef = useRef<TextInput>(null);
  const dFimRef = useRef<TextInput>(null);
  const mFimRef = useRef<TextInput>(null);
  const aFimRef = useRef<TextInput>(null);

  const funcionarioDatabase = useFuncionario()
  const batidasDatabase = useBatida()
  const [funcionarios, setFuncionarios] = useState<IFuncionario[]>([])
  const [batidas, setBatidas] = useState<TBatidas[]>([])
  const [quantBatidas, setQuantBatidas] = useState<TQuantBatidas[]>([])
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

  async function filtrarBatidas() {
    const diaInicial = dIni + '/' + mIni + '/' + aIni
    const diaFinal = dFim + '/' + mFim + '/' + aFim
    const { data, error } = await batidasDatabase.listarBatidasPorPeriodo(diaInicial, diaFinal)
    if (data) {
      setBatidas(data)
    }
    const { data: quantidade } = await batidasDatabase.listarQuantidadeBatidasPorPeriodo(diaInicial, diaFinal)
    console.log(quantidade)
  }

  async function filtrarQuantBatidas() {
    const diaInicial = dIni + '/' + mIni + '/' + aIni
    const diaFinal = dFim + '/' + mFim + '/' + aFim
    const { data, error } = await batidasDatabase.listarQuantidadeBatidasPorPeriodo(diaInicial, diaFinal)
    if (data) {
      setQuantBatidas(data)
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
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#a1a1a1',
        borderBottomWidth: 1
      }}>
        <Text style={{ fontWeight: 'bold' }}>BATIDAS DE PONTO:</Text>
        <TouchableOpacity
          onPress={Close}
          style={{ width: 40, padding: 2, alignItems: 'center', backgroundColor: '#ff0000' }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>X</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: 'bold', margin: 10 }}>Periodo:</Text>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 10 }}>
          <TextInput
            placeholder="dd"
            keyboardType="numeric"
            maxLength={2}
            style={{ width: 40, textAlign: 'center', borderWidth: 1, borderColor: '#a1a1a1', borderRadius: 8 }}
            value={dIni}
            onChangeText={(txt) => {
              setDIni(txt);
              if (txt.length === 2) mIniRef.current?.focus();
            }}
          />
          <Text style={{ marginHorizontal: 4 }}>/</Text>
          <TextInput
            ref={mIniRef}
            placeholder="mm"
            keyboardType="numeric"
            maxLength={2}
            style={{ width: 44, textAlign: 'center', borderWidth: 1, borderColor: '#a1a1a1', borderRadius: 8 }}
            value={mIni}
            onChangeText={(text) => {
              setMIni(text);
              if (text.length === 2) aIniRef.current?.focus();
            }}
          />
          <Text style={{ marginHorizontal: 4 }}>/</Text>
          <TextInput
            ref={aIniRef}
            placeholder="aaaa"
            keyboardType="numeric"
            maxLength={4}
            style={{ width: 62, textAlign: 'center', borderWidth: 1, borderColor: '#a1a1a1', borderRadius: 8 }}
            value={aIni}
            onChangeText={(text) => {
              setAIni(text);
              if (text.length === 4) dFimRef.current?.focus()
            }}
          />

          <Text style={{ marginHorizontal: 10, fontWeight: 'bold' }}>até</Text>

          <TextInput
            ref={dFimRef}
            placeholder="dd"
            keyboardType="numeric"
            maxLength={2}
            style={{ width: 40, textAlign: 'center', borderWidth: 1, borderColor: '#a1a1a1', borderRadius: 8 }}
            value={dFim}
            onChangeText={(text) => {
              setDFim(text);
              if (text.length === 2) mFimRef.current?.focus()
            }}
          />
          <Text style={{ marginHorizontal: 4 }}>/</Text>
          <TextInput
            ref={mFimRef}
            placeholder="mm"
            keyboardType="numeric"
            maxLength={2}
            style={{ width: 44, textAlign: 'center', borderWidth: 1, borderColor: '#a1a1a1', borderRadius: 8 }}
            value={mFim}
            onChangeText={(text) => {
              setMFim(text);
              if (text.length === 2) aFimRef.current?.focus()
            }}
          />
          <Text style={{ marginHorizontal: 4 }}>/</Text>
          <TextInput
            ref={aFimRef}
            placeholder="aaaa"
            keyboardType="numeric"
            maxLength={4}
            style={{ width: 62, textAlign: 'center', borderWidth: 1, borderColor: '#a1a1a1', borderRadius: 8 }}
            value={aFim}
            onChangeText={(text) => setAFim(text)}
          />
        </View>

        <Button title="Filtrar" onPress={filtrarQuantBatidas} />
      </View>

      {quantBatidas &&
        <View style={{ marginBottom: 16 }}>
          <Text>Quantidade de batidas no período:</Text>
          <FlatList
            data={quantBatidas}
            keyExtractor={item => String(item.funcionario_id)}
            renderItem={({ item }) =>
              <View
                key={item.funcionario_id}
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
                <Text style={{ width: 150, textAlign: 'center' }}>{item.dias_com_batidas}</Text>
              </View>
            }
          />
        </View>
      }

      {/* LISTA DE FUNCIONARIOS */}
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