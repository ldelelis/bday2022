import { ActionArgs, HeadersFunction, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ClientOnly } from "remix-utils";
import { cloth, eye, hat, handItem, horn, moustache } from "~/images";
import styles from "~/components/DragoonGenerator/DragoonGenerator.css";
import { createDragoon } from "~/models/dragoon.server";
import DragoonGenerator from "~/components/DragoonGenerator/DragoonGenerator";
import frames from "~/images/dragoonGenerator/frames";

export async function loader() {
  return json({
    clothes: cloth,
    eyes: eye,
    handItems: handItem,
    hats: hat,
    horns: horn,
    moustaches: moustache,
    frames: frames,
  });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  console.log(`laskdflksadjlsadkj formData is ${formData}`);

  await createDragoon(
    Number(formData.get("hat")),
    Number(formData.get("handItem")),
    Number(formData.get("eye")),
    Number(formData.get("moustache")),
    Number(formData.get("clothes")),
    Number(formData.get("horns")),
    String(formData.get("baseColor")),
    String(formData.get("backgroundColor")),
    String(formData.get("comment")),
    "",
    String(formData.get("author")),
    Number(formData.get("frames"))
  );

  return redirect("/all");
}

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "preload", href: "/buttons/submit-hover.png", as: "image" },
    { rel: "preload", href: "/buttons/reset-hover.png", as: "image" },
    { rel: "preload", href: "/backgrounds/all-background.png", as: "image" },
    { rel: "preload", href: "/fonts/Selen2-Regular.ttf", as: "font" },
  ];
}

export let headers: HeadersFunction = () => {
  return {
    "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${
      60 * 60 * 24 * 30
    }`,
  };
};

export function meta() {
  return {
    title: "Build your Dragoon!",
  };
}

export default function Generator() {
  const viewData = useLoaderData();

  return (
    <div className="h-screen p-0 bg-purple-300 sm:p-4 2xl:p-8 font-dragoon lg:overflow-hidden">
      <ClientOnly>{() => <DragoonGenerator {...viewData} />}</ClientOnly>
    </div>
  );
}
