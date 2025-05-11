import * as request from '~/utils/request'

export const postRegister = async (data) => {
    try {
        const res = await request.post('auth/register', data);
        return res;
    } catch (err) {
        return err.response.data
    }
}