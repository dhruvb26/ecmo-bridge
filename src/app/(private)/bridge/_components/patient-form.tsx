"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getCurrentDateTime } from "~/server/api/functions";

export function PatientForm() {
  const router = useRouter();
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

  const newPatientSchema = z.object({
    name: z
      .string()
      .min(1, { message: "Minimum 1 character required" })
      .max(30),
    age: z.number().min(1).max(100),
    specialCare: SpecialCareCategory,
    ecmoType: ECMOType,
  });
  const form = useForm<z.infer<typeof newPatientSchema>>({
    resolver: zodResolver(newPatientSchema),
    defaultValues: {
      name: "",
      age: 1,
      specialCare: "" as
        | "PEDIATRIC"
        | "FIRST_RESPONDERS"
        | "SINGLE_CARETAKERS"
        | "PREGNANT_PATIENTS"
        | "SHORT_TERM_SURVIVAL",
      ecmoType: "" as "PULMONARY" | "CARDIAC" | "ECPR" | undefined,
    },
  });

  const createPatient = api.patient.create.useMutation({
    onSuccess: () => {
      // console.log("added successfully.");
      toast.success("Patient created successfully", {
        description: `Patient was added on ${getCurrentDateTime()}`,
      });
      router.refresh(); // Refresh the page after adding a new patient
    },
    onError: (error) => {
      // console.error("error", error);
      toast.error(error.message);
    },
  });

  function onSubmit(values: z.infer<typeof newPatientSchema>) {
    createPatient.mutate(values);
    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger>Add Patient</DialogTrigger>

      <DialogContent className="w-[50%] p-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="For eg: John Doe" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your patient's name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))} // Convert string to number
                      value={field.value}
                    ></Input>
                  </FormControl>
                  <FormDescription>
                    Choose the age for your patient.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialCare"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Care</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a special care type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {specialCareTypes.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ecmoType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ECMO</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a ECMO type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ecmoTypes.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
