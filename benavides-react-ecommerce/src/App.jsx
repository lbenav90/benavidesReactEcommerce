import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ItemContainer from './components/ItemContainer/ItemContainer'
import Navbar from './components/Navbar/Navbar'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import Cart from './components/Cart/Cart';
import CartContextProvider from './context/CartContext';

function App() {
  return (
    <BrowserRouter>
      <CartContextProvider>
        <Navbar/>
        <Routes>
          <Route path='/' element={ <ItemContainer />}/>
          <Route path='/item/:productId' element={ <ItemDetailContainer />}/>
          <Route path='/category/:categoryId' element={ <ItemContainer />}/>
          <Route path='/cart' element={ <Cart />}/>

          <Route path='*' element={<Navigate to='/'/>}/>

        </Routes>
      </CartContextProvider>
    </BrowserRouter>
  )
}

export default App
