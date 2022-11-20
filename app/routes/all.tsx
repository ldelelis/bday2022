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
    setPageSize(innerWidth > 1441 ? 4 : 2);
    setSearchParams({ pageSize: String(innerWidth > 1441 ? 4 : 2) });
  }, []);

  const pageCount = Math.ceil(count / pageSize) || 1;

  return (
    <div
      className="p-1 font-dragoon text-2xl xl:text-[1.9rem] leading-10 min-h-screen h-full"
      style={{
        backgroundImage: "url(/backgrounds/all-background.png)",
      }}
    >
      <img
        src="/images/message-board.png"
        className="w-4/12 xl:w-3/12 2xl:w-2/12 mx-auto my-4 inset-0"
      />
      <div className="flex flex-row gap-x-4 2xl:gap-x-8 min-h-max">
        <div className="m-auto basis-1/12 animate-wiggle">
          <Link
            to={
              "?page=" + Math.max(1, currentPage - 1) + "&pageSize=" + pageSize
            }
            prefetch="intent"
            data-nav-operation="previous"
          >
            <img src="/buttons/next-button-new.png" className="-scale-x-100" />
            <p className="w-min m-auto text-xl xl:text-2xl">Previous</p>
          </Link>
        </div>
        <div className="grid grid-rows-2 grid-cols-1 2xl:grid-cols-2 gap-2 basis-10/12">
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
        <div className="m-auto basis-1/12 animate-wiggle">
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
            <p className="w-min m-auto text-xl xl:text-3xl">Next</p>
          </Link>
        </div>
      </div>
      <p className="w-fit mx-auto py-4">
        Page {currentPage} of {pageCount}
      </p>
      <Link
        to="/"
        prefetch="intent"
        className="pl-[10vw] xl:pl-[9vw] 2xl:pl-[9.5vw] relative -top-16 "
      >
        <button className="text-xl text-white border-2 border-solid border-black bg-purple-400 rounded-md px-2">
          {"<- Return to"}
          <br />
          {"generator"}
        </button>
      </Link>
    </div>
  );
}
