import config from "~/configs"
import Home from "~/pages/Home"
import Trademark from "~/pages/Trademark";

const publicRouters = [
    { path: config.routes.home, component: Home },
    { path: config.routes.trademark, component: Trademark }


]

export { publicRouters };