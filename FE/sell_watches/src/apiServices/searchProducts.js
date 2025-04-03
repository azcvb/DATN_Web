import * as request from "~/utils/request"

export const searchProduct = async (data, page) => {
    try {
        const res = await request.get(`products/search?q=${data}&page=${page}`)
        return res;
    } catch (err) {
        console.log(err)
    }
}