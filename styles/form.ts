import { StyleSheet } from 'react-native';

const frmStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  containerLogin: {
    flex: 1,
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  label: {
    fontWeight: '600',
    fontSize: 18,
    marginTop: 10,
  },
  grupoInputLogin: {
    display: 'flex',
    width: '100%',
    marginBottom: 4,
  },
  grupoInput: {
    display: 'flex',
    marginBottom: 4,
  },
  input: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 20,
    width: '100%',
    height: 50,
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#cbc9c9',
    backgroundColor: '#eaeaea',
  },
  inputMedio: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 20,
    width: 150,
    height: 40,
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#cbc9c9',
    backgroundColor: '#eaeaea',
  },
  inputMini: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 20,
    width: 60,
    height: 40,
    borderRadius: 8,
    padding: 8,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#cbc9c9',
    backgroundColor: '#eaeaea',
  },
  txtButton: {
    fontSize: 20,
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
    backgroundColor: '#000000',
    alignSelf: 'flex-end', // Alinha ao final se necessário
  },
  btnsubmitLogin: {
    width: '100%',
    height: 60,
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#707070',
    alignSelf: 'flex-end', // Alinha ao final se necessário
  },
  txtsubmit: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 20,
  },
  txtsubmitLogin: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 20,
  },
  txterror: {
    color: '#990000',
  },
})

export default frmStyles