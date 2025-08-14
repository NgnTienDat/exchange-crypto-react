import {AUTH_REQUEST } from "../utils/axiosConfigs";
import { endpoints } from "../utils/helper";



export async function placeOrder({ order }) {
  const res = await AUTH_REQUEST.post(endpoints.postOrder, {
    getCryptoId: order.getCryptoId,
    giveCryptoId: order.giveCryptoId,
    side:  order.side,
    price:  order.price,
    quantity:  order.quantity,
    timeInForce:  order.timeInForce,
    orderType:  order.orderType
  });

  if (res.status !== 200) throw new Error(res.response.data);
  const data = res.data.result;

  return data;
}


