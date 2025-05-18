import * as request from "~/utils/request"

export const payment = async (sum, orderId) => {
    try {
        const res = await request.get(`payment?amount=${sum}&orderId=${orderId}`)
        return res;
    } catch (err) {
        console.log(err)
    }
}