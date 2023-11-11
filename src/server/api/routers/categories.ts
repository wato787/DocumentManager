import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const categoriesRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name } = input;
      const category = await ctx.db.category.create({
        data: {
          name: name,
          userId: ctx.session.user.id,
        },
      });
      return category;
    }),

  getAllCategories: protectedProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.category.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return categories;
  }),
});
