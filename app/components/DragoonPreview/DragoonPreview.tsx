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
  frame: string;
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
    frame,
    currentColor,
    backgroundColor,
  } = props;

  return (
    <>
      {/* tailwind only provides z indexes up to 50. arbitrary values beyond that */}
      {/* must be enclosed in square brackets, as seen below */}
      <DragoonItemPreview styleProps="stacked z-[90] " image={frame} />
      <DragoonItemPreview styleProps="stacked z-[80]" image={handItem} />
      <DragoonItemPreview styleProps="stacked z-[70]" image={hat} />
      <DragoonItemPreview styleProps="stacked z-[60]" image={eye} />
      <DragoonItemPreview styleProps="stacked z-50" image={moustache} />
      <DragoonItemPreview styleProps="stacked z-40" image={cloth} />
      <DragoonItemPreview styleProps="stacked z-30" image={baseBlackLine} />
      <DragoonItemPreview styleProps="stacked z-20" image={baseShadow} />
      <DragoonItemBase
        className="stacked h-auto w-auto min-w-0 min-h-0 max-h-[350px] max-w-[350px] z-20"
        color={currentColor}
      />
      <DragoonItemPreview styleProps="stacked z-10" image={horn} />
      <div className="stacked h-min w-fit" style={{ backgroundColor }}>
        <DragoonItemPreview image={baseWhiteBase} />
      </div>
    </>
  );
};

export default DragoonPreview;
