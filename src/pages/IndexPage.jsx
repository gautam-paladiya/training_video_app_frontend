import React from "react";
import TopBar from "../components/TopBar.jsx";
import VideoGalleryComponent from "../components/VideoGalleryComponent.jsx";

function IndexPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="sticky top-0 z-[999]">
        <TopBar />
      </div>
      <VideoGalleryComponent />
    </div>
  );
}

export default IndexPage;
