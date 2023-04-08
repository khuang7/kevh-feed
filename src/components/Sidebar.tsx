import { useClerk, useUser } from "@clerk/nextjs";
import SidebarItem, { type SidebarItemProps } from "./SidebarItem";
import {
  ArrowLeftOnRectangleIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";

const Sidebar = () => {
  const { user, isSignedIn } = useUser();
  const { signOut, openSignIn } = useClerk();

  const userObject = {
    icon: <UserIcon className="h-7 w-7" />,
    label: "Profile",
    auth: true,
    href: user ? `/${user.username ? `@${user.username}` : ""}` : undefined,
  };

  const items: SidebarItemProps[] = [
    {
      icon: <HomeIcon className="h-7 w-7" />,
      label: "Home",
      href: "/",
    },
    ...(user ? [userObject] : []),
  ];

  const signedInContent = (
    <div className="space-y-2 lg:w-[230px]">
      {items.map((item) => (
        <SidebarItem
          key={item.href}
          auth={item.auth}
          href={item.href}
          icon={item.icon}
          label={item.label}
        />
      ))}
      {user && (
        <SidebarItem
          onClick={() => {
            signOut()
              .then((res) => {
                toast.success("Logged out successfully!");
              })
              .catch((err) => {
                toast.error(`Something went wrong when logging out`);
              });
          }}
          icon={<ArrowLeftOnRectangleIcon className="h-7 w-7" />}
          label="Logout"
        />
      )}
    </div>
  );

  const signOutContent = (
    <div className="text-md flex flex-col justify-center gap-4 text-center">
      <span>Sign in and feel free to leave a (nice) message for me 🤩</span>
      <div>
        {" "}
        <button
          type="button"
          className="rounded-md bg-green-500 px-3.5 py-2.5 text-lg font-semibold  text-white shadow-sm hover:bg-opacity-80"
          onClick={() => openSignIn({})}
        >
          Sign In
        </button>
      </div>
    </div>
  );

  return (
    <div className="px-2 py-4">
      <div className="rounded-xl bg-gray-800 p-4">
        {isSignedIn ? signedInContent : signOutContent}
      </div>
    </div>
  );
};

export default Sidebar;
