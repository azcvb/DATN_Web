import * as request from '~/utils/request'

export const postDataTableAdmin = async (data) => {
    try {
        const res = await request.post("products/filterAdmin", data);
        return res;
    } catch (err) {
        console.log(err)
    }
}