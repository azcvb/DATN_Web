import * as request from '~/utils/request';
export const postGetInfo = async (data) => {
    try {
        const res = await request.post('auth/getInfo', data);
        return res;
    } catch (err) {
        console.log(err);
    }
};