import { ApiRequestResult } from "./request-result";
export async function request(axios, method, url, form = null) {
  let res;
  try {
    res = await axios({
      method,
      url,
      data: form,
      validateStatus: function (status) {
        // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
        return status < 500;
      },
    });
  } catch (err) {
    res = err;
  }
  const statusCode = res.response ? res.response.status : res.status;
  const data = res.response ? res.response.data : res.data;
  return new ApiRequestResult(statusCode, data);
}
