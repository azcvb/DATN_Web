import * as request from '~/utils/request'

export const getProductDetail = async (data) => {
    try {
        const res = await request.get(`products/${data}`);
        return res;
    } catch (err) {
        console.log(err)
    }
}