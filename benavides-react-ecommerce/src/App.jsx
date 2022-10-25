import { useState } from 'react'
import './App.css'
import ItemContainer from './components/ItemContainer/ItemContainer'
import Navbar from './components/Navbar/Navbar'

function App() {
  let greeting = 'Hola, acá van los ítems'
  return (
    <>
      <Navbar/>
      <ItemContainer greeting={ greeting }/>
    </>
  )
}

export default App
