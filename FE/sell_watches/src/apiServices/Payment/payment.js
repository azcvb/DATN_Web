import * as request from "~/utils/request"

export const payment = async (data) => {
    try {
        const res = await request.get(`payment?amount=${data}`)
        return res;
    } catch (err) {
        console.log(err)
    }
}