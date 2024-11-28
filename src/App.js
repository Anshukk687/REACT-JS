import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import Protected from './Protected';
import ProductList from './ProductList';
import SearchProduct from './SearchProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<Protected element={AddProduct} />} />
          <Route path="/update/:id" element={<Protected element={UpdateProduct} />} />
          <Route path="/" element={<Protected element={ProductList} />} />
          <Route path="/search" element={<Protected element={SearchProduct} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
