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
  comment: DragoonComment["comment"],
  userIP: DragoonComment["originIp"],
  author: DragoonComment["author"]
) {
  return db.dragoon.create({
    data: {
      hat,
      handItem,
      eye,
      moustache,
      clothes,
      horns,
      baseColor,
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
