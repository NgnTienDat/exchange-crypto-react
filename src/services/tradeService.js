import { API, AUTH_REQUEST } from "../utils/axiosConfigs";
import { endpoints } from "../utils/helper";

export async function openTrade(productId) {
  const res = await API.post(endpoints.productDetail(productId));

  if (res.status !== 200) throw new Error(res.response.data);
  const data = res.data.result;



  return data;
}

export async function closeTrade(productId) {
  const res = await API.post(endpoints.unsubscribeProduct(productId));

  if (res.status !== 200) throw new Error(res.response.data);
  const data = res.data.result;



  return data;
}


export async function getAllTradesAdmin(page = 0, size = 10) {
  const res = await AUTH_REQUEST.get(endpoints.allTrades, {
    params: { page, size },
  });

  if (res.status != 200) throw new Error("Error get trades");

  const data = res.data;

  return data?.result || null
}