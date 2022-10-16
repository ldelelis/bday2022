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

  const partSetterMap = {
    clothes: setCloth,
    eyes: setEye,
    hats: setHat,
    handItems: setHandItem,
    horns: setHorn,
    moustaches: setMoustache,
  };

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

  const handleReset = () => {
    setCloth(0);
    setEye(0);
    setHat(0);
    setHandItem(0);
    setHorn(0);
    setMoustache(0);
  };

  return (
    <div className="m-4">
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
          id="dragoonData"
          method="post"
          className="col-span-2 grid grid-cols-1 grid-rows-6 w-1/2"
        >
          <label htmlFor="author" className="m-auto">
            <i className="text-lg font-light text-center w-max">Name: </i>
          </label>
          <input
            id="author"
            name="author"
            type="text"
            className="row-span-1 border-0 border-b-2 border-gray-200"
          />
          <label htmlFor="comment" className="m-auto">
            <i className="font-light text-lg">Your Message:</i>
          </label>
          <textarea
            name="comment"
            id="comment"
            className="row-span-4 border-2 border-slate-200"
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
        </Form>
      </div>

      {/* separator */}
      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <h2 className="font-sans text-4xl antialiased font-bold">
        Build your dragoon:
      </h2>
      <div className="grid grid-cols-6">
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
        {/* <HuePicker color={currentColor} onChange={handleColorChange} /> */}
        <DragoonPartsPreview
          images={props[selected]}
          setIndex={partSetterMap[selected]}
        ></DragoonPartsPreview>
      </div>
      <button
        type="submit"
        form="dragoonData"
        className="w-fit p-2 px-4 m-2 mx-4 bg-sky-400 rounded-md font-semibold text-white"
      >
        Submit
      </button>
      <button
        className="w-fit p-2 px-4 bg-sky-400 rounded-md font-semibold text-white"
        onClick={() => handleReset()}
      >
        Reset
      </button>
    </div>
  );
};

export default DragoonGenerator;
