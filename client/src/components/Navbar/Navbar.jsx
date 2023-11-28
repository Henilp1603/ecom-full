import React from "react";
import NavDropDown from "./NavDropDown";
import SearchBar from "./SearchBar";
import AuthModal from "../Authentication/AuthModal";
import {Link, NavLink} from "react-router-dom";
import Cartbtn from "./Cartbtn";
import {useCookies} from "react-cookie";
import {Avatar, Button, DropdownMenu, IconButton} from "@radix-ui/themes";
import {LogOut, User} from "lucide-react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useCartContext} from "../../Contexts/CartContext";
import {LogIn} from "lucide-react";


export default function Navbar() {
  const [cookie, setCookie, removeCookie] = useCookies(["token", "cart"]);

  const navigate = useNavigate();
  const {cart, total_price, clearCart} = useCartContext();

  const logout = async () => {
    const url = `${import.meta.env.VITE_SERVER_API}/api/user/save-cart`;
    const data = {
      cart,
      total_price,
    };
    try {
      const res = await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      });
      console.log(res);
    } catch (error) {}
    // localStorage.removeItem("_Cart")
    removeCookie("cart");
    clearCart();
    removeCookie("token");
    navigate("/");
  };

  return (
    <>
      <div className="sticky top-0 z-50 flex items-center justify-between w-full px-10 py-2 bg-white border-b navbar-container max-h-24">
        <div className="flex items-center w-12 h-12 gap-x-8">
          <img
            src="./gs.svg"
            alt="Gujarat Sales Logo"
            className="object-contain w-full h-full"
          />
          <div className="flex font-sans font-semibold menu gap-x-8 max-md:hidden">
            <Link to="/">
              <span>Home</span>
            </Link>
            <Link to="products">
              <span>Products</span>
            </Link>
            <NavDropDown navItem={<span role="button">Category</span>} />
            <Link to="contact">
              <span role="button">Contact</span>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center gap-6">
          <div className="search max-md:hidden">
            <SearchBar />
          </div>
          <div className="flex items-center justify-center gap-3 cta">
            {cookie.token ? (
              <Cartbtn />
            ) : (
              <NavLink to="/login"><Button size="2">
                <LogIn width={16} height={16} />
                Login
              </Button></NavLink>
            )}
          </div>

          {cookie.token && (
            <div>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <IconButton>
                    <User />
                  </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <Link to="user-profile">
                    <DropdownMenu.Item>Settings</DropdownMenu.Item>
                  </Link>
                  <DropdownMenu.Item color="red" onClick={logout}>
                    Logout
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
