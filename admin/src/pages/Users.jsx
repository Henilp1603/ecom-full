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
import {useUserContext} from "../Context/UserContext";
import { Link } from "react-router-dom";



function DeleteIcon() {
  return (
    <div>
      <Trash className="w-4 h-4" />
    </div>
  );
}

export default function Users() {
  const {users, removeUser} = useUserContext();
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
          <Title>All Users</Title>
          <Table className="mt-5">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Full Name</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Phone No.</TableHeaderCell>
                <TableHeaderCell>Address</TableHeaderCell>
                <TableHeaderCell>Pincode</TableHeaderCell>
                
                
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((item) => (
                <TableRow key={item._id}>
                 
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>

                  <TableCell>
                    {item.phoneNo}
                  </TableCell>
                  <TableCell>
                    {item.address}
                  </TableCell>
                  <TableCell>
                    {item.pincode}
                  </TableCell>
                  <TableCell>
                    <Link to={`/user-order/${item._id}`}><Button variant="light">
                      Order history
                    </Button></Link>
                  </TableCell>
                  <TableCell>
                    <Button
                      icon={DeleteIcon}
                      variant="light"
                      color="red"
                      iconPosition="left"
                      className="flex items-center justify-between gap-2 w-max"
                      onClick={() => removeUser(item._id)}
                    >
                      Delete 
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
