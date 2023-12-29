import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const filesRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.array(
        z.object({
          name: z.string(),
          path: z.string(),
          pdfUrl: z.string(),
          jpgUrl: z.string(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const files = await Promise.all(
        input.map(async (file) => {
          const { name, path, pdfUrl, jpgUrl } = file;
          const newFile = await ctx.db.file.create({
            data: {
              name,
              path,
              pdfUrl,
              jpgUrl,
              userId: ctx.session.user.id,
            },
          });

          return newFile;
        }),
      );

      return files;
    }),

  get: protectedProcedure.query(async ({ ctx }) => {
    const files = await ctx.db.file.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });

    return files;
  }),
});
