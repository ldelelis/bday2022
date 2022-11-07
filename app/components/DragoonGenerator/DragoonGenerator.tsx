import {
  backgroundColorCurrent,
  baseColorCurrent,
  clothCurrent,
  DEFAULT_COLOR,
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
import { Form } from "@remix-run/react";
import DragoonPartsPreview from "../DragoonPartsPreview/DragoonPartsPreview";
import DragoonColourPreview from "../DragoonColourPreview/DragoonColourPreview";
import DragoonColourSelector from "../DragoonColourSelector/DragoonColourSelector";
import { background } from "~/images";
import {
  nameBanner,
  resetIdleButton,
  submitIdleButton,
  yourMessage,
} from "~/images/dragoonGenerator/form";

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

  const partSetterMap = {
    clothes: setCloth,
    eyes: setEye,
    hats: setHat,
    handItems: setHandItem,
    horns: setHorn,
    moustaches: setMoustache,
    colour: null,
  };

  const [currentColor, setCurrentColor] = useAtom(baseColorCurrent);
  const [backgroundColor, setBackgroundColor] = useAtom(backgroundColorCurrent);

  const [selected, setSelected] = useState("hats");

  const { clothes, eyes, hats, handItems, horns, moustaches } = props;
  const cloth = clothes[clothIndex];
  const eye = eyes[eyeIndex];
  const hat = hats[hatIndex];
  const handItem = handItems[handItemIndex];
  const horn = horns[hornIndex];
  const moustache = moustaches[moustacheIndex];

  const handleReset = () => {
    setCloth(0);
    setEye(0);
    setHat(0);
    setHandItem(0);
    setHorn(0);
    setMoustache(0);
    setCurrentColor(DEFAULT_COLOR);
    setBackgroundColor("#ffffff");
  };

  const isOptional = (partName: string): boolean => {
    return ["clothes", "hats", "handItems", "moustaches"].includes(partName);
  };

  return (
    <div className="grid grid-cols-6">
      <div className="col-span-2 justify-items-center">
        <div className="grid grid-cols-1 grid-rows-1 h-min justify-items-center">
          <DragoonPreview
            handItem={handItem}
            hat={hat}
            eye={eye}
            moustache={moustache}
            cloth={cloth}
            horn={horn}
            currentColor={currentColor}
            backgroundColor={backgroundColor}
          />
        </div>

        <Form
          id="dragoonData"
          method="post"
          className="flex flex-col w-2/3 m-auto py-8"
        >
          <img src={nameBanner} className="m-auto py-4" />
          <input
            id="author"
            name="author"
            type="text"
            className="border-0 border-b-2 border-black px-4 h-max basis-8"
          />
          <label htmlFor="comment" className="m-auto">
            <img src={yourMessage} className="py-2" />
          </label>
          <textarea
            name="comment"
            id="comment"
            className="border-2 border-black p-4 basis-52"
          ></textarea>
          <input
            id="hat"
            name="hat"
            type="hidden"
            value={hatIndex === null ? "" : hatIndex + 1}
          />
          <input
            id="handItem"
            name="handItem"
            type="hidden"
            value={handItemIndex === null ? "" : handItemIndex + 1}
          />
          <input id="eye" name="eye" type="hidden" value={eyeIndex + 1} />
          <input
            id="moustache"
            name="moustache"
            type="hidden"
            value={moustacheIndex === null ? "" : moustacheIndex + 1}
          />
          <input
            id="clothes"
            name="clothes"
            type="hidden"
            value={clothIndex === null ? "" : clothIndex + 1}
          />
          <input id="horns" name="horns" type="hidden" value={hornIndex + 1} />
          <input
            id="baseColor"
            name="baseColor"
            type="hidden"
            value={currentColor}
          />
          <input
            id="backgroundColor"
            name="backgroundColor"
            type="hidden"
            value={backgroundColor}
          />
          <div className="flex justify-center gap-8 h-16 min-w-fit max-w-full">
            <button
              type="submit"
              form="dragoonData"
              className="submit-button h-full w-1/3"
            />
            <button
              type="button"
              onClick={() => handleReset()}
              className="reset-button h-full w-2/5"
            />
          </div>
        </Form>
      </div>

      <div
        className="col-span-4 h-min p-4"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "50%",
        }}
      >
        <h2 className="font-sans text-4xl antialiased font-bold">
          Build your dragoon:
        </h2>
        <div className="grid grid-cols-7 text-2xl">
          <div onClick={() => setSelected("clothes")}>
            <DragoonGeneratorSelector imagePath={cloth} partName="clothes" />
          </div>
          <div onClick={() => setSelected("eyes")}>
            <DragoonGeneratorSelector imagePath={eye} partName="eyes" />
          </div>
          <div onClick={() => setSelected("hats")}>
            <DragoonGeneratorSelector imagePath={hat} partName="hats" />
          </div>
          <div onClick={() => setSelected("handItems")}>
            <DragoonGeneratorSelector
              imagePath={handItem}
              partName="accessories"
            />
          </div>
          <div onClick={() => setSelected("horns")}>
            <DragoonGeneratorSelector imagePath={horn} partName="horns" />
          </div>
          <div onClick={() => setSelected("moustaches")}>
            <DragoonGeneratorSelector imagePath={moustache} partName="face" />
          </div>
          <div onClick={() => setSelected("colour")}>
            <DragoonColourPreview />
          </div>
          {selected !== "colour" ? (
            <DragoonPartsPreview
              key={selected}
              images={props[selected]}
              setIndex={partSetterMap[selected]}
              optional={isOptional(selected)}
            ></DragoonPartsPreview>
          ) : (
            <DragoonColourSelector />
          )}
        </div>
      </div>
    </div>
  );
};

export default DragoonGenerator;
