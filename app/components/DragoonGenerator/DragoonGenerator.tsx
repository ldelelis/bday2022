import {
  baseColorCurrent,
  clothCurrent,
  eyeCurrent,
  handItemCurrent,
  hatCurrent,
  hornCurrent,
  moustacheCurrent,
} from "~/atoms";
import { useAtom } from "jotai";
import { FC, useState } from "react";
import DragoonGeneratorSelector from "~/components/DragoonGeneratorSelector/DragoonGeneratorSelector";
import DragoonPreview from "~/components/DragoonPreview/DragoonPreview";
import { ColorResult, HuePicker } from "react-color";
import { Form } from "@remix-run/react";
import DragoonPartsPreview from "../DragoonPartsPreview/DragoonPartsPreview";

type DragoonGeneratorProps = {
  clothes: string[];
  eyes: string[];
  hats: string[];
  handItems: string[];
  horns: string[];
  moustaches: string[];
};

const DragoonGenerator: FC<DragoonGeneratorProps> = (props) => {
  const [clothIndex, setCloth] = useAtom(clothCurrent);
  const [eyeIndex, setEye] = useAtom(eyeCurrent);
  const [hatIndex, setHat] = useAtom(hatCurrent);
  const [handItemIndex, setHandItem] = useAtom(handItemCurrent);
  const [hornIndex, setHorn] = useAtom(hornCurrent);
  const [moustacheIndex, setMoustache] = useAtom(moustacheCurrent);

  const [currentColor, setCurrentColor] = useAtom(baseColorCurrent);

  const [selected, setSelected] = useState("hats");

  const { clothes, eyes, hats, handItems, horns, moustaches } = props;
  const cloth = clothes[clothIndex];
  const eye = eyes[eyeIndex];
  const hat = hats[hatIndex];
  const handItem = handItems[handItemIndex];
  const horn = horns[hornIndex];
  const moustache = moustaches[moustacheIndex];

  const handleColorChange = (color: ColorResult) => {
    setCurrentColor(color.hex);
  };

  return (
    <>
      <div className="grid grid-cols-3 grid-rows-1 justify-items-center">
        <DragoonPreview
          handItem={handItem}
          hat={hat}
          eye={eye}
          moustache={moustache}
          cloth={cloth}
          horn={horn}
          currentColor={currentColor}
        />
        <Form
          method="post"
          className="col-span-2 grid grid-cols-1 grid-rows-6 w-1/2"
        >
          <input
            id="author"
            name="author"
            type="text"
            className="border-0 border-b-2 border-gray-200"
          />
          <label htmlFor="comment" className="text-center m-auto">
            Message:
          </label>
          <textarea
            name="comment"
            id="comment"
            className="row-span-3 border-2 border-slate-200"
          ></textarea>
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
      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <h2 className="font-sans text-4xl antialiased font-bold">
        Build your dragoon:
      </h2>
      <div className="grid grid-cols-6 grid-rows-2">
        <div onClick={() => setSelected("clothes")}>
          <DragoonGeneratorSelector
            imagePath={cloth}
            itemIndex={clothIndex}
            itemCount={clothes.length}
            setIndex={setCloth}
          />
        </div>
        <div onClick={() => setSelected("eyes")}>
          <DragoonGeneratorSelector
            imagePath={eye}
            itemIndex={eyeIndex}
            itemCount={eyes.length}
            setIndex={setEye}
          />
        </div>
        <div onClick={() => setSelected("hats")}>
          <DragoonGeneratorSelector
            imagePath={hat}
            itemIndex={hatIndex}
            itemCount={hats.length}
            setIndex={setHat}
          />
        </div>
        <div onClick={() => setSelected("handItems")}>
          <DragoonGeneratorSelector
            imagePath={handItem}
            itemIndex={handItemIndex}
            itemCount={handItems.length}
            setIndex={setHandItem}
          />
        </div>
        <div onClick={() => setSelected("horns")}>
          <DragoonGeneratorSelector
            imagePath={horn}
            itemIndex={hornIndex}
            itemCount={horns.length}
            setIndex={setHorn}
          />
        </div>
        <div onClick={() => setSelected("moustaches")}>
          <DragoonGeneratorSelector
            imagePath={moustache}
            itemIndex={moustacheIndex}
            itemCount={moustaches.length}
            setIndex={setMoustache}
          />
        </div>
        {/* <HuePicker color={currentColor} onChange={handleColorChange} /> */}
        <DragoonPartsPreview images={props[selected]}></DragoonPartsPreview>
      </div>
    </>
  );
};

export default DragoonGenerator;
