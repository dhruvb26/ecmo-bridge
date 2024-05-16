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
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getCurrentDateTime } from "~/server/api/functions";

const formSchema = z.object({
  name: z.string().min(8).max(100),
  location: z.string().min(1).max(150),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});
export function ProfileForm() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null); // Strongly typed ref for TypeScript

  useEffect(() => {
    if (!inputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
    );
    const geocoder = new google.maps.Geocoder();

    autocomplete.setFields(["address_components", "formatted_address"]);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.formatted_address) return;
      form.setValue("location", place.formatted_address);
      geocoder.geocode(
        { address: place.formatted_address },
        (results, status) => {
          if (status === "OK" && results !== null) {
            const lat = results[0]?.geometry.location.lat() || 0;
            const lng = results[0]?.geometry.location.lng() || 0;
            form.setValue("coordinates", { lat, lng });
          }
        },
      );
    });

    return () => {
      // Cleanup function to prevent memory leaks
      if (autocomplete && autocomplete.unbindAll) {
        autocomplete.unbindAll();
      }
    };
  }, []);

  const createHospital = api.hospital.create.useMutation({
    onSuccess: () => {
      // console.log("added successfully.");
      toast.success("Hospital info updated successfully", {
        description: `Hospital info was updated on ${getCurrentDateTime()}`,
      });
      router.refresh();
    },
    onError: (error) => {
      // console.error("error", error);
      toast.error(error.message);
    },
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      coordinates: { lat: 0, lng: 0 },
    },
  });

  const { data, isLoading } = api.hospital.get.useQuery();

  useEffect(() => {
    if (data && !isLoading) {
      // Reset form with fetched data once it's available
      form.reset({
        name: data.name,
        location: data.location,
        coordinates: data.coordinates || { lat: 0, lng: 0 },
      });
    }
  }, [data, isLoading, form]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    createHospital.mutate(values);
  }

  return (
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
                <Input placeholder="For eg: Phoenix Children" {...field} />
              </FormControl>
              <FormDescription>
                This is your hospital's name. This name will be displayed
                everywhere including the match-list.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  id="my-input-searchbox"
                  ref={inputRef}
                  placeholder="Choose..."
                />
              </FormControl>
              <FormDescription>
                Choose the location for your hospital. This is used to calculate
                coordinates of your hospital.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button
            type="submit"
            className="bg-primary-purple-900 hover:bg-primary-purple-400"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
