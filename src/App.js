import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { FormProvider } from './context/FormContext';
import { WorkflowProvider } from './context/WorkflowContext';
import { CouponProvider } from './context/CouponContext';
import { Header } from "./components/Header"
import { Products } from './components/Products';
import { Cart } from './components/Cart';
import { Offers } from './components/Offers';
import { ContactUs } from './components/ConatctUs';
import { Favourite } from './components/Favourite';
import { Item } from './components/Item';
import { MenuItemDetails } from './components/MenuItemDetails';
import { ExploreMenu } from './components/ExploreMenu';
// import { ExploreMenu } from './components/ExploreMenuu';
// import { Payment } from './components/Payment';
import { Item2 } from './components/Item2';
import { PaymentDetails } from './components/PaymentDetails';
import { PaymentSummary } from './components/PaymentSummary';
import { Account } from './components/Account';
import { Auth } from './components/Auth';
import { Footer } from './components/Footer';
import { UnauthorizedPage } from './components/UnauthorizedPage';
import { SearchResults } from './components/SearchResults';
import { ProductList } from './components/ProductList';
import { Analytics } from './components/Analytics';
import { CouponManagement } from './components/CouponManagement';
import { WorkflowTracker } from './components/WorkflowTracker';
import { AISearch } from './components/AISearch';
import Orders from './components/Orders';
import { Help } from './components/Help';

// Protected Route Components
import { 
  PublicRoute, 
  AuthenticatedRoute, 
  UserRoute, 
  BusinessRoute, 
  ApprovedBusinessRoute, 
  SuperAdminRoute,
  AdminRoute
} from './components/ProtectedRoute';

// ADMIN
import { Home } from './components/AdminPage/Home';
import { RestaurentForm } from './components/AdminPage/RestaurentForm';
import { DeliveryForm } from "./components/AdminPage/DeliveryForm";
import { SuperAdminDashboard } from './components/AdminPage/SuperAdminDashboard';

function App() {
  const [filteredItems, setFilteredItems] = useState([]);
  const [cart, setCart] = useState([]); 
  const [fav, setFav] = useState([]); 

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const removeFromFav = (id) => {
    setFav(fav.filter(item => item.id !== id));
  };

  return (
    <AuthProvider>
      <FormProvider>
        <WorkflowProvider>
          <CouponProvider>
            <BrowserRouter>
        <Header setFilteredItems={setFilteredItems}
          cartLength={cart.length}
          favLength={fav.length}
        />
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Products cart={cart} setCart={setCart} fav={fav} setFav={setFav} filteredItems={filteredItems} />} />
          <Route path='/Offers' element={<Offers />} />
          <Route path='/ContactUS' element={<ContactUs />} />
          <Route path='/Item' element={<Item cart={cart} setCart={setCart} fav={fav} setFav={setFav} />} />
          <Route path='/MenuItemDetails' element={<MenuItemDetails cart={cart} setCart={setCart} fav={fav} setFav={setFav} />} />
          <Route path='/ExploreMenu' element={<ExploreMenu cart={cart} setCart={setCart} fav={fav} setFav={setFav} />} />
          <Route path='/Item2' element={<Item2 />} />
          <Route path='/Footer' element={<Footer/>} />
          <Route path='/unauthorized' element={<UnauthorizedPage />} />
          <Route path='/search' element={<SearchResults cart={cart} setCart={setCart} fav={fav} setFav={setFav} />} />

          {/* Authentication Routes */}
          <Route path="/auth" element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          } />

          {/* Authenticated Routes */}
          <Route path='/Cart' element={
            <AuthenticatedRoute>
              <Cart cart={cart} removeFromCart={removeFromCart} />
            </AuthenticatedRoute>
          } />
          
          <Route path='/Favourite' element={
            <AuthenticatedRoute>
              <Favourite fav={fav} removeFromFav={removeFromFav} />
            </AuthenticatedRoute>
          } />
          
          <Route path='/PaymentDetails' element={
            <AuthenticatedRoute>
              <PaymentDetails />
            </AuthenticatedRoute>
          } />
          
          <Route path='/PaymentSummary' element={
            <AuthenticatedRoute>
              <PaymentSummary />
            </AuthenticatedRoute>
          } />
          
          <Route path='/Account' element={
            <AuthenticatedRoute>
              <Account />
            </AuthenticatedRoute>
          } />
          
          <Route path='/Orders' element={
            <AuthenticatedRoute>
              <Orders />
            </AuthenticatedRoute>
          } />

          {/* Business Routes */}
          <Route path="/restaurentform" element={
            <ApprovedBusinessRoute>
              <RestaurentForm />
            </ApprovedBusinessRoute>
          } />
          
          <Route path="/deliveryform" element={
            <ApprovedBusinessRoute>
              <DeliveryForm />
            </ApprovedBusinessRoute>
          } />

          {/* Admin Routes (Business and SuperAdmin) */}
          <Route path="/admin" element={
            <AdminRoute>
              <SuperAdminDashboard />
            </AdminRoute>
          } />
          
    
          
          <Route path="/product_tracker" element={
            <AdminRoute>
              <Home />
            </AdminRoute>
          } />
          
          <Route path="/analytics" element={
            <AdminRoute>
              <Analytics />
            </AdminRoute>
          } />
          
          <Route path="/product_list" element={
            <AdminRoute>
              <ProductList />
            </AdminRoute>
          } />
          
          <Route path="/coupon_management" element={
            <AdminRoute>
              <CouponManagement />
            </AdminRoute>
          } />
          
          <Route path="/workflow_tracker" element={
            <AdminRoute>
              <WorkflowTracker />
            </AdminRoute>
          } />
          
          <Route path="/ai-search" element={
            <AISearch />
          } />
          
          <Route path="/user_management" element={
            <AdminRoute>
              <Home />
            </AdminRoute>
          } />

          <Route path="/help" element={
            <AuthenticatedRoute>
              <Help />
            </AuthenticatedRoute>
          } />
        </Routes>
        </BrowserRouter>
          </CouponProvider>
        </WorkflowProvider>
      </FormProvider>
    </AuthProvider>
  );
}

export default App;
