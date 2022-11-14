import { FC } from "react";

type DragoonColourPreviewProps = {
  thumbnailPath: string;
  selected: string;
  partName: string;
  subtitle?: string;
};

const DragoonColourPreview: FC<DragoonColourPreviewProps> = (props) => {
  const { thumbnailPath, subtitle, selected, partName } = props;
  const isSelected = selected === partName;

  return (
    <div
      className={
        "m-2 h-fit w-4/5 xl:h-fit xl:w-fit border-4 bg-white" +
        " " +
        (isSelected ? "selector-border-selected" : "selector-border")
      }
    >
      <img src={thumbnailPath} className="my-1" />
      {subtitle && (
        <h1 className="text-center capitalize font-bold">{subtitle}</h1>
      )}
    </div>
  );
};

export default DragoonColourPreview;
