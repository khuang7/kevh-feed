import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const router = useRouter();

  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <div
      className={`
        ${hasBorder ? "border-4 border-black" : ""}
        ${isLarge ? "h-32" : "h-12"}
        ${isLarge ? "w-32" : "w-12"}
        relative 
        cursor-pointer 
        rounded-full 
        transition
        hover:opacity-90
      `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        onClick={() => {
          console.log("hi");
        }}
        src={user.profileImageUrl}
      />
    </div>
  );
};

export default Avatar;
