import React, { useEffect, useState } from "react";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";

const libraries: Libraries = ["places", "geocoding"];
const DistanceComponent = ({ patientCoordinates, ecmoCoordinates }: any) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (isLoaded) {
      calculateDistance();
    }
  }, [isLoaded]);

  const calculateDistance = () => {
    const origin = new window.google.maps.LatLng(
      patientCoordinates.lat,
      patientCoordinates.lng,
    );
    const destination = new window.google.maps.LatLng(
      ecmoCoordinates.lat,
      ecmoCoordinates.lng,
    );

    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (!response?.rows[0]?.elements[0])
          return console.error("No response from distance matrix");

        if (status === "OK" && response) {
          const resultDistance = response.rows[0].elements[0].distance.text;
          const resultDuration = response.rows[0].elements[0].duration.text;
          setDistance(resultDistance);
          setDuration(resultDuration);
        } else {
          console.error("Distance matrix result error");
        }
      },
    );
  };
  return (
    <div>
      <h1>Distance</h1>
      <p>Distance: {distance}</p>
      <p>Duration: {duration}</p>
    </div>
  );
};
export default DistanceComponent;
