import * as request from '~/utils/request'

export const postAddProduct = async (data) => {
    try {
        const res = await request.post("products/addProduct", data)
        return res;
    } catch (err) {
        console.log(err)
    }
}