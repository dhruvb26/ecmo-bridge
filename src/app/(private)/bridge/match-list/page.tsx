"use client";
import { api } from "~/trpc/react";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import BarLoader from "react-spinners/BarLoader";

const MatchList = () => {
  const query = api.match.runMatch.useQuery();
  const matches = query.data;

  if (query.isLoading) {
    return (
      <div className="flex min-h-screen flex-row items-center justify-center text-center">
        <BarLoader color="#2563EB" />
      </div>
    );
  }

  if (query.error) {
    return (
      <div className="flex min-h-screen flex-row items-center justify-center text-center">
        {query.error.message}
      </div>
    );
  }

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
        <TableBody>
          {matches?.map((match: any) => (
            <TableRow key={match.id}>
              <TableCell>{match.patientName}</TableCell>
              <TableCell>
                {match.ecmoId === null
                  ? "No ECMO found for this patient"
                  : match.ecmoType}
              </TableCell>
              <TableCell className="text-right">
                {match.location === null &&
                match.distance === null &&
                match.duration === null ? (
                  "Match not found"
                ) : (
                  <>
                    {match.location}
                    <br />
                    Distance:{" "}
                    {match.distance ? `${match.distance} miles` : "N/A"}
                    <br />
                    Duration:{" "}
                    {match.duration ? `${match.duration} minutes` : "N/A"}
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MatchList;
