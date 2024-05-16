"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import {
  DefaultDialogTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { Input } from "~/components/ui/input";

export type Patient = {
  id: number;
  name: string;
  age: number;
  specialCare: string;
  ecmoType: string;
};
import { useCallback } from "react";
import { CardContent } from "~/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { set } from "date-fns";
import { toast } from "sonner";
import { getCurrentDateTime } from "~/server/api/functions";

const editPatientSchema = z.object({
  name: z.string().min(1, { message: "Minimum 1 character required" }).max(30),
  age: z.number().min(1).max(100),
});

export const PatientColumns: ColumnDef<Patient>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return <div className="text-center font-medium">{value}</div>;
    },
  },
  {
    accessorKey: "age",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Age
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return <div className="text-center font-medium">{value}</div>;
    },
  },
  {
    accessorKey: "specialCare",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Special Care
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const value = getValue() as string;
      const formattedValue = value
        .toString()
        .toLowerCase()
        .replace(/_/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      return <div className="text-center font-medium">{formattedValue}</div>;
    },
  },
  {
    accessorKey: "ecmoType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const value = getValue() as string;
      const formattedValue = value.startsWith("E")
        ? value.toUpperCase()
        : value
            .toLowerCase()
            .replace(/_/g, " ")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

      return <div className="text-center font-medium">{formattedValue}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter();
      const edit = api.patient.edit.useMutation({
        onSuccess: () => {
          // console.log("edited successfully.");
          toast.success("Patient edited successfully", {
            description: `Patient was edited on ${getCurrentDateTime()}`,
          });
          router.refresh();
        },
        onError: (error) => {
          // console.error("error", error);
          toast.error(error.message);
        },
      });
      const SpecialCareCategory = z.enum(
        [
          "PEDIATRIC",
          "FIRST_RESPONDERS",
          "SINGLE_CARETAKERS",
          "PREGNANT_PATIENTS",
          "SHORT_TERM_SURVIVAL",
        ],
        {
          errorMap: (issue, ctx) => ({ message: "Invalid category" }),
        },
      );
      const ECMOType = z.enum(["PULMONARY", "CARDIAC", "ECPR"], {
        errorMap: (issue, ctx) => ({ message: "Inavlid ECMO type" }),
      });
      const [name, setName] = useState(row.original.name || "John Doe");
      const [age, setAge] = useState(row.original.age || 45);
      const [specialCare, setSpecialCare] = useState(
        SpecialCareCategory.parse(row.original.specialCare),
      );
      const [ecmoType, setEcmoType] = useState(
        ECMOType.parse(row.original.ecmoType),
      );

      const query = api.patient.delete.useMutation({
        onSuccess: () => {
          // console.log("deleted successfully.");
          toast.success("Patient deleted successfully", {
            description: `Patient was deleted on ${getCurrentDateTime()}`,
          });
          router.refresh();
        },
        onError: (error) => {
          // console.log("error", error);
          toast.error(error.message);
        },
      });
      const handleDelete = useCallback(
        async (id: number) => {
          router.refresh();
          await query.mutateAsync({ id });
        },
        [query],
      );

      const ecmoTypes = [
        { value: "PULMONARY", label: "Pulmonary" },
        { value: "CARDIAC", label: "Cardiac" },
        { value: "ECPR", label: "ECPR" },
      ];

      const specialCareTypes = [
        { value: "PEDIATRIC", label: "Pediatric" },
        { value: "FIRST_RESPONDERS", label: "First Responders" },
        { value: "SINGLE_CARETAKERS", label: "Single-caretaker" },
        { value: "PREGNANT_PATIENTS", label: "Pregnant Patients" },
        { value: "SHORT_TERM_SURVIVAL", label: "Short-term Survival" },
      ];
      const handleEdit = () => {
        edit.mutate({ name, specialCare, ecmoType, age, id: row.original.id });
      };

      const patient = row.original;

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(patient.id.toString())
                }
              >
                Copy patient ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDelete(patient.id)}>
                Delete Patient
              </DropdownMenuItem>

              <DropdownMenuItem>
                <DefaultDialogTrigger>Edit Patient</DefaultDialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="p-10">
            <Label>Name</Label>
            <Input
              id="name"
              defaultValue={row.original.name}
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
            ></Input>
            <Label>Age</Label>
            <Input
              id="age"
              type="number"
              defaultValue={row.original.age}
              onChange={(e) => setAge(Number(e.target.value))}
            ></Input>
            <Label>Special Care</Label>
            <Select
              onValueChange={(value) =>
                setSpecialCare(SpecialCareCategory.parse(value))
              }
              defaultValue={row.original.specialCare}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a Special Care type" />
              </SelectTrigger>

              <SelectContent>
                {specialCareTypes.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label>ECMO Type</Label>
            <Select
              onValueChange={(value) => setEcmoType(ECMOType.parse(value))}
              defaultValue={row.original.ecmoType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a ECMO type" />
              </SelectTrigger>

              <SelectContent>
                {ecmoTypes.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <DialogFooter>
              <Button type="submit" onClick={() => handleEdit()}>
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
