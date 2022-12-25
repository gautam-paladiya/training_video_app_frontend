import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef, useState } from "react";

function AddVideoComponent() {
  const fileDescriptionRef = useRef();
  const [file, setfile] = useState("");
  const queryClient = useQueryClient();

  const onSelectFile = (file) => {
    console.log("select file call", file);
    setfile(file);
  };

  const uploadFile = async (e) => {
    e.preventDefault();

    var formdata = new FormData();
    formdata.append("file", file, file.name);
    formdata.append("description", fileDescriptionRef.current.value);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/video`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response.data.status == "success") {
        queryClient.invalidateQueries({ queryKey: ["videos"] });
      }
    } catch (error) {
      console.log(error);
    } finally {
      removeFile();
    }
  };

  const removeFile = () => {
    fileDescriptionRef.current.value = "";
    setfile("");
  };

  return (
    <>
      <div className="flex items-center justify-center width-full flex-1">
        <div className="mx-auto w-full max-w-[550px] bg-white">
          <form className=" px-9 mx-auto" onSubmit={uploadFile}>
            <div className="mb-6">
              <label className="mb-5 block mx-auto text-4xl font-semibold text-[#07074D] text-center">
                Upload File
              </label>

              <div className="mb-8">
                <input
                  type="file"
                  name="file"
                  id="file"
                  max={1}
                  className="sr-only"
                  onClick={(event) => {
                    event.target.value = null;
                  }}
                  onChange={(e) => onSelectFile(e.target.files[0])}
                  accept="video/*"
                />
                <label
                  htmlFor="file"
                  className="cursor-pointer relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                >
                  <div>
                    <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                      Drop files here
                    </span>
                    <span className="mb-2 block text-base font-medium text-[#6B7280]">
                      Or
                    </span>
                    <span className=" inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                      Browse
                    </span>
                  </div>
                </label>
              </div>
              {/* <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Video file name
              </label>
              <input
                ref={fileNameRef}
                type="text"
                name="description"
                id="email"
                placeholder="Enter file description here"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div> */}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Video file description
                </label>
                <input
                  ref={fileDescriptionRef}
                  type="text"
                  name="description"
                  id="email"
                  placeholder="Enter file description here"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              {file && (
                <div className="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
                  <div className="flex items-center justify-between">
                    <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                      {file.name}
                    </span>
                    <button className="text-[#07074D]" onClick={removeFile}>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Upload File
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddVideoComponent;
