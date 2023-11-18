import { FC } from "react";
import {
  cloth,
  eye,
  frame,
  handItem,
  hat,
  hatBack,
  horn,
  moustache,
} from "~/images";
import DragoonPreview from "../DragoonPreview/DragoonPreview";

type DragoonCardProps = {
  author: string;
  comment: string;
  clothesIndex: number;
  hornsIndex: number;
  eyeIndex: number;
  handItemIndex: number;
  hatIndex: number;
  hatBackIndex: number;
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
    hatBackIndex,
    moustacheIndex,
    frameIndex,
    baseColor,
    backgroundColor,
  } = props;
  return (
    <div className="flex flex-row flex-wrap border-2 border-black backdrop-blur-sm">
      <div
        id="dragoon-preview"
        className="p-4 grid basis-1/4 xl:basis-2/12 2xl:basis-1/3"
      >
        <DragoonPreview
          cloth={cloth[clothesIndex] ? cloth[clothesIndex].item : null}
          horn={horn[hornsIndex].item ? horn[hornsIndex].item : null}
          eye={eye[eyeIndex].item}
          handItem={
            handItem[handItemIndex] ? handItem[handItemIndex].item : null
          }
          hat={hat[hatIndex] ? hat[hatIndex].item : null}
          hatBack={hatBack[hatBackIndex]}
          moustache={
            moustache[moustacheIndex] ? moustache[moustacheIndex].item : null
          }
          frame={frame[frameIndex] ? frame[frameIndex].item : null}
          currentColor={baseColor}
          backgroundColor={backgroundColor}
        />
      </div>
      <p className="break-words basis-3/4 xl:basis-10/12 2xl:basis-2/3">
        "{comment}"
      </p>
      <p className="self-end mx-auto xl:py-2">- {author}</p>
    </div>
  );
};

export default DragoonCard;
