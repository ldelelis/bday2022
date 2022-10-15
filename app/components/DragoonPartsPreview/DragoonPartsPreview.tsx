import { FC } from "react";
import DragoonItemPreview from "../DragoonSelector/DragoonSelectorPreview/DragoonSelectorPreview";

type DragoonPartsPreviewProps = {
  images: string[];
};

const DragoonPartsPreview: FC<DragoonPartsPreviewProps> = (props) => {
  const { images } = props;

  return (
    <div className="grid grid-cols-5 grid-rows-3">
      {images.map((image) => {
        return <DragoonItemPreview image={image} />;
      })}
    </div>
  );
};

export default DragoonPartsPreview;
