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
