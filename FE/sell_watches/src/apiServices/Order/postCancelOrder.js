import * as request from '~/utils/request';
export const postCancelOrder = async (data) => {
    try {
        const res = await request.post('order/cancelOrder', data);
        return res;
    } catch (err) {
        console.log(err);
    }
};