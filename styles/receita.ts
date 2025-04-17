import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
  },
  titulo: {
    width: '100%',
    textAlign: 'center',
    padding: 8,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  navbar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e4f7fd',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 4,
  },
  texto: {
    fontWeight: '500',
    fontSize: 16,
  }
});

export default styles;