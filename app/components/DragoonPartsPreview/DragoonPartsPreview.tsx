import { FC } from "react";
import DragoonItemPreview from "../DragoonSelector/DragoonSelectorPreview/DragoonSelectorPreview";

type DragoonPartsPreviewProps = {
  images: string[];
  setIndex: (idx: number) => void;
};

const DragoonPartsPreview: FC<DragoonPartsPreviewProps> = (props) => {
  const { images, setIndex } = props;

  return (
    <div className="m-2 p-2 border-2 border-slate-600 col-span-6 grid grid-cols-5">
      {images.map((image, idx) => {
        return (
          <div
            className="m-4 border-4 border- border-slate-600"
            onClick={() => setIndex(idx)}
          >
            <DragoonItemPreview image={image} />
          </div>
        );
      })}
    </div>
  );
};

export default DragoonPartsPreview;
