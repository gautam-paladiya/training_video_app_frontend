import axios from "axios";

export const getAllUsers = () => {
  const config = {};
  return axios
    .get(`${import.meta.env.VITE_BASE_URL}/user`, config)
    .then((res) => res.data);
};
export const updateUser = (id, canDownload) => {
  const config = {};
  return axios
    .put(`${import.meta.env.VITE_BASE_URL}/user`, {
      userId: id,
      canDownload: canDownload,
    })
    .then((res) => res.data);
};
