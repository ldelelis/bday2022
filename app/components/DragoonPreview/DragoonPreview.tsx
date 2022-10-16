import { FC } from "react";
import DragoonItemPreview from "~/components/DragoonSelector/DragoonSelectorPreview/DragoonSelectorPreview";
import { baseBlackLine, baseShadow } from "~/images";
import DragoonItemBase from "~/components/DragoonSelector/DragoonSelectorBase/DragoonSelectorBase";

type DragoonPreviewProps = {
  handItem: string;
  hat: string;
  eye: string;
  moustache: string;
  cloth: string;
  horn: string;
  currentColor: string;
};

const DragoonPreview: FC<DragoonPreviewProps> = (props) => {
  const { handItem, hat, eye, moustache, cloth, horn, currentColor } = props;

  return (
    <>
      <DragoonItemPreview styleProps="stacked z-50" image={handItem} />
      <DragoonItemPreview styleProps="stacked z-40" image={hat} />
      <DragoonItemPreview styleProps="stacked z-30" image={eye} />
      <DragoonItemPreview styleProps="stacked z-20" image={moustache} />
      <DragoonItemPreview styleProps="stacked z-10" image={cloth} />
      <DragoonItemPreview styleProps="stacked" image={baseBlackLine} />
      <DragoonItemPreview styleProps="stacked" image={baseShadow} />
      <DragoonItemBase className="stacked w-fit" color={currentColor} />
      <DragoonItemPreview styleProps="stacked -z-10" image={horn} />
    </>
  );
};

export default DragoonPreview;
