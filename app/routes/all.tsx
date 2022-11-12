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
    const { target } = e;
    const operation = target.getAttribute("data-nav-operation");
    const offset = operation === "next" ? 1 : -1;

    if (operation === "next" && isNextDisabled) return;
    if (operation === "previous" && isPreviousDisabled) return;

    setSearchParams({ page: String(currentPage + offset) });
  };

  return (
    <div
      className="p-12 font-dragoon text-4xl h-screen w-screen"
      style={{
        backgroundImage: `url(${allBackground})`,
        backgroundSize: "50%",
      }}
    >
      <img src="/banners/message-board.png" className="w-1/5 m-auto mb-12" />
      <div className="flex flex-row gap-x-8 min-h-max">
        <div className="m-auto w-1/12">
          <img
            src="/buttons/next-button.png"
            className="-scale-x-100"
            onClick={handlePagination}
            data-nav-operation="previous"
          />
        </div>
        <div className="grid grid-rows-2 grid-cols-2  gap-2 basis-full">
          {dragoons.map((goon: Dragoon) => {
            return (
              <div
                key={goon.id}
                className="border-2 border-black backdrop-blur-sm flex flex-row flex-wrap"
              >
                <div className="grid p-4 basis-1/3">
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
                <p className="basis-2/3 h-1/3 grow">"{goon.comment.comment}"</p>
                <p className="m-auto py-2">- {goon.comment.author}</p>
              </div>
            );
          })}
        </div>
        <div className="m-auto w-1/12">
          <img
            src="/buttons/next-button.png"
            onClick={handlePagination}
            data-nav-operation="next"
          />
        </div>
      </div>
    </div>
  );
}
