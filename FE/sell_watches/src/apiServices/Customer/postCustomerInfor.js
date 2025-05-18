import * as request from '~/utils/request'

export const postCustomerInfor = async (data) => {
    try {
        const res = request.post('customer/getInfor', data);
        return res;
    } catch (err) {
        console.log(err)
    }
}