"use client";
import React from "react";
import { Textarea } from "~/components/ui/textarea";
import { z } from "zod";
import { Mail } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Badge } from "~/components/ui/badge";
import Link from "next/link";

const contactFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  subject: z.string().min(2).max(50),
  message: z.string().min(2).max(500),
});

export function ContactForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="my-6">
      <div className=" mx-auto grid max-w-fit  items-center gap-16  rounded-md bg-white p-8 text-black sm:grid-cols-2">
        <div className="flex h-full w-full flex-col items-center justify-center  space-y-6 text-center">
          <div>
            <h1 className="text-5xl font-extrabold">Let's Talk</h1>
            <p className="mt-3 text-lg ">
              Want to update your information? Have a question? Feedback? Feel
              free to reach out to us!
            </p>
          </div>
          <div>
            <Link
              href={
                "https://mail.google.com/mail/?view=cm&fs=1&to=amras@asu.edu"
              }
            >
              <Badge className="h-fit bg-washed-purple-800 p-4 hover:bg-washed-purple-400 focus:bg-washed-purple-800 md:mb-16">
                <Mail className="h-6 w-6 " />
                <p className="ml-3 text-sm ">amras@asu.edu</p>
              </Badge>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
