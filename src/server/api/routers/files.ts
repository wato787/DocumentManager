import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const filesRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.array(
        z.object({
          name: z.string(),
          categoryId: z.string(),
          pdfPath: z.string(),
          jpgPath: z.string(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const file = input.map(async (file) => {
        const { name, categoryId, pdfPath, jpgPath } = file;
        const newFile = await ctx.db.file.create({
          data: {
            name,
            categoryId,
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
