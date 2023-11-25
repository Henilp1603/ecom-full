import {PlusCircle} from "lucide-react";
import AccountSettingsIcon from "../icons/AccountSettingsIcon";
import HomeIcon from "../icons/HomeIcon";
import ProductsIcon from "../icons/ProductsIcon";
import UsersIcon from "../icons/UsersIcon";
import {Link, NavLink} from "react-router-dom";

export function Sidebar({}) {
  return (
    <div
      id="docs-sidebar"
      className="hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300"
    >
      <div className="px-6">
        <a className="flex-none text-xl font-semibold">Admin Dashboard</a>
      </div>

      <nav className="flex flex-col flex-wrap w-full gap-10 p-6">
        <ul className="space-y-1.5">
          <NavLink to="/">
            <li>
              <button
                type="button"
                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100"
              >
                <HomeIcon />
                Dashboard
              </button>
            </li>
          </NavLink>

          <NavLink to="/products">
            {" "}
            <li>
              <button
                type="button"
                className="w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 "
              >
                <ProductsIcon />
                Products
              </button>
            </li>
          </NavLink>

          <NavLink to="/users">
            {" "}
            <li>
              <button
                type="button"
                className="w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 "
              >
                <UsersIcon />
                Users
              </button>
            </li>
          </NavLink>

          <NavLink to="/orders">
            {" "}
            <li>
              <button
                type="button"
                className="w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 "
              >
                <UsersIcon />
                Orders
              </button>
            </li>
          </NavLink>

          <NavLink to="/settings">
            <li>
              <button
                type="button"
                className="w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 "
              >
                <AccountSettingsIcon />
                Settings
              </button>
            </li>
          </NavLink>
        </ul>

        <NavLink to="/add-product">
          <button
            type="button"
            className="w-full text-center flex justify-center items-center gap-x-3.5 py-2 px-2.5 text-sm bg-tremor-brand text-white rounded-lg hover:bg-tremor-brand-emphasis transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Add new product
          </button>
        </NavLink>
        <NavLink to="/add-category">
          <button
            type="button"
            className="w-full text-center flex justify-center items-center gap-x-3.5 py-2 px-2.5 text-sm bg-tremor-brand text-white rounded-lg hover:bg-tremor-brand-emphasis transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Add new category
          </button>
        </NavLink>
      </nav>
    </div>
  );
}
