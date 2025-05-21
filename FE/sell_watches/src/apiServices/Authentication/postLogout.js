import * as request from '~/utils/request';
export const postLogout = async (data) => {
    try {
        const res = await request.post('auth/logout', data);
        return res;
    } catch (err) {
        console.log(err);
    }
};