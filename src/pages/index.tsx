import { SignInButton, useClerk, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import { api } from "~/utils/api";
import Image from "next/image";
import { LoadingSpinner } from "~/components/Loading";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Feed } from "~/components/postview";
import { Layout3 } from "~/components/Layout3";
import { CreatePostWizard } from "~/components/CreatePostWizard";

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  // start fetching asap
  api.posts.getAll.useQuery();
  // TRPC lets you create server functions that run on a server (eg. vercel).
  // Then we can get the data.
  // Never want user to directly connect to a db.
  if (!userLoaded) return <div />;

  return (
    <Layout3>
      <div className=" ">
        {!isSignedIn && (
          <div className="flex flex-col justify-center gap-4 p-8 text-center text-lg">
            <span>👈 Sign in to add a post. Let out any opinions you have</span>
          </div>
        )}
        {isSignedIn && <CreatePostWizard />}
      </div>
      <Feed />
    </Layout3>
  );
};

export default Home;
