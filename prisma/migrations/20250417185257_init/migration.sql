-- CreateTable
CREATE TABLE "FormSubmission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "ageRange" TEXT NOT NULL,
    "voivodeship" TEXT NOT NULL,
    "residenceType" TEXT NOT NULL,
    "otherParentGender" TEXT NOT NULL,
    "otherParentAgeRange" TEXT NOT NULL,
    "otherParentVoivodeship" TEXT NOT NULL,
    "otherParentResidenceType" TEXT NOT NULL,
    "maritalStatus" TEXT NOT NULL,
    "divorceInitiator" TEXT,
    "faultClaim" BOOLEAN,
    "alimentBasis" TEXT NOT NULL,
    "alimentBasisOther" TEXT,
    "courtDate" DATETIME,
    "courtType" TEXT,
    "courtLocation" TEXT,
    "judgeCount" INTEGER,
    "judgeGender" TEXT,
    "judgeSatisfaction" INTEGER,
    "userIncome" REAL NOT NULL,
    "userPotentialIncome" REAL NOT NULL,
    "userLivingCosts" REAL NOT NULL,
    "userDependantsCosts" REAL NOT NULL,
    "userAdditionalObligations" REAL NOT NULL,
    "otherParentIncome" REAL NOT NULL,
    "otherParentPotentialIncome" REAL NOT NULL,
    "otherParentLivingCosts" REAL NOT NULL,
    "otherParentDependantsCosts" REAL NOT NULL,
    "otherParentAdditionalObligations" REAL NOT NULL,
    "childrenCount" INTEGER NOT NULL,
    "dataProcessingConsent" BOOLEAN NOT NULL,
    "communicationConsent" BOOLEAN NOT NULL,
    "agreeToTerms" BOOLEAN NOT NULL,
    "ipHash" TEXT,
    "hashedEmail" TEXT
);

-- CreateTable
CREATE TABLE "Child" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "formSubmissionId" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "attendsEducation" BOOLEAN NOT NULL,
    "educationType" TEXT,
    "userCosts" REAL NOT NULL,
    "otherParentCosts" REAL NOT NULL,
    "courtRecognizedCosts" REAL,
    "alimentAmount" REAL NOT NULL,
    "hasFamilyPension" BOOLEAN NOT NULL,
    "hasCareTaking" BOOLEAN NOT NULL,
    "hasOtherSources" BOOLEAN NOT NULL,
    "otherSourcesDescription" TEXT,
    "careType" TEXT NOT NULL,
    CONSTRAINT "Child_formSubmissionId_fkey" FOREIGN KEY ("formSubmissionId") REFERENCES "FormSubmission" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CareSchedule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "childId" TEXT NOT NULL,
    "cycleType" TEXT NOT NULL,
    "scheduleData" JSONB NOT NULL,
    CONSTRAINT "CareSchedule_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "CareSchedule_childId_key" ON "CareSchedule"("childId");
