import { type GetStaticProps } from "next";

import type { NextPage } from "next";

import Head from "next/head";
import { api } from "~/utils/api";
import Image from "next/image";
import { generateSSGHelper } from "~/server/api/ssgHelper";
import { PageLayout } from "~/components/layout";
import { PostView } from "~/components/postview";
import { LoadingPage } from "~/components/Loading";
import { Layout3 } from "~/components/Layout3";

const ProfileFeed = (props: { userId: string }) => {
  const { data, isLoading } = api.posts.getPostsByUserId.useQuery({
    userId: props.userId,
  });

  if (isLoading) return <LoadingPage />;

  if (!data || data.length === 0) return <div>no posts</div>;

  return (
    <div className="flex flex-col">
      {data.map((fullPost) => {
        return <PostView {...fullPost} key={fullPost.post.id} />;
      })}
      ;
    </div>
  );
};

const SinglePostPage: NextPage<{ id: string }> = ({ id }) => {
  const { data } = api.posts.getById.useQuery({
    id,
  });

  if (!data) return <div> no data</div>;

  return (
    <>
      <Head>
        <title>{`${data.post.content} - ${data.author.username}`}</title>
      </Head>
      <Layout3>
        <PostView {...data} />
      </Layout3>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no id");

  // fetch data ahead of time and rehyrdate it for server side props.
  await ssg.posts.getById.prefetch({ id });

  return {
    props: {
      // takes all thiungs we fetch and puts its in a shape that can be used by react-query
      //
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

// reason for getstaticpaths
// we need to know what pages to generate at build time

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default SinglePostPage;
