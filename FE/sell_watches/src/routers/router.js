import config from "~/configs"
import Cart from "~/pages/Customer/Cart";
import Home from "~/pages/Customer/Home"
import Pay from "~/pages/Customer/Pay";
import PaymentCheck from "~/pages/Customer/PaymentCheck";
import ProductDetail from "~/pages/Customer/ProductDetail";
import Search from "~/pages/Customer/Search";
import Trademark from "~/pages/Customer/Trademark";

const publicRouters = [
    { path: config.routes.home, component: Home },
    { path: config.routes.trademark, component: Trademark },
    { path: config.routes.product, component: ProductDetail },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.pay, component: Pay },
    { path: config.routes.payCheck, component: PaymentCheck },
    { path: config.routes.search, component: Search }

]

export { publicRouters };