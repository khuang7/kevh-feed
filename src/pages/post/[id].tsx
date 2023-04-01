import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import dayjs from "dayjs";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
import Image from "next/image";

const SinglePostPage: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // start fetching asap
  api.posts.getAll.useQuery();
  // TRPC lets you create server functions that run on a server (eg. vercel).
  // Then we can get the data.
  // Never want user to directly connect to a db.
  if (!userLoaded) return <div />;

  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <main className="flex h-screen justify-center">
        <div> post page</div>
      </main>
    </>
  );
};

export default SinglePostPage;
