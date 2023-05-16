/*
  Warnings:

  - Added the required column `match_status` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "match_status" TEXT NOT NULL;
