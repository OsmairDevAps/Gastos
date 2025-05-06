import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  titleHome: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  grupoFilter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 4
  },
  grupo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 2,
    marginTop: 16,
  },
  text: {
    fontWeight: '600',
    fontSize: 16
  },
  despesas: {
    width: '49%',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#fddada',
    borderWidth: 1,
    borderColor: '#ff9a9a',
  },
  receitas: {
    width: '49%',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#e4f7fd',
    borderWidth: 1,
    borderColor: '#81e1fe',
  },
  styleFlat: {
    height: "30%", 
    marginTop: 4,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  fundoImpar: {
    backgroundColor: '#eaeaea'
  },
  fundoPar: {
    backgroundColor: '#ffffff'
  },
  grupoDespesas: {
    width: '100%',
    paddingTop: 6,
    paddingBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 1,
  },
  grupoReceitas: {
    width: '100%',
    paddingTop: 6,
    paddingBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 1,
  },
  resumo: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 6,
  },
  textResumo: {
    fontWeight: '600',
  },
});

export default styles;