/*
  Warnings:

  - Added the required column `status` to the `tournament` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tournament` ADD COLUMN `status` ENUM('ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO') NOT NULL;
