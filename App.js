import { SafeAreaView, StatusBar, StyleSheet, FlatList, View } from "react-native"
import { useEffect, useState } from "react"
import { Picker } from "@react-native-picker/picker";
import NotaEditor from "./src/componentes/NotaEditor"
import { Nota } from './src/componentes/Nota'
import { buscaNotas, criaTabela, buscaNotasPorCategoria } from "./src/servicos/Notas"

export default function App() {
  const [notas, setNotas] = useState([])
  const [notaSelecionada, setNotaSelecionada] = useState(false)
  const [filtro, setFiltro] = useState("Todos")

  useEffect(() => {
    criaTabela()
    mostraNotas()
  }, [])

  async function filtrar(filtro) {
    setFiltro(filtro)
    if(filtro === "Todos"){
      setFiltro(false)
      mostraNotas()
    }else {
      setNotas(await buscaNotasPorCategoria(filtro))
    }
    
  }

  async function mostraNotas(){
    const todasNotas = await buscaNotas()
    setNotas(todasNotas)
    //console.log(todasNotas)
  }

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.picker}> 
        <Picker
          selectedValue={filtro}
          onValueChange={novoFiltro => filtrar(novoFiltro)}>
            <Picker.Item label="Todos" value="Todos" />
            <Picker.Item label="Pessoal" value="Pessoal" />
            <Picker.Item label="Trabalho" value="Trabalho" />
            <Picker.Item label="Outros" value="Outros" />
        </Picker>
      </View>
      <FlatList
      data={notas}
      renderItem={(nota) => <Nota {...nota} setNotaSelecionada={setNotaSelecionada}/>}
      keyExtractor={nota => nota.id}/>
      <NotaEditor mostraNotas={mostraNotas} notaSelecionada={notaSelecionada} setNotaSelecionada={setNotaSelecionada}/>
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
  picker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#EEEEEE",
    marginBottom: 12,
  },
})

