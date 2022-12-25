import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { getAllVideos } from "../services/VideoService.js";
import VideoThumbComponent from "./VideoThumbComponent.jsx";
import { getUser } from "../util/util.js";
import { useLocation } from "react-router-dom";

function VideoGalleryComponent(props) {
  const queryClient = useQueryClient();
  const user = JSON.parse(getUser());
  const location = useLocation();
  console.log(location.pathname);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["videos"],
    queryFn:
      location.pathname == "/admin"
        ? () => getAllVideos(user.id)
        : () => getAllVideos(),
    initialData: {
      videos: [],
    },
  });

  console.log(data);
  if (isLoading) {
    return <div className="text-lg text-center w-full">Loading</div>;
  }
  if (data?.videos?.length <= 0) {
    return <div className="text-lg text-center w-full">No videos found</div>;
  }
  return (
    <div className="px-10">
      <div className="grid grid-cols-4 gap-2 grid-flow-row-dense">
        {data.videos.map((item, index) => (
          <VideoThumbComponent video={item} key={index} />
        ))}
      </div>
    </div>
  );
}

export default VideoGalleryComponent;
