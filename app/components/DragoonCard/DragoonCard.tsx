import { FC } from "react";
import { cloth, eye, frame, handItem, hat, horn, moustache } from "~/images";
import DragoonPreview from "../DragoonPreview/DragoonPreview";

type DragoonCardProps = {
  author: string;
  comment: number;
  clothesIndex: string;
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
    <div className="border-2 border-black backdrop-blur-sm flex flex-row flex-wrap">
      <div className="grid p-4 basis-1/4 xl:basis-2/12 2xl:basis-1/3">
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
      <p className="basis-3/4 xl:basis-10/12 2xl:basis-2/3 break-words">
        "{comment}"
      </p>
      <p className="mx-auto xl:py-2 self-end">- {author}</p>
    </div>
  );
};

export default DragoonCard;
