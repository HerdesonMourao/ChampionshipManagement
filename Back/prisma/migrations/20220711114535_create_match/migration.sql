-- CreateTable
CREATE TABLE `match` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `time` TIME NOT NULL,
    `place` VARCHAR(191) NOT NULL,
    `id_team_a` INTEGER NOT NULL,
    `id_team_b` INTEGER NOT NULL,
    `scoreboard` VARCHAR(191) NOT NULL,
    `is_activated` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScoringMomentMatch` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_match` INTEGER NOT NULL,
    `id_player` INTEGER NOT NULL,
    `time` TIME NOT NULL,
    `is_activated` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ScoringMomentMatch` ADD CONSTRAINT `ScoringMomentMatch_id_player_fkey` FOREIGN KEY (`id_player`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScoringMomentMatch` ADD CONSTRAINT `ScoringMomentMatch_id_match_fkey` FOREIGN KEY (`id_match`) REFERENCES `match`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
