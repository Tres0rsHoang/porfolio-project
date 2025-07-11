-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LanguageOnFramework" (
    "languageId" INTEGER NOT NULL,
    "frameworkId" INTEGER NOT NULL,

    CONSTRAINT "LanguageOnFramework_pkey" PRIMARY KEY ("frameworkId","languageId")
);

-- AddForeignKey
ALTER TABLE "LanguageOnFramework" ADD CONSTRAINT "LanguageOnFramework_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageOnFramework" ADD CONSTRAINT "LanguageOnFramework_frameworkId_fkey" FOREIGN KEY ("frameworkId") REFERENCES "Framework"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
