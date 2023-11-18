import { Dragoon, DragoonComment } from "@prisma/client";

import { db } from "~/utils/db.server";

export async function createDragoon(
  hat: Dragoon["hat"],
  handItem: Dragoon["handItem"],
  eye: Dragoon["eye"],
  moustache: Dragoon["moustache"],
  clothes: Dragoon["clothes"],
  horns: Dragoon["horns"],
  hatBack: Dragoon["hatBack"],
  baseColor: Dragoon["baseColor"],
  backgroundColor: Dragoon["backgroundColor"],
  comment: DragoonComment["comment"],
  userIP: DragoonComment["originIp"],
  author: DragoonComment["author"],
  frame: Dragoon["frame"]
) {
  return db.dragoon.create({
    data: {
      hat,
      handItem,
      eye,
      moustache,
      clothes,
      horns,
      hatBack,
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
  pageSize: number = 4,
  year: number
): Promise<[Number, Dragoon[]]> {
  const yearFilter = {
    createdAt: {
      lt: new Date(`${year + 1}-01-01`),
      gte: new Date(`${year}-01-01`),
    },
  };
  const skip = (page - 1) * pageSize;

  const count = await db.dragoon.count({ where: yearFilter });

  const dragoons = await db.dragoon.findMany({
    include: { comment: true },
    orderBy: {
      createdAt: "asc",
    },
    where: yearFilter,
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
	d.hatBack,
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
