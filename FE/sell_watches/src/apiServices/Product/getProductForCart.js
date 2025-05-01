import * as request from '~/utils/request'

export const getProductForCart = async (data) => {
    try {
        const res = await request.post("products/forCart", data)
        return res;
    } catch (err) {
        console.log(err)
    }
}