import { FC } from "react";
import { colorsButton } from "~/images";

const DragoonColourPreview: FC = () => {
  return (
    <div className="m-2 border-4 border-black bg-white">
      <img src={colorsButton} />
      <h1 className="text-center capitalize font-bold">Colours</h1>
    </div>
  );
};

export default DragoonColourPreview;
