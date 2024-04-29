/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "publish_date" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "post_type" TEXT NOT NULL,
    "post_state" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "announcement" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "post_text" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "quote_text" TEXT NOT NULL,
    "quote_author" TEXT NOT NULL,
    "is_reposted" BOOLEAN NOT NULL,
    "video_link" TEXT NOT NULL,
    "creator_user_id" TEXT NOT NULL,
    "original_post_id" TEXT NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "posts_title_idx" ON "posts"("title");
