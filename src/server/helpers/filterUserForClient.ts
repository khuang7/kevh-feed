import clerkClient, { type User } from "@clerk/clerk-sdk-node";
// Public procedure means that the user does not need to be authenticated to use this procedure.
export const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
  };
};
