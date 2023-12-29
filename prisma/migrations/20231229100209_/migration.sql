/*
  Warnings:

  - Added the required column `jpgUrl` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pdfUrl` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "jpgUrl" TEXT NOT NULL,
ADD COLUMN     "pdfUrl" TEXT NOT NULL;
