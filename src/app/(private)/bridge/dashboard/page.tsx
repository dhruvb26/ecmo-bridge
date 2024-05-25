import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  UserCheck,
  UsersRound,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { RecentPatients } from "../_components/recent-patients-card";
import { api } from "~/trpc/server";
import { MatchedPatients } from "../_components/matched-patient-card";
import { PatientChart } from "../_components/charts";

const Dashboard = async () => {
  try {
    const patientCount = (await api.patient.get()).length;
    const totalPatientCount = (await api.patient.getAll()).length;
    const ecmoCount = (await api.ecmo.get()).length;
    const matchCount = await api.match.fetchMatchCount();
    return (
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4  p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Patients
                </CardTitle>
                <UsersRound className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="px-6">
                <div className="text-2xl font-bold">{totalPatientCount}</div>
                <p className="text-xs text-muted-foreground">
                  total patients currently need an ECMO
                </p>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Your Patients
                </CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="px-6">
                <div className="text-2xl font-bold">{patientCount}</div>
                <p className="text-xs text-muted-foreground">
                  patients from your hospital
                </p>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  ECMO Machines
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="px-6">
                <div className="text-2xl font-bold">{ecmoCount}</div>
                <p className="text-xs text-muted-foreground">
                  are machines from your hospital
                </p>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Actively Matched Patietns
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="px-6">
                <div className="text-2xl font-bold">{matchCount}</div>
                <p className="text-xs text-muted-foreground">total matches</p>
              </CardContent>
            </Card>
          </div>
          <div>
            <PatientChart />
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <RecentPatients />
            <MatchedPatients />
          </div>
        </main>
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
export default Dashboard;
