import { Button} from "@radix-ui/themes";
import React from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../Contexts/ProductContext";
import ProductCard from "../components/ProductCard/ProductCard";
import { useFilterContext } from "../Contexts/FilterContext";

export default function Home() {
  const {filter_products}=useFilterContext()
  const {products}=useProductContext()
  const random =
    "Established in the year 2006 at Surat (Gujarat, India), we “Gujarat Sales” are engaged in Manufacturer of an excellent quality range of Glitter Powder, Epoxy Resins, Epoxy Hardeners, etc. We are a Sole Proprietorship firm and we source products from the reliable market vendors which can be availed from us at reasonable prices. Under the guidance of “Mr. Rajesh Pandey”, who holds profound knowledge and experience in this domain, we have been able to aptly satisfy our clients. We are highly appreciated by clients for offering excellent quality products. With our team’s support, we have been able to cater varied needs of patrons in an efficient manner.";
  return (
    <>
      <div>
        <section className="flex flex-row-reverse p-10 max-lg:flex-col">
        <div className="object-cover w-1/2 h-full overflow-hidden rounded-3xl max-lg:w-full max-lg:h-full">
            <img src="./hero.png" alt=""/>
          </div>
          <div className="flex flex-col justify-between w-1/2 max-lg:w-full max-lg:items-center max-lg:justify-center max-lg:mt-10">
            <div>
              <h1 className="text-2xl font-semibold leading-tight max-lg:text-lg">
                Welcome to
              </h1>
              <span className="font-extrabold uppercase text-7xl max-lg:text-6xl text-radix-green">
                Gujarat Sales
              </span>
              <h2 className="text-lg font-semibold text-radix-green">Ecommerce store</h2>
              <p className="mt-6 pr-28 max-lg:pr-0">{random}</p>
            </div>
            <div className="flex gap-3 max-lg:flex-col max-lg:mt-10">
              <Link to="/products">
              <Button size="4">Click here to explore products</Button>
              </Link>
              <a href="https://api.whatsapp.com/send?phone=919825025769&text=Hello%20Gujarat%20Sales!" target="_blank">
              <Button variant="surface" size="4">
                Contact on Whatsapp
              </Button>
              </a>
            </div>
          </div>
        </section>
        <section className="flex flex-col p-10 my-16 max-lg:my-0">
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-5xl font-bold text-green-800 max-lg:text-center">
              Our best sellers
            </h1>
            <h2 className="text-xl font-normal text-gray-700 max-lg:text-center max-lg:text-sm">
              These are our best selling products. Choose from any of them and
              get instant discounts
            </h2>
          </div>
          <div className="flex items-center mt-16 justify-evenly max-lg:flex-col max-lg:gap-4 max-lg:mt-8">
            {
              products.map((item)=>(
                <ProductCard item={item} key={item._id}/>
              ))
            }
          </div>
        </section>
        <section className="flex h-full p-10 max-lg:flex-col">
          <div className="flex items-center gap-16 overflow-hidden max-lg:flex-col ">
            <div className="object-cover h-full overflow-hidden rounded-3xl ">
            <img src="./promo2.png" alt="" width="4000"/>
            </div>
            <div className="object-cover overflow-hidden rounded-3xl">
            <img src="./promo.mp4" alt="" width="4000"/>
            </div>
            <div className="object-cover overflow-hidden rounded-3xl">
            <img src="./promo.png" alt="" width="4000"/>
            </div>
          </div>
        </section>
        <section className="p-10">
          <div className="flex items-center justify-between w-full h-64 px-4 overflow-hidden bg-green-700 rounded-3xl max-lg:flex-col-reverse max-lg:h-full max-lg:w-full max-lg:gap-10">
            <div className="flex items-end overflow-hidden w-80">
              <img src="./owner.png" alt="" className="object-cover"/>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold text-white max-lg:text-xl"><span className=" text-gs-green-dark">Owner :</span> Mr. Rajesh Pandey</h1>
              <h1 className="text-xl font-semibold text-gray-300 max-lg:font-medium max-lg:text-white max-lg:text-base"><span className=" text-gs-green-dark">Address : </span> B 5, Rustam Park, Maruti Nagar Chowk, Surat, , Surat- 394210, Gujarat, India</h1>
              <h1 className="text-xl font-semibold text-gray-300 max-lg:font-medium max-lg:text-white max-lg:text-base"><span className=" text-gs-green-dark">GST No : </span> 24AJCPP5681R1ZH</h1>
              <h1 className="text-xl font-semibold text-gray-300 max-lg:font-medium max-lg:text-white max-lg:text-base"><span className=" text-gs-green-dark">Phone No : </span> +91 98250 25769</h1>
            </div>
            <div className="flex items-center justify-center p-10">
              <img src="./gs.svg" alt="" />
            </div>
          </div>
          </section>
      </div>
     
    </>
  );
}
