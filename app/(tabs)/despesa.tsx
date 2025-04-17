import { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, ActivityIndicator, Button } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import MaskInput, { Masks } from 'react-native-mask-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTransaction } from '@/database/useTransaction';
import { parseDataBrParaDate } from '@/utils/functions';
import styles from '@/styles/despesa'
import frmStyles from '@/styles/form'

const despesaSchema = z.object({
  valor: z.string().min(1, 'O valor é obrigatório'),
})

type FormData = z.infer<typeof despesaSchema>;

export default function Despesa() {
  const [date, setDate] = useState(new Date(1598051730000));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const transactionDatabase = useTransaction()
  const [data, setData] = useState('')
  const [descricao, setDescricao] = useState('')
  const [quant, setQuant] = useState('')
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      valor: ''
    }
  });

  //datetimepicker
  const onChange = (selectedDate: Date) => {
    const currentDate = selectedDate;
    setDate(currentDate);
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
      data: dataConvertida,
      tipo: 'D',
      descricao: descricao,
      quant: quant,
      valor: finalValue,
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

  return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <Text style={styles.titulo}>LANÇAMENTO DE DESPESAS</Text>
        </View>
        
        <View style={frmStyles.container}>
          <View style={frmStyles.grupoInput}>
            <Text style={frmStyles.label}>Data da compra:</Text>
            <Text>selected: {date.toLocaleString()}</Text>
            <DateTimePicker 
              value={date}
              onChange={() => setDate}
              mode='date'
              is24Hour={true}
            />
            {/* <MaskInput
              value={data}
              onChangeText={(masked) => setData(masked)}
              mask={Masks.DATE_DDMMYYYY}
              keyboardType="numeric"
              placeholder="dd/mm/aaaa"
              style={frmStyles.input}
            /> */}
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
              onChangeText={(text)=>setDescricao(text)}
            />
          </View>

          <View style={frmStyles.grupoInput}>
            <Text style={frmStyles.label}>Quantidade (opcional):</Text>
            <TextInput 
              style={frmStyles.input}
              value={quant}
              onChangeText={(text)=>setQuant(text)}
            />
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
  )
}