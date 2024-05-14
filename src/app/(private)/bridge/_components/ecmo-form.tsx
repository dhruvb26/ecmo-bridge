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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import { Switch } from "~/components/ui/switch";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { getCurrentDateTime } from "~/server/api/functions";

export function ECMOForm() {
  const router = useRouter();
  const ECMOType = z.enum(["PULMONARY", "CARDIAC", "ECPR"], {
    errorMap: (issue, ctx) => ({ message: "Inavlid ECMO type" }),
  });
  const ecmoTypes = [
    { value: "PULMONARY", label: "Pulmonary" },
    { value: "CARDIAC", label: "Cardiac" },
    { value: "ECPR", label: "ECPR" },
  ];
  const [message, setMessage] = useState("");

  const newEcmoSchema = z.object({
    model: z
      .string()
      .min(1, { message: "Minimum 1 character required" })
      .max(30),
    serial: z
      .string()
      .min(1, { message: "Minimum 1 character required" })
      .max(30),
    type: ECMOType,
    inUse: z.boolean().default(false),
  });

  const form = useForm<z.infer<typeof newEcmoSchema>>({
    resolver: zodResolver(newEcmoSchema),
    defaultValues: {
      model: "",
      serial: "",
      inUse: false,
      type: undefined,
    },
  });

  const createEcmo = api.ecmo.create.useMutation({
    onSuccess: () => {
      // console.log("ECMO created successfully");
      toast.success("ECMO created successfully", {
        description: `ECMO was added on ${getCurrentDateTime()}`,
      });
      router.refresh();
    },
    onError: (error) => {
      // console.log("error", error);
      toast.error(error.message);
    },
  });

  function onSubmit(values: z.infer<typeof newEcmoSchema>) {
    createEcmo.mutate(values);
  }

  return (
    <Dialog>
      <DialogTrigger>Add ECMO</DialogTrigger>
      <DialogContent className="w-[50%] p-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-8"
          >
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input placeholder="For eg: ABC-123" {...field} />
                  </FormControl>
                  <FormDescription>This is your ECMO's model.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serial</FormLabel>
                  <FormControl>
                    <Input placeholder="For eg: ABC-123" {...field} />
                  </FormControl>
                  <FormDescription>This is your ECMO's serial.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
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
            <FormField
              control={form.control}
              name="inUse"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">In use?</FormLabel>
                    <FormDescription>
                      Receive emails about new products, features, and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
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
