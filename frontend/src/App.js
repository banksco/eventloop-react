import Footer from "./components/Footer";
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from "./components/Header";
import {Container} from 'react-bootstrap';
import HomeScreen from "./screens/HomeScreen";
import EventScreen from "./screens/EventScreen";
import CategoryScreen from "./screens/CategoryScreen";

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
          </Routes>
          
      </Container>
    </main>
    <Footer />
  </Router>
  </> 
  );
}

export default App;
