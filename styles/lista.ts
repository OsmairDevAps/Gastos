import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
  },
  titulo: {
    padding: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  navbar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#cecece',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  texto: {
    fontWeight: '500',
    fontSize: 16,
  },
  form: {
    padding: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 8,
  },
  groupInput: {
    display: 'flex',
    gap: 4
  },
  label: {
    fontWeight: '500',
    fontSize: 16
  },
  modal: {
    marginTop: 70,
    padding: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000000',
    shadowColor: '#000000',
  }
});

export default styles;