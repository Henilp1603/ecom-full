import NavDropDown from "./NavDropDown";
import {Link} from "react-router-dom";


export default function MobileNavbar() {
  return (
    <>
    <div className="fixed bottom-0 left-0 z-50 flex items-center justify-center w-full py-4 bottom-100 md:hidden">
      <div className="flex items-center justify-center px-10 py-4 text-white border-2 border-green-800 rounded-full w-max max-h-24 bg-green-950">
          <div className="flex items-center font-sans text-sm font-semibold justify-evenly menu gap-x-6">
          <Link to="/">
              <span>Home</span>
            </Link>
            <Link to="products">
              <span>Products</span>
            </Link>
            <NavDropDown navItem={<span role="button">Category</span>} />
            <Link to="contact">
              <span role="button">Contact</span>
            </Link>
        </div>
      </div>
      </div>
    </>
  );
}

    
  