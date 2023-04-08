import dayjs from "dayjs";
import { api } from "~/utils/api";

import type { RouterOutputs } from "~/utils/api";
import Image from "next/image";
import { LoadingPage } from "~/components/Loading";

import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

export const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <Link href={`/@${author.username}`}>
      <div className="px-6">
        <div className="rounded-xl bg-gray-800 p-4">
          <div
            className="
      cursor-pointer 
      p-5 
      transition 
      hover:opacity-80
    "
          >
            <div className="flex flex-row items-start gap-3">
              <Image
                src={author.profileImageUrl}
                alt="Profile Image"
                className="h-14 w-14 rounded-full"
                width={56}
                height={56}
              />
              <div>
                <div className="flex flex-row items-center gap-2">
                  <p
                    className="
              cursor-pointer 
              font-semibold 
              text-white 
              hover:underline
          "
                  >
                    @{author.username}
                  </p>
                  <span
                    className="
              hidden
              cursor-pointer
              text-neutral-500
              hover:underline
              md:block
          "
                  >
                    {/* @{author.username} */}
                  </span>
                  <span className="text-sm text-neutral-500">{`${dayjs(
                    post.createdAt
                  ).fromNow()}`}</span>
                </div>
                <div className="text-white">{post.content}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <LoadingPage />;

  if (!data) return <div>something went wrong</div>;

  return (
    <div className="flex flex-col gap-2">
      {data.map((fullPost) => (
        <PostView key={fullPost.post.id} {...fullPost} />
      ))}
    </div>
  );
};
