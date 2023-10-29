import { FC } from "react";
import { cloth, eye, frame, handItem, hat, horn, moustache } from "~/images";
import DragoonPreview from "../DragoonPreview/DragoonPreview";

export type DragoonCardProps = {
  author: string;
  comment: string;
  clothesIndex: number;
  hornsIndex: number;
  eyeIndex: number;
  handItemIndex: number;
  hatIndex: number;
  moustacheIndex: number;
  frameIndex: number;
  baseColor: string;
  backgroundColor: string;
};

const DragoonCard: FC<DragoonCardProps> = (props) => {
  const {
    author,
    comment,
    clothesIndex,
    hornsIndex,
    eyeIndex,
    handItemIndex,
    hatIndex,
    moustacheIndex,
    frameIndex,
    baseColor,
    backgroundColor,
  } = props;
  return (
    <div className="flex flex-row flex-wrap h-[42rem] border-2 border-black xl:h-auto backdrop-blur-sm">
      <div
        id="dragoon-preview"
        className="flex-1 p-4 grid basis-full xl:basis-2/12 2xl:basis-1/3"
      >
        <DragoonPreview
          cloth={cloth[clothesIndex]}
          horn={horn[hornsIndex]}
          eye={eye[eyeIndex]}
          handItem={handItem[handItemIndex]}
          hat={hat[hatIndex]}
          moustache={moustache[moustacheIndex]}
          frame={frame[frameIndex]}
          currentColor={baseColor}
          backgroundColor={backgroundColor}
        />
      </div>
      <p className="break-words basis-full xl:basis-10/12 2xl:basis-2/3">
        "{comment}"
      </p>
      <p className="self-end mx-auto xl:py-2">- {author}</p>
    </div>
  );
};

export default DragoonCard;
