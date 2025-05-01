import * as request from '~/utils/request'

export const postAddType = async (data) => {
    try {
        const res = request.post("type/addType", data)
        return res;

    } catch (err) {
        console.log(err)
    }
}