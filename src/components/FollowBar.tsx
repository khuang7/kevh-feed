import React from "react";
import { api } from "~/utils/api";
import { LoadingSpinner } from "./Loading";
import Image from "next/image";

export const FollowBar: React.FC = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <LoadingSpinner />;

  if (!data) return <div>something went wrong</div>;

  const postsData = data;

  const allUsers = postsData.map((post) => {
    return {
      id: post.author.id,
      username: post.author.username,
      profilePicLink: post.author.profileImageUrl,
    };
  });

  console.log(allUsers);

  // dedeup
  const filteredUsers = allUsers.filter((value, index, self) => {
    const test = self.findIndex((t) => t.username === value.username);
    console.log(test === index);
    return test === index;
  });

  console.log(filteredUsers);

  return (
    <div className="hidden px-2 py-4 lg:block">
      <div className="rounded-xl bg-gray-800 p-4">
        <h2 className="text-xl font-semibold text-white">The Crew</h2>
        <div className="mt-4 flex flex-col gap-6">
          {filteredUsers.map((user) => (
            <div key={user.id} className="flex flex-row items-center gap-4">
              <Image
                src={user.profilePicLink}
                alt={user.username}
                className="h-10 w-10 rounded-full"
                width={36}
                height={36}
              />
              <div className="flex flex-col">
                <p className="text-md text-neutral-400">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
