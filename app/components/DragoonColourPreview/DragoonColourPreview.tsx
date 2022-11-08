import { FC } from "react";

type DragoonColourPreviewProps = {
  thumbnailPath: string;
  subtitle: string;
};

const DragoonColourPreview: FC<DragoonColourPreviewProps> = (props) => {
  const { thumbnailPath, subtitle } = props;

  return (
    <div className="mx-2 my-1 h-min border-4 border-black bg-white">
      <img src={thumbnailPath} />
      <h1 className="text-center capitalize font-bold">{subtitle}</h1>
    </div>
  );
};

export default DragoonColourPreview;
