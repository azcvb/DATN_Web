import config from "~/configs/routers/index"
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
import EvaluateAdmin from "~/pages/Admin/Layout/EvaluateAdmin";
import ComplaintsAdmin from "~/pages/Admin/Layout/ComplaintsAdmin";
import PromotionAdmin from "~/pages/Admin/Layout/PromotionAdmin";
import PaymentAdmin from "~/pages/Admin/Layout/PaymentAdmin";
import OrderAdmin from "~/pages/Admin/Layout/OrderAdmin";
import ShipAdmin from "~/pages/Admin/Layout/ShipAdmin";
import WarehouseAdmin from "~/pages/Admin/Layout/WarehouseAdmin";
import EmployeeAdmin from "~/pages/Admin/Layout/EmployeeAdmin";
import CustomerAdmin from "~/pages/Admin/Layout/CustomerAdmin";
import CustomWeb from "~/pages/Admin/Layout/CustomWeb";
import Register from "~/pages/Admin/Register";
import OrderHistory from "~/pages/Customer/OrderHistory";

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
    { path: config.routes.productAdmin, component: ProductAdmin, layout: PageAdmin },
    { path: config.routes.evaluateAdmin, component: EvaluateAdmin, layout: PageAdmin },
    { path: config.routes.complaintsAdmin, component: ComplaintsAdmin, layout: PageAdmin },
    { path: config.routes.promotionAdmin, component: PromotionAdmin, layout: PageAdmin },
    { path: config.routes.paymentAdmin, component: PaymentAdmin, layout: PageAdmin },
    { path: config.routes.orderAdmin, component: OrderAdmin, layout: PageAdmin },
    { path: config.routes.shipAdmin, component: ShipAdmin, layout: PageAdmin },
    { path: config.routes.warehouseAdmin, component: WarehouseAdmin, layout: PageAdmin },
    { path: config.routes.employeeAdmin, component: EmployeeAdmin, layout: PageAdmin },
    { path: config.routes.customerAdmin, component: CustomerAdmin, layout: PageAdmin },
    { path: config.routes.customWeb, component: CustomWeb, layout: PageAdmin },
    { path: config.routes.register, component: Register, layout: null },
    { path: config.routes.orderHistory, component: OrderHistory, layout: DefaultLayout },

]

export { publicRouters };