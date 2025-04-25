import * as request from "~/utils/request"

export const postDataPaymentAdmin = async (data) => {
    try {
        const res = await request.post(`payment/dataAdmin`, data)
        return res;
    } catch (err) {
        console.log(err)
    }
}