import { FC } from "react";
import { DEFAULT_COLOR } from "~/atoms";
import { baseBlackLine } from "~/images";
import DragoonItemBase from "../DragoonSelector/DragoonSelectorBase/DragoonSelectorBase";
import DragoonItemPreview from "../DragoonSelector/DragoonSelectorPreview/DragoonSelectorPreview";

type DragoonitemSelectorProps = {
  imagePath?: string;
  partName: string;
};

const DragoonGeneratorSelector: FC<DragoonitemSelectorProps> = ({
  partName,
  imagePath,
}) => {
  return (
    <div className="m-2 border-4 border-black grid grid-cols-1 bg-white">
      <DragoonItemPreview image={imagePath} styleProps="stacked z-20" />
      <DragoonItemPreview
        styleProps="stacked z-10 opacity-50"
        image={baseBlackLine}
      />
      {/*We override the style definitions to disable the preview's outline*/}
      <DragoonItemBase
        className="stacked opacity-30"
        color={DEFAULT_COLOR}
        style={{}}
      />
      <h1 className="text-center capitalize font-bold row-span-1">
        {partName}
      </h1>
    </div>
  );
};

export default DragoonGeneratorSelector;
