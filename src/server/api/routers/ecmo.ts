import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { ecmos } from "~/server/db/schema";
import { checkAuth } from "../functions";
import { eq } from "drizzle-orm";
import { count } from "drizzle-orm";

const newEcmoSchema = z.object({
  model: z.string().min(1).max(100),
  serial: z.string().min(1).max(150),
  type: z.enum(["PULMONARY", "CARDIAC", "ECPR"]),
  inUse: z.boolean().default(false),
});

const editEcmoSchema = z.object({
  id: z.number(),
  model: z.string().min(1).max(100).optional(),
  serial: z.string().min(1).max(150).optional(),
  type: z.enum(["PULMONARY", "CARDIAC", "ECPR"]).optional(),
  inUse: z.boolean().default(false).optional(),
});

export const ecmoRouter = createTRPCRouter({
  create: publicProcedure
    .input(newEcmoSchema)
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call

      const userId = checkAuth();

      const hospital = await ctx.db.query.hospitals.findFirst({
        where: (model, { eq }) => eq(model.userId, userId),
      });

      if (!hospital) {
        throw new Error("Hospital not found");
      }

      const newEcmo = await ctx.db.insert(ecmos).values({
        hospitalId: hospital.id,
        coordinates: hospital.coordinates,
        isMatched: false,
        model: input.model,
        serial: input.serial,
        type: input.type,
        inUse: input.inUse,
      });

      return newEcmo;
    }),
  edit: publicProcedure
    .input(editEcmoSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = checkAuth();

      const ecmo = await ctx.db.query.ecmos.findFirst({
        where: (model, { eq }) => eq(model.id, input.id),
      });

      if (!ecmo) {
        throw new Error("ECMO not found");
      }

      return await ctx.db
        .update(ecmos)
        .set({
          model: input.model,
          serial: input.serial,
          type: input.type,
          inUse: input.inUse,
        })
        .where(eq(ecmos.id, ecmo.id));
    }),
  get: publicProcedure.query(async ({ ctx }) => {
    const userId = checkAuth();

    const hospital = await ctx.db.query.hospitals.findFirst({
      where: (model, { eq }) => eq(model.userId, userId),
    });

    if (!hospital) {
      throw new Error("Hospital not found");
    }

    return await ctx.db.query.ecmos.findMany({
      where: eq(ecmos.hospitalId, hospital.id),
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
      .from(ecmos)
      .where(eq(ecmos.hospitalId, hospital.id));
  }),
  delete: publicProcedure
    .input(editEcmoSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = checkAuth();

      return await ctx.db.delete(ecmos).where(eq(ecmos.id, input.id));
    }),
});
