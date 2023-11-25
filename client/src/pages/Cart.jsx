import React, {useState} from "react";
import CartProduct from "../components/CartProduct/CartProduct";
import {Button, Table} from "@radix-ui/themes";
import {useCartContext} from "../Contexts/CartContext";
import axios from "axios";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

export default function Cart() {
  const {cart, total_price} = useCartContext();
  const [cookie, setCookie] = useCookies(["token"]);

  const navigate = useNavigate();

  const handelCheckout = async () => {
    const url2 = `${import.meta.env.VITE_SERVER_API}/api/order/create-order`;

    const data = {
      cart,
      total_price,
    };

    try {
      const {data: res} = await axios.post(url2, data, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      });

      if (res && !res.err) {
        navigate("/checkout")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex h-screen max-md:flex-col">
        <div className="flex flex-col w-2/3 gap-5 p-4 max-md:w-full">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold">Cart Overview</p>
            <p className="text-xl font-semibold text-green-700">
              Total : ₹{total_price}/-
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-10 max-md:justify-center">
            {cart.map((item) => (
              <CartProduct item={item} />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between w-1/3 p-4 bg-green-50 max-md:w-full">
          <div>
            <div>
              <p className="text-2xl font-semibold">Order Summary</p>
            </div>
            <div className="mt-5">
              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>Item name</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>
                      Original Price
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>
                      Discounted Price
                    </Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {cart.map((item) => (
                    <Table.Row>
                      <Table.RowHeaderCell>
                        Red Glitter Epoxy Resin
                      </Table.RowHeaderCell>
                      <Table.Cell>₹500</Table.Cell>
                      <Table.Cell>₹{item.selectedPrice}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </div>
          </div>
          <div className="mb-24 max-md:mt-10 max-md:mb-0">
            <Button variant="solid" size="4" onClick={handelCheckout}>
              Proceed to checkout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
