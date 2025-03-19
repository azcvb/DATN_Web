import * as request from "~/utils/request"

export const getListProductsHome = async () => {
    try {
        const res = await request.get("products")
        return res;
    } catch (err) {
        console.log(err)
    }
}