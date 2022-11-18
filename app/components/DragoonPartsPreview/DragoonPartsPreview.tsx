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

  const slice = safeImages.slice(
    (currentPage - 1) * PAGE_SIZE,
    PAGE_SIZE * currentPage
  );

  return (
    <>
      <div className="border-2 border-black">
        <div className="m-2 p-2 flex flex-row justify-items-center">
          {images.length > PAGE_SIZE ? (
            <div
              className="m-auto animate-wiggle w-1/6 cursor-pointer"
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
            <div></div>
          )}
          <div className="grid grid-cols-2 grid-rows-8 col-span-9 sm:grid-cols-3 sm:grid-rows-5 lg:grid-cols-4 lg:grid-rows-4 xl:grid-cols-5 xl:grid-rows-3 place-items-center gap-y-8">
            {slice.map((image, idx) => {
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
                    className="stacked opacity-50 min-w-0 min-h-0 m-auto"
                    color={DEFAULT_COLOR}
                    style={{}}
                  />
                </div>
              );
            })}
          </div>
          {images.length > PAGE_SIZE ? (
            <div
              className="m-auto animate-wiggle w-1/6 cursor-pointer"
              onClick={() =>
                setCurrentPage(Math.min(currentPage + 1, maxPages))
              }
            >
              <img src="/buttons/next-button-new.png" />
              <p className="w-min m-auto text-xl xl:text-2xl">Next</p>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <p className="text-2xl xl:text-3xl w-max mx-auto pb-2">
          Page {currentPage} of {maxPages}
        </p>
      </div>
    </>
  );
};

export default DragoonPartsPreview;
