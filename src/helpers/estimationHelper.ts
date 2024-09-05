import { apicall } from "../utils/apicall";
import { Estimation } from "../pages/estimations/Interfaces";

const token = localStorage.getItem("token");
export const fetchEstimationsList = async () => {
  let url = "/api/estimation/";
  let method = "get";
  let apiResponse: any = await apicall({
    url,
    method,
    access_token: token,
  });
  return apiResponse;
};

export const DeleteEstimation = async (record: Estimation) => {
  let url = "/api/estimation/:id=" + record.id;
  let method = "delete";
  let apiResponse: any = await apicall({
    url,
    method,
    access_token: token,
  });
  return apiResponse;
};
