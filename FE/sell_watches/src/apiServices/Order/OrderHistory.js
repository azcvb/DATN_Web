import * as request from '~/utils/request';
export const postOrderHistory = async (data) => {
    try {
        const res = await request.post('order/orderHistory', data);
        return res;
    } catch (err) {
        console.log(err);
    }
};