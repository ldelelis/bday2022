import { Dragoon } from "@prisma/client";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
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
import { HeadersFunction, LoaderArgs } from "@remix-run/node";
import { useEffect, useState } from "react";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const pageSize = url.searchParams.get("pageSize");
  const [count, dragoonsData] = await getAllDragoons(
    Number(page || 1),
    Number(pageSize || 4)
  );

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

export function meta() {
  return {
    title: "Your Messages",
  };
}

export let headers: HeadersFunction = () => {
  return {
    "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${
      60 * 60 * 24 * 30
    }`,
  };
};

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

  const [pageSize, setPageSize] = useState(4);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);
  useEffect(() => {
    const { innerWidth } = window;
    setPageSize(innerWidth > 1024 ? 4 : 2);
    setSearchParams({ pageSize: String(innerWidth > 1024 ? 4 : 2) });
  }, []);

  const pageCount = Math.ceil(count / pageSize) || 1;

  return (
    <div
      className="p-12 font-dragoon text-2xl xl:text-4xl min-h-screen h-full w-screen"
      style={{
        backgroundImage: `url(${allBackground})`,
        backgroundSize: "50%",
      }}
    >
      <img src="/banners/message-board.png" className="w-1/5 m-auto mb-12" />
      <div className="flex flex-row gap-x-8 min-h-max">
        <div className="m-auto w-1/12">
          <Link
            to={
              "?page=" + Math.max(1, currentPage - 1) + "&pageSize=" + pageSize
            }
            prefetch="intent"
            data-nav-operation="previous"
          >
            <img src="/buttons/next-button.png" className="-scale-x-100" />
          </Link>
          <p className="w-min m-auto text-xl xl:text-3xl">Previous</p>
        </div>
        <div className="grid grid-rows-2 grid-cols-1 xl:grid-cols-2 gap-2 basis-full">
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
                <p className="basis-2/3 break-words">
                  "{goon.comment.comment}"
                </p>
                <p className="mx-auto xl:py-2 self-end">
                  - {goon.comment.author}
                </p>
              </div>
            );
          })}
        </div>
        <div className="m-auto w-1/12">
          <Link
            to={
              "?page=" +
              Math.min(currentPage + 1, pageCount) +
              "&pageSize=" +
              pageSize
            }
            prefetch="intent"
          >
            <img src="/buttons/next-button.png" />
          </Link>
          <p className="w-min m-auto text-xl xl:text-3xl">Next</p>
        </div>
      </div>
    </div>
  );
}
