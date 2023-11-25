import {useCookies} from "react-cookie";
import Success from "./components/Checkout/Success";
import Footer from "./components/Footer/Footer";
import MobileNavbar from "./components/Navbar/MobileNavbar";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Refund from "./pages/Legal/Refund";
import Return from "./pages/Legal/Return";
import Shipping from "./pages/Legal/Shipping";
import Terms from "./pages/Legal/Terms";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import UserProfile from "./pages/UserProfile";
import {BrowserRouter as Router, Route, Routes, Outlet, Navigate} from "react-router-dom";
import AuthModal from "./components/Authentication/AuthModal";

function App() {
  const [cookie, setCookie] = useCookies(["token"]);

  return (
    <>
      <Router>
        <Navbar />
        <MobileNavbar />
        
        {cookie.token ? (
          <Routes>
            {/* //login users route */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/single-product/:id" element={<SingleProduct />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Success />} />
            <Route path="/terms/return" element={<Return />} />
            <Route path="/terms/refund" element={<Refund />} />
            <Route path="/terms/shipping" element={<Shipping />} />
            <Route path="/terms/terms" element={<Terms />} />
            <Route path="*" element={<Navigate to="/"/>}/>

          </Routes>
        ) : (
          <Routes>
            {/* //without login user route */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/single-product/:id" element={<SingleProduct />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms/return" element={<Return />} />
            <Route path="/terms/refund" element={<Refund />} />
            <Route path="/terms/shipping" element={<Shipping />} />
            <Route path="/terms/terms" element={<Terms />} />
            <Route path="*" element={<Navigate to="/"/>}/>
          </Routes>
        )}
        <Footer />
      </Router>
    </>
  );
}

export default App;
