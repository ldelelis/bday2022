import { ActionArgs, json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useAtom } from "jotai";
import { HuePicker } from "react-color";
import { getClientIPAddress } from "remix-utils";
import {
  baseColorCurrent,
  clothCurrent,
  eyeCurrent,
  handItemCurrent,
  hatCurrent,
  hornCurrent,
  moustacheCurrent,
} from "~/atoms";
import DragoonGeneratorSelector from "~/components/DragoonGeneratorSelector/DragoonGeneratorSelector";
import { cloth, eye, hat, handItem, horn, moustache } from "~/images";
import styles from "~/components/DragoonGenerator/DragoonGenerator.css";
import { createDragoon } from "~/models/dragoon.server";
import DragoonPreview from "~/components/DragoonPreview/DragoonPreview";

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

  const [clothIndex, setCloth] = useAtom(clothCurrent);
  const [eyeIndex, setEye] = useAtom(eyeCurrent);
  const [hatIndex, setHat] = useAtom(hatCurrent);
  const [handItemIndex, setHandItem] = useAtom(handItemCurrent);
  const [hornIndex, setHorn] = useAtom(hornCurrent);
  const [moustacheIndex, setMoustache] = useAtom(moustacheCurrent);

  const [currentColor, setCurrentColor] = useAtom(baseColorCurrent);

  const cloth = viewData.clothes[clothIndex];
  const eye = viewData.eyes[eyeIndex];
  const hat = viewData.hats[hatIndex];
  const handItem = viewData.handItems[handItemIndex];
  const horn = viewData.horns[hornIndex];
  const moustache = viewData.moustaches[moustacheIndex];

  const handleColorChange = (color, event) => {
    setCurrentColor(color.hex);
  };

  return (
    <div className="grid grid-cols-6 grid-rows-1 gap-2">
      <DragoonGeneratorSelector
        imagePath={cloth}
        itemIndex={clothIndex}
        itemCount={viewData.clothes.length}
        setIndex={setCloth}
      />
      <DragoonGeneratorSelector
        imagePath={eye}
        itemIndex={eyeIndex}
        itemCount={viewData.eyes.length}
        setIndex={setEye}
      />
      <DragoonGeneratorSelector
        imagePath={hat}
        itemIndex={hatIndex}
        itemCount={viewData.hats.length}
        setIndex={setHat}
      />
      <DragoonGeneratorSelector
        imagePath={handItem}
        itemIndex={handItemIndex}
        itemCount={viewData.handItems.length}
        setIndex={setHandItem}
      />
      <DragoonGeneratorSelector
        imagePath={horn}
        itemIndex={hornIndex}
        itemCount={viewData.horns.length}
        setIndex={setHorn}
      />
      <DragoonGeneratorSelector
        imagePath={moustache}
        itemIndex={moustacheIndex}
        itemCount={viewData.moustaches.length}
        setIndex={setMoustache}
      />

      <DragoonPreview
        handItem={handItem}
        hat={hat}
        eye={eye}
        moustache={moustache}
        cloth={cloth}
        horn={horn}
        currentColor={currentColor}
      />

      <HuePicker color={currentColor} onChange={handleColorChange} />

      <Form method="post" className="grid grid-cols-1 grid-rows-6">
        <textarea name="comment" className="row-span-4"></textarea>
        <input id="author" name="author" type="text" />
        <input id="hat" name="hat" type="hidden" value={hatIndex + 1} />
        <input
          id="handItem"
          name="handItem"
          type="hidden"
          value={handItemIndex + 1}
        />
        <input id="eye" name="eye" type="hidden" value={eyeIndex + 1} />
        <input
          id="moustache"
          name="moustache"
          type="hidden"
          value={moustacheIndex + 1}
        />
        <input
          id="clothes"
          name="clothes"
          type="hidden"
          value={clothIndex + 1}
        />
        <input id="horns" name="horns" type="hidden" value={hornIndex + 1} />
        <input
          id="baseColor"
          name="baseColor"
          type="hidden"
          value={currentColor}
        />
        <button type="submit">kjdlkas</button>
      </Form>
    </div>
  );
}
