import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { api } from "~/trpc/server";

export async function RecentPatients() {
  // Fetch data from the server
  const patientsAll = await api.patient.get();
  const patients = patientsAll.slice(0, 5);

  return (
    <Card className="h-fit xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Patients</CardTitle>
          <CardDescription>Recent patients from your hospital.</CardDescription>
        </div>
        <Button
          asChild
          size="sm"
          className="ml-auto gap-1 bg-primary-purple-900"
        >
          <Link href="/bridge/patients-and-ecmos">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead className="xl:table-column">Type</TableHead>
              <TableHead className="xl:table-column">Special Care</TableHead>
              <TableHead className="xl:table-column">Age</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => {
              return (
                <TableRow>
                  <TableCell>
                    <div className="font-medium">{patient.name}</div>
                  </TableCell>
                  <TableCell className=" xl:table-column">
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {patient.ecmoType
                        .toString()
                        .toLowerCase()
                        .replace(/_/g, " ")
                        .split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(" ")}
                    </div>
                  </TableCell>
                  <TableCell className=" xl:table-column">
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {patient.specialCare
                        .toString()
                        .toLowerCase()
                        .replace(/_/g, " ")
                        .split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(" ")}
                    </div>
                  </TableCell>
                  <TableCell className="text-left">{patient.age}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
