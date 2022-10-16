import { FC } from "react";
import DragoonSelectorNext from "../DragoonSelector/DragoonSelectorNext/DragoonSelectorNext";
import DragoonItemPreview from "../DragoonSelector/DragoonSelectorPreview/DragoonSelectorPreview";
import DragoonSelectorPrevious from "../DragoonSelector/DragoonSelectorPrevious/DragoonSelectorPrevious";

type DragoonitemSelectorProps = {
  imagePath: string;
  partName: string;
  itemName?: string;
  itemIndex: number;
  itemCount: number;
  setIndex: (idx: number) => void;
};

const DragoonGeneratorSelector: FC<DragoonitemSelectorProps> = ({
  partName,
  imagePath,
  itemIndex,
  itemCount,
  setIndex,
}) => {
  return (
    <>
      {/* <DragoonSelectorPrevious */}
      {/*   itemIndex={itemIndex} */}
      {/*   itemCount={itemCount} */}
      {/*   setPrevious={setIndex} */}
      {/* /> */}
      <DragoonItemPreview image={imagePath} styleProps="col-span-3" />
      <h1 className="text-center capitalize font-bold">{partName}</h1>
      {/* <DragoonSelectorNext */}
      {/*   itemIndex={itemIndex} */}
      {/*   itemCount={itemCount} */}
      {/*   setNext={setIndex} */}
      {/* /> */}
    </>
  );
};

export default DragoonGeneratorSelector;
