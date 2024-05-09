import React from "react";
import { Badge } from "@tremor/react";
import { api } from "~/trpc/server";
import { CheckIcon } from "@radix-ui/react-icons";
const DashboardPage = async () => {
  const hospital = await api.hospital.get();
  const verified = hospital?.isVerified;
  return (
    <div className="flex flex-col items-start justify-center space-y-2 p-10">
      <h1 className="text-3xl font-bold">
        Dashboard{" "}
        {verified ? (
          <Badge className="font-normal" color={"green"}>
            Verified
          </Badge>
        ) : (
          <Badge className="font-normal" color={"red"}>
            Not verified
          </Badge>
        )}
      </h1>
    </div>
  );
};

export default DashboardPage;
