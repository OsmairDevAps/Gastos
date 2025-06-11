import { Text, TextInput, View, FlatList, TouchableOpacity } from "react-native";
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useListaCompras } from "@/database/useListaCompras";
import { useEffect, useState } from "react";
import ItemListaCompra from "@/components/itemlistacompra";
import styles from '@/styles/lista'
import frmStyles from "@/styles/form";

export type TListaCompraProps = {
  id: number;
  item: string;
  datacompra: Date;
  marcado: boolean;
  adquirido: boolean;
}

type DateTimePickerMode = 'date' | 'time';

export default function Compra() {
  const [date, setDate] = useState(new Date());
  const listaComprasDatabase = useListaCompras()
  const [listaCompras, setListaCompras] = useState<TListaCompraProps[]>([])
  
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

  async function listarProdutos() {
    try {
      const response = await listaComprasDatabase.listar()
      if (response) {
        setListaCompras(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    listarProdutos()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.titulo}>LISTA DE COMPRAS</Text>
      </View>

      <View style={frmStyles.container}>
        <View style={frmStyles.grupoInput}>
          <Text style={frmStyles.label}>DIA:</Text>
          <TouchableOpacity 
            onPress={showDatepicker} 
            style={frmStyles.input}
          >
            <Text style={frmStyles.txtButton}>{date.toLocaleString()}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            data={listaCompras}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <ItemListaCompra produto={item} />
            )}
          />
        </View>
      </View>
    </View>
  )
}