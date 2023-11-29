import Invoice from "./components/Invoice";
import {Sidebar} from "./components/Sidebar";
import AddCategory from "./pages/AddCategory";
import AddProduct from "./pages/AddProduct";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Settings from "./pages/Settings";
import UpdateProduct from "./pages/UpdateProduct";
import Userorder from "./pages/Userorder";
import Users from "./pages/Users";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import {useCookies} from "react-cookie";
import NoAdmin from "./pages/NoAdmin";

function App() {
  const [cookie, setCookie] = useCookies(["token"]);

  return (
    <>
      <Router>
        {
          cookie.token ?<Sidebar />:<></>
        }
        
        {cookie.token ? (
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/UpdateProduct" element={<UpdateProduct />} />
            <Route path="/user-order/:id" element={<Userorder />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<NoAdmin />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;
