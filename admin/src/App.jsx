import Invoice from "./components/Invoice";
import { Sidebar } from "./components/Sidebar";
import AddCategory from "./pages/AddCategory";
import AddProduct from "./pages/AddProduct";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Settings from "./pages/Settings"
import UpdateProduct from "./pages/UpdateProduct";
import Userorder from "./pages/Userorder";
import Users from "./pages/Users";
import {BrowserRouter as Router, Route, Routes, Outlet} from "react-router-dom";


function App() {
  return (
    <>
    <Router>
    <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/add-product" element={<AddProduct/>}/>
        <Route path="/UpdateProduct" element={<UpdateProduct />}/>
        <Route path="/user-order/:id" element={<Userorder/>}/>
        <Route path="/invoice" element={<Invoice/>}/>
        <Route path="/add-category" element={<AddCategory/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;

