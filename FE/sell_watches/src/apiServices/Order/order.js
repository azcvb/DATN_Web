import * as request from '~/utils/request'

export const order = async (data) => {
    try {
        const res = request.post('order', data);
        return res;
    } catch (err) {
        console.log(err)
    }
}