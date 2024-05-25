import PusherServer from "pusher";

export const pusher = new PusherServer({
  appId: process.env.PUSHER_APP_ID || "",
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY || "",
  secret: process.env.PUSHER_APP_SECRET || "",
  cluster: process.env.PUSHER_APP_CLUSTER || "",
  useTLS: true,
});

export async function runMatchingAlgorithm() {
  // Trigger an event after or before running the algorithm
  pusher.trigger("matching-channel", "run-matching", {
    message: "Triggering the matching algorithm",
  });
}
