import { API } from "../utils/axiosConfigs";
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