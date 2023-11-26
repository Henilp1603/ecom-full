import React, {useState} from "react";
import {Button, Dialog, Text, TextField, Flex, Tabs} from "@radix-ui/themes";
import {useAuthContext} from "../../Contexts/AuthContext";
import {useCookies} from "react-cookie";
import {useCartContext} from "../../Contexts/CartContext";
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const {name, email, phoneNo, password, changeData} = useAuthContext();
  const [cookie, setCookie] = useCookies(["token", "cart"]);
  const {addDBCartData, getCartData} = useCartContext();
  const navigate = useNavigate();

  const [namefocus, setNameFocus] = useState(false);
  const [emailfocus, setEmailFocus] = useState(false);

  const [phonefocus, setPhoneFocus] = useState(false);
  const [passwordfocus, setPasswordFocus] = useState(false);

  const handelFocN = (e) => {
    setNameFocus(true);
  };

  const handelFocE = (e) => {
    setEmailFocus(true);
  };

  const handelFocP = (e) => {
    setPhoneFocus(true);
  };

  const handelFocPass = (e) => {
    setPasswordFocus(true);
  };

  const signup = async (e) => {
    e.preventDefault();

    const url = `${import.meta.env.VITE_SERVER_API}/api/user/register`;

    const data = {
      name,
      email,
      phoneNo,
      password,
    };

    try {
      if (namefocus && emailfocus && phonefocus && passwordfocus) {
        const {data: res} = await axios.post(url, data);
        console.log(res);

        if (res && !res.error) {
          const token = res.token;
          const cartData = res.cartData;

          const date = new Date();
          date.setDate(date.getDate() + 30);

          // setCookie("cart", cartData[0].cart)
          setCookie("token", token, {path: "/", expires: date});
          navigate("/user-profile");
        } else {
          alert(res.error);
        }
      } else {
        if (!namefocus) {
          handelFocN();
        }
        if (!emailfocus) {
          handelFocE();
        }

        if (!phonefocus) {
          handelFocP();
        }

        if (!passwordfocus) {
          handelFocPass();
        }
        alert("All Fields Are Mandatory");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center my-20">
      <Flex direction="column" gap="4" mt="5" className="w-[20%]">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Name
          </Text>
          {/* <TextField.Input
            placeholder="Enter your name"
            name="name"
            onChange={changeData}
          /> */}
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            onChange={changeData}
            onBlur={(e) => handelFocN(e)}
            focused={namefocus.toString()}
            required
            className="single_inp rounded-full px-2 py-1 w-full outline-none border border-slate-600"
          />
          <span className="Inp_err_msg">*Name is Required</span>
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Email
          </Text>
          {/* <TextField.Input
            placeholder="Enter your Email"
            name="email"
            onChange={changeData}
          /> */}
          <input
            type="email"
            placeholder="Enter your Email"
            name="email"
            onChange={changeData}
            onBlur={(e) => handelFocE(e)}
            focused={emailfocus.toString()}
            // onInvalid={(e)=>handelFocE(e)}
            required
            className="single_inp rounded-full px-2 py-1 w-full outline-none border border-slate-600"
          />
          <span className="Inp_err_msg">*Valid email is Required</span>
        </label>

        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Phone No
          </Text>
          {/* <TextField.Input
            placeholder="Enter your Phone No"
            name="phoneNo"
            onChange={changeData}
          /> */}
          <input
            type="text"
            placeholder="Enter your Phone No"
            name="phoneNo"
            onChange={changeData}
            onBlur={(e) => handelFocP(e)}
            focused={phonefocus.toString()}
            required
            className="single_inp rounded-full px-2 py-1 w-full outline-none border border-slate-600"
          />
          <span className="Inp_err_msg">*Phone No is Required</span>
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
          /> */}
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            onChange={changeData}
            onBlur={(e) => handelFocPass(e)}
            focused={passwordfocus.toString()}
            required
            className="single_inp rounded-full px-2 py-1 w-full outline-none border border-slate-600"
          />
          <span className="Inp_err_msg">*Password is Required</span>
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="medium">
            Already have an account?
            <NavLink to="/login" className="underline ml-1 font-semibold">
              Login
            </NavLink>
          </Text>
        </label>
      </Flex>

      <Flex gap="3" mt="6" justify="end">
        <Button variant="soft" color="gray" onClick={() => navigate(-1)}>
          Cancel
        </Button>

        <Button onClick={(e) => signup(e)}>Sign Up</Button>
      </Flex>
    </div>
  );
};

export default SignUp;
