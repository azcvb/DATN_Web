import * as request from '~/utils/request'

export const postGetProductId = async (data) => {
    try {
        const res = await request.post(`products/idAdmin`, data);
        return res;
    } catch (err) {
        console.log(err)
    }
}