import { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import MaskInput, { Masks } from 'react-native-mask-input';
import styles from '@/styles/receita'
import frmStyles from '@/styles/form'
import { useTransaction } from '@/database/useTransaction';
import { Feather } from '@expo/vector-icons';
import { parseDataBrParaDate } from '@/utils/functions';

const receitaSchema = z.object({
  valor: z.string().min(1, 'O valor é obrigatório'),
})

type FormData = z.infer<typeof receitaSchema>;

export default function Receita() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const transactionDatabase = useTransaction()
  const [descricao, setDescricao] = useState('')
  const [quant, setQuant] = useState('')
  const [data, setData] = useState('')
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      valor: ''
    }
  });

  function resetForm() {
    setDescricao('')
    setQuant('')
    reset()
  }

  async function onSubmit(dataForm: FormData) {
    const rawValue = dataForm.valor.replace(/\D/g, '');
    const finalValue = parseFloat(rawValue) / 100;
    const dataConvertida = parseDataBrParaDate(data);
    const dados = {
      data: dataConvertida,
      tipo: 'R',
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
    Alert.alert('Receita incluida com sucesso!')
    resetForm()
  }

  return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <Text style={styles.titulo}>LANÇAMENTO DE RECEITAS</Text>
        </View>
      
        <View style={frmStyles.container}>
          <View style={frmStyles.grupoInput}>
            <Text style={frmStyles.label}>Data da venda:</Text>
            <MaskInput
              value={data}
              onChangeText={(masked) => setData(masked)}
              mask={Masks.DATE_DDMMYYYY}
              keyboardType="numeric"
              placeholder="dd/mm/aaaa"
              style={frmStyles.input}
            />
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
            {errors.valor && <Text style={frmStyles.txterror}>This is required.</Text>}
          </View>

          <View style={frmStyles.grupoInput}>
            <Text style={frmStyles.label}>Descrição da venda (opcional):</Text>
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