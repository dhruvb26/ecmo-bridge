import React from "react";
import { api } from "~/trpc/server";
import { PatientForm } from "../_components/patient-form";
import { DataTable } from "./data-table";

import { columns } from "./columns";

const PatientsPage = async () => {
  const patientCount = await api.patient.getCount();
  const count = patientCount[0]?.count;

  const patients = await api.patient.get();

  return (
    <>
      <div className="flex flex-col justify-center space-y-2 p-4 md:p-10">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Patients</h1>
          <p className="text-base md:text-lg">
            You have <span className="font-bold">{count}</span> patients.
          </p>
        </div>
        <div className="w-[80%] p-2 lg:flex-row lg:space-x-2 lg:space-y-0">
          <DataTable data={patients} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default PatientsPage;
