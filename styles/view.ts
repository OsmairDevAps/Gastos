import { StyleSheet } from 'react-native';

const viewStyle = StyleSheet.create({
  container: {
    marginTop: 100,
    width: '100%',
    padding: 8,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    height: 40,
    padding: 4,
    backgroundColor: '#ccc',
  },
  content: {
    flexDirection: 'column',
    gap: 10
  },
  buttons: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btnBack: {
    borderWidth: 1,
    borderColor: '#353535',
    backgroundColor: '#7b7b7b',
    borderRadius: 2,
    paddingLeft: 4,
    paddingRight: 4,
  },
  btnRemove: {
    borderWidth: 1,
    borderColor: '#400000',
    backgroundColor: '#ae0000',
    borderRadius: 2,
    paddingLeft: 4,
    paddingRight: 4,
  },
  txtButton: {
    color: '#ffffff',
    fontSize: 20
  },
})

export default viewStyle