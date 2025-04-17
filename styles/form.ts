import { StyleSheet } from 'react-native';

const frmStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  label: {
    fontWeight: '600',
    fontSize: 18,
  },
  grupoInput: {
    
  },
  input: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 18,
    width: '100%',
    height: 50,
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#cbc9c9',
    backgroundColor: '#eaeaea',
  },
  btnsubmit: {
    width: '100%',
    height: 60,
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#0d8199',
    alignSelf: 'flex-end', // Alinha ao final se necessário
  },
  txtsubmit: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 18,
  },
  txterror: {
    color: '#990000',
  },
})

export default frmStyles