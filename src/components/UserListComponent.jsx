import React, { useState } from "react";
import { getAllUsers, updateUser } from "../services/AuthService.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function UserListComponent() {
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    initialData: {
      users: [],
    },
  });
  const mutation = useMutation({
    mutationFn: ({ id, candownload }) => updateUser(id, candownload),
    onSuccess: ({ users }) => {
      queryClient.setQueryData(["users"], (oldData) => {
        console.log("oldData", oldData);
        const newUsers = oldData.users.map((item) =>
          item.id == users.id ? users : item
        );
        return { users: newUsers };
      });
    },
  });

  const chnageDownloadType = (id, canDownload) => {
    mutation.mutate({
      id,
      candownload: canDownload,
    });
    if (isLoading) {
      return <div className="flex text-lg">Loading</div>;
    }
  };
  console.log(data);
  return (
    <>
      <div className="flex h-full w-full flex-col">
        <label className="mb-5 block mx-auto text-4xl font-semibold text-[#07074D]">
          User List
        </label>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className=" inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center">
                <thead className="border-b bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Can Download
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.users.length > 0 ? (
                    data?.users?.map((user, index) => (
                      <tr className="bg-white border-b" key={index}>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {user.name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {user.email}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex justify-center ">
                            <label className="inline-flex relative items-center mr-5 cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={user.can_download}
                                readOnly
                              />
                              <div
                                onClick={() =>
                                  chnageDownloadType(user.id, !user.can_download)
                                }
                                className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                              ></div>
                              <span className="ml-2 text-sm font-medium text-gray-900">
                                ON
                              </span>
                            </label>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div className=" absolute left-0 right-0 text-lg text-center w-full mx-auto">
                      No users found
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserListComponent;
