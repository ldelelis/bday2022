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
import { FC, FormEvent, useState } from "react";
import DragoonGeneratorSelector from "~/components/DragoonGeneratorSelector/DragoonGeneratorSelector";
import DragoonPreview from "~/components/DragoonPreview/DragoonPreview";
import { Form, useSubmit, useTransition } from "@remix-run/react";
import DragoonPartsPreview from "../DragoonPartsPreview/DragoonPartsPreview";
import DragoonColourPreview from "../DragoonColourPreview/DragoonColourPreview";
import DragoonColourSelector from "../DragoonColourSelector/DragoonColourSelector";
import { framesButton, newColorsButton } from "~/images";
import { nameBanner, yourMessage } from "~/images/dragoonGenerator/form";
import DragoonConfirmationModal from "../DragoonConfirmationModal/DragoonConfirmationModal";

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

  const [selected, setSelected] = useState("eyes");
  const [isOpen, setIsOpen] = useState(false);
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

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

  const transition = useTransition();
  const submit = useSubmit();

  const isOptional = (partName: string): boolean => {
    return ["clothes", "hats", "handItems", "moustaches", "frames"].includes(
      partName
    );
  };

  return (
    <>
      <DragoonConfirmationModal
        author={author}
        comment={message}
        clothes={clothIndex}
        horns={hornIndex}
        eye={eyeIndex}
        handItem={handItemIndex}
        hat={hatIndex}
        moustache={moustacheIndex}
        frame={frameIndex}
        baseColor={currentColor}
        backgroundColor={backgroundColor}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="flex gap-x-8">
        <div className="w-1/4">
          <div className="grid grid-cols-1 grid-rows-1 h-min justify-items-center shrink">
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
            className="flex flex-col m-auto 2xl:py-4"
          >
            <img src={nameBanner} className="m-auto py-2 2xl:py-4" />
            <input
              id="author"
              name="author"
              type="text"
              required={true}
              className="text-2xl 2xl:text-4xl border-b-2 border-black px-4 h-max basis-8"
              maxLength={35}
              disabled={transition.state === "submitting"}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <label htmlFor="comment" className="m-auto">
              <img
                src={yourMessage}
                className="h-2/3 w-2/3 2xl:h-full 2xl:w-full py-2 m-auto"
              />
            </label>
            <textarea
              name="comment"
              id="comment"
              className="text-2xl 2xl:text-4xl border-2 border-black p-4 basis-52"
              required={true}
              maxLength={160}
              disabled={transition.state === "submitting"}
              onChange={(e) => setMessage(e.target.value)}
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
            <input
              id="horns"
              name="horns"
              type="hidden"
              value={hornIndex + 1}
            />
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
                type="button"
                form="dragoonData"
                className="submit-button h-full w-1/3"
                disabled={
                  transition.state === "submitting" ||
                  author.length === 0 ||
                  message.length === 0
                }
                onClick={() => setIsOpen(true)}
              />
              <button
                type="button"
                onClick={() => handleReset()}
                className="bg-bottom reset-button h-full w-2/5"
                disabled={transition.state === "submitting"}
              />
            </div>
          </Form>
        </div>

        <div
          className="h-fit w-fit max-h-min p-4"
          style={{
            backgroundImage: "url(/backgrounds/generator.png)",
            backgroundSize: "50%",
          }}
        >
          <h2 className="font-sans text-4xl antialiased font-bold">
            Build your dragoon:
          </h2>
          <div className="grid grid-cols-2 grid-rows-2 sm:grid-cols-7 sm:grid-rows-1 xl:grid-cols-7 xl:grid-rows-1 text-lg xl:text-2xl">
            <div onClick={() => setSelected("clothes")}>
              <DragoonGeneratorSelector
                imagePath={cloth}
                partName="clothes"
                label="clothes"
                selected={selected}
              />
            </div>
            <div onClick={() => setSelected("eyes")}>
              <DragoonGeneratorSelector
                imagePath={eye}
                partName="eyes"
                label="eyes"
                selected={selected}
              />
            </div>
            <div onClick={() => setSelected("hats")}>
              <DragoonGeneratorSelector
                imagePath={hat}
                partName="hats"
                label="hats"
                selected={selected}
              />
            </div>
            <div onClick={() => setSelected("handItems")}>
              <DragoonGeneratorSelector
                imagePath={handItem}
                partName="handItems"
                label="extras"
                selected={selected}
              />
            </div>
            <div onClick={() => setSelected("horns")}>
              <DragoonGeneratorSelector
                imagePath={horn}
                partName="horns"
                label="horns"
                selected={selected}
              />
            </div>
            <div onClick={() => setSelected("moustaches")}>
              <DragoonGeneratorSelector
                imagePath={moustache}
                partName="moustaches"
                label="face"
                selected={selected}
              />
            </div>
            <div className="grid grid-rows-2 grid-cols-1 xl:gap-4">
              <div onClick={() => setSelected("colour")}>
                <DragoonColourPreview
                  thumbnailPath={newColorsButton}
                  partName="colour"
                  selected={selected}
                />
              </div>
              <div onClick={() => setSelected("frames")}>
                <DragoonColourPreview
                  thumbnailPath={framesButton}
                  partName="frames"
                  selected={selected}
                />
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
          <div className="text-xl xl:text-2xl pt-3">
            Want the selen font for yourself?{" "}
            <a
              className="bg-purple-500 text-white py-2 px-4 rounded-md"
              href="/fonts/Selen2-Regular.ttf"
            >
              Download here!
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default DragoonGenerator;
