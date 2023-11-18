import { FC, useState } from "react";
import { DEFAULT_COLOR } from "~/atoms";
import { baseBlackLine, noneSelected, newLabel } from "~/images";
import DragoonItemBase from "../DragoonSelector/DragoonSelectorBase/DragoonSelectorBase";
import DragoonItemPreview from "../DragoonSelector/DragoonSelectorPreview/DragoonSelectorPreview";

type DragoonPart = {
  item: string;
  new: boolean;
};

type DragoonPartsPreviewProps = {
  images: DragoonPart[];
  secondaryImages?: string[];
  setIndex: (idx?: number | null) => void;
  optional: boolean;
};

const DragoonPartsPreview: FC<DragoonPartsPreviewProps> = (props) => {
  const { images, secondaryImages, setIndex, optional } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 15;
  const maxPages = Math.ceil(images.length / PAGE_SIZE);
  const safeImages = [...images];
  safeImages.sort((a, b) => (a.new === b.new ? 0 : a.new ? -1 : 1));

  const imageIndexMap = images.reduce((acc, x, idx) => {
    acc[x.item] = idx;
    return acc;
  }, {});

  if (optional) {
    safeImages.unshift({ item: "", new: false });
  }

  const slice = safeImages.slice(
    (currentPage - 1) * PAGE_SIZE,
    PAGE_SIZE * currentPage
  );

  return (
    <>
      <div className="border-2 border-black">
        <div className="flex flex-row p-2 m-2 justify-items-center">
          {images.length > PAGE_SIZE ? (
            <div
              className="w-1/6 m-auto cursor-pointer animate-wiggle"
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
          <div className="grid grid-cols-2 grid-rows-8 col-span-9 sm:grid-cols-3 sm:grid-rows-5 lg:grid-cols-4 lg:grid-rows-4 xl:grid-cols-5 xl:grid-rows-3 place-items-center gap-y-8">
            {slice.map((image) => {
              return image.item === "" ? (
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
                  key={image.item}
                  className="grid grid-cols-1 outline outline-4 outline-black backdrop-blur-[4px] w-4/6  max-h-fit"
                  onClick={() =>
                    // setIndex(idx - indexOffset + (currentPage - 1) * PAGE_SIZE)
                    setIndex(imageIndexMap[image.item])
                  }
                >
                  {image.new ? (
                    <img
                      src={newLabel}
                      className="absolute top-0 left-0 z-50 opacity-75 scale-75"
                    />
                  ) : (
                    <></>
                  )}
                  <DragoonItemPreview
                    styleProps="stacked z-20 min-w-0 min-h-0 m-auto"
                    image={image.item}
                  />
                  {secondaryImages ? (
                    <DragoonItemPreview
                      styleProps="stacked z-90 min-w-0 min-h-0 m-auto"
                      image={
                        // secondaryImages[idx + (currentPage - 1) * PAGE_SIZE]
                        secondaryImages[imageIndexMap[image.item] + 1]
                      }
                    />
                  ) : (
                    <></>
                  )}
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
              className="w-1/6 m-auto cursor-pointer animate-wiggle"
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
        <p className="pb-2 mx-auto text-xl xl:text-2xl 2xl:text-3xl w-max">
          Page {currentPage} of {maxPages}
        </p>
      </div>
    </>
  );
};

export default DragoonPartsPreview;
