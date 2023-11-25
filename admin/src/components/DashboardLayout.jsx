import { useOrderContext } from "../Context/OrderContext";
import { useProductContext } from "../Context/ProductContext";
import { useUserContext } from "../Context/UserContext";
import DetailsCard from "./DetailsCard";
import UserLoginChart from "./UserLoginChart";

export default function DashboardLayout() {
  const {totalSales,totalOrder}=useOrderContext()
  const {totalProduct}=useProductContext()
  const {totalUser}=useUserContext()
  
  return (
    <>
    <div className="px-8 py-7 pl-72 w-[100vw] overflow-hidden">
        <div>
            <h1 className="text-2xl font-semibold">Welcome to your Dashboard</h1>
            <h6 className="text-sm font-normal text-gray-600">This is where you will control all the details about your e-commerce store</h6>
        </div>

        <div className="flex gap-4 mt-10">
            <DetailsCard title="Total Sales" value={`₹${totalSales}`} />
            <DetailsCard  title="Total Products" value={totalProduct}  />
            <DetailsCard  title="Total Users" value={totalUser} />
        </div>
    <div className="flex gap-4 mt-10">
      <UserLoginChart />
      </div>
    </div>
    </>
  ); 
}
