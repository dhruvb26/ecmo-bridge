"use client";
import { api } from "~/trpc/react";
import DistanceComponent from "./distance-component";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

const MatchList = () => {
  const ecmoQuery = api.ecmo.getAll.useQuery();
  const patientQuery = api.patient.get.useQuery();

  const ecmos = ecmoQuery.data;
  const patients = patientQuery.data;

  const matches: any = {};

  patients?.forEach((patient) => {
    let matchFound = false;

    if (ecmos) {
      for (let ecmo of ecmos) {
        if (
          ecmo.type === patient.ecmoType &&
          !ecmo.inUse &&
          !ecmo.isMatched &&
          !matchFound
        ) {
          matchFound = true;
          if (!matches[patient.id]) {
            matches[patient.id] = [];
          }
          matches[patient.id].push(ecmo);
          ecmo.isMatched = true; // Prevent this ECMO from being matched again
        }
      }
    }
    if (!matchFound) {
      matches[patient.id] = []; // Assign an empty array if no match found
    }
  });

  return (
    <div className="p-10">
      <Table>
        <TableCaption>
          A list of matched ECMO machines to patients.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Patient Name</TableHead>
            <TableHead className="w-1/3">ECMO Type</TableHead>
            <TableHead className="w-1/3 text-right">Machine Info</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody></TableBody>
      </Table>
    </div>
  );
};

export default MatchList;
