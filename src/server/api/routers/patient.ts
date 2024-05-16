import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { patients } from "~/server/db/schema";
import { checkAuth } from "../functions";
import { eq } from "drizzle-orm";
import { count } from "drizzle-orm";

const newPatientSchema = z.object({
  name: z.string().min(1).max(100),
  age: z.number().min(1).max(150),
  specialCare: z.enum([
    "PEDIATRIC",
    "FIRST_RESPONDERS",
    "SINGLE_CARETAKERS",
    "PREGNANT_PATIENTS",
    "SHORT_TERM_SURVIVAL",
  ]),
  ecmoType: z.enum(["PULMONARY", "CARDIAC", "ECPR"]),
});

const editPatientSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(100).optional(),
  age: z.number().min(1).max(150).optional(),
  specialCare: z
    .enum([
      "PEDIATRIC",
      "FIRST_RESPONDERS",
      "SINGLE_CARETAKERS",
      "PREGNANT_PATIENTS",
      "SHORT_TERM_SURVIVAL",
    ])
    .optional(),
  ecmoType: z.enum(["PULMONARY", "CARDIAC", "ECPR"]).optional(),
});

const getPatientSchema = z.object({
  specialCare: z
    .enum([
      "PEDIATRIC",
      "FIRST_RESPONDERS",
      "SINGLE_CARETAKERS",
      "PREGNANT_PATIENTS",
      "SHORT_TERM_SURVIVAL",
    ])
    .optional(),
  ecmoType: z.enum(["PULMONARY", "CARDIAC", "ECPR"]).optional(),
});

function computeScore(specialCare: string) {
  switch (specialCare) {
    case "PEDIATRIC":
      return 5;
    case "FIRST_RESPONDERS":
      return 4;
    case "SINGLE_CARETAKERS":
      return 3;
    case "PREGNANT_PATIENTS":
      return 2;
    case "SHORT_TERM_SURVIVAL":
      return 1;
    default:
      return 0; // Default score for unspecified or unknown categories
  }
}

export const patientRouter = createTRPCRouter({
  create: publicProcedure
    .input(newPatientSchema)
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call

      const userId = checkAuth();

      const hospital = await ctx.db.query.hospitals.findFirst({
        where: (model, { eq }) => eq(model.userId, userId),
      });

      if (!hospital) {
        throw new Error("Hospital not found");
      }

      const score = computeScore(input.specialCare);

      const newPatient = await ctx.db.insert(patients).values({
        hospitalId: hospital.id,
        name: input.name,
        coordinates: hospital.coordinates,
        age: input.age,
        score: score,
        specialCare: input.specialCare,
        ecmoType: input.ecmoType,
      });

      return newPatient;
    }),
  edit: publicProcedure
    .input(editPatientSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = checkAuth();

      const patient = await ctx.db.query.patients.findFirst({
        where: (model, { eq }) => eq(model.id, input.id),
      });

      if (!patient) {
        throw new Error("Patient not found");
      }
      let score = 0;
      if (input.specialCare) {
        score = computeScore(input.specialCare);
      } else {
        score = patient.score;
      }

      return await ctx.db
        .update(patients)
        .set({
          name: input.name,
          age: input.age,
          score: score,
          specialCare: input.specialCare,
          ecmoType: input.ecmoType,
        })
        .where(eq(patients.id, patient.id));
    }),
  get: publicProcedure.query(async ({ ctx }) => {
    const userId = checkAuth();

    const hospital = await ctx.db.query.hospitals.findFirst({
      where: (model, { eq }) => eq(model.userId, userId),
    });

    if (!hospital) {
      throw new Error("Hospital not found");
    }

    return await ctx.db.query.patients.findMany({
      where: eq(patients.hospitalId, hospital.id),
    });
  }),
  getCount: publicProcedure.query(async ({ ctx }) => {
    const userId = checkAuth();

    const hospital = await ctx.db.query.hospitals.findFirst({
      where: (model, { eq }) => eq(model.userId, userId),
    });

    if (!hospital) {
      throw new Error("Hospital not found");
    }

    return await ctx.db
      .select({ count: count() })
      .from(patients)
      .where(eq(patients.hospitalId, hospital.id));
  }),
  delete: publicProcedure
    .input(editPatientSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = checkAuth();

      return await ctx.db.delete(patients).where(eq(patients.id, input.id));
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.patients.findMany();
  }),
  getBy: publicProcedure
    .input(getPatientSchema)
    .query(async ({ ctx, input }) => {
      const userId = checkAuth();

      const hospital = await ctx.db.query.hospitals.findFirst({
        where: (model, { eq }) => eq(model.userId, userId),
      });

      if (!hospital) {
        throw new Error("Hospital not found");
      }

      return await ctx.db.query.patients.findMany({
        where: (model, { eq, and }) => {
          if (input.ecmoType && input.specialCare) {
            return and(
              eq(model.hospitalId, hospital.id),
              eq(model.ecmoType, input.ecmoType),
              eq(model.specialCare, input.specialCare),
            );
          } else if (input.ecmoType) {
            return and(
              eq(model.hospitalId, hospital.id),
              eq(model.ecmoType, input.ecmoType),
            );
          } else if (input.specialCare) {
            return and(
              eq(model.hospitalId, hospital.id),
              eq(model.specialCare, input.specialCare),
            );
          } else {
            throw new Error("Either ecmoType or specialCare must be provided");
          }
        },
      });
    }),
});
