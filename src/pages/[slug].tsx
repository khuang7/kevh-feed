import { useUser } from "@clerk/nextjs";
import { type GetStaticProps, type InferGetServerSidePropsType } from "next";

import type { NextPage } from "next";

import Head from "next/head";
import { api } from "~/utils/api";
import Image from "next/image";

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  const { data } = api.profile.getUserByUserName.useQuery({
    username,
  });

  if (!data) return <div> no data</div>;

  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>
      <PageLayout>
        <div className="relative h-36 bg-slate-600">
          <Image
            src={data.profileImageUrl}
            alt={`test`}
            width={128}
            height={128}
            className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-black bg-black"
          />
        </div>
        <div className="h-[64px]"></div>
        <div className="p-4 text-2xl font-bold">{`@${
          data.username || "??"
        }`}</div>
        <div className="w-full border-b border-slate-400" />
        {/* <ProfileFeed userId={data.id} /> */}
      </PageLayout>
    </>
  );
};

import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { prisma } from "~/server/db";
import { appRouter } from "~/server/api/root";
import superjson from "superjson";
import { PageLayout } from "~/components/layout";

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson, // optional - adds superjson serialization
  });

  const slug = context.params?.slug;
  if (typeof slug !== "string") throw new Error("no slug");

  const username = slug.replace("@", "");

  // fetch data ahead of time and rehyrdate it for server side props.
  await ssg.profile.getUserByUserName.prefetch({ username });

  return {
    props: {
      // takes all thiungs we fetch and puts its in a shape that can be used by react-query
      //
      trpcState: ssg.dehydrate(),
      username,
    },
  };
};

// reason for getstaticpaths
// we need to know what pages to generate at build time

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default ProfilePage;
