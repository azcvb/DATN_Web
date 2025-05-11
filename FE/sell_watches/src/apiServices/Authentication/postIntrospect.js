import * as request from '~/utils/request'

export const postIntrospect = async (data) => {
    try {
        const res = await request.post('auth/introspect', data);
        return res;
    } catch (err) {
        return err.response.data
    }
}