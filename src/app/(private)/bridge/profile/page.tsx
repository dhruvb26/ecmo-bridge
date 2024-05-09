import React from "react";
import { ProfileForm } from "../_components/profile-form";
import { api } from "~/trpc/server";

const ProfilePage = async () => {
  const getHospitalInfo = await api.hospital.get();
  const name = getHospitalInfo?.name;
  const location = getHospitalInfo?.location;
  return (
    <div className=" items-center justify-center space-y-2 p-4">
      {name && location ? (
        <div className="">
          <p>{name}</p>
          <p>{location}</p>
          <ProfileForm />
        </div>
      ) : (
        <ProfileForm />
      )}
    </div>
  );
};

export default ProfilePage;
