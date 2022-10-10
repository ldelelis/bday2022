import { ActionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ClientOnly, getClientIPAddress } from "remix-utils";
import { cloth, eye, hat, handItem, horn, moustache } from "~/images";
import styles from "~/components/DragoonGenerator/DragoonGenerator.css";
import { createDragoon } from "~/models/dragoon.server";
import DragoonGenerator from "~/components/DragoonGenerator/DragoonGenerator";

export async function loader() {
  return json({
    clothes: cloth,
    eyes: eye,
    handItems: handItem,
    hats: hat,
    horns: horn,
    moustaches: moustache,
  });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const clientIp = getClientIPAddress(request.headers);

  await createDragoon(
    Number(formData.get("hat")),
    Number(formData.get("handItem")),
    Number(formData.get("eye")),
    Number(formData.get("moustache")),
    Number(formData.get("clothes")),
    Number(formData.get("horns")),
    formData.get("baseColor"),
    formData.get("comment"),
    clientIp,
    formData.get("author")
  );

  return redirect("/");
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function Generator() {
  const viewData = useLoaderData();

  return <ClientOnly>{() => <DragoonGenerator {...viewData} />}</ClientOnly>;
}
