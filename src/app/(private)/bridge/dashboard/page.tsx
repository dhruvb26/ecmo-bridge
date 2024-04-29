"use client";
import React from "react";
import { RiRecordCircleFill } from "@remixicon/react";

import { Badge, BadgeDelta } from "@tremor/react";

const DashboardPage = () => {
  return (
    <div>
      DashboardPage
      <div className="mx-auto space-y-12">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Badge>Updated</Badge>
          <Badge icon={RiRecordCircleFill}>live</Badge>
          <BadgeDelta deltaType="increase" isIncreasePositive={true} />
          <BadgeDelta deltaType="increase" isIncreasePositive={true}>
            increase
          </BadgeDelta>
          <BadgeDelta deltaType="moderateDecrease" isIncreasePositive={true}>
            21.2%
          </BadgeDelta>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
