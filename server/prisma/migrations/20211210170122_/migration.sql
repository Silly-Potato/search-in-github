/*
  Warnings:

  - A unique constraint covering the columns `[std_login]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `std_login` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "std_login" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_std_login_key" ON "User"("std_login");
