import React from "react";
import { ProfileForm } from "../_components/profile-form";
import { api } from "~/trpc/server";
import Link from "next/link";
import { Callout } from "@tremor/react";
import { AlertCircleIcon } from "lucide-react";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { Badge } from "@tremor/react";
const SettingsPage = async () => {
  const hospital = await api.hospital.get();

  if (!hospital) {
    return (
      <div className="flex w-[80%] flex-col items-start space-y-10 p-10">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-600">Manage your hospital settings</p>
        </div>
        <div className="w-[60%] space-y-6">
          <Callout icon={AlertCircleIcon} title="Heads up!" color="red">
            For security and ethical reasons, you will only be able to set your
            hospital's name and location once.{" "}
            <Link href="/about" className=" hover:underline">
              Learn more &gt;
            </Link>
          </Callout>
          <ProfileForm />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex w-[80%] flex-col items-start space-y-10 p-10">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-600">Manage your hospital settings</p>
        </div>
        <div className="w-[60%] space-y-6">
          <div className="flex flex-row space-x-4">
            <h1 className="text-xl font-bold">{hospital.name}</h1>
            <Badge className="h-fit text-sm font-normal" color={"green"}>
              Verified
            </Badge>
          </div>
          <h2 className="text-lg">{hospital.location}</h2>
          <Callout
            icon={QuestionMarkCircledIcon}
            title="Need to Update Your Information?"
            color="purple"
          >
            If you need to update your hospital's information or have any
            questions, please reach out to us.{" "}
            <Link href="/contact" className="hover:underline">
              Contact us &gt;
            </Link>
          </Callout>
        </div>
      </div>
    );
  }
};

export default SettingsPage;
