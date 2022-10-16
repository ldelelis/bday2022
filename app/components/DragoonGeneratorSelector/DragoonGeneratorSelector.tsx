import { FC } from "react";
import DragoonItemPreview from "../DragoonSelector/DragoonSelectorPreview/DragoonSelectorPreview";

type DragoonitemSelectorProps = {
  imagePath: string;
  partName: string;
};

const DragoonGeneratorSelector: FC<DragoonitemSelectorProps> = ({
  partName,
  imagePath,
}) => {
  return (
    <div className="m-2 border-4 border-slate-600">
      <DragoonItemPreview image={imagePath} styleProps="col-span-3" />
      <h1 className="text-center capitalize font-bold">{partName}</h1>
    </div>
  );
};

export default DragoonGeneratorSelector;
