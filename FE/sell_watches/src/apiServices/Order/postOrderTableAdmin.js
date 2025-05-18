import * as request from '~/utils/request'

export const postOrderTableAdmin = async (data, token) => {
    try {
        const res = await request.post('order/tableAdmin', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res;
    } catch (err) {
        console.log(err)
    }
}