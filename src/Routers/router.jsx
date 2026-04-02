import {
    createBrowserRouter,
} from "react-router-dom";

import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddProduct from "../pages/AddProduct/AddProduct";
import Expenses from "../pages/Expenses/Expenses";
import Products from "../pages/Products/Products";

import PrivateRoute from "./PrivateRoute";
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import EditProduct from "../pages/EditProduct/EditProduct";
import Product from "../pages/Product/Product";
import Cart from '../pages/Cart/Cart';
import HowladNewa from "../pages/HowladNewa/HowladNewa";
import ManageProduct from "../pages/ManageProduct/ManageProduct";
import PaboTaka from "../pages/PaboTaka/PaboTaka";
import ProductCard from "../pages/ProductCard/ProductCard";
import ProductCardPage from "../pages/ProductCardPage/ProductCardPage";
import PaboTakaList from "../pages/PaboTaka/PaboTakaList";
import ExpenseList from "../pages/ExpenseList/ExpenseList";
import HowladList from "../pages/HowladNewa/HowladList";
import Sales from "../pages/Sales/Sales";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "dashboard",
                element: <PrivateRoute><Dashboard /></PrivateRoute>
            },
            {
                path: "add-product",
                element: <PrivateRoute><AddProduct /></PrivateRoute>
            },
            {
                path: "manage-product",
                element: <PrivateRoute><ManageProduct /></PrivateRoute>
            },
            {
                path: "shop",
                element: <Product />
            },
            {
                path: "products",
                element: <Products />
            },
            {
                path: "expenses",
                element: <PrivateRoute><Expenses /></PrivateRoute>
            },

            {
                path: "/edit/:id",
                element: <EditProduct />
            },
            {
                path: "cart",
                element: <Cart />
            },
            {
                path: "/sales",
                element: <Sales />
            },
            {
                path: "productCard",
                element: <ProductCard />
            },
            {
                path: "product-card-page",
                element: <ProductCardPage></ProductCardPage>
            },
            {
                path: "/expenses-list",
                element: <ExpenseList />
            },
            {
                path: "/pabo-list",
                element: <PaboTakaList />
            },
            {
                path: "paboTaka",
                element: <PaboTaka></PaboTaka>
            },
            {
                path: "/howlad-list",
                element: <HowladList />
            },
            {
                path: "howlad",
                element: <HowladNewa />
            },
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <SignUp />
    }
]);

export default router;