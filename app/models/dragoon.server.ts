import { Dragoon, DragoonComment } from "@prisma/client";

import { db } from "~/utils/db.server";

export async function createDragoon(
  hat: Dragoon["hat"],
  handItem: Dragoon["handItem"],
  eye: Dragoon["eye"],
  moustache: Dragoon["moustache"],
  clothes: Dragoon["clothes"],
  horns: Dragoon["horns"],
  baseColor: Dragoon["baseColor"],
  backgroundColor: Dragoon["backgroundColor"],
  comment: DragoonComment["comment"],
  userIP: DragoonComment["originIp"],
  author: DragoonComment["author"],
  frames: Dragoon["frames"]
) {
  return db.dragoon.create({
    data: {
      hat,
      handItem,
      eye,
      moustache,
      clothes,
      horns,
      frames,
      baseColor,
      backgroundColor,
      comment: {
        create: {
          comment,
          author,
          originIp: userIP,
        },
      },
    },
  });
}

export async function getAllDragoons(
  page: number
): Promise<[Number, Dragoon[]]> {
  const pageSize = 4;
  const skip = (page - 1) * pageSize;

  const count = await db.dragoon.count();

  const dragoons = await db.dragoon.findMany({
    include: { comment: true },
    orderBy: {
      createdAt: "asc",
    },
    take: pageSize,
    skip,
  });

  return [count, dragoons];
}
