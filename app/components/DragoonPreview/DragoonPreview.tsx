import { FC } from "react";
import DragoonItemPreview from "~/components/DragoonSelector/DragoonSelectorPreview/DragoonSelectorPreview";
import { baseBlackLine, baseShadow, baseWhiteBase } from "~/images";
import DragoonItemBase from "~/components/DragoonSelector/DragoonSelectorBase/DragoonSelectorBase";

type DragoonPreviewProps = {
  handItem: string;
  hat: string;
  eye: string;
  moustache: string;
  cloth: string;
  horn: string;
  currentColor: string;
  backgroundColor: string;
};

const DragoonPreview: FC<DragoonPreviewProps> = (props) => {
  const {
    handItem,
    hat,
    eye,
    moustache,
    cloth,
    horn,
    currentColor,
    backgroundColor,
  } = props;

  return (
    <>
      {/* tailwind only provides z indexes up to 50. arbitrary values beyond that */}
      {/* must be enclosed in square brackets, as seen below */}
      <DragoonItemPreview styleProps="stacked z-[60]" image={handItem} />
      <DragoonItemPreview styleProps="stacked z-50" image={hat} />
      <DragoonItemPreview styleProps="stacked z-40" image={eye} />
      <DragoonItemPreview styleProps="stacked z-30" image={moustache} />
      <DragoonItemPreview styleProps="stacked z-20" image={cloth} />
      <DragoonItemPreview styleProps="stacked z-10" image={baseBlackLine} />
      <DragoonItemPreview styleProps="stacked" image={baseShadow} />
      <DragoonItemBase className="stacked" color={currentColor} />
      <DragoonItemPreview styleProps="stacked -z-10" image={horn} />
      <div className="stacked -z-20" style={{ backgroundColor }}>
        <DragoonItemPreview image={baseWhiteBase} />
      </div>
    </>
  );
};

export default DragoonPreview;
