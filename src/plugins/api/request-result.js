import { API_STATUS } from "./status";
export class ApiRequestResult {
  constructor(status, result) {
    this._status = status;
    this._result = result;
  }

  get status() {
    return this._status;
  }

  get result() {
    return this._result;
  }

  get success() {
    return this._status === API_STATUS.OK || this._status === API_STATUS.CREATED;
  }
}
