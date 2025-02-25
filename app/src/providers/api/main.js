import axiosInstance from "./axios";

/**Global method to get */
export const get = (uri) => {
  return axiosInstance.get(`${uri}`);
};

/**Global method to post */
export const post = (uri, payload) => {
  return axiosInstance.post(`${uri}`, payload);
};

/**Global method to patch */
export const patch = (uri, payload) => {
  return axiosInstance.patch(`${uri}`, payload);
};

/**Global method to delete */
export const deleteItem = (uri) => {
  return axiosInstance.delete(`${uri}`);
};