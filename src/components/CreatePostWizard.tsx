import { useUser } from "@clerk/nextjs";

import { api } from "~/utils/api";
import Image from "next/image";
import { LoadingSpinner } from "~/components/Loading";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const CreatePostWizard = () => {
  const { user } = useUser();
  const ctx = api.useContext();
  const [input, setInput] = useState("");

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate();
    },

    onError: (err) => {
      const errorMessage = err.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("something went wrong");
      }
    },
  });

  if (!user) return null;

  return (
    <div className="px-6 py-4 ">
      <div className="rounded-xl bg-gray-800 p-4">
        <Image
          src={user.profileImageUrl}
          alt="Profile Image"
          className="h-14 w-14 rounded-full"
          width={56}
          height={56}
        />
        <textarea
          placeholder="Type something here"
          className="grow resize-none bg-transparent pt-2 text-lg text-white outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isPosting}
          maxLength={108}
        />
      </div>
      {input !== "" && !isPosting && (
        <div className="ml-auto place-self-center self-center p-2">
          <button
            onClick={() => {
              mutate({
                content: input,
              });
            }}
            disabled={isPosting}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (input !== "") {
                  mutate({
                    content: input,
                  });
                }
              }
            }}
            className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Post
          </button>
        </div>
      )}
      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  );
};
