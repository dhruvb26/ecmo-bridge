"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { z } from "zod";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { useCallback } from "react";
import { Switch } from "~/components/ui/switch";
import {
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
import { useState } from "react";
import { Label } from "~/components/ui/label";

export type ECMO = {
  id: number;
  model: string;
  serial: string;
  type: string;
  inUse: boolean;
};

export const columns: ColumnDef<ECMO>[] = [
  {
    accessorKey: "model",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Model
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
    accessorKey: "serial",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Serial
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
    accessorKey: "type",
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
    accessorKey: "inUse",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const value = getValue() as boolean;
      if (value) {
        return (
          <div className="text-center font-medium text-red-500">In use</div>
        );
      }
      return (
        <div className="text-center font-medium text-green-500">Vacant</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter();
      const edit = api.ecmo.edit.useMutation({
        onSuccess: () => {
          console.log("edited successfully.");
          router.refresh();
        },
      });
      const ECMOType = z.enum(["PULMONARY", "CARDIAC", "ECPR"], {
        errorMap: (issue, ctx) => ({ message: "Inavlid ECMO type" }),
      });
      const ecmoTypes = [
        { value: "PULMONARY", label: "Pulmonary" },
        { value: "CARDIAC", label: "Cardiac" },
        { value: "ECPR", label: "ECPR" },
      ];

      const query = api.ecmo.delete.useMutation();
      const handleDelete = useCallback(
        async (id: number) => {
          router.refresh();
          await query.mutateAsync({ id });
        },
        [query],
      );
      const ecmo = row.original;
      const [model, setModel] = useState(ecmo.model);
      const [serial, setSerial] = useState(ecmo.serial);
      const [type, setType] = useState(ECMOType.parse(ecmo.type));
      const [inUse, setInUse] = useState(ecmo.inUse);
      const handleEdit = () => {
        edit.mutate({ model, inUse, serial, type, id: row.original.id });
      };
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
                  navigator.clipboard.writeText(ecmo.id.toString())
                }
              >
                Copy ECMO ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDelete(ecmo.id)}>
                Delete ECMO
              </DropdownMenuItem>
              <DialogTrigger>
                <DropdownMenuItem>Edit Info</DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <Label>Model</Label>
            <Input
              id="model"
              defaultValue={row.original.model}
              onChange={(e) => setModel(e.target.value)}
            />
            <Label>Serial</Label>
            <Input
              id="serial"
              defaultValue={row.original.serial}
              onChange={(e) => setSerial(e.target.value)}
            />
            <Label>In Use</Label>
            <Switch id="inUse" onCheckedChange={(value) => setInUse(value)} />
            <Label>Type</Label>
            <Select
              onValueChange={(value) => setType(ECMOType.parse(value))}
              defaultValue={row.original.type}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an ECMO type" />
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
