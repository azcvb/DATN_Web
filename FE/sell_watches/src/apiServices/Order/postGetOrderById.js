import * as request from '~/utils/request';
export const postGetOrderById = async (data, token) => {
  try {
    const res = await request.post('order/getOrderById', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};