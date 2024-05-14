import React from "react";
import { ECMOForm } from "../_components/ecmo-form";
import { api } from "~/trpc/server";
import { ECMO, columns } from "./columns";
import { DataTable } from "./data-table";
const MachinesPage = async () => {
  const ecmoCount = await api.ecmo.getCount();
  const count = ecmoCount[0]?.count;
  const ecmos = await api.ecmo.get();
  return (
    <div className="flex flex-col justify-center space-y-2 p-4 md:p-10">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">ECMO</h1>
        <p className="text-base md:text-lg">
          You have <span className="font-bold">{count}</span> machines.
        </p>
      </div>
      <div className=" w-[80%] p-2 lg:flex-row lg:space-x-2 lg:space-y-0">
        <DataTable data={ecmos} columns={columns} />
      </div>
    </div>
  );
};

export default MachinesPage;
