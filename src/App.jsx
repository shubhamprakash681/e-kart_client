import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { getFeaturedProducts, getProducts } from "./actions/productActions";
import { loadUserData } from "./actions/userActions";
import "./App.scss";
import Navbar from "./components/Header/Navbar";
import NotFound from "./components/layout/RouteUnavailable/NotFound";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import AllOrdersAdmin from "./pages/Admin/Order/AllOrdersAdmin";
import ProcessOrder from "./pages/Admin/Order/ProcessOrder";
import AllProductsAdmin from "./pages/Admin/Products/AllProductsAdmin";
import CreateProduct from "./pages/Admin/Products/CreateProduct";
import ProductReviews from "./pages/Admin/Products/ProductReviews";
import AllUsers from "./pages/Admin/User/AllUsers";
import ViewUserProfile from "./pages/Admin/User/ViewUserProfile";
import AllProducts from "./pages/AllProducts/AllProducts";
import Login from "./pages/Auth/Login";
import NavigateToLogin from "./pages/Auth/NavigateToLogin";
import Register from "./pages/Auth/Register";
import HomePage from "./pages/HomePage/HomePage";
import AllOrders from "./pages/Order/AllOrders";
import ConfirmOrder from "./pages/Order/ConfirmOrder";
import OrderDetails from "./pages/Order/OrderDetails";
import OrderSuccessful from "./pages/Order/OrderSuccessful";
import ShippingPage from "./pages/Order/ShippingPage";
import PaymentWrapper from "./pages/Payment/PaymentWrapper";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { ForgotPassword } from "./pages/User/ForgotPassword";
import PasswordUpdate from "./pages/User/PasswordUpdate";
import ResetPassword from "./pages/User/ResetPassword";
import UpdateProfile from "./pages/User/UpdateProfile";
import UserProfile from "./pages/User/UserProfile";

function App() {
  const { uiTheme } = useSelector((state) => state.uiReducer);
  const { isAuthenticatedUSer, user } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  };

  useEffect(() => {
    const handleWindowResize = () => {
      // setWindowSize(getWindowSize())

      dispatch({
        type: "SET_WINDOW_SIZE",
        payload: getWindowSize(),
      });
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [dispatch]);

  useEffect(() => {
    // get featured products on load
    dispatch(getFeaturedProducts(4));

    // getting all products on load
    dispatch(getProducts());

    // loading user's data from token
    dispatch(loadUserData());
  }, [dispatch]);

  return (
    <>
      <div className={`app-container ${uiTheme}`}>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />

          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path={`/product/:id`} element={<ProductDetails />} />

          {isAuthenticatedUSer ? (
            <>
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/order/confirm" element={<ConfirmOrder />} />
              <Route path="/payment" element={<PaymentWrapper />} />
              <Route path="/order/success" element={<OrderSuccessful />} />

              <Route path="/me" element={<UserProfile />} />
              <Route path="/me/update" element={<UpdateProfile />} />
              <Route path="/password/update" element={<PasswordUpdate />} />
              <Route path="/me/orders" element={<AllOrders />} />
              <Route path="/me/orders/:id" element={<OrderDetails />} />

              {/* Protected Admin Routes */}
              {user && user.user.role === "admin" && (
                <>
                  <Route path="/admin/dashboard" element={<Dashboard />} />

                  <Route
                    path="/admin/products"
                    element={<AllProductsAdmin />}
                  />
                  <Route
                    path="/admin/product/create"
                    element={<CreateProduct />}
                  />
                  <Route
                    path="/admin/product/update/:id"
                    element={<CreateProduct isUpdate />}
                  />

                  <Route path="/admin/orders" element={<AllOrdersAdmin />} />
                  <Route
                    path="/admin/order/process/:id"
                    element={<ProcessOrder />}
                  />
                  <Route
                    path="/admin/reviews/:id"
                    element={<ProductReviews />}
                  />

                  <Route path="/admin/users" element={<AllUsers />} />
                  <Route path="/admin/user/:id" element={<ViewUserProfile />} />
                </>
              )}
            </>
          ) : (
            <>
              <Route path="/shipping" element={<NavigateToLogin />} />
              <Route path="/order/confirm" element={<NavigateToLogin />} />
              <Route path="/payment" element={<NavigateToLogin />} />
              <Route path="/order/success" element={<NavigateToLogin />} />

              <Route path="/me" element={<NavigateToLogin />} />
              <Route path="/me/update" element={<NavigateToLogin />} />
              <Route path="/password/update" element={<NavigateToLogin />} />
              <Route path="/me/orders" element={<NavigateToLogin />} />
              <Route path="/me/orders/:id" element={<NavigateToLogin />} />
            </>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
