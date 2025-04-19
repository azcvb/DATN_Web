import * as request from '~/utils/request'

export const getProductForCar = async (data) => {
    try {
        const res = await request.post("products/forCart", data)
        return res;
    } catch (err) {
        console.log(err)
    }
}