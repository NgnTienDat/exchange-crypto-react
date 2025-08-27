import { AUTH_REQUEST } from "../utils/axiosConfigs";
import { endpoints } from "../utils/helper";



export async function placeOrder(order) {
  const res = await AUTH_REQUEST.post(endpoints.postOrder, {
    getCryptoId: order.getCryptoId,
    giveCryptoId: order.giveCryptoId,
    side: order.side,
    price: order.price,
    quantity: order.quantity,
    timeInForce: order.timeInForce,
    orderType: order.orderType
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

export async function getOpenOrdersByPairId(pairId, page = 0, size = 10) {
  const res = await AUTH_REQUEST.get(endpoints.openOrders(pairId), {
    params: { page, size },
  });

  if (res.status != 200) throw new Error("Error order");

  const data = res.data;

  return data?.result || null
}

export async function getOrderHistoryByPairId(pairId, page = 0, size = 7) {
  const res = await AUTH_REQUEST.get(endpoints.orderHistory(pairId), {
    params: { page, size },
  });

  if (res.status != 200) throw new Error("Error order");

  const data = res.data;

  return data?.result || null
}

export async function getAllOrders() {
  const res = await AUTH_REQUEST.get(endpoints.allMyOrders);

  if (res.status != 200) throw new Error("Error order");

  const data = res.data;


  return data?.result || null
}


export async function getAllOrdersByAdmin(page = 0, size = 3) {
  const res = await AUTH_REQUEST.get(endpoints.allOrders, {
    params: { page, size },
  });

  if (res.status !== 200) throw new Error("Error get all orders");

  const data = res.data;

  return data?.result || null;
}


export async function getUserOrders(userId, page = 0, size = 10) {
  const res = await AUTH_REQUEST.get(endpoints.userOrders(userId), {
    params: { page, size },
  });

  if (res.status !== 200) throw new Error("Error order");

  const data = res.data;

  return data?.result || null;
}


export async function getUserOrderStats(userId) {
  const res = await AUTH_REQUEST.get(endpoints.orderStats(userId));

  if (res.status !== 200) throw new Error("Error stats");

  const data = res.data;

  return data?.result || null;
}