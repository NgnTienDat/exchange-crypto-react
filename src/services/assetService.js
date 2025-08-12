import { AUTH_REQUEST } from "../utils/axiosConfigs";
import { endpoints } from "../utils/helper";




export async function getMyAssets() {
  const res = await AUTH_REQUEST.get(endpoints.myAssets);

  if (res.status != 200) throw new Error("Error my assets");

  const data = res.data;
  // console.log("My assets: ", data)

  return data?.result || null
}