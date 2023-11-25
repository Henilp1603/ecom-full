import React from "react";
import {
  Badge,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";
import {Delete, PenIcon, Trash, WifiIcon} from "lucide-react";
import {useOrderContext} from "../Context/OrderContext";
import moment from "moment/moment";

function DeleteIcon() {
  return (
    <div>
      <Trash className="w-4 h-4" />
    </div>
  );
}

const Orders = () => {
  const {orders, removeOrder} = useOrderContext();
  
  return (
    <div className="px-8 py-7 pl-72 w-[100vw] overflow-hidden">
      <div>
        <h1 className="text-2xl font-semibold">Manage Users</h1>
        <h6 className="text-sm font-normal text-gray-600">
          This is where you will manage all Users
        </h6>
      </div>
      <div className="mt-10">
        <Card className="">
          <Title>All Orders</Title>
          <Table className="mt-5">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Customer Name</TableHeaderCell>
                <TableHeaderCell>Products</TableHeaderCell>
                <TableHeaderCell>Quantity</TableHeaderCell>
                <TableHeaderCell>Date & Time</TableHeaderCell>
                <TableHeaderCell>Total Ammount</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.orderby?.name}</TableCell>
                  <TableCell>
                    
                    {
                  
                        item.products.map((pr)=>(
                          pr.product?(<Text>{pr?.product?.title}</Text>):(<Text>No Product</Text>)
                        ))
                      
                    }
                  </TableCell>
                  <TableCell>
                    {item.products.map((pr) => (
                      <Text>{pr?.count}</Text>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Text>
                      {moment(item.dateOrdered).format("MMMM Do YYYY,h:mm a")}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Text>{item.totalPrice}</Text>
                  </TableCell>
                  <TableCell>
                    <Button
                      icon={DeleteIcon}
                      variant="light"
                      color="red"
                      iconPosition="left"
                      className="flex items-center justify-between gap-2 w-max"
                      onClick={() => removeOrder(item._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {orders.length == 0 ? (
            <div className="w-full text-center text-lg font-semibold text-gray-600 pt-3">
              No Data Available
            </div>
          ) : (
            <></>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Orders;
