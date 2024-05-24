import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { hospitals } from "~/server/db/schema";
import { checkAuth } from "../functions";

export const createHospitalSchema = z.object({
  name: z.string().min(1).max(100),
  location: z.string().min(1).max(100),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});

export const hospitalRouter = createTRPCRouter({
  create: publicProcedure
    .input(createHospitalSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = checkAuth();

      const hospital = await ctx.db.query.hospitals.findFirst({
        where: (model, { eq }) => eq(model.userId, userId),
      });

      if (!hospital) {
        return await ctx.db.insert(hospitals).values({
          userId,
          name: input.name,
          location: input.location,
          coordinates: input.coordinates,
          isVerified: true,
          updatedAt: new Date(),
        });
      }

      throw new Error("Hospital already exists");
    }),

  get: publicProcedure.query(async ({ ctx }) => {
    const userId = checkAuth();

    return await ctx.db.query.hospitals.findFirst({
      where: (model, { eq }) => eq(model.userId, userId),
    });
  }),
});
