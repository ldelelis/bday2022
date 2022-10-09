import { FC } from "react";
import DragoonSelectorNext from "../DragoonSelector/DragoonSelectorNext/DragoonSelectorNext";
import DragoonItemPreview from "../DragoonSelector/DragoonSelectorPreview/DragoonSelectorPreview";
import DragoonSelectorPrevious from "../DragoonSelector/DragoonSelectorPrevious/DragoonSelectorPrevious";

type DragoonitemSelectorProps = {
  imagePath: string;
  itemName?: string;
  itemIndex: number;
  itemCount: number;
  setIndex: (idx: number) => void;
};

const DragoonGeneratorSelector: FC<DragoonitemSelectorProps> = ({
  imagePath,
  itemIndex,
  itemCount,
  setIndex,
}) => {
  return (
    <div className="grid grid-cols-5 items-center">
      <DragoonSelectorPrevious
        itemIndex={itemIndex}
        itemCount={itemCount}
        setPrevious={setIndex}
      />
      <DragoonItemPreview image={imagePath} styleProps="col-span-3" />
      <DragoonSelectorNext
        itemIndex={itemIndex}
        itemCount={itemCount}
        setNext={setIndex}
      />
    </div>
  );
};

export default DragoonGeneratorSelector;
