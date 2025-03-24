import Footer from "./components/Footer";
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from "./components/Header";
import {Container} from 'react-bootstrap';
import HomeScreen from "./screens/HomeScreen";
import EventScreen from "./screens/EventScreen";
import CategoryScreen from "./screens/CategoryScreen";
import CartScreen from './screens/CartScreen'
import LoginScreen from "./screens/LoginScreen";
import ShippingScreen from "./screens/ShippingScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PlaceOrder from "./screens/PlaceOrder";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";


const App = () => {
  return (
  <>
  <Router>
    <Header />
    <main>
      <Container>
        <Routes>
            <Route path="/" exact element={<HomeScreen />} />
            <Route path="/event/:id" exact element={<EventScreen />} />
            <Route path="/category/:categ" element={<CategoryScreen/>}></Route>
            <Route path="/cart" element={<CartScreen/>}></Route>
            <Route path="/cart/:id" element={<CartScreen/>}></Route>
            <Route path="/login" element={<LoginScreen/>}></Route>
            <Route path='/shipping' element={<ShippingScreen/>}></Route>
            <Route path='/payment' element={<PaymentMethodScreen/>}></Route>
            <Route path='/register' element={<RegisterScreen/>}></Route>
            <Route path='/placeorder' element={<PlaceOrder/>}></Route>
          
          </Routes>
          
      </Container>
    </main>
    <Footer />
  </Router>
  </> 
  );
}

export default App;
