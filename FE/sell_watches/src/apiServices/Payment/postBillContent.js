import * as request from '~/utils/request'

export const postBillContent = async (data) => {
    try {
        const res = await request.post('payment/billContent', data);
        return res;
    } catch (err) {
        console.log(err);
    }
}