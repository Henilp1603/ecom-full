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
import {useLocation, useNavigate} from "react-router-dom";
import {useProductContext} from "../Context/ProductContext";
import Loading from "../components/Loading";
import {toast} from "react-toastify";
import { useCategoryContext } from "../Context/CategoryContext";

export default function UpdateProduct() {
  let {state} = useLocation();

  const {category} = useCategoryContext();


  const [data, setData] = useState({
    title: state.title,
    description: state.description,
    MRP: state.MRP,
    discountedPrice: state.discountedPrice,
    category: state.category,
    colorAndImg: state.colorsAndImg,
    colors: state.colorsAndImg.map((item) => item.color),
    images: state.colorsAndImg.map((item) => item.image),
    newImg: [],
  });


  const [image, setImage] = useState("");

  const [curCategory, setCurCategory] = useState("");
  const [curColor, setcurColor] = useState("");

  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");

  const [uploadedImg, setUploadedImg] = useState(null);

  const {getProducts} = useProductContext();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleUpdateProduct = async () => {
    setIsLoading(true);
    const API = `${
      import.meta.env.VITE_SERVER_API
    }/api/product/update-product/${state._id}`;

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("MRP", data.MRP);
    formData.append("colors", JSON.stringify(data.colors));

    data.images.map((i) => formData.append("image", i));
    data.newImg.map((n) => formData.append("images", n));

    formData.append("discountedPrice", JSON.stringify(data.discountedPrice));

    data.category.map((c) => formData.append("category", c));

    const res = await axios.put(API, formData);

    if (res.data) {
      setIsLoading(false);
      toast.success("Product Updated.");
      navigate("/products");
      getProducts(`${import.meta.env.VITE_SERVER_API}/api/product/all-product`);
    }
  };

  const addColorAndImg = () => {
    setData((prev) => {
      return {
        ...prev,
        colors: [...prev.colors, curColor],
        images: [...prev.images, image],
        colorAndImg: [
          ...prev.colorAndImg,
          {
            color: curColor,
            image: image,
          },
        ],
      };
    });
    toast.success("Color and Image Added.");
    setcurColor("");
    setImage("");
  };

  const addSizeAndPrice = () => {
    setData((prev) => {
      return {
        ...prev,
        discountedPrice: [
          ...prev.discountedPrice,
          {
            size: size,
            price: price,
          },
        ],
      };
    });
    setPrice("");
    setSize("");
    toast.success("Size and Price Added.");
  };

  const addCategory = () => {
    setData((prev) => {
      return {
        ...prev,
        category: [...prev.category, curCategory],
      };
    });
    toast.success("Category Added.");
    setCurCategory("");
  };

  const removeColorAndImg = (item) => {
    let newColorandImg = data.colorAndImg.filter((i) => i.color != item.color);
    let newColors = data.colors.filter((i) => i != item.color);
    let newImage = data.images.filter((i) => i !== item.image);
    let newnewImg=data.newImg.filter((i)=>i  !== item.image)
    setData((prev) => {
      return {
        ...prev,
        colorAndImg: newColorandImg,
        colors: newColors,
        images: newImage,
        newImg:newnewImg
      };
    });
    setcurColor("");
    setImage("");
    toast.success("Color and Image Remove.");
  };

  const removePriceAndSize = (item) => {
    let newDiscountedPrice = data.discountedPrice.filter(
      (i) => i.size !== item.size
    );
    setData((prev) => {
      return {
        ...prev,
        discountedPrice: newDiscountedPrice,
      };
    });
    setPrice("");
    setSize("");
    toast.success("Size and Price Remove.");
  };

  const removeCategory = (item) => {
    let newCategory = data.category.filter((i) => i !== item);
    setData((prev) => {
      return {
        ...prev,
        category: newCategory,
      };
    });
    setCurCategory("");
    toast.success("Category Remove.");
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="px-8 py-7 pl-72 w-[100vw]">
          <div>
            <h1 className="text-2xl font-semibold">Add a new products</h1>
            <h6 className="text-sm font-normal text-gray-600">
              This is where you can add new products to your inventory
            </h6>
          </div>
          <div>
            <div className="flex flex-col items-center justify-center w-full gap-4 mt-10">
              <div className="flex items-center justify-center w-full">
                <Table>
                  <TableRow>
                    <TableHeaderCell>Product Name</TableHeaderCell>
                    <TableCell>{data.title}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Description</TableHeaderCell>
                    <TableCell>{data.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>MRP</TableHeaderCell>
                    <TableCell>{data.MRP}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Color & Image</TableHeaderCell>
                    <TableCell>
                      {data.colorAndImg.map((item) => (
                        <div className="flex gap-2 items-center py-1">
                          <Text>{item.color}</Text>
                          <Text>image</Text>
                          <Button
                            size="sm"
                            color="red"
                            variant="secondary"
                            className="px-3 py-[2px]"
                            onClick={() => removeColorAndImg(item)}
                          >
                            X
                          </Button>
                        </div>
                      ))}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Category</TableHeaderCell>
                    <TableCell>
                      {data.category.map((item) => (
                        <div className="flex gap-2 items-center py-1">
                          <Text>{item}</Text>

                          <Button
                            size="sm"
                            color="red"
                            variant="secondary"
                            className="px-3 py-[2px]"
                            onClick={() => removeCategory(item)}
                          >
                            X
                          </Button>
                        </div>
                      ))}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeaderCell>Size & Price</TableHeaderCell>
                    <TableCell>
                      {data.discountedPrice.map((item) => (
                        <div className="flex gap-2 items-center py-1">
                          <Text>{item.size}</Text>
                          <Text>{item.price}</Text>
                          <Button
                            size="sm"
                            color="red"
                            variant="secondary"
                            className="px-3 py-[2px]"
                            onClick={() => removePriceAndSize(item)}
                          >
                            X
                          </Button>
                        </div>
                      ))}
                    </TableCell>
                  </TableRow>
                </Table>
              </div>
              <div className="w-full mt-4">
                <Text className="text-xl font-semibold">
                  Add product details
                </Text>
              </div>
              <Divider className="mt-0" />
              <div className="flex flex-col gap-2 w-96">
                <div className="flex items-center justify-center gap-2">
                  <Text className="w-64 text-lg font-normal">Product name</Text>
                  <TextInput
                    placeholder="Enter Product Name"
                    onChange={(e) =>
                      setData((prev) => {
                        return {
                          ...prev,
                          title: e.target.value,
                        };
                      })
                    }
                    value={data.title}
                  ></TextInput>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Text className="w-64 text-lg font-normal">
                    Product description
                  </Text>
                  <TextInput
                    placeholder="Enter Product Description"
                    onChange={(e) =>
                      setData((prev) => {
                        return {
                          ...prev,
                          description: e.target.value,
                        };
                      })
                    }
                    value={data.description}
                  ></TextInput>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Text className="w-64 text-lg font-normal">MRP</Text>
                  <TextInput
                    placeholder="Enter Selling Price"
                    type="number"
                    onChange={(e) =>
                      setData((prev) => {
                        return {
                          ...prev,
                          MRP: e.target.value,
                        };
                      })
                    }
                    value={data.MRP}
                  ></TextInput>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <Text className="w-64 text-lg font-normal">
                    Colors available (If any)
                  </Text>
                  <TextInput
                    placeholder="Enter Colors"
                    name="color"
                    value={curColor}
                    onChange={(e) => setcurColor(e.target.value)}
                  ></TextInput>
                  <TextInput
                    placeholder="Enter Price"
                    className="flex-1"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  ></TextInput>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      setData((prev) => {
                        return {
                          ...prev,
                          colors: [...prev.colors, curColor],
                          colorAndImg: [
                            ...prev.colorAndImg,
                            {
                              color: curColor,
                              image: image,
                            },
                          ],
                          newImg: [...prev.newImg, image],
                        };
                      });
                      toast.success("Color and Image Added.");
                      setcurColor("");
                      setImage("");
                    }}
                  >
                    Add
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <Text className="w-64 text-lg font-normal">
                    Select product category
                  </Text>
                  <div className="w-full flex gap-2">
                    <SearchSelect
                      value={curCategory}
                      onValueChange={(value) => setCurCategory(value)}
                    >
                     {
                        category.length !== 0?(category.map((item)=>(
                          <SearchSelectItem value={item.category}>{item.category}</SearchSelectItem>
                          
                          ))):<SearchSelectItem value="">No Category Available</SearchSelectItem>
                      }
                    </SearchSelect>
                    <Button
                      className="flex-1"
                      onClick={() => {
                        setData((prev) => {
                          return {
                            ...prev,
                            category: [...prev.category, curCategory],
                          };
                        });
                        toast.success("Category Added.");
                        setCurCategory("");
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 w-full">
                  <Text className="text-lg font-normal flex-2">
                    Product sizes (if any)
                  </Text>

                  <TextInput
                    placeholder="Enter Sizes"
                    className="flex-1"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  ></TextInput>
                  <TextInput
                    placeholder="Enter Price"
                    className="flex-1"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></TextInput>

                  <Button
                    className="flex-1"
                    onClick={() => {
                      setData((prev) => {
                        return {
                          ...prev,
                          discountedPrice: [
                            ...prev.discountedPrice,
                            {
                              size: size,
                              price: price,
                            },
                          ],
                        };
                      });
                      setPrice("");
                      setSize("");
                      toast.success("Size and Price Added.");
                    }}
                  >
                    Add
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-4 mt-6">
                  <Button onClick={() => handleUpdateProduct()}>Save</Button>
                  <Button variant="secondary">Discard</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
