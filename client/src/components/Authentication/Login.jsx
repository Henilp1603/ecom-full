import React, {useState} from "react";
import {Button, Dialog, Text, TextField, Flex, Tabs} from "@radix-ui/themes";
import {useAuthContext} from "../../Contexts/AuthContext";
import {useCookies} from "react-cookie";
import {useCartContext} from "../../Contexts/CartContext";
import {Link, NavLink, useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
  const {name, email, phoneNo, password, changeData} = useAuthContext();
  const [cookie, setCookie] = useCookies(["token", "cart"]);
  const {addDBCartData} = useCartContext();
  const navigate = useNavigate();

  const [namefocus, setNameFocus] = useState(false);
  const [phonefocus, setPhoneFocus] = useState(false);
  const [passwordfocus, setPasswordFocus] = useState(false);

  const handelFocN = (e) => {
    setNameFocus(true);
  };

  const handelFocP = (e) => {
    setPhoneFocus(true);
  };

  const handelFocPass = (e) => {
    setPasswordFocus(true);
  };

  const login = async (e) => {
    e.preventDefault();

    const url = `${import.meta.env.VITE_SERVER_API}/api/user/login`;

    const data = {
      name,
      phoneNo,
      password,
    };

    try {
      if (phonefocus && passwordfocus) {
        const {data: res} = await axios.post(url, data);

        if (res && !res.error) {
          const token = res.token;
          const cartData = res.cartData;

          const date = new Date();
          date.setDate(date.getDate() + 30);

          setCookie("cart", cartData[0].cart);
          setCookie("token", token, {path: "/", expires: date});
          addDBCartData();
          navigate("/");
        } else {
          alert(res.error);
        }
      } else {
        alert("All Fields Are Mandatory");

        if (!phonefocus) {
          handelFocP();
        }

        if (!passwordfocus) {
          handelFocPass();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-center my-36">
      <Flex direction="column" gap="4" mt="5" className="w-[20%]">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Phone No
          </Text>
          {/* <TextField.Input
            placeholder="Enter your Phone No"
            name="phoneNo"
            onChange={changeData}
            onBlur={(e)=>handelFocP(e)}
            focused={phonefocus.toString()}
            required
            className="single_inp"
          /> */}
          <input
            type="number"
            placeholder="Enter your Phone No"
            name="phoneNo"
            onChange={changeData}
            onBlur={(e) => handelFocP(e)}
            focused={phonefocus.toString()}
            required
            className="single_inp rounded-full px-2 py-1 w-full outline-none border border-slate-600"
          />
          <span className="Inp_err_msg">
            *Name is required and must be 10 digits
          </span>
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Password
          </Text>
          {/* <TextField.Input
            placeholder="Enter your password"
            name="password"
            type="password"
            onChange={changeData}
            onBlur={handelFocPass}
            focused={passwordfocus.toString()}
            required
          /> */}
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            onChange={changeData}
            onBlur={handelFocPass}
            focused={passwordfocus.toString()}
            required
            className="single_inp rounded-full px-2 py-1 w-full outline-none border border-slate-600"
          />
          <span className="Inp_err_msg">*Password is required</span>
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="medium">
            Don't have an account?
            <NavLink to="/signup" className="underline ml-1 font-semibold">
              Sign-Up
            </NavLink>
          </Text>
        </label>
      </Flex>

      <Flex gap="3" mt="6" justify="end">
        <Button variant="soft" color="gray" onClick={() => navigate(-1)}>
          Cancel
        </Button>

        <Button onClick={(e) => login(e)}>Login</Button>
      </Flex>
    </div>
  );
};

export default Login;
