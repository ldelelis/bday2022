import { Dragoon } from "@prisma/client";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { json } from "remix-utils";
import DragoonPreview from "~/components/DragoonPreview/DragoonPreview";
import { getAllDragoons } from "~/models/dragoon.server";
import styles from "~/components/DragoonGenerator/DragoonGenerator.css";
import { cloth, eye, hat, handItem, horn, moustache, frame } from "~/images";
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

    setSearchParams({ page: String(currentPage + offset) });
  };

  return (
    <div className="p-12">
      <div className="grid grid-cols-2">
        {dragoons.map((goon: Dragoon) => {
          return (
            <div
              key={goon.id}
              className="grid grid-cols-2 grid-rows-1 p-2 border-2 border-slate-400 m-1"
            >
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
              <div className="grid grid-cols-1 grid-rows-2">
                <p>Name: {goon.comment.author}</p>
                <p>Their message: {goon.comment.comment}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <button
          onClick={handlePagination}
          disabled={isPreviousDisabled}
          data-nav-operation="previous"
        >
          Previous
        </button>
        <button
          onClick={handlePagination}
          disabled={isNextDisabled}
          data-nav-operation="next"
        >
          Next
        </button>
      </div>
    </div>
  );
}
