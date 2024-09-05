import { apicall } from "../utils/apicall";
import { Project } from "../pages/projects/Interfaces";

const token = localStorage.getItem("token");
export const fetchProjectList = async () => {
  let url = "/api/project/";
  let method = "get";
  let apiResponse: any = await apicall({
    url,
    method,
    access_token: token,
  });
  return apiResponse;
};

export const AddProject = async (record: Project) => {
  let url = "/api/project/";
  let method = "post";
  let apiResponse: any = await apicall({
    payload: record,
    url,
    method,
    access_token: token,
  });
  return apiResponse;
};

export const EditProject = async (record: Project) => {
  let url = `/api/project/:id=${record.id}`;
  let method = "put";
  let apiResponse: any = await apicall({
    payload: record,
    url,
    method,
    access_token: token,
  });
  return apiResponse;
};

export const DeleteProject = async (record: Project) => {
  let url = "/api/project/:id=" + record.id;
  let method = "delete";
  let apiResponse: any = await apicall({
    url,
    method,
    access_token: token,
  });
  return apiResponse;
};
