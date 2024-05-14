import { auth } from "@clerk/nextjs/server";
export function checkAuth() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return userId;
}
export const getCurrentDateTime = () => {
  const now = new Date();
  const date = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${date} at ${time}`;
};
