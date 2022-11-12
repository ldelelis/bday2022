import {
  backgroundColorCurrent,
  baseColorCurrent,
  clothCurrent,
  DEFAULT_COLOR,
  eyeCurrent,
  frameCurrent,
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
import { background, framesButton, newColorsButton } from "~/images";
import { nameBanner, yourMessage } from "~/images/dragoonGenerator/form";

type DragoonGeneratorProps = {
  clothes: string[];
  eyes: string[];
  hats: string[];
  handItems: string[];
  horns: string[];
  moustaches: string[];
  frames: string[];
};

const DragoonGenerator: FC<DragoonGeneratorProps> = (props) => {
  const [clothIndex, setCloth] = useAtom(clothCurrent);
  const [eyeIndex, setEye] = useAtom(eyeCurrent);
  const [hatIndex, setHat] = useAtom(hatCurrent);
  const [handItemIndex, setHandItem] = useAtom(handItemCurrent);
  const [hornIndex, setHorn] = useAtom(hornCurrent);
  const [moustacheIndex, setMoustache] = useAtom(moustacheCurrent);
  const [frameIndex, setFrame] = useAtom(frameCurrent);

  const partSetterMap = {
    clothes: setCloth,
    eyes: setEye,
    hats: setHat,
    handItems: setHandItem,
    horns: setHorn,
    moustaches: setMoustache,
    colour: null,
    frames: setFrame,
  };

  const [currentColor, setCurrentColor] = useAtom(baseColorCurrent);
  const [backgroundColor, setBackgroundColor] = useAtom(backgroundColorCurrent);

  const [selected, setSelected] = useState("hats");

  const { clothes, eyes, hats, handItems, horns, moustaches, frames } = props;
  const cloth = clothes[clothIndex];
  const eye = eyes[eyeIndex];
  const hat = hats[hatIndex];
  const handItem = handItems[handItemIndex];
  const horn = horns[hornIndex];
  const moustache = moustaches[moustacheIndex];
  const frame = frames[frameIndex];

  const handleReset = () => {
    setCloth(null);
    setEye(0);
    setHat(null);
    setHandItem(null);
    setHorn(0);
    setMoustache(null);
    setCurrentColor(DEFAULT_COLOR);
    setBackgroundColor("#ffffff");
  };

  const isOptional = (partName: string): boolean => {
    return ["clothes", "hats", "handItems", "moustaches", "frames"].includes(
      partName
    );
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
            frame={frame}
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
            required={true}
            className="text-4xl border-b-2 border-black px-4 h-max basis-8"
          />
          <label htmlFor="comment" className="m-auto">
            <img src={yourMessage} className="py-2" />
          </label>
          <textarea
            name="comment"
            id="comment"
            className="text-4xl border-2 border-black p-4 basis-52"
            required={true}
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
          <input
            id="frames"
            name="frames"
            type="hidden"
            value={frameIndex === null ? "" : frameIndex + 1}
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
              className="mt-3 reset-button h-full w-2/5"
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
        <div className="grid grid-cols-2 grid-rows-3 sm:grid-cols-4 sm:grid-rows-2 lg:grid-cols-7 lg:grid-rows-1 text-2xl">
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
          <div className="grid grid-rows-2 grid-cols-1 gap-4">
            <div onClick={() => setSelected("colour")}>
              <DragoonColourPreview thumbnailPath={newColorsButton} />
            </div>
            <div onClick={() => setSelected("frames")}>
              <DragoonColourPreview thumbnailPath={framesButton} />
            </div>
          </div>
        </div>
        <div>
          {selected === "colour" ? (
            <DragoonColourSelector />
          ) : (
            <DragoonPartsPreview
              key={selected}
              images={props[selected]}
              setIndex={partSetterMap[selected]}
              optional={isOptional(selected)}
            ></DragoonPartsPreview>
          )}
        </div>
        <div className="text-2xl">
          Want the selen font for yourself?{" "}
          <a
            className="bg-purple-500 text-white py-2 px-4"
            href="/fonts/Selen-Regular.ttf"
          >
            Download here!
          </a>
        </div>
      </div>
    </div>
  );
};

export default DragoonGenerator;
