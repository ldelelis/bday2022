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
        "m-2 h-fit w-24 xl:h-fit border-4 bg-white" +
        " " +
        (isSelected ? "selector-border-selected" : "selector-border")
      }
    >
      <img src={thumbnailPath} className="my-1" />
      {subtitle && (
        <h1 className="font-bold text-center capitalize">{subtitle}</h1>
      )}
    </div>
  );
};

export default DragoonColourPreview;
