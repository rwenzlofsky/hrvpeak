-- CreateTable
CREATE TABLE "User" (
    "user_id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "height_meter" DECIMAL(65,30) NOT NULL,
    "weight_kilogram" DECIMAL(65,30) NOT NULL,
    "max_heart_rate" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Cycle" (
    "cycle_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_dt" TIMESTAMP(3) NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "timezone_offset" TEXT NOT NULL,
    "score_state" TEXT NOT NULL,
    "strain" DECIMAL(65,30) NOT NULL,
    "kilojoule" DECIMAL(65,30) NOT NULL,
    "average_heart_rate" INTEGER NOT NULL,
    "max_heart_rate" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Recovery" (
    "cycle_id" INTEGER NOT NULL,
    "sleep_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "score_state" TEXT NOT NULL,
    "user_calibrating" BOOLEAN NOT NULL,
    "recovery_score" INTEGER NOT NULL,
    "resting_heart_rate" INTEGER NOT NULL,
    "hrv_rmssd_milli" DECIMAL(65,30) NOT NULL,
    "spo2_percentage" DECIMAL(65,30) NOT NULL,
    "skin_temp_celsius" DECIMAL(65,30) NOT NULL
);

-- CreateTable
CREATE TABLE "Sleep" (
    "sleep_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "timezone_offset" TEXT NOT NULL,
    "nap" BOOLEAN NOT NULL,
    "score_state" TEXT NOT NULL,
    "total_in_bed_time_milli" INTEGER NOT NULL,
    "awake_time_milli" INTEGER NOT NULL,
    "no_data_time_milli" INTEGER NOT NULL,
    "total_light_sleep_time_milli" INTEGER NOT NULL,
    "total_slow_wave_sleep_time_milli" INTEGER NOT NULL,
    "total_rem_sleep_time_milli" INTEGER NOT NULL,
    "sleep_cycle_count" INTEGER NOT NULL,
    "sleep_disturbance_count" INTEGER NOT NULL,
    "sleep_needed_baseline_milli" INTEGER NOT NULL,
    "sleep_needed_need_from_sleep_debt_milli" INTEGER NOT NULL,
    "sleep_needed_need_from_recent_strain_milli" INTEGER NOT NULL,
    "sleep_needed_need_from_recent_nap_milli" INTEGER NOT NULL,
    "sleep_respiratory_rate" DECIMAL(65,30) NOT NULL,
    "sleep_performance_percentage" INTEGER NOT NULL,
    "sleep_consistency_percentage" INTEGER NOT NULL,
    "sleep_efficiency_percentage" DECIMAL(65,30) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Cycle_cycle_id_key" ON "Cycle"("cycle_id");

-- CreateIndex
CREATE UNIQUE INDEX "Recovery_cycle_id_key" ON "Recovery"("cycle_id");

-- CreateIndex
CREATE UNIQUE INDEX "Sleep_sleep_id_key" ON "Sleep"("sleep_id");

-- AddForeignKey
ALTER TABLE "Cycle" ADD CONSTRAINT "Cycle_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recovery" ADD CONSTRAINT "Recovery_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sleep" ADD CONSTRAINT "Sleep_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
