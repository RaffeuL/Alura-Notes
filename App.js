import { SafeAreaView, StatusBar, StyleSheet } from "react-native"
import { useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import NotaEditor from "./src/componentes/NotaEditor"

export default function App() {
  const [notas, setNotas] = useState([])

  async function mostraNotas(){
    const todasChaves = await AsyncStorage.getAllKeys()
    const todasNotas = await AsyncStorage.multiGet(todasChaves)
    setNotas(todasNotas)
  }
  return (
    <SafeAreaView style={estilos.container}>
      <NotaEditor mostraNotas={mostraNotas()}/>
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

