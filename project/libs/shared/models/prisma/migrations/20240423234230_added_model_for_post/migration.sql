-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "publishDate" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "postType" TEXT NOT NULL,
    "postState" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "announcement" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "postText" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "quoteText" TEXT NOT NULL,
    "quoteAuthor" TEXT NOT NULL,
    "isReposted" BOOLEAN NOT NULL,
    "videoLink" TEXT NOT NULL,
    "creatorUserId" TEXT NOT NULL,
    "originalPostId" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Post_title_idx" ON "Post"("title");
