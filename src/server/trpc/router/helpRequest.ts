import { prisma } from './../../db/client';
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const HelpRequestRouter = router({
  createHelpRequest: publicProcedure.mutation(async ({ ctx }) => {
    const helpRequest = await ctx.prisma.helpRequest.create({
      data: {

      }
    });
    return helpRequest
  }),
  getHelpRequest: publicProcedure.query(async ({ ctx }) => {
    const helpRequest = await ctx.prisma.helpRequest.findMany();
    return helpRequest;
  })
});
