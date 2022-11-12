import { Dragoon } from "@prisma/client";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { json } from "remix-utils";
import DragoonPreview from "~/components/DragoonPreview/DragoonPreview";
import { getAllDragoons } from "~/models/dragoon.server";
import styles from "~/components/DragoonGenerator/DragoonGenerator.css";
import {
  cloth,
  eye,
  hat,
  handItem,
  horn,
  moustache,
  frame,
  allBackground,
} from "~/images";
import { LoaderArgs } from "@remix-run/node";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const [count, dragoonsData] = await getAllDragoons(Number(page || 1));

  return json({
    clothes: cloth,
    eyes: eye,
    handItems: handItem,
    hats: hat,
    horns: horn,
    moustaches: moustache,
    dragoons: dragoonsData,
    frames: frame,
    count,
  });
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function All() {
  const {
    count,
    dragoons,
    clothes,
    eyes,
    handItems,
    hats,
    horns,
    moustaches,
    frames,
  } = JSON.parse(useLoaderData());

  const PAGE_SIZE = 4;

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  const pageCount = Math.ceil(count / PAGE_SIZE);

  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === pageCount;

  const handlePagination = (e) => {
    console.log("in pagination");
    const { target } = e;
    const operation = target.getAttribute("data-nav-operation");
    const offset = operation === "next" ? 1 : -1;

    setSearchParams({ page: String(currentPage + offset) });
  };

  return (
    <div
      className="p-12 font-dragoon text-2xl h-screen w-screen"
      style={{
        backgroundImage: `url(${allBackground})`,
        backgroundSize: "50%",
      }}
    >
      <img src="/banners/message-board.png" className="w-1/4 m-auto mb-12" />
      <div className="flex flex-row gap-x-8">
        <div
          className="m-auto"
          onClick={() => handlePagination}
          data-nav-operation="previous"
        >
          <img src="/buttons/next-button.png" className="-scale-x-100" />
        </div>
        <div className="grid grid-rows-2 grid-cols-2  gap-2">
          {dragoons.map((goon: Dragoon) => {
            return (
              <div
                key={goon.id}
                className="border-2 border-black backdrop-blur-sm flex flex-row flex-wrap"
              >
                <div className="grid p-2 basis-1/3">
                  <DragoonPreview
                    cloth={clothes[goon.clothes - 1]}
                    horn={horns[goon.horns - 1]}
                    eye={eyes[goon.eye - 1]}
                    handItem={handItems[goon.handItem - 1]}
                    hat={hats[goon.hat - 1]}
                    moustache={moustaches[goon.moustache - 1]}
                    frame={frames[goon.frame - 1]}
                    currentColor={goon.baseColor}
                    backgroundColor={goon.backgroundColor}
                  />
                </div>
                <p className="basis-2/3">{goon.comment.comment}</p>
                <p className="">{goon.comment.author}</p>
              </div>
            );
          })}
        </div>
        <div
          className="m-auto"
          onClick={() => handlePagination}
          data-nav-operation="next"
        >
          <img src="/buttons/next-button.png" />
        </div>
      </div>
    </div>
  );
}
