import * as request from '~/utils/request'

export const getDistinctType = async () => {
    try {
        const res = request.post("products/type")
        return res;

    } catch (err) {
        console.log(err)
    }
}