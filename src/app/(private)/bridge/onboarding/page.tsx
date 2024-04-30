"use client";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  RiArrowRightLine,
  RiArrowRightDownFill,
  RiArrowRightDoubleLine,
  RiArrowRightSLine,
  RiProfileFill,
  RiUser3Fill,
} from "@remixicon/react";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";
const OnboardingPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-2 p-10">
      <h1 className="text-3xl font-bold">Getting started</h1>
      <p className="text-md font-light text-gray-500">2 of 4 completed</p>
      <div className="card-div space-y-4 p-4">
        <Card className="flex flex-row items-center space-x-4">
          <CardHeader className="w-[80%]">
            <CardTitle>Set up your profile</CardTitle>
            <CardDescription>Add your hospital's location.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant={"ghost"}>
              Start
              <RiArrowRightSLine />
            </Button>
          </CardContent>
        </Card>
        <Card className="flex flex-row items-center">
          <CardHeader className="w-[80%]">
            <CardTitle>Add patients</CardTitle>
            <CardDescription>
              Start adding patients in need now.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant={"ghost"}>
              Start
              <RiArrowRightSLine />
            </Button>
          </CardContent>
        </Card>
        <Card className="flex flex-row items-center">
          <CardHeader className="w-[80%]">
            <CardTitle>Have ECMOS?</CardTitle>
            <CardDescription>
              Register your ECMO machine with us.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant={"ghost"}>
              Start
              <RiArrowRightSLine />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingPage;
