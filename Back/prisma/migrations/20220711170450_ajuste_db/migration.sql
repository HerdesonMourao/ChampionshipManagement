/*
  Warnings:

  - Added the required column `id_tournament` to the `match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ScoringMomentMatch` MODIFY `time` TIME NOT NULL;

-- AlterTable
ALTER TABLE `match` ADD COLUMN `id_tournament` INTEGER NOT NULL,
    MODIFY `time` TIME NOT NULL;

-- CreateTable
CREATE TABLE `tournament_members` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_tournament` INTEGER NOT NULL,
    `id_team` INTEGER NOT NULL,
    `status` ENUM('INSCRITO', 'EM_ANALISE', 'RECUSADO', 'ELIMINADO') NOT NULL,
    `is_activated` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tournament_members` ADD CONSTRAINT `tournament_members_id_team_fkey` FOREIGN KEY (`id_team`) REFERENCES `team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tournament_members` ADD CONSTRAINT `tournament_members_id_tournament_fkey` FOREIGN KEY (`id_tournament`) REFERENCES `tournament`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match` ADD CONSTRAINT `match_id_tournament_fkey` FOREIGN KEY (`id_tournament`) REFERENCES `tournament`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
