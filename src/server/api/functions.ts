import { auth } from "@clerk/nextjs/server";
import { Client } from "@googlemaps/google-maps-services-js";

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

const client = new Client({});
export const calculateDistance = async (origin: any, destination: any) => {
  const response = await client.distancematrix({
    params: {
      origins: [origin],
      destinations: [destination],
      key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    },
  });

  if (!response.data?.rows[0]?.elements[0]) {
    throw new Error("No distance found");
  }

  const distanceString = response.data.rows[0].elements[0].distance.text;
  const durationString = response.data.rows[0].elements[0].duration.text;

  const distance = parseFloat(distanceString.replace(/[^\d.]/g, ""));
  const duration = parseFloat(durationString.replace(/[^\d.]/g, ""));

  const geocodeResponse = await client.reverseGeocode({
    params: {
      latlng: [destination.lat, destination.lng],
      key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    },
  });

  if (!geocodeResponse.data?.results[0]) {
    throw new Error("No location found");
  }
  const location = geocodeResponse.data.results[0].formatted_address;

  return { distance, duration, location };
};
