import * as request from '~/utils/request'

export const postUpdateProduct = async (data) => {
    try {
        const res = await request.post(`products/update`, data);
        return res;
    } catch (err) {
        console.log(err)
    }
}