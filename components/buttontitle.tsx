import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  titulo: string;
  onPress: () => void;
}

export default function ButtonTitle({titulo, onPress}: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    borderRadius: 8,
    backgroundColor: '#000000',
    width: 100,
    height: 40,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  }
})