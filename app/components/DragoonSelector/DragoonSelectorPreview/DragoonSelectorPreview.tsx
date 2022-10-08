import { FC } from "react";

type DragoonItemPreviewProps = {
  image: string;
  styleProps?: string;
};

const DragoonItemPreview: FC<DragoonItemPreviewProps> = ({
  image,
  styleProps,
}) => {
  return <img src={image} className={styleProps}></img>;
};

export default DragoonItemPreview;
