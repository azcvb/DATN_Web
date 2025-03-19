import config from "~/configs"
import Product from "~/layouts/Component/Product";
import Home from "~/pages/Home"
import Trademark from "~/pages/Trademark";

const publicRouters = [
    { path: config.routes.home, component: Home },
    { path: config.routes.trademark, component: Trademark },
    { path: config.routes.product, component: Product }

]

export { publicRouters };