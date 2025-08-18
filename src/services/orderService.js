import {AUTH_REQUEST } from "../utils/axiosConfigs";
import { endpoints } from "../utils/helper";



export async function placeOrder(order) {
  const res = await AUTH_REQUEST.post(endpoints.postOrder, {
    getCryptoId: order.getCryptoId,
    giveCryptoId: order.giveCryptoId,
    side:  order.side,
    price:  order.price,
    quantity:  order.quantity,
    timeInForce:  order.timeInForce,
    orderType:  order.orderType
  });

  if (res.status !== 201) throw new Error(res.response.data);
  const data = res.data.result;

  return data;
}



export async function getOrdersByPairId(pairId) {
  const res = await AUTH_REQUEST.get(endpoints.myOrders(pairId));

  if (res.status != 200) throw new Error("Error currentUser");

  const data = res.data;
  

  return data?.result || null
}

export async function getOpenOrdersByPairId(pairId) {
  const res = await AUTH_REQUEST.get(endpoints.openOrders(pairId));

  if (res.status != 200) throw new Error("Error order");

  const data = res.data;

  // console.log("open service: ", data.result)
  

  return data?.result || null
}

export async function getOrderHistoryByPairId(pairId) {
  const res = await AUTH_REQUEST.get(endpoints.orderHistory(pairId));

  if (res.status != 200) throw new Error("Error order");

  const data = res.data;
  // console.log("history: ", data.result)
  

  return data?.result || null
}