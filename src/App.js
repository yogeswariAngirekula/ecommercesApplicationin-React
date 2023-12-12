import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProductList from './Components/ProductList';
import './App.css';

// import store from'./Store';
// import store from './store/store';
import { Provider } from 'react-redux';
import Checkout from './Components/Checkout';
import Cart from './Components/Cart';
import ProductDetails from './Components/ProductDetails';

function App() {
  return (
    <div className="App">
      {/* <Provider store={store}> */}
        <Router>
          <Routes>
          <Route exact path="/" element={<ProductList />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route path="/checkout" exact element={<Checkout />} />
          </Routes>
        </Router>
      {/* </Provider> */}
    </div>
  );
}

export default App;
