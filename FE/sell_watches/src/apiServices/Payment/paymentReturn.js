import * as request from "~/utils/request"

export const paymentReturn = async (data) => {
    try {
        const res = await request.get(`payment/return${data}`)
        return res;
    } catch (err) {
        console.log(err)
    }
}