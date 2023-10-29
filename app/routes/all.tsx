import { Dragoon } from "@prisma/client";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { json } from "remix-utils";
import { getAllDragoons } from "~/models/dragoon.server";
import styles from "~/components/DragoonGenerator/DragoonGenerator.css";
import { HeadersFunction, LoaderArgs } from "@remix-run/node";
import { useEffect, useState } from "react";
import DragoonCard from "~/components/DragoonCard/DragoonCard";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const pageSize = url.searchParams.get("pageSize");
  const [count, dragoonsData] = await getAllDragoons(
    Number(page || 1),
    Number(pageSize || 4)
  );

  return json({
    dragoons: dragoonsData,
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
  const { count, dragoons } = JSON.parse(useLoaderData());

  const [pageSize, setPageSize] = useState(4);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);
  useEffect(() => {
    const { innerWidth } = window;
    let breakpoint;
    if (innerWidth > 1441) {
      breakpoint = 4;
    } else if (innerWidth > 1001) {
      breakpoint = 2;
    } else {
      breakpoint = 1;
    }
    setPageSize(breakpoint);
    setSearchParams({ pageSize: String(breakpoint) });
  }, []);

  const pageCount = Math.ceil(count / pageSize) || 1;

  return (
    <div
      className="p-1 font-dragoon text-xl xl:text-[1.9rem] leading-10 min-h-screen h-full"
      style={{
        backgroundImage: "url(/backgrounds/all-background.png)",
      }}
    >
      <img
        src="/images/message-board.png"
        className="inset-0 w-4/12 mx-auto my-4 xl:w-3/12 2xl:w-2/12"
      />
      <div className="flex flex-row gap-x-4 2xl:gap-x-8 min-h-max">
        <div className="my-auto grow basis-1/12 animate-wiggle">
          <Link
            to={
              "?page=" + Math.max(1, currentPage - 1) + "&pageSize=" + pageSize
            }
            prefetch="intent"
            data-nav-operation="previous"
          >
            <img src="/buttons/next-button-new.png" className="-scale-x-100" />
            <p className="m-auto text-sm w-min xl:text-2xl">Previous</p>
          </Link>
        </div>
        <div className="grow grid grid-rows-1 xl:grid-rows-2 grid-cols-1 2xl:grid-cols-2 gap-2 basis-10/12">
          {dragoons.map((goon: Dragoon) => {
            return (
              <DragoonCard
                key={goon.id}
                author={goon.comment.author}
                comment={goon.comment.comment}
                clothesIndex={goon.clothes - 1}
                eyeIndex={goon.eye - 1}
                hatIndex={goon.hat - 1}
                hornsIndex={goon.horns - 1}
                handItemIndex={goon.handItem - 1}
                moustacheIndex={goon.moustache - 1}
                frameIndex={goon.frame - 1}
                baseColor={goon.baseColor}
                backgroundColor={goon.backgroundColor}
              />
            );
          })}
        </div>
        <div className="flex-1 m-auto basis-1/12 animate-wiggle">
          <Link
            to={
              "?page=" +
              Math.min(currentPage + 1, pageCount) +
              "&pageSize=" +
              pageSize
            }
            prefetch="intent"
          >
            <img src="/buttons/next-button-new.png" />
            <p className="m-auto text-xl w-min xl:text-3xl">Next</p>
          </Link>
        </div>
        <p className="absolute inset-x-0 bottom-0 py-4 mx-auto w-fit">
          Page {currentPage} of {pageCount}
        </p>
        <Link
          to="/"
          prefetch="intent"
          className="m-auto absolute bottom-0 left-0 xl:pl-[9vw] 2xl:pl-[9.5vw] "
        >
          <button className="px-2 text-lg text-white bg-purple-400 border-2 border-black border-solid flex-end rounded-md">
            {"<- Return to"}
            <br />
            {"generator"}
          </button>
        </Link>
      </div>
    </div>
  );
}
