import * as request from '~/utils/request'

export const postDashboardBottom = async (data) => {
    try {
        const res = await request.post('dashboard/bottom', data)
        return res.result;
    } catch (err) {
        console.log(err)
    }
}