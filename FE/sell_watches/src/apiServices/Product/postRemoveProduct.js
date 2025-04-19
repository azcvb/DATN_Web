import * as request from '~/utils/request'

export const postRemoveProduct = async (data) => {
    try {
        const res = await request.post('products/remove', data);
        return res
    } catch (err) {
        console.log(err)
    }
}