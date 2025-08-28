import { AUTH_REQUEST } from "../utils/axiosConfigs";
import { endpoints } from "../utils/helper";

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();


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

export async function getAdminOrderBook(pairId = "BTC-USDT", limit = 10, side) {
  const res = await AUTH_REQUEST.get(endpoints.adminOrderBook, {
    params: { pairId, limit, side },
  });

  if (res.status !== 200) throw new Error("Error get order book admin");

  const data = res.data;

  return data?.result?.orders || null;
}


export async function getUserOrderStats(userId) {
  const res = await AUTH_REQUEST.get(endpoints.orderStats(userId));

  if (res.status !== 200) throw new Error("Error stats");

  const data = res.data;

  return data?.result || null;
}


export async function getTotalOrdersToday() {
  const res = await AUTH_REQUEST.get(endpoints.totalOrdersToDay);

  if (res.status !== 200) throw new Error("Error get total order admin");

  const data = res.data;

  return data?.result || null;
}


export async function getTotalOrdersByMonth(month, year) {
  const res = await AUTH_REQUEST.get(endpoints.totalOrdersMoth, {
    params: { month, year },
  });

  if (res.status !== 200) throw new Error("Error get total order admin");

  const data = res.data;

  return data?.result || null;
}


export async function getTotalOrdersByYear(year) {
  const res = await AUTH_REQUEST.get(endpoints.totalOrdersYear, {
    params: { year },
  });

  if (res.status !== 200) throw new Error("Error get total order admin");

  const data = res.data;

  return data?.result || null;
}