-- CreateTable
CREATE TABLE "Dragoon" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hat" INTEGER NOT NULL,
    "handItem" INTEGER NOT NULL,
    "moustache" INTEGER NOT NULL,
    "eye" INTEGER NOT NULL,
    "clothes" INTEGER NOT NULL,
    "horns" INTEGER NOT NULL,
    "baseColor" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,

    CONSTRAINT "Dragoon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DragoonComment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "author" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "originIp" TEXT,
    "dragoonId" TEXT NOT NULL,

    CONSTRAINT "DragoonComment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DragoonComment_dragoonId_key" ON "DragoonComment"("dragoonId");

-- AddForeignKey
ALTER TABLE "DragoonComment" ADD CONSTRAINT "DragoonComment_dragoonId_fkey" FOREIGN KEY ("dragoonId") REFERENCES "Dragoon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
