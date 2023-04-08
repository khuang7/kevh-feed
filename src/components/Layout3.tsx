import { type PropsWithChildren } from "react";
import Sidebar from "./Sidebar";
import { FollowBar } from "./FollowBar";

//https://dribbble.com/shots/17000563-Twitter-Homepage-Concept

export const Layout3 = (props: PropsWithChildren) => {
  return (
    <div className="h-screen bg-gray-900">
      <div className="xl:px-30 container mx-auto h-full max-w-6xl">
        <div className="grid h-full grid-cols-4">
          <Sidebar />
          <div
            className="
          col-span-3 
          lg:col-span-2
      "
          >
            {props.children}
          </div>
          <FollowBar />
        </div>
      </div>
    </div>
  );
};
