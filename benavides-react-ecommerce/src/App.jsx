import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ItemContainer from './components/ItemContainer/ItemContainer'
import Navbar from './components/Navbar/Navbar'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import Cart from './components/Cart/Cart';
import CartContextProvider from './context/CartContext';
import Checkout from './components/Checkout/Checkout';
import SuccessfulCheckout from './components/SuccessfulCheckout/SuccessfulCheckout';

function App() {
  return (
    <BrowserRouter>
      <CartContextProvider>
        <Navbar/>
        <Routes>
          <Route path='/' element={ <ItemContainer />}/>
          <Route path='/item/:productId' element={ <ItemDetailContainer />}/>
          <Route path='/category/:categoryId' element={ <ItemContainer />}/>
          <Route path='/category/:categoryId/:subcategoryId' element={ <ItemContainer />}/>
          <Route path='/cart' element={ <Cart />}/>
          <Route path='/checkout' element={ <Checkout /> }/>
          <Route path='/success' element={ <SuccessfulCheckout /> }/>

          <Route path='*' element={<Navigate to='/'/>}/>

        </Routes>
      </CartContextProvider>
    </BrowserRouter>
  )
}

export default App
