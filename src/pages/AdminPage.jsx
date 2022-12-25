import React from "react";
import AddVideoComponent from "../components/AddVideoComponent.jsx";
import VideoGalleryComponent from "../components/VideoGalleryComponent.jsx";
import TopBar from "../components/TopBar.jsx";
import UserListComponent from "../components/UserListComponent.jsx";
import { getUser } from "../util/util.js";

function AdminPage() {
  const user = JSON.parse(getUser());
  console.log(user);
  return (
    <div className="flex w-full flex-col ">
      <div className="sticky top-0 z-[999]">
        <TopBar />
      </div>
      <div className="flex items-start gap-1 p-5 overflow-hidden w-full">
        <AddVideoComponent />
        {user.role == "admin" && <UserListComponent />}
      </div>
      <VideoGalleryComponent />
    </div>
  );
}

export default AdminPage;
