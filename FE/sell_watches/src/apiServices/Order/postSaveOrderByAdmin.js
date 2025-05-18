import * as request from '~/utils/request';
export const postSaveOrderByAdmin = async (data, token) => {
    try {
        const res = await request.post('order/savaOrderByAdmin', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res;
    } catch (err) {
        console.log(err);
    }
};