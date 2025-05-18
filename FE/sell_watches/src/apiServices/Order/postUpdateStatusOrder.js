import * as request from '~/utils/request';
export const postUpdateStatusOrder = async (data) => {
    try {
        const res = await request.post(`order/updateStatusOrder`, data);
        return res;
    } catch (err) {
        console.log(err);
    }
};