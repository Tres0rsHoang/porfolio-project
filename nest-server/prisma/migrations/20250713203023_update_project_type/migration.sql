-- CreateTable
CREATE TABLE "ProjectType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeOnProject" (
    "projectTypeId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "TypeOnProject_pkey" PRIMARY KEY ("projectTypeId","projectId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectType_name_key" ON "ProjectType"("name");

-- AddForeignKey
ALTER TABLE "TypeOnProject" ADD CONSTRAINT "TypeOnProject_projectTypeId_fkey" FOREIGN KEY ("projectTypeId") REFERENCES "ProjectType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeOnProject" ADD CONSTRAINT "TypeOnProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
