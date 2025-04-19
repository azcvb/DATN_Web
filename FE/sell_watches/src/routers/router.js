import config from "~/configs"
import DefaultLayout from "~/layouts/DefaultLayout";
import Login from "~/pages/Admin/Login";
import Cart from "~/pages/Customer/Cart";
import Home from "~/pages/Customer/Home"
import Pay from "~/pages/Customer/Pay";
import PaymentCheck from "~/pages/Customer/PaymentCheck";
import ProductDetail from "~/pages/Customer/ProductDetail";
import Search from "~/pages/Customer/Search";
import Trademark from "~/pages/Customer/Trademark";
import PageAdmin from "~/pages/Admin/PageAdmin";
import HomeAdmin from "~/pages/Admin/Layout/HomeAdmin";
import ProductAdmin from "~/pages/Admin/Layout/ProductAdmin";

const publicRouters = [
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.trademark, component: Trademark, layout: DefaultLayout },
    { path: config.routes.product, component: ProductDetail, layout: DefaultLayout },
    { path: config.routes.cart, component: Cart, layout: DefaultLayout },
    { path: config.routes.pay, component: Pay, layout: DefaultLayout },
    { path: config.routes.payCheck, component: PaymentCheck, layout: DefaultLayout },
    { path: config.routes.search, component: Search, layout: DefaultLayout },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.homeAdmin, component: HomeAdmin, layout: PageAdmin },
    { path: config.routes.productAdmin, component: ProductAdmin, layout: PageAdmin }

]

export { publicRouters };