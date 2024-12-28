import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoutes from "./routes/PrivateRoutes/PrivateRoutes.jsx";
import Profile from "./pages/User/Profile/Profile.jsx";
import AdminRoutes from "./routes/AdminRoutes/AdminRoutes.jsx";
import UserList from "./pages/Admin/UserList.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import ProductList from "./pages/Admin/ProductList.jsx";
import UpdateProducts from "./pages/Admin/UpdateProducts.jsx";
import AllProducts from "./pages/Admin/AllProducts.jsx";
import Home from "./pages/Home/Home.jsx";
import OrderList from "./pages/Admin/OrderList.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import Shipping from "./pages/Orders/Shipping.jsx";
import PlaceOrder from "./pages/Orders/PlaceOrder.jsx";
import Order from "./pages/Orders/Order.jsx";
import Favorites from "./pages/Products/Favorites.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";

// Create a router with a single route to the App component
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/favorite" element={<Favorites />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />

      {/* All private routes */}
      <Route path="" element={<PrivateRoutes />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
      </Route>

      {/* admin routes */}
      <Route path="/admin" element={<AdminRoutes />}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categoryList" element={<CategoryList />} />
        <Route path="productlist/:pageNumber" element={<ProductList />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="product/update/:_id" element={<UpdateProducts />} />
        <Route path="orderlist" element={<OrderList />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>
    </Route>
  )
);

// Render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastContainer />
    <RouterProvider router={router} />
  </Provider>
);
