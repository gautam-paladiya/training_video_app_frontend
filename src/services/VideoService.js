import axios from "axios";

export const getAllVideos = async (id = "") => {
  const config = {
    params: { id: id },
  };
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/video`, config);
  return res.data;
};

export const downloadVideo = async (id) => {
  const config = { responseType: "blob" };
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/download/${id}`,
    config
  );
  return res.data;
};

export const canDownloadVideo = async (id) => {
  const config = {
    params: { id: id },
  };
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/candownload`,
    config
  );
  return res.data;
};
