import { FC } from "react";

type DragoonSelectorNextProps = {
  itemCount: number;
  itemIndex: number;
  setNext: (idx: number) => void;
};

const DragoonSelectorNext: FC<DragoonSelectorNextProps> = ({
  itemIndex,
  itemCount,
  setNext,
}) => {
  const newIndex = itemIndex === itemCount - 1 ? 0 : itemIndex + 1;

  return <div onClick={() => setNext(newIndex)}>{">"}</div>;
};

export default DragoonSelectorNext;
