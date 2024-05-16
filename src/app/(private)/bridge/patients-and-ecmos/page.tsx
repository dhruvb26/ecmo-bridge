import React from "react";
import { ECMOForm } from "../_components/ecmo-form";
import { api } from "~/trpc/server";
import { ECMO, ECMOColumns } from "./columns";
import { ECMODataTable } from "./data-table";
import { Patient, PatientColumns } from "../patients/columns";
import { PatientDataTable } from "../patients/data-table";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const MachinesPage = async () => {
  try {
    const ecmos = await api.ecmo.get();
    const patients = await api.patient.get();
    return (
      <div className="flex flex-col justify-center space-y-2 p-4 md:p-10">
        <div className="p-2 lg:flex-row lg:space-x-2 lg:space-y-0">
          <PatientDataTable data={patients} columns={PatientColumns} />
          <ECMODataTable data={ecmos} columns={ECMOColumns} />
        </div>
      </div>
    );
  } catch (e) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
        <h1>You cannot access this yet.</h1>
        <Button asChild size="sm" className="gap-1 bg-primary-purple-900">
          <Link href="/bridge/settings">
            Settings
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }
};

export default MachinesPage;
