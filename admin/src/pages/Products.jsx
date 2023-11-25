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
import {PenIcon, WifiIcon, Trash} from "lucide-react";
import {useProductContext} from "../Context/ProductContext";
import {Link} from "react-router-dom";
import {useFilterContext} from "../Context/FilterContext";

function EditIcon() {
  return (
    <div>
      <PenIcon className="w-3 h-3" />
    </div>
  );
}

function DeleteIcon() {
  return (
    <div>
      <Trash className="w-4 h-4" />
    </div>
  );
}
export default function Products() {
  const {products, removeProduct} = useProductContext();
  const {filter_products, upadteFilterValue, filters} = useFilterContext();

  const getUniqueData = (data, property) => {
    let c = [];
    data.map((item) => {
      item.category.map((i) => {
        return c.push(i);
      });
    });

    c = ["All", ...new Set(c)];
    return c;
  };

  const categoryData = getUniqueData(products, "category");

  return (
    <div className="px-8 py-7 pl-72 w-[100vw] overflow-hidden">
      <div>
        <h1 className="text-2xl font-semibold">Manage your products</h1>
        <h6 className="text-sm font-normal text-gray-600">
          This is where you will manage all your products
        </h6>
      </div>
      <div className="mt-10">
        <div className="flex items-center justify-center gap-2 mt-6 mb-6">
          {categoryData.map((item) => (
            <Badge
              className={`mx-1 text-center transition-colors text-white ${
                item.toLowerCase() == filters.category.toLowerCase()
                  ? "bg-blue-600"
                  : "bg-blue-500"
              } `}
              size="xl"
            >
              <button name="category" value={item} onClick={upadteFilterValue}>
                {item}
              </button>
            </Badge>
          ))}
        </div>

        <Card className="">
          <Title>All products</Title>
          <Table className="mt-5">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Product Name</TableHeaderCell>
                <TableHeaderCell>Image</TableHeaderCell>
                <TableHeaderCell>Size</TableHeaderCell>
                <TableHeaderCell>Price</TableHeaderCell>
                <TableHeaderCell>Available Colors</TableHeaderCell>
                <TableHeaderCell>Category</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filter_products.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.title}</TableCell>

                  <TableCell>
                    <div className="object-cover w-24 h-16 overflow-hidden rounded-md">
                      <img src={item.colorsAndImg[0].image[0]} alt="" />
                    </div>
                  </TableCell>

                  <TableCell>
                    {item.discountedPrice.map((i, index) => (
                      <Text className="pb-2" key={index}>
                        {i.size}
                      </Text>
                    ))}
                  </TableCell>

                  <TableCell>
                    {item.discountedPrice.map((i, index) => (
                      <Text className="pb-2" key={index}>
                        ₹{i.price}
                      </Text>
                    ))}
                  </TableCell>

                  <TableCell>
                    {item.colorsAndImg.map((i, index) => (
                      <Badge
                        className="mx-1 text-center"
                        color={i.color.toLowerCase()}
                        key={index}
                      >
                        {i.color}
                      </Badge>
                    ))}
                  </TableCell>

                  <TableCell>
                    {item.category.map((category, index) => (
                      <Badge className="mx-1" key={index}>
                        {category}
                      </Badge>
                    ))}
                  </TableCell>

                  <TableCell>
                    <Button
                      icon={DeleteIcon}
                      variant="light"
                      color="red"
                      iconPosition="left"
                      className="flex items-center justify-between gap-2 w-max"
                      onClick={() => removeProduct(item._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Link to="/UpdateProduct" state={item}>
                      {" "}
                      <Button
                        icon={EditIcon}
                        variant="light"
                        iconPosition="left"
                        className="flex items-center justify-between gap-2 w-max"
                      >
                        Edit
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {products.length == 0 ? (
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
}
