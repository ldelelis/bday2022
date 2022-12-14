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
  frame: Dragoon["frames"]
) {
  return db.dragoon.create({
    data: {
      hat,
      handItem,
      eye,
      moustache,
      clothes,
      horns,
      frame,
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
  page: number,
  pageSize: number = 4
): Promise<[Number, Dragoon[]]> {
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

export async function getRandomDragoons() {
  return await db.$queryRaw<Dragoon[]>`
SELECT
	d.hat,
	d."handItem",
	d.moustache,
	d.eye,
	d.clothes,
	d.horns,
	d.frame,
	d."baseColor",
	d."backgroundColor",
	dc.author,
	dc."comment"
FROM
	"Dragoon" d
INNER JOIN "DragoonComment" dc ON
	d.id LIKE dc."dragoonId"
ORDER BY
	random()
LIMIT 5;
`;
}
