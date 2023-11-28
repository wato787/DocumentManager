import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const filesRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.array(
        z.object({
          pdfPath: z.string(),
          jpgPath: z.string(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const file = input.map(async (file) => {
        const { pdfPath, jpgPath } = file;
        const newFile = await ctx.db.file.create({
          data: {
            pdfPath,
            jpgPath,
            userId: ctx.session.user.id,
          },
        });
        return newFile;
      });

      return file;
    }),
});
