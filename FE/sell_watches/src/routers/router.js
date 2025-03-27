import config from "~/configs"
import Cart from "~/pages/Cart";
import Home from "~/pages/Home"
import Pay from "~/pages/Pay";
import PaymentCheck from "~/pages/PaymentCheck";
import ProductDetail from "~/pages/ProductDetail";
import Trademark from "~/pages/Trademark";

const publicRouters = [
    { path: config.routes.home, component: Home },
    { path: config.routes.trademark, component: Trademark },
    { path: config.routes.product, component: ProductDetail },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.pay, component: Pay },
    { path: config.routes.payCheck, component: PaymentCheck }

]

export { publicRouters };