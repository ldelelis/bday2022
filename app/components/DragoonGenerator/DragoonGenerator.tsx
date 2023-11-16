import {
  backgroundColorCurrent,
  baseColorCurrent,
  clothCurrent,
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
import DragoonPartsPreview from "../DragoonPartsPreview/DragoonPartsPreview";
import DragoonColourPreview from "../DragoonColourPreview/DragoonColourPreview";
import DragoonColourSelector from "../DragoonColourSelector/DragoonColourSelector";
import { framesButton, newColorsButton } from "~/images";
import DragoonGeneratorCreditsModal from "../DragoonGeneratorCreditsModal/DragoonGeneratorCreditsModal";
import DragoonSubmissionForm from "../DragoonSubmissionForm/DragoonSubmissionForm";
import { Link } from "@remix-run/react";
import DragoonConfirmationStep from "../DragoonConfirmationStep/DragoonConfirmationStep";

type DragoonGeneratorProps = {
  clothes: string[];
  eyes: string[];
  hats: string[];
  handItems: string[];
  horns: string[];
  moustaches: string[];
  frames: string[];
};

enum DragoonGeneratorStatus {
  PARTS,
  FORM,
  CONFIRM,
}

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

  const [currentColor] = useAtom(baseColorCurrent);
  const [backgroundColor] = useAtom(backgroundColorCurrent);

  const [selected, setSelected] = useState("clothes");
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [submissionStatus, setSubmissionStatus] =
    useState<DragoonGeneratorStatus>(DragoonGeneratorStatus.FORM);

  const { clothes, eyes, hats, handItems, horns, moustaches, frames } = props;
  const cloth = clothes[clothIndex];
  const eye = eyes[eyeIndex];
  const hat = hats[hatIndex];
  const handItem = handItems[handItemIndex];
  const horn = horns[hornIndex];
  const moustache = moustaches[moustacheIndex];
  const frame = frames[frameIndex];

  const isOptional = (partName: string): boolean => {
    return ["clothes", "hats", "handItems", "moustaches", "frames"].includes(
      partName
    );
  };

  return (
    <>
      <DragoonGeneratorCreditsModal
        isOpen={isCreditsOpen}
        setIsOpen={setIsCreditsOpen}
      />
      <div className="flex flex-col xl:flex-row gap-x-8">
        <div className="w-full p-2 xl:p-0 xl:w-1/4">
          {submissionStatus !== DragoonGeneratorStatus.CONFIRM && (
            <div className="justify-center w-48 m-auto basis-full grid grid-cols-1 grid-rows-1 h-min justify-items-center shrink xl:w-3/4 2xl:w-full">
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
          )}

          <div className="hidden xl:block">
            <DragoonSubmissionForm
              author={author}
              setAuthor={setAuthor}
              comment={comment}
              setComment={setComment}
            />
          </div>
          <Link
            to="/all"
            prefetch="intent"
            className="justify-center hidden xl:flex"
          >
            <button
              type="button"
              className="w-4/5 p-2 text-xl text-white bg-purple-500 border-2 border-black border-solid xl:text-2xl rounded-md"
            >
              Go to messages
            </button>
          </Link>
        </div>

        <div
          className="w-screen px-4 py-2 h-fit max-h-min max-w-screen"
          style={{
            backgroundImage: "url(/backgrounds/generator-rescaled.png)",
            backgroundSize: "50%",
          }}
        >
          {submissionStatus === DragoonGeneratorStatus.PARTS ? (
            <div>
              <h2 className="font-sans text-2xl antialiased font-bold xl:text-4xl">
                Build your dragoon:
              </h2>
              <div className="flex pb-2 overflow-x-scroll overflow-y-auto text-lg xl:text-2xl parts-mask lg:no-parts-mask">
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
              <div className="pt-3 xl:text-2xl">
                <div className="hidden xl:inline">
                  Want the selen font for yourself?{" "}
                  <a
                    className="px-2 py-1 text-white bg-purple-500 border-2 border-black border-solid xl:px-4 rounded-md"
                    href="/fonts/Selen2-Regular.ttf"
                  >
                    Download here!
                  </a>
                </div>
                <button
                  className="float-left px-4 py-1 -mt-1 text-white bg-purple-500 border-2 border-black border-solid xl:float-right rounded-md"
                  onClick={() => setIsCreditsOpen(true)}
                >
                  Credits
                </button>
              </div>
              <div className="xl:hidden">
                <button
                  className="float-right px-4 py-1 -mt-1 text-white bg-purple-500 border-2 border-black border-solid rounded-md"
                  onClick={() =>
                    setSubmissionStatus(DragoonGeneratorStatus.FORM)
                  }
                >
                  Next
                </button>
              </div>
            </div>
          ) : submissionStatus === DragoonGeneratorStatus.FORM ? (
            <div>
              <DragoonSubmissionForm
                author={author}
                setAuthor={setAuthor}
                comment={comment}
                setComment={setComment}
              />
              <div className="flex justify-between max-w-full gap-8 min-w-fit">
                <button
                  type="button"
                  className="w-2/5 h-12 mt-2 bg-bottom reset-button"
                  onClick={() =>
                    setSubmissionStatus(DragoonGeneratorStatus.PARTS)
                  }
                />
                <button
                  type="button"
                  className="float-right w-2/6 h-16 submit-button"
                  disabled={author.length === 0 || comment.length === 0}
                  onClick={() =>
                    setSubmissionStatus(DragoonGeneratorStatus.CONFIRM)
                  }
                />
              </div>
            </div>
          ) : (
            <div>
              <DragoonConfirmationStep
                {...{
                  clothesIndex: clothIndex,
                  handItemIndex,
                  hatIndex,
                  eyeIndex,
                  moustacheIndex,
                  hornsIndex: hornIndex,
                  baseColor: currentColor,
                  backgroundColor,
                  frameIndex,
                  author,
                  comment,
                }}
              />
              <button
                className="float-left px-4 py-1 mt-4 text-white bg-purple-500 border-2 border-black border-solid xl:float-right rounded-md"
                onClick={() => setSubmissionStatus(DragoonGeneratorStatus.FORM)}
              >
                Back
              </button>
              <button className="float-right px-4 py-1 mt-4 text-white bg-purple-500 border-2 border-black border-solid xl:float-right rounded-md">
                Confirm
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DragoonGenerator;
