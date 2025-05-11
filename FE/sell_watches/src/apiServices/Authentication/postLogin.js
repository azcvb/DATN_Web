import * as request from '~/utils/request'

export const postLogin = async (data) => {
    try {
        const res = await request.post('auth/token', data);
        return res;
    } catch (err) {
        return err.response.data
    }
}