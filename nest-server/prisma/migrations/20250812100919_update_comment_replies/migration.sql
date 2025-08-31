-- AlterTable
ALTER TABLE "public"."Comment" ADD COLUMN     "parrentCommentId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_parrentCommentId_fkey" FOREIGN KEY ("parrentCommentId") REFERENCES "public"."Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
