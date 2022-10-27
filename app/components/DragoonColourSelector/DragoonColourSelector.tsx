import { useAtom } from "jotai";
import { FC } from "react";
import { ChromePicker, ColorResult } from "react-color";
import { backgroundColorCurrent, baseColorCurrent } from "~/atoms";

const DragoonColourSelector: FC = () => {
  const [currentColor, setCurrentColor] = useAtom(baseColorCurrent);
  const [backgroundColor, setBackgroundColor] = useAtom(backgroundColorCurrent);

  const handleBaseColorChange = (color: ColorResult) => {
    setCurrentColor(color.hex);
  };

  const handleBackgroundColorChange = (color: ColorResult) => {
    setBackgroundColor(color.hex);
  };

  return (
    <div className="m-2 p-2 border-2 border-slate-600 grid col-span-7 grid-cols-2 grid-rows-6">
      <ChromePicker
        color={currentColor}
        onChange={handleBaseColorChange}
        className="row-span-5"
      ></ChromePicker>
      <ChromePicker
        color={backgroundColor}
        onChange={handleBackgroundColorChange}
        className="row-span-5"
      ></ChromePicker>
      <h1>Dragoon</h1>
      <h1>Background</h1>
    </div>
  );
};

export default DragoonColourSelector;
