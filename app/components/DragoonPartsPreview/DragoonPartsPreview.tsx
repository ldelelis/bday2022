import { FC, useState } from "react";
import { DEFAULT_COLOR } from "~/atoms";
import { baseBlackLine, noneSelected } from "~/images";
import DragoonItemBase from "../DragoonSelector/DragoonSelectorBase/DragoonSelectorBase";
import DragoonItemPreview from "../DragoonSelector/DragoonSelectorPreview/DragoonSelectorPreview";

type DragoonPartsPreviewProps = {
  images: string[];
  setIndex: (idx?: number | null) => void;
  optional: boolean;
};

const DragoonPartsPreview: FC<DragoonPartsPreviewProps> = (props) => {
  const { images, setIndex, optional } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 15;
  const maxPages = Math.ceil(images.length / PAGE_SIZE);
  let indexOffset = 0;
  const safeImages = [...images];

  if (optional) {
    safeImages.unshift("");
    indexOffset = 1;
  }

  const pagedImages = safeImages.slice(
    (currentPage - 1) * PAGE_SIZE,
    PAGE_SIZE * currentPage
  );

  return (
    <>
      <div className="border-2 border-black">
        <div className="flex flex-row p-2 m-2 justify-items-center">
          {images.length > PAGE_SIZE ? (
            <div
              className="hidden w-1/6 m-auto cursor-pointer lg:block animate-wiggle"
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            >
              <img
                src="/buttons/next-button-new.png"
                className="-scale-x-100"
              />
              <p className="text-sm lg:text-md xl:text-xl 2xl:text-2xl">
                Previous
              </p>
            </div>
          ) : (
            <div className="w-1/6 m-auto"></div>
          )}
          {/* Mobile setup */}
          <div className="p-1 pb-2 overflow-x-scroll grid grid-rows-3 grid-flow-col auto-cols-max gap-6 2xl:gap-4 parts-mask xl:hidden">
            {safeImages.map((image, idx) => {
              return (
                <div
                  key={image}
                  className="grid grid-cols-1 outline outline-4 outline-black backdrop-blur-[4px] w-28  max-h-fit"
                  onClick={() => setIndex(idx - indexOffset)}
                >
                  <DragoonItemPreview
                    styleProps="stacked z-20 min-w-0 min-h-0 m-auto"
                    image={image}
                  />
                  <DragoonItemPreview
                    styleProps="stacked z-10 opacity-50 min-w-0 min-h-0 m-auto"
                    image={baseBlackLine}
                  />
                  {/*We override the style definitions to disable the preview's outline*/}
                  <DragoonItemBase
                    className="min-w-0 min-h-0 m-auto opacity-50 stacked"
                    color={DEFAULT_COLOR}
                    style={{}}
                  />
                </div>
              );
            })}
            {/* please don't ask. this is to work around webkit-mask's behaviour */}
            <div></div>
            <div></div>
            <div></div>
          </div>
          {/* Desktop setup */}
          <div className="hidden p-1 pb-2 grid-rows-3 grid-cols-5 grid-flow-row xl:gap-y-8 xl:grid place-items-center">
            {pagedImages.map((image, idx) => {
              return image === "" ? (
                <div
                  key="null"
                  className="outline outline-4 outline-black backdrop-blur-[4px] w-4/6 max-h-fit"
                  onClick={() => setIndex(null)}
                >
                  <img
                    src={noneSelected}
                    className="min-w-0 min-h-0 m-auto"
                  ></img>
                </div>
              ) : (
                <div
                  key={image}
                  className="grid grid-cols-1 outline outline-4 outline-black backdrop-blur-[4px] w-4/6  max-h-fit"
                  onClick={() =>
                    setIndex(idx - indexOffset + (currentPage - 1) * PAGE_SIZE)
                  }
                >
                  <DragoonItemPreview
                    styleProps="stacked z-20 min-w-0 min-h-0 m-auto"
                    image={image}
                  />
                  <DragoonItemPreview
                    styleProps="stacked z-10 opacity-50 min-w-0 min-h-0 m-auto"
                    image={baseBlackLine}
                  />
                  {/*We override the style definitions to disable the preview's outline*/}
                  <DragoonItemBase
                    className="min-w-0 min-h-0 m-auto opacity-50 stacked"
                    color={DEFAULT_COLOR}
                    style={{}}
                  />
                </div>
              );
            })}
          </div>
          {images.length > PAGE_SIZE ? (
            <div
              className="hidden w-1/6 m-auto cursor-pointer lg:block animate-wiggle"
              onClick={() =>
                setCurrentPage(Math.min(currentPage + 1, maxPages))
              }
            >
              <img src="/buttons/next-button-new.png" />
              <p className="m-auto text-xl w-min xl:text-2xl">Next</p>
            </div>
          ) : (
            <div className="w-1/6 m-auto"></div>
          )}
        </div>
        <p className="hidden pb-2 mx-auto text-xl xl:block xl:text-2xl 2xl:text-3xl w-max">
          Page {currentPage} of {maxPages}
        </p>
      </div>
    </>
  );
};

export default DragoonPartsPreview;
