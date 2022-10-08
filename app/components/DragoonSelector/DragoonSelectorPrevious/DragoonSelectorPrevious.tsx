import { FC } from "react";

type DragoonSelectorPreviousProps = {
  itemCount: number;
  itemIndex: number;
  setPrevious: (idx: number) => void;
};

const DragoonSelectorPrevious: FC<DragoonSelectorPreviousProps> = ({
  itemIndex,
  itemCount,
  setPrevious,
}) => {
  const newIndex = itemIndex === 0 ? itemCount - 1 : itemIndex - 1;

  return <div onClick={() => setPrevious(newIndex)}>{"<"}</div>;
};

export default DragoonSelectorPrevious;
