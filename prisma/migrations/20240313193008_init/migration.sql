-- CreateTable
CREATE TABLE "Token" (
    "user_id" INTEGER NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "height_meter" DECIMAL(65,30) NOT NULL,
    "weight_kilogram" DECIMAL(65,30) NOT NULL,
    "max_heart_rate" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
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
    "max_heart_rate" INTEGER NOT NULL,

    CONSTRAINT "Cycle_pkey" PRIMARY KEY ("cycle_id","user_id")
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
    "skin_temp_celsius" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Recovery_pkey" PRIMARY KEY ("cycle_id","sleep_id","user_id")
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
    "sleep_efficiency_percentage" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Sleep_pkey" PRIMARY KEY ("sleep_id")
);
