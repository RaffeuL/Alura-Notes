import { SafeAreaView, StatusBar, StyleSheet, FlatList } from "react-native"
import { useEffect, useState } from "react"
import NotaEditor from "./src/componentes/NotaEditor"
import { Nota } from './src/componentes/Nota'
import { buscaNotas, criaTabela } from "./src/servicos/Notas"

export default function App() {
  const [notas, setNotas] = useState([])

  useEffect(() => {
    criaTabela()
  }, [])

  async function mostraNotas(){
    const todasNotas = await buscaNotas()
    setNotas(todasNotas)
  }
  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
      data={notas}
      renderItem={(nota) => <Nota {...nota}/>}
      keyExtractor={nota => nota.id}/>
      <NotaEditor mostraNotas={mostraNotas}/>
      <StatusBar/>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
	},
})

