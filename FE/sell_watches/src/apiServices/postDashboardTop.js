import * as request from '~/utils/request'

export const postDashboardTop = async (data) => {
    try {
        const res = await request.post('dashboard/top', data)
        return res.result;
    } catch (err) {
        console.log(err)
    }
}