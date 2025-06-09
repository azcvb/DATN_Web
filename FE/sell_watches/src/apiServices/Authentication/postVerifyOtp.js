import * as request from '~/utils/request';
export const postVerifyOtp = async (data) => {
    try {
        const res = await request.post('auth/verifyOtp', data);
        return res;
    } catch (err) {
        console.log(err);
    }
};