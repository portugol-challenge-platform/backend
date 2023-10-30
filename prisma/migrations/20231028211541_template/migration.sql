-- CreateEnum
CREATE TYPE "UserChallengeStatus" AS ENUM ('SUCCESS', 'ERROR', 'PROCESSING', 'QUEUED');

-- CreateEnum
CREATE TYPE "ChallengeTesterDataType" AS ENUM ('INPUT', 'OUTPUT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Challenge" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "inputDescription" TEXT NOT NULL,
    "outputDescription" TEXT NOT NULL,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserChallenges" (
    "status" "UserChallengeStatus" NOT NULL,
    "userId" TEXT NOT NULL,
    "challengeId" INTEGER NOT NULL,
    "correct" BOOLEAN NOT NULL,
    "linesCorrect" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ChallengeTester" (
    "id" SERIAL NOT NULL,
    "challengeId" INTEGER NOT NULL,
    "public" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ChallengeTester_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChallengeTesterData" (
    "type" "ChallengeTesterDataType" NOT NULL,
    "value" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "challengeTesterId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserChallenges_userId_challengeId_key" ON "UserChallenges"("userId", "challengeId");

-- CreateIndex
CREATE UNIQUE INDEX "ChallengeTesterData_challengeTesterId_sequence_key" ON "ChallengeTesterData"("challengeTesterId", "sequence");

-- AddForeignKey
ALTER TABLE "UserChallenges" ADD CONSTRAINT "UserChallenges_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChallenges" ADD CONSTRAINT "UserChallenges_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallengeTester" ADD CONSTRAINT "ChallengeTester_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallengeTesterData" ADD CONSTRAINT "ChallengeTesterData_challengeTesterId_fkey" FOREIGN KEY ("challengeTesterId") REFERENCES "ChallengeTester"("id") ON DELETE CASCADE ON UPDATE CASCADE;
