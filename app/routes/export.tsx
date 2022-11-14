import { json } from "remix-utils";
import { getRandomDragoons } from "~/models/dragoon.server";
import { cloth, eye, hat, handItem, horn, moustache, frame } from "~/images";

export async function loader() {
  const data = await getRandomDragoons();
  const baseUrl = "https://bday2022.fly.dev";

  const response = data.map((goon) => {
    return {
      ...goon,
      hat: goon.hat && `${baseUrl}${hat[goon.hat - 1]}`,
      handItem: goon.handItem && `${baseUrl}${handItem[goon.handItem - 1]}`,
      clothes: goon.clothes && `${baseUrl}${cloth[goon.clothes - 1]}`,
      moustache: goon.moustache && `${baseUrl}${moustache[goon.moustache - 1]}`,
      eye: `${baseUrl}${eye[goon.eye - 1]}`,
      horns: goon.horns && `${baseUrl}${horn[goon.horns - 1]}`,
      frame: goon.frame && `${baseUrl}${frame[goon.frame - 1]}`,
    };
  });
  return json({ response });
}
