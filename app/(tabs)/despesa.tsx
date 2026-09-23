import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import MaskInput, { Masks } from 'react-native-mask-input';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'
import { useTransaction } from '@/database/useTransaction';
import { parseDataBrParaDate } from '@/utils/functions';
import styles from '@/styles/lista'
import frmStyles from '@/styles/form'
import { ICategoriaTransacao } from '@/utils/interface';

const despesaSchema = z.object({
  valor: z.string().min(1, 'O valor é obrigatório'),
})

type FormData = z.infer<typeof despesaSchema>;
type DateTimePickerMode = 'date' | 'time';

export default function Despesa() {
  const [date, setDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const transactionDatabase = useTransaction()
  const [data, setData] = useState('')
  const [descricao, setDescricao] = useState('')
  const [quant, setQuant] = useState('')
  const [categoriaTransacao, setCategoriaTransacao] = useState('COMPRAS')
  const [categoriasTransacoes, setCategoriasTransacoes] = useState<ICategoriaTransacao[]>([])
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      valor: ''
    }
  });

  async function ListaCategoriasTransacoes(tipo: string) {
    try {
      const response = await transactionDatabase.listarCategoriasTransacoes(tipo)
      if (response) {
        setCategoriasTransacoes(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      const currentDate = selectedDate;
      setDate(currentDate);
    }
  };

  const showMode = (currentMode: DateTimePickerMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  function resetForm() {
    setDescricao('')
    setQuant('')
    reset()
  }

  async function onSubmit(dataForm: FormData) {
    setIsSubmitting(true); // começa o loading
    const rawValue = dataForm.valor.replace(/\D/g, '');
    const finalValue = parseFloat(rawValue) / 100;
    const dataConvertida = parseDataBrParaDate(data);
    const dados = {
      data: date,
      tipo: 'D',
      descricao: descricao,
      quant: quant,
      valor: finalValue,
      categoria: categoriaTransacao
    }
    try {
      await transactionDatabase.create(dados)
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false); // termina o loading
    }
    Alert.alert('Despesa incluída com sucesso!')
    resetForm()
  }

  useEffect(() => {
    ListaCategoriasTransacoes('D')
  }, [])

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      extraScrollHeight={80}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ padding: 0, flexGrow: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.navbar}>
          <Text style={styles.titulo}>LANÇAMENTO DE DESPESAS</Text>
        </View>

        <View style={frmStyles.container}>
          <View style={frmStyles.grupoInput}>
            <Text style={frmStyles.label}>Data da compra:</Text>
            <TouchableOpacity
              onPress={showDatepicker}
              style={frmStyles.input}
            >
              <Text style={frmStyles.txtButton}>{date.toLocaleString()}</Text>
            </TouchableOpacity>
          </View>

          <View style={frmStyles.grupoInput}>
            <Text style={frmStyles.label}>Valor:</Text>
            <Controller
              control={control}
              name="valor"
              render={({ field: { onChange, value } }) => (
                <MaskInput
                  value={value}
                  onChangeText={onChange}
                  mask={Masks.BRL_CURRENCY}
                  keyboardType="numeric"
                  style={frmStyles.input}
                  placeholderTextColor="#636262"
                />
              )}
            />
            {errors.valor && <Text style={frmStyles.txterror}>O valor é obrigatório</Text>}
          </View>

          <View style={frmStyles.grupoInput}>
            <Text style={frmStyles.label}>Descrição do que comprou (opcional):</Text>
            <TextInput
              style={frmStyles.input}
              value={descricao}
              onChangeText={(text) => setDescricao(text)}
            />
          </View>

          <View style={frmStyles.grupoInput}>
            <Text style={frmStyles.label}>Categoria:</Text>
            <Picker
              style={frmStyles.select}
              selectedValue={categoriaTransacao}
              onValueChange={(itemValue) => setCategoriaTransacao(itemValue)}
            >
              {
                categoriasTransacoes.map(item => (
                  <Picker.Item key={item.id} label={item.categoria} value={item.categoria} />
                ))
              }
            </Picker>
          </View>

          <TouchableOpacity
            style={[frmStyles.btnsubmit, isSubmitting && { opacity: 0.6 }]}
            onPress={handleSubmit(onSubmit)}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={frmStyles.txtsubmit}>Salvar</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}