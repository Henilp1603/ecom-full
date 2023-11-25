import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@radix-ui/themes/styles.css";
import {Theme, ThemePanel} from "@radix-ui/themes";
import {ProductProvider} from "./Contexts/ProductContext.jsx";
import {FilterProvider} from "./Contexts/FilterContext.jsx";
import {QueryClient, QueryClientProvider} from "react-query";
import {AuthProvider} from "./Contexts/AuthContext.jsx";
import {CartProvider} from "./Contexts/CartContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Theme
        appearance="light"
        accentColor="green"
        radius="full"
        panelBackground="translucent"
      >
        <AuthProvider>
          <ProductProvider>
            <FilterProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </FilterProvider>
          </ProductProvider>
        </AuthProvider>
      </Theme>
    </QueryClientProvider>
  </React.StrictMode>
);
