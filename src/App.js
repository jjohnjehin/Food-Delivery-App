import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import {Header} from "./components/Header"
import { Products } from './components/Products';
import { Cart } from './components/Cart';
// import { Menu } from './components/Menu';
import { Offers } from './components/Offers';
import { ContactUs } from './components/ConatctUs';
import { Favourite } from './components/Favourite';
import { Item } from './components/Item';
import { MenuItemDetails } from './components/MenuItemDetails';
import { ExploreMenu } from './components/ExploreMEnu';
import { Payment } from './components/Payment';
import { Item2 } from './components/Item2';
import { PaymentDetails } from './components/PaymentDetails';
import { PaymentSummary } from './components/PaymentSummary';

function App() {
  const [cart, setCart] = useState([]); 
  const [fav,setFav] = useState([]); 
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
};
  const removeFromFav = (id) => {
    setFav(fav.filter(item => item.id !== id));
};
  return (
    <BrowserRouter>
      <Header cartLength={cart.length} favLength={fav.length} />
      <Routes>
        <Route path='/' element={<Products cart={cart} setCart={setCart} fav={fav} setFav={setFav}  />} />
        <Route path='/Cart' element={<Cart cart={cart} removeFromCart={removeFromCart} />} />

        {/* <Route path='/Menu' element={<Menu/>}></Route> */}
        <Route path='/Offers' element={<Offers/>}></Route>
        <Route path='/ContactUS' element={<ContactUs/>}></Route>
        <Route path='/Favourite' element={<Favourite fav={fav} removeFromFav={removeFromFav}/>}></Route>
        <Route path='/Item' element={<Item cart={cart} setCart={setCart} fav={fav} setFav={setFav}/>}></Route>
        <Route path='/MenuItemDetails' element={<MenuItemDetails cart={cart} setCart={setCart} fav={fav} setFav={setFav}/>}></Route>
        <Route path='/ExploreMenu' element={<ExploreMenu cart={cart} setCart={setCart} fav={fav} setFav={setFav}/>}></Route>
        <Route path='/Payment' element={<Payment/>}></Route>
        <Route path='/Item2' element={<Item2/>}></Route>
        <Route path='/PaymentDetails' element={<PaymentDetails/>}></Route>
        <Route path='/PaymentSummary' element={<PaymentSummary/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
