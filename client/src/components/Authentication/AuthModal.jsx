import {Button, Dialog, Text, TextField, Flex, Tabs} from "@radix-ui/themes";
import {LogIn} from "lucide-react";
import {useAuthContext} from "../../Contexts/AuthContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useRef} from "react";
import {useCookies} from "react-cookie";
import {useCartContext} from "../../Contexts/CartContext";

export default function AuthModal({}) {
  const clickRef = useRef(null);
  const [cookie, setCookie] = useCookies(["token","cart"]);

  const {name, email, phoneNo, password} = useAuthContext();
  const navigate = useNavigate();

  const {addDBCartData,getCartData} = useCartContext();

  const addData = async (e) => {
    e.preventDefault();

    const url = `${import.meta.env.VITE_SERVER_API}/api/user/register`;

    const data = {
      name,
      email,
      phoneNo,
      password,
    };

    try {
      const {data: res} = await axios.post(url, data);

      if (res && !res.err) {
        const token = res.token;
        const cartData = res.cartData;
        
        const date = new Date();
        date.setDate(date.getDate() + 30);

        setCookie("cart", cartData[0].cart);
        setCookie("token", token, {path: "/", expires: date});
        navigate("/user-profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async (e) => {
    e.preventDefault();

    const url = `${import.meta.env.VITE_SERVER_API}/api/user/login`;

    const data = {
      name,
      phoneNo,
      password,
    };
    try {
      const {data: res} = await axios.post(url, data);

      if (res && !res.err) {
        const token = res.token;
        const cartData = res.cartData;
        

        const date = new Date();
        date.setDate(date.getDate() + 30);

        setCookie("cart",cartData[0].cart);
        setCookie("token", token, {path: "/", expires: date});
        addDBCartData()
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="2">
          <LogIn width={16} height={16} />
          Login
        </Button>
      </Dialog.Trigger>

      <Dialog.Content
        style={{
          maxWidth: 350,
        }}
      >
        <Tabs.Root defaultValue="signup">
          <Tabs.List
            size="2"
            className="flex items-center justify-center font-semibold transition-all"
          >
            <Tabs.Trigger value="login" ref={clickRef}>
              Login
            </Tabs.Trigger>
            <Tabs.Trigger value="signup">Signup</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="login">
            <AuthContent action="Login" onClick={getData} login={true} />
          </Tabs.Content>
          <Tabs.Content value="signup">
            <AuthContent action="Sign up" onClick={addData} login={false} />
          </Tabs.Content>
        </Tabs.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
}

function AuthContent({action, onClick, login}) {
  const {changeData} = useAuthContext();

  return (
    <div>
      <Flex direction="column" gap="4" mt="5">
        {login ? (
          <></>
        ) : (
          <>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Input
                placeholder="Enter your name"
                name="name"
                onChange={changeData}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Email
              </Text>
              <TextField.Input
                placeholder="Enter your Email"
                name="email"
                onChange={changeData}
              />
            </label>
          </>
        )}

        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Phone No
          </Text>
          <TextField.Input
            placeholder="Enter your Phone No"
            name="phoneNo"
            onChange={changeData}
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Password
          </Text>
          <TextField.Input
            placeholder="Enter your password"
            name="password"
            type="password"
            onChange={changeData}
          />
        </label>
      </Flex>

      <Flex gap="3" mt="6" justify="end">
        <Dialog.Close>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </Dialog.Close>
        <Dialog.Close>
          <Button onClick={onClick}>{action}</Button>
        </Dialog.Close>
      </Flex>
    </div>
  );
}
