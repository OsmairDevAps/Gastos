import frmStyles from '@/styles/form';
import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, Keyboard, TouchableWithoutFeedback, StyleSheet } from 'react-native';

type Props = {
  options: string[];
  onSelect: (value: string) => void;
}

export default function SelectWithInput({ options, onSelect }: Props) {
  const [input, setInput] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleChange = (text: string) => {
    const upperText = text.toUpperCase();
    setInput(upperText);
    if (upperText.trim() === '') {
      setShowOptions(false);
      setFilteredOptions([]);
      return;
    }
    const filtered = options.filter(opt =>
      opt.toUpperCase().includes(upperText)
    );
    setFilteredOptions(filtered);
    setShowOptions(true); // 👈 mostra lista ao digitar
  };

  const handleSelect = (item: string) => {
    setInput(item);
    setShowOptions(false);
    setFilteredOptions([]);
    onSelect(item);
    Keyboard.dismiss(); 
  };

  return (
     <TouchableWithoutFeedback onPress={() => {
      setShowOptions(false);
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <TextInput
          style={frmStyles.input}
          placeholder="Digite ou selecione"
          value={input}
          onChangeText={handleChange}
          onFocus={() => {
            if (input.trim() !== '') setShowOptions(true);
          }}
        />

        {showOptions && (
        <FlatList
          style={styles.list}
          data={filteredOptions.length > 0 ? filteredOptions : [input]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              style={styles.option}
            >
              <Text>
                {filteredOptions.length > 0 ? item : `Criar nova categoria: "${item}"`}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    borderRadius: 6,
  },
  list: {
    maxHeight: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 5,
    borderRadius: 6,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

