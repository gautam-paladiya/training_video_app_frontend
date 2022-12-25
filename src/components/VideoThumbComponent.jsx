import React, { useState } from "react";
import { FaDownload, FaHeart } from "react-icons/fa";
import { getToken, getUser } from "../util/util.js";
import { canDownloadVideo, downloadVideo } from "../services/VideoService.js";

function VideoThumbComponent({ video }) {
  var user = getUser();
  user = user && JSON.parse(user);
  console.log(user);
  const onDownloadVideo = async (filename) => {
    const canDownloadVideoResponse = await canDownloadVideo(user.id);
    if (canDownloadVideoResponse.status == "failure") {
      alert(canDownloadVideoResponse.message);
      return;
    }
    const response = await downloadVideo(filename);
    console.log(response);
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement("a");
    link.href = url;
    if (typeof window.navigator.msSaveBlob === "function") {
      window.navigator.msSaveBlob(response, filename);
    } else {
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
    }
  };
  return (
    <div className="flex justify-center mb-10 w-full h-60  overflow-hidden">
      <div className="flex flex-col rounded-lg bg-gray-100 shadow-lg">
        <video
          id="videoPlayer"
          controls
          muted="muted"
          className="w-full h-full object-contain overflow-hidden"
          style={{ objectFit: "scale-contain" }}
        >
          <source
            src={`${import.meta.env.VITE_BASE_URL}/videostream/${video.name}`}
            type="video/mp4"
          />
        </video>
        <div className="flex items-center justify-between px-5">
          <h5 className="text-gray-900 text-xl font-medium mb-2 ">
            {video.original_name}
          </h5>
          <div className="flex space-x-2">
            {user?.can_download && (
              <FaDownload
                className="cursor-pointer"
                onClick={() => onDownloadVideo(video.name)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoThumbComponent;
