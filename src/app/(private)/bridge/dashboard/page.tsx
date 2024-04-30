"use client";
import React from "react";
import { Badge, BadgeDelta } from "@tremor/react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import {
  RiVerifiedBadgeFill,
  RiErrorWarningFill,
  RiTimeFill,
} from "@remixicon/react";
const DashboardPage = () => {
  return (
    <div className="flex flex-col items-start justify-center space-y-2 p-10">
      <h1 className="text-3xl font-bold">
        Dashboard{" "}
        <Badge
          className="font-normal"
          icon={RiVerifiedBadgeFill}
          color={"green"}
        >
          Verified
        </Badge>
        <Badge className="font-normal" icon={RiTimeFill} color={"red"}>
          Not verified
        </Badge>
      </h1>
    </div>
  );
};

export default DashboardPage;
