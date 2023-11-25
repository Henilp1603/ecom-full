import {
  Card,
  Divider,
  Text,
  TextInput,
  SearchSelect,
  SearchSelectItem,
  Button,
  Table,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "@tremor/react";
import axios from "axios";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Loading from "../components/Loading";
import {toast} from "react-toastify";
import {useCategoryContext} from "../Context/CategoryContext";

const AddCategory = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {category,removeCategory,getCategory} = useCategoryContext();

  const [data, setData] = useState({
    category: "",
  });

  const handelAddCategory = async () => {
    setIsLoading(true);
    const API = `${import.meta.env.VITE_SERVER_API}/api/category/add-category`;

    try {
      const res = await axios.post(API, data);
      if (res.data) {
        setIsLoading(false);
        getCategory()
        toast.success("Category Created.");
      }
    } catch (error) {
      toast.error("Error");
    }
  };

  

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="px-8 py-7 pl-72 w-[100vw]">
          <div>
            <h1 className="text-2xl font-semibold">Add a new Category</h1>
            <h6 className="text-sm font-normal text-gray-600">
              This is where you can add new product category in your inventory
            </h6>
          </div>
          <div>
            <div className="flex flex-col items-center justify-center w-full gap-4 mt-10">
              <div className="flex items-center justify-center w-full">
                <Table>
                  {category.map((item) => (
                    <TableRow>
                      <TableHeaderCell>{item.category}</TableHeaderCell>
                      <TableCell><Button
                            size="sm"
                            color="red"
                            variant="secondary"
                            className="px-3 py-[2px]"
                            onClick={()=>removeCategory(item._id)}
                          >
                            X
                          </Button></TableCell>
                    </TableRow>
                  ))}
                
                </Table>
              </div>
              <div className="w-full mt-4">
                <Text className="text-xl font-semibold">
                  Add product Category
                </Text>
              </div>
              <Divider className="mt-0" />
              <div className="flex flex-col gap-2 w-96">
                <div className="flex items-center justify-center gap-2">
                  <Text className="w-64 text-lg font-normal">
                    Product Category
                  </Text>
                  <TextInput
                    placeholder="Enter Product Category"
                    autoComplete="off"
                    required
                    name="category"
                    onChange={(e) => {
                      setData((prev) => {
                        return {
                          ...prev,
                          category: e.target.value,
                        };
                      });
                    }}
                  ></TextInput>
                </div>

                <div className="flex items-center justify-center gap-4 mt-6">
                  <Button onClick={() => handelAddCategory()}>Save</Button>
                  <Link to="/">
                    <Button variant="secondary">Discard</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCategory;
