import React from "react";
import { ProfileForm } from "../_components/profile-form";
import { api } from "~/trpc/server";
const SettingsPage = () => {
  const query = api.hospital.get();
  return (
    <div>
      <ProfileForm />
    </div>
  );
};

export default SettingsPage;
