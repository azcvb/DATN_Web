import * as request from '~/utils/request';
export const postGetProductCode = async (data, token) => {
    try {
        const res = await request.post(`products/productCode`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res;
    } catch (err) {
        return err;
    }
};