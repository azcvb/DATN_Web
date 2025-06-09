import * as request from '~/utils/request';
export const postCheckNumberPhone = async (data) => {
    try {
        const res = await request.post('account/checkNumberPhone', data);
        return res;
    } catch (err) {
        console.log(err);
    }
};