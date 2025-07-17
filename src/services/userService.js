import { API } from "../utils/axiosConfigs";
import { endpoints } from "../utils/helper";

export async function loginApi({ email, password }) {
  const res = await API.post(endpoints.login, {
    email: email,
    password: password,
  });
  if (res.status !== 200) throw new Error(res.data.message);
  const data = res.data.result;
  console.log("Token: ", data)

//   data.isAuthenticated = true;

  return data;
}