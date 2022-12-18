import { FC } from "react";

type DragoonItemPreviewProps = {
  image: string;
  styleProps?: string;
};

const DragoonItemPreview: FC<DragoonItemPreviewProps> = ({
  image,
  styleProps,
}) => {
  if (!image) return <></>;
  return <img src={image} className={styleProps}></img>;
};

export default DragoonItemPreview;
