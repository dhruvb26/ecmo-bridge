"use client";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import CountUp from "react-countup";

const MatchList = () => {
  const query = api.match.runMatch.useQuery();
  const matches = query.data;
  const [isComplete, setIsComplete] = useState(false); // State to track if counting should stop

  // Reset count up completion state on new loading
  useEffect(() => {
    if (query.isLoading) {
      setIsComplete(false);
    }
  }, [query.isLoading]);

  if (query.isLoading && !isComplete) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <CountUp
          start={0}
          end={100}
          duration={4.5}
          onEnd={() => {
            setIsComplete(true); // Set completion when count up finishes
          }}
        >
          {({ countUpRef }) => (
            <div>
              <span
                className="text-3xl font-semibold text-primary-purple-900"
                ref={countUpRef}
              />
            </div>
          )}
        </CountUp>
      </div>
    );
  }

  if (query.error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
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
