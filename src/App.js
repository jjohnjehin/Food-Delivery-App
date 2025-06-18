import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import {Header} from "./components/Header"
import { Products } from './components/Products';
import { Cart } from './components/Cart';
import { Offers } from './components/Offers';
import { ContactUs } from './components/ConatctUs';
import { Favourite } from './components/Favourite';
import { Item } from './components/Item';
import { MenuItemDetails } from './components/MenuItemDetails';
import { ExploreMenu } from './components/ExploreMenu';
// import { ExploreMenu } from './components/ExploreMenuu';
import { Payment } from './components/Payment';
import { Item2 } from './components/Item2';
import { PaymentDetails } from './components/PaymentDetails';
import { PaymentSummary } from './components/PaymentSummary';
import { Account } from './components/Account';
import { Auth } from './components/Auth';
import { Footer } from './components/Footer';
function App() {
  const [cart, setCart] = useState([]); 
  const [fav, setFav] = useState([]); 
  const [user, setUser] = useState(null); 
  const [message, setMessage] = useState(""); 

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const removeFromFav = (id) => {
    setFav(fav.filter(item => item.id !== id));
  };
  const handleAuthResult = (status, userInfo) => {
    setMessage(status);
    if (status === "success" && userInfo) {
      setUser(userInfo);
    } else {
      setUser(null);
    }
  };

  return (
    <BrowserRouter>
      <Header
        cartLength={cart.length}
        favLength={fav.length}
        user={user}
        message={message}
      />
      <Routes>
        <Route path='/' element={<Products cart={cart} setCart={setCart} fav={fav} setFav={setFav} />} />
        <Route path='/Cart' element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
        <Route path='/Offers' element={<Offers />} />
        <Route path='/ContactUS' element={<ContactUs />} />
        <Route path='/Favourite' element={<Favourite fav={fav} removeFromFav={removeFromFav} />} />
        <Route path='/Item' element={<Item cart={cart} setCart={setCart} fav={fav} setFav={setFav} />} />
        <Route path='/MenuItemDetails' element={<MenuItemDetails cart={cart} setCart={setCart} fav={fav} setFav={setFav} />} />
        <Route path='/ExploreMenu' element={<ExploreMenu cart={cart} setCart={setCart} fav={fav} setFav={setFav} />} />
        <Route path='/Payment' element={<Payment />} />
        <Route path='/Item2' element={<Item2 />} />
        <Route path='/PaymentDetails' element={<PaymentDetails />} />
        <Route path='/PaymentSummary' element={<PaymentSummary />} />
        <Route path='/Account' element={<Account />} />
        <Route path="/auth" element={<Auth onAuthResult={handleAuthResult} />} />
        <Route path="/account" element={<Account user={user}  />} />
        <Route path="/Footer" element={<Footer/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
